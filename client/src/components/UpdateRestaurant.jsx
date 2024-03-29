import React, { useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'
import RestrauntsFinder from '../apis/RestrauntsFinder';
import { useNavigate } from 'react-router-dom';

const UpdateRestaurant = (props) => {
    const navigate =useNavigate();
    const {id}=useParams();
    const [name,setName]=useState("");
    const [location,setLocation]=useState("");
    const [priceRange,setPriceRange]=useState("");

    useEffect(() => {
      const fetchData =async() =>{
        const response =await RestrauntsFinder.get(`/${id}`);
        // console.log(response.data.data);
        setName(response.data.data.restraunt.name);
        setLocation(response.data.data.restraunt.location);
        setPriceRange(response.data.data.restraunt.price_range);
      };
      fetchData();
    },[]);

    const handleSubmit = async(e) => {
      e.preventDefault();

      const updatedRest= await RestrauntsFinder.put(`/${id}`,{
        name,
        location,
        price_range:priceRange
      });
      navigate(`/`);
    }

    return (
      <div>
        <form action=""> 
          <div className='form-group'>
            <label htmlFor='name'>Name</label>
            <input value ={name} onChange={e=>setName(e.target.value)} id="name" className="form-control" type='text'/>
          </div>

          <div className='form-group'>
            <label htmlFor='location'>Location</label>
            <input value ={location} onChange={e=>setLocation(e.target.value)}  id="location" className="form-control" type='text'/>
          </div>

          <div className='form-group'>
            <label htmlFor='price_range'>Price Range</label>
            <input value ={priceRange} onChange={e=>setPriceRange(e.target.value)} id="price_range" className="form-control" type='number'/>
          </div>
          <button onClick={handleSubmit} className="btn btn-primary">Submit</button>
        </form>
      </div>
    );
};
export default UpdateRestaurant