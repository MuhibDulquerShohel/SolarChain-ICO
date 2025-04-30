"use client";
import React from 'react'
import { Account } from "@/walletConnect/account";
import { WalletOptions } from "@/walletConnect/walletOptions";
import { useAccount } from 'wagmi'
const Navbar = () => {
    function ConnectWallet() {
        const { isConnected } = useAccount()
        if (isConnected) return <Account />
        return <WalletOptions />
      }
  return (
    <div className="navbar bg-base-100 shadow-sm">
  <div className="navbar-start">
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
        <li><a>How To Buy</a></li>
        <li>
          <a>About SolarChain</a>
          <ul className="p-2">
            <li><a>Project details</a></li>
            <li><a>Tokenomics</a></li>
          </ul>
        </li>
        <li><a>FAQs</a></li>
      </ul>
    </div>
    <a className="btn btn-ghost text-xl">SolarChain ICO</a>
  </div>
  <div className="navbar-center hidden lg:flex">
    <ul className="menu menu-horizontal px-1">
      <li><a>How To Buy</a></li>
      <li>
        <details>
          <summary>About SolarChain</summary>
          <ul className="p-2">
            <li><a>Project details</a></li>
            <li><a>Tokenomics</a></li>
          </ul>
        </details>
      </li>
      <li><a>FAQs</a></li>
    </ul>
  </div>
  <div className="navbar-end">
    <a className="btn"><ConnectWallet/></a>
  </div>
</div>
  )
}

export default Navbar