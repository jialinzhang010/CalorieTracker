import mongoose from 'mongoose';
import '../db.mjs';

const FoodInfo = mongoose.model("FoodInfo");

const beef = new FoodInfo({
    name: 'beef',
    category: 'meat',
    calorie: 250.5,
    unit: 'g'
})

const pork = new FoodInfo({
    name: 'pork',
    category: 'meat',
    calorie: 242.1,
    unit: 'g'
})

const chicken = new FoodInfo({
    name: 'chicken',
    category: 'meat',
    calorie: 239,
    unit: 'g'
})

const lettuce = new FoodInfo({
    name: 'lettuce',
    category: 'vegetable',
    calorie: 14.8,
    unit: 'g'
})

const tomato = new FoodInfo({
    name: 'tomato',
    category: 'vegetable',
    calorie: 17.7,
    unit: 'g'
})

const potato = new FoodInfo({
    name: 'potato',
    category: 'vegetable',
    calorie: 76.7,
    unit: 'g'
})

const spanich = new FoodInfo({
    name: 'spanich',
    category: 'vegetable',
    calorie: 23.2,
    unit: 'g'
})
FoodInfo.count((err, count) => {
    if (count === 0) {
    beef.save();
    pork.save();
    chicken.save();
    lettuce.save();
    tomato.save();
    potato.save();
    spanich.save();
    }
})


