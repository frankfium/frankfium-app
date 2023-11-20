import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async (req: VercelRequest, res: VercelResponse) => {
    const { username, password } = req.body;

    if (username !== 'test' || password !== 'test') {
        return res.status(401).send({ status: 'Unauthorized' });
    }

    // Include a user property in the response
    res.status(200).send({ status: 'Logged in', user: { username } });
};