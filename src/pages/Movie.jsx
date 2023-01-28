import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import Moviecard from "../components/Moviecard"

import {
BsWallet2,
BsGraphUp,
BsHourglassSplit,
BsFillFileEarmarkTextFill
} from 'react-icons/bs'

import './Movies.css'

const moviesURL = import.meta.env.VITE_API
const apiKey = import.meta.env.VITE_API_KEY


const Movie = () => {
  const {id} = useParams()
  const [movie, setMovie] = useState(null)

  const getMovie = async (url) => {
    const res = await fetch(url)
    const data = await res.json()

    setMovie(data)
  }

  const formatCurrency = (number) => {
    return number.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });
    
  }

  useEffect(() => {
    const movieUrl = `${moviesURL}${id}?${apiKey}`
    getMovie(movieUrl)
  }, [])

  return (
    <div className="movie-page">
      {movie && (
        <>
          <Moviecard movie={movie} showLink={false} />
          <p className="tagline">{movie.tagline}</p>
          <div className="info">
            <h3><BsWallet2 />Orcamento:</h3>
            <p>{formatCurrency(movie.budget)}</p>
          </div>
          <div className="info">
            <h3><BsGraphUp />Receita:</h3>
            <p>{formatCurrency(movie.revenue)}</p>
          </div>
          <div className="info">
            <h3><BsHourglassSplit />Duracao:</h3>
            <p>{movie.runtime} minutos</p>
          </div>
          <div className="info description">
            <h3><BsFillFileEarmarkTextFill />Descricao:</h3>
            <p>{movie.overview}</p>
          </div>
        </>
      )}
    </div>
  )
}

export default Movie
