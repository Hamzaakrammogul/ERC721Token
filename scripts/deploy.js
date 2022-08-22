async function main() {
    const [deployer] = await ethers.getSigners();
  
    const MyNFT = await ethers.getContractFactory("MyNFT");// Creating instance
    const token = await MyNFT.deploy(); //Deploying contract
    console.log("Token address:", token.address);
  }
  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });