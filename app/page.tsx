"use client";
import { useReadContract,useWriteContract  } from "wagmi";
import { sepolia, bscTestnet, opBNBTestnet } from 'wagmi/chains'
import { useEffect, useState } from "react";
import { readContract } from '@wagmi/core'
import { wagmiContractConfig } from './contacts'
import  abi  from '../context/abi.json'
import { config } from "@/walletConnect/config";
// import Image from "next/image";
// import { Account } from "@/walletConnect/account";
// import { WalletOptions } from "@/walletConnect/walletOptions";
// import { useAccount } from 'wagmi'
// import { useEffect, useState } from "react";
import { useWeb3Context } from "@/context/contextProvider";
export default function Home() {
  const [owner, setOwner] = useState<string>("")
  const { hardCap, softCap, totalSold, getOwner } = useWeb3Context();
  const { data: hash, writeContract } = useWriteContract()
  // const {readContract} = useReadContract()
  // const [hardCap, setHardCap] = useState("")
  // function ConnectWallet() {
  //   const { isConnected } = useAccount()
  //   if (isConnected) return <Account />
  //   return <WalletOptions />
  // }
  const updateTokenPrice = async () => {
    console.log("updating price please wait...")
    writeContract({ 
      abi: abi,
      address: '0xE6dAEE6c1716091F41158b58F1e68401eb43A69c',
      functionName: 'updateTokenPrice',
      args: [
        11,
      ],
   })
   }
   function mintf() { 
    console.log("start")
    // const formData = 
    // const tokenId =  
    writeContract({
      address: '0xE6dAEE6c1716091F41158b58F1e68401eb43A69c',
      abi: abi,
      functionName: 'updateTokenPrice',
      args: [11],
      // chainId: sepolia.id,
    })
    console.log("done")
  } 
  // const getOwner = async() =>  {
  //   console.log("getting owner, please wait...");
  //   const result = await readContract(config, {
  //     abi:abi,
  //     address: '0xE6dAEE6c1716091F41158b58F1e68401eb43A69c',
  //     functionName: 'owner',
  //     args: [],
  //     chainId: sepolia.id,
  //   })
  // console.log("balance is" ,result )
  //   return result
  // }
  useEffect(() => {
    // console.log("it's being called")
    const getInfo = async () => {
      const cap  = await getOwner();
      console.log("setting up owner: ", cap);
      setOwner(cap?.toString());
    };
    getInfo();
  });

  return (
    
    <div className="hero bg-base-200 min-h-screen flex w-full items-center justify-between">
      <button 
      onClick={() => updateTokenPrice()
      //   writeContract({ 
      //     abi: abi,
      //     address: '0xE6dAEE6c1716091F41158b58F1e68401eb43A69c',
      //     functionName: 'updateTokenPrice',
      //     args: [
      //       11,
      //     ],
      //  })
      }
    >
      Transfer
    </button>
      <div className="flex flex-col gap-3 ml-5 max-w-1/4">
        <div className="card min-w-full bg-base-100 card-xs shadow-sm flex flex-col justify-center items-center">
          <div className="card-body">
            <h2 className="card-title items-center justify-center">Hard Cap: {hardCap} </h2>
            <h2 className="card-title items-center justify-center">Soft Cap: {softCap} </h2>
            <h2 className="card-title items-center justify-center">Total Sold: {totalSold}</h2>
            <h2 className="card-title items-center justify-center">owner: {owner}</h2>
            <h2 className="card-title items-center justify-center">
              <button onClick={() => getOwner()}>get owner</button>
            </h2>
            <div className="justify-center card-actions">
            <div className="radial-progress" style={{ "--value": 70 }  as React.CSSProperties  } 
  aria-valuenow={70} role="progressbar">70%</div>
          </div>
        </div>
      </div>
      </div>
        <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="text-5xl font-bold" onClick={()=>mintf()}>Buy Tokens</h1>
          <button onClick={()=>mintf()}>Mint Token</button>
            <div className="flex flex-col gap-3 mt-0.5 justify-center items-center">
              <fieldset className="fieldset">
          
                <input type="text" className="input" placeholder="USDT Amount" />
                
              </fieldset>
              <fieldset className="fieldset">
                
                <input type="text" className="input"   placeholder="SCC You will get" />
                
              </fieldset>
            </div>
      <button className="btn btn-primary">Buy</button>
    </div>
  </div>
  <div className="flex flex-col gap-3 mr-5 max-w-1/4">
        <div className="card min-w-full bg-base-100 card-xs shadow-sm flex flex-col justify-center items-center">
          <div className="card-body">
            <h2 className="card-title items-center justify-center">Purchased Amount: </h2>
            <h2 className="card-title items-center justify-center">Paid USDT: </h2>
            <h2 className="card-title items-center justify-center">Claimed Amount: </h2>
            <h2 className="card-title items-center justify-center">Remain to claim: </h2>
            
            
        </div>
      </div>
      </div>
</div>
    
  );
}
