import React, { useContext, createContext,useEffect } from 'react';

import { useAddress, useContract, useMetamask, useContractWrite } from '@thirdweb-dev/react';
import { ethers } from 'ethers';

const StateContext = createContext();

export const StateContextProvider = ({ children }) => {
  const { contract } = useContract('0x7fdc83669D53C5f442d901B57D4A9E5f06296D25');
  const { mutateAsync: createSubscription } = useContractWrite(contract, 'createSubscription');
  const address = useAddress();
  const connect = useMetamask();
  useEffect(()=>{
    console.log('fffffffff1'+contract)
    console.log('fffffffff1address'+address)
  },[contract])
const publishCampaign = async (form) => {
  try {
    const data = await createCampaign({
      args: [
        address, // owner
        form.title, // title
        form.description, // description
        form.target,
        new Date(form.deadline).getTime(), // deadline,
        form.image,
      ],
    });

    console.log("contract call success", data)
  } catch (error) {
    console.log("contract call failure", error)
  }
}
const getCampaigns = async () => {
  const campaigns = await contract.call('getCampaigns');

  const parsedCampaings = campaigns.map((campaign, i) => ({
    owner: campaign.owner,
    title: campaign.title,
    description: campaign.description,
    target: ethers.utils.formatEther(campaign.target.toString()),
    deadline: campaign.deadline.toNumber(),
    amountCollected: ethers.utils.formatEther(campaign.amountCollected.toString()),
    image: campaign.image,
    pId: i
  }));

  return parsedCampaings;
}

const getUserCampaigns = async () => {
  const allCampaigns = await getCampaigns();

  const filteredCampaigns = allCampaigns.filter((campaign) => campaign.owner === address);

  return filteredCampaigns;
}
const donate = async (pId, amount) => {
  const data = await contract.call('donateToCampaign', [pId], { value: ethers.utils.parseEther(amount)});

  return data;
}
const getDonations = async (pId) => {
  const donations = await contract.call('getDonators', [pId]);
  const numberOfDonations = donations[0].length;

  const parsedDonations = [];

  for(let i = 0; i < numberOfDonations; i++) {
    parsedDonations.push({
      donator: donations[0][i],
      donation: ethers.utils.formatEther(donations[1][i].toString())
    })
  }

  return parsedDonations;
}


  const publishSubscription = async (form) => {
    try {
      const data = await createSubscription({
				args: [
					address, // owner
					form.Price, // title
					form._title, // description
				],
			});
      console.log("contract call success", data)
    } catch (error) {
      console.log("contract call failure", error)
    }
  }

  const getSubscriptions = async () => {
    const subscriptions = await contract.call('getSubscriptions');
    const parsedCampaings = subscriptions.map((subscription, i) => ({
      owner: subscription.owner,
      title: subscription.title,
      target: ethers.utils.formatEther(subscription.target.toString()),
      pId: i
    }));
    return parsedCampaings;
  }

  // const getUserCampaigns = async () => {
  //   const allCampaigns = await getCampaigns();
  //   const filteredCampaigns = allCampaigns.filter((campaign) => campaign.owner === address);
  //   return filteredCampaigns;
  // }

  const PlaceOrder = async (pId, amount) => {
console.log('11111111tet0000'+pId+'eeeeee'+amount)

    const data = await contract.call('PlaceSubcription', [pId],  { value: ethers.utils.parseEther(amount)});
console.log('11111111tet')
    return data;
  }

  // const getDonations = async (pId) => {
  //   const donations = await contract.call('getDonators', [pId]);
  //   const numberOfDonations = donations[0].length;

  //   const parsedDonations = [];

  //   for(let i = 0; i < numberOfDonations; i++) {
  //     parsedDonations.push({
  //       donator: donations[0][i],
  //       donation: ethers.utils.formatEther(donations[1][i].toString())
  //     })
  //   }

  //   return parsedDonations;
  // }


  return (
    <StateContext.Provider
      value={{ 
        address,
        contract,
        connect,
        createCampaign: publishCampaign,
        getCampaigns,
        getUserCampaigns,
        getSubscriptions,
        donate,
        getDonations,
        PlaceOrder
      }}
    >
      {children}
    </StateContext.Provider>
  )
}

export const useStateContext = () => useContext(StateContext);