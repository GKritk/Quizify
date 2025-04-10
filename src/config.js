const mongoose = require('mongoose');
const connection = mongoose.connect("mongodb://localhost:27017/testLogin")
    //to check connection is done or not
connection.then(() => {
        console.log("databases connected !!! ");
    })
    .catch(() => {
        console.log("databases not conenected ");
    });

//Schema making 
const loginSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

//collection making
const collection = new mongoose.model("user", loginSchema);

// exporting model or coleection
module.exports = collection;