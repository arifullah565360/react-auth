import React from 'react';
import {useHistory } from 'react-router-dom';
import './Rider.css'

const Rider = (props) => {
    const { name, image } = props.rider
    const history = useHistory()


    const handelClick = (riderName) =>{
      console.log(riderName)
      history.push(`/destination/${riderName}`)
    }
    return (
      
       <div onClick={() => handelClick(name,image)} > 
       
      <div className="rider">
        <img src={image} alt=""/>
        <h2 class="text-dar">{name}</h2>
      </div>
     
      </div>
    );
};

export default Rider;