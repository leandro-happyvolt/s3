import { s3GetAll, s3Upload, s3GetByFileName, s3Download, s3GetPresignedURL } from "../libs/s3";

class Files {

    async getAll() {
        try {
            const data = await s3GetAll();
            return {
                data,
                message: null,
                success: true
            };
        } catch (err) {
            console.log(err);
            return {
                data: null,
                message: "Error REST API ",
                success: false,
            };
        }
    }
    
    async getByFileName(fileName: string) {
        try {
            const data = await s3GetByFileName(fileName);

            return {
                data: data.$metadata,
                message: null,
                success: true
            };
        } catch (err) {
            console.log(err);
            return {
                data: null,
                message: "Error REST API ",
                success: false,
            };
        }
    }

    async getPresignedURL(fileName: string) {
        try {
            const data = await s3GetPresignedURL(fileName);
            
            return {
                data: data,
                message: null,
                success: true
            };
        } catch (err) {
            console.log(err);
            return {
                data: null,
                message: "Error REST API ",
                success: false,
            };
        }
    }

    async download(fileName: string) {
        try {
            return await s3Download(fileName);
        } catch (err) {
            console.log(err);
            return {
                data: null,
                message: "Error REST API ",
                success: false,
            };
        }
    }

    async upload(file: Express.Multer.File) {
        try {
            const data = await s3Upload(file.originalname, file.buffer);
            return {
                data,
                message: null,
                success: true
            };
        } catch (err) {
            console.log(err);
            return {
                data: null,
                message: "Error REST API ",
                success: false,
            };
        }
    }
}

export default Files;