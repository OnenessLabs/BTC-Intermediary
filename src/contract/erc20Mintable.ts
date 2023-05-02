
export const erc20Mintable = {
    bytecode: "0x60806040523480156200001157600080fd5b506040516200129f3803806200129f8339810160408190526200003491620001b2565b82826003620000448382620002c6565b506004620000538282620002c6565b505050620000706200006a6200009760201b60201c565b6200009b565b6005805460ff909216600160a01b0260ff60a01b1990921691909117905550620003929050565b3390565b600580546001600160a01b038381166001600160a01b0319831681179093556040519116919082907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a35050565b634e487b7160e01b600052604160045260246000fd5b600082601f8301126200011557600080fd5b81516001600160401b0380821115620001325762000132620000ed565b604051601f8301601f19908116603f011681019082821181831017156200015d576200015d620000ed565b816040528381526020925086838588010111156200017a57600080fd5b600091505b838210156200019e57858201830151818301840152908201906200017f565b600093810190920192909252949350505050565b600080600060608486031215620001c857600080fd5b83516001600160401b0380821115620001e057600080fd5b620001ee8783880162000103565b945060208601519150808211156200020557600080fd5b50620002148682870162000103565b925050604084015160ff811681146200022c57600080fd5b809150509250925092565b600181811c908216806200024c57607f821691505b6020821081036200026d57634e487b7160e01b600052602260045260246000fd5b50919050565b601f821115620002c157600081815260208120601f850160051c810160208610156200029c5750805b601f850160051c820191505b81811015620002bd57828155600101620002a8565b5050505b505050565b81516001600160401b03811115620002e257620002e2620000ed565b620002fa81620002f3845462000237565b8462000273565b602080601f831160018114620003325760008415620003195750858301515b600019600386901b1c1916600185901b178555620002bd565b600085815260208120601f198616915b82811015620003635788860151825594840194600190910190840162000342565b5085821015620003825787850151600019600388901b60f8161c191681555b5050505050600190811b01905550565b610efd80620003a26000396000f3fe608060405234801561001057600080fd5b50600436106100f55760003560e01c806370a0823111610097578063a457c2d711610066578063a457c2d714610226578063a9059cbb14610239578063dd62ed3e1461024c578063f2fde38b1461029257600080fd5b806370a08231146101b8578063715018a6146101ee5780638da5cb5b146101f657806395d89b411461021e57600080fd5b806323b872dd116100d357806323b872dd1461014d578063313ce56714610160578063395093511461019057806340c10f19146101a357600080fd5b806306fdde03146100fa578063095ea7b31461011857806318160ddd1461013b575b600080fd5b6101026102a5565b60405161010f9190610cea565b60405180910390f35b61012b610126366004610d7f565b610337565b604051901515815260200161010f565b6002545b60405190815260200161010f565b61012b61015b366004610da9565b610351565b60055474010000000000000000000000000000000000000000900460ff1660405160ff909116815260200161010f565b61012b61019e366004610d7f565b610375565b6101b66101b1366004610d7f565b6103c1565b005b61013f6101c6366004610de5565b73ffffffffffffffffffffffffffffffffffffffff1660009081526020819052604090205490565b6101b66103d7565b60055460405173ffffffffffffffffffffffffffffffffffffffff909116815260200161010f565b6101026103eb565b61012b610234366004610d7f565b6103fa565b61012b610247366004610d7f565b6104d0565b61013f61025a366004610e07565b73ffffffffffffffffffffffffffffffffffffffff918216600090815260016020908152604080832093909416825291909152205490565b6101b66102a0366004610de5565b6104de565b6060600380546102b490610e3a565b80601f01602080910402602001604051908101604052809291908181526020018280546102e090610e3a565b801561032d5780601f106103025761010080835404028352916020019161032d565b820191906000526020600020905b81548152906001019060200180831161031057829003601f168201915b5050505050905090565b600033610345818585610595565b60019150505b92915050565b60003361035f858285610748565b61036a85858561081f565b506001949350505050565b33600081815260016020908152604080832073ffffffffffffffffffffffffffffffffffffffff8716845290915281205490919061034590829086906103bc908790610e8d565b610595565b6103c9610ad2565b6103d38282610b53565b5050565b6103df610ad2565b6103e96000610c73565b565b6060600480546102b490610e3a565b33600081815260016020908152604080832073ffffffffffffffffffffffffffffffffffffffff87168452909152812054909190838110156104c3576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602560248201527f45524332303a2064656372656173656420616c6c6f77616e63652062656c6f7760448201527f207a65726f00000000000000000000000000000000000000000000000000000060648201526084015b60405180910390fd5b61036a8286868403610595565b60003361034581858561081f565b6104e6610ad2565b73ffffffffffffffffffffffffffffffffffffffff8116610589576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602660248201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160448201527f646472657373000000000000000000000000000000000000000000000000000060648201526084016104ba565b61059281610c73565b50565b73ffffffffffffffffffffffffffffffffffffffff8316610637576040517f08c379a0000000000000000000000000000000000000000000000000000000008152602060048201526024808201527f45524332303a20617070726f76652066726f6d20746865207a65726f2061646460448201527f726573730000000000000000000000000000000000000000000000000000000060648201526084016104ba565b73ffffffffffffffffffffffffffffffffffffffff82166106da576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602260248201527f45524332303a20617070726f766520746f20746865207a65726f20616464726560448201527f737300000000000000000000000000000000000000000000000000000000000060648201526084016104ba565b73ffffffffffffffffffffffffffffffffffffffff83811660008181526001602090815260408083209487168084529482529182902085905590518481527f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925910160405180910390a3505050565b73ffffffffffffffffffffffffffffffffffffffff8381166000908152600160209081526040808320938616835292905220547fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff8114610819578181101561080c576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601d60248201527f45524332303a20696e73756666696369656e7420616c6c6f77616e636500000060448201526064016104ba565b6108198484848403610595565b50505050565b73ffffffffffffffffffffffffffffffffffffffff83166108c2576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602560248201527f45524332303a207472616e736665722066726f6d20746865207a65726f20616460448201527f647265737300000000000000000000000000000000000000000000000000000060648201526084016104ba565b73ffffffffffffffffffffffffffffffffffffffff8216610965576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602360248201527f45524332303a207472616e7366657220746f20746865207a65726f206164647260448201527f657373000000000000000000000000000000000000000000000000000000000060648201526084016104ba565b73ffffffffffffffffffffffffffffffffffffffff831660009081526020819052604090205481811015610a1b576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602660248201527f45524332303a207472616e7366657220616d6f756e742065786365656473206260448201527f616c616e6365000000000000000000000000000000000000000000000000000060648201526084016104ba565b73ffffffffffffffffffffffffffffffffffffffff808516600090815260208190526040808220858503905591851681529081208054849290610a5f908490610e8d565b925050819055508273ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef84604051610ac591815260200190565b60405180910390a3610819565b60055473ffffffffffffffffffffffffffffffffffffffff1633146103e9576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e657260448201526064016104ba565b73ffffffffffffffffffffffffffffffffffffffff8216610bd0576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601f60248201527f45524332303a206d696e7420746f20746865207a65726f20616464726573730060448201526064016104ba565b8060026000828254610be29190610e8d565b909155505073ffffffffffffffffffffffffffffffffffffffff821660009081526020819052604081208054839290610c1c908490610e8d565b909155505060405181815273ffffffffffffffffffffffffffffffffffffffff8316906000907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef9060200160405180910390a35050565b6005805473ffffffffffffffffffffffffffffffffffffffff8381167fffffffffffffffffffffffff0000000000000000000000000000000000000000831681179093556040519116919082907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a35050565b600060208083528351808285015260005b81811015610d1757858101830151858201604001528201610cfb565b5060006040828601015260407fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0601f8301168501019250505092915050565b803573ffffffffffffffffffffffffffffffffffffffff81168114610d7a57600080fd5b919050565b60008060408385031215610d9257600080fd5b610d9b83610d56565b946020939093013593505050565b600080600060608486031215610dbe57600080fd5b610dc784610d56565b9250610dd560208501610d56565b9150604084013590509250925092565b600060208284031215610df757600080fd5b610e0082610d56565b9392505050565b60008060408385031215610e1a57600080fd5b610e2383610d56565b9150610e3160208401610d56565b90509250929050565b600181811c90821680610e4e57607f821691505b602082108103610e87577f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b50919050565b8082018082111561034b577f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fdfea2646970667358221220ee4523c567488821b72b137f00e134442f7fe33cbd2f2bd4ce6ac6ad344ae72a64736f6c63430008120033",
    abi: [
        {
            "inputs": [
                {
                    "internalType": "string",
                    "name": "name",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "ticker",
                    "type": "string"
                },
                {
                    "internalType": "uint8",
                    "name": "__decimals",
                    "type": "uint8"
                }
            ],
            "stateMutability": "nonpayable",
            "type": "constructor"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "owner",
                    "type": "address"
                },
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "spender",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "value",
                    "type": "uint256"
                }
            ],
            "name": "Approval",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "previousOwner",
                    "type": "address"
                },
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "newOwner",
                    "type": "address"
                }
            ],
            "name": "OwnershipTransferred",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "from",
                    "type": "address"
                },
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "to",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "value",
                    "type": "uint256"
                }
            ],
            "name": "Transfer",
            "type": "event"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "owner",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "spender",
                    "type": "address"
                }
            ],
            "name": "allowance",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "spender",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "amount",
                    "type": "uint256"
                }
            ],
            "name": "approve",
            "outputs": [
                {
                    "internalType": "bool",
                    "name": "",
                    "type": "bool"
                }
            ],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "account",
                    "type": "address"
                }
            ],
            "name": "balanceOf",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "decimals",
            "outputs": [
                {
                    "internalType": "uint8",
                    "name": "",
                    "type": "uint8"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "spender",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "subtractedValue",
                    "type": "uint256"
                }
            ],
            "name": "decreaseAllowance",
            "outputs": [
                {
                    "internalType": "bool",
                    "name": "",
                    "type": "bool"
                }
            ],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "spender",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "addedValue",
                    "type": "uint256"
                }
            ],
            "name": "increaseAllowance",
            "outputs": [
                {
                    "internalType": "bool",
                    "name": "",
                    "type": "bool"
                }
            ],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "to",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "amount",
                    "type": "uint256"
                }
            ],
            "name": "mint",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "name",
            "outputs": [
                {
                    "internalType": "string",
                    "name": "",
                    "type": "string"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "owner",
            "outputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "renounceOwnership",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "symbol",
            "outputs": [
                {
                    "internalType": "string",
                    "name": "",
                    "type": "string"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "totalSupply",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "to",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "amount",
                    "type": "uint256"
                }
            ],
            "name": "transfer",
            "outputs": [
                {
                    "internalType": "bool",
                    "name": "",
                    "type": "bool"
                }
            ],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "from",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "to",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "amount",
                    "type": "uint256"
                }
            ],
            "name": "transferFrom",
            "outputs": [
                {
                    "internalType": "bool",
                    "name": "",
                    "type": "bool"
                }
            ],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "newOwner",
                    "type": "address"
                }
            ],
            "name": "transferOwnership",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        }
    ]
};
