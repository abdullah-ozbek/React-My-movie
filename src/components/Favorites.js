import React from "react";
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

function Favorites(props) {

  
  function truncate(text, maxLength) {
    if (!text) return null;
    else if (text.length < maxLength) {
      return text;
    } else {
      return `${text.substring(0, maxLength)}...`;
    }
  }

  return (
    <div className="container">
      <div className="row">
        {props.liste.map((movie) => {
            return (
              <div key={movie.id} className="col-lg-4">
                <div className="card mb-4 shadow-sm">
                  <img
                    src={movie.imageURL}
                    className="card-img-top"
                    alt="Sample Movie"
                  />
                  <div className="card-body">
                    <h5 className="card-title">{movie.name}</h5>
                    <p className="card-text">{truncate(movie.overview, 120)}</p>
                    <div className="d-flex justify-content-between align-items-center">
                      

                      <OverlayTrigger overlay={
                              <Tooltip id='tooltip-top'>
                                  Remove from Favorites
                              </Tooltip>
                            }>   
                          <button onClick={()=>{props.deleteFromFavorites(movie.id)}} className="btn btn-md btn-outline-danger">
                              Favoriten
                          </button>
                      </OverlayTrigger>
                      
                      <h2>
                        <span className="badge btn-info">{movie.rating}</span>
                      </h2>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default Favorites;
