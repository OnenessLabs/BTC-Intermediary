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

async function transfer(amount: string, token: string, address: string) {

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

    const tokenContract = new Contract(useToken, erc20Mintable.abi, EVMSigner);

    const amountBN = BigNumber.from(amount);

    let transferTx;
    if(useToken!==ETH_ADDRESS) {
        transferTx = await tokenContract.populateTransaction.transfer(address, amountBN);
        transferTx.gasLimit = BigNumber.from(100000);
    } else {
        transferTx = {
            from: this.getAddress(),
            to: address,
            value: amountBN,
            gasLimit: BigNumber.from(21000)
        };
    }

    const txData = await EVMSigner.sendTransaction(transferTx);

    await EVMSigner.provider.waitForTransaction(txData.hash);

    console.log("Transfer sent: ", txData.hash);

    EVMSigner.stop();

    return true;

}

async function main() {
    if(process.argv.length<5) {
        console.error("Needs at least 2 arguments");
        console.error("Usage: node transfer.js <token:WBTC,USDC,USDT,ETH> <amount> <recipient>");
        return;
    }

    const token = process.argv[2];
    const amount = process.argv[3];
    const address = process.argv[4];

    if(!(await transfer(amount, token, address))) {
        console.error("Invalid token argument (must be one of WBTC, USDC, USDT)");
    }
}

main();