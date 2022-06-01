import React, {useEffect, useState} from "react";
import SplashScreen from "./SplashScreen";
import {ethers} from "ethers";
import {CONTRACT_ADDRESS, transformCharacterData} from "../constants";
import myEpicGame from "../utils/MyEpicGame.json";
import '../assets/css/Arena.css'

// onClick={() => go("submit")}

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
        // Wait for 3 seconds
        setTimeout(() => {
            setIsLoading(false);
        }, 1500);
    }, []);

    // add results navigation and go from the arena to the results.

    return isLoading ?
        <SplashScreen isLoading={isLoading} /> :
        (
            <div className="App">
                <div className="container">
                            <div className="you-lose">
                                You lose.
                            </div>
                </div>
            </div>
                
        )

}

export default Lose
