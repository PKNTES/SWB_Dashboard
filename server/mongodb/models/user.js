import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true},
    avatar: {type: String, required: true},
    allPlayers: [{type: mongoose.Schema.Types.ObjectId, ref: "Player"}],
    allReports: [{type: mongoose.Schema.Types.ObjectId, ref: "Report"}]
});

const userModel = mongoose.model('User', userSchema)

export default userModel;