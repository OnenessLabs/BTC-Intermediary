import * as dotenv from "dotenv";
dotenv.config();

import {EVMSigner} from "../chains/evm/signer/EVMSigner";
import {ETH_ADDRESS, USDC_ADDRESS, USDT_ADDRESS, WBTC_ADDRESS} from "../constants/Constants";
import BtcRPC, {BtcRPCConfig} from "../btc/BtcRPC";
import {StorageManager} from "crosslightning-intermediary";
import {BitcoindRpc} from "btcrelay-bitcoind";
import {EVMBtcRelay, EVMSwapProgram} from "crosslightning-evm";

async function printBalance(swapContract: EVMSwapProgram, token: string) {

    const balance = await swapContract.getIntermediaryBalance(EVMSigner.address, token);

    console.log(balance.toString(10));

}

async function main() {

    const bitcoinRpc = new BitcoindRpc(
        BtcRPCConfig.protocol,
        BtcRPCConfig.user,
        BtcRPCConfig.pass,
        BtcRPCConfig.host,
        BtcRPCConfig.port
    );
    const btcRelay = new EVMBtcRelay(EVMSigner, bitcoinRpc, process.env.EVM_BTC_RELAY_CONTRACT_ADDRESS);
    const swapContract = new EVMSwapProgram(EVMSigner, btcRelay, process.env.EVM_SWAP_CONTRACT_ADDRESS);

    console.log("WBTC:");
    await printBalance(swapContract, WBTC_ADDRESS);

    console.log("USDC:");
    await printBalance(swapContract, USDC_ADDRESS);

    console.log("USDT:");
    await printBalance(swapContract, USDT_ADDRESS);

    console.log("ETH:");
    await printBalance(swapContract, ETH_ADDRESS);

}

main();