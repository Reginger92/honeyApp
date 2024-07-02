const OpenAI = require('openai');
/*require('dotenv').config(); // Load environment variables from .env file*/

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY, // Access API key from environment variable
});

module.exports = async (req, res) => {
    try {
        const prompt = 'Generate a short, flirty, romantic poem with 4 verses (maximum 140 characters in total, 35 character top for each verse) to praise my girlfriend. Use also cute emoticons (max 2)';
        const completion = await openai.chat.completions.create({
            model: 'gpt-4',
            messages: [{ role: 'system', content: prompt }],
        });

        res.json(completion.choices[0].message);
    } catch (error) {
        console.error('Error:', error); // Log the error details
        res.status(500).json({ error: error.message });
    }
};
