const mysql = require('mysql2');
const randomstring = require('randomstring');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '1011',
  database: 'dream_or_reality'
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

  const sql = 'UPDATE user SET graduatedate = ?, reality = ? WHERE userid = ?';
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

exports.getName= (req, res) => {
  const { userid } = req.body;

  // 데이터베이스 쿼리를 사용하여 날짜와 status_today 값 불러오기
  const sql = 'SELECT name FROM user WHERE userid = ?';

  connection.query(sql, [userid], (err, result) => {
      if (err) {
          console.error(err);
          return res.status(500).json({ error: '오류가 발생했습니다.' });
      }

      if (result.length === 0) {
          return res.status(401).json({ error: '데이터를 찾을 수 없습니다.' });
      }

      // 클라이언트에 응답 전송
      return res.status(200).json({
          name : result[0].name
      });
  });
};