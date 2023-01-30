
import React, { useState, useEffect } from 'react';
import { searchMovie } from '../../services/apiCalls';
import './Home.css';

export const Home = () => {


    //Creo un hook para guardar el criterio de la búsqueda

    const [criterio, setCriterio] = useState('');
    const [peliculas, setPeliculas] = useState([]);

    const searchHandler = (e) => {

        setCriterio(e.target.value);

    };

    useEffect(() => {

        //Implemento el sistema de debounce allí donde voy a llamar a la función que hace la búsqueda.....

        if (criterio !== '') {

            const traer = setTimeout(() => {

                searchMovie(criterio)
                    .then(resultado => {
                        setPeliculas(resultado.data.results)

                    })
                    .catch(error => console.log(error));

            }, 500);

            return () => clearTimeout(traer);
        }


    }, [criterio]);

    return (
        <div className="showCaseDesign">
            <pre></pre>
            <input type="text" name="search" placeholder="search a movie...." onChange={(e) => searchHandler(e)} />
            
            {peliculas.length > 0 &&
            
                peliculas.map(
                    pelicula => {
                        return (
                            <div key={pelicula.id}>{pelicula.title}</div>
                        )
                    }
                )
            
            }

        </div>
    )
}