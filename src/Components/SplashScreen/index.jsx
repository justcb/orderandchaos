import React, { useEffect, useState } from 'react';
import './Loading.css';
import { ethers } from 'ethers';
import { CONTRACT_ADDRESS, transformCharacterData } from '../../constants';
import myEpicGame from '../../utils/MyEpicGame.json';

const SplashScreen = () => {
  
  useEffect(() => {
  
    // Wait for 3 seconds
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);
  
  return (
    <div className="lds-ring">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};

export default SplashScreen;