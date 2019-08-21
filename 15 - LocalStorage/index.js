const addItems = document.querySelector(".add-items");
const itemsList = document.querySelector(".plates");
let items = JSON.parse(localStorage.getItem("items")) || [];
const clear = document.querySelector(".clear");
const checkAll = document.querySelector(".checkAll");
const uncheckAll = document.querySelector(".uncheckAll");

function addItem(e) {
    e.preventDefault();

    const text = this.querySelector("[name=item]").value;
    const item = {
        text,
        done: false
    };

    items.push(item);

    populateList(items, itemsList);
    localStorage.setItem("items", JSON.stringify(items));

    this.reset();
}

// Populating existing ul elements
function populateList(plates = [], platesList) {
    platesList.innerHTML = plates
        .map((plate, i) => {
            return `
                <li>
                    <input type="checkbox" data-index=${i} id="item${i}" ${
                plate.done ? "checked" : ""
            } />
                    <label for="item${i}">${plate.text}</label>
                </li>
            `;
        })
        .join("");
}

function toggleDone(e) {
    if (!e.target.matches("input")) return; // skip this unless it's an input

    const el = e.target;
    const index = el.dataset.index;

    items[index].done = !items[index].done;
    localStorage.setItem("items", JSON.stringify(items));

    populateList(items, itemsList);
}

function handleClear(e) {
    items = [];
    localStorage.removeItem("items");
    populateList(items, itemsList);
}

function handleCheck(e) {
    items.map(item => {
        item.done = e.target.name === "checkAll" ? true : false;
    });

    localStorage.setItem("items", JSON.stringify(items));
    populateList(items, itemsList);
}

addItems.addEventListener("submit", addItem);
itemsList.addEventListener("click", toggleDone);

// Buttons
clear.addEventListener("click", handleClear);
checkAll.addEventListener("click", handleCheck);
uncheckAll.addEventListener("click", handleCheck);

populateList(items, itemsList);
