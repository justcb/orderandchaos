import React, {useEffect, useState} from "react";
import SplashScreen from "./SplashScreen";
import {ethers} from "ethers";
import {CONTRACT_ADDRESS, transformCharacterData, TOKEN_ADDRESS} from "../constants";
import myEpicGame from "../utils/MyEpicGame.json";
import '../assets/css/Arena.css'

const Lose = ({ setForm, formData, navigation }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [gameContract, setGameContract] = useState(null);
    const [strongHold, setStrongHold] = useState(null);
    const [attackState, setAttackState] = useState('');
    const { go } = navigation;
    const {next} = navigation;
    const { personType, characterNFT, hasBattled, hasBattled2 } = formData;

    // Splash Screen
    useEffect(() => {
        // Wait for 15 seconds
        setTimeout(() => {
            setIsLoading(false);
        }, 1500);
    }, []);




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


    return isLoading ?
        <SplashScreen isLoading={isLoading} /> :
        (
            <div className="App">
                <div className="container">
                    <div className="header-container">
                        <p className="header gradient-text"></p>
                        <p className="sub-text"></p>
                        <div className="arena-container">
                                        Would you like to revive your player?
                                    <div className="attack-container">
                                        <button className="cta-button">
                                            Revive Player
                                        </button>
                                    </div>
                                </div>
                         </div>
            </div>
            </div>
    )

}

export default Lose