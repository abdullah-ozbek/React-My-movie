import React from 'react';
import { Link } from "react-router-dom"
import { Alert, OverlayTrigger, Tooltip } from 'react-bootstrap';

function Movielist(props) {


    function isSelectedFavorite(product){
       let selected = props.myFavorites.filter((favori)=>{
           return favori.id === product.id
        })
        return selected
    }



    function truncate(text, maxLength){
        if(!text) return null
        else if(text.length < maxLength){
            return text
        }else{
            return `${text.substring(0, maxLength)}...`
        }
    }

    return (
        <div className="container">
            <div className="row"> 
            <Alert show={props.showAlert} variant="success"> Ihre Filmliste wurde aktualisiert</Alert>
            </div>
            <div className="row">
                {
                    props.movies.sort((a,b) =>{
                          return a.id < b.id ? 1 : a.id > b.id ? -1 : 0
                         }).map((movie) => {
                             let a = 0
                        return (
                            <div key={movie.id} className="col-lg-4">
                                <div className="card mb-4 shadow-sm">
                                    <img src={movie.imageURL} className="card-img-top" alt="Sample Movie" />
                                    <div className="card-body">
                                        <h5 className="card-title">{movie.name}</h5>
                                        <p className="card-text">{truncate(movie.overview, 120)}</p>
                                        <div className="d-flex justify-content-between align-items-center">
                                            {props.loginStatus &&
                                            <>
                                                <OverlayTrigger 
                                                    overlay={
                                                        <Tooltip id='tooltip-top'>
                                                            Add to Favorites
                                                        </Tooltip>
                                                    }>                               
                                                <button onClick={()=>{props.addToFavorites(movie)}}
                                                        className={isSelectedFavorite(movie).length >0 ? "btn btn-md btn-danger" : "btn btn-md btn-outline-danger"}>Favoriten
                                                    </button>
                                                </OverlayTrigger>

                                                <OverlayTrigger 
                                                    overlay={
                                                        <Tooltip id='tooltip-top'>
                                                            Delete Movie
                                                        </Tooltip>
                                                    }>   
                                                    <button onClick={()=>{props.deleteMovie(movie.id)}} type="button" 
                                                        className="btn btn-md btn-outline-danger">Delete
                                                    </button>
                                                </OverlayTrigger>

                                                <OverlayTrigger 
                                                    overlay={
                                                        <Tooltip id='tooltip-top'>
                                                            Edit Movie
                                                        </Tooltip>
                                                    }>   
                                                <Link type="button"
                                                        className="btn btn-md btn-outline-primary"
                                                        to={`/edit/${movie.id}`}
                                                        >Edit 
                                                    </Link>
                                                </OverlayTrigger> 
                                            </>
                                            }
    
                                            <h2><span className="badge btn-info">{movie.rating}</span></h2>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )

                    })
                }

            </div>
        </div>
    );
}

export default Movielist;