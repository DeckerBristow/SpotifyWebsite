import logo from './logo.svg';
import './App.css';
import React, { useEffect, useState } from "react";
import axios from 'axios';
import SearchedArtist from './SearchedArtist';


function App() {
  const CLIENT_ID = "3922f0941c4145069217f4f4122b8347"
  const REDIRECT_URI = "http://localhost:3000"
  const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize"
  const RESPONSE_TYPE = "token"

  const [token, setToken] = useState("")
  const [searchKey, setSearchKey] = useState("")
  const [artists, setArtists] = useState([])
  useEffect(() => {
    const hash = window.location.hash
    let token = window.localStorage.getItem("token")

    if (!token && hash) {
        token = hash.substring(1).split("&").find(elem => elem.startsWith("access_token")).split("=")[1]

        window.location.hash = ""
        window.localStorage.setItem("token", token)
    }

    setToken(token)

}, [])

const logout = () => {
  setToken("")
  window.localStorage.removeItem("token")
}

const searchArtists = async (e) => {
  e.preventDefault()
  const {data} = await axios.get("https://api.spotify.com/v1/search", {
      headers: {
          Authorization: `Bearer ${token}`
      },
      params: {
          q: searchKey,
          type: "artist"
      }
  })

  setArtists(data.artists.items)
}
const renderArtists = () =>{
return artists.map(artist => (
  <div key={artist.id}>
    {artist.images.length ? 
      <SearchedArtist onClick={console.log("Clicked " + artist.name)} name={artist.name} imageURL={artist.images[0].url}/>
    : <p>No Images</p>}
        {/* {artist.name}

    {artist.images.length ? <img width={"100%"} src={artist.images[0].url} alt =""/> :
    <p>No Image</p>} */}
  </div>
))
}
  return (
    <div className="App">
      <header className='App-header'>
        <h1>Spotify React</h1>
        {!token ?
          <a href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}>Login
            to Spotify</a>
          : <button onClick={logout}>Logout</button>}

          {token ?
          <form onSubmit={searchArtists}>
            <input type="text" onChange={e => setSearchKey(e.target.value) }/>
            <button type={"submit"}>Search</button>
          </form>
        : <h2>Please Login</h2>  
        }
        {renderArtists()}
      </header>
    </div>
  );
}

export default App;
