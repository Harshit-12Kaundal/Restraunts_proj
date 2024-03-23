import React, { useContext,useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { RestaurantsContext } from '../context/RestaurantsContext';
import RestrauntsFinder from '../apis/RestrauntsFinder';
import StarRating from '../components/StarRating';
import Reviews from '../components/Reviews';

const RestaurantsPage = () => {
  const  {id} =useParams();
  const {selectedrestaurants,setSelectedRestaurants}=useContext(RestaurantsContext);

  useEffect(() => {
    const fetchData = async() =>{
      try {
        const response= await RestrauntsFinder.get(`/${id}`);
        setSelectedRestaurants(response.data.data.restraunt)
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  },[])

  return (
    <div>{ selectedrestaurants && (
      <>
        <div className="mt-3">
          <Reviews/>
        </div>
      </>
    )}</div>
  )
}

export default RestaurantsPage