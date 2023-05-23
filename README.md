# EVMLightning intermediary (TypeScript)

An off-chain app handling BTC <-> EVM cross-chain swaps, utilizing [EVMLightning-swaps](https://github.com/adambor/crosslightning-libs/blob/main/crosslightning-evm/solidity/SwapContract.sol) EVM on-chain smart contract.

Principle of operation is described in depth [here](https://github.com/adambor/SolLightning-readme/blob/main/sol-submarine-swaps.md) (for lightning network swaps) and [here](https://github.com/adambor/SolLightning-readme/blob/main/sol-onchain-swaps.md) (for bitcoin on-chain swaps)

This software is made to be used in conjunction with [client SDK](https://github.com/adambor/EVMLightning-sdk).

**NOTE: This implementation is still in alpha stage and MAY contain bugs and uncovered edge-cases. Use at your own risk!**

## REST API
This app starts an http rest api server on port 4000. This is configurable by REST_PORT option in .env file.

```
REST_PORT="4001"
```

**NOTE:** Be sure to open this ports so client SDK can call the REST API.

## Requirements
* bitcoind node
* lnd node (Install instructions [here](https://github.com/lightningnetwork/lnd/blob/master/docs/INSTALL.md))
* nodejs (requires v18 or higher)
* npm
* typescript

## Installation

1. Rename \_Q.env (if using Q) or \_POLYGON.env (if using polygon) file to .env

### Installing bitcoind
1. Download latest version from [here](https://bitcoincore.org/en/download/) or [build from source](https://baloian.medium.com/how-to-setup-and-run-a-bitcoin-full-node-on-ubuntu-a106fb86dbb3)
2. Use the configuration file [bitcoin.conf](https://github.com/adambor/EVMLightning-Intermediary-TS/blob/main/bitcoind/mainnet.bitcoin.conf) (for mainnet) or [bitcoin.conf](https://github.com/adambor/EVMLightning-Intermediary-TS/blob/main/bitcoind/bitcoin.conf) (for testnet)
3. Run the bitcoind with the configuration file: ```bitcoind -conf=<path/to/bitcoin.conf>```
4. Wait till bitcoind finishes with IBD (initial block download), should take no more than a few hours for testnet on a regular PC with good internet connection
5. Create a new wallet in bitcoind: ```bitcoin-cli -conf=<path/to/bitcoin.conf> createwallet test true false "" false false true false``` (for mainnet) or ```bitcoin-cli -testnet -conf=<path/to/bitcoin.conf> createwallet test true false "" false false true false``` (for testnet)
6. Set the configured rpc ip, port, username and password in .env file (not necessary if you used provided [bitcoin.conf](https://github.com/adambor/EVMLightning-Intermediary-TS/blob/main/bitcoind/bitcoin.conf))

### Installing lnd
1. Download latest version from [here](https://github.com/lightningnetwork/lnd/releases) or [build from source](https://github.com/lightningnetwork/lnd/blob/master/docs/INSTALL.md#installing-a-binary-release)
2. Use the provided configuration file [lnd.conf](https://github.com/adambor/EVMLightning-Intermediary-TS/blob/main/lnd/mainnet.lnd.conf) (for mainnet) or [lnd.conf](https://github.com/adambor/EVMLightning-Intermediary-TS/blob/main/lnd/lnd.conf) (for testnet)
3. Either place the lnd.conf file in ~/.lnd/ folder or run lnd with a --configfile argument: ```lnd --configfile=<path/to/lnd.conf>```
4. Wait for the lnd to startup. It should then ask you to create a wallet.
5. Create a new wallet with: ```lncli create``` (for mainnet) or ```lncli -n testnet create``` (for testnet)
6. Save password you used to create a wallet to some known file (e.g. ~/lnd-pass.txt), and add ```wallet-unlock-password-file=<path/to/password-file>``` option to lnd.conf, like so:
    ```
    [Application Options]
    tlsextraip=127.0.0.1
    wallet-unlock-password-file=path/to/password-file
    ```
7. Get the certificate by  ```base64 --wrap=0 ~/.lnd/tls.cert``` and copy the output to LN_CERT field in .env file
8. Get the admin macaroon by  ```base64 --wrap=0 ~/.lnd/data/chain/bitcoin/testnet/admin.macaroon``` and copy the output to LN_MACAROON field in .env file
9. Set the ip and port in the .env (not needed if using provided lnd.conf)
10. Get the bitcoin address ```lncli newaddress p2wkh``` (for mainnet) or ```lncli -n testnet newaddress p2wkh``` (for testnet)
11. Deposit your BTC to the address displayed. When using testnet, you can get some tBTC in these faucets:
    * [coinfaucet.eu](https://coinfaucet.eu/en/btc-testnet)
    * [bitcoinfaucet.uo1.net](https://bitcoinfaucet.uo1.net/)
    * [testnet-faucet.com](https://testnet-faucet.com/btc-testnet/)
    * [onchain.io](https://onchain.io/bitcoin-testnet-faucet)
12. Connect to a well connected bitcoin lightning node, you can find the list [here](https://1ml.com/node?order=capacity) (for mainnet) and [here](https://1ml.com/testnet/node?order=capacity) (for testnet). Pick a node and copy its connection string (should look like so: 038863cf8ab91046230f561cd5b386cbff8309fa02e3f0c3ed161a3aeb64a643b9@203.132.94.196:9735). Then use ```lncli connect <connection string>``` (for mainnet) or ```lncli -n testnet connect <connection string>``` (for testnet) to connect to that node.
13. Open a channel with the node you connected to. Take the public key from the connection string (the part before '@', e.g.: 038863cf8ab91046230f561cd5b386cbff8309fa02e3f0c3ed161a3aeb64a643b9). Open a channel with ```lncli openchannel <node public key> <amount> <push_amount>``` (for mainnet) or ```lncli -n testnet openchannel <node public key> <amount> <push_amount>``` (for testnet). ONLY ON TESTNET: Be sure to push half of your channel's balance to the other node so you can receive, e.g. ```lncli -n testnet openchannel <node public key> 100000 50000```
14. Wait for the channel to be established, you can monitor pending channels with: ```lncli pendingchannels``` (on mainnet) or ```lncli -n testnet pendingchannels``` (for testnet)

### Installing btcrelay
Instructions available [here](https://github.com/adambor/BTCRelay-EVM-TS). Skip steps 2.-4. as you already have bitcoind setup and running.

### Installing EVMLightning
1. Install necessary npm packages: ```npm install```
2. Install typescript: ```npm install -g typescript```
3. Compile to javascript: ```tsc```
5. Generate a new EVM keypair: ```npm run genKey```
6. Deposit some native EVM tokens (Q or MATIC) to the displayed address.
7. (mainnet only) Deposit some WBTC, USDC and/or USDT to the displayed wallet address.
8. (testnet only) Create the WBTC, USDC and USDT tokens on devnet: ```npm run createToken```
9. (testnet only) Mint some WBTC/USDC/USDT token to your new keypair: ```npm run mint <WBTC/USDC/USDT> <amount to mint in satoshis>```
10. (testnet only) You can also mint some WBTC/USDC/USDT tokens to your metamask wallet: ```npm run mint <WBTC/USDC/USDT> <amount to mint in base units> <wallet address>```
11. Deposit your WBTC/USDC/USDT to the smart contract ```npm run deposit <WBTC/USDC/USDT> <amount to deposit in base units>```
12. Be sure that bitcoind, lnd and btcrelay are running before starting the app.
13. Run the app with: ```npm start```
