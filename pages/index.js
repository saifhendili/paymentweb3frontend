import { ConnectWallet } from "@thirdweb-dev/react";
import styles from "../styles/Home.module.css";
import Image from "next/image";
import React, { useState, useEffect } from 'react'
import { useAddress,useContract,useContractRead,Web3Button} from '@thirdweb-dev/react';

import { useStateContext } from '../context'

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [campaigns, setCampaigns] = useState([]);
  const address = useAddress();
  const [input, setInput] = useState("");
  // const { data: subscriptions } = useContractRead(
  //   contract,
  //   "getSubscriptions"
  // );
  const { contract, getCampaigns ,getSubscriptions} = useStateContext();

  const fetchCampaigns = async () => {
    setIsLoading(true);
    console.log('fffff111')

    const data = await getSubscriptions();
    console.log('fffff111222')

    console.log('fffff'+JSON.stringify(data))
    setCampaigns(data);
    console.log('fffff111222')
    setIsLoading(false);
  }

  useEffect(() => {
    console.log('fffff111address'+address)
    console.log('fffff111acontract'+contract)
    if(contract) {
      fetchCampaigns()};
  }, [ contract,address]);

  return (
<div>

    <ConnectWallet  />
</div>
  );
}
