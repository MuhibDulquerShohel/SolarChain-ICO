// import tAbi from "../context/tAbi.json";
import abi from "../context/tAbi.json";
export const wagmiContractConfig = {
    // address: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
    address: '0x6032F320905C0fDdE50A2D13e4Daf3DD0600b2Ea',
    // address: '0xE6dAEE6c1716091F41158b58F1e68401eb43A69c',
    // abi: [
    //   {
    //     type: 'function',
    //     name: 'balanceOf',
    //     stateMutability: 'view',
    //     inputs: [{ name: 'account', type: 'address' }],
    //     outputs: [{ type: 'uint256' }],
    //   },
    //   {
    //     type: 'function',
    //     name: 'totalSupply',
    //     stateMutability: 'view',
    //     inputs: [],
    //     outputs: [{ name: 'supply', type: 'uint256' }],
    //   },
    // ],
    // abi: tAbi,
    abi: abi,
    
  } as const