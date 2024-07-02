const express = require('express');
const { OpenAIApi, Configuration } = require('openai');
const cors = require('cors');
require('dotenv').config(); // Load environment variables from .env file

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY, // Access API key from environment variable
});

const openai = new OpenAIApi(configuration);

app.post('/generate', async (req, res) => {
    try {
        // Define your custom prompt for generating compliments
        const prompt = 'Generate a short, flirty, romantic poem with 4 verses (maximum 140 characters in total, 35 character top for each verse) to praise my girlfriend. Use also cute emoticons (max 2)';

        const completion = await openai.chat.completions.create({
            model: 'gpt-4',
            messages: [{ role: 'system', content: prompt }],
        });

        res.json(response.data.choices[0].message);
    } catch (error) {
        console.error('Error:', error); // Log the error details
        res.status(500).json({ error: error.message });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
