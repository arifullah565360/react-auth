import React from 'react';
import { useEffect, useState } from 'react';
import RidersData from '../../ridersData/ridersData.json'
import Rider from '../Rider/Rider';
import './Home.css'
const Home = () => {

   
   const [riders, setRiders] = useState([])
    useEffect(()=>{
        setRiders(RidersData) 
      },[])
      console.log(riders)



     return (
        <div className="home" >
            {
                riders.map(rider => <Rider rider={rider}></Rider>)
            }               
           
            
            
        </div>
    );
};

export default Home;