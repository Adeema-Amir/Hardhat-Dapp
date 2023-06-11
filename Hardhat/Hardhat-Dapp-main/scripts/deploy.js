const hard = require("hardhat");
async function main() {
  const Lock = await hard.ethers.getContractFactory("Lock");
  const lock = await Lock.deploy("Assalamu'Alaikum Warahmatullahi Wabarakatuh!");
  await lock.deployed();
  // console.log(lock);
  console.log("Lock deployed to:", lock.address);
}


main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });