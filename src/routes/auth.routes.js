const express = require('express');
const authController = require("../controllers/auth.controller")

const router = express.Router();

// debug ping to verify router is active
router.get('/ping', (req, res) => {
    res.status(200).json({ ok: true });
})

// user auth APIs
router.post('/user/register', authController.registerUser)
router.post('/user/login', authController.loginUser)
router.get('/user/logout', authController.logoutUser)



// food partner auth APIs
router.post('/food-partner/register', authController.registerFoodPartner)
router.post('/food-partner/login', authController.loginFoodPartner)
router.get('/food-partner/logout', authController.logoutFoodPartner)



 module.exports = router;