import { Item } from "../model/item.js";
import { List } from "../model/list.js";

const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thusday", "Friday", "Satusday"];
const months = ["January", "February", "March", "April", "May", "June", "July",
    "August", "September", "October", "November", "December"];
const date = new Date();
const day = days[date.getDay()];

class ListController {

    


    getList = () => {
        return async (req, res) => {
            let items = await Item.find();
            res.render("index.ejs", {
                title: day + ", " + months[date.getMonth()] + " " + date.getDate(),
                list: {
                    name: 'home',
                    items
                }
            });
        }
    }

    getCustomList = () => {
        return async (req, res) => {
            const listName = req.params.customList;
            const currentlist = await List.findOne({ name: listName });
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
        }
    }

    updateList = () => {
        return async (req, res) => {
            const data = req.body;
            const item = new Item({
                todo: data.newItem
            })
            const listName = data.list;
            if (listName == 'home') {
                item.save()
                res.redirect('/');
            } else {
                const list = await List.findOne({ name: listName });
                console.log('ádfasdf')

                console.log(typeof list.items)
                list.items.push(item);
                list.save();
                res.redirect("/" + listName)
            }
        }
    }

    deleteList = () => {
        return async (req, res) => {
            const id = req.body.checkbox;
            const listname = req.body.listname;
            console.log(id)
            if (listname == 'home') {
                await Item.findByIdAndRemove({ _id: id })
                res.redirect('/')
            } else {
                await List.updateOne({ name: listname }, { $pull: { items: { _id: id } } })
                res.redirect('/' + listname);
            }

        }
    }
}

export default new ListController();