import express, { urlencoded } from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";

mongoose.connect('mongodb+srv://kien:Kien12032003@cluster0.aijsptr.mongodb.net/todolists', { useNewUrlParser: true });

const PORT = 3000;
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('./public'))


const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thusday", "Friday", "Satusday"];
const months = ["January", "February", "March", "April", "May", "June", "July",
    "August", "September", "October", "November", "December"];
const date = new Date();
const day = days[date.getDay()];


const itemSchema = new mongoose.Schema({
    todo: String
})



const Item = mongoose.model('Item', itemSchema);

const listSchema = new mongoose.Schema({
    name: String,
    items: [itemSchema]
})

const List = new mongoose.model("LIST", listSchema);


console.log(date)
app.get('/', async (req, res) => {
    let items = await Item.find();
    res.render("index.ejs", {
        title: day + ", " + months[date.getMonth()] + " " + date.getDate(),
        list: {
            name: 'home',
            items
        }
    });
})

app.get('/:customList', async (req, res) => {
    const listName = req.params.customList;
    const currentlist = await List.findOne({name: listName});
    if (currentlist) {
        console.log('list is exist!')
        res.render("index.ejs", {
            title: listName,
            list: currentlist
        });
    } else {
        const list = new List({
            name: listName,
            items: []
        })
        list.save();
        console.log("created list!");
        res.render("index.ejs", {
            title: listName,
            list: list
        });
    }
})

app.post('/', async (req, res) => {
    const data = req.body;
    const item = new Item({
        todo: data.newItem
    })
    const listName = data.list;
    if(listName =='home') { 
        item.save()
        res.redirect('/');
    } else {
        const list =  await List.findOne({name: listName});
        console.log('ádfasdf')

        console.log(typeof list.items)
        list.items.push(item);
        list.save();
        res.redirect("/" + listName)
    }
})

app.post('/delete', async (req, res) => {
    const id = req.body.checkbox;
    const listname = req.body.listname;
    console.log(id)
    if (listname == 'home') {
        await Item.findByIdAndRemove({_id: id})
        res.redirect('/')
    } else {
        await List.updateOne({name: listname}, {$pull: {items: {_id: id}}})
        res.redirect('/' + listname);
    }

})


app.listen(PORT, () => {
    console.log('listening on port: ' + PORT);
})
