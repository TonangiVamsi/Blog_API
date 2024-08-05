import express from 'express'
import { addblog, deleteblog, getAllBlogs, getbyid, getbyuserid, updateblog } from '../controllers/blog-controller.js'
const blogrouter = express.Router()

blogrouter.get('/',getAllBlogs)
blogrouter.post('/add',addblog)
blogrouter.put('/update/:id',updateblog)
blogrouter.get('/:id', getbyid)
blogrouter.delete('/:id',deleteblog)
blogrouter.get('/user/:id',getbyuserid)

export default blogrouter;
