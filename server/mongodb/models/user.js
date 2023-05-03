import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true},
    avatar: {type: String, required: true},
    allPlayers: [{type: mongoose.Schema.Types.ObjectId, ref: "Player"}]
});

const userModel = mongoose.model('User', userSchema)

export default userModel;