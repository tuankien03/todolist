import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
    todo: String
})



const Item = mongoose.model('Item', itemSchema);

export {Item, itemSchema};
