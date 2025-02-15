const express = require('express');
const app = express();
const PORT = 3000;

// Cấu hình để hiển thị file tĩnh (HTML, CSS, JS)
app.use(express.static('public'));

// Route chính (Trang chủ)
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/Public/index.html');
});

// Khởi động server
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
