import React, {useEffect, useState} from "react";
import SplashScreen from "./SplashScreen";
import { CONTRACT_ADDRESS, transformCharacterData } from '../constants';
import { ethers } from 'ethers';
import myEpicGame from "../utils/MyEpicGame.json";

const Wallet = ({ setForm, formData, navigation }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [currentAccount, setCurrentAccount] = useState(null);
    const [characterNFT, setCharacterNFT] = useState(null);

    const { next } = navigation;
    const { go } = navigation;

    const { personType, scoreTotal, isMinted } = formData;
    console.log('score total is '+scoreTotal);
    console.log(formData);
    // Splash Screen
    useEffect(() => {

        // Wait for 3 seconds
        setTimeout(() => {
            setIsLoading(false);
        }, 1500);
    }, []);

    const checkIfWalletIsConnected = async () => {
        try {
            const { ethereum } = window;

            if (!ethereum) {
                console.log('Make sure you have MetaMask!');
            } else {
                console.log('We have the ethereum object', ethereum);

                const accounts = await ethereum.request({ method: 'eth_accounts' });

                if (accounts.length !== 0) {
                    const account = accounts[0];
                    console.log('Found an authorized account:', account);
                    setCurrentAccount(account);
                } else {
                    console.log('No authorized account found');
                }
            }
        } catch (error) {
            console.log(error);
        }
    }

    /*
   * Implement your connectWallet method here
   */
    const connectWalletAction = async () => {
        try {
            const { ethereum } = window;

            if (!ethereum) {
                alert('Get MetaMask!');
                return;
            }

            /*
             * Fancy method to request access to account.
             */
            const accounts = await ethereum.request({
                method: 'eth_requestAccounts',
            });

            /*
             * Boom! This should print out public address once we authorize Metamask.
             */
            console.log('Connected', accounts[0]);
            setCurrentAccount(accounts[0]);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        checkIfWalletIsConnected();
    }, []);

    useEffect(() => {
        /*
         * The function we will call that interacts with out smart contract
         */
        const fetchNFTMetadata = async () => {
            console.log('Checking for Character NFT on address:', currentAccount);

            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const gameContract = new ethers.Contract(
                CONTRACT_ADDRESS,
                myEpicGame.abi,
                signer
            );

            const txn = await gameContract.checkIfUserHasNFT();
            if (txn.name) {
                setForm({
                    target: {
                        name: 'isMinted', // form element
                        value: true // the data/url
                    }
                })
                console.log('User has character NFT');
                //setCharacterNFT(transformCharacterData(txn));
                setForm({
                target: {
                name: 'characterNFT', // form element
                value: transformCharacterData(txn) // the data/url
                }
                })
            } else {
                console.log('No character NFT found');
            }
        };

        /*
         * We only want to run this, if we have a connected wallet
         */
        if (currentAccount) {
            console.log('CurrentAccount:', currentAccount);
            fetchNFTMetadata();
        }
    }, [currentAccount]);

    return isLoading ?
        <SplashScreen isLoading={isLoading} /> :
        (
            <div className="App">
                <div className="container">
                    <div className="header-container">
                        <p className="header gradient-text"></p>
                        <p className="sub-text"></p>
                        <div className="connect-wallet-container">
                            <img
                                src="https://www.annes40th.com/epic/sethmayetlogo.png"
                                
                            />
                            {!currentAccount ?
                                <button
                                    className="cta-button connect-wallet-button"
                                    onClick={connectWalletAction}
                                >
                                    Connect Wallet To Get Started
                                </button>
                                :
                                <button onClick={next}>It appears that your wallet is connected.  You may continue on.</button>}
                        </div>
                    </div>
                </div>
            </div>
        )
}

export default Wallet
