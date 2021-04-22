var express = require("express")
var bodyParser = require("body-parser")
var mongoose = require("mongoose")
const PORT = process.env.PORT || 3000;

const app = express()

app.use(bodyParser.json())
app.use(express.static('public'))
app.use(bodyParser.urlencoded({
    extended: true
}))


mongoose.connect('mongodb+srv://Smita262:Smita262@cluster0.mksr7.mongodb.net/vichayanDatabase?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

var db = mongoose.connection;

db.on('error', () => console.log("Error in Connecting to Database"));
db.once('open', () => console.log("Connected to Database"))

app.post("/", (req, res) => {
    var name = req.body.uname;
    var email = req.body.email;
    var phone = req.body.phone;
    var data = {
        "name": name,
        "email": email,
        "phone": phone,
    }
    db.collection('users').insertOne(data, (err, collection) => {
        if (err) {
            throw err;
        }
        console.log("Record Inserted Successfully");
    });
    return res.json({
        "status": true,
        "response": 200,
        "message": "Successful"
    });
})



app.get("/", (req, res) => {
    res.set({
        "Allow-access-Allow-Origin": '*'
    })
    return res.redirect('index.html');
});

app.listen(PORT, ()=>{
    console.log("Listening on PORT 3000");

}
    )

