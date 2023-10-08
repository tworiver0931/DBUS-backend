const { ethers } = require("ethers");

    async function main() {
      // Configuring the connection to an Ethereum node
      const network = process.env.ETHEREUM_NETWORK;
      console.log(process.env.INFURA_API_KEY);
      // const provider = new ethers.InfuraProvider(process.env.ETHEREUM_NETWORK, {
      //   projectId: process.env.PROJECT_ID,
      //   projectSecret: process.env.PROJECT_SECRET
      // })

      const provider = new ethers.JsonRpcProvider(process.env.RPC_URL)
      console.log(provider);
      // Creating a signing account from a private key
      const signer = new ethers.Wallet(process.env.SIGNER_PRIVATE_KEY, provider);
      
      
      
      
      //or create signer
      // ethers (create random new account)
      //const signer = ethers.Wallet.createRandom();

      
      
      
      // Creating and sending the transaction object
      const tx = await signer.sendTransaction({
        to: "0x9b6B8120E4e692B2281d8953987462288dE6b001",
        value: ethers.parseUnits("0.001", "ether"),
      });
      console.log("Mining transaction...");
      console.log(`https://${network}.etherscan.io/tx/${tx.hash}`);
      // Waiting for the transaction to be mined
      const receipt = await tx.wait();
      // The transaction is now on chain!
      console.log(`Mined in block ${receipt.blockNumber}`);
    }

    require("dotenv").config();
    main();