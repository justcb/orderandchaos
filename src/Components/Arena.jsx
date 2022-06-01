import React, {useEffect, useState} from "react";
import SplashScreen from "./SplashScreen";
import {ethers} from "ethers";
import {CONTRACT_ADDRESS, transformCharacterData} from "../constants";
import myEpicGame from "../utils/MyEpicGame.json";
import '../assets/css/Arena.css'

// onClick={() => go("submit")}

const Arena = ({ setForm, formData, navigation }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [gameContract, setGameContract] = useState(null);
    const [strongHold, setStrongHold] = useState(null);
    const [attackState, setAttackState] = useState('');
    const { go } = navigation;
    const {next} = navigation;
    const { personType, characterNFT, hasBattled, hasBattled2 } = formData;
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
                const attackTxn = await gameContract.attackBoss({gasLimit: 250000});
                await attackTxn.wait();
            //    decide win or lose; if win, win() navigate to win, else navigate to lose.
                console.log('attackTxn:', attackTxn);
                setAttackState('hit');
                setForm({
                    target: {
                        name: 'hasBattled', // form element
                        value: true // the data/url
                    }
                })
                setForm({
                    target: {
                        name: 'hasBattled2', // form element
                        value: false // the data/url
                    }
                });
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

        const fetchCharacterNFT = async () => {
            const characterNFT = await gameContract.checkIfUserHasNFT();
            console.log('CharacterNFT: ', characterNFT);
            //setCharacterNFT(transformCharacterData(characterNFT));
           setForm({
                target: {
                    name: 'characterNFT', // form element
                    value: transformCharacterData(characterNFT) // the data/url
            }
        }) };

        if (gameContract) {
            /*
             * gameContract is ready to go! Let's fetch our boss
             */
            fetchStrongHold();
            fetchCharacterNFT();
            
        }
    }, [gameContract]);


    return isLoading ?
        <SplashScreen isLoading={isLoading} /> :
        (
            <div className="App">
                <div className="container">
                    <div className="header-container">
                        <p className="header gradient-text"></p>
                        <p className="sub-text"></p>
                        {(hasBattled || hasBattled2) && strongHold.hp == 0 && 
                            (<div className="game_result">
                                YOU WIN
                            <div className="next_button_wallet"><button onClick={() => go("win")}>Next</button></div>
                            </div>)
                        }
                        {(hasBattled || hasBattled2) && characterNFT.hp == 0 && strongHold.hp !== 0 && 
                            (<div className="game_result">
                                YOU LOSE
                                <div className="next_button_wallet"><button onClick={() => go("lose")}>Next</button></div>
                            </div>)
                        }
                        {!hasBattled && characterNFT.hp !== 0 & strongHold.hp !== 0 && (
                        <div className="arena-container">
                            {/* Boss */}
                            {strongHold && (
                                <div className="boss-info">
                                        It is time to battle the stronghold.
                                        <p>The boss has {`${strongHold.hp} HP`}.  The boss attacks at {`${strongHold.attackDamage} HP`}</p>
                                        <p>Your {characterNFT.name} has {`${characterNFT.hp} HP`} and attacks at {`${characterNFT.attackDamage} HP`}</p>

                                    <div className="attack-container">
                                        <button className="cta-button" onClick={runAttackAction}>
                                            {`Attack ${strongHold.name}`}
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>)} 
                        
                        {hasBattled && characterNFT.hp !== 0 & strongHold.hp !== 0 && (
                                <div className="wallet_next">
                                See the results of your battle.
                                <div className="next_button_wallet"><button onClick={next}>Next</button></div>
                                </div>
                        )}                     </div>
                </div>
            </div>
        )

}

export default Arena