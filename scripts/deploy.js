// scripts/deploy.js
async function main() {
    const [deployer] = await ethers.getSigners();
    console.log("Deploying contracts with:", deployer.address);
  
    // Deploy the token contract
    const Token = await ethers.getContractFactory("CryptoLearnToken");
    const token = await Token.deploy();
    await token.deployed();
    console.log("CryptoLearnToken deployed to:", token.address);
  
    // Define a reward amount (e.g., 100 tokens, accounting for 18 decimals)
    const rewardAmount = ethers.utils.parseUnits("100", 18);
    
    // Deploy the content registry, linking the token address
    const ContentRegistry = await ethers.getContractFactory("ContentRegistry");
    const contentRegistry = await ContentRegistry.deploy(token.address, rewardAmount);
    await contentRegistry.deployed();
    console.log("ContentRegistry deployed to:", contentRegistry.address);
  
    // Transfer token ownership to the ContentRegistry contract
    await token.transferOwnership(contentRegistry.address);
    console.log("Token ownership transferred to ContentRegistry");
  }
  
  main()
    .then(() => process.exit(0))
    .catch(error => {
      console.error(error);
      process.exit(1);
    });
  