function addClick() {
    const input = document.getElementById("diet").value;
    console.log(input);
    if (input === ""){
        const div = document.querySelector("#alert");
        div.textContent = "Diet Name is required";
    }
}
const btn = document.querySelector("#submit");
btn.addEventListener("click", addClick);