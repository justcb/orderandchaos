import React, {useEffect, useState} from "react";
import SplashScreen from "./SplashScreen";
import { CONTRACT_ADDRESS, transformCharacterData, TOKEN_ADDRESS } from '../constants';
import { ethers } from 'ethers';
import myEpicGame from "../utils/MyEpicGame.json";
import '../assets/css/Wallet.css';

const Wallet = ({ setForm, formData, navigation }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [currentAccount, setCurrentAccount] = useState(null);
    const [characterNFT, setCharacterNFT] = useState(null);

    const { next } = navigation;
    const { go } = navigation;

    const { personType, scoreTotal, isMinted } = formData;
    console.log('score total is '+scoreTotal);
    console.log(formData);
    useEffect(() => {

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

    const connectWalletAction = async () => {
        try {
            const { ethereum } = window;

            if (!ethereum) {
                alert('Get MetaMask!');
                return;
            }
           const accounts = await ethereum.request({
                method: 'eth_requestAccounts',
            });

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
                        name: 'isMinted', 
                        value: true 
                    }
                })
                console.log('User has character NFT');
                setForm({
                target: {
                name: 'characterNFT',
                value: transformCharacterData(txn)
                }
                })
            } else {
                console.log('No character NFT found');
            }
        };
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
                            {!currentAccount ?
                                <button
                                    className="cta-button connect-wallet-button"
                                    onClick={connectWalletAction}
                                >
                                    Identify yourself by connecting your wallet.
                                </button>
                                :
                                <div className="wallet_next">
                                    Your wallet is connected.  You may proceed.
                                    <div className="next_button_wallet"><button onClick={next}>Next -></button></div>
                                </div>}
                        </div>
                    </div>
                </div>
            </div>
        )
}

export default Wallet
