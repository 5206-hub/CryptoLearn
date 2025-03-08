# CryptoLearn

CryptoLearn is a blockchain-powered educational resource sharing platform. Users can share repositories (e.g., study notes, projects, code samples) and receive crypto token rewards for their contributions. The platform is built with Next.js 15, TypeScript, and Tailwind CSS on the frontend, while a smart contract deployed on a local Ganache instance handles token rewards.

## Features

- **User Authentication:** Signup and login functionality with local JSON-based storage (for demo purposes).
- **Repository Management:** Users can add, view, and delete their repositories.
- **Public Feed & Notice Board:** All public repositories from all users are displayed in a feed; a notice board shows recent repository additions.
- **Blockchain Integration:** When a user adds a repository, a smart contract function is called (using Ethers v6) to reward tokens.
- **Token Balance Display:** The token balance (for the server wallet) is updated each time a repository is added.
- **Responsive UI:** Built using Tailwind CSS to provide a responsive and modern design.

## Technologies Used

- **Frontend:** Next.js 15, React, TypeScript, Tailwind CSS
- **Blockchain:** Solidity smart contract (CryptoLearn) deployed on Ganache
- **Ethers.js:** For interacting with the smart contract (Ethers v6)
- **Local Data Storage:** `data.json` for user/repository data, and `notices.json` for public notices
- **API Routes:** Next.js API routes for CRUD operations on repositories and notices

## Project Structure

