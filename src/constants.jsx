const CONTRACT_ADDRESS = '0x526CFeedd61f972521729F6091828c05A259f23D';

const transformCharacterData = (characterData) => {
  return {
    name: characterData.name,
    imageURI: characterData.imageURI,
    hp: characterData.hp.toNumber(),
    //maxHp: characterData.maxHp.toNumber(),
    //attackDamage: characterData.attackDamage.toNumber()
  };
};

export { CONTRACT_ADDRESS, transformCharacterData };