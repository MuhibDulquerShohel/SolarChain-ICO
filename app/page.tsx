"use client";
// import Image from "next/image";
import { Account } from "@/walletConnect/account";
import { WalletOptions } from "@/walletConnect/walletOptions";
import { useAccount } from 'wagmi'
export default function Home() {

  function ConnectWallet() {
    const { isConnected } = useAccount()
    if (isConnected) return <Account />
    return <WalletOptions />
  }
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
    <div >
      Hello World
    </div>
    <ConnectWallet />
    </main>
  );
}
