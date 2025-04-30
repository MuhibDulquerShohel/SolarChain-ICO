"use client";
import { useAccount, useDisconnect } from 'wagmi'

export function Account() {
  const { address } = useAccount()
  const { disconnect } = useDisconnect()


  return (
    <div>
      
      {address && (
        <div>
          {address.slice(0, 6)}...{address.slice(-4)}
        </div>
      )}
      <button className=' hover:cursor-pointer hover:text-accent'  onClick={() => disconnect()}>Disconnect</button>
    </div>
  )
}