const mongoose = require(`mongoose`);
const dotenv = require('dotenv');
dotenv.config();


const url = `${process.env.DB_URL}`;

mongoose.set(`strictQuery`, true);

const connectDB = async ()=>{
    try{
        await mongoose.connect(url,{
            
        }).then(()=>{console.log(`connected`)})   
    }catch(e){
        console.log(e)
    }
}
module.exports = connectDB;