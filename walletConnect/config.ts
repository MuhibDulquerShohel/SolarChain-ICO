
import { http, createConfig } from 'wagmi'
import { base, mainnet } from 'wagmi/chains'
import { injected, metaMask } from 'wagmi/connectors'

// const projectId = '<2cca2410aa0ba1d8a172daba4c777920>'

export const config = createConfig({
  chains: [mainnet, base],
  connectors: [
    injected(),
    // walletConnect({ projectId }),
    metaMask(),
  ],
  transports: {
    [mainnet.id]: http(),
    [base.id]: http(),
    
  },
})