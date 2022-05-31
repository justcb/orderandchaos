import React, {useEffect, useState} from "react";
import SplashScreen from "./SplashScreen";
import {ethers} from "ethers";
import {CONTRACT_ADDRESS, transformCharacterData} from "../constants";
import myEpicGame from "../utils/MyEpicGame.json";
import '../assets/css/Arena.css'

const Result = ({ formData }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [gameContract, setGameContract] = useState(null);
    const [strongHold, setStrongHold] = useState(null);
    const [attackState, setAttackState] = useState('');
    const { go } = navigation;
    const { personType, characterNFT } = formData;
    // Splash Screen
    useEffect(() => {
        // Wait for 3 seconds
        setTimeout(() => {
            setIsLoading(false);
        }, 1500);
    }, []);

    // add results navigation and go from the arena to the results.

    const runAttackAction = async () => {
        try {
            if (gameContract) {
                setAttackState('attacking');
                console.log('Attacking boss...');
            //    const attackTxn = await gameContract.pay();
                const attackTxn = await gameContract.attackBoss();
                await attackTxn.wait();
            //    decide win or lose; if win, win() navigate to win, else navigate to lose.
                console.log('attackTxn:', attackTxn);
                setAttackState('hit');
            }
        } catch (error) {
            console.error('Error attacking boss:', error);
            setAttackState('');
        }
    };

    // UseEffects
    useEffect(() => {
        const { ethereum } = window;

        if (ethereum) {
            const provider = new ethers.providers.Web3Provider(ethereum);
            const signer = provider.getSigner();
            const gameContract = new ethers.Contract(
                CONTRACT_ADDRESS,
                myEpicGame.abi,
                signer
            );

            setGameContract(gameContract);
        } else {
            console.log('Ethereum object not found');
        }
    }, []);

    useEffect(() => {
        /*
         * Setup async function that will get the boss from our contract and sets in state
         */
        const fetchStrongHold = async () => {
            const strongHoldTxn = await gameContract.getStrongHold();
            console.log('StrongHold:', strongHoldTxn);
            setStrongHold(transformCharacterData(strongHoldTxn));
        };

        if (gameContract) {
            /*
             * gameContract is ready to go! Let's fetch our boss
             */
            fetchStrongHold();
        }
    }, [gameContract]);

    return isLoading ?
        <SplashScreen isLoading={isLoading} /> :
        (
            <div className="App">
                <div className="container">
                    <div className="header-container">
                        <p className="header gradient-text">SETH|MAYET</p>
                        <p className="sub-text">Hack to Maintain the Balance {`${personType}`}</p>
                        <div className="arena-container">
                            {/* Boss */}
                            {strongHold && (
                                <div className={`boss-content ${attackState}`}>
                                    <div className={`boss-content`}>
                                        <h2>🔥 StrongHold 🔥</h2>
                                        <div className="health-bar">
                                            <p>{`${strongHold.hp} HP`}</p>
                                        </div>
                                    </div>


                                    <div className="attack-container">
                                        <button className="cta-button" onClick={runAttackAction}>
                                            {`💥 Attack ${strongHold.name}`}
                                        </button>
                                    </div>
                                </div>
                            )}
                            {/* Character NFT */}
                            {characterNFT && (
                                <div className="players-container">
                                    <div className="player-container">
                                        <h2>Your Character</h2>
                                        <div className="player">
                                            <div className="image-content">
                                                <h2>{characterNFT.name}</h2>
                                                <img
                                                    src={characterNFT.imageURI}
                                                    alt={`Character ${characterNFT.name}`}
                                                />
                                                <div className="health-bar">
                                                    <progress value={characterNFT.hp} />
                                                    <p>{`${characterNFT.hp} HP`}</p>
                                                </div>
                                            </div>
                                            <div className="stats">
                                                <h4>{`⚔️ Attack Damage: ${characterNFT.attackDamage1}`}</h4>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        )
}

export default Result
