import express from 'express';
import path from 'path';
import session from 'express-session';
import { fileURLToPath } from 'url';
import './db.mjs';
import mongoose from 'mongoose';
import './public/foodInfo.mjs';
import pkg from 'express-openid-connect';
const { auth, requiresAuth } = pkg;

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.set('view engine', 'hbs');
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '/public/')));
app.use(express.json({ limit: "1mb" }));
app.use(
    session({
        secret: "secret",
        resave: false,
        saveUninitialized: true
    })
);

const config = {
    authRequired: false,
    auth0Logout: true,
    baseURL: 'http://localhost:3000',
    clientID: 'LgCYS8HVDZZ1vzrd4QYZx6biXP3UKAUN',
    issuerBaseURL: 'https://dev-onzeae1v5m4a3vmt.us.auth0.com',
    secret: 'wregugiywfgauisfgiasgfasufgiaujgfiasuygfiasdgfaisg'
  };
  app.use(auth(config));


const Diet = mongoose.model("Diet");
const Food = mongoose.model("Food");
let dietName;
let dietId;


app.get("/", requiresAuth(), (req, res) => {
    Diet.find({}, (err, diets) => {
        res.render("index", { diets: diets });
    })
})
app.post("/", async (req, res) => {
    dietName = req.body.dietName;
    const diets = await Diet.find({ dietName: dietName });
    const id = diets.length + 1 || 1;
    const newDiet = new Diet({
        dietName: dietName,
        food: [],
        id: id
    });
    newDiet.save((err) => {
        if (!err) {
            dietId = newDiet._id;
            res.redirect("/new_diet");
        } else {
            console.log(err)
        }
    })
})
app.get("/new_diet", requiresAuth(), async (req, res) => {
    const diet = await Diet.findOne({ _id: dietId });
    if (diet) {
        const food = diet.food;
        res.render("new_diet", { dietName: diet.dietName });
    } else {

        res.redirect('/');
    }

})
app.post("/new_diet", async (req, res) => {
    const diet = await Diet.findOne({ _id: dietId });
    req.body.diets.forEach(async food => {
        const newFood = new Food({
            foodName: food.foodName,
            quantity: food.quantity
        })
        diet.food.push(newFood._id);
        await newFood.save();
    });
    diet.save();
})

app.get('/favicon.ico', (req, res) => {
    res.send();
})

app.get('/:dietName', requiresAuth(), async (req, res) => {
    const temp = req.params.dietName.split('_');
    const dietName = temp[0];
    const id = temp[1];
    const wantedDiet = await Diet.findOne({ dietName: dietName, id: id });
    let wantedFood = wantedDiet.food;
    for (let i = 0; i < wantedFood.length; i++) {
        const foodInfo = await Food.findOne({ _id: wantedFood[i] })
        wantedFood[i] = foodInfo;
    }

    res.render('diet-detail', { dietName: dietName, foods: wantedFood });

})
app.listen(process.env.PORT || 3000);