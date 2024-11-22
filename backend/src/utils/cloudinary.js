
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import dotenv from "dotenv";

dotenv.config();

cloudinary.config({ 
    cloud_name: 'dln3qieus', 
    api_key: '165998491565172', 
    api_secret: 'wq6MfWhkA_JdR7vgzBXACxtW2nk',
});




const uploadOnCloudinary=async(localFilePath)=>{
    console.log("in cloud");
    console.log("hh",process.env.CLOUDINARY_CLOUD_NAME, process.env.CLOUDINARY_API_KEY);
    try {
        if(!localFilePath) return null;
        const response= await cloudinary.uploader.upload(localFilePath,{
            resource_type:"auto"
        })

       fs.unlinkSync(localFilePath)
        return response;
    } catch (error) {
        fs.unlinkSync(localFilePath)
        return null;
    }
}



export {uploadOnCloudinary}