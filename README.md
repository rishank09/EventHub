# 🎉 EventHub 

**EventHub** is a full-stack web application developed by **Rishank**, built to streamline the process of managing college club events and registrations.

Admins can post events with details and images, while students can view events and register seamlessly — all within a responsive and beautifully themed dark UI.

---

## 🚀 Features

### 👩‍💼 Admin
- Secure admin login
- Create new events with:
  - Event name
  - Description
  - Image URL
- View, edit, and delete posted events
- Like tracking per post

### 👨‍🎓 Students
- Browse current and upcoming events
- View event details and images
- Click “Register Now” to join events


---

## 🧱 Tech Stack

| Layer       | Technology                        |
|-------------|------------------------------------|
| Backend     | Node.js, Express.js                |
| Database    | MongoDB with Mongoose              |
| Templating  | EJS (Embedded JavaScript)          |
| Styling     | Pure CSS (custom blue-gray theme)  |
| Icons       | Font Awesome                       |

---

## 📁 Folder Structure

EventHub/
├── views/ # All EJS templates (login, profile, register, etc.)
├── public/
│ └── stylesheet/ # Pure CSS files for each page
├── models/ # Mongoose schemas (User, Post)
├── routes/ # Express routes
├── app.js # Main server file
└── README.md # Project documentation


---

## ⚙️ Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/rishank09/EventHub.git
cd EventHub
2. Install Dependencies
bash
Copy
Edit
npm install
3. Setup MongoDB
Ensure MongoDB is running locally and connected in app.js:

js
Copy
Edit
mongoose.connect('mongodb://127.0.0.1:27017/clubRecruitment');
4. Run the Server
bash
Copy
Edit
npm start
Now open in browser:
👉 http://localhost:3000


✍️ Author
Rishank Pandey
💻 Full Stack Web Developer (MERN Stack in progress)
📧 rishankpandeysss01@gmail.com
🔗 https://github.com/rishank09

📄 License
This project is licensed under the MIT License.


---

### ✅ What’s Next?

- Add this file to your project root as `README.md`
- Commit & push it:
  ```bash
  git add README.md
  git commit -m "Added project documentation"
  git push
