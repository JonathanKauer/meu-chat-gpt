import { Configuration, OpenAIApi } from "openai";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método não permitido." });
  }

  try {
    const { userMessage } = req.body;

    const configuration = new Configuration({
      apiKey: process.env.OPENAI_API_KEY,
    });
    const openai = new OpenAIApi(configuration);

    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: userMessage,
      max_tokens: 100,
      temperature: 0.7,
    });

    const gptAnswer = response.data.choices[0].text.trim();
    res.status(200).json({ answer: gptAnswer });
  } catch (error) {
    console.error("Erro ao chamar a OpenAI API:", error);
    res.status(500).json({ error: "Ocorreu um erro ao processar a requisição." });
  }
}
