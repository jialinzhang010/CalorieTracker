import mongoose from 'mongoose';


const DietSchema = new mongoose.Schema({
    dietName: {type: String, required: true},
    // diet consists of food
    food: [],
    id: {type: Number, required: true},
    userEmail: {type: String, required: true},
    totalCalorie: {type: Number, default: 0}

});
const FoodSchema = new mongoose.Schema({
    // retrieve information of this food from database which stores food information.
    foodName: {type: String, required: true},
    quantity: {type: Number, required: true}
});

const FoodInfoSchema = new mongoose.Schema({
    name: {type: String, required: true},
    calorie: {type: Number, required: true},
    unit: {type: String, required: true}
});

mongoose.model('Diet', DietSchema);
mongoose.model('Food', FoodSchema);
mongoose.model('FoodInfo', FoodInfoSchema);


mongoose.connect("mongodb://localhost:27017");
