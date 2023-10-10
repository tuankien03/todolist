import express, { urlencoded } from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import listRouter from "./routes/list.js";
mongoose.connect('mongodb+srv://kien:Kien12032003@cluster0.aijsptr.mongodb.net/todolists', { useNewUrlParser: true });

const PORT = 3000;
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('./public'))
app.use('/', listRouter)

app.listen(PORT, () => {
    console.log('listening on port: ' + PORT);
})
