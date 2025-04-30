
import { http, createConfig } from 'wagmi'
import { base, mainnet, sepolia, localhost, bscTestnet } from 'wagmi/chains'
import { injected, metaMask, walletConnect } from 'wagmi/connectors'

const projectId = '<2cca2410aa0ba1d8a172daba4c777920>'

export const config = createConfig({
  chains: [mainnet, base, sepolia, localhost, bscTestnet],
  connectors: [
    injected(),
    walletConnect({ projectId }),
    metaMask(),
  ],
  transports: {
    [mainnet.id]: http(),
    [base.id]: http(),
    [sepolia.id]: http(),
    [localhost.id]: http(),
    [bscTestnet.id]: http(),
    
  },
})