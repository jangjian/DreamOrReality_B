const express = require('express');
const router = express.Router();
const userController = require('../controllers/user_controller'); // 사용자 컨트롤러 가져오기

// 회원가입 라우트
router.post('/signup', userController.signup);

module.exports = router;