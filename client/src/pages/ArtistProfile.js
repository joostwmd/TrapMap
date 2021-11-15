import React from 'react'
import {useState, useEffect} from 'react'
import axios from 'axios'

function ArtistProfile(props) {

    const API_URL = 'http://localhost:5005'
    const id = props.match.params.id

    //artist data
    const [artist, setArtist] = useState({})
    const [tracks, setTracks] = useState([])

    const getArtist = () => {
        axios.get(`${API_URL}/api/map/${id}`)
        .then(res => {
            setArtist(res.data)
            setTracks(res.data.tracks)
        })
    }

    useEffect(() => {
        getArtist()
    }, [])

    const close = () => {
        props.history.push('/map')
    }


    return (
        <div>
            <button onClick={close}>close</button>
            <div id="porfileHeader">
                <img src={artist.picture} />
                <h1>{artist.name}</h1>
            </div>

            <div id="spotifyLinkWrapper">
                <a href={artist.spotifyLink}>spotify</a>
            </div>

            <h3>tracks</h3>
            {tracks.map(track => {
                return (
                    <div>
                       <img src={track.cover} />
                       <h4>{track.songTitle}</h4>
                       <audio controls>
                           <source src={track.url} />
                       </audio>
                    </div>
                )
            })}
        </div>
    )
}

export default ArtistProfile
