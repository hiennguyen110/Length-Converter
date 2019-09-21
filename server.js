const express = require("express");
const bodyParser = require("body-parser");
const validator = require("validator");
const chalk = require("chalk");

const success_promt = chalk.bold.green.inverse;
const warning_promt = chalk.bold.yellow.inverse;
const error_promt = chalk.bold.red.inverse;
const inform_promt = chalk.bold.white.inverse;

const server = express();
server.set("view engine", "ejs");
server.use(bodyParser.urlencoded({extended: true}));
server.use(express.static("public"));

server.get("/", function(req, res){
    res.render("converter", {
        resultOfMiles: "0", 
        resultOfFeet: "0", 
        resultOfInches: "0",
    });
});

server.post("/", function(req, res){
    var initialLength = req.body.initialLength;
    if (validator.isNumeric(initialLength) == true){
        var miles, feet, inches;
    initialLength = Number(initialLength);

    miles = parseInt(initialLength / 63360);
    if (miles === 0){
        feet = parseInt(initialLength / 12);
        if (feet === 0){
            inches = initialLength;
            console.log(initialLength + " inches is " + miles + " miles " + feet + " feet " + inches + " inches.");
        } else {
            var inches = initialLength % 12;
            console.log(initialLength + " inches is " + miles + " miles " + feet + " feet " + inches + " inches.");
        }
    } else {
        var remainderInch = initialLength % 63360;
        feet = parseInt(remainderInch / 12);
        if (feet === 0){
            inches = remainderInch;
            console.log(initialLength + " inches is " + miles + " miles " + feet + " feet " + inches + " inches.");
        } else {
            inches = remainderInch % 12;
            console.log(initialLength + " inches is " + miles + " miles " + feet + " feet " + inches + " inches.");
        }
    }

    res.render("converter", {
        resultOfMiles: miles, 
        resultOfFeet: feet, 
        resultOfInches: inches,
    });
    } else {
        console.log(error_promt("Invalid input from the user !!!"));
        console.log(warning_promt("Redirect them to the home page !!!"));
        res.render("400-error");
    }
});

server.post("/pagenotfound-404", function(req, res){
    res.redirect("/");
});

server.post("/badrequest-400", function(req, res){
    res.redirect("/");
});

server.get("*", function(req, res){
    res.render("404-error");
});

server.listen(process.env.PORT || 3000, function(req, res){
    console.log("Server is listening ... ");
    console.log("Ready to handle request ...");
});