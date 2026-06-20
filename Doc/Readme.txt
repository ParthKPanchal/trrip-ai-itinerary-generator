Note:- That all the point are for me to understand the flow, if bymistakely i am upload this file

Tech we have use is 

MongoDB Atlas for MongoDB


npm init -y
for node package manager

npm install express mongoose cors dotenv bcryptjs jsonwebtoken multer

express
Creates server.
Like opening a shop.

mongoose
Talks to MongoDB.
Like a translator between app and database.

cors
Allows frontend and backend to talk.
Without it they fight.

dotenv
Stores secret keys.
Like keeping passwords in a locker.

bcryptjs
Encrypts passwords.

jsonwebtoken
Creates login token.
Like giving customer a wristband.
App knows user is logged in.

multer
Handles file uploads.
PDFs or Images

npm install nodemon --save-dev

nodemon
Automatically restarts server.

We have created few folders

controllers - Actual logic.
models - Blueprints for MongoDB.
routes - URLs.
middleware - Security guards.

app.use(express.json()); - Understand JSON data sent by frontend.

we have change package.json this scripts so i can run this server by using npm run dev

"scripts": {
  "start": "node server.js",
  "dev": "nodemon server.js"
}

connected MongoDB with backend

server/
│
│
├── controllers/
│   └── authController.js
│
├── models/
│   └── User.js
│
└── routes/
    └── authRoutes.js

We have completed the sign up part now lets go for Login part

working on same file

now we are going for JWT middleware where only logged-in users can access certain routes.

  server/
  │
  └── middleware/
      └── authMiddleware.js

Visual Flow

      User Login
          ↓
      JWT Created
          ↓
      Token Stored
          ↓
      User Opens Profile
          ↓
      Token Sent
          ↓
      Middleware Checks Token
          ↓
      Valid?
        / \
      Yes  No
        |    |
      Route  Error 401
      Runs

ok so middleware part is done so

now we are going to build upload pfd or image using multer

    server/
      │
      └── middleware/
          └── uploadMiddleware.js

    server/
      │
      └── routes/
          └── uploadRoutes.js

ok file is getting uploaded now in upload folder now we want that the document we send should be read

npm install pdf-parse

this will open the document for gemini to read

Now we are finally connect Gemini

npm install @google/generative-ai

    server/
      │
      └── controllers/
          └── itineraryController.js

    server/
      │
      └── routes/
          └── itineraryRoutes.js

after this we have stop back end and let create the front end part 

    ├── services
    │   └── api.jssrc
    │
    ├── assets
    │
    ├── components
    │   ├── Navbar.jsx
    │   ├── Sidebar.jsx
    │   ├── BentoCard.jsx
    │
    ├── pages
    │   ├── Login.jsx
    │   ├── Register.jsx
    │   ├── Dashboard.jsx
    │   ├── Upload.jsx
    │   ├── ItineraryDetails.jsx
    │   ├── ShareItinerary.jsx
    │
    ├── services
    │   └── api.js
    │
    ├── layouts
    │   └── DashboardLayout.jsx
    │
    ├── routes
    │   └── ProtectedRoute.jsx
    │
    ├── App.jsx
    └── main.jsx

now we are just writen the dummy UI now are going to connect front-end with back-end