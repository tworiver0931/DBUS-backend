const { ethers } = require("ethers");

const fs = require("fs");
const path = require("path");
const { default: Web3, eth } = require("web3");
require("dotenv").config();
const url = process.env.RPC_URL;
console.log("url", url);

function intToPaddedHexString(value, length) {
  // value를 16진수 문자열로 변환
  let hexString = ethers.utils.hexValue(value);

  // 원하는 길이에 도달할 때까지 앞에 0을 채웁니다
  while (hexString.length < 2 + 2 * length) {
    hexString = "0x0" + hexString.slice(2);
  }

  return hexString;
}

const getFundUsers = async ({ fundIdx }) => {
  const provider = new ethers.providers.JsonRpcProvider(process.env.RPC_URL);
  const fundContractAddressPath = path.join(
    path.dirname(__dirname),
    "artifacts",
    "FundRegistryAddress.bin"
  );
  const fund_contract_address = fs.readFileSync(
    fundContractAddressPath,
    "utf8"
  );
  const myFilter = {
    fromBlock: Number(process.env.BLOCKNUMBER),
    toBlock: "latest",
    address: fund_contract_address,
    topics: [
      ethers.utils.id("FundUserAdded(uint96,address)"),
      intToPaddedHexString(fundIdx, 32),
    ],
  };

  //console.log(myFilter);
  var fundUsers = [];

  const log = await provider.getLogs(myFilter);
  for (i = 0; i < log.length; i++) {
    const decodedId = ethers.utils.defaultAbiCoder.decode(
      ["uint256"],
      log[i].data
    );
    fundUsers.push(decodedId[0]._hex);
  }

  return fundUsers;
};

//@fundIdx: 조회할 티켓 번호.
//@return : {fundUsers, ticketAmount} -> fundUsers - 각 유저의 주소, ticketAmount 각 유저가 들고있는 티켓의 갯수.
export const getRetaining = async (fundIdx) => {
  const getFundUsersParam = {
    fundIdx: fundIdx,
  };
  const fundUsers = await getFundUsers(getFundUsersParam);
  console.log(fundUsers);
  const provider = new ethers.providers.JsonRpcProvider(process.env.RPC_URL);
  const signer = new ethers.Wallet(process.env.SIGNER_PRIVATE_KEY, provider);

  const abi = require("../artifacts/DTicketAbi.json");

  const contractAddressPath = path.join(
    path.dirname(__dirname),
    "artifacts",
    "DTicketAddress.bin"
  );
  const contract_address = fs.readFileSync(contractAddressPath, "utf8");
  const contract = new ethers.Contract(contract_address, abi, signer);

  const value = await contract.balanceOfBatch(fundUsers, [3, 3]);
  var ticketAmount = [];
  for (i = 0; i < value.length; i++) {
    ticketAmount.push(parseInt(value[i]._hex));
  }

  const result = {
    fundUsers: fundUsers,
    ticketAmount: ticketAmount,
  };

  console.log(result);
};
