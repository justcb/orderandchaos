const CONTRACT_ADDRESS = '0x7C1eB732B20c72b9512c8022f14B8763b1eE5796';
const TOKEN_ADDRESS = '0xb2D7fBcdADcb07a1e5bb4163832E3f53c46Afa6d';
const transformCharacterData = (characterData) => {
  return {
    name: characterData.name,
    imageURI: characterData.imageURI,
    hp: characterData.hp.toNumber(),
    //maxHp: characterData.maxHp.toNumber(),
    attackDamage: characterData.attackDamage.toNumber()
  };
};

export { CONTRACT_ADDRESS, transformCharacterData };