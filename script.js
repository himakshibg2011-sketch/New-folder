let paintNumber = 0;

const paintContainer = document.getElementById("paintContainer");
const createBtn = document.getElementById("generateBtn");
const addBtn = document.getElementById("addPaintBtn");
const clearBtn = document.getElementById("clearBtn");
const saveBtn = document.getElementById("saveBtn");
const mixBtn = document.getElementById("mixBtn");
const paintCountInput = document.getElementById("paintCount");


function createPaintBox(number) {

    const box = document.createElement("div");
    box.className = "paint-box";

    box.innerHTML = `
    <h2>Paint ${number}</h2>

    <label>HEX/RGB Colour Code</label>
    <input type="text" class="paintColour" placeholder="#FFFFFF or rgb(255,255,255)">

    <label>Number Of Drops</label>
    <input type="number" class="paintDrops" min="1" placeholder="Drops">
     `;

     paintContainer.appendChild(box);

}

createBtn.addEventListener("click", function () {

    paintContainer.innerHTML = "";

    paintNumber = 0;

    let total = parseInt(paintCountInput.value);

    if (isNaN(total) || total < 1) {
        alert("Please enter a valid number of paints.");
        return;
    }

    for (let i = 1; i <= total; i++) {
        paintNumber++;
    createPaintBox(paintNumber);

    }
});


addBtn.addEventListener("click", function () {

    paintNumber++;

    createPaintBox(paintNumber);

});

clearBtn.addEventListener("click", function () {

    if (confirm("Clear everything?")) {

        document.querySelectorAll("input").forEach(input=> {
            input.value = "";

        });

        paintContainer.innerHTML = "";

        paintNumber = 0;

        document.getElementById("colourPreview").style.background = "white";

    }

});

saveBtn.addEventListener("click", function () {

    alert("Recipe saved!");
});


mixBtn.addEventListener("click", function () {

    const colours = document.querySelectorAll(".paintColour");
    const drops = document.querySelectorAll(".paintDrops");

    let totalDrops = 0;

    let red = 0;
    let green = 0;
    let blue = 0;

    for (let i = 0; i < colours.length; i++) {

        let colour = colours[i].value.trim();
        let drop = parseInt(drops[i].value);

        if (!colour.startsWith("#")) {
            alert("Please enter HEX colours only for now.");
            return;
        }

        if (colour.length !==7) {
            alert("Invalid HEX colour.");
            return;
        }

        let r = parseInt(colour.substring(1,3),16);
        let g = parseInt(colour.substring(3,5),16);
        let b = parseInt(colour.substring(5,7),16);

        red += r * drop;
        green += g * drop;
        blue += b * drop;

        totalDrops += drop;

    }

    red = Math.round(red / totalDrops);
    green = Math.round(green / totalDrops);
    blue = Math.round(blue / totalDrops);

    let mixedColour =
    "#" +
    red.toString(16).padStart(2,"0") +
    green.toString(16).padStart(2,"0") +
    blue.toString(16).padStart(2,"0");

    document.getElementById("colourPreview").style.background = mixedColour;

    document.getElementById("hexValue").textContent = mixedColour.toUpperCase();

    document.getElementById("rgbValue").textContent =
    `rgb(${red}, ${green}, ${blue})`;

    document.getElementById("totalDrops").textContent = totalDrops;

    document.getElementById("shadeName").textContent = "Custom Shade";

});