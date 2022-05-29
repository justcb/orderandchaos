import React, {useEffect, useState} from "react";
import SplashScreen from "./SplashScreen";
import {ethers} from "ethers";
import {CONTRACT_ADDRESS, transformCharacterData} from "../constants";
import myEpicGame from "../utils/MyEpicGame.json";
import '../assets/css/SelectCharacter.css';
/*
* Don't worry about setCharacterNFT just yet, we will talk about it soon!
*/
const Character = ({ setForm, formData, navigation }) => {
    const [isLoading, setIsLoading] = useState(true);
    const {next} = navigation;
    const { personType } = formData;
    // Splash Screen
    useEffect(() => {
        // Wait for 3 seconds
        setTimeout(() => {
            setIsLoading(false);
        }, 1500);
    }, []);



    const [characters, setCharacters] = useState([]);
    const [gameContract, setGameContract] = useState(null);

// Actions
    const mintCharacterNFTAction = async (characterId) => {
        try {
            if (gameContract) {
                console.log('Minting character in progress...');
                const mintTxn = await gameContract.mintCharacterNFT(characterId);
                await mintTxn.wait();
                console.log('mintTxn:', mintTxn);
            }
        } catch (error) {
            console.warn('MintCharacterAction Error:', error);
        }
    };

    // Render Methods
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

            /*
             * This is the big difference. Set our gameContract in state.
             */
            setGameContract(gameContract);
        } else {
            console.log('Ethereum object not found');
        }
    }, []);

    useEffect(() => {
        const getCharacters = async () => {
            try {
                console.log('Getting contract characters to mint');

                /*
                 * Call contract to get all mint-able characters
                 */
                const charactersTxn = await gameContract.getAllDefaultCharacters();
                console.log('charactersTxn:', charactersTxn);

                /*
                 * Go through all of our characters and transform the data
                 */
                const characters = charactersTxn.map((characterData) =>
                    transformCharacterData(characterData)
                );

                /*
                 * Set all mint-able characters in state
                 */
                setCharacters(characters);
            } catch (error) {
                console.error('Something went wrong fetching characters:', error);
            }
        };
        const onCharacterMint = async (sender, tokenId, characterIndex) => {
            console.log(
                `CharacterNFTMinted - sender: ${sender} tokenId: ${tokenId.toNumber()} characterIndex: ${characterIndex.toNumber()}`
            );

            /*
             * Once our character NFT is minted we can fetch the metadata from our contract
             * and set it in state to move onto the Arena
             */
            if (gameContract) {
                const characterNFT = await gameContract.checkIfUserHasNFT();
                console.log('CharacterNFT: ', characterNFT);
                //setCharacterNFT(transformCharacterData(characterNFT));
                setForm({
                    target: {
                        name: 'characterNFT', // form element
                        value: characterNFT // the data/url
                    }
                })
            }
        };
        /*
         * If our gameContract is ready, let's get characters!
         */
        if (gameContract) {
            getCharacters();
            gameContract.on('CharacterNFTMinted', onCharacterMint);
        }
        return () => {
            /*
             * When your component unmounts, let;s make sure to clean up this listener
             */
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
                        <p className="header gradient-text">SETH|MAYET</p>
                        <p className="sub-text">Hack to Maintain the Balance {`${personType}`}</p>
                        <div className="select-character-container">
                            <h2>Choose Your Hacker</h2>
                            {/* Only show this when there are characters in state */}
                            {characters.length > 0 && (
                                <div className="character-grid">{renderCharacters()}</div>
                            )}
                            <button onClick={next}>Next</button>
                        </div>
                    </div>
                </div>
            </div>
        )
}
export default Character;
