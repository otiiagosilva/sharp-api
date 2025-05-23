import express from "express";
import multer from "multer";
import sharp from "sharp";

const app = express();
const upload = multer();

app.post("/resize", upload.single("image"), async (req, res) => {
  try {
    const resized = await sharp(req.file.buffer)
      .resize(300, 300)
      .toFormat("png")
      .toBuffer();

    res.set("Content-Type", "image/png");
    res.send(resized);
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: "Erro ao processar imagem" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`API rodando na porta ${PORT}`);
});