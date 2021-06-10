import React from 'react';
import './Destination.css'
import map from './image/Map.png'
import { useParams } from 'react-router';


const Destination = () => {
    const {riderName} = useParams();
    console.log(riderName)
    return (
            <div className="dstntnHeader">        
                <h1>ride with: {riderName}</h1> 
             <div className="from">
           
            <div className="input">
               <p>Pick From</p>
               
             <input className="inputDisign" type="text" name="" id=""/>
               <p>Pick To</p>
             <input className="inputDisign" type="text" name="" id=""/>
               <br/>
                <button>Search</button>
               
            </div>
            <div className="map">
                 <img src={map} alt=""/>
            </div>
        </div>
        </div>

    );
};

export default Destination;