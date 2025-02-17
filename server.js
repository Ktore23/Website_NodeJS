const express = require('express');
const mysql = require('mysql2');
const path = require('path');

const app = express();
const port = 3000;

// Cấu hình thư mục chứa file tĩnh
app.use(express.static(path.join(__dirname, 'public')));

// Kết nối MySQL
const db = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'nhatro',
    port: 3306
});

db.connect((err) => {
    if (err) {
        console.error("❌ Lỗi kết nối MySQL:", err);
        return;
    }
    console.log("✅ Kết nối MySQL thành công!");
});

// ✅ Route mặc định hiển thị home.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'home.html'));
});

// ✅ Route danh sách nhà trọ
app.get('/rooms', (req, res) => {
    const sql = "SELECT * FROM rooms";

    db.query(sql, (err, results) => {
        if (err) {
            console.error("❌ Lỗi truy vấn MySQL:", err);
            return res.status(500).send("Lỗi server");
        }

        res.render('index', { rooms: results });
    });
});

// Khởi động server
app.listen(port, () => {
    console.log(`🚀 Server running at http://localhost:${port}`);
});