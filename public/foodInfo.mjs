import mongoose from 'mongoose';
import '../db.mjs';

const FoodInfo = mongoose.model("FoodInfo");

const beef = new FoodInfo({
    name: 'beef',
    calorie: 250.5,
    unit: 'g'
});

const pork = new FoodInfo({
    name: 'pork',
    calorie: 242.1,
    unit: 'g'
});

const chicken = new FoodInfo({
    name: 'chicken',
    calorie: 239,
    unit: 'g'
});

const lettuce = new FoodInfo({
    name: 'lettuce',
    calorie: 14.8,
    unit: 'g'
});

const tomato = new FoodInfo({
    name: 'tomatoes',
    calorie: 17.7,
    unit: 'g'
});

const potato = new FoodInfo({
    name: 'potatoes',
    calorie: 76.7,
    unit: 'g'
});

const spanich = new FoodInfo({
    name: 'spanich',
    calorie: 23.2,
    unit: 'g'
});

const apple = new FoodInfo({
    name: 'apple',
    calorie: 94.64,
    unit: 'g'
});
const salmon = new FoodInfo({
    name: 'salmon',
    calorie: 241.4,
    unit: 'g'
});
const shrimp = new FoodInfo({
    name: 'shrimp',
    calorie: 8.5,
    unit: 'g'
});
FoodInfo.remove();

beef.save();
pork.save();
chicken.save();
lettuce.save();
tomato.save();
potato.save();
spanich.save();
apple.save();
salmon.save();
shrimp.save();



