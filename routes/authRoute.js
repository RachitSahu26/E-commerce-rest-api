import express from 'express';
import { loginController, registerController } from '../controllers/authController.js';
import { isAdmin, requireSignIn } from '../middleware/SignInRequrie.js';

const router = express.Router();

// Route for user registration
router.post('/register', registerController);

// login route
router.post('/login', loginController);



// private Route checking
router.get('/user-auth', (req, res) => {
    res.status(200).send({ ok: true });
});
// admin  Route checking
router.get('/admin-auth', requireSignIn, isAdmin, (req, res) => {
    res.status(200).send({ ok: true });
});

export default router;
