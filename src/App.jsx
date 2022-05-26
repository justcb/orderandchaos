import React, { useEffect, useState } from 'react';
import './App.css';
import SelectCharacter from './Components/SelectCharacter';
import { CONTRACT_ADDRESS, transformCharacterData } from './constants';
import Arena from './Components/Arena';
//import SplashScreen from './Components/SplashScreen';
import SelectCharacterType from './Components/SelectCharacterType';
import myEpicGame from './utils/MyEpicGame.json';
import { ethers } from 'ethers';
import twitterLogo from './assets/twitter-logo.svg';

// Constants
const TWITTER_HANDLE = '_buildspace';
const TWITTER_LINK = `https://twitter.com/${TWITTER_HANDLE}`;
const personType = "Blue";

const questions = [
  {
    questionText: 'I prefer clear rules to follow.',
    answerOptions: [
      { answerText: 'True', isCorrect: true },
      { answerText: 'False', isCorrect: false },
    ],
  },
  {
    questionText: 'The world is better when people can do what they want.',
    answerOptions: [
      { answerText: 'True', isCorrect: false },
      { answerText: 'Flase', isCorrect: true },
    ],
  },
  {
    questionText: 'I would rather be an independent contractor than work in a big corporation.',
    answerOptions: [
      { answerText: 'True', isCorrect: false },
      { answerText: 'False', isCorrect: true },
    ],
  },
  {
    questionText: 'I prefer to select my own goals than have them told to me.',
    answerOptions: [
      { answerText: 'True', isCorrect: false },
      { answerText: 'False', isCorrect: true },
    ],
  },
  {
    questionText: 'I am a ...',
    answerOptions: [
      { answerText: 'Shark, I hunt alone.', isCorrect: false },
      { answerText: 'Wolf, I hunt in packs.', isCorrect: true },
    ],
  },

];

const App = () => {
  // State
  const [currentAccount, setCurrentAccount] = useState(null);
  const [characterNFT, setCharacterNFT] = useState(null);
	const [currentQuestion, setCurrentQuestion] = useState(0);
	const [showScore, setShowScore] = useState(false);
	const [score, setScore] = useState(0);
  const scoreType = 0;


  // Actions
  const handleAnswerOptionClick = (isCorrect) => {
		if (isCorrect) {
			setScore(score + 1);
		}

		const nextQuestion = currentQuestion + 1;
		if (nextQuestion < questions.length) {
			setCurrentQuestion(nextQuestion);
		} else {
			setShowScore(true);
      scoreType = 1;
		}
	};
  const checkIfWalletIsConnected = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        console.log('Make sure you have MetaMask!');
        return;
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
  };
const renderContent = () => {
  /*

  Pre scenario 1, I want to add the quiz if the variable hackerSide is not set.  I will just need to add the quiz and then somehow refresh the app upon completion.

   * Scenario #1
   */
  if (scoreType = 0){ return (
    <div className='app'>
    {showScore ? (
      <div className='score-section'>

        You scored {score}.  That suggests that you should be in Order.  But the choice is yours.  Choose below.
      </div>
    ) : (
      <>
        <div className='question-section'>
          <div className='question-count'>
            <span>Question {currentQuestion + 1}</span>/{questions.length}
          </div>
          <div className='question-text'>{questions[currentQuestion].questionText}</div>
        </div>
        <div className='answer-section'>
          {questions[currentQuestion].answerOptions.map((answerOption) => (
            <button onClick={() => handleAnswerOptionClick(answerOption.isCorrect)}>{answerOption.answerText}</button>
          ))}
        </div>
      </>
    )}
  </div>
);
  
} else if (!currentAccount) {
 
      return (
  
        //Else continue
        <div className="connect-wallet-container">
          <img
            src="https://www.annes40th.com/epic/sethmayetlogo.png"
                alt="Seth|Mayet"
          />
          <button
            className="cta-button connect-wallet-button"
            onClick={connectWalletAction}
          >
            Connect Wallet To Get Started
          </button>
        </div>
      );
      /*
       * Scenario #2
       */
    
  } else if (currentAccount && !characterNFT) {
    return <SelectCharacter setCharacterNFT={setCharacterNFT} />;
  } else if (currentAccount && characterNFT) {
    return <Arena characterNFT={characterNFT} setCharacterNFT={setCharacterNFT} />;
  }
};
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
      console.log('User has character NFT');
      setCharacterNFT(transformCharacterData(txn));
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
  
  return (
  <div className="App">
    <div className="container">
      <div className="header-container">
        <p className="header gradient-text">SETH|MAYET</p>
        <img alt="Twitter Logo" className="twitter-logo" src={twitterLogo} />
        <p className="sub-text">Hack to Maintain the Balance {personType}</p>
        {/* This is where our button and image code used to be!
         *	Remember we moved it into the render method.
         */}
        {renderContent()}
      </div>
      <div className="footer-container">
        <img alt="Twitter Logo" className="twitter-logo" src={twitterLogo} />
        <a
          className="footer-text"
          href={TWITTER_LINK}
          target="_blank"
          rel="noreferrer"
        >{`built with @${TWITTER_HANDLE}`}</a>
      </div>
    </div>
  </div>
);
};

export default App;