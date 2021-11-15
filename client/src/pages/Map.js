import React from 'react'
import {useState, useEffect} from 'react'
import axios from 'axios'
import ReactMapGl, {Marker, FlyToInterpolator, oldViewState} from "react-map-gl"
import { Link } from 'react-router-dom'

import MapMarker from '../components/MapMarker'

function Map() {

    //get all artist
    const [allArtists, setAllArtists] = useState([])
    const API_URL = 'http://localhost:5005';
    
    const getAllArtists = () => {
        axios.get(`${API_URL}/api/map`)
             .then(res => {
                 console.log(res.data)
                 setAllArtists(res.data)
             })
             .catch(err => console.log(err))
    }
    useEffect(() => {
        getAllArtists()
    }, [])


    const berlinViewport = {
        latitude : 52.520008, 
        longitude : 13.404954,
        width : "100w",
        height : "100vh",
        zoom : 9,
    }

    const [viewport, setViewport] = useState(berlinViewport)
    const [filterMenuOpen, setFilterMenuOpen] = useState(false)

    const toBerlin = () => {
        setViewport({
          ...viewport,
          latitude : 52.520008, 
          longitude : 13.404954,
          zoom: 9,
          transitionDuration: 2500,
          transitionInterpolator: new FlyToInterpolator(),
          maxBounds : [
            [52.618055017661746, 13.281432243318726],
            [52.44320131994233, 13.608753967903874],
        ]
        });
      };

    const toVienna = () => {
        setViewport({
          ...viewport,
          latitude : 48.21377358548916, 
          longitude : 16.369123862931218,
          zoom: 9,
          transitionDuration: 2500,
          transitionInterpolator: new FlyToInterpolator(),
        })
    }

    const toParis = () => {
        setViewport({
          ...viewport,
          latitude : 48.863121054457444,   
          longitude : 2.347349831835786,
          zoom: 9,
          transitionDuration: 2500,
          transitionInterpolator: new FlyToInterpolator(),
        })
    }

    const toRome = () => {
        setViewport({
          ...viewport,
          latitude : 41.91434431977642,  
          longitude : 12.505372936264408,
          zoom: 9,
          transitionDuration: 2500,
          transitionInterpolator: new FlyToInterpolator(),
        })
    }

    const toLondon = () => {
        setViewport({
          ...viewport,
          latitude : 51.51507257643926,  
          longitude : -0.10657974791901607,
          zoom: 9,
          transitionDuration: 2500,
          transitionInterpolator: new FlyToInterpolator(),
        })
    }

    const toMadrid = () => {
        setViewport({
          ...viewport,
          latitude : 40.42447458233723, 
          longitude : -3.696949038371607,
          zoom: 9,
          transitionDuration: 2500,
          transitionInterpolator: new FlyToInterpolator(),
        })
    }


   if (filterMenuOpen === false){
       return (
           <div id="map">
               <ReactMapGl
                    {...viewport}
                    mapboxApiAccessToken = "pk.eyJ1Ijoiam9vc3R3bWQiLCJhIjoiY2t1NDQ3NmJqMXRwbzJwcGM5a3FuY3B3dCJ9.yyon_mO5Y9sI1WgD-XFDRQ"
                    mapStyle="mapbox://styles/joostwmd/ckvwifepf21kj15pflu8gbkdd"
                    onViewportChange={viewport => {
                        setViewport(viewport)
                    }}

                    
                >
                <div id="header">
                    <button onClick={toBerlin}>berlin</button>
                    <button onClick={toVienna}>wien</button>
                    <button onClick={toParis}>paris</button>
                    <button onClick={toRome}>rom</button>
                    <button onClick={toLondon}>london</button>
                    <button onClick={toMadrid}>madrid</button>
                    {/* <button onClick={openFilterMenu}>open filter</button> */}
                </div>

                {allArtists.map(artist => {
                    return (
                        <Marker
                            latitude={artist.coordinates[1]}
                            longitude={artist.coordinates[0]}
                        >
                            <MapMarker props={artist} />
                            {/* <Link to={`/map/${artist._id}`}>
                                <h4>{artist.name}</h4>
                            </Link> */}
                        </Marker>
                    )
                })}


                </ReactMapGl>
           </div>
       )
   }
}

export default Map
