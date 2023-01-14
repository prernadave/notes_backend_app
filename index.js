const express = require('express');
const { connection } = require('./config/db');
const { authentication } = require('./middlewares/authentication');
const { notesroute } = require('./routes/notes.routers');
const { route } = require('./routes/user.routes');


const cors = require('cors')


require('dotenv').config()

// {
//   "username": "ayushi",
//   "date_of_birth": "2001-12-03",
//   "role": "student",
//   "location": "goa",
//   "password": "123",
//   "email": "soniayushi345@gmail.com",
//   "confirm_password": "123"
// }


// {
//     "name":"diya",
//     "password": "4321",
//     "email": "gita@gmail.com",
//     "age":24
   
// }
const app = express();
app.use(express.json())


app.use(cors())

app.use("/user", route)
app.use(authentication)
app.use("/notes", notesroute)


app.get("/", (req, res) => {
    res.send("welcome to home page....")
})



app.listen(process.env.port || 8000, async () => {
    try {
        await connection
        console.log("connected to database");
    } catch (error) {
        console.log(error);
        console.log("can not connect to db");
    }
    console.log(`server running at ${process.env.port}`);
})