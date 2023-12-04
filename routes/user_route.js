const express = require('express');
const router = express.Router();
const userController = require('../controllers/user_controller'); // 사용자 컨트롤러 가져오기

// 회원가입 라우트
router.post('/signup1', userController.signup1);
router.post('/signup2', userController.signup2);
router.post('/signup3', userController.signup3);

// 중복확인 라우트
router.post('/checkDuplicate', userController.checkDuplicate);

// 로그인 라우트
router.post('/login', userController.login);

// 이름 가져오기 라우트
router.post('/getName', userController.getName);

module.exports = router;