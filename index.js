import express from "express";
import axios from "axios";
import * as cheerio from "cheerio";
const app = express();

app.get("/", async (req, res) => {
  try {
    const { data } = await axios.get("https://www.bcentral.cl/inicio");
    const $ = cheerio.load(data);
    const selectorDolar =
      "#_BcentralIndicadoresViewer_INSTANCE_pLcePZ0Eybi8_myTooltipDelegate > div > div > div.fin-indicators-col1 > div > div > div:nth-child(3) > div > p.basic-text.fs-2.f-opensans-bold.text-center.c-blue-nb-2";
    const selectorUF =
      "#_BcentralIndicadoresViewer_INSTANCE_pLcePZ0Eybi8_myTooltipDelegate > div > div > div.fin-indicators-col1 > div > div > div:nth-child(2) > div > p.basic-text.fs-2.f-opensans-bold.text-center.c-blue-nb-2";

    const objetovalor = {
      date: new Date().toLocaleDateString(),
      UF: $(selectorUF).text() ?? [],
      dolar: $(selectorDolar).text().split(' ')[0] ?? [],
    };
    res.json(objetovalor);
  } catch (error) {
    res.json({ error });
  }
});
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("server en 👍 Puerto: " + PORT));
