import React, { useContext,useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { RestaurantsContext } from '../context/RestaurantsContext';
import RestrauntsFinder from '../apis/RestrauntsFinder';
// import StarRating from '../components/StarRating';
import Reviews from '../components/Reviews';
import AddReview from '../components/AddReview';

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
        <div className="mt-3">
          <Reviews reviews={selectedrestaurants.reviews}/>
        </div>
        <AddReview/>
      </>
    )}</div>
  )
}

export default RestaurantsPage