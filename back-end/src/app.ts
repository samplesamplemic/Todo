import  express  from "express";
import 'express-async-error';
import cors from "cors";
import multer  from "multer";
import prisma  from "./client";

const app = express();

//middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

const corsOrigin = "http://localhost:3000";
app.use( 
    cors({
      origin: [corsOrigin],
      methods: ["GET", "POST"],
      credentials: true,
    })
  );


//routes
app.get('/todos', async(req, res) => {
    const todos = await prisma.todo.findMany();
    res.json(todos)
})


const upload = multer({dest: "uploads/", limits: { fieldSize: 25 * 1024 * 1024 }})

app.all(`/upload`, upload.array('data'),  async(req, res) => {
    const parsed = JSON.parse(req.body.data);
    console.log(parsed);
    
    const todos = await prisma.todo.create({
        data:{
            image: req.body.image,
            todo: parsed.todo,
            description: parsed.description,
            checkbox: parsed.checkbox
        }
    })
})

app.all(`/delete`, upload.array('id'), async (req, res) => {
     
        const deltodo = await prisma.todo.deleteMany({
            where: {id: +req.body.id},
        }).catch()
    
})


app.all('/update',upload.array('data'), async(req, res) => {
    const parsed = JSON.parse(req.body.data);
    const updates = await prisma.todo.update({
        where: {id: +req.body.id},
data:{
    image: req.body.image ,
    todo: parsed.todo,
    description: parsed.description,
    checkbox: parsed.checkbox
}
    })
})

export default app;