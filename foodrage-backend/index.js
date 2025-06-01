
const dotenv = require("dotenv");
dotenv.config();
const app = require("./app")
const connectDatabase = require("./config/database")




connectDatabase();
// Start server
const server = app.listen(process.env.PORT || 3000,()=>{

console.log(`server is running at http://localhost:${process.env.PORT}`)
});

