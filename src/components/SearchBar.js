import React from 'react';
import { Link } from "react-router-dom"

function SearchBar(props) {

    function handleFormSubmit(event) {
        event.preventDefault();
    }

    return (
        <div className="container">
            <form onSubmit={handleFormSubmit}>
                <div className="form-row mb-5">
                    <div className="row">
                    <div className="col-10">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Seach a movie"
                            onChange={(event) => { props.searchMovie(event) }}
                        />
                    </div>
                    <div className="col-2">
                        <Link
                            to="/React-My-movie/add"
                            type="button"
                            className="btn btn-md btn-danger"
                            style={{ float: 'right' }}>Add Movie
                        </Link>
                    </div>
                    </div>               
                </div>
            </form>
        </div>
    );
}

export default SearchBar;