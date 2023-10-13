const mysql = require('mysql2');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '1011',
  database: 'dream_or_reality'
});


// 회원가입 컨트롤러
exports.signup = (req, res) => {
  const { name, userid, pw, gender, birthdate, email, graduatedate, reality } = req.body;

  const sql = 'INSERT INTO users (name, userid, pw, gender, birthdate, email, graduatedate, reality ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
  connection.query(sql, [name, userid, pw, gender, birthdate, email, graduatedate, reality], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Error registering user' });
      return;
    }
    
    res.status(200).json({ message: 'User registered successfully' });
  });
};