import React from 'react'
import { Link } from 'react-router-dom'

function MapMarker(props) {

    const artist = props.props
    const popularity = artist.popularity



    const test = () => {
        console.log(popularity)
    }
    return (
        <div>
            <Link to={`/map/${artist._id}`}>
                <img src={props.props.picture} style={{width : popularity, height : popularity, borderRadius : 90}}/>
                <h6 id="artistNameOnMap" style={{position : "absolute" , top : "50%", left : "50%", transform : "translate(-50%, -50%)"}}>{artist.name}</h6>
            </Link>
        </div>
    )
}

export default MapMarker

