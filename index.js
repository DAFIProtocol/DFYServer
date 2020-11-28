const express = require('express');
const app = express();
const request = require('request');
const millify = require('millify');
const MongoClient = require('mongodb').MongoClient;

const abi = [{
        "inputs": [],
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "anonymous": false,
        "inputs": [{
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
        "inputs": [{
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
        "inputs": [],
        "name": "DECIMALS",
        "outputs": [{
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
        }],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "INITIAL_SUPPLY",
        "outputs": [{
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
        }],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "PROXIMITY",
        "outputs": [{
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
        }],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [{
            "internalType": "address",
            "name": "",
            "type": "address"
        }],
        "name": "_balances",
        "outputs": [{
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
        }],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "_totalSupply",
        "outputs": [{
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
        }],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [{
            "internalType": "uint256",
            "name": "currentBTCUSDRate",
            "type": "uint256"
        }],
        "name": "adjust",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [{
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
        "outputs": [{
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
        }],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [{
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
        "outputs": [{
            "internalType": "bool",
            "name": "",
            "type": "bool"
        }],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [{
            "internalType": "address",
            "name": "account",
            "type": "address"
        }],
        "name": "balanceOf",
        "outputs": [{
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
        }],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "decimals",
        "outputs": [{
            "internalType": "uint8",
            "name": "",
            "type": "uint8"
        }],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [{
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
        "outputs": [{
            "internalType": "bool",
            "name": "",
            "type": "bool"
        }],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [{
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
        "outputs": [{
            "internalType": "bool",
            "name": "",
            "type": "bool"
        }],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "name",
        "outputs": [{
            "internalType": "string",
            "name": "",
            "type": "string"
        }],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "previousBTCUSDRate",
        "outputs": [{
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
        }],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "symbol",
        "outputs": [{
            "internalType": "string",
            "name": "",
            "type": "string"
        }],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "totalSupply",
        "outputs": [{
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
        }],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [{
                "internalType": "address",
                "name": "recipient",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            }
        ],
        "name": "transfer",
        "outputs": [{
            "internalType": "bool",
            "name": "",
            "type": "bool"
        }],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [{
                "internalType": "address",
                "name": "sender",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "recipient",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            }
        ],
        "name": "transferFrom",
        "outputs": [{
            "internalType": "bool",
            "name": "",
            "type": "bool"
        }],
        "stateMutability": "nonpayable",
        "type": "function"
    }
];


const Web3 = require('web3');
const web3 = new Web3(new Web3.providers.HttpProvider("*"));
const dbName = '*';
const uri = `*`;
const contractAddress = '*';
const contract = new web3.eth.Contract(abi, contractAddress);
const accounts = [
    `0x9A54387CD45d73b760d20B305CF2f9c664F25DF3`,
    `0x5bc8C17A52885Fc10e6e6C1742DA1E064eC8b8E9`,
    `0xEe4d51f6d3Da5417D74Ca6DaAB07490CB76d0e8d`,
    `0x8be903A229bBB069E7059c7838B30e677fBC4C30`,
    `0x0230699450099B80631b49672153684eE31af0Fd`,
    `0xb501dEF0915b2c1359058d97234F95894a8eA647`,
    `0xf99CC2aeFa3bD4FDfAcC43d4086788f10ee06B55`,
    `0xE6613282a79c691c9fcC9D5Cb460486D3DA2eaB8`,
    `0xD5abAaB14e81B8AE57D2Bee0024E1c593BB5A1D0`,
    `0x37DB0F7ddC14baf6FD9f0484E9E63B658419aF53`,
];
const balances = `https://api.etherscan.io/api?module=account&action=balancemulti&address=${accounts.join(',')}&tag=latest&apikey=*`;

const account = web3.eth.accounts.privateKeyToAccount('*');
web3.eth.accounts.wallet.add(account);
web3.eth.defaultAccount = account.address;

function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}
app.get('/supply', (req, res) => {
    res.set('Access-Control-Allow-Origin', "*");
    res.set('Access-Control-Allow-Methods', 'GET, POST');
    MongoClient.connect(uri, function(err, client) {
        const db = client.db(dbName);
        findDocuments(db, (docs => {
            client.close();
            docs = docs.map(item => {
                item.supply =  Math.round(+web3.utils.fromWei(item.supply, 'ether'));

                return item;
            }).sort(function(a, b){
                if(a.date < b.date) { return -1; }
                if(a.date > b.date) { return 1; }
                return 0;
            });
            return res.status(200).json({
                data: docs
            });
        }))
    });
});

app.get('/price', (req, res) => {
    res.set('Access-Control-Allow-Origin', "*");
    res.set('Access-Control-Allow-Methods', 'GET, POST');
    MongoClient.connect(uri, function(err, client) {
        const db = client.db(dbName);
        findDocuments(db, (docs => {
            client.close();
            docs = docs.sort(function(a, b){
                if(a.date < b.date) { return -1; }
                if(a.date > b.date) { return 1; }
                return 0;
            });
            return res.status(200).json({
                data: docs
            });
        }))
    });
});


app.get('/test-supply', (req, res) => {
    res.set('Access-Control-Allow-Origin', "*");
    res.set('Access-Control-Allow-Methods', 'GET, POST');
    const docs = [];
    const d = new Date();
    d.setDate(d.getDate() - 31)

    for (let index = 0; index < 31; index++) {
        docs[index] = {
            date: `${d.getUTCDate()}/${d.getUTCMonth() + 1}`,
            supply: getRandomArbitrary(100, 10000)
        };
        
        d.setDate(d.getDate() + 1);
    }
    return res.status(200).json({
        data: docs
    });
});

app.get('/addresses', (req, res) => {
    res.set('Access-Control-Allow-Origin', "*");
    res.set('Access-Control-Allow-Methods', 'GET, POST');

    request(balances, async function(error, response, body) {
        if (error) {
            return res.status(response && response.statusCode || 420).send(error)
        }

        const result = [];
        const data = JSON.parse(body);
        var date = new Date();
        var hour = date.getUTCHours();
        hour = (hour < 10 ? "0" : "") + hour;
        const lastEdit = hour < 9 ? 'Yesterday 9:00 AM'  : 'Today 9:00 AM';

        for (const iterator of data.result) {
            result.push({
                wallet: iterator.account,
                amount: `${iterator.balance}$`,
                lastEdit,
            });
        }

        return res.status(200).json({
            data: result
        });
    });
});

app.get('/adjust', (req, res) => {
    request('https://api.coinbase.com/v2/prices/spot?currency=USD', async function(error, response, body) {
        if (error) {
            return res.status(response && response.statusCode || 420).send(error)
        }

        const result = JSON.parse(body);
        const accounts = await web3.eth.getAccounts();
        console.log(accounts);

        const transactionRequest = {
            from: accounts[0]
        };
        const gasEstimate = await web3.eth.estimateGas(transactionRequest);

        transactionRequest.gas = 3 * gasEstimate;

        web3.eth.getGasPrice(function(error, result){ 
            var gasPrice = Number(result);
            console.log("gas cost estimation = " + web3.utils.fromWei(`${(gasEstimate * gasPrice)}`, 'ether') + " ether");

        });

        contract.methods.adjust(Math.round(+result.data.amount)).send(transactionRequest, (error, txHash) => {
                console.log(error, txHash);
            })
            .on('confirmation', async function(confirmationNumber, receipt) {

                const supply = await contract.methods.totalSupply().call();
                MongoClient.connect(uri, function(err, client) {

                    const db = client.db(dbName);
                    insertDocument(supply, Math.round(+result.data.amount), db, (() => {
                        client.close();
                        return res.json({
                            amount: result.data.amount,
                        });
                    }))
                });
            });
    });
});



const insertDocument = function(supply, price, db, callback) {
    const collection = db.collection('documents');
    collection.createIndex( { "date": 1 }, { unique: true } );
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0');
    var yyyy = today.getFullYear();

    today = mm + '/' + dd + '/' + yyyy;
    collection.insertOne({
        supply: supply,
        price: price,
        date: today
    }, function(err, result) {

        callback(result);
    });
}

const findDocuments = function(db, callback) {
    const collection = db.collection('documents');
    collection.find({}).toArray(function(err, docs) {
        callback(docs);
    });
}

exports.api = app;
