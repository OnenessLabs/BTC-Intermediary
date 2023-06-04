import * as dotenv from "dotenv";
dotenv.config();

import * as fs from "fs/promises";
import {EVMSigner} from "./chains/evm/signer/EVMSigner";
import {
    BITCOIN_BLOCKTIME, BITCOIN_NETWORK,
    CHAIN_BASE_FEE,
    CHAIN_FEE_PPM,
    CHAIN_MAX,
    CHAIN_MIN, CHAIN_SEND_SAFETY_FACTOR, ETH_ADDRESS,
    GRACE_PERIOD,
    LN_BASE_FEE,
    LN_FEE_PPM,
    LN_MAX,
    LN_MIN,
    MAX_SOL_SKEW, NETWORK_FEE_MULTIPLIER_PPM,
    SAFETY_FACTOR,
    USDC_ADDRESS,
    USDT_ADDRESS,
    WBTC_ADDRESS
} from "./constants/Constants";
import * as express from "express";
import * as cors from "cors";
import {testnet} from "bitcoinjs-lib/src/networks";
import {EVMBtcRelay, EVMSwapData, EVMSwapProgram} from "crosslightning-evm";
import BtcRPC, {BtcRPCConfig} from "./btc/BtcRPC";
import * as BN from "bn.js";
import {AUTHORIZATION_TIMEOUT} from "./constants/Constants";
import LND from "./btc/LND";
import {CoinGeckoSwapPrice, FromBtcAbs, FromBtcLnAbs,
    InfoHandler,
    SwapHandler, SwapNonce, ToBtcAbs, ToBtcLnAbs, StorageManager, FromBtcSwapAbs, ToBtcSwapAbs} from "crosslightning-intermediary";
import {BitcoindRpc} from "btcrelay-bitcoind";
import {EVMChainEvents} from "crosslightning-evm/dist/evm/events/EVMChainEvents";

const bitcoin_chainparams = { ...testnet };
bitcoin_chainparams.bip32 = {
    public: 0x045f1cf6,
    private: 0x045f18bc,
};

const SECURITY_DEPOSIT_APY = 0.2; //20% p.a.

async function main() {

    const directory = "./storage";

    try {
        await fs.mkdir(directory)
    } catch (e) {}

    const nonce = new SwapNonce(directory);
    await nonce.init();

    console.log("[Main]: Running in bitcoin "+process.env.BTC_NETWORK+" mode!");
    console.log("[Main]: Using chain with ID: "+process.env.SOL_RPC_URL+"!");

    console.log("[Main]: Nonce initialized!");

    await EVMSigner.init();

    const bitcoinRpc = new BitcoindRpc(
        BtcRPCConfig.protocol,
        BtcRPCConfig.user,
        BtcRPCConfig.pass,
        BtcRPCConfig.host,
        BtcRPCConfig.port
    );
    const btcRelay = new EVMBtcRelay(EVMSigner, bitcoinRpc, process.env.EVM_BTC_RELAY_CONTRACT_ADDRESS);
    const swapContract = new EVMSwapProgram(EVMSigner, btcRelay, process.env.EVM_SWAP_CONTRACT_ADDRESS);
    const chainEvents = new EVMChainEvents(directory, EVMSigner.provider, swapContract);

    const allowedTokens = [
        USDC_ADDRESS,
        USDT_ADDRESS,
        WBTC_ADDRESS,
        ETH_ADDRESS
    ];

    const coinMap = CoinGeckoSwapPrice.generateCoinMap(allowedTokens[0], allowedTokens[1], allowedTokens[2]);
    coinMap[ETH_ADDRESS] = {
        decimals: 18,
        coinId: "$fixed-1218"
    };

    const prices = new CoinGeckoSwapPrice(null, coinMap);

    await swapContract.start();
    console.log("[Main]: Swap contract initialized!");

    const swapHandlers: SwapHandler<any, EVMSwapData>[] = [];

    swapHandlers.push(
        new ToBtcAbs<EVMSwapData>(new StorageManager(directory+"/tobtc"), "/tobtc", swapContract, chainEvents, nonce, allowedTokens, LND, prices, bitcoinRpc, {
            authorizationTimeout: AUTHORIZATION_TIMEOUT,
            bitcoinBlocktime: BITCOIN_BLOCKTIME,
            gracePeriod: GRACE_PERIOD,
            baseFee: CHAIN_BASE_FEE,
            feePPM: CHAIN_FEE_PPM,
            max: CHAIN_MAX,
            min: CHAIN_MIN,
            maxSkew: MAX_SOL_SKEW,
            safetyFactor: SAFETY_FACTOR,
            sendSafetyFactor: CHAIN_SEND_SAFETY_FACTOR,

            bitcoinNetwork: BITCOIN_NETWORK,

            minChainCltv: new BN(10),

            networkFeeMultiplierPPM: NETWORK_FEE_MULTIPLIER_PPM,
            minConfirmations: 1,
            maxConfirmations: 6,
            maxConfTarget: 12,
            minConfTarget: 1,

            txCheckInterval: 10*1000,
            swapCheckInterval: 5*60*1000
        })
    );
    swapHandlers.push(
        new FromBtcAbs<EVMSwapData>(new StorageManager(directory+"/frombtc"), "/frombtc", swapContract, chainEvents, nonce, allowedTokens, LND, prices, {
            authorizationTimeout: AUTHORIZATION_TIMEOUT,
            bitcoinBlocktime: BITCOIN_BLOCKTIME,
            baseFee: CHAIN_BASE_FEE,
            feePPM: CHAIN_FEE_PPM,
            max: CHAIN_MAX,
            min: CHAIN_MIN,
            maxSkew: MAX_SOL_SKEW,
            safetyFactor: SAFETY_FACTOR,

            bitcoinNetwork: BITCOIN_NETWORK,

            confirmations: 2,
            swapCsvDelta: 72,

            refundInterval: 5*60*1000,
            securityDepositAPY: SECURITY_DEPOSIT_APY
        })
    );

    swapHandlers.push(
        new ToBtcLnAbs<EVMSwapData>(new StorageManager(directory+"/tobtcln"), "/tobtcln", swapContract, chainEvents, nonce, allowedTokens, LND, prices, {
            authorizationTimeout: AUTHORIZATION_TIMEOUT,
            bitcoinBlocktime: BITCOIN_BLOCKTIME,
            gracePeriod: GRACE_PERIOD,
            baseFee: LN_BASE_FEE,
            feePPM: LN_FEE_PPM,
            max: LN_MAX,
            min: LN_MIN,
            maxSkew: MAX_SOL_SKEW,
            safetyFactor: SAFETY_FACTOR,

            minSendCltv: new BN(10),

            swapCheckInterval: 5*60*1000,

            routingFeeMultiplier: new BN(2)
        })
    );
    swapHandlers.push(
        new FromBtcLnAbs<EVMSwapData>(new StorageManager(directory+"/frombtcln"), "/frombtcln", swapContract, chainEvents, nonce, allowedTokens, LND, prices, {
            authorizationTimeout: AUTHORIZATION_TIMEOUT,
            bitcoinBlocktime: BITCOIN_BLOCKTIME,
            gracePeriod: GRACE_PERIOD,
            baseFee: LN_BASE_FEE,
            feePPM: LN_FEE_PPM,
            max: LN_MAX,
            min: LN_MIN,
            maxSkew: MAX_SOL_SKEW,
            safetyFactor: SAFETY_FACTOR,

            minCltv: new BN(20),

            refundInterval: 5*60*1000,
            securityDepositAPY: SECURITY_DEPOSIT_APY
        })
    );

    for(let swapHandler of swapHandlers) {
        await swapHandler.init();
    }

    console.log("[Main]: Swap handlers initialized!");

    await chainEvents.init();

    console.log("[Main]: Chain events synchronized!");

    for(let swapHandler of swapHandlers) {
        await swapHandler.startWatchdog();
    }

    console.log("[Main]: Watchdogs started!");

    const restServer = express();
    restServer.use(cors());
    restServer.use(express.json());

    const infoHandler = new InfoHandler(swapContract, "", swapHandlers);

    for(let swapHandler of swapHandlers) {
        swapHandler.startRestServer(restServer);
    }

    infoHandler.startRestServer(restServer);

    const listenPort = process.env.REST_PORT==null ? 4000 : parseInt(process.env.REST_PORT);

    restServer.listen(listenPort);

    console.log("[Main]: Rest server listening on port: ", listenPort)

}


main().catch(e => console.error(e));