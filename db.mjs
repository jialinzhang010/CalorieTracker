import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
    username: {type: String, requried: true},
    password: {type: String, required: true},
    // the following keys are used to calculate the recommended calorie intake.
    gender: {type: String, required: true},
    age: {type: Number, required: true},
    height: {type: Number, required: true},
    weight: {type: Number, required: true},
    diets: [{type: mongoose.Schema.Types.ObjectId, ref: "Diet"}],
    calorie_intake: {type: Number, required: false},
})
const DietSchema = new mongoose.Schema({
    dietName: {type: String, required: true},
    // diet consists of food
    food: {type: String, required: true}
    // food: {type: mongoose.Schema.Types.ObjectId, ref: "Food"},
    // user: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
    // url: {type: String, required: true}
})
const FoodSchema = new mongoose.Schema({
    // retrieve information of this food from database which stores food information.
    foodName: {type: String, required: true},
    quantity: {type: Number, required: true},
    unit: {type: String, required: true}
})

const FoodInfoSchema = new mongoose.Schema({
    name: {type: String, required: true},
    category: {type: String, required: true},
    calorie: {type: Number, required: true},
    unit: {type: String, required: true}
})

mongoose.model('User', UserSchema);
mongoose.model('Diet', DietSchema);
mongoose.model('Food', FoodSchema);
mongoose.model('FoodInfo', FoodInfoSchema);

// is the environment variable, NODE_ENV, set to PRODUCTION? 
import fs from 'fs';
import path from 'path';
import url from 'url';
const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
let dbconf;
if (process.env.NODE_ENV === 'PRODUCTION') {
 // if we're in PRODUCTION mode, then read the configration from a file
 // use blocking file io to do this...
 const fn = path.join(__dirname, 'config.json');
 const data = fs.readFileSync(fn);

 // our configuration file will be in json, so parse it and set the
 // conenction string appropriately!
 const conf = JSON.parse(data);
 dbconf = conf.dbconf;
} else {
 // if we're not in PRODUCTION mode, then use
 dbconf = 'mongodb://localhost/jz4253';
}
mongoose.connect(dbconf);
// const FoodInfo = mongoose.model('FoodInfo');
// const beef = new FoodInfo({
//     name: 'beef',
//     category: 'meat',
//     calorie: 250.5,
//     unit: 'g'
// })
// beef.save();
// const lamb = new FoodInfo({
//     name: 'lamb',
//     category: 'meat',
//     calorie: 294,
//     unit: 'g'
// })
// lamb.save();
// const pork = new FoodInfo({
//     name: 'pork',
//     category: 'meat',
//     calorie: 242.1,
//     unit: 'g'
// })
// pork.save();
// const chicken = new FoodInfo({
//     name: 'chicken',
//     category: 'meat',
//     calorie: 239,
//     unit: 'g'
// })
// chicken.save();
// const fish = new FoodInfo({
//     name: 'fish',
//     category: 'meat',
//     calorie: 205.8,
//     unit: 'g'
// })
// fish.save();