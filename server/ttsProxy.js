const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(cors());

app.get("/tts", async (req, res) => {
  const { text, lang } = req.query;
  if (!text || !lang) {
    return res.status(400).send("Missing parameters");
  }

  try {
    const response = await axios({
      method: "get",
      url: `https://translate.google.com/translate_tts`,
      params: {
        ie: "UTF-8",
        q: decodeURIComponent(text),
        tl: lang,
        client: "tw-ob",
      },
      responseType: "arraybuffer",
    });

    res.setHeader("Content-Type", "audio/mpeg");
    res.send(Buffer.from(response.data));
  } catch (error) {
    console.error("Error fetching TTS:", error);
    res.status(500).send("Error fetching TTS");
  }
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`TTS Proxy server running on port ${PORT}`));
