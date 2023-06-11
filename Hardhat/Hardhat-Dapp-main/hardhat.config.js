// require("@nomicfoundation/hardhat-toolbox");

// /** @type import('hardhat/config').HardhatUserConfig */
// module.exports = {
//   solidity: "0.8.18",
// };


require("@nomiclabs/hardhat-waffle");
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    // console.log(" ******** ");
    // console.log(" Account Address : " + account.address);
    // console.log(" ******** ");
    // console.log(account);
    // console.log(account.address);
    const address = await account.getAddress();
    const balance = await account.getBalance();
    console.log("   ::: Address =>     " + address + " : " + hre.ethers.utils.formatEther(balance) + "     <= Balances :::   ");
  }
});

const ALCHEMY_API_KEY = "S9LIRx84q709zuJvCPZhjvQ_wix27p_8";
const SEPOLIA_PRIVATE_KEY = "bee9feeb3f915cd23267c1d9ed898b556f9a8f2cc72fd51b3da732363e28fc4e";

module.exports = {
  solidity: "0.8.4",
  defaultNetwork: "sepolia",
  networks: {
    hardhat: {},
    // url: "https://mainnet.infura.io/v3/ad1da45b44b2460b91a62db3cba969f1",
    // goerli: {
    //   url: "https://goerli.infura.io/v3/5a8e9776d97245e5afacfd4e9761e847",
    //   account: ["bee9feeb3f915cd23267c1d9ed898b556f9a8f2cc72fd51b3da732363e28fc4e"]
    // }
    sepolia: {
      url: `https://eth-sepolia.g.alchemy.com/v2/${ALCHEMY_API_KEY}`,
      accounts: [SEPOLIA_PRIVATE_KEY]
    }
  },
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts"
  },
};