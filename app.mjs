import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import './db.mjs';
import mongoose from 'mongoose';
import './public/foodInfo.mjs';
import pkg from 'express-openid-connect';
import * as dotenv from 'dotenv';
dotenv.config();
const { auth, requiresAuth } = pkg;

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.set('view engine', 'hbs');
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '/public/')));
app.use(express.json({ limit: "1mb" }));

const config = {
    authRequired: false,
    auth0Logout: true,
    baseURL: process.env.BASE_URL,
    clientID: process.env.CLIENT_ID,
    issuerBaseURL: process.env.ISSUER_BASE_URL,
    secret: process.env.SECRET
};

app.use(auth(config));

const Diet = mongoose.model("Diet");
const Food = mongoose.model("Food");
const FoodInfo = mongoose.model("FoodInfo");

let dietName;
let dietId;
let filter = 0;

app.get("/", requiresAuth(), (req, res) => {
    res.render("index", {user: req.oidc.user});
});

app.post("/", async (req, res) => {
    dietName = req.body.dietName;
    const diets = await Diet.find({ dietName: dietName });
    const id = diets.length + 1 || 1;
    const newDiet = new Diet({
        dietName: dietName,
        food: [],
        id: id,
        userEmail: req.oidc.user.email
    });
    newDiet.save((err) => {
        if (!err) {
            dietId = newDiet._id;
            res.redirect("/new_diet");
        } else {
            res.status(400);
            res.send("Error!");
        }
    });
});

app.get("/info", requiresAuth(), async (req, res) => {
    const diets = await Diet.find({userEmail: req.oidc.user.email});
    const intake = diets.reduce((calorie, curr) => {
        return calorie + curr.totalCalorie;
    }, 0);
    res.render("info", {count: diets.length, intake: intake, user: req.oidc.user});
});

app.get("/new_diet", requiresAuth(), async (req, res) => {
    const diet = await Diet.findOne({ _id: dietId });
    if (diet) {
        res.render("new_diet", { dietName: diet.dietName, user: req.oidc.user });
    } else {
        res.redirect('/');
    }
});

app.post("/new_diet", async (req, res) => {
    const diet = await Diet.findOne({ _id: dietId });
    req.body.diets.forEach(async food => {
        const newFood = new Food({
            foodName: food.foodName,
            quantity: food.quantity
        });
        diet.food.push(newFood._id);
        await newFood.save();
    });
    await diet.save();
    calcCalorie(diet._id);
    dietId = 0;
});

async function calcCalorie(id) {
    let calorie = 0;
    const diet = await Diet.findOne( {_id: id});
    for (let i = 0; i < diet.food.length; i++) {
        const foodDetail = await Food.findOne( { _id: diet.food[i] });
        const foodInfo = await FoodInfo.findOne({ name: foodDetail.foodName });
        calorie += foodInfo.calorie * foodDetail.quantity;
    }
    diet.totalCalorie = calorie;
    await diet.save();
}


app.get("/diets", requiresAuth(), async (req, res) => {
    const diets = await Diet.find({ userEmail: req.oidc.user.email });
    if (!diets) {
        return;
    }
    const filtered = diets.filter(diet => {
        return diet.totalCalorie >= filter;
    });
    filter = 0;
    res.render("diets", { diets: filtered, user: req.oidc.user });
});

app.post("/diets", async (req, res) => {
    filter = req.body.filter;
    res.redirect("/diets");
    
});

app.get("/search", requiresAuth(), (req, res) => {
    res.render("search", {user: req.oidc.user});
});

app.get('/favicon.ico', (req, res) => {
    res.send();
});

app.get('/:dietName', requiresAuth(), async (req, res) => {
    const temp = req.params.dietName.split('_');
    const dietName = temp[0];
    const id = temp[1];
    const wantedDiet = await Diet.findOne({ dietName: dietName, id: id });
    if (wantedDiet) {
        let wantedFood = wantedDiet.food;
        wantedFood = wantedFood.map(async id => {
            const temp = await Food.findOne({_id: id});
            return temp;
        });
        for (let i = 0; i < wantedFood.length; i++) {
            wantedFood[i].then(data=>{
                wantedFood[i] = data;
            });
        }
        res.render('diet-detail', { dietName: dietName, foods: wantedFood, user: req.oidc.user, calorie: wantedDiet.totalCalorie });
    } else {
        res.redirect('/');
    }
});


app.listen(process.env.PORT || 3000);

