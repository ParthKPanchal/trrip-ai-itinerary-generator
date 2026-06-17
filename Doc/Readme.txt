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