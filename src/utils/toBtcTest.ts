import * as dotenv from "dotenv";
dotenv.config();

import {EVMSigner} from "../chains/evm/signer/EVMSigner";
import {ETH_ADDRESS, USDC_ADDRESS, USDT_ADDRESS, WBTC_ADDRESS} from "../constants/Constants";
import BtcRPC, {BtcRPCConfig} from "../btc/BtcRPC";
import {StorageManager} from "crosslightning-intermediary";
import {BitcoindRpc} from "btcrelay-bitcoind";
import {EVMBtcRelay, EVMSwapProgram, EVMSwapData} from "crosslightning-evm";
import {ToBTCSwap}  from "crosslightning-sdk-base"

import * as BN from "bn.js"
import * as sdk from "evmlightning-sdk"

async function main() {

    // const provider = new ethers.providers.JsonRpcProvider(_rpcUrl);
    // const signer = new ethers.Wallet(_privateKey); //Or ethers.Wallet.createRandom() to generate new one
    // signer.connect(provider);
    const signer = EVMSigner;

    //Defines max swap price difference to the current market price as fetched from CoinGecko API tolerance in PPM (1000000 = 100%)
    const _swapDifferenceTolerance = new BN(2500); //Max allowed difference 0.25%

    //Set swapper options
    const _network = "Q"; //"Q", "Q_TESTNET", "POLYGON", "POLYGON_TESTNET" or "LINEA_TESTNET"
    const _intermediaryUrl = "http://localhost:4000"; //URL of the desired swap intermediary

    //For browser like environment (using browser local storage)
    // const _options = sdk.EVMSwapper.createSwapperOptions(_network, _swapDifferenceTolerance, _intermediaryUrl);
    //For NodeJS environment (using filesystem storage)
    const _options = sdk.createNodeJSSwapperOptions(_network, _swapDifferenceTolerance, _intermediaryUrl); //import from "evmlightning-sdk/dist/NodeJSSwapperOptions"

    //Create the swapper instance
    const swapper = new sdk.EVMSwapper(signer, _options);
    //Initialize the swapper
    await swapper.init();



    const _useNetwork: string = "Q_TESTNET"; //"Q", "Q_TESTNET", "POLYGON", "POLYGON_TESTNET" or "LINEA_TESTNET"
    const _useToken: string = sdk.EVMChains[_useNetwork].tokens.USDC; //Token to swap from
    const _address: string = "bc1qev3mcx2q57znyk7l8uwwzenke67as6gtc7rhn3"; //Destination bitcoin address
    const _amount: BN = new BN(10000); //Amount of satoshis to send (1 BTC = 100 000 000 satoshis)
    
    //Create the swap: swapping _useToken to Bitcoin on-chain, sending _amount of satoshis (smallest unit of bitcoin) to _address
    const swap: ToBTCSwap<EVMSwapData> = await swapper.createEVMToBTCSwap(_useToken, _address, _amount);
    
    //Get the amount required to pay and fee
    const amountToBePaid: BN = swap.getInAmount(); //Amount to be paid in the ERC-20/ETH token on EVM (including fee), in base units (no decimals)
    const fee: BN = swap.getFee(); //Swap fee paid in the ERC-20/ETH token on EVM (already included in the getInAmount()), in base units (no decimals)
    
    //Get swap expiration time
    const expiry: number = swap.getExpiry(); //Expiration time of the swap in UNIX milliseconds, swap needs to be initiated before this time
    
    //Check if ERC-20 approval is required
    const isApprovalRequired: boolean = await swapper.isApproveRequired(swap);
    
    //Approve the spending of ERC-20 token by contract
    if(isApprovalRequired) {
        await swapper.approveSpend(swap);
    }
    
    //Initiate and pay for the swap
    await swap.commit();
    
    //Wait for the swap to conclude
    const result: boolean = await swap.waitForPayment();
    if(!result) {
        //Swap failed, money can be refunded
        await swap.refund();
    } else {
        //Swap successful
    }

}

main();