import React from "react";
import { useState } from "react";
import '../css/card.css';
const Card = ({ name }) => {

  const [isFlipped, setIsFlipped] = useState(false);
  const [toShowPage, setToShowPage] = useState(false)
  const imageUrl = new URL(`../assets/images/${name}.jpg`, import.meta.url).href;

  const myStyle = {
    backgroundImage: `url(${imageUrl})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
  };

  const showInfo = () => {
    
  }



  return (
    <>
      <div className="card-container" style={myStyle} onClick={() => setToShowPage(true)}>
        <h5 className="name">{name}</h5>
      </div>
    </>
  );
}


export default Card;
