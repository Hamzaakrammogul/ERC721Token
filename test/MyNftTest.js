const{expect}= require("chai");


describe("Deployment", function(){
    let owner;
    let addr1;
    let addr2;
    let myNFTToken;
    const zero_address = "0x0000000000000000000000000000000000000000";
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
    for(i=0; i<=10; i++){
        await myNFTToken.safeMint(owner.address);
        }
        const balacnceOfOwner=await myNFTToken.balanceOf(owner.address);
        expect(balacnceOfOwner).to.equal(11);
});
    it("Reversts if user trys to mint more token than the limit", async function(){
    for(i=0; i>10; i++){
        await expect(await myNFTToken.safeMint(addr1.address)).to.be.revertedWith
        ("The minting limit has reached to its max, Sorry!");
      }
    });
    it("Reverts if zero address try to mint", async function(){
        await expect(myNFTToken.safeMint(zero_address)).to.be.reverted;
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
  describe("transferFrom", function(){
    it("Transfer the ownership of token", async function(){
        await myNFTToken.safeMint(addr1.address);
        await myNFTToken.connect(addr1).transferFrom(addr1.address, addr2.address, 0);
        expect(await myNFTToken.balanceOf(addr2.address)).to.equal(1);
        expect(await myNFTToken.balanceOf(addr1.address)).to.equal(0);
    })
    it("Reverts if the caller is not msg.sender", async function(){
        await myNFTToken.safeMint(owner.address);
        const attacker= await myNFTToken.connect(addr1);
        await expect(attacker.transferFrom(addr1.address,addr2.address, 0))
        .to.be.revertedWith("ERC721: caller is not token owner nor approved");
    });
    it("Reverts if the _to is the zero address", async function(){ 
        await myNFTToken.safeMint(owner.address);
        await expect(myNFTToken.transferFrom(owner.address, zero_address, 0))
        .to.be.revertedWith("ERC721: transfer to the zero address");
    });
  })
});