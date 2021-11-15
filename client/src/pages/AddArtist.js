import React from 'react'
import {useEffect, useState} from 'react'
import axios from 'axios'
const SpotifyWebApi =  require('spotify-web-api-node')

function AddArtist() {
    const API_URL = 'http://localhost:5005';
    
    //spotify api
    const CLIENT_ID = "dca951119d9442adaff3bb0c8ba9cf43"
    const CLIENT_SECRET = "0693cad954e1458fb57095a8328420ac"

    const [token, setToken] = useState("")

    useEffect(() => {
        const serialize = function(obj) {
            var str = [];
            for (var p in obj) {
                if (obj.hasOwnProperty(p)) {
                    str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                }
            }
            return str.join("&");
        }
    
        axios
            .post('https://accounts.spotify.com/api/token',
                serialize({
                    grant_type: 'client_credentials'
                }), {
                headers: {
                    'Authorization': 'Basic ' + btoa(CLIENT_ID + ':' + CLIENT_SECRET),
                }
            })
            .then(res => setToken(res.data.access_token))
            .catch(err => {
                console.log(err);
            });
        }, [])

    const spotifApi = new SpotifyWebApi({
        clientId : CLIENT_ID, 
        clientSecret : CLIENT_SECRET
    })

    spotifApi.setAccessToken(`${token}`)




    const [searchQ, setSearchQ] = useState("")
    const [searchSucess, setSearchSucess] = useState(false)
    const [searchResults, setSearchResults] = useState([])
    const [artistSelected, setArtistSelected] = useState(false)
    const [artistSelected1, setArtistSelected1] = useState(false)
    
    //artist model
    const [longitude, setLongitude] = useState('')
    const [latitude, setLatitude] = useState('')
    const [name, setName] = useState("")
    const [discription, setDiscription] = useState("")
    const [picture, setPicture] = useState("")
    const [popularity, setPopularity] = useState(Number)
    const [spotifyLink, setSpotifyLink] = useState("")
    const [tracks, setTracks] = useState([])
    
    //tracks
    const [track1Title, setTrack1Title] = useState("")
    const [track1Url, setTrack1Url] = useState("")
    const [track1Cover, setTrack1Cover] = useState("")

    const [track2Title, setTrack2Title] = useState("")
    const [track2Url, setTrack2Url] = useState("")
    const [track2Cover, setTrack2Cover] = useState("")

    const [track3Title, setTrack3Title] = useState("")
    const [track3Url, setTrack3Url] = useState("")
    const [track3Cover, setTrack3Cover] = useState("")

    const [track4Title, setTrack4Title] = useState("")
    const [track4Url, setTrack4Url] = useState("")
    const [track4Cover, setTrack4Cover] = useState("")

    const [track5Title, setTrack5Title] = useState("")
    const [track5Url, setTrack5Url] = useState("")
    const [track5Cover, setTrack5Cover] = useState("")



    const search = () => {
        //spotify api
        spotifApi.searchArtists(searchQ)
            .then(function(data) {
                console.log(data.body.artists.items)
                setSearchResults(data.body.artists.items)
            }, function (err) {
                console.error(err)
            })

            setSearchSucess(true)  
   }
        
    
    const selectArtist = (e) => {
        var id = e.target.getAttribute("marker")
        for (let artist of searchResults){
            if(artist.id === id){
                setName(artist.name)
                setSpotifyLink(artist.external_urls.spotify)
                setPopularity(artist.popularity)
                setPicture(artist.images[0].url)
            }
        }
        
        setSearchSucess(false)
        setArtistSelected(true)

        //get top tracks 
        spotifApi.getArtistTopTracks(id, "DE")
            .then(function(data) {
                console.log(data)
                let counter = 0
                for (let i = 0; i < data.body.tracks.length; i++ ){
                    if(data.body.tracks[i].preview_url !== null && counter === 0){
                        counter++
                        setTrack1Title(data.body.tracks[i].name)
                        setTrack1Url(data.body.tracks[i].preview_url)
                        setTrack1Cover(data.body.tracks[i].album.images[0].url)

                    } else if (data.body.tracks[i].preview_url !== null && counter === 1){
                        counter++
                        setTrack2Title(data.body.tracks[i].name)
                        setTrack2Url(data.body.tracks[i].preview_url)
                        setTrack2Cover(data.body.tracks[i].album.images[0].url)

                    } else if (data.body.tracks[i].preview_url !== null && counter === 2){
                        counter++
                        setTrack3Title(data.body.tracks[i].name)
                        setTrack3Url(data.body.tracks[i].preview_url)
                        setTrack3Cover(data.body.tracks[i].album.images[0].url)

                    } else if (data.body.tracks[i].preview_url !== null && counter === 3){
                        counter++
                        setTrack4Title(data.body.tracks[i].name)
                        setTrack4Url(data.body.tracks[i].preview_url)
                        setTrack4Cover(data.body.tracks[i].album.images[0].url)

                    } else if (data.body.tracks[i].preview_url !== null && counter === 4){
                        counter++
                        setTrack5Title(data.body.tracks[i].name)
                        setTrack5Url(data.body.tracks[i].preview_url)
                        setTrack5Cover(data.body.tracks[i].album.images[0].url)
                    
                    }

                    if(counter === 5){
                        break;
                    }
                }
            })
    }

    const confirmArtist = () => {
        var topTracks = [
           
            {
                songTitle : track1Title,
                url : track1Url,
                cover : track1Cover
            },

            {
                songTitle : track2Title,
                url : track2Url,
                cover : track2Cover
            },

            {
                songTitle : track3Title,
                url : track3Url,
                cover : track3Cover
            },

            {
                songTitle : track4Title,
                url : track4Url,
                cover : track4Cover
            },

            {
               songTitle : track5Title,
                url : track5Url,
                cover : track5Cover
            },
        ]
        setTracks(topTracks)
        setArtistSelected1(true)

    }

    const addArtist = () => {

        const requestBody = {longitude, latitude, name, discription, picture, popularity, spotifyLink, tracks}
        axios.post(`${API_URL}/api/addArtist`, requestBody)
            .then(
                //reset all the input fields
            )
        
        }
    
    

    

    if(searchSucess === false && artistSelected === false){
        return (
            <div>
                <label>search spotify</label>
                <input 
                    value={searchQ}
                    onChange={e => setSearchQ(e.target.value)}>

                </input>

                <button onClick={search}>search</button>
            </div>
        )
    } 
    
    if (searchSucess === true && artistSelected === false){
        return (
            <div>
                <label>search spotify</label>
                <input 
                    value={searchQ}
                    onChange={e => setSearchQ(e.target.value)}>

                </input>

                <button onClick={search}>search</button>


                <h3>results</h3>

                {searchResults.map(artist => {
                        return (
                            <div>
                                <li onClick={selectArtist} id={artist._id} marker={artist.id} style={{listStyle : 'none'}}>
                                    {artist.name}
                                </li>                            
                            </div>
                        )
                    })}
            </div>
        )
    }

    if (artistSelected === true){
      return (
          <div>
            <h2>spotify added</h2>
            <label htmlFor="longitude">longitude of artist (13, ...)</label>
			<input
				type="text"
				name="longitude"
				value={longitude}
				onChange={e => setLongitude(e.target.value)}
			/>

            <label htmlFor="latitude">latitude of artist (52, ... )</label>
			<input
				type="text"
				name="latitude"
				value={latitude}
				onChange={e => setLatitude(e.target.value)}
			/>

            <button onClick={confirmArtist}>confirm</button>
            <button onClick={addArtist}>add artist</button>
          </div>
      )   
    }
}

export default AddArtist
