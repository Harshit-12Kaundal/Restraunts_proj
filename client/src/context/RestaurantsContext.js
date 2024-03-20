import React , {useState ,createContext} from "react";

export const RestaurantsContext=createContext();

export const RestaurantsContextProvider = props =>{ 
    const [restaurants ,setRestaurants]=useState([]);
    const [selectedrestaurants ,setSelectedRestaurants]=useState([]);

    const addRestaurants = (restaurant) =>{
        setRestaurants([...restaurants,restaurant]);
    };

    return(
        <RestaurantsContext.Provider 
            value={{
            restaurants, 
            setRestaurants ,
            addRestaurants,
            selectedrestaurants,
            setSelectedRestaurants
            }}
        >
            {props.children}
        </RestaurantsContext.Provider>
    );
};