import Report from"../mongodb/models/report.js";
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


const getAllReports = async (req, res) => {
    
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

    const count = await Report.countDocuments({query});
    const reports = await Report
    .find(query)
    .limit(_end)
    .skip(_start)
    .sort({ [_sort]: _order})

    res.header('x-total-count', count);
    res.header('Access-Control-Expose-Headers', 'x-total-count');
      

        res.status(200).json(reports);
    } catch (error) {
        res.status(500).json({ message: error.message});
    }
};
const getReportDetails = async (req, res) => {

    const { id } = req.params;
    const reportExists = await Report.findOne({_id: id}).populate('creator');

    if(reportExists) {res.status(200).json
    (reportExists) }else {
        res.status(404).json({ message: 'Report not found'});
    }
};


const createReport = async (req, res) => {
    try {
        const {title,team,location,  description, position,     email, photo } =  req.body;

    const session =  await mongoose.startSession();
    session.startTransaction();

    const user = await User.findOne({ email}).session(session);
    

    if(!user) throw new Error('User not found');

    const photoURL = await cloudinary.uploader.upload(photo);
    

    const newReport = await Report.create({ 
        title, 
        team, 
        location,
        position,
        description, 
        email,
        photo: photoURL.url,    
        creator: user._id
    });
        user.allReports.push(newReport._id);
        
        await user.save({ session });

        await session.commitTransaction();

        res.status(200).json({ message: 'Report created successfully'});
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message});
    }
    };

const updateReport = async (req, res) => {

    try {
        const { id } = req.params;
        const { title, description, position, location, team, photo } = req.body;

        const photoUrl = await cloudinary.uploader.upload(photo);

        await Report.findByIdAndUpdate(
            {_id:id}, {
            title, description, team, location, position, photo: photoUrl.url || photo
        },
        );
        res.status(200).json({message: 'Report updated Succesfully'})

    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

const deleteReport = async (req, res) => {
    try {
        const { id } = req.params;
       
        const reportToDelete = await Report.findById({ _id: id}).populate('creator');

        if(!reportToDelete) throw new Error('Report not found');

        const session =  await mongoose.startSession();
        session.startTransaction();

        reportToDelete.deleteOne({session}); 
        reportToDelete.creator.allReports.pull(reportToDelete);

        await reportToDelete.creator.save({session});
        await session.commitTransaction();

        res.status(200).json({ message: 'Report Deleted successfully'});
    } catch (error) {
        res.status(500).json({ message: error.message});
    }
};

export { getAllReports, getReportDetails, createReport, updateReport, deleteReport};