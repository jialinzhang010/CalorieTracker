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
app.set('view engine', 'hbs');
app.use(express.urlencoded({ extended: false }));
app.use(
    session({
        secret: "secret",
        resave: false,
        saveUninitialized: true
    })
);
const Diet = mongoose.model("Diet");
const Food = mongoose.model("Food");
let dietName;

app.get("/test", (req, res) => {
    res.render("test");
})

app.get("/", (req, res) => {
    Diet.find({}, (err, diets) => {
        res.render("index", {diets: diets});
    })
})
app.post("/", (req, res) => {
    dietName = req.body.dietName;
    const newDiet = new Diet({
        dietName: dietName
    });
    newDiet.save((err) => {
        if (!err){
        req.header.dietId = newDiet._id;
        res.redirect("/new_diet");
        }else{
            console.log(err)
        }
    })
})
app.get("/new_diet", async(req, res) => {
    const diet = await Diet.findOne({_id: req.header.dietId});
    const food = diet.food;
    console.log(food)
    res.render("new_diet", {dietName: diet.dietName})
    
})
app.post("/new_diet", (req, res) => {
    const newFood = new Food ({
        foodName: req.body.food, quantity: req.body.quantity, unit: req.body.unit
    });
    newFood.save((err, food) => {
        if (!err) {
            Diet.findOne({_id: req.header.dietId}).populate("food").exec((err, diet)=>{
                if (!err){
                    diet.food.push(newFood._id);
                    diet.save();
                }else{
                    console.log(err)
                }
                
            })
            res.redirect("/new_diet");
        }else{
            console.log(err)
        res.redirect("/new_diet");
        }
    });
   
    
})
app.get('/:slug', (req, res) => {
    Diet.find({})
})
app.listen(process.env.PORT || 3000);