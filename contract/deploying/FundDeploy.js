const { ethers } = require("ethers");
const fs = require("fs");
const path = require("path");
require("dotenv").config();
// Configuring the connection to an Ethereum node
const network = process.env.ETHEREUM_NETWORK;
const provider = new ethers.providers.JsonRpcProvider(process.env.RPC_URL);
const signer = new ethers.Wallet(process.env.SIGNER_PRIVATE_KEY, provider);
//or create signer
// ethers (create random new account)
//const signer = ethers.Wallet.createRandom();
const abi = require("../artifacts/FundRegistryAbi.json");
const bytecodePath = path.join(
  path.dirname(__dirname),
  "artifacts",
  "FundRegistryBytecode.bin"
);
const bytecode = fs.readFileSync(bytecodePath, "utf8");
const factory = new ethers.ContractFactory(abi, bytecode, signer);
const tokenAddressPath = path.join(
  path.dirname(__dirname),
  "artifacts",
  "DTicketAddress.bin"
);
const tokenAddress = fs.readFileSync(tokenAddressPath, "utf8");

async function deploy() {
  const contract = await factory.deploy(
    tokenAddress,
    process.env.SIGNER_ADDRESS
  );
  console.log("contract address", contract.address);

  await contract.deployTransaction.wait();

  const deployedAddressPath = path.join(
    path.dirname(__dirname),
    "artifacts",
    "FundRegistryAddress.bin"
  );
  fs.writeFileSync(deployedAddressPath, contract.address);
}

deploy();
