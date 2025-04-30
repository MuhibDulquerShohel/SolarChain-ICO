"use client";

import {
  createContext,
  useState,
  ReactNode,
  useContext,
} from "react";
import { readContract } from "@wagmi/core";
import { config } from "@/walletConnect/config";
import { useReadContract,useWriteContract  } from "wagmi";
import { CONTRACT_ADDRESS, CONTRACT_ABI } from "./constants";
import { useEffect } from "react";
import { sepolia } from "viem/chains";
export interface Web3ContextType {
  currentAccount: string;
  hardCap: string;
  softCap: string;
  totalSold: string;
  userInfo: string;
  mint: () => void; 
  getOwner: () => Promise<string>;
  
}

export const Web3Context = createContext<Web3ContextType | null>(null);

interface ContextProviderProps {
  children: ReactNode;
}

export const ContextProvider = ({ children }: ContextProviderProps) => {
  const [currentAccount] = useState<string>("0x0000");
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const { data: hash, writeContract } = useWriteContract()

  const getOwner = async() =>  {
      console.log("getting owner, please wait...");
      const result = await readContract(config, {
        abi:CONTRACT_ABI,
        address: '0xE6dAEE6c1716091F41158b58F1e68401eb43A69c',
        functionName: 'owner',
        args: [],
        chainId: sepolia.id,
      })
    console.log("balance is" ,result )
      return result
    }

  async function mint() { 
    console.log("start")
    // const formData = 
    // const tokenId =  
    writeContract({
      address: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2',
      abi: [
        {
          name: 'mint',
          type: 'function',
          stateMutability: 'nonpayable',
          inputs: [{ internalType: 'uint32', name: 'tokenId', type: 'uint32' }],
          outputs: [],
        },
      ],
      functionName: 'mint',
      args: [234435345],
    })
    console.log("done")
  } 
  const { data: hardCap } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: "getHardCap",
    chainId: 11155111,
  });

  const { data: softCap, error } = useReadContract({
    address: "0xE6dAEE6c1716091F41158b58F1e68401eb43A69c",
    abi: CONTRACT_ABI,
    functionName: "owner",
    chainId: sepolia.id,
  });
  console.log("softCap: sd", error);
  

  const { data: totalSold, isSuccess, isFetched } = useReadContract({
    address: "0xE6dAEE6c1716091F41158b58F1e68401eb43A69c",
    abi: CONTRACT_ABI,
    functionName: "getTotalSold",
    chainId: 11155111,
  });

  if (isFetched && totalSold !== undefined) {
    console.log("Total Sold:", totalSold.toString());
  } else {
    console.log("Data not fetched yet.");
  }
  const { data: userInfo } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: "getUserInfo",
    chainId: 11155111,
  });
  console.log("hardCap:", hardCap);
console.log("softCap:", softCap);
console.log("userInfo:", userInfo);

  if (!isMounted) return null;

  return (
    <Web3Context.Provider
      value={{
        currentAccount,
        hardCap: hardCap?.toString() ?? "0",
        softCap: softCap?.toString() ?? "0",
        totalSold: totalSold?.toString() ?? "0",
        userInfo: userInfo?.toString() ?? "0",getOwner,
      }}
    >
      {children}
    </Web3Context.Provider>
  );
};

export const useWeb3Context = () => {
  const context = useContext(Web3Context);
  if (!context) {
    throw new Error("useWeb3Context must be used within a Web3Provider");
  }
  return context;
};
