import express from 'express';
import { registerUser, loginUser, getUser} from '../controllers/authController.js';
import auth from '../middlewares/auth.js';

const authRouter = express.Router();    
authRouter.post('/register', registerUser);
authRouter.post('/login', loginUser);
authRouter.get('/me', auth, getUser);
export default authRouter;
