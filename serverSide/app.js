let express = require("express")
let fs = require("fs")
let cors = require('cors')
let path = require("path")
let app = express();
let socket = require("socket.io")
let port = 3000;
app.use(cors())
let server = app.listen(port, () => {
    console.log(`listening on port: ${port}`);
})
let io = socket(server);
io.on("connection", (soc) => {
    console.log(`new: ${soc.id}`);
    soc.on("moves", () => {

    })
})