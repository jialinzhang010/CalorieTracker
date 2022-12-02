function addClick() {
    const input = document.getElementById("diet").value;
    console.log(input);
    if (input === ""){
        const div = document.createElement("div");
        div.textContent = "Diet Name is required";
        const main = document.querySelector("#main");
        main.appendChild(div);
    }
}
const btn = document.querySelector("#submit");
btn.addEventListener("click", addClick);