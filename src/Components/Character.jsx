import React, {useEffect, useState} from "react";
import SplashScreen from "./SplashScreen";
import {ethers} from "ethers";
import {CONTRACT_ADDRESS, transformCharacterData, TOKEN_ADDRESS} from "../constants";
import myEpicGame from "../utils/MyEpicGame.json";
import '../assets/css/SelectCharacter.css';

const Character = ({ setForm, formData, navigation }) => {
    const [isLoading, setIsLoading] = useState(true);
    const {next} = navigation;
    const { go } = navigation;
    const { personType, isMinted } = formData;
    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false);
        }, 1500);
    }, []);



    const [characters, setCharacters] = useState([]);
    const [gameContract, setGameContract] = useState(null);

    const mintCharacterNFTAction = async (characterId) => {
        try {
            if (gameContract) {
                console.log('Minting character in progress...');
                const mintTxn = await gameContract.mintCharacterNFT(characterId);
                await mintTxn.wait();
                console.log('mintTxn:', mintTxn);
                setForm({
                    target: {
                        name: 'isMinted', 
                        value: true 
                    }
                })
            }

        } catch (error) {
            console.warn('MintCharacterAction Error:', error);
        }
    };

    const renderCharacters = () =>
        characters.map((character, index) => (
            <div className="character-item" key={character.name}>
                <div className="name-container">
                    <p>{character.name}</p>
                </div>
                <img src={character.imageURI} alt={character.name}/>
                <button
                    type="button"
                    className="character-mint-button"
                    onClick={() => mintCharacterNFTAction(index)}
                >{`Mint ${character.name}`}</button>
            </div>
        ));

    useEffect(() => {
        const {ethereum} = window;

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
        const getCharacters = async () => {
            try {
                console.log('Getting contract characters to mint');

                const charactersTxn = await gameContract.getAllDefaultCharacters();
                console.log('charactersTxn:', charactersTxn);

                const characters = charactersTxn.map((characterData) =>
                    transformCharacterData(characterData)
                );

                setCharacters(characters);
            } catch (error) {
                console.error('Something went wrong fetching characters:', error);
            }
        };
        const onCharacterMint = async (sender, tokenId, characterIndex) => {
            console.log(
                `CharacterNFTMinted - sender: ${sender} tokenId: ${tokenId.toNumber()} characterIndex: ${characterIndex.toNumber()}`
            );

            if (gameContract) {
                const characterNFT = await gameContract.checkIfUserHasNFT();
                console.log('CharacterNFT: ', characterNFT);
                setForm({
                    target: {
                        name: 'characterNFT', // form element
                        value: transformCharacterData(characterNFT) // the data/url
                    }
                })
            }
        };
        if (gameContract) {
            getCharacters();
            gameContract.on('CharacterNFTMinted', onCharacterMint);
        }
        return () => {
            if (gameContract) {
                gameContract.off('CharacterNFTMinted', onCharacterMint);
            }
        };
    }, [gameContract]);

    return isLoading ?
        <SplashScreen isLoading={isLoading}/> :
        (
            <div className="App">
                <div className="container">
                    <div className="header-container">
                        <p className="header gradient-text"></p>
                        <p className="sub-text"></p>
                            {!isMinted ? (
                                <div className="select-character-container">
                                To Proceed, You Must Choose Your Hacker
                                {characters.length > 0 && (
                                    <div className="character-grid">{renderCharacters()}</div>
                                )}</div>
                                )  : ( 
                                    <div className="character_next">
                                    You have an NFT character.  You can proceed to the battle phase.
                                    <div className="next_button_character"><button onClick={next}>Next -></button></div>
                                </div>
                                )}
                        </div>
                    </div>
                </div>
        )
}
export default Character;
