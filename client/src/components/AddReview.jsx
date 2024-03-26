import React, { useState } from 'react'

const AddReview = () => {
    const [name,setName]=useState("");
    const [reviewTest,setReviewTest]=useState("");
    const [rating,setRating]=useState("Rating");

  return (
    <div className='mb-2'>
        <form action=''>
            <div className='form-row'>
                <div className='form-group col-8'>
                    <label htmlFor='name'>Name</label>
                    <input value={name} onChange={(e)=> setName(e.target.value)} type='text' id='name' placeholder="name" required className='form-control'/>
                </div>
                <div className="form-group col-4">
                    <label htmlFor='rating'>Rating</label>
                    <select value={rating} onChange={(e)=> setRating(e.target.value)} id='rating' placeholder="rating" required className="custom-select">
                        <option disabled>Rating</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                    </select>
                </div>
            </div>
            <div className="form-group">
                <label htmlFor='Review'>Review</label>
                <textarea value={reviewTest} onChange={(e)=> setReviewTest(e.target.value)} id="Review" className='form-control'></textarea>
            </div>
            <button className="btn btn-primary">submit</button>
        </form>

    </div>
  )
}

export default AddReview