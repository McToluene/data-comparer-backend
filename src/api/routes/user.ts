import { Router, Response, Request } from 'express';
import UserService from '../../services/user.service';

export default (app: Router, userSerivce: UserService) => {
  app.post('/user', async (req: Request, res: Response) => {
    const data = req.user;
    const user = await userSerivce.createUser(data);
    if (user) return res.status(201).json({ message: 'User created successfully!', data: user });
    else return res.status(400).json({ message: 'Failed to create user!' });
  });

  app.get('/user', async (req: Request, res: Response) => {
    const user = await userSerivce.getUser(req.user.uid);
    if (user) return res.status(200).json({ message: 'User fetched successfully!', data: user });
    else return res.status(404).json({ message: 'User not found!' });
  });
};
