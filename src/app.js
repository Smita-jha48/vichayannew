var express = require("express")
var bodyParser = require("body-parser")
const hbs = require("hbs");
const path = require("path");
var mongoose = require("mongoose")
const nodemailer = require("nodemailer")
const PORT = process.env.PORT || 3000;

const app = express()


const static_path = path.join(__dirname, "../public")
const template_path = path.join(__dirname, "../templates/views")
const partials_path = path.join(__dirname, "../templates/partials")

app.use(bodyParser.json())
app.use(express.static('public'))
app.use(bodyParser.urlencoded({
    extended: true
}))

app.set('view engine', "hbs");
app.set("views", template_path);
hbs.registerPartials(partials_path);

mongoose.connect('mongodb+srv://Smita262:Smita262@cluster0.mksr7.mongodb.net/vichayanDatabase?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

var db = mongoose.connection;

db.on('error', () => console.log("Error in Connecting to Database"));
db.once('open', () => console.log("Connected to Database"))

const usersSchema = {
    name: String,
    email: String,
    phone: String
}

const users = mongoose.model('users', usersSchema);

app.get('/admin', (req, res) => {
    users.find({}, function(err, user) {
        res.render('admin', {
            userList: user
        })
    })
})

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
    let transport = nodemailer.createTransport({
        service: 'gmail',
        auth: {
           user: 'smitasandilya10@gmail.com',
           pass: ''
        }
    });
    const message = {
        from: 'smitasandilya10@gmail.com', // Sender address
        to: data.email,         // List of recipients
        subject: 'Registered For Vichayan', // Subject line
        text: `${data.name} Have a great time exploring Vichayan`// Plain text body
    }
    transport.sendMail(message, function(err, info) {
        if (err) {
          console.log(err)
        } else {
          console.log(info);
        }
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
      return res.render("index");
});

app.get('/blog', function(req, res){
    res.render("blog");
});





app.listen(PORT, ()=>{
    console.log("Listening on PORT 3000");

})

