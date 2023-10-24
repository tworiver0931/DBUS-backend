const { ethers } = require("ethers");
const fs = require("fs");
const path = require("path");
require("dotenv").config();

console.log(process.env.RPC_URL);

export const generateNewUser = () => {
  buf = Buffer.from(ethers.utils.randomBytes(32)); //32byte rng and creating buffer instance. buffer
  pKey = buf.toString("hex");
  const publicKey = ethers.utils.computePublicKey(buf);
  const address = ethers.utils.computeAddress(publicKey);
  const newUser = {
    privateKey: pKey,
    publicKey,
    address,
  };
  console.log("newUser", newUser);
  return newUser;
};

//@param(value) : string of value to send. It's quantity is about ether.
//@param(fromPrivatekey) : string of fromPrivatekey about sender
export async function etherSend(fromPrivateKey, to, value) {
  // Configuring the connection to an Ethereum node
  const network = process.env.ETHEREUM_NETWORK;
  const provider = new ethers.providers.JsonRpcProvider(process.env.RPC_URL);
  //const provider = new ethers.providers.JsonRpcProvider('wss://rpc-mumbai.matic.today')
  console.log(provider);
  const signer = new ethers.Wallet(fromPrivateKey, provider);

  // Creating and sending the transaction object
  const tx = await signer.sendTransaction({
    to: to,
    value: ethers.utils.parseUnits(value, "ether"),
  });
  console.log("Mining transaction...");
  console.log(`https://${network}.etherscan.io/tx/${tx.hash}`);
  // Waiting for the transaction to be mined
  const receipt = await tx.wait();
  // The transaction is now on chain!
  console.log(`Mined in block ${receipt.blockNumber}`);
}
