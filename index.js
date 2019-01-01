let express = require('express');
let cors = require('cors')
let bodyParser = require('body-parser')


let app = express();
let port = process.env.PORT || 3030

app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('./'))

app.listen(port, () => {
    console.log("Listening to port : ",port);
})
// app.get("/",(req,res)=>{
//     res.send("It Works...");
// })
