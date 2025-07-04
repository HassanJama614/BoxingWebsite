// client/src/components/ClassCard.js
import React from 'react';
import { useNavigate } from 'react-router-dom'; 
import './ClassCard.css';

const ClassCard = ({ classItem }) => {
    const { _id, name, description, price, imageUrl, instructor } = classItem;
    const navigate = useNavigate(); 

    const handleBookNow = () => {
       
        navigate(`/checkout/${_id}`);
    };

    const imageSrc = imageUrl.startsWith('http') ? imageUrl : `/${imageUrl}`;

    return (
        <div className="class-card">
            <img src={imageSrc} alt={name} className="class-card-image" onError={(e) => e.target.src = '/images/default-class.jpg'} />
            <div className="class-card-content">
                <h3>{name}</h3>
                <p className="class-description">{description.substring(0,100)}...</p>
                <p><strong>Instructor:</strong> {instructor}</p>
                <p className="class-price">Price: KES {price}</p> {}
                {}
                <button className="book-button" onClick={handleBookNow}>Book Now</button>
            </div>
        </div>
    );
};

export default ClassCard;