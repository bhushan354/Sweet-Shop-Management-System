# 🍬 Sweet Shop Management System

A full-stack **Sweet Shop Management System** built using **Ruby on Rails (API)** and **React (Vite)**, following **Test-Driven Development (TDD)** and clean coding practices.

This project demonstrates authentication, role-based authorization, inventory management, and a modern responsive frontend.

---

## 📌 Features Overview

### 👤 Authentication & Authorization
- User registration and login
- JWT-based authentication
- Role-based access control (`user`, `admin`)
- Admin-only protected routes and APIs

### 🍭 Sweet Management
- View all sweets
- Search sweets by name, category, and price range
- Purchase sweets (stock decreases)
- Admin can add, restock, update, and delete sweets

### 📦 Inventory Management
- Purchase decreases quantity
- Restock increases quantity (admin only)
- Out-of-stock sweets cannot be purchased

### 🎨 Frontend
- Modern React SPA using **Vite**
- Responsive UI using **Bootstrap**
- Admin dashboard for sweet management
- Role-aware navigation and routing

---

## 🧱 Tech Stack

### Backend
- Ruby on Rails 8 (API-only)
- PostgreSQL
- JWT authentication
- RSpec, FactoryBot, Shoulda Matchers
- Service objects (`AuthService`, `InventoryService`, `JwtService`)
- TDD approach (Red → Green → Refactor)

### Frontend
- React (Vite)
- React Router DOM
- Bootstrap 5
- Axios for API calls

---

## 🛠 Local Setup Instructions 

*In order to run this project you need:*

- ✔ Ruby ,Node, NPM installed in your machine.
- ✔ Get Postgresql up and running.
- ✔ [Git](https://git-scm.com/downloads) installed in your machine.
- ✔ Sign in or sign up to your [Github](https://github.com/) account.
- ✔ A professional editer such as [VS Code](https://code.visualstudio.com/download).
- ✔ A web browser such as Google Chrome.


1. **Clone the repository:**
   ```bash
   git clone git@github.com:bhushan354/Sweet-Shop-Management-System.git
   cd Sweet-Shop-Management-System
   cd backend
   ```

2. **Update database configuration:**
   - Edit `config/database.yml` with your local PostgreSQL credentials.

3. **Ensure Ruby version compatibility:**
   - Match the Ruby version in your system with the one in the `Gemfile`.

4. **Install dependencies and set up the database:**
   ```bash
   bundle install
   rails db:drop
   rails db:create
   rails db:migrate
   rails db:seed
   ```

5. **Start the Rails server:**
   ```bash
   rails server
   ```

6. **Go to frontend:**
   ```bash
   cd ..
   cd frontend
   ```

7. **Install dependencies:**
   ```bash
   npm install --force
   ```

8. **Run Frontend:**
   ```
   npm run dev
   ```

9. **Access the website:**
   ```
   http://localhost:5173/
   ```

---

## 🔐 Demo Credentials

Use the following credentials to test the application:

   #### 👤 Normal User
   - **Email:** `user@gmail.com`
   - **Password:** `12345678`

   #### 👑 Admin User
   - **Email:** `admin@gmail.com`
   - **Password:** `87654321`

---

## 🧪 Test Report

The backend was developed using **Test-Driven Development (TDD)** with RSpec.

### Test Coverage Includes:
- Model validations
- Service objects (`AuthService`, `InventoryService`, `JwtService`)
- Request specs for authentication
- Authorization tests (admin vs user)
- Inventory edge cases (out-of-stock, unauthorized access)

### Running Tests:
```bash
cd backend
bundle exec rspec
```

### Sample Test Result:
```
bhushan@asus:~/Desktop/Sweet-Shop-Management-System/backend$ bundle exec rspec
..............................

Finished in 0.89919 seconds (files took 3.88 seconds to load)
30 examples, 0 failures

```

---



## 🤖 My AI Usage

AI tools were used thoughtfully throughout the development of this project to improve productivity, code quality, and learning efficiency. Below is a transparent description of how AI assisted me.

### 🔧 AI Tools Used
- **ChatGPT (OpenAI)**

### 🧠 How I Used AI
- I used ChatGPT as a **learning and guidance tool** while designing the backend architecture, especially for:
  - Structuring RESTful API endpoints
  - Understanding and implementing JWT-based authentication
  - Designing service objects (`AuthService`, `InventoryService`, `JwtService`)
  - Applying Test-Driven Development (TDD) using RSpec and FactoryBot
- I used ChatGPT to:
  - Clarify Rails and React concepts when I was stuck
  - Although I am familiar with implementing authentication and authorization using popular Rails gems such as Devise and CanCanCan, this assignment required building these features manually. I therefore implemented JWT-based authentication and role-based authorization without relying on external authentication gems. 
  - I used AI assistance to understand the internal working of authentication flows, token handling, and authorization checks, which helped me implement the logic correctly and gain a much deeper understanding of how these systems work internally.
  - Improve UI/UX structure using Bootstrap classes
  - Review code for best practices and readability
- AI was also helpful in:
  - Planning Dockerization (Dockerfile, docker-compose)
  - Refining commit practices and project organization

### ✍️ Reflection on AI Impact
Using AI significantly **improved my development workflow**. It acted like a knowledgeable mentor that helped me:
- Learn faster without blindly copying code
- Understand *why* a solution works, not just *what* works
- Stay focused on problem-solving rather than getting blocked by small issues
- Maintain clean code and structured design across backend and frontend

All critical logic, architectural decisions, and final implementations were **written, tested, and validated by me**. AI was used as an assistant not a replacement for my own understanding and effort.

Overall, AI helped me build this project more confidently, efficiently, and with better code quality.

---

## 📡 API Endpoints

### Authentication
- `POST /api/auth/register` – Register a new user
- `POST /api/auth/login` – Login and receive JWT token

### Sweets (Public / Protected)
- `GET /api/sweets` – List all sweets
- `GET /api/sweets/search` – Search sweets by name, category, price range
- `POST /api/sweets/:id/purchase` – Purchase a sweet (Authenticated)

### Admin Only
- `POST /api/sweets` – Create a new sweet
- `PUT /api/sweets/:id` – Update sweet details
- `DELETE /api/sweets/:id` – Delete a sweet
- `POST /api/sweets/:id/restock` – Restock sweet quantity

---


## 🙏 Thank You

Thank you for taking the time to review my  project.

This assignment gave me an excellent opportunity to apply full-stack development concepts, practice **Test-Driven Development**, and deepen my understanding of **authentication, authorization** without relying on high-level abstractions.

I truly appreciate your time and consideration, and I look forward to hearing from you.

— *Bhushan Deshmukh*

## 📝 Contact Details

Bhushan Deshmukh: 
+91 8600118932 | deshmukhbhushan380@gmail.com | https://www.linkedin.com/in/bhushan-deshmukh-codes/