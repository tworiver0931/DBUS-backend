


export async function sendRawTransaction() {
  var nonce = web3.eth.getTransactionCount(fromAddress);
  var gasPrice = web3.eth.gasPrice;
  var value = web3.toWei(amount, 'ether');
  var gasLimit = web3.eth.estimateGas({
      to: toAddress,
      from: fromAddress,
      value: value
  }); // the used gas for the simulated call/transaction (,,21000)
  var txObject = {
      nonce: nonce,
      gasPrice: gasPrice,
      gasLimit: gasLimit,
      to: toAddress,
      from: ownerAddress,
      value: value
  };
}


export async function unlock(account) {
  console.log('unlock' + web3.eth.accounts[0]);
  //(web3.eth.accounts[0],'1111');
}


export async function getAccounts() {
  web3.eth.getAccounts().then(accounts => {
    console.log(accounts);
  })
}
export async function sendTx(fromAddress, sendAmount) {
  var txHash = web3.eth.sendTransaction({
    from: fromAddress,
    to: web3.eth.accounts[0],
    value: sendAmount
  }).then(txHash => {
    console.log(txHash)
  })
  console.log(txHash);
}
export async function checkBalance(account) {
  web3.eth.getBalance(account)
    .then((balance)=>{
        console.log(`${account} 지갑 잔액은 ${balance} wei 입니다`);
        return web3.utils.fromWei(balance, 'ether');
    })
    .then((ethBal)=>{
        console.log(`잔액을 이더 단위로 환산하면 ${ethBal}입니다`)
    })

}

export async function checkTx(txHash) {
  web3.eth.getTransaction(txHash)
    .then((txInfo)=>{
        return txInfo;
    })
}