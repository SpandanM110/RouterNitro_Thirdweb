# Router Nitro and Thirdweb Integration

## Overview

Router Nitro is a cross-chain swapping engine designed to facilitate seamless asset transfers between different blockchain networks. This repository demonstrates how to integrate and utilize Router Nitro with Thirdweb for listing, transferring, converting, and minting assets in real-time.

## Thirdweb Integration

Thirdweb enhances Router Nitro's capabilities by providing additional tools and functionalities for cross-chain asset management. It offers:

- **Listing**: Easily list assets across multiple blockchain networks supported by Router Nitro.
  
- **Transferring**: Facilitate secure and efficient asset transfers between different blockchain environments.
  
- **Converting**: Convert digital assets between various formats and standards supported by Thirdweb and Router Nitro.
  
- **Minting**: Issue new tokens or assets on designated blockchain networks in real-time.

## Installation

To get started with this demo app:

1. Clone this repository:
   ```bash
   git clone <repository-url>
   cd <repository-directory>
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the demo app:
   ```bash
   npm start
   ```

## Usage

### 1. What is Router Nitro?

Router Nitro facilitates trustless cross-chain asset transfers by utilizing a forwarder mechanism to deliver assets from the source chain to the destination chain.

### 2. Build Don't Talk

This repository emphasizes practical implementation over theoretical discussion, providing a straightforward approach to integrating Router Nitro in decentralized applications (dapps).

### 3. How to Build Using Nitro?

Integrating Nitro into your dapp is straightforward. Follow these steps:

- Clone this repository.
- Run `npm install` to install necessary packages and dependencies.
- Customize the parameters based on your dapp requirements.

### 4. Demo App

This demo app showcases how to transfer AFTT Tokens from Holsky Chain to Avalanche Fuji Chain using Nitro. It serves as a starting point for understanding and modifying the integration for other chains and tokens supported by Nitro.

### 5. Step-by-Step Integration

#### Step 1: Getting the Quote

To initiate a cross-chain token transfer, request a quote using the Pathfinder API. Here’s how:

```javascript
const PATH_FINDER_API_URL = "https://api.pf.testnet.routerprotocol.com/api";

const getQuote = async (params) => {
    const endpoint = "v2/quote";
    const quoteUrl = `${PATH_FINDER_API_URL}/${endpoint}`;
    
    try {
        const res = await axios.get(quoteUrl, { params });
        return res.data;
    } catch (e) {
        console.error(`Fetching quote data from pathfinder: ${e}`);
    }
}

const quoteParams = {
    fromTokenAddress: source_token_address,
    toTokenAddress: destination_token_address,
    amount: amount,
    fromTokenChainId: source_chain_id,
    toTokenChainId: destination_chain_id,
    widgetId: 0,
};

const quoteData = await getQuote(quoteParams);
console.log("Quote Data:", quoteData);
```

Adjust the `quoteParams` object with your specific token transfer details.

### 6. Further Customization

Modify and extend the codebase to fit your dapp’s requirements. Explore additional functionalities and capabilities of Router Nitro and Thirdweb for enhanced cross-chain asset management.

## Resources

- [Supported Chains and Tokens](https://docs.routerprotocol.com/develop/voyager/voyager-v2.0/supported-chains-tokens) - Explore the list of supported chains and tokens compatible with Router Nitro and Thirdweb.

---

Feel free to customize and expand this README based on additional features, examples, or specific use cases relevant to your project.