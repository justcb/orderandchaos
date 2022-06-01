const CONTRACT_ADDRESS = '0x893a9897BD46eCfDf30b633669478dEa1492f9d3';
const TOKEN_ADDRESS = '0xb2D7fBcdADcb07a1e5bb4163832E3f53c46Afa6d';
const transformCharacterData = (characterData) => {
  return {
    name: characterData.name,
    imageURI: characterData.imageURI,
    hp: characterData.hp.toNumber(),
    attackDamage: characterData.attackDamage.toNumber()
  };
};

export { CONTRACT_ADDRESS, transformCharacterData, TOKEN_ADDRESS };