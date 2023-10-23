
const { ethers } = require("ethers");

const fs = require('fs');
const path = require('path');
require("dotenv").config();
const url = process.env.RPC_URL;
console.log('url', url);
const provider = new ethers.providers.JsonRpcProvider(process.env.RPC_URL)

const signer = new ethers.Wallet(process.env.SIGNER_PRIVATE_KEY, provider);



const filter = async () => {
  const provider = new ethers.providers.JsonRpcProvider(process.env.RPC_URL)
  let myFilter = {
    fromBlock: Number(process.env.BLOCKNUMBER),
    toBlock: 'latest',
    address: process.env.FUNDREGISTRY_ADDRESS,
    topics: [
      ethers.utils.id("FundCreated(uint96,address,address,uint256,uint256,bool,uint256)"),
    ]
  };
  //console.log(myFilter);
  const log = await provider.getLogs(myFilter); 
  
  
  const decodedId = ethers.utils.defaultAbiCoder.decode(['uint96'], log[0].topics[1]);
  console.log(decodedId);
}


filter();