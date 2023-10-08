const { ethers } = require("ethers");
const fs = require('fs');
const path = require('path');
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

      const abi = require('./DTicketAbi.json');
      const bytecodePath = path.join(__dirname, 'DTicketBytecode.bin');
      const bytecode = fs.readFileSync(bytecodePath, 'utf8');
      const factory = new ethers.ContractFactory(abi, bytecode, signer)
      const contract = await factory.deploy();
      console.log('contract address', contract.address)

      await contract.deployTransaction.wait();

    
    }

    require("dotenv").config();
    main();