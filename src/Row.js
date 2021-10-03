import React, { useState, useEffect } from 'react';
import axios from './axios';

const base_url = "https://image.tmdb.org/t/p/original/";

function Row({ title, fetchUrl, isLargeRow }) {
    const [movies, setMovies] = useState([]);

    // A snippet of code which runs based on a specific condition/variable, feeds the site the information it needs
    useEffect(() => {
        // if [], run once when the row loads, and dont run again
        async function fetchData() {
            const request = await axios.get(fetchUrl);
            setMovies(request.data.results);
            return request;
        }
        fetchData();
    },  [fetchUrl]); 

    console.table(movies);

    return (
        <div className="row">
            <h2>{title}</h2>

            <div className="row__posters">
            {/* several row_posters */}
                {movies.map((movie) => (
                // "/afaljkLlWEkkfslfsjlsgfslgsfig.jpg"
                <img 
                    key={movie.id}
                    className={`row__poster ${isLargeRow && "row__posterLarge"}`}
                    src={`${base_url}${
                    isLargeRow ? movie.poster_path : movie.backdrop_path
                    }`} 
                    alt={movie.name}
                />
            ))}
            </div>
        </div>
    );
}


export default Row;
