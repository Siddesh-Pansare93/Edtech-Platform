import { v2 as cloudinary } from 'cloudinary';
import fs from "fs";
import logger from "../logger.js";

const cloudinaryConfig = () => {
    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET
    });
};

const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) return null;

        // Uploading file
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto"
        });

        // File has been uploaded successfully
        console.log("File is uploaded on Cloudinary at:", response.url);

        fs.unlinkSync(localFilePath);
        return response;
    } catch (error) {
        fs.unlinkSync(localFilePath); // Remove local file if upload fails
        return null;
    }
};

// Function to delete a video from Cloudinary
const deleteFromCloudinary = async (videoUrl) => {
    try {
        if (!videoUrl) throw new Error("Invalid video URL");

        // Extract public ID from the URL
        const publicId = videoUrl.split('/').pop().split('.')[0];

        const response = await cloudinary.uploader.destroy(publicId, {
            resource_type: "video"
        });

        console.log(`Deleted video: ${publicId} from Cloudinary`);
        return response;
    } catch (error) {
        console.error("Error deleting video from Cloudinary:", error);
        return null;
    }
};

export {
    uploadOnCloudinary,
    deleteFromCloudinary,
    cloudinaryConfig
};
