const infuraCall = async () => {
  const signer = web3.eth.accounts.privateKeyToAccount(
    process.env.SIGNER_PRIVATE_KEY,
  );
  web3.eth.accounts.wallet.add(signer);
  
  const accountFrom = {
    privateKey: '0xdeca118e3c21630d45baf07cfe4d934c92901d58e9eecb8a1b89663d967b208e',
    address: '0xddF2b929370CF0962F0A87A49f388CA191432008'
  };
  const contractAddress = '0x96aFd8966f8fa9fdEC7866168eaAeb6F4a9C6A7e';
  const abi = require('../deploying/DTicketAbi.json');
  const pauser = new web3.eth.Contract(abi, contractAddress);
  const pause = pauser.methods.pause();



  await web3.eth
    .estimateGas(
      {
        from: signer.address,
        to: "0x9b6B8120E4e692B2281d8953987462288dE6b001"
      },
      "latest",
      ETH_DATA_FORMAT,
    )
    .then((value) => {
      limit = value;
    });


  // Creating the transaction object
  const tx = {
    from: signer.address,
    to: "0x9b6B8120E4e692B2281d8953987462288dE6b001",
    //data: pause.encodeABI(),
    value: web3.utils.toWei("0.0001", "ether"),
    //gas: await pause.estimateGas(),
    gas: limit,
    nonce: await web3.eth.getTransactionCount(signer.address),
    maxPriorityFeePerGas: web3.utils.toWei("3", "gwei"),
    maxFeePerGas: web3.utils.toWei("3", "gwei"),
    chainId: 11155111,
    type: 0x2,
  };

  signedTx = await web3.eth.accounts.signTransaction(tx, signer.privateKey);
  console.log("Raw transaction data: " + signedTx.rawTransaction);


  const receipt = await web3.eth
    .sendSignedTransaction(signedTx.rawTransaction)
    .once("transactionHash", (txhash) => {
      console.log(`Mining transaction ...`);
      console.log(`https://${network}.etherscan.io/tx/${txhash}`);
    });

    console.log(`Mined in block ${receipt.blockNumber}`)

}
