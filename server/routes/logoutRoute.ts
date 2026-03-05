import express from 'express';

const Logout = (req: express.Request, res: express.Response) => {
  res.status(200).json({ message: "Successfully logged out of the realm." });
};

export default Logout;