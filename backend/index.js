const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const AuthRouter = require('./Routes/AuthRouter');
const ProductRouter = require('./Routes/ProductRouter');
const ExpenseRouter = require('./Routes/ExpenseRouter');
const ensureAuthenticated = require('./Middlewares/Auth');

require('dotenv').config();
require('./Models/db');
const PORT = process.env.PORT || 8080;

app.get('/', (req, res) => {
    res.send('Backend API is running ✅');
});

app.get('/ping', (req, res) => {
    res.send('PONG');
});


app.use(bodyParser.json());

app.use('/auth', AuthRouter);
app.use('/products', ProductRouter);
app.use('/expenses', ensureAuthenticated, ExpenseRouter)
app.use(cors({
  origin: [
    "http://localhost:5173",               // dev frontend
    "https://expense-tracker-frontend-one-iota.vercel.app/" 
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));


app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`)
})
