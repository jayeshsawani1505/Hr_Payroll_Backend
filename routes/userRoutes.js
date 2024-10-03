const express = require('express');
const { registerUser, loginUser, userProfile } = require('../controller/userController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/register',protect, registerUser);
router.post('/login', loginUser);
router.get("/userprofile",protect,userProfile)

// router.get('/profile', protect, (req, res) => {
//   res.json({
//     message: 'User Profile Data',
//     user: req.user, 
//   });
// });

module.exports = router;
