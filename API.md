# 📚 API Documentation

## 📄 Articles

### `GET /articles`
- 📌 תיאור: מחזיר את כל המאמרים

### `POST /articles`
- 📌 תיאור: יוצר מאמר חדש

### `PATCH /articles/:id` *(דורש checkAuth)*
- 📌 תיאור: מעדכן מאמר קיים לפי מזהה

### `DELETE /articles/:id` *(דורש checkAuth)*
- 📌 תיאור: מוחק מאמר לפי מזהה

### `GET /articles/:id` *(דורש checkAuth)*
- 📌 תיאור: מחזיר מאמר בודד לפי מזהה

---

## 🧾 Categories

### `GET /categories` *(דורש checkAuth)*
- 📌 תיאור: מחזיר את כל הקטגוריות

### `POST /categories` *(דורש checkAuth)*
- 📌 תיאור: יוצר קטגוריה חדשה

### `PATCH /categories/:id`
- 📌 תיאור: מעדכן קטגוריה לפי מזהה

### `DELETE /categories/:id` *(דורש checkAuth)*
- 📌 תיאור: מוחק קטגוריה לפי מזהה

---

## 👤 Users

### `POST /users/signup`
- 📌 תיאור: רישום משתמש חדש

### `POST /users/login`
- 📌 תיאור: התחברות עם אימייל וסיסמה



GET 127.0.0.1:3000/articles
POST 127.0.0.1:3000/articles
PATCH 127.0.0.1:3000/articles/67f4286eed4e09c3bec97494 // checAuth
DEL 127.0.0.1:3000/articles/67f4286eed4e09c3bec97494 // checAuth
GET (1 by id) 127.0.0.1:3000/articles/ // checAuth

GET 127.0.0.1:3000/categories //checAuth
POST 127.0.0.1:3000/categories //checAuth
PATCH 127.0.0.1:3000/categories/67f519b0a2123ab7bd16eaa9 //
DEL 127.0.0.1:3000/categories/67f519b0a2123ab7bd16eaa9 //checAuth

POST 127.0.0.1:3000/users/signup
POST 127.0.0.1:3000/users/login
