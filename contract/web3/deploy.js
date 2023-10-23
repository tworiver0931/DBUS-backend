

// First step: initialize `web3` instance
const {Web3} = require('web3');
const fs = require('fs');
const path = require('path');
require("dotenv").config();


// Set up a connection to the Ethereum network
const network = process.env.ETHEREUM_NETWORK;
const web3 = new Web3(
  new Web3.providers.HttpProvider(
    `https://${network}.infura.io/v3/${process.env.INFURA_API_KEY}`,
  ),
);



web3.eth.Contract.handleRevert = true;




// Read the bytecode from the file system
const bytecodePath = path.join(__dirname, 'DTicketBytecode.bin');
const bytecode = fs.readFileSync(bytecodePath, 'utf8');

// Create a new contract object using the ABI and bytecode
const abi = require('../deploying/DTicketAbi.json');
const MyContract = new web3.eth.Contract(abi);



async function deploy() {
  
  const privateKeyString = '0xdeca118e3c21630d45baf07cfe4d934c92901d58e9eecb8a1b89663d967b208e';
  const account = web3.eth.accounts.wallet.add(privateKeyString).get(0);
  console.log('addedAccount : ', account);
  const providersAccounts = await web3.eth.getAccounts();
  console.log('getAccounts: ', providersAccounts);
  const defaultAccount = account.address; //providersAccounts[0];
  console.log('deployer account:', defaultAccount);

  const myContract = MyContract.deploy({
      data: '0x' + bytecode,
      arguments: [],
  });

  // optionally, estimate the gas that will be used for development and log it
  const gas = await myContract.estimateGas({
      from: defaultAccount,
  });
  console.log('estimated gas:', gas);

  try {
      // Deploy the contract to the Ganache network
      const tx = await myContract.send({
          from: defaultAccount,
          gas,
          gasPrice: 10000000000,
      });
      console.log('Contract deployed at address: ' + tx.options.address);

      // Write the Contract address to a new file
      const deployedAddressPath = path.join(__dirname, 'DTicketAddress.bin');
      fs.writeFileSync(deployedAddressPath, tx.options.address);
  } catch (error) {
      console.error(error);
  }
}

deploy();
