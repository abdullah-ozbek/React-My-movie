import React, { useEffect, useState } from 'react';
//import serialize from "form-serialize"
import { useNavigate, useParams} from "react-router-dom"
import axios from "axios"
import { BASE_URL } from "../assets/baseUrl"

function Edit(props) {

    const params = useParams()
    const navigate = useNavigate()

    const [movie, setMovie]  = useState({
        name: "",
        rating: "",
        imageURL: "",
        overview: ""
    })

    function updateMovie(event){
        setMovie((currentState)=>{
            return{
                ...currentState,
                [event.target.name] : event.target.value
            }
        })
    }


    useEffect(()=>{
        axios.get(BASE_URL +`/movies/${params.id}`)
            .then((response)=>{
                setMovie({
                    name: response.data.name,
                    rating: response.data.rating,
                    imageURL: response.data.imageURL,
                    overview: response.data.overview
                })
            })
    }, [])


    function handleFormSubmit(e) {
        e.preventDefault();
        props.editMovie(params.id, movie)
        navigate("/React-My-movie/")
    }
  
    return (
        <div className="container">
            <form onSubmit={handleFormSubmit} className="mt-5">
                <input className="form-control form-zeile" id="disabledInput" type="text" placeholder="Film-Update-Formular" disabled />
                <div className="row form-zeile">
                    <div className="form-group col-md-10">
                        <label htmlFor="inputName">Name</label>
                        <input type="text"
                            className="form-control"
                            name="name"
                            value={movie.name} 
                            onChange={(event)=>{updateMovie(event)}}/>
                    </div>
                    <div className="form-group col-md-2">
                        <label htmlFor="inputRating">Rating</label>
                        <input
                            type="text"
                            className="form-control"
                            name="rating"
                            value={movie.rating}
                            onChange={(event)=>{updateMovie(event)}} />
                    </div>
                </div>
                <div className="row form-zeile">
                    <div className="form-group col-md-12">
                        <label htmlFor="inputImage">Image URL</label>
                        <input
                            type="text"
                            className="form-control"
                            name="imageURL" 
                            value={movie.imageURL}
                            onChange={(event)=>{updateMovie(event)}}/>
                    </div>
                </div>
                <div className="row form-zeile">
                    <div className="form-group col-md-12">
                        <label htmlFor="overviewTextarea">Overview</label>
                        <textarea
                            className="form-control"
                            name="overview" rows="5"
                            value={movie.overview}
                            onChange={(event)=>{updateMovie(event)}}
                        ></textarea>
                    </div>
                </div>
                <div className="row form-zeile">
                    <div className="col-md-12 ">
                        <input type="submit" className="btn btn-danger btn-block" value="Edit Movie" />
                    </div>
                </div>       
            </form>
        </div>
    );
}

export default Edit;