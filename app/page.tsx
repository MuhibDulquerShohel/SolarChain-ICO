"use client";


import { useEffect, useState } from "react";
import { useWeb3Context, UserInfo } from "@/context/contextProvider";
import { formatEther } from "viem";


export default function Home() {
  const [percentage, setPercentage] = useState<number>(0)
  const [hardCap, setHardCap] = useState<string>("")
  const [softCap, setSoftCap] = useState<string>("")
  const [totalSold, setTotalSold] = useState<string>("")
  const [currentPrice, setCurrentPrice] = useState<string>("")
  const [amountToBuy, setAmountToBuy] = useState<number>(0)
  const [outputAmount, setOutputAmount] = useState<number>()
  const [userInfo, setUserInfo] = useState<UserInfo>({
    amountPaid: 0n,
    remainToClaim: 0n,
    tokensClaimed: 0n,
    tokensPurchased: 0n,
    user: "0x0000000000000000000000000000000000000000",
  });
  
  const { getHardCap, getSoftCap, getTotalSold, buyToken, getTokenPrice, getUserInfo } = useWeb3Context();
  



  

  useEffect(() => {
    const getInfo = async () => {
      // const owner  = await getOwner();
      const hard = await getHardCap();
      const soft = await getSoftCap();
      const sold = await getTotalSold();
      const cPrice = await getTokenPrice();
      const info = await getUserInfo();
      setUserInfo(info);
      setHardCap(hard?.toString());
      
      setSoftCap(soft?.toString());
      
      setTotalSold(sold?.toString());
      setCurrentPrice(cPrice?.toString());
      
    };
    getInfo();

    
  });

  // Retry fetch if userInfo is empty
useEffect(() => {
  const shouldRetry =
    !userInfo ||
    (typeof userInfo === "object" && Object.keys(userInfo).length === 0);

  if (shouldRetry) {
    const timeout = setTimeout(async () => {
      const retryInfo = await getUserInfo();
      setUserInfo(retryInfo);
    }, 5000); // retry after 5 seconds

    return () => clearTimeout(timeout); // cleanup
  }
}, [getUserInfo, userInfo]);

  useEffect(() => {
     const sellsPercentage = async () => {
    const totalSoldNumber = Number(totalSold) ;
    const hardCapNumber = Number(hardCap);

    const progress =
        hardCapNumber > 0 ? Math.floor((totalSoldNumber / hardCapNumber) * 100) : 0;

        return progress;
   }
    const calculatePercentage = async () => {
      const progress = await sellsPercentage();
      setPercentage(progress);
    };
    calculatePercentage();
  }, [totalSold, hardCap]);

  return (
    
    <div className="hero bg-base-200 min-h-screen flex w-full items-center justify-between">
      
      <div className="flex flex-col gap-3 ml-5 max-w-1/4">
        <div className="card min-w-full bg-base-100 card-xs shadow-sm flex flex-col justify-center items-center">
          <div className="card-body">
            <h2 className="card-title items-center justify-center">Hard Cap: {(Number(hardCap)  / 1e9).toLocaleString(undefined, {
    maximumFractionDigits: 0,
  })} Billion </h2>
            <h2 className="card-title items-center justify-center">Soft Cap: {(Number(softCap)  / 1e9).toLocaleString(undefined, {
    maximumFractionDigits: 0,
  })} Billion </h2>
            <h2 className="card-title items-center justify-center">Total Sold: {(Number(totalSold)  / 1e9).toLocaleString(undefined, {
    maximumFractionDigits: 0,
  })} Billion</h2>
            
            <div className="justify-center items-center card-actions">
            <div className="radial-progress" style={{ "--value": "42"}  as React.CSSProperties  } 
  aria-valuenow={percentage} role="progressbar"><div className="flex justify-center items-center">{percentage}%</div></div>
          </div>
        </div>
      </div>
      </div>
        <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="text-5xl font-bold">Buy Tokens</h1>
            <div className="flex flex-col gap-3 mt-0.5 justify-center items-center">
              <fieldset className="fieldset">
          
                <input type="number" className="input" placeholder="USDT Amount" 
  //               onChange={(e) => {
  //   const value = parseFloat(e.target.value);
  //   setAmountToBuy(isNaN(value) ? Number(0) : value);
  //   setOutputAmount(value * (Number (currentPrice)));
  // }}
  onChange={(e) => {
    const value = parseFloat(e.target.value);
    if (isNaN(value)) {
      setAmountToBuy(Number(0));
      setOutputAmount(Number(0));
    } else {
      setAmountToBuy(Number(value));
      setOutputAmount(value * Number(currentPrice));
    }
  }}
   />
                
              </fieldset>
              <fieldset className="fieldset">
                
                {/* <input type="text" className="input"   placeholder={outputAmount?.toString() && outputAmount.toString() != "" ? outputAmount : "SCC You will get"} /> */}
                <input
  type="text"
  className="input"
  value={outputAmount !== undefined ? outputAmount.toFixed(0) : ""}
  placeholder="SCC You will get"
  readOnly
/>
                
              </fieldset>
            </div>
      <button className="btn btn-primary"  onClick={()=> buyToken(amountToBuy)}>Buy</button>
    </div>
  </div>
  <div className="flex flex-col gap-3 mr-5 max-w-1/4">
        <div className="card min-w-full bg-base-100 card-xs shadow-sm flex flex-col justify-center items-center">
          <div className="card-body">
            <h2 className="card-title items-center justify-center">Current Token Price: {currentPrice ? 1 / Number(currentPrice): ""} </h2>
            <h2 className="card-title items-center justify-center">Purchased Amount: {userInfo ? formatEther(userInfo.tokensPurchased) : "0"}</h2>
            <h2 className="card-title items-center justify-center">Paid USDT: {userInfo ? formatEther(userInfo.amountPaid) : "0"}</h2>
            <h2 className="card-title items-center justify-center">Claimed Amount: {userInfo ? formatEther(userInfo.tokensClaimed) : "0"}</h2>
            <h2 className="card-title items-center justify-center">Remain to claim: {userInfo ? formatEther(userInfo.remainToClaim) : "0"}</h2>
            
            
        </div>
      </div>
      </div>
</div>
    
  );
}
