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

// dump all registered routes at startup
function logRegisteredRoutes() {
    try {
        const seen = new Set();
        const routes = [];
        app._router.stack.forEach((layer) => {
            if (layer.route && layer.route.path) {
                const methods = Object.keys(layer.route.methods)
                    .filter((m) => layer.route.methods[m])
                    .map((m) => m.toUpperCase())
                    .join(',');
                const key = `${methods} ${layer.route.path}`;
                if (!seen.has(key)) {
                    seen.add(key);
                    routes.push(key);
                }
            } else if (layer.name === 'router' && layer.handle?.stack) {
                layer.handle.stack.forEach((r) => {
                    if (r.route && r.route.path) {
                        const methods = Object.keys(r.route.methods)
                            .filter((m) => r.route.methods[m])
                            .map((m) => m.toUpperCase())
                            .join(',');
                        const key = `${methods} ${layer.regexp?.fast_slash ? '/' : ''}${r.route.path}`;
                        if (!seen.has(key)) {
                            seen.add(key);
                            routes.push(key);
                        }
                    }
                })
            }
        })
        console.log('Registered routes:', routes);
    } catch (e) {
        console.log('Could not dump routes', e.message);
    }
}

logRegisteredRoutes();

// final 404 logger
app.use((req, res) => {
    console.log(`404 for ${req.method} ${req.originalUrl}`);
    res.status(404).send(`Cannot ${req.method} ${req.originalUrl}`);
})

module.exports = app;


