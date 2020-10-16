import { Options, diskStorage } from "multer";
import path from "path";

const multerSettings: Options = {
  storage: diskStorage({
    destination: path.join(__dirname, "..", "..", "uploads"),

    // Sets file name
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}-${file.originalname}`);
    },
  }),
};

export default multerSettings;
