// SPDX-License-Identifier: MIT

pragma solidity ^0.8.1;

// NFT contract to inherit from.
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
// Helper functions OpenZeppelin provides.
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
// Imports Base64
import "./libraries/Base64.sol";
// Imports Game Token
import "./GameToken.sol";



contract OrderAndChaos is ERC721 {
    //This struct is used to hold the Character Attributes for the NFTs
  struct CharacterAttributes {
    uint characterIndex;
    string name;
    string imageURI;        
    uint defense;
    uint hp;
    uint maxHp;
    uint attackDamage;
  }

    //Counter to insure that each NFT has a unique identifier
  using Counters for Counters.Counter;
  Counters.Counter private _tokenIds;

  // An array to hold the default data for our characters.
  CharacterAttributes[] defaultCharacters;

    // Mapping from the nft's tokenId => that NFTs attributes.
  mapping(uint256 => CharacterAttributes) public nftHolderAttributes;

    // Mapping to store the owner of the NFTs.
  mapping(address => uint256) public nftHolders;

    // NFT Mint and Attack Event
  event CharacterNFTMinted(address sender, uint256 tokenId, uint256 characterIndex);
  event AttackComplete(address sender, uint newBossHp, uint newPlayerHp);


    // This struct holds the boss attributes
  struct StrongHold {
    string name;
    uint hp;
    string bossURI;
    uint attackDamage;
  }
    // Makes Stronghold available for use
  StrongHold public strongHold;


  // Data passed in to the contract when it's first created initializing the characters.
  
  constructor(
    string[] memory characterNames,
    string[] memory characterImageURIs,
    uint[] memory characterDefense,
    uint[] memory characterHp,
    uint[] memory characterAttackDamage,
    string memory bossName, 
    uint bossHp,
    string memory bossURI,
    uint bossAttackDamage
  )

  //Provides the name and symbol for the tokens
  ERC721("Hackers", "HACK")
  
  //Initializes the StrongHold
  {
  strongHold = StrongHold({
    name: bossName,
    hp: bossHp,
    bossURI: bossURI,
    attackDamage: bossAttackDamage
   });

  //console.log("Done initializing boss %s w/ HP %s", strongHold.name, strongHold.hp);

    // Loops through all the characters and saves their values for use in minting.
    for(uint i = 0; i < characterNames.length; i += 1) {
      defaultCharacters.push(CharacterAttributes({
        characterIndex: i,
        name: characterNames[i],
        imageURI: characterImageURIs[i],
        defense: characterDefense[i],
        hp: characterHp[i],
        maxHp: characterHp[i],
        attackDamage: characterAttackDamage[i]
      }));

      CharacterAttributes memory c = defaultCharacters[i];
      //console.log("Done initializing %s w/ HP %s, img %s", c.name, c.hp, c.imageURI);
    }
    // Increments _tokenIds so that first NFT starts at 1 instead of zero.
    _tokenIds.increment();
  }
  function tokenURI(uint256 _tokenId) public view override returns (string memory) {
  CharacterAttributes memory charAttributes = nftHolderAttributes[_tokenId];
    //Converts uints to strings
  string memory strHp = Strings.toString(charAttributes.hp);
  string memory strMaxHp = Strings.toString(charAttributes.maxHp);
  string memory strAttackDamage = Strings.toString(charAttributes.attackDamage);
    //Uses Base64 to encode NFT data
  string memory json = Base64.encode(
    abi.encodePacked(
      '{"name": "',
      charAttributes.name,
      ' -- NFT #: ',
      Strings.toString(_tokenId),
      '", "description": "This is a Hacker needed to play Order and Chaos.", "image": "',
      charAttributes.imageURI,
      '", "attributes": [ { "trait_type": "Health Points", "value": ',strHp,', "max_value":',strMaxHp,'}, { "trait_type": "Attack Damage Primary", "value": ',
      strAttackDamage,'} ]}'
    )
  );

  string memory output = string(
    abi.encodePacked("data:application/json;base64,", json)
  );
  
  return output;
}

    //Random number generator used to provide different NFT attributes.  NOTE: This is not truly random.
  function random(uint number) public view returns(uint random_number){
        random_number = uint(keccak256(abi.encodePacked(block.timestamp,block.difficulty,  
        msg.sender))) % number;
        return random_number;
    }

    //Attack Boss game function
  function attackBoss() public {
    uint256 nftTokenIdOfPlayer = nftHolders[msg.sender];
    CharacterAttributes storage player = nftHolderAttributes[nftTokenIdOfPlayer];
    //console.log("\nPlayer w/ character %s about to attack. Has %s HP and %s AD", player.name, player.hp, player.attackDamage);
    //console.log("Boss %s has %s HP and %s AD", strongHold.name, strongHold.hp, strongHold.attackDamage);
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
    player.hp = player.hp - (strongHold.attackDamage - player.defense);
    }
  
  // Console for ease.
  //console.log("Player attacked boss. New boss hp: %s", strongHold.hp);
  //console.log("Boss attacked player. New player hp: %s\n", player.hp);
  emit AttackComplete(msg.sender, strongHold.hp, player.hp);
  }


  // Revive Player function
  function Revive() public {
    // if player hp equals 0, reset the players hp to max hp
    if (player.hp == 0) {
      require(
        transfer(0x58c2718001669D62ed2337F3eF01F9aC759e19dE, 1)
      );
      player.hp == player.maxHp;
    }
  }



    // Mint NFT Function. Takes in the character type.
  function mintCharacterNFT(uint _characterIndex) external {
    // Get current tokenId.
    uint256 newItemId = _tokenIds.current();

    // Assigns the tokenId to the caller's wallet address.
    _safeMint(msg.sender, newItemId);

    // We map the tokenId => their character attributes. Note the random character attributes.
    nftHolderAttributes[newItemId] = CharacterAttributes({
      characterIndex: _characterIndex,
      name: defaultCharacters[_characterIndex].name,
      imageURI: defaultCharacters[_characterIndex].imageURI,
      defense: (defaultCharacters[_characterIndex].defense + random(200)),
      hp: (defaultCharacters[_characterIndex].hp + random(200)),
      maxHp: defaultCharacters[_characterIndex].maxHp,
      attackDamage: (defaultCharacters[_characterIndex].attackDamage + random(200))
    });

    //console.log("Minted NFT w/ tokenId %s and characterIndex %s", newItemId, _characterIndex);
    
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