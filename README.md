# Order and Chaos Proof of Concept June 2022

# Overview
'''
Our project is to create a token-based game that allows players to choose sides and battle on behalf of Order or Chaos. 

The game uses blockchain technology including Solidity, Ethereum ERC-20 Fungible Tokens, and the ERC-721 Nonfungible Tokens. Using these tokens, players will be able to earn OAC tokens as they play. 

This is a growing genre of FinTech, combining gaming with opportunities to earn by playing. 

For the POC, we will create a working model of the game that is deployed on a test network. Our focus here is to establish the backend Fintech blockchain components. Ultimately the goal for the product would be to improve the gameplay to generate revenue by monetizing the game and building the value of the OAC tokens.

'''

# Libraries and Technology

#Based on Ethereum blockchain technology  - ERC-20, ERC-721, ERC-777
#DigitalOcean is the cloud computing host
#Remix IDE with Solidity
#Visual Studio Code
#React Javascript Library
#Metamask to manage wallets
#Ganache Truffle Suite to provide test wallet accounts

# To Play this game, you must:
#Have an Etheruem Blockchain wallet address connected to metamask
#Connect to the X network on Remix
#See the steps for game play in the test emvironment here: 

# Contracts embedded in app



# Graphical Interface for game


# Sample of NFT characters


# Example of game play







# Created by
#Charles Brown
#Jacob Burnett
#Kevin Gross
#Ann Howell
#With support from the Rice FinTech Bootcamp

# License
MIT


'''
Running React on Repl.it
React is a popular JavaScript library for building user interfaces.

Vite is a blazing fast frontend build tool that includes features like Hot Module Reloading (HMR), optimized builds, and TypeScript support out of the box.

Using the two in conjunction is one of the fastest ways to build a web app.

Getting Started
Hit run
Edit App.jsx and watch it live update!
By default, Replit runs the dev script, but you can configure it by changing the run field in the .replit file.
'''

Notes:

There are a few components to the creation and implementation of this project.  It begins with the blockchain contract that is writen in Solidity.  That file, OrderAndChaos.sol contains the NFT minting functions and the game functions.  It can be deployed on the blockchain in many different ways.  Contained in this repo is an example deploy script.  This script both deploys the contract and initializes the NFT characters along with their characteristics.  Upon deployment, a random number generator is used to create variety of player attributes.  This will make some NFTs more powerful, and therefore, more valuable.  These characteristics can be seen on either [Etherscan](https://rinkeby.etherscan.io/tx/0x5c2e8c789dec3b7fe1eff0df23a1e0bf69ba2e2081dd35b995ca8b888a4d272b) or [OpenSea](https://testnets.opensea.io/collection/hackers-ez8rivuvzl).  Because this is simply a proof of concept, the Rinkeby test network versions of these tools are used and linked here.

Once the contract is deployed, the contract appears on Etherscan.


Once characters are minted, they will appear on OpenSea under the contract address (0xb2D7fBcdADcb07a1e5bb4163832E3f53c46Afa6d). 

Having deployed the minting and game contract, we next need to deploy the token contract.  Again, we use Remix.

The token contract is available on [Etherscan](https://rinkeby.etherscan.io/address/0x463f1a338fe055131ac41d3ae8dbe60bbc6b9622).

Now that we have the NFT mint function, the game function, and the tokens on the blockchain, we are ready to move to the React user interface.

For that, we are going to rely on DigitalOcean to deploy our JavaScript website.  DigitalOcean is great because it automatically redeploys with any change to the source code inside the Git repo.  

[Order and Chaos](https://shark-app-rakzp.ondigitalocean.app/)

Add screen shots below.




