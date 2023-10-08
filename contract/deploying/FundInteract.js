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

      const abi = require('../artifacts/FundRegistryAbi.json');
      const bytecodePath = path.join(path.dirname(__dirname), 'artifacts', 'FundRegistryBytecode.bin');
      const bytecode = fs.readFileSync(bytecodePath, 'utf8');
      //console.log('contract address', contract.address)
      const contract_address = '0x32BFF4eA0C31c08f299610718Ec10834584940D6'
      const contract = new ethers.Contract(contract_address, abi, signer);

      const value = await contract.fundCount();
      console.log('contract owner: ', value);
      
      const param = {
        owner: process.env.SIGNER_ADDRESS,
        payee: process.env.SIGNER_ADDRESS,
        threshold: 100
        //data: web3.utils.utf8ToHex('1')
      }

      const tx = await contract.createFund(param.owner, param.payee, param.threshold);
      const receipt = await tx.wait();
      console.log(receipt);
      //await contract.deployTransaction.wait();

    
    }

    require("dotenv").config();
    main();