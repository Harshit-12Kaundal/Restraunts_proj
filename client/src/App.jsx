import React from 'react'
import {BrowserRouter as Router , Routes ,Route} from 'react-router-dom';
import Home from './routes/Home';
import UpdatePage from './routes/UpdatePage';
import RestaurantsDetailPage from './routes/RestaurantsDetailPage';
import { RestaurantsContextProvider } from './context/RestaurantsContext';


const App =( )=>{
    return (
    <RestaurantsContextProvider>
        <div className='container'>
            <Router>
                <Routes>
                    <Route exact path="/" element={<Home/>} />
                    <Route exact path="/restaurants/:id/update" element={<UpdatePage/>} />
                    <Route exact path="/restaurants/:id" element={<RestaurantsDetailPage/>} />
                </Routes>
            </Router>
        </div>
    </RestaurantsContextProvider>
)}

export default  App;