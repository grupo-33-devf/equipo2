import React from 'react';

const EncuestaCard = ({ header, title, description }) => {
    return (
        <div className="card text-bg-light mb-3" style={{ maxWidth: "18rem" }}>
            <div className="card-header">{header}</div>
            <div className="card-body">
                <h5 className="card-title">{title}</h5>
                <p className="card-text">{description}</p>
            </div>
        </div>
    );
};

export default EncuestaCard;
