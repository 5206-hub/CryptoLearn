// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface ICryptoLearnToken {
    function mint(address to, uint256 amount) external;
}

contract ContentRegistry {
    address public owner;
    ICryptoLearnToken public token;
    uint256 public rewardAmount;

    struct Content {
        address uploader;
        string ipfsHash;
        bool rewarded;
    }

    Content[] public contents;

    event ContentUploaded(uint256 indexed id, address indexed uploader, string ipfsHash);
    event RewardIssued(uint256 indexed id, address indexed uploader, uint256 amount);

    modifier onlyOwner() {
        require(msg.sender == owner, "Not owner");
        _;
    }

    constructor(address tokenAddress, uint256 _rewardAmount) {
        owner = msg.sender;
        token = ICryptoLearnToken(tokenAddress);
        rewardAmount = _rewardAmount;
    }

    // Called by any user to upload content (IPFS hash)
    function uploadContent(string calldata ipfsHash) external {
        contents.push(Content(msg.sender, ipfsHash, false));
        uint256 id = contents.length - 1;
        emit ContentUploaded(id, msg.sender, ipfsHash);
    }

    // Only the owner (or reviewer) can approve and reward the uploader.
    function reviewAndReward(uint256 contentId, bool approve) external onlyOwner {
        require(contentId < contents.length, "Invalid content ID");
        Content storage content = contents[contentId];
        require(!content.rewarded, "Already rewarded");
        if (approve) {
            // Reward the uploader by minting tokens
            token.mint(content.uploader, rewardAmount);
            content.rewarded = true;
            emit RewardIssued(contentId, content.uploader, rewardAmount);
        }
    }

    function setRewardAmount(uint256 _rewardAmount) external onlyOwner {
        rewardAmount = _rewardAmount;
    }
}
