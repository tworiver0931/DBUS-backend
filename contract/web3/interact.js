// First step: initialize `web3` instance
const {Web3} = require('web3');
const { ETH_DATA_FORMAT, DEFAULT_RETURN_FORMAT } = require('web3');
const fs = require('fs');
const path = require('path');


require("dotenv").config();
// Set up a connection to the Ethereum network
const network = process.env.ETHEREUM_NETWORK;
  const web3 = new Web3(
    new Web3.providers.HttpProvider(
      `https://${network}.infura.io/v3/${process.env.INFURA_API_KEY}`,
    ),
  );







const sendTx = async () => {
  //const myContract = new web3.eth.Contract()
  const accountFrom = {
    privateKey: process.env.SIGNER_PRIVATE_KEY,
    address: process.env.SIGNER_ADDRESS
  };
  

  // 4. Create Contract Instance
  const abi = require('../deploying/DTicketAbi.json');
  const contractor = new web3.eth.Contract(abi, process.env.CONTRACT_ADDRESS);
  var mintAccount = accountFrom.address;
  var mintId = 0;
  var mintAmount = 100;
  var mintData = web3.utils.utf8ToHex('1');
  const mint = contractor.methods.mint(mintAccount, mintId, mintAmount, mintData);


  console.log(`Calling the reset function in contract at address: ${process.env.CONTRACT_ADDRESS}`);

  await web3.eth
    .estimateGas(
      {
        from: accountFrom.address,
        to: process.env.CONTRACT_ADDRESS,
        data: mint.encodeABI()
      },
      "latest",
      ETH_DATA_FORMAT,
    )
    .then((value) => {
      limit = value;
    });

  // 7. Sign tx with PK
  const createTransaction = await web3.eth.accounts.signTransaction(
    {
      to: process.env.CONTRACT_ADDRESS,
      data: mint.encodeABI(),
      value: '0x0',
      //value: web3.utils.toWei('0.1', 'ether'),
      //gas: web3.utils.toWei('3', 'gwei'),
      nonce: await web3.eth.getTransactionCount(accountFrom.address),
      maxPriorityFeePerGas: web3.utils.toWei("3", "gwei"),
      maxFeePerGas: web3.utils.toWei("3", "gwei"),
    
    },
    accountFrom.privateKey
  );
   // 8. Send tx and wait for receipt
   const createReceipt = await web3.eth.sendSignedTransaction(createTransaction.rawTransaction);
   console.log(`Tx successful with hash: ${createReceipt.transactionHash}`);
};












async function interact() {

  web3.eth.Contract.handleRevert = true;

  // Read the contract address from the file system
  const deployedAddressPath = path.join(__dirname, 'DTicketAddress.bin');
  const deployedAddress = fs.readFileSync(deployedAddressPath, 'utf8');
  // Create a new contract object using the ABI and bytecode
  const abi = require('../deploying/DTicketAbi.json');
  const contract = new web3.eth.Contract(abi, deployedAddress);
  const account = web3.eth.accounts.wallet.add(process.env.SIGNER_PRIVATE_KEY).get(0);
  const defaultAccount = account.address; //providersAccounts[0];


  try {
      // Get the current value of my number
      const owner = await contract.methods.owner().call();
      console.log('msgSender: ' + JSON.stringify(owner, null, 4));
      
      sendTx();


      
      
  } catch (error) {
      console.error(error);
  }
}

interact();