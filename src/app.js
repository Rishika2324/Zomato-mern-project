//create Server 
const express =require('express');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/auth.routes');


const app = express();
app.use(cookieParser());
app.use(express.json());

// log incoming requests for debugging
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
    next();
})

app.get("/", (req,res) => {
    res.send("Hello World");
})
// Temporary health check to verify /api/auth mount works
app.get('/api/auth/health', (req, res) => {
    res.status(200).json({ status: 'ok' });
})
// Confirm base mount responds
app.get('/api/auth', (req, res) => {
    res.status(200).json({ mounted: true });
})
app.use('/api/auth', authRoutes);



module.exports = app;


