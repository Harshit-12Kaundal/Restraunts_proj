import React from 'react'

// eslint-disable-next-line import/no-anonymous-default-export
export default function ({rating}) {

    const stars =[];    
    for(let i=1 ;i<=5;i++){
        if(i<=rating){
            stars.push(<i class="fa-solid fa-star"></i>)
        }
        else{
            stars.push(<i class="fa-regular fa-star"></i>)
        }
    }

    return (
        <>
            {stars}
        </>
  )
}
