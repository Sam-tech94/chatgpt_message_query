const express = require('express');
const { Configuration, OpenAIApi } = require('openai');

const app = express();

const configuration = new Configuration({
  apiKey: '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',
});

const openai = new OpenAIApi(configuration);

app.get('/', async (req, res) => {
  try {
    const message = req.query.message;
    const response = await openai.createCompletion({
      engine: 'text-davinci-002',
      prompt: `Q: ${message}\nA:`,
      maxTokens: 150,
      n: 1,
      stop: '\n',
    });
    const answer = response.data.choices[0].text.trim();
    res.send(answer);
  } catch (err) {
    console.error(err);
    res.status(500).send('Something went wrong!');
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
