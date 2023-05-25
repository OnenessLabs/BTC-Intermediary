import * as dotenv from "dotenv";
dotenv.config();

import {ETH_ADDRESS, USDC_ADDRESS, USDT_ADDRESS, WBTC_ADDRESS} from "../constants/Constants";
import {EVMSigner} from "../chains/evm/signer/EVMSigner";
import {EVMBtcRelay, EVMSwapProgram} from "crosslightning-evm";
import BtcRPC, {BtcRPCConfig} from "../btc/BtcRPC";
import {StorageManager} from "crosslightning-intermediary";
import {BitcoindRpc} from "btcrelay-bitcoind";
import {BigNumber, Contract} from "ethers";
import {erc20Mintable} from "../contract/erc20Mintable";
import * as fs from "fs/promises";

async function deposit(amount: string, token: string) {

    const directory = "./storage";

    try {
        await fs.mkdir(directory)
    } catch (e) {}

    await EVMSigner.init();

    let useToken: string;
    switch (token) {
        case "WBTC":
            useToken = WBTC_ADDRESS;
            break;
        case "USDC":
            useToken = USDC_ADDRESS;
            break;
        case "USDT":
            useToken = USDT_ADDRESS;
            break;
        case "ETH":
            useToken = ETH_ADDRESS;
            break;
        default:
            return false;
    }

    const bitcoinRpc = new BitcoindRpc(
        BtcRPCConfig.protocol,
        BtcRPCConfig.user,
        BtcRPCConfig.pass,
        BtcRPCConfig.host,
        BtcRPCConfig.port
    );
    const btcRelay = new EVMBtcRelay(EVMSigner, bitcoinRpc, process.env.EVM_BTC_RELAY_CONTRACT_ADDRESS);
    const swapContract = new EVMSwapProgram(EVMSigner, btcRelay, process.env.EVM_SWAP_CONTRACT_ADDRESS);

    const tokenContract = new Contract(useToken, erc20Mintable.abi, EVMSigner);

    const amountBN = BigNumber.from(amount);

    const depositTx = await swapContract.contract.populateTransaction.withdraw(useToken, amountBN);
    depositTx.gasLimit = BigNumber.from(150000);

    const txData = await EVMSigner.sendTransaction(depositTx);

    await EVMSigner.provider.waitForTransaction(txData.hash);

    console.log("Withdraw success");

    EVMSigner.stop();

    return true;

}

async function main() {
    if(process.argv.length<4) {
        console.error("Needs at least 2 arguments");
        console.error("Usage: node deposit.js <token:WBTC,USDC,USDT> <amount>");
        return;
    }

    const token = process.argv[2];
    const amount = process.argv[3];

    if(!(await deposit(amount, token))) {
        console.error("Invalid token argument (must be one of WBTC, USDC, USDT)");
    }
}

main();