const express = require('express');
const { registerUser, loginUser, userProfile, verifyPassword } = require('../controller/userController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get("/userprofile", protect, userProfile)
router.post('/verify-password', verifyPassword); // Add this line

// router.get('/profile', protect, (req, res) => {
//   res.json({
//     message: 'User Profile Data',
//     user: req.user, 
//   });
// });

module.exports = router;
