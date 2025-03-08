const { expect } = require("chai");

describe("CryptoLearnToken and ContentRegistry", function() {
  let token, contentRegistry, deployer, user;
  
  beforeEach(async function() {
    [deployer, user] = await ethers.getSigners();
    
    const Token = await ethers.getContractFactory("CryptoLearnToken");
    token = await Token.deploy();
    await token.deployed();

    const rewardAmount = ethers.utils.parseUnits("100", 18);
    const ContentRegistry = await ethers.getContractFactory("ContentRegistry");
    contentRegistry = await ContentRegistry.deploy(token.address, rewardAmount);
    await contentRegistry.deployed();

    // Transfer minting rights by setting the registry as the owner
    await token.transferOwnership(contentRegistry.address);
  });

  it("should allow content upload and reward correctly", async function() {
    await contentRegistry.connect(user).uploadContent("QmTestHash");
    expect((await contentRegistry.contents(0)).uploader).to.equal(user.address);
    
    // Only the owner can review – using deployer account here
    await contentRegistry.reviewAndReward(0, true);
    expect((await token.balanceOf(user.address)).toString())
      .to.equal(ethers.utils.parseUnits("100", 18).toString());
  });
});
