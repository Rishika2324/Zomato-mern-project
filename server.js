// start server
require('dotenv').config();
console.log('Using Node', process.version);
console.log('Resolving app at', require.resolve('./src/app'));
const app = require('./src/app'); 
try {
    const expressPkg = require('express/package.json');
    console.log('Express version', expressPkg.version);
} catch (e) {}
const connectDB = require('./src/db/db');

connectDB();

app.listen(3000, () => {
    console.log("Server is running on port 3000");
})
    



