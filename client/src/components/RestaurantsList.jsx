import React ,{useContext, useEffect}from 'react'
import RestrauntsFinder from '../apis/RestrauntsFinder';
import { RestaurantsContext } from '../context/RestaurantsContext';
import { useNavigate } from "react-router-dom";
const RestaurantsList = (props) => {
    const {restaurants, setRestaurants}=useContext(RestaurantsContext);
    let navigate = useNavigate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect( ()=>{
        const fetchdata= async () => {
            try {
                const response = await RestrauntsFinder.get("/");
                setRestaurants(response.data.data.restraunt);
            } catch (error) {
                console.log(error);
            }
        };
        fetchdata()
    },[]);

    const handleDelete =async(e,id) =>{
        e.stopPropagation();
        try {
            const response = await RestrauntsFinder.delete(`/${id}`)
            setRestaurants(restaurants.filter(restaurant =>{
                return restaurant.id !== id;
            }))
            // console.log(response);
        } catch (error) {
            console.log(error);
        }
    }

    const handleUpdate= (e,id) =>{
        e.stopPropagation();
        navigate(`/restaurants/${id}/update`)
    }

    const handleRest= (id) =>{
        navigate(`/restaurants/${id}`);
    }
  return (
    <div className='list-group'>
        <table className="table table-hover table-dark">
            <thead>
                <tr className='bg-primary'>
                    <th scope="col">Restaurants</th>
                    <th scope="col">Location</th>
                    <th scope="col">Price Range</th>
                    <th scope="col">Ratings</th>
                    <th scope="col">Edit</th>
                    <th scope="col">Delete</th>
                </tr>
            </thead>
            <tbody>
                {restaurants && restaurants.map((restaurant) =>{
                    return(
                    <tr onClick={()=>handleRest(restaurant.id)} key={restaurant.id}>
                        <td>{restaurant.name}</td>
                        <td>{restaurant.location}</td>
                        <td>{"$".repeat(restaurant.price_range)}</td>
                        <td>reviews</td>
                        <td><button onClick={(e) =>handleUpdate(e,restaurant.id)} className="btn btn-warning">Update</button></td>
                        <td><button onClick={(e) =>handleDelete(e,restaurant.id)} className="btn btn-danger">Delete</button></td>
                    </tr>
                    )
                })}
            </tbody>
        </table>
    </div>
  )
}

export default RestaurantsList