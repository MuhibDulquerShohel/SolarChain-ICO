"use client";
import * as React from 'react'
import { useConnect } from 'wagmi'

export function WalletOptions() {
  const { connectors, connect } = useConnect()

  return connectors.map((connector) => (
    <button className=' hover:cursor-pointer hover:text-accent' key={connector.uid} onClick={() => connect({ connector })}>
      {connector.name}
    </button>
  ))
}