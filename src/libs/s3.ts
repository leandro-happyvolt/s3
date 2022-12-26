// S3Client es el que nos va a permitir hacer la conexión
// PutObjectCommand es el método que nos va a permitir subir el archivo
import { S3Client, PutObjectCommand, ListObjectsCommand, GetObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import configs from '../configs'
import fs from 'fs'
import { Readable } from 'stream'

const s3Client = new S3Client({
    region: configs.AWS_BUCKET_REGION,
    credentials: {
      "accessKeyId": configs.AWS_ACCESS_KEY_ID,
      "secretAccessKey": configs.AWS_SECRET_ACCESS_KEY,
    }
})

export const s3Upload = async (originalname: string, buffer: Buffer) => {
  /* const fileStream = Readable.from(buffer); */
  /* const stream = fs.createReadStream(file) */
  const params = {
    Bucket: configs.AWS_BUCKET_NAME,
    Key: originalname,
    Body: buffer,
    // para que es esto
    //ACL: 'public-read'
  }
  const command = new PutObjectCommand(params)
  return await s3Client.send(command)
}

export const s3GetAll = () => {
  const params = {
    Bucket: configs.AWS_BUCKET_NAME
  }
  const command = new ListObjectsCommand(params)
  return s3Client.send(command)
}

export const s3GetPresignedURL = async (fileName: string) => {
  const params = {
    Bucket: configs.AWS_BUCKET_NAME,
    Key: fileName
  }
  const command = new GetObjectCommand(params)
  // expiresIn va por segundos
  return await getSignedUrl(s3Client, command, { expiresIn: 60 })
}

export const s3GetByFileName = (fileName: string) => {
  const params = {
    Bucket: configs.AWS_BUCKET_NAME,
    Key: fileName
  }
  const command = new GetObjectCommand(params)
  return s3Client.send(command)
}

export const s3Download = async (fileName: string) => {
  const params = {
    Bucket: configs.AWS_BUCKET_NAME,
    Key: fileName
  }
  const command = new GetObjectCommand(params)
  const result = await s3Client.send(command)
  if (result.Body === undefined) {
    return {
      data: null,
      message: "Error REST API doawnloading file",
      success: false,
    }
  }
  (result.Body as any).pipe(fs.createWriteStream('./images/image.png'))
  return {
    data: 'downloaded image',
    message: null,
    success: true
  }
}

// s3 remove
export const s3Remove = async (fileName: string) => {
  const params = {
    Bucket: configs.AWS_BUCKET_NAME,
    Key: fileName
  }
  const command = new DeleteObjectCommand(params)
  return s3Client.send(command)
}

