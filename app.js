const express = require("express");
require("dotenv").config();
const app = express();

// const { main } = require("./api/models/index");
// const productRoute = require("./api/routes/product");
// const storeRoute = require("./api/routes/store");
// const purchaseRoute = require("./api/routes/purchase");
// const salesRoute = require("./api/routes/sales");
// // const cors = require("cors");
// const User = require("./api/models/users");
// const Product = require("./api/models/product");
// const mongoose = require('mongoose');

const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');

// mongoose.connect('mongodb+srv://adminhamza:adminhamza123&@cluster0.pzcviot.mongodb.net/InventoryManagementApp?retryWrites=true&w=majority',{useNewUrlParser:true, useUnifiedTopology: true});


// mongoose.connection.on('error',err=>{
//   console.log('connection failed');
// });

// mongoose.connection.on('connected',()=>{
//   console.log('connected successfully with database');
// });

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use(fileUpload({
  useTempFiles:true
}))

// CORS middleware
// app.use(cors({
//   origin: "https://ims-api-beige.vercel.app/", // Allow the specific origin
//   methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
//   credentials: true, // Allow sending credentials such as cookies
//   allowedHeaders: ["Content-Type", "Authorization"] // Allow specific headers
// }));
const cors = require('cors');
const { sendContactEmail } = require("./api/services/emailService");

const allowedOrigins = ['http://localhost:3000', 'https://ims-api-beige.vercel.app'];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
};

app.use(cors(corsOptions));

// Automatically handle preflight `OPTIONS` requests
// app.options("*", cors());

// Express JSON middleware
app.use(express.json());

// Contact form route, calling the email service
app.post("/api/contact", async (req, res) => {
  const { name, email, phone, description } = req.body; // Destructure all form fields

  try {
    await sendContactEmail({ name, email, phone, description });
    res.status(200).send("Email sent successfully");
  } catch (error) {
    res.status(500).send(error.message);
  }
});



app.get('*',(req,res,next)=>{
  res.status(200).json({
    message:'Hello'
  })
})

module.exports = app;
