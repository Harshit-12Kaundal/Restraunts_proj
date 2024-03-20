import React, { useContext,useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { RestaurantsContext } from '../context/RestaurantsContext';
import RestrauntsFinder from '../apis/RestrauntsFinder';

const RestaurantsPage = () => {
  const  {id} =useParams();
  console.log(id);
  const {selectedrestaurants,setSelectedRestaurants}=useContext(RestaurantsContext);

  useEffect(() => {
    const fetchData = async() =>{
      try {
        const response= await RestrauntsFinder.get(`/${id}`);
        console.log(response);
      } catch (error) {
        
      }
      // setSelectedRestaurants(response.data.data);
    }
    fetchData();
  },[])

  return (
    <div>RestaurantsPage</div>
  )
}

export default RestaurantsPage