import React, {useEffect, useState} from "react";
import SplashScreen from "./SplashScreen";
import {ethers} from "ethers";
import {CONTRACT_ADDRESS, transformCharacterData, TOKEN_ADDRESS} from "../constants";
import myEpicGame from "../utils/MyEpicGame.json";
import '../assets/css/Arena.css'

const Win = ({ setForm, formData, navigation }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [gameContract, setGameContract] = useState(null);
    const [strongHold, setStrongHold] = useState(null);
    const [attackState, setAttackState] = useState('');
    const { go } = navigation;
    const {next} = navigation;
    const { personType, characterNFT, hasBattled, hasBattled2 } = formData;
    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false);
        }, 1500);
    }, []);

    return isLoading ?
        <SplashScreen isLoading={isLoading} /> :
        (
        <div className="App">
            <div className="container">
                <div className="header-container">
                    <p className="header gradient-text"></p>
                        <p className="sub-text"></p>
                            <div className="game-result">
                                You win.
                            </div>
                </div>
            </div>
        </div>
                


        )

}

export default Win