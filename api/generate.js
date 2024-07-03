import OpenAI from "openai";
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY, // Access API key from environment variable
});

module.exports = async (req, res) => {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const prompt = 'Generate a short, flirty, romantic poem with 4 verses (maximum 140 characters in total, 35 character top for each verse) to praise my girlfriend. Use also cute emoticons (max 2)';
        const chatCompletion = await openai.chat.completions.create({
            model: "gpt-4",
            messages: [{ role: "user", content: prompt }],
        });

        res.status(200).json(chatCompletion.choices[0].message);
    } catch (error) {
        console.error('Error:', error); // Log the error details
        res.status(500).json({ error: error.message });
    }
};
