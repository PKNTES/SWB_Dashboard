import Player from "../mongodb/models/player.js";
import User from "../mongodb/models/user.js";
import * as dotenv from "dotenv";
import { v2 as cloudinary } from 'cloudinary';
import mongoose from "mongoose";


dotenv.config();
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})


const getAllPlayers = async (req, res) => {
    
            const {_end, _order, _start, _sort, title_like = "",
                    position= ""} = req.query;
                const query = {};

                if(position !== '' ) {
                    query.position = position;
                }

                if (title_like) {
                    query.title = { $regex: title_like, $options: 'i'}
                }
 try { 

    const count = await Player.countDocuments({query});
    const players = await Player
    .find(query)
    .limit(_end)
    .skip(_start)
    .sort({ [_sort]: _order})

    res.header('x-total-count', count);
    res.header('Access-Control-Expose-Headers', 'x-total-count');
      

        res.status(200).json(players);
    } catch (error) {
        res.status(500).json({ message: error.message});
    }
};
const getPlayerDetails = async (req, res) => {

    const { id } = req.params;
    const playerExists = await Player.findOne({_id: id}).populate('creator');

    if(playerExists) {res.status(200).json
    (playerExists) }else {
        res.status(404).json({ message: 'Player not found'});
    }
};


const createPlayer = async (req, res) => {
    try {
        const {title,team,location,  description, position,     email, photo } =  req.body;

    const session =  await mongoose.startSession();
    session.startTransaction();

    const user = await User.findOne({ email}).session(session);
    

    if(!user) throw new Error('User not found');

    const photoURL = await cloudinary.uploader.upload(photo);
    

    const newPlayer = await Player.create({ 
        title, 
        team, 
        location,
        position,
        description, 
        email,
        photo: photoURL.url,    
        creator: user._id
    });
        user.allPlayers.push(newPlayer._id);
        
        await user.save({ session });

        await session.commitTransaction();

        res.status(200).json({ message: 'Player created successfully'});
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message});
    }
    };

const updatePlayer = async (req, res) => {

    try {
        const { id } = req.params;
        const { title, description, position, location, team, photo } = req.body;

        const photoUrl = await cloudinary.uploader.upload(photo);

        await Player.findByIdAndUpdate(
            {_id:id}, {
            title, description, team, location, position, photo: photoUrl.url || photo
        },
        );
        res.status(200).json({message: 'Player updated Succesfully'})

    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

const deletePlayer = async (req, res) => {
    try {
        const { id } = req.params;
       
        const playerToDelete = await Player.findById({ _id: id}).populate('creator');

        if(!playerToDelete) throw new Error('Player not found');

        const session =  await mongoose.startSession();
        session.startTransaction();

        playerToDelete.deleteOne({session}); 
        playerToDelete.creator.allPlayers.pull(playerToDelete);

        await playerToDelete.creator.save({session});
        await session.commitTransaction();

        res.status(200).json({ message: 'Player Deleted successfully'});
    } catch (error) {
        res.status(500).json({ message: error.message});
    }
};

export { getAllPlayers, getPlayerDetails, createPlayer, updatePlayer, deletePlayer};