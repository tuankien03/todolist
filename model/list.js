import mongoose from "mongoose";
import { itemSchema } from "./item.js";
const listSchema = new mongoose.Schema({
    name: String,
    items: [itemSchema]
})

const List = new mongoose.model("LIST", listSchema);

export {List};
