import express from 'express';
// impORT FILE BUT NOT WORKING WHEN IT implemented in the code so to run i will use the below code
//import dotenv from 'dotenv';
//dotenv.config();


const app = express();
const PORT = process.env.PORT||8008;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    
})
