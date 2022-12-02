document.addEventListener("DOMContentLoaded", main);
let food;
let quantity;
const data = {diets : []};
function onClick() {
  const li = document.createElement("li");
  let quantity = document.getElementById("quantity").value;
  if (quantity === "") {
    quantity = 50;
  }
  const food = document.getElementById("food").value;
  li.textContent = quantity + "g" + " * " + food;
  const foodDetail = {foodName: food, quantity: quantity};
  data.diets.push(foodDetail);
  li.classList.add("list-group-item");
  li.classList.add("bg-transparent");
  const foodList = document.getElementById("foodList");
  foodList.appendChild(li);
}
function inputOnClick() {
  fetch('/new_diet', {
    method: "POST",
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(data)
  });
}
function main() {
  const btn = document.querySelector("#dietBtn");
  const inputBtn = document.querySelector('#todayBtn');
  btn.addEventListener("click", onClick);
  inputBtn.addEventListener("click", inputOnClick);
}
export {food, quantity};
main();
