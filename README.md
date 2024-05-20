# 🏗 Scaffold-ETH 2 🤝 EIP-5792

> This is a fork of [Scaffold-ETH 2](https://github.com/scaffold-eth/scaffold-eth-2)

This example leverages wagmi's experimental EIP-5792 hooks to interact with contracts using coinabse smart wallet sdk and erc-7677 for sponsorship of gas.

## Requirements

Before you begin, you need to install the following tools:

- [Node (>= v18.17)](https://nodejs.org/en/download/)
- Yarn ([v1](https://classic.yarnpkg.com/en/docs/install/) or [v2+](https://yarnpkg.com/getting-started/install))
- [Git](https://git-scm.com/downloads)

## Quickstart

To get started, follow the steps below:

1. Clone this repo & install dependencies

```
git clone https://github.com/technophile-04/se2-eip5792.git
cd se2-eip5792
yarn install
```

2. start your NextJS app:

```
yarn start
```

Visit your app on: `http://localhost:3000`.

checkout [`packages/nextjs/app/_components/EIP5792.tsx`](https://github.com/technophile-04/se2-eip5792/blob/eip-5792-demo/packages/nextjs/app/_components/EIP5792.tsx) for an example of how to interact with the smart contracts using EIP-5792 compliant wallet.

You can interact with smart contracts which was deployed on `baseSepolia` & `sepolia`, contracts abi and address are present in [`deployedContracts.ts`](https://github.com/technophile-04/se2-eip5792/blob/eip-5792-demo/packages/nextjs/contracts/deployedContracts.ts).

Since `targetNetworks` in [`scaffold.config.ts`](https://github.com/technophile-04/se2-eip5792/blob/7fc1b3f78cd022f3e1da6f4b0d5e64c3fa536aa9/packages/nextjs/scaffold.config.ts#L13) has `baseSepolia` and `sepolia` networks, the app will live on this new network.

3. Configure paymaster URL

> Checkout out this awesome example by Kristof on how to get erc-7677 proxy sever URL [here](https://x.com/kristofgazso/status/1791202175676191113), checkout the template repo [here](https://github.com/pimlicolabs/erc7677-proxy/tree/main)

> NOTE: Its nice idea to create server for `sepolia` chain, since on `baseSepolia` the gas is already sponsored.

Once you get the paymaster URL, add it in `packages/nextjs/.env.local` :

```
NEXT_PUBLIC_PAYMASTER_URL=https://...
```

4. Tinkering with contracts on local chain.

Update `targetNetworks` in `scaffold.config.ts` to include `hardhat` and follow the [quick start](https://github.com/technophile-04/se2-eip5792/tree/eip-5792-demo?tab=readme-ov-file#quickstart) from Scaffold-ETH 2 repo

## Resources on EIP-5792

- EIP 5792 : https://www.eip5792.xyz/introduction
- ERC 7677 (gas sponsorship compliant with EIP-5792): https://www.erc7677.xyz/introduction
- Krstof ERC 7677 sponsorship with pimlico proxy : https://x.com/kristofgazso/status/1791202175676191113
- Lukas showing compound example(utilizing viem actions) : https://x.com/WilsonCusack/status/1781068164077412504
- Wilson wagmi-scw repo : https://github.com/wilsoncusack/wagmi-scw

## SE-2 Documentation

Visit our [docs](https://docs.scaffoldeth.io) to learn how to start building with Scaffold-ETH 2.

To know more about its features, check out our [website](https://scaffoldeth.io).
