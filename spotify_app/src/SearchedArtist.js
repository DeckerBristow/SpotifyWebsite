import React from 'react'

function SearchedArtist(props) {
  return (
      <div >
    <h1>{props.name}</h1>
    <img width={"100%"} src={props.imageURL} alt =""/>
    </div>
  )
}

export default SearchedArtist