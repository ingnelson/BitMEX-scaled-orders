## Table of Contents

- [Current Features](#current-features)
- [Built With](#built-with)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
- [Distributions](#distributions)
- [Roadmap](#roadmap)
- [License](#license)
- [Useful material](#useful-material)

<p align="center"> 
<img src="assets/interface_range_tool.png">
</p>

# BitMEX trading tool

This project is a trading tool based on **BitMEX API** to help you place orders in a range ( It can also be used to overcome the overload feature on the website (although sometimes API's also get suspended due to high load).

### Current Features

- Place up to 30 orders in a range at once;
- **Uniform, Normal, Positive or Negative** order placing distributions; (see [Distributions](#distributions) section);
- Get current price *(it is based on the lastest ask price)*

### Built With

The Backend was built using **Node + Express** and the Frontend, **React + Redux**. Styled components were taken from **React Bootstrap**. API requests are made with the help of **CCXT**.

- [Node](https://nodejs.org/en/) + [Express](https://expressjs.com/)
- [React](https://reactjs.org/) + [Redux](https://redux.js.org/)
- [React Bootstrap](https://react-bootstrap.github.io/)
- [CCXT](https://github.com/ccxt/ccxt)

<!-- GETTING STARTED -->

## Getting Started

- Go to https://www.bitmex.com

  _(If you are **new** to BitMEX, consider using my [affiliate link](https://www.bitmex.com/register/yjssSB) to get **10% off** the fees for 6 months.)_

* Get API keys:
  - Account > API keys > Create API key;
    - **Key Permissions** : Order;
    - **Withdraw**: Unchecked;

### Prerequisites

- [Nodejs](https://nodejs.org/en/download/)
- Update npm:

```sh
npm install npm@latest -g
```

### Installation

1. Clone the repo

```sh
git clone https://github.com/Effanuel/Bitmex-trading-tool.git
```

2. Install NPM packages

```sh
cd api
npm init:packages
```

3. Enter your API keys in `.sample-env` _(no quotes are needed)_

```
API_KEY = <API_KEY>
API_SECRET = <API_SECRET_KEY>
TESTNET = false
ENABLE_RATE_LIMIT = true
```

4. Rename `.sample-env` to `.env` (you can also change whether you want to use **Testnet**, **Rate Limit**)

   #### Disclaimer: If you set TESTNET to true, you need to create a [Testnet](https://testnet.bitmex.com/) account and set the API keys appropriately. Your main Bitmex account API won't work with TESTNET option set to true.

<!-- USAGE EXAMPLES -->

5. Build and run
```
npm run dev:server
```

## Usage

## Distributions
These are the available distributions to choose from:
<p align="center"> 
<img src="assets/distributions.png">
</p>

*(The chart representations are symbolic)*

## Roadmap

- **Stepping stop-loss on target hit** using a Websocket;
- **Chasing price** for limit orders;
- Transition to **TypeScript**;

<!-- LICENSE -->

## License

Distributed under the MIT License. See `LICENSE` for more information.

<!-- USEFUL METERIAL -->

## Useful Material
- [BitMEX Survival Guide](https://www.crypto-simplified.com/wp-content/uploads/2018/09/BitMEX-Survival-Guide-v1.5.pdf)
- [Crypto news](https://cointelegraph.com/)
- [BitMEX position calculator](https://blockchainwhispers.com/bitmex-position-calculator/)
