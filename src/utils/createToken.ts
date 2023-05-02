import * as fs from "fs/promises";
import * as dotenv from "dotenv";
dotenv.config();

import {EVMSigner} from "../chains/evm/signer/EVMSigner";
import {BigNumber, ContractFactory} from "ethers";
import {erc20Mintable} from "../contract/erc20Mintable";

async function main() {
    const directory = "./storage";

    try {
        await fs.mkdir(directory)
    } catch (e) {}

    await EVMSigner.init();

    const tokenFactory = new ContractFactory(erc20Mintable.abi, erc20Mintable.bytecode, EVMSigner);

    const contractWBTC = await tokenFactory.deploy("Wrapped BTC", "WBTC", 8, {gasLimit: BigNumber.from(1500000)});
    const contractUSDC = await tokenFactory.deploy("USD Circle", "USDC", 6, {gasLimit: BigNumber.from(1500000)});
    const contractUSDT = await tokenFactory.deploy("USD Tether", "USDT", 6, {gasLimit: BigNumber.from(1500000)});

    await EVMSigner.provider.waitForTransaction(contractWBTC.deployTransaction.hash);
    await EVMSigner.provider.waitForTransaction(contractUSDC.deployTransaction.hash);
    await EVMSigner.provider.waitForTransaction(contractUSDT.deployTransaction.hash);

    await fs.appendFile(".env",
        "WBTC_ADDRESS=\""+contractWBTC.address+"\"\n"+
        "USDC_ADDRESS=\""+contractUSDC.address+"\"\n"+
        "USDT_ADDRESS=\""+contractUSDT.address+"\"\n");

    console.log("Token address WBTC: ", contractWBTC.address);
    console.log("Token address USDC: ", contractUSDC.address);
    console.log("Token address USDT: ", contractUSDT.address);

    EVMSigner.stop();
}

main();