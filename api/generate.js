import OpenAI from 'openai';

const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export default async (req, res) => {  // Use export default for ES module
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const prompt = `
            Generate the following poem, and just this poem not more:

            Happy Maria Day, my love, so dear,
            I’ve missed this moment, year after year.
            Seven times I’ve let it slip by,
            But this year’s different, I won’t deny.

            For each of the years I let it fade,
            Seven gifts for you I’ve carefully laid.
            Around our home, they’re waiting to be found,
            With love in each, wrapped all around.

            So search and seek, my darling Maria,
            The first gift waits where the Lion King sleeps at night!
        `;

        const chatCompletion = await client.chat.completions.create({
            model: "gpt-4o",
            messages: [{ role: "user", content: prompt }],
        });

        res.status(200).json(chatCompletion.choices[0].message);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: error.message });
    }
};

