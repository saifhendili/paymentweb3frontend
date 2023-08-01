import React, { useState, useEffect } from 'react'

import { useStateContext } from '../context'

const home = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [campaigns, setCampaigns] = useState([]);

  const {address , contract, getCampaigns ,getSubscriptions} = useStateContext();

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

    if(contract) {
      fetchCampaigns()};
  }, [ contract]);

  return isLoading?<h1>LOADING</h1>:(
    <div>

 
     
      {campaigns.map((x,i)=>{
        x.title
      })}

      ssssss
    </div>
  )
}

export default home
