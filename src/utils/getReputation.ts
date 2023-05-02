import * as dotenv from "dotenv";
dotenv.config();

import {EVMSigner} from "../chains/evm/signer/EVMSigner";
import {ETH_ADDRESS, USDC_ADDRESS, USDT_ADDRESS, WBTC_ADDRESS} from "../constants/Constants";
import BtcRPC, {BtcRPCConfig} from "../btc/BtcRPC";
import {StorageManager} from "crosslightning-intermediary";
import {BitcoindRpc} from "btcrelay-bitcoind";
import {EVMBtcRelay, EVMSwapProgram} from "crosslightning-evm";

async function printReputation(swapContract: EVMSwapProgram, token: string) {

    const reputation = await swapContract.getIntermediaryReputation(EVMSigner.address, token);

    console.log("   LN:");
    console.log("       successes: "+reputation[0].successVolume.toString(10)+" ("+reputation[0].successCount.toString(10)+")");
    console.log("       fails: "+reputation[0].failVolume.toString(10)+" ("+reputation[0].failCount.toString(10)+")");
    console.log("       coop closes: "+reputation[0].coopCloseVolume.toString(10)+" ("+reputation[0].coopCloseCount.toString(10)+")");

    console.log("   On-chain:");
    console.log("       successes: "+reputation[2].successVolume.toString(10)+" ("+reputation[2].successCount.toString(10)+")");
    console.log("       fails: "+reputation[2].failVolume.toString(10)+" ("+reputation[2].failCount.toString(10)+")");
    console.log("       coop closes: "+reputation[2].coopCloseVolume.toString(10)+" ("+reputation[2].coopCloseCount.toString(10)+")");

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
    await printReputation(swapContract, WBTC_ADDRESS);

    console.log("USDC:");
    await printReputation(swapContract, USDC_ADDRESS);

    console.log("USDT:");
    await printReputation(swapContract, USDT_ADDRESS);

    console.log("MATIC:");
    await printReputation(swapContract, ETH_ADDRESS);

}

main();