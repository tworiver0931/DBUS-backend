const { ethers } = require("ethers");
const {Web3} = require('web3');

const network = process.env.ETHEREUM_NETWORK;
const web3 = new Web3(
  new Web3.providers.HttpProvider(
    `https://${network}.infura.io/v3/${process.env.INFURA_API_KEY}`,
  ),
);

const fs = require('fs');
const path = require('path');
const { sign } = require("crypto");
    async function main() {
      // Configuring the connection to an Ethereum node
      const network = process.env.ETHEREUM_NETWORK;
      console.log(process.env.INFURA_API_KEY);
      // const provider = new ethers.InfuraProvider(process.env.ETHEREUM_NETWORK, {
      //   projectId: process.env.PROJECT_ID,
      //   projectSecret: process.env.PROJECT_SECRET
      // })

      const provider = new ethers.providers.JsonRpcProvider(process.env.RPC_URL)
      console.log(provider);
      // Creating a signing account from a private key
      const signer = new ethers.Wallet(process.env.SIGNER_PRIVATE_KEY, provider);
      
      
      
      
      //or create signer
      // ethers (create random new account)
      //const signer = ethers.Wallet.createRandom();

      const abi = require('../artifacts/DTicketAbi.json');
      const bytecodePath = path.join(path.dirname(__dirname), 'artifacts', 'DTicketBytecode.bin');
      const bytecode = fs.readFileSync(bytecodePath, 'utf8');
      //console.log('contract address', contract.address)
      const contract_address = '0x5cdf9ef935caAb1b115Bc4025EA77ddd3907d435';
      const contract = new ethers.Contract(contract_address, abi, signer);

      const value = await contract.owner();
      console.log('contract owner: ', value);
      
      const mintParameter = {
        account: process.env.SIGNER_ADDRESS,
        id: 0,
        amount: 100,
        data: web3.utils.utf8ToHex('1')
      }

      const tx = await contract.mint(mintParameter.account, mintParameter.id, mintParameter.amount, mintParameter.data);
      const receipt = await tx.wait();
      console.log(receipt);
      //await contract.deployTransaction.wait();

    
    }

    require("dotenv").config();
    main();