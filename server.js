const express = require("express");
const bodyParser = require("body-parser");

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
});

server.listen(3000, function(req, res){
    console.log("Server is listening ... ");
    console.log("Ready to handle request ...");
});