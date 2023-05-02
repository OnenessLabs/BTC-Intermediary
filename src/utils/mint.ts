import * as dotenv from "dotenv";
dotenv.config();

import {USDC_ADDRESS, USDT_ADDRESS, WBTC_ADDRESS} from "../constants/Constants";
import {EVMSigner} from "../chains/evm/signer/EVMSigner";
import {BigNumber, Contract, utils} from "ethers";
import {erc20Mintable} from "../contract/erc20Mintable";
import * as fs from "fs/promises";

async function mint(amount: string, acc: string, token: string): Promise<boolean> {

    const directory = "./storage";

    try {
        await fs.mkdir(directory)
    } catch (e) {}

    await EVMSigner.init();

    let useToken;
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
        default:
            return false;
    }


    const tokenContract = new Contract(useToken, erc20Mintable.abi, EVMSigner);

    const amountBN = BigNumber.from(amount);

    const mintTx = await tokenContract.populateTransaction.mint(acc, amountBN);
    mintTx.gasLimit = BigNumber.from(200000);

    const txData = await EVMSigner.sendTransaction(mintTx);
    await EVMSigner.provider.waitForTransaction(txData.hash);

    console.log("Mint successful");

    EVMSigner.stop();

    return true;
}

async function main() {
    if(process.argv.length<4) {
        console.error("Needs at least 2 arguments");
        console.error("Usage: node mint.js <token:WBTC,USDC,USDT> <amount> [address (optional)]");
        return;
    }

    const token = process.argv[2];
    const amount = process.argv[3];

    console.log("amount: ", amount);

    let pubKey = EVMSigner.address;
    if(process.argv.length>4) {
        pubKey = process.argv[4];
        if(!utils.isAddress(pubKey)) {
            console.error("Invalid address argument (not a valid solana address)");
            return;
        }
    }

    if(!(await mint(amount, pubKey, token))) {
        console.error("Invalid token argument (must be one of WBTC, USDC, USDT)");
        return;
    }
}

main();
