import express from 'express';
import List from "../controllers/list-controller.js";
const list_router = express.Router();

list_router.get('/', List.getList());
list_router.get('/:customList', List.getCustomList());
list_router.post('/', List.updateList());
list_router.post('/delete',List.deleteList());

export default list_router;