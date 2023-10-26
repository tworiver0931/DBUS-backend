const { ethers } = require("ethers");
const { Web3 } = require("web3");
const fs = require("fs");
const path = require("path");
const network = process.env.ETHEREUM_NETWORK;
require("dotenv").config();

const getTicketInformations = async (param) => {
  const provider = new ethers.providers.JsonRpcProvider(process.env.RPC_URL);
  const signer = new ethers.Wallet(process.env.SIGNER_PRIVATE_KEY, provider);

  const ticketAbi = require("../artifacts/DTicketAbi.json");
  const ticketBytecodePath = path.join(
    path.dirname(__dirname),
    "artifacts",
    "DTicketBytecode.bin"
  );
  const ticketContractAddressPath = path.join(
    path.dirname(__dirname),
    "artifacts",
    "DTicketAddress.bin"
  );
  const ticketContract_address = fs.readFileSync(
    ticketContractAddressPath,
    "utf8"
  );
  const ticketContract = new ethers.Contract(
    ticketContract_address,
    ticketAbi,
    signer
  );

  const fundAbi = require("../artifacts/FundRegistryAbi.json");
  const fundBytecodePath = path.join(
    path.dirname(__dirname),
    "artifacts",
    "FundRegistryBytecode.bin"
  );
  const fundContractAddressPath = path.join(
    path.dirname(__dirname),
    "artifacts",
    "FundRegistryAddress.bin"
  );

  const fundContract_address = fs.readFileSync(fundContractAddressPath, "utf8");
  const fundContract = new ethers.Contract(
    fundContract_address,
    fundAbi,
    signer
  );

  const arrayOfAddress = await fundContract.fundUsers(1, 0);
  //const value = await contract.balanceOfBatch();
  console.log("arrayOfAddress: ", arrayOfAddress);
};

//getTicketInformations();
