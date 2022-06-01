const CONTRACT_ADDRESS = '0x438453b49220adFa0f7E6E177e180E94c8Da4Fb0';
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