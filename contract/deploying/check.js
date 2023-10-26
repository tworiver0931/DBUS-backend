const { ethers } = require("ethers");
const { Web3 } = require("web3");
const fs = require("fs");
const path = require("path");
require("dotenv").config();

const makeContract = (_bytecode, _address, _abi) => {
  // Configuring the connection to an Ethereum node
  const provider = new ethers.providers.JsonRpcProvider(process.env.RPC_URL);
  const signer = new ethers.Wallet(process.env.SIGNER_PRIVATE_KEY, provider);

  const abi = require("../artifacts/" + _abi);
  const bytecodePath = path.join(
    path.dirname(__dirname),
    "artifacts",
    _bytecode
  );
  const bytecode = fs.readFileSync(bytecodePath, "utf8");

  const contractAddressPath = path.join(
    path.dirname(__dirname),
    "artifacts",
    _address
  );
  const contract_address = fs.readFileSync(contractAddressPath, "utf8");
  const contract = new ethers.Contract(contract_address, abi, signer);
  return contract;
};

export const checkBalanceOfUser = async (address, fundIdx) => {
  const contract = makeContract(
    "DTicketBytecode.bin",
    "DTicketAddress.bin",
    "DTicketAbi.json"
  );

  const value = await contract.balanceOf(address, fundIdx);
  console.log(value);
  return parseInt(value._hex);
};

export const checkFund = async (fundIdx) => {
  const contract = makeContract(
    "FundRegistryBytecode.bin",
    "FundRegistryAddress.bin",
    "FundRegistryAbi.json"
  );

  const value = await contract.funds(fundIdx);
  console.log(value);
  const isEnd = value[7];
  const donationAmount = parseInt(value[6]._hex);
  return { isEnd, donationAmount };
};
