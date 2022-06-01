# Order and Chaos Proof of Concept June 2022

# Overview

Our project is to create a token-based game that allows players to choose sides and battle on behalf of Order or Chaos. 

The game uses blockchain technology including Solidity, Ethereum ERC-20 Fungible Tokens, and the ERC-721 Nonfungible Tokens. Using these tokens, players will be able to earn OAC tokens as they play. 

This is a growing genre of FinTech, combining gaming with opportunities to earn by playing. 

For the POC, we will create a working model of the game that is deployed on a test network. Our focus here is to establish the backend Fintech blockchain components. Ultimately the goal for the product would be to improve the gameplay to generate revenue by monetizing the game and building the value of the OAC tokens.


# Libraries and Technology

Based on Ethereum blockchain technology  - ERC-20, ERC-721, ERC-777 (<https://ethereum.org/en/developers/docs/standards/tokens/#token-standards>)

DigitalOcean is the cloud computing host (<https://www.digitalocean.com/>)

Remix IDE with Solidity (<https://remix.ethereum.org/>)

Visual Studio Code (<https://code.visualstudio.com/Download>)

React Javascript Library (<https://reactjs.org/>)

Metamask to manage wallets (<https://metamask.io/>)

Etherscan Rinkeby Testnet Explorer for test network (<https://rinkeby.etherscan.io/>)


# To Play this game, you must:
Have an Etheruem Blockchain wallet address connected to metamask and Remix
Connect to the Rinkeby Testnet network on Remix


# Overview of app backend

There are a few components to the creation and implementation of this project.  It begins with the blockchain contract that is writen in Solidity.  That file, OrderAndChaos.sol contains the NFT minting functions and the game functions.  It can be deployed on the blockchain in many different ways.  Contained in this repo is an example deploy script.  This script both deploys the contract and initializes the NFT characters along with their characteristics.  Upon deployment, a random number generator is used to create variety of player attributes.  This will make some NFTs more powerful, and therefore, more valuable.  These characteristics can be seen on either [Etherscan](https://rinkeby.etherscan.io/tx/0x5c2e8c789dec3b7fe1eff0df23a1e0bf69ba2e2081dd35b995ca8b888a4d272b) or [OpenSea](https://testnets.opensea.io/collection/hackers-ez8rivuvzl).  Because this is simply a proof of concept, the Rinkeby test network versions of these tools are used and linked here.

Once the contract is deployed, the contract appears on Etherscan.


Once characters are minted, they will appear on OpenSea under the contract address (0xb2D7fBcdADcb07a1e5bb4163832E3f53c46Afa6d). 

Having deployed the minting and game contract, we next need to deploy the token contract.  Again, we use Remix.

The token contract is available on [Etherscan](https://rinkeby.etherscan.io/address/0x463f1a338fe055131ac41d3ae8dbe60bbc6b9622).

Now that we have the NFT mint function, the game function, and the tokens on the blockchain, we are ready to move to the React user interface.

For that, we are going to rely on DigitalOcean to deploy our JavaScript website.  DigitalOcean is great because it automatically redeploys with any change to the source code inside the Git repo.  

[Order and Chaos](https://shark-app-rakzp.ondigitalocean.app/)


# Solidity files in app

#GameToken.sol
![Creating game tokens](<img/4.png>)


#OrderAndChaos.sol

![Order and Chaos Solidity in Remix ready to compile](<img/1.png>)

![Orderand Chaos Solidity in Remix ready to deploy and run](<img/2.png>)


#Proof of Transfer on Rinkeby Test Network
![Proof of transfer on Etherscan Rinkeby Test Network](<img/3.png>)





# Graphical Interface for game
![Launch screen](<img/logo_w_computer.png>)

# Sample of NFT characters


# Gamer Experience
To play the game, a gamer would:

Set up a Metamask wallet

Go to the Order and Chaos dApp to join the game

Take the Order vs Chaos quiz to get routed to a side

Mint an NFT character and pay the minting fee

Enter battle

View results - win the jackpot or not






# Created by
Charles Brown

Jacob Burnett

Kevin Gross

Ann Howell

With support from the Rice FinTech Bootcamp

# License
MIT




