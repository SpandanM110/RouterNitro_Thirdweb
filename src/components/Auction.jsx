import { useMarketplace } from "@thirdweb-dev/react";
import { NATIVE_TOKEN_ADDRESS } from "@thirdweb-dev/sdk";
export default function Auction() {
    // Connect to our marketplace contract via the useMarketplace hook
    const marketplace = useMarketplace(
      "0xc603264D6FF0dAf92A5EB831B632166Fd08A8503", // Your marketplace contract address here
    );
  
    // rest of the code goes here
  }async function createAuctionListing(e) {
    // prevent page from refreshing
    e.preventDefault();
  
    // De-construct data from form submission
    let { contractAddress, tokenId, price } = e.target.elements;
  
    contractAddress = contractAddress.value;
    tokenId = tokenId.value;
    price = price.value;
  
    try {
      const transaction = await marketplace?.auction.createListing({
        assetContractAddress: contractAddress, // Contract Address of the NFT
        buyoutPricePerToken: price, // Maximum price, the auction will end immediately if a user pays this price.
        currencyContractAddress: NATIVE_TOKEN_ADDRESS, // NATIVE_TOKEN_ADDRESS is the crpyto curency that is native to the network. e.g. ETH.
        listingDurationInSeconds: 60 * 60 * 24 * 7, // When the auction will be closed and no longer accept bids (1 Week)
        quantity: 1, // How many of the NFTs are being listed (useful for ERC 1155 tokens)
        reservePricePerToken: 0, // Minimum price, users cannot bid below this amount
        startTimestamp: new Date(), // When the listing will start
        tokenId: tokenId, // Token ID of the NFT.
      });
  
      return transaction;
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <form onSubmit={(e) => createAuctionListing(e)}>
      {/* NFT Contract Address Field */}
      <input
        type="text"
        name="contractAddress"
        placeholder="NFT Contract Address"
      />
  
      {/* NFT Token ID Field */}
      <input type="text" name="tokenId" placeholder="NFT Token ID" />
  
      {/* Sale Price For Listing Field */}
      <input type="text" name="price" placeholder="Sale Price" />
  
      {/* Submit button */}
      <button type="submit">List NFT</button>
    </form>
  );