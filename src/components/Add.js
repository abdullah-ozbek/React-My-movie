import React from 'react';
import serialize from "form-serialize"
import { useNavigate } from "react-router-dom"

function Add(props) {

    const navigate = useNavigate()

    function handleFormSubmit(e) {
        e.preventDefault();
        const newMovie =serialize(e.target, {hash:true})
        props.addMovie(newMovie)
        navigate("/React-My-movie/")
    }

    return (
        <div className="container">
            <form onSubmit={handleFormSubmit} className="mt-5">
                <input className="form-control form-zeile" id="disabledInput" type="text" placeholder="Formular zum Hinzufügen von Filmen" disabled />
                <div className="row form-zeile">
                    <div className="form-group col-md-10">
                        <label htmlFor="inputName">Name</label>
                        <input type="text"
                            className="form-control"
                            name="name" />
                    </div>
                    <div className="form-group col-md-2">
                        <label htmlFor="inputRating">Rating</label>
                        <input
                            type="text"
                            className="form-control"
                            name="rating" />
                    </div>
                </div>
                <div className="row form-zeile">
                    <div className="form-group col-md-12">
                        <label htmlFor="inputImage">Image URL</label>
                        <input
                            type="text"
                            className="form-control"
                            name="imageURL" />
                    </div>
                </div>
                <div className="row form-zeile">
                    <div className="form-group col-md-12">
                        <label htmlFor="overviewTextarea">Overview</label>
                        <textarea
                            className="form-control"
                            name="overview" rows="5"></textarea>
                    </div>
                </div>
                <div className="row form-zeile">
                    <div className="col-md-12 ">
                        <input type="submit" className="btn btn-danger btn-block" value="Add Movie" />
                    </div>
                </div>       
            </form>
        </div>
    );
}

export default Add;