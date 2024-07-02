const { Configuration, OpenAIApi } = require('openai');

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);
  
  module.exports = async (req, res) => {
    if (req.method !== 'POST') {
      return res.status(405).json({ error: 'Method not allowed' });
    }
  
    try {
      const prompt = 'Generate a short, flirty, romantic poem with 4 verses (maximum 140 characters in total, 35 character top for each verse) to praise my girlfriend. Use also cute emoticons (max 2)';
      const completion = await openai.createChatCompletion({
        model: 'gpt-4',
        messages: [{ role: 'system', content: prompt }],
      });
  
      res.status(200).json(completion.data.choices[0].message);
    } catch (error) {
      console.error('Error:', error); // Log the error details
      res.status(500).json({ error: error.message });
    }
  };
