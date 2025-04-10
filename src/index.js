const express = require("express")
const path = require("path")
const bcrypt = require("bcrypt")
const collection = require("./config");
const ejs = require("ejs");


const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.render('login');
})
app.get('/home', (req, res) => {
    res.render('home');
})

app.post('/signup', async(req, res) => {
    const data = {
        email: req.body.email,
        password: req.body.password,
        name: req.body.name,
    }

    const exitingUser = await collection.findOne({ name: data.name });
    if (exitingUser) {
        res.send("user already exits . Please choose a different ");
    } else {
        const saltRounds = 10;
        const hashPassword = await bcrypt.hash(data.password, saltRounds);
        data.password = hashPassword;

        const userdata = await collection.insertMany(data);
        console.log(userdata);
    }

})

app.post("/login", async(req, res) => {
    console.log("isPasswordMatch")
    try {
        const check = await collection.findOne({ email: req.body.email });
        if (!check) {
            res.send("user name cannot found user ")
        }
        const isPasswordMatch = await bcrypt.compare(req.body.password, check.password);
        console.log(isPasswordMatch)
        if (isPasswordMatch) {
            console.log("riiiii")
            res.render("hone");
        } else {
            res.send("Wrong Password ");
        }
    } catch {
        res.send("wrong detail");
    }
})

const port = 5000;
app.listen(port, () => {
    console.log(`server is running at http://localhost:${port}`)
})