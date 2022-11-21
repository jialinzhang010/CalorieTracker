document.addEventListener("DOMContentLoaded", main);
let food;
let quantity;
let data = {diets : []};
function onClick() {
  const div = document.createElement("div");
  let quantity = document.getElementById("quantity").value;
  if (quantity === "") {
    quantity = 50;
  }
  let foodUnit = document.getElementById("food").value;
  foodUnit = foodUnit.split(" ");
  food = foodUnit[0];
  let unit = foodUnit[1];
  if (unit === "/") {
    unit = "";
  }
  div.textContent = quantity + unit + " * " + food;
  const foodDetail = {foodName: food, quantity: quantity};
  data.diets.push(foodDetail);
  const foodList = document.getElementById("foodList");
  foodList.appendChild(div);
}
function inputOnClick(evt) {
  fetch('/new_diet', {
    method: "POST",
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(data)
  })
}
function main() {
  const btn = document.querySelector("#dietBtn");
  const inputBtn = document.querySelector('#todayBtn');
  btn.addEventListener("click", onClick);
  inputBtn.addEventListener("click", inputOnClick);
}
export {food, quantity}
main();
