
function searchClick() {

    let content = document.getElementById("content").value;
    if (content === "") {
        content = "apple";
    }
    fetch(`https://api.spoonacular.com/food/ingredients/search?apiKey=af6efd59de2b4bb896d04c4fe7cfb355&number=1&query=${content}`, {
        method: "GET",
        headers: { 'Content-Type': 'application/json' }
    }
    ).then(res => res.json()).then(data => searchResultHandler(data.results[0]))
}

function searchResultHandler(data) {
    if (data === undefined) {
        alert('Food Not Found!');
        return;
    }
    const button = document.querySelector("button");
    fetch(`https://api.spoonacular.com/food/ingredients/${data.id}/information?apiKey=af6efd59de2b4bb896d04c4fe7cfb355&amount=1`, {
        method: "GET",
        headers: { 'Content-Type': 'application/json' }
    }).then(res => res.json()).then(data => {
        const img = document.querySelector("img");
        const bar = document.querySelector("#bar");
        bar.style.display = "none";
        const block = document.querySelector(".block");
        block.style.display = "inline-block";
        const myList = [];
        let i = 0;
        const li = document.createElement("li");
        const ul = document.querySelector("#nutritionList");
        const calorie = data.nutrition.nutrients.find(nutrient => {
            return nutrient.name === "Calories";
        })
        li.textContent = `${calorie.amount}${calorie.unit} Calories`;
        li.style = "font-weight: bold";
        ul.appendChild(li);
        data.nutrition.nutrients = data.nutrition.nutrients.filter(nutrient => {
            return nutrient.amount !== 0 && nutrient.name !== "Calories";
        });
        for (let i = 0; i < 5; i++) {
            const nutrient = data.nutrition.nutrients[i]
            const li = document.createElement("li");
            const ul = document.querySelector("#nutritionList");
            li.textContent = `${nutrient.amount}${nutrient.unit} ${nutrient.name}`;
            ul.appendChild(li);
        };
        img.src = `https://spoonacular.com/cdn/ingredients_250x250/${data.image}`;
    });
}
function main() {
    const btn = document.querySelector("button");
    btn.addEventListener("click", searchClick)

}
main();