import mongoose from "mongoose";

const PlayerSchema = new mongoose.Schema({
    title: {type: String, required: true},
    
    team: {type: String, required: true},
    location: {type: String, required: true},
   
    description: {type: String, required: true},
    position: {type: String, required: true},
    photo: {type: String, required: true},
    creator: {type: mongoose.Schema.Types.ObjectId, ref:'User' }
});

const playerModel = mongoose.model('Player', PlayerSchema);

export default playerModel 