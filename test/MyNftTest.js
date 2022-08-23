const{expect}= require("chai");
const {ethers}= require("hardhat"); 
describe("Deployment", function(){
    let owner;
    let addr1;
    let addr2;
    let myNFTToken;
    let name= "MyNFT";
    let symbol="MNFT";

  beforeEach("Deploying contract", async function(){
    [owner, addr1, addr2]= await ethers.getSigners();
    MyNFT= await ethers.getContractFactory("MyNFT");
    myNFTToken= await MyNFT.deploy();
  })
    it("Has the same name", async function(){
        expect(await myNFTToken.name()).to.equal(name);
    });
    it("Has the same symbol", async function(){
        expect(await myNFTToken.symbol()).to.equal(symbol);
    });
  describe("Ownership and Total Supply",function(){
    it("Owner of contract", async function(){
        expect(await myNFTToken.owner()).to.equal(owner.address);
    });
    it("Checking the maxSupply", async function(){
    })
  });
});