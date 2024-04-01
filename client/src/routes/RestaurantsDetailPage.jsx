import React, { useContext,useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { RestaurantsContext } from '../context/RestaurantsContext';
import RestrauntsFinder from '../apis/RestrauntsFinder';
// import StarRating from '../components/StarRating';
import Reviews from '../components/Reviews';
import AddReview from '../components/AddReview';
import StarRating from '../components/StarRating';

const RestaurantsPage = () => {
  const  {id} =useParams();
  const {selectedrestaurants,setSelectedRestaurants}=useContext(RestaurantsContext);

  useEffect(() => {
    const fetchData = async() =>{
      try {
        const response= await RestrauntsFinder.get(`/${id}`);
        setSelectedRestaurants(response.data.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  },[])

  return (
    <div>
      { selectedrestaurants && (
      <>
      <h1 className='text-center display-1'>{selectedrestaurants.restraunt.name}</h1>
      <div className="text-center">
        <StarRating rating={selectedrestaurants.restraunt.average_rating}/>
          <span className='text-warning ml-1'>
            {selectedrestaurants.restraunt.count ? `(${selectedrestaurants.restraunt.count})`:"(0)"}
          </span>
      </div>
        <div className="mt-3">
          <Reviews reviews={selectedrestaurants.reviews}/>
        </div>
        <AddReview/>
      </>
    )}</div>
  )
}

export default RestaurantsPage