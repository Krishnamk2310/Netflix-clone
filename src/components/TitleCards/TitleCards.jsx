import React, { useEffect, useRef, useState } from 'react'
import './TitleCards.css'
import { Link } from 'react-router-dom';
//import cards_data from '../../assets/cards/Cards_data.js'


const TitleCards = ({title,category}) => {

const[apiData,setApiData] = useState([]); 
const cardsRef = useRef();

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwYTJiODFmYjZiYzk5MzViYzQ2N2QxYjEwNzI3YjBjZSIsIm5iZiI6MTc1MDkzODIzOC42NjMsInN1YiI6IjY4NWQzMjdlNGQ3YWRlNjdiNzgwNTQ0YSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.aKFKPmSv8Ry2ZGbK-AgSLZue6kR9xLNGfGPmVE8DyVM'
  }
};

const handleWheel = (event)=>{
  event.preventDefault();
  cardsRef.current.scrollLeft += event.deltaY;
}

useEffect(() => {
  fetch(`https://api.themoviedb.org/3/movie/${category?category:"now_playing"}?language=en-US&page=1`, options)
  .then(res => res.json())
  .then(res => setApiData(res.results))
  .catch(err => console.error(err));
  cardsRef.current.addEventListener('wheel',handleWheel)
}, [])

  return (
    <div className='title-cards'>
      <h2>
        {title?title:"Popular on Netflix"}
      </h2>
      <div className="card-list" ref={cardsRef}>
        {apiData.map((card,index)=>{
          return <Link to={`/player/${card.id}`} className="card" key={index}>
            <img src={`https://image.tmdb.org/t/p/w500`+card.backdrop_path} alt="" />
            <p>{card.original_title}</p>
          </Link>
        })}
      </div>
      
    </div>
  )
}

export default TitleCards
