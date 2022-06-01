const CONTRACT_ADDRESS = ' 0xc689c1a450AAb8Dfc18343E702019c4E40AA7850';
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