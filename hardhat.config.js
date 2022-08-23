require("@nomicfoundation/hardhat-toolbox");


/** @type import('hardhat/config').HardhatUserConfig */
const ALCHEMY_API_KEY="rpJlYoyYXytQfY4hzD2HLfRxrsoYJUgT";
const GOERLI_PRIVATE_KEY ="887f4c88e171b054ab67669b16e99028b28b872675d6cc24cb5b7c52e9c91295";
module.exports ={
     solidity : "0.8.9",
     networks:{
      goerli:{
        url:`https://eth-goerli.g.alchemy.com/v2/${ALCHEMY_API_KEY}`,
        accounts:[`${GOERLI_PRIVATE_KEY}`],
     },
    },
  }
  