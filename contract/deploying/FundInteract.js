const { ethers } = require("ethers");
const { recoverPublicKey } = require("ethers/lib/utils");

require("dotenv").config();
const fs = require("fs");
const path = require("path");
const provider = new ethers.providers.JsonRpcProvider(process.env.RPC_URL); //metamask로 rpc를 연결하면 자동으로 signer랑 연결.
const signer = new ethers.Wallet(process.env.SIGNER_PRIVATE_KEY, provider);

const createFund = async (param) => {
  const abi = require("../artifacts/FundRegistryAbi.json");
  const bytecodePath = path.join(
    path.dirname(__dirname),
    "artifacts",
    "FundRegistryBytecode.bin"
  );
  const bytecode = fs.readFileSync(bytecodePath, "utf8");
  //console.log('contract address', contract.address)
  const contractAddressPath = path.join(
    path.dirname(__dirname),
    "artifacts",
    "FundRegistryAddress.bin"
  );
  const contract_address = fs.readFileSync(contractAddressPath, "utf8");
  const contract = new ethers.Contract(contract_address, abi, signer); //provider를 제공시 읽기권한, signer하면, write권한까지.

  const value = await contract.fundCount();
  console.log("fundCount: ", value);

  const tx = await contract.createFund(
    param.owner,
    param.payee,
    param.threshold
  ); //transaction response반환.
  const receipt = await tx.wait();
  console.log(receipt);
  return receipt;
};

const defaultMintToOwner = async (param) => {
  const abi = require("../artifacts/FundRegistryAbi.json");
  const bytecodePath = path.join(
    path.dirname(__dirname),
    "artifacts",
    "FundRegistryBytecode.bin"
  );
  const bytecode = fs.readFileSync(bytecodePath, "utf8");
  //console.log('contract address', contract.address)
  const contractAddressPath = path.join(
    path.dirname(__dirname),
    "artifacts",
    "FundRegistryAddress.bin"
  );
  const contract_address = fs.readFileSync(contractAddressPath, "utf8");
  const contract = new ethers.Contract(contract_address, abi, signer);

  const tx = await contract.defaultMintToOwner(param._amount);
  const receipt = await tx.wait();
  console.log(receipt);
  return receipt;
};

const donate = async (param) => {
  const abi = require("../artifacts/FundRegistryAbi.json");
  const bytecodePath = path.join(
    path.dirname(__dirname),
    "artifacts",
    "FundRegistryBytecode.bin"
  );
  const bytecode = fs.readFileSync(bytecodePath, "utf8");
  //console.log('contract address', contract.address)
  const contractAddressPath = path.join(
    path.dirname(__dirname),
    "artifacts",
    "FundRegistryAddress.bin"
  );
  const contract_address = fs.readFileSync(contractAddressPath, "utf8");
  const contract = new ethers.Contract(contract_address, abi, signer);

  const value = await contract.fundCount();
  console.log("fundCount: ", value);

  const tx = await contract.donate(
    param._user,
    param._fundId,
    param._fundAmount
  );
  const receipt = await tx.wait();
  console.log(receipt);
  return receipt;
};

const createFundParam = {
  owner: "0xddF2b929370CF0962F0A87A49f388CA191432008",
  payee: "0xddF2b929370CF0962F0A87A49f388CA191432008",
  threshold: 100,
  //data: web3.utils.utf8ToHex('1')
};
//createFund(createFundParam);

const donateParam = {
  _user: "0xddF2b929370CF0962F0A87A49f388CA191432008",
  _fundId: 4,
  _fundAmount: 102,
};

const defaultMintToOwnerParam = {
  _amount: 100000,
};

donate(donateParam);
