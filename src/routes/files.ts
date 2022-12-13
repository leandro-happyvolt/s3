// * TYPES AND INTERFACES
import { Request, Response, Express } from "express";

// * DEPENDENCIES
import express from "express";

// * SERVICE
import FileServices from "../services/files";

// * MIDDLEWARES
import multerUpload from "../middlewares/multerUpload"

function files(app: Express) {
    const router = express.Router();
    const fileServ = new FileServices();
    app.use("/api/files", router);

    router.get(
      "/",
      async (req: Request, res: Response) => {
          const files = await fileServ.getAll();
          return res.status(files.success ? 200 : 400).json(files);
      }
    );

    router.get(
      "/:fileName",
      async (req: Request, res: Response) => {
          const file = await fileServ.getByFileName(req.params.fileName);
          return res.status(file.success ? 200 : 400).json(file);
      }
    );

    router.get(
      "/presignedURL/:fileName",
      async (req: Request, res: Response) => {
          const file = await fileServ.getPresignedURL(req.params.fileName);
          return res.status(file.success ? 200 : 400).json(file);
      }
    );

    // para descargarlo y dejarlo en nuestra carpeta images, sin embargo, si quisieramos descargarlo y enviarselo al cliente, podría stremearselo o podría definir
    // una carpeta static y que el pudiera agarrar las imagenes desde allí
    router.get(
      "/download/:fileName",
      async (req: Request, res: Response) => {
          const file = await fileServ.download(req.params.fileName);
          return res.status(file.success ? 200 : 400).json(file);
      }
    );

    router.post(
      "/",
      [multerUpload.single('fileName')],
      async (req: Request, res: Response) => {
        if (req.file === undefined) {
          return res.status(400).json({
            message: "Please upload a file!",
          });
        }
        
        const file = await fileServ.upload(req.file);
        return res.status(file.success ? 200 : 400).json(file);
      }
    );
}

export default files;