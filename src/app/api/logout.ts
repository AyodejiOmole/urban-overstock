import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.setHeader('Set-Cookie', 'urban-token=; Max-Age=0; Path=/; HttpOnly; Secure; SameSite=Strict');
  res.status(200).json({ message: 'Logged out successfully' });
}
