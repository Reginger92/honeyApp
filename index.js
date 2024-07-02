const express = require('express');
const OpenAI = require('openai');
const cors = require('cors');
require('dotenv').config(); // Load environment variables from .env file

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY, // Access API key from environment variable
});

app.post('/generate', async (req, res) => {
    try {
        // Define your custom prompt for generating compliments
        const prompt = 'Generate a short, flirty, romantic poem with 4 verses (maximum 140 characters in total) to praise my girlfriend. Use also cute emoticons (max 2)';

        const completion = await openai.chat.completions.create({
            model: 'gpt-4',
            messages: [{ role: 'system', content: prompt }],
        });

        res.json(completion.choices[0].message);
    } catch (error) {
        console.error('Error:', error); // Log the error details
        res.status(500).json({ error: error.message });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});