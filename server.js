const express = require('express');
const app = express();
const PORT = 3000;
const userRoutes = require('./routes/user_route');

app.use('/users', userRoutes);

// 서버 실행
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});