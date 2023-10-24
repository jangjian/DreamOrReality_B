const mysql = require('mysql2');
const randomstring = require('randomstring');
const connection = mysql.createConnection({
  host: 'database-2.c5g2jjczgnhi.ap-northeast-2.rds.amazonaws.com',
  user: 'root',
  password: 'yopamipa7541',
  database: 'DreamOrReality'
});


// 회원가입 컨트롤러
exports.signup1 = (req, res) => {
  const { name, userid, pw } = req.body;

  const sql = 'INSERT INTO user (name, userid, pw ) VALUES (?, ?, ?)';
  connection.query(sql, [name, userid, pw], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Error registering user' });
      return;
    }
    res.status(200).json({ message: 'User registered successfully' });
  });
};

// 아이디 중복 확인 컨트롤러
exports.checkDuplicate = (req, res) => {
  const { userid } = req.body;
  const checkDuplicateSql = 'SELECT COUNT(*) AS count FROM user WHERE userid = ?';
  connection.query(checkDuplicateSql, [userid], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Error checking duplicate user' });
      return;
    }
    res.status(200).json({ isDuplicate: result[0].count > 0 });
  });
};

exports.signup2 = (req, res) => {
  const { gender, student_num, department, userid } = req.body;

  const sql = 'UPDATE user SET gender = ?, student_num = ?, department = ? WHERE userid = ?';
  connection.query(sql, [gender, student_num, department, userid ], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Error registering user' });
      return;
    }
    res.status(200).json({ message: 'User registered successfully' });
  });
};

exports.signup3 = (req, res) => {
  const { graduateyear, reality, userid } = req.body;

  const sql = 'UPDATE user SET graduateyaer = ?, reality = ? WHERE userid = ?';
  connection.query(sql, [ graduateyear, reality, userid ], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Error registering user' });
      return;
    }
    res.status(200).json({ message: 'User registered successfully' });
  });
};

// 로그인 컨트롤러
exports.login = (req, res) => {
  const { userid, pw } = req.body;
  const token = randomstring.generate(40);
  const sql = 'SELECT * FROM user WHERE userid = ? AND pw = ?';
  connection.query(sql, [userid, pw], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: '로그인 중 오류가 발생했습니다.' });
      return;
    }
    if (result.length === 0) {
      res.status(401).json({ error: '잘못된 자격 증명' });
      return;
    }
    const userData = {
      userid: result[0].userid,
      token: token,
    };
    // 사용자 정보에 토큰 업데이트
    connection.query('UPDATE user SET accesstoken = ? WHERE userid = ?', [token, userid], (updateErr, updateResult) => {
      if (updateErr) {
        console.error(updateErr);
        res.status(500).json({ error: '토큰 업데이트 중 오류가 발생했습니다.' });
        return;
      }
      res.status(200).json(userData);
    });
  });
};