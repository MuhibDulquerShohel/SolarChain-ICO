"use client";
import "./globals.css";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { WagmiProvider } from 'wagmi'
import { http, createConfig } from 'wagmi'
import { base, mainnet, sepolia } from 'wagmi/chains'
import { injected, metaMask, walletConnect } from 'wagmi/connectors'
import Navbar from "@/components/Navbar";
import { ContextProvider } from "@/context/contextProvider";
const queryClient = new QueryClient()
const projectId = '2cca2410aa0ba1d8a172daba4c777920'
const config = createConfig({
  chains: [mainnet, base, sepolia],
  connectors: [
    injected(),
    walletConnect({ projectId }),
    metaMask(),
  ],
  transports: {
    [mainnet.id]: http(),
    [base.id]: http(),
    [sepolia.id]: http(),
  },
})


// export const metadata: Metadata = {
//   title: "Create Next App",
//   description: "Generated by create next app",
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      
      <body
        className=" overflow-hidden"
      >
        <WagmiProvider config={config}>
          <QueryClientProvider client={queryClient}> 
        <ContextProvider>
            <Navbar />
            {children}
        </ContextProvider>
          </QueryClientProvider> 
        </WagmiProvider>
      </body>
    </html>
  );
}
