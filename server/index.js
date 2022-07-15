const http=require("http");
const express=require("express");
const cors=require("cors");
const socketIO=require("socket.io");

const app=express();
const port=4500 || process.env.PORT; 

const users=[{}];


app.use(cors());
app.get("/",(req,res)=>{
    res.send("site is working");
})

const server=http.createServer(app);

const io=socketIO(server);
io.on("connection",(socket)=>{
    console.log("New connection");
    socket.on('joined',({ user })=>{
        users[socket.id]=user;
        console.log(`${user} has joined`);
        socket.broadcast.emit('userJoined',{user:"Admin",message:` ${users[socket.id]} has joined`});
        socket.emit('Welcome',{user:"Admin:",message:`welcome to the Chat, ${users [socket.id]} `});
    })
    socket.on('message',({message,id})=>{
        io.emit('sendMessage',{user:users[id],message,id})
    })
    
    socket.on('disconnect',()=>{
        socket.broadcast.emit('leave',{user:"Admin",message:`${users [socket.id]} has left`});
        console.log("User left the Chat");
    })
});


server.listen(port,()=>{
    console.log(`server is running on port http://localhost:${port}`);
})
