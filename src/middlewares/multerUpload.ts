import multer from "multer"

// multer.diskStorage es para guardar el archivo en nuestro servidor backend
//si nosotros queremos devolver la imagen ó subirla a cloud storage, vamos a decírle que no vaya a un cierto destino sino que lo almacene en memoria, que momentaneamente lo tenga en un Buffer Object, eso hace la línea de abajo.
const storage = multer.memoryStorage();
/* const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads')
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now())
    }
}) */

const multerUpload = multer({
    // recuerda que esto es lo mismo que storage:storage, basicamente en la propiedad storage almacena la imagen/archivo
    storage,
});

export default multerUpload;