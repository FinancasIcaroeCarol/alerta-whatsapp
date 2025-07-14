const express = require("express");
const axios = require("axios");
const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;
const CALLMEBOT_APIKEY = "7083896"; // sua API key
const WHATSAPP_NUMBER = "5522992411757"; // seu número com DDI

app.post("/whatsapp", async (req, res) => {
  const { numero, mensagem } = req.body;

  if (!numero || !mensagem) {
    return res.status(400).json({ error: "Número e mensagem são obrigatórios" });
  }

  try {
    const url = `https://api.callmebot.com/whatsapp.php?phone=${numero}&text=${encodeURIComponent(mensagem)}&apikey=${CALLMEBOT_APIKEY}`;
    const response = await axios.get(url);
    res.json({ status: "Mensagem enviada", response: response.data });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
