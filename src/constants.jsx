const CONTRACT_ADDRESS = '0xB76BA5706304a1cc3c9352fe5B17365724F0cd23';
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