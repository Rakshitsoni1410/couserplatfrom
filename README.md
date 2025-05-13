# 🎓 Online Course Platform – BCA Final Year Project

This is a full-stack web application built as my final year **BCA project**, designed to function like popular platforms such as **Udemy** or **Coursera**. It allows students to browse and purchase courses, watch video lectures, track their progress, and leave reviews. Instructors can upload courses, manage content, and reply to reviews.

---

## 🚀 Features

### 👨‍🎓 Student Panel
- View all available courses with details
- Enroll in courses through a custom payment system
- Watch lectures (video streaming)
- Leave, edit, and delete reviews
- Track course completion progress

### 👩‍🏫 Instructor Panel
- Publish and manage courses
- Upload video lectures
- View and reply to student reviews

### 💳 Payment Integration
- Custom UPI and card-based payments
- Webhook to update payment status in real time
- Payment status stored securely in MongoDB

---

## 🛠️ Tech Stack

| Layer       | Technology               |
|-------------|---------------------------|
| **Frontend** | React.js, Tailwind CSS    |
| **Backend**  | Node.js, Express.js       |
| **Database** | MongoDB                   |
| **Deployment** | Netlify (Frontend), Render (Backend) |

---

## 📁 Project Structure

client/ # Frontend (React)
server/ # Backend (Node + Express)
├── controllers/
├── models/
├── routes/
├── config/
├── middleware/

yaml
Copy
Edit

---

## 📦 Installation

### 🔹 Clone the repository
```bash
git clone https://github.com/your-username/online-course-platform.git
cd online-course-platform
🔹 Setup Frontend
bash
Copy
Edit
cd client
npm install
npm run dev
🔹 Setup Backend
bash
Copy
Edit
cd server
npm install
npm run dev
Make sure to configure your .env file with MongoDB connection URI, port, etc.

🌐 Live Demo
Frontend: Netlify Link
Backend: Render API

