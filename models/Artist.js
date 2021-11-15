const { Schema, model } = require("mongoose");

const artistSchema = new Schema({
    coordinates : Array,
    name : String,
    picture : String,
    discription : String,
    popularity : Number,
    spotifyLink : String,
    tracks : Array,
    city : String
})



const Artist = model("Artist", artistSchema);
module.exports = Artist;