const{expect}= require("chai");


describe("Deployment", function(){
    let owner;
    let addr1;
    let addr2;
    let myNFTToken;
    let name= "MyNFT";
    let symbol="MNFT";
    const baseURI = "https://api.mynft.com/tokens/";

  beforeEach("Deploying contract", async function(){
    [owner, addr1, addr2]= await ethers.getSigners();
    MyNFT= await ethers.getContractFactory("MyNFT");
    myNFTToken= await MyNFT.deploy();
  });
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
  });
  describe("balanceOf",function(){
    it("check the balnce of owner", async function(){
    for(i=1; i<=2; i++){
    await myNFTToken.safeMint(owner.address);
        }
    const balacnceOfOwner=await myNFTToken.balanceOf(owner.address);
    expect(balacnceOfOwner).to.equal(2);
});
  });
  describe("ownerOf", function(){
    it("Shows the owner of token", async function(){
         await myNFTToken.safeMint(owner.address);
         await myNFTToken.safeMint(addr1.address);
         expect(await myNFTToken.ownerOf(0)).to.equal(owner.address);
         expect(await myNFTToken.ownerOf(1)).to.equal(addr1.address);
    });
  });
  describe("Transactional", function(){
    it.only("Transfer the ownership of token", async function(){
        await myNFTToken.safeMint(addr1.address);
        await myNFTToken.connect(addr1).transferFrom(addr1.address, addr2.address, 0);
        expect(await myNFTToken.balanceOf(addr2.address)).to.equal(1);
        expect(await myNFTToken.balanceOf(addr1.address)).to.equal(0);
    })
  })
});