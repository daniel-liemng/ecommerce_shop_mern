import path from "path";
import express from "express";
import multer from "multer";

const router = express.Router();

// config
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cd(null, "uploads/");
  },
  filename() {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

const checkFileType = (file, cb) => {
  const filetypes = /jpg|jpeg|png/;
  const extname = filetypes.test(
    path.extname(file.originalname).toLocaleLowerCase()
  );
  const minetype = filetypes.test(file.minetype);

  if (extname && minetype) {
    return cb(null, true);
  } else {
    cb("Images only");
  }
};

const upload = multer({
  storage,
  // check file type
  fileFilter: (req, file, cb) => {
    checkFileType(file, cb);
  },
});

router.post("/", upload.single("image"), (req, res) => {
  res.send(`/${req.file.path}`);
});

export default router;
