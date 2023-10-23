

//privateKey = "deca118e3c21630d45baf07cfe4d934c92901d58e9eecb8a1b89663d967b208e"

// First step: initialize `web3` instance

const {Web3} = require('web3');
const web3 = new Web3("https://sepolia.infura.io/v3/8db628fccae3494ba0f4b3fe7cc651ec");

//const web3 = require('../web3Provider')
//const web3 = new Web3(/* PROVIDER*/);

// Second step: add an account to wallet
const privateKeyString = '0xdeca118e3c21630d45baf07cfe4d934c92901d58e9eecb8a1b89663d967b208e';
const account = web3.eth.accounts.wallet.add(privateKeyString).get(0);

// Make sure the account has enough eth on balance to send the transaction

// Third step: sign and send the transaction
// Magic happens behind sendTransaction. If a transaction is sent from an account that exists in a wallet, it will be automatically signed.


async function main() {
  try {
    const receipt = await web3.eth.sendTransaction({
        from: account?.address,
        to: '0x9b6B8120E4e692B2281d8953987462288dE6b001',
        value: '0x1',
        gas: '300000',
        // other transaction's params
    });
    console.log(receipt);
  } catch (error) {
    // catch transaction error
    console.error(error);
  }  
}

main();
