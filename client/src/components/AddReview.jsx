import React from 'react'

const AddReview = () => {
  return (
    <div className='mb-2'>
        <form action=''>
            <div className='form-row'>
                <div className='form-group col-8'>
                    <label htmlFor='name'>Name</label>
                    <input type='text' id='name' placeholder="name" required className='form-control'/>
                </div>
                <div className="form-group col-4">
                    <label htmlFor='rating'>Rating</label>
                    <select id='rating' placeholder="rating" required className="custom-select">
                    </select>
                </div>
            </div>
        </form>

    </div>
  )
}

export default AddReview