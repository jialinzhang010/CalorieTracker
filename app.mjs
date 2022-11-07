import express from 'express';
import path from 'path';
import session from 'express-session';
import { fileURLToPath } from 'url';
import './db.mjs';
import mongoose from 'mongoose';
import {readFile} from 'fs';

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.urlencoded({ extended: false }));
app.use(
    session({
        secret: "my secret",
        resave: false,
        saveUninitialized: true
    })
);
const Diet = mongoose.model("Diet");
app.set('view engine', 'hbs');

app.get("/test", (req, res) => {
    res.render("test");
})

app.get("/", (req, res) => {
    Diet.find({}, (err, diets) => {
        res.render("index", {diets: diets});
    })
})
app.get("/new_diet", (req, res) => {
    res.render("new_diet");
})
app.post("/new_diet", (req, res) => {
    const newDiet = new Diet ({
        dietName: req.body.dietName, food: req.body.food
    });
   
    newDiet.save((err) => {
        if (!err) {
            res.redirect('/');
        }else{
        console.error("must enter name and food");
        res.redirect("/new_diet");
        }
    });
})
app.listen(process.env.PORT || 3000, function(){
    console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
  });