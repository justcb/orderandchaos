// SPDX-License-Identifier: MIT

pragma solidity ^0.8.1;
import "hardhat/console.sol";
// NFT contract to inherit from.
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

// Helper functions OpenZeppelin provides.
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "./libraries/Base64.sol";
import "./GameToken.sol";
import "@openzeppelin/contracts/access/Ownable.sol";



contract MyEpicGame is ERC721 {
    // We'll hold our character's attributes in a struct. Feel free to add
  // whatever you'd like as an attribute! (ex. defense, crit chance, etc).
  struct CharacterAttributes {
    uint characterIndex;
    string name;
    string imageURI;        
    uint defense;
    uint hp;
    uint maxHp;
    uint attackDamage;
  }

  // The tokenId is the NFTs unique identifier, it's just a number that goes
  // 0, 1, 2, 3, etc.
  using Counters for Counters.Counter;
  Counters.Counter private _tokenIds;

  // A lil array to help us hold the default data for our characters.
  // This will be helpful when we mint new characters and need to know
  // things like their HP, AD, etc.
  CharacterAttributes[] defaultCharacters;

// We create a mapping from the nft's tokenId => that NFTs attributes.
  mapping(uint256 => CharacterAttributes) public nftHolderAttributes;

  // A mapping from an address => the NFTs tokenId. Gives me an ez way
  // to store the owner of the NFT and reference it later.
  mapping(address => uint256) public nftHolders;

  event CharacterNFTMinted(address sender, uint256 tokenId, uint256 characterIndex);
  event AttackComplete(address sender, uint newBossHp, uint newPlayerHp);

  struct StrongHold {
    uint strongHoldIndex;
    string name;
    uint hp;
    uint attackDamage;
  }

  StrongHold public strongHold;


  // Data passed in to the contract when it's first created initializing the characters.
  // We're going to actually pass these values in from run.js.
  constructor(
    string[] memory characterNames,
    string[] memory characterImageURIs,
    uint[] memory characterDefense,
    uint[] memory characterHp,
    uint[] memory characterAttackDamage,
    string [] memory bossName, 
    uint [] memory bossHp,
    string [] memory bossURI,
    uint [] memory bossAttackDamage
  )
  ERC721("Hackers", "HACK")
  {
  strongHold = StrongHold({
    name: bossName,
    hp: bossHp,
    URI: bossURI,
    attackDamage: bossAttackDamage
   });

  console.log("Done initializing boss %s w/ HP %s", strongHold.name, strongHold.hp);

    // Loop through all the characters, and save their values in our contract so
    // we can use them later when we mint our NFTs.
    for(uint i = 0; i < characterNames.length; i += 1) {
      defaultCharacters.push(CharacterAttributes({
        characterIndex: i,
        name: characterNames[i],
        imageURI: characterImageURIs[i],
        level: characterLevel[i],
        hp: characterHp[i],
        maxHp: characterHp[i],
        attackDamage: characterAttackDmg[i],
        speed: characterSpeed[i],
        informationValue: characterInformationValue[i]
      }));

      CharacterAttributes memory c = defaultCharacters[i];
      console.log("Done initializing %s w/ HP %s, img %s", c.name, c.hp, c.imageURI);
    }
    // I increment _tokenIds here so that my first NFT has an ID of 1.
    _tokenIds.increment();
  }
  function tokenURI(uint256 _tokenId) public view override returns (string memory) {
  CharacterAttributes memory charAttributes = nftHolderAttributes[_tokenId];

  string memory strLevel = Strings.toString(charAttributes.level);
  string memory strHp = Strings.toString(charAttributes.hp);
  string memory strMaxHp = Strings.toString(charAttributes.maxHp);
  string memory strAttackDamage = Strings.toString(charAttributes.attackDamage);
  string memory strSpeed = Strings.toString(charAttributes.speed);
  string memory strInformationValue = Strings.toString(charAttributes.informationValue);

  string memory json = Base64.encode(
    abi.encodePacked(
      '{"name": "',
      charAttributes.name,
      ' -- NFT #: ',
      Strings.toString(_tokenId),
      '", "description": "This is a Hacker needed to play Order and Chaos.", "image": "',
      charAttributes.imageURI,
      '", "attributes": [ { "trait_type": "Level", "value": ',strLevel,'}, { "trait_type": "Health Points", "value": ',strHp,', "max_value":',strMaxHp,'}, { "trait_type": "Attack Damage Primary", "value": ',
      strAttackDamage1,'}, { "trait_type": "Speed", "value": ', strSpeed,'}, { "trait_type": "Information Value", "value": ', strInformationValue,'} ]}'
    )
  );

  string memory output = string(
    abi.encodePacked("data:application/json;base64,", json)
  );
  
  return output;
}

  function attackBoss() public {
    uint256 nftTokenIdOfPlayer = nftHolders[msg.sender];
    CharacterAttributes storage player = nftHolderAttributes[nftTokenIdOfPlayer];
    console.log("\nPlayer w/ character %s about to attack. Has %s HP and %s AD", player.name, player.hp, player.attackDamage1);
    console.log("Boss %s has %s HP and %s AD", strongHold.name, strongHold.hp, strongHold.attackDamage);
    require (
      player.hp > 0,
      "Error: character must have HP to attack a stronghold."
    );

      // Make sure the boss has more than 0 HP.
    require (
      strongHold.hp > 0,
      "Error: boss must have HP to attack boss."
    );
    if (strongHold.hp < player.attackDamage) {
    strongHold.hp = 0;
    } else {
    strongHold.hp = strongHold.hp - player.attackDamage;
    }
      // Allow boss to attack player.
    if (player.hp < strongHold.attackDamage) {
    player.hp = 0;
    } else {
    player.hp = player.hp - strongHold.attackDamage;
    }
  
  // Console for ease.
  console.log("Player attacked boss. New boss hp: %s", strongHold.hp);
  console.log("Boss attacked player. New player hp: %s\n", player.hp);
  emit AttackComplete(msg.sender, strongHold.hp, player.hp);
  }

    // Users would be able to hit this function and get their NFT based on the
  // characterId they send in!
  function mintCharacterNFT(uint _characterIndex) external {
    // Get current tokenId (starts at 1 since we incremented in the constructor).
    uint256 newItemId = _tokenIds.current();

    // The magical function! Assigns the tokenId to the caller's wallet address.
    _safeMint(msg.sender, newItemId);

    // We map the tokenId => their character attributes. More on this in
    // the lesson below.
    nftHolderAttributes[newItemId] = CharacterAttributes({
      characterIndex: _characterIndex,
      name: defaultCharacters[_characterIndex].name,
      imageURI: defaultCharacters[_characterIndex].imageURI,
      level: defaultCharacters[_characterIndex].level,
      hp: defaultCharacters[_characterIndex].hp,
      maxHp: defaultCharacters[_characterIndex].maxHp,
      attackDamage1: defaultCharacters[_characterIndex].attackDamage1,
      speed: defaultCharacters[_characterIndex].speed,
      informationValue: defaultCharacters[_characterIndex].informationValue
    });

    console.log("Minted NFT w/ tokenId %s and characterIndex %s", newItemId, _characterIndex);
    
    // Keep an easy way to see who owns what NFT.
    nftHolders[msg.sender] = newItemId;

    // Increment the tokenId for the next person that uses it.
    _tokenIds.increment();
    emit CharacterNFTMinted(msg.sender, newItemId, _characterIndex);
  }
  function checkIfUserHasNFT() public view returns (CharacterAttributes memory) {
  // Get the tokenId of the user's character NFT
  uint256 userNftTokenId = nftHolders[msg.sender];
  // If the user has a tokenId in the map, return their character.
  if (userNftTokenId > 0) {
    return nftHolderAttributes[userNftTokenId];
  }
  // Else, return an empty character.
  else {
    CharacterAttributes memory emptyStruct;
    return emptyStruct;
   }
}

function getAllDefaultCharacters() public view returns (CharacterAttributes[] memory) {
  return defaultCharacters;
}

function getStrongHold() public view returns (StrongHold memory) {
  return strongHold;
}


}