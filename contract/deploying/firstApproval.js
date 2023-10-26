const { ethers } = require("ethers");
const { Web3 } = require("web3");
const fs = require("fs");
const path = require("path");
const network = process.env.ETHEREUM_NETWORK;
require("dotenv").config();
const web3 = new Web3(
  new Web3.providers.HttpProvider(
    `https://${network}.infura.io/v3/${process.env.INFURA_API_KEY}`
  )
);

export async function firstApproval(
  fromPrivateKey,
  to,
  toPrivateKey,
  value,
  approved
) {
  const network = process.env.ETHEREUM_NETWORK;
  const provider = new ethers.providers.JsonRpcProvider(process.env.RPC_URL);
  const fromSigner = new ethers.Wallet(fromPrivateKey, provider);
  const toSigner = new ethers.Wallet(toPrivateKey, provider);
  const tx = await fromSigner.sendTransaction({
    to: to,
    value: ethers.utils.parseUnits(value, "ether"),
  });
  console.log("sending ether to New User");
  console.log(`https://${network}.etherscan.io/tx/${tx.hash}`);
  const receipt = await tx.wait();
  console.log(`Mined in block ${receipt.blockNumber}`);

  // Configuring the connection to an Ethereum node

  const abi = require("../artifacts/DTicketAbi.json");
  const bytecodePath = path.join(
    path.dirname(__dirname),
    "artifacts",
    "DTicketBytecode.bin"
  );
  const bytecode = fs.readFileSync(bytecodePath, "utf8");

  const ticketContractAddressPath = path.join(
    path.dirname(__dirname),
    "artifacts",
    "DTicketAddress.bin"
  );
  const ticket_contract_address = fs.readFileSync(
    ticketContractAddressPath,
    "utf8"
  );

  const fundContractAddressPath = path.join(
    path.dirname(__dirname),
    "artifacts",
    "FundRegistryAddress.bin"
  );
  const fund_contract_address = fs.readFileSync(
    fundContractAddressPath,
    "utf8"
  );

  const contract = new ethers.Contract(ticket_contract_address, abi, toSigner);

  const approvetx = await contract.setApprovalForAll(
    fund_contract_address,
    approved
  );
  const approveReceipt = await approvetx.wait();
  console.log("[setApproveForAll receipt]", approveReceipt);
}

// firstApproval(
//   process.env.SIGNER_PRIVATE_KEY,
//   "0x6296540f222DF82716a5DEE2dB2D009BCe151F3c",
//   "0x7c16f047e365df9014e8068b0495ea3355336686846939876fc3c64e940a7437",
//   "0.001",
//   true
// );
