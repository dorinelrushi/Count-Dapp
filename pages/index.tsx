import { ConnectWallet, Web3Button, useAddress, useContract, useContractRead } from "@thirdweb-dev/react";
import { NextPage } from "next";
import { CONTRACT_ADDRESS } from "../contracts/adresses";

const Home: NextPage = () => {

  const address = useAddress();

  const {contract} = useContract(CONTRACT_ADDRESS);

  const {data:counter,isLoading:isCounterLoading} = useContractRead(contract,'getCounter');

  const {data : owner } = useContractRead(contract,'owner')

  return (
    <main >
      <div>
       <ConnectWallet />
       <h2>Counter Dapp</h2>
       {isCounterLoading ? (
        <p style={{fontSize:"50px",color:"white"}}>0</p>
       ) : (
        <p style={{fontSize:"50px",color:"white"}}>{counter.toNumber()}</p>
       ) }
       {address && (
        <div>
          <Web3Button className='btn' contractAddress={CONTRACT_ADDRESS} action={(contract) => contract.call('decrement')} onError={(error)=>alert(error)}>-</Web3Button>
           <Web3Button className='btn' contractAddress={CONTRACT_ADDRESS} action={(contract) => contract.call('increment')} onSuccess={() => alert("Counter Incremented")}>+</Web3Button>
        </div>
       )}
       {address == owner ? (
            <Web3Button className='btn' contractAddress={CONTRACT_ADDRESS} action={(contract) => contract.call('reset')}>Reset</Web3Button>
       ) : address ?  (
                <p>You are the ower of this contract</p>
       ) : (
        <p>Connect your wallet to interact with the counter!</p>
       ) }
      </div>
    </main>
  );
};

export default Home;
