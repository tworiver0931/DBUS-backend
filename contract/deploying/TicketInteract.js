const { ethers } = require("ethers");
const { Web3 } = require("web3");
const fs = require("fs");
const path = require("path");
const network = process.env.ETHEREUM_NETWORK;
const web3 = new Web3(
  new Web3.providers.HttpProvider(
    `https://${network}.infura.io/v3/${process.env.INFURA_API_KEY}`
  )
);

const mint = async (param) => {
  // Configuring the connection to an Ethereum node
  const network = process.env.ETHEREUM_NETWORK;
  const provider = new ethers.providers.JsonRpcProvider(process.env.RPC_URL);
  const signer = new ethers.Wallet(process.env.SIGNER_PRIVATE_KEY, provider);

  const abi = require("../artifacts/DTicketAbi.json");
  const bytecodePath = path.join(
    path.dirname(__dirname),
    "artifacts",
    "DTicketBytecode.bin"
  );
  const bytecode = fs.readFileSync(bytecodePath, "utf8");

  const contractAddressPath = path.join(
    path.dirname(__dirname),
    "artifacts",
    "DTicketAddress.bin"
  );
  const contract_address = fs.readFileSync(contractAddressPath, "utf8");
  const contract = new ethers.Contract(contract_address, abi, signer);

  const value = await contract.owner();
  console.log("contract owner: ", value);

  //const tx = await contract.mint(param.account, param.id, param.amount, param.data);
  const tx = await contract.mint(
    "0xddF2b929370CF0962F0A87A49f388CA191432008",
    0,
    100,
    web3.utils.utf8ToHex("0")
  );
  const receipt = await tx.wait();
  console.log(receipt);
};

export const setApproveForAll = async (param) => {
  // Configuring the connection to an Ethereum node
  const network = process.env.ETHEREUM_NETWORK;
  const provider = new ethers.providers.JsonRpcProvider(process.env.RPC_URL);
  const signer = new ethers.Wallet(process.env.SIGNER_PRIVATE_KEY, provider);

  const abi = require("../artifacts/DTicketAbi.json");
  const bytecodePath = path.join(
    path.dirname(__dirname),
    "artifacts",
    "DTicketBytecode.bin"
  );
  const bytecode = fs.readFileSync(bytecodePath, "utf8");

  const contractAddressPath = path.join(
    path.dirname(__dirname),
    "artifacts",
    "DTicketAddress.bin"
  );
  const contract_address = fs.readFileSync(contractAddressPath, "utf8");
  const contract = new ethers.Contract(contract_address, abi, signer);

  const value = await contract.owner();
  console.log("contract owner: ", value);

  const tx = await contract.setApprovalForAll(param.operator, param.approved);
  const receipt = await tx.wait();
  console.log(receipt);
};

const safeTransferFrom = async (param) => {
  // Configuring the connection to an Ethereum node
  const network = process.env.ETHEREUM_NETWORK;
  const provider = new ethers.providers.JsonRpcProvider(process.env.RPC_URL);
  const signer = new ethers.Wallet(process.env.SIGNER_PRIVATE_KEY, provider);

  const abi = require("../artifacts/DTicketAbi.json");
  const bytecodePath = path.join(
    path.dirname(__dirname),
    "artifacts",
    "DTicketBytecode.bin"
  );
  const bytecode = fs.readFileSync(bytecodePath, "utf8");

  const contractAddressPath = path.join(
    path.dirname(__dirname),
    "artifacts",
    "DTicketAddress.bin"
  );
  const contract_address = fs.readFileSync(contractAddressPath, "utf8");
  const contract = new ethers.Contract(contract_address, abi, signer);

  const value = await contract.owner();
  console.log("contract owner: ", value);

  const tx = await contract.safeTransferFrom(
    param._from,
    param._to,
    param._id,
    param._value,
    param._data
  );
  const receipt = await tx.wait();
  console.log(receipt);
};

const mintParameter = {
  account: process.env.SIGNER_ADDRESS,
  id: 0,
  amount: 100,
  data: web3.utils.utf8ToHex("0"),
};

require("dotenv").config();
//mint(mintParameter);

const setApprovalForAllParameter = {
  operator: "0xddF2b929370CF0962F0A87A49f388CA191432008",
  approved: true,
};

const safeTransferFromParam = {
  _from: "0xddF2b929370CF0962F0A87A49f388CA191432008",
  _to: "0x9b6B8120E4e692B2281d8953987462288dE6b001",
  _id: 0,
  _value: 1000,
  _data: web3.utils.utf8ToHex("0"),
};
//setApproveForAll(setApprovalForAllParameter);
//safeTransferFrom(safeTransferFromParam);
//mint(mintParameter);
