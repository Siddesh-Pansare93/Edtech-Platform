import { v2 as cloudinary } from 'cloudinary';
import fs from "fs";
import logger from '../../logger';

const cloudinaryConfig = () => {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
    api_key: process.env.CLOUDINARY_API_KEY!,
    api_secret: process.env.CLOUDINARY_API_SECRET!
  });
};

export interface CloudinaryUploadResponse {
  url: string;
  public_id: string;
  secure_url: string;
  [key: string]: any;
}

const uploadOnCloudinary = async (localFilePath: string | undefined): Promise<CloudinaryUploadResponse | null> => {
  try {
    if (!localFilePath) return null;

    // Uploading file
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto"
    });

    // File has been uploaded successfully
    console.log("File is uploaded on Cloudinary at:", response.url);

    fs.unlinkSync(localFilePath);
    return response as CloudinaryUploadResponse;
  } catch (error) {
    if (localFilePath && fs.existsSync(localFilePath)) {
      fs.unlinkSync(localFilePath); // Remove local file if upload fails
    }
    return null;
  }
};

// Function to delete a video from Cloudinary
const deleteFromCloudinary = async (videoUrl: string): Promise<any> => {
  try {
    if (!videoUrl) throw new Error("Invalid video URL");

    // Extract public ID from the URL
    const publicId = videoUrl.split('/').pop()?.split('.')[0];
    if (!publicId) throw new Error("Could not extract public ID from URL");

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
