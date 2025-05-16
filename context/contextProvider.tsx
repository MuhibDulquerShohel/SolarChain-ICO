"use client";

import {
  createContext,
  useState,
  ReactNode,
  useContext,
} from "react";
import { readContract } from "@wagmi/core";
import { config } from "@/walletConnect/config";
import { useWriteContract, useAccount  } from "wagmi";
import { CONTRACT_ADDRESS, CONTRACT_ABI, TOKEN_ABI, TOKEN_ADDRESS } from "./constants";
import { formatEther, parseEther } from "viem";
import { useEffect } from "react";
import { sepolia } from "viem/chains";
export interface Web3ContextType {
  getUserInfo: () => Promise<UserInfo>;
  getHardCap: () => Promise<string>;
  getSoftCap: () => Promise<string>;
  getTotalSold: () => Promise<string>;
  getTokenPrice: () => Promise<string>;
  buyToken: (arg0:number ) => Promise<boolean | undefined>;
  
}

export interface UserInfo {
  amountPaid: bigint;
  remainToClaim: bigint;
  tokensClaimed: bigint;
  tokensPurchased: bigint;
  user: string;
}


export const Web3Context = createContext<Web3ContextType | null>(null);

interface ContextProviderProps {
  children: ReactNode;
}

export const ContextProvider = ({ children }: ContextProviderProps) => {
   const { isConnected, address } = useAccount()
  const { writeContract } = useWriteContract()
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // const { data: hash, writeContract } = useWriteContract()
  const buyToken = async (amount: number) => {
    
    if(amount === undefined){
      console.log("amount is undefined")
      alert("amount is undefined")
    }
    const parsedAmount = parseEther(amount?.toString())
    const allowance = await getAllowance();
    if(BigInt(allowance) < parsedAmount){
      await approve(parsedAmount)
    }
    // return true;
    // const { isSuccess, error} = await 
    writeContract({ 
      abi: CONTRACT_ABI,
      address: CONTRACT_ADDRESS,
      functionName: 'buyTokens',
      args: [
        parsedAmount,
      ],
      chainId: sepolia.id,
   })
    return true 
   }

   const approve = async (amount : bigint) => {
    console.log("approving, please wait...");
    writeContract({ 
      abi: TOKEN_ABI,
      address: TOKEN_ADDRESS,
      functionName: 'approve',
      args: [
        CONTRACT_ADDRESS,
        amount,
      ],
      chainId: sepolia.id,
   })
   }


   const getAllowance = async () => {
    console.log("getting allowance, please wait...");
    let  currentAccount;
    if(isConnected ){
        currentAccount = address
        
      }else {
        return 0n
      }
    const result = await readContract(config, {
      abi:TOKEN_ABI,
      address: TOKEN_ADDRESS,
      functionName: 'allowance',
      args: [currentAccount, CONTRACT_ADDRESS],
      chainId: sepolia.id,
    })
    return result as bigint
   }
  const getTokenPrice = async() =>  {
      console.log("getting owner, please wait...");
      const result = await readContract(config, {
        abi:CONTRACT_ABI,
        address: CONTRACT_ADDRESS,
        functionName: 'getTokenPrice',
        args: [],
        chainId: sepolia.id,
      })
      return (result as bigint).toString()
    }


    const getHardCap = async() =>  {
      console.log("getting owner, please wait...");
      const result = await readContract(config, {
        abi:CONTRACT_ABI,
        address: CONTRACT_ADDRESS,
        functionName: 'getHardCap',
        args: [],
        chainId: sepolia.id,
      })
    const formatedCap = formatEther(result as bigint)
      return formatedCap
    }
    const getSoftCap = async() =>  {
      console.log("getting owner, please wait...");
      const result = await readContract(config, {
        abi:CONTRACT_ABI,
        address: CONTRACT_ADDRESS,
        functionName: 'getSoftCap',
        args: [],
        chainId: sepolia.id,
      })
      const formatedCap = formatEther(result as bigint)
      return formatedCap
    }
    const getTotalSold = async() =>  {
      console.log("getting owner, please wait...");
      const result = await readContract(config, {
        abi:CONTRACT_ABI,
        address: CONTRACT_ADDRESS,
        functionName: 'getTotalSold',
        args: [],
        chainId: sepolia.id,
      })
      const formatedCap = formatEther(result as bigint)
      return formatedCap
    }
    const getUserInfo = async() =>  {
      console.log("getting user info, please wait...");
      let  currentAccount;
      if(isConnected ){
        currentAccount = address
       
      }else {
        currentAccount = "0x0000000000000000000000000000000000000000"
        
      }
      const result = await readContract(config, {
        abi:CONTRACT_ABI,
        address: CONTRACT_ADDRESS,
        functionName: 'getUserInfo',
        args: [currentAccount],
        chainId: sepolia.id,
      })
      return result as UserInfo;
    }


  

  if (!isMounted) return null;

  return (
    <Web3Context.Provider
      value={{
        getUserInfo,
        getHardCap,
        getSoftCap,
        getTotalSold
        ,getTokenPrice, buyToken
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
