let paintNumber = 0;

const paintContainer = document.getElementById("paintContainer");
const createBtn = document.getElementById("generateBtn");
const addBtn = document.getElementById("addPaintBtn");
const clearBtn = document.getElementById("clearBtn");
const saveBtn = document.getElementById("saveBtn");
const mixBtn = document.getElementById("mixBtn");
const paintCountInput = document.getElementById("paintCount");
const removeBtn = document.getElementById("removePaintBtn");
const copyHexBtn = document.getElementById("copyHexBtn");
const copyRgbBtn = document.getElementById("copyRgbBtn");


function createPaintBox(number) {

    const box = document.createElement("div");
    box.className = "paint-box";

    box.innerHTML = `
    <h2>Paint ${number}</h2>

    <label>HEX/RGB Colour Code</label>

    <input
    type="text"
    class="paintColour"
    placeholder="Example: #FF5733 or rgb(255,87,51)"
    >

    <small class="colourHint">
    Accepted formats: <strong>#RRGGBB</strong> or <strong>rgb(r,g,b)</strong>
    </small>

    <label>Number Of Drops</label>
    <input
    type="number"
    class="paintDrops"
    min="1"
    placeholder="Drops"
    >
    `;
    

     paintContainer.appendChild(box);

}

if (createBtn) {

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


removeBtn.addEventListener("click", function () {

    const paintBoxes = document.querySelectorAll(".paint-box");

    if (paintBoxes.length > 0) {

        paintBoxes[paintBoxes.length - 1].remove();
        paintNumber--;

    } else {
        alert("There are no paint boxes to remove.");
    }

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

    const recipeName = document.getElementById("recipeName").value.trim();

    if (recipeName === "") {

        alert("Please enter a recipe name.");
        return;
    }

    if (document.getElementById("hexValue").textContent === "-") {

        alert("Please mix the colours before saving.");
        return;

    }

    const recipe = {

        name: recipeName,
        shade: document.getElementById("shadeName").textContent,
        hex: document.getElementById("hexValue").textContent,
        rgb: document.getElementById("rgbValue").textContent,
        drops: document.getElementById("totalDrops").textContent,

        date: new Date().toLocaleString()

    };

    let recipes = JSON.parse(localStorage.getItem("recipes")) || [];

    recipes.push(recipe);

    localStorage.setItem("recipes", JSON.stringify(recipes));
    
    alert("Recipe saved successfully!");
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

        let r, g, b;

        if (colour.startsWith("#")) {

            if (colour.length !==7) {
                alert("Invalid HEX colour.");
                return;
            }

            r = parseInt(colour.substring(1,3),16);
            g = parseInt(colour.substring(3,5),16);
            b = parseInt(colour.substring(5,7),16);
        }


        else if (colour.toLowerCase().startsWith("rgb")) {

            let values = colour.match(/\d+/g);

            if (!values || values.length !==3) {
                alert("Invalid RGB colour.");
                return;
            }

            r = parseInt(values[0]);
            g = parseInt(values[1]);
            b = parseInt(values[2]);

            if (
                r < 0 || r > 255 ||
                g < 0 || g > 255 ||
                b < 0 || b > 255

            ) {
                alert("RGB values must be between 0 and 255.");
                return;
            }
        }

        else {

            alert("Enter a HEX (#RRGGBB) or RGB (rgb(r,g,b)) colour.");
            return;
        }

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



copyHexBtn.addEventListener("click", function(){

    navigator.clipboard.writeText(
        document.getElementById("hexValue").textContent

    );

    alert("HEX copied!");

});


copyRgbBtn.addEventListener("click", function() {

    navigator.clipboard.writeText(
        document.getElementById("rgbValue").textContent

    );

    alert("RGB copied!");

});

}

/* =========================== HISTORY PAGE heheh=========================== */

const historyContainer = document.getElementById("historyContainer");
const clearHistoryBtn = document.getElementById("clearHistoryBtn");
const searchInput = document.getElementById("searchInput");

if (historyContainer) {

    displayRecipes();

}

if (searchInput) {

    searchInput.addEventListener("input", function () {

        displayRecipes(this.value);

    });
    
}

function displayRecipes(searchText = "") {

    historyContainer.innerHTML = "";

    let recipes =
    JSON.parse(localStorage.getItem("recipes")) || [];

    if (recipes.length === 0) {

        historyContainer.innerHTML =
        "<p style='text-align:center;'>No recipes saved yet.</p>";

        return;
    }

    recipes
    .filter(recipe =>
        recipe.name.toLowerCase().includes(searchText.toLowerCase())
    )
    .forEach((recipe, index) => {

        const card = document.createElement("div");

        card.className = "history-card";

        card.innerHTML = `
        <div class="history-top">
        
        <div>
        
        <h2>${recipe.name}</h2>
        <p><strong>Shade:</strong> ${recipe.shade}</p>
        </div>
        
        <div class="history-preview"
        style="background:${recipe.hex}">
        </div>
        
        </div>
        <p><strong>HEX:</strong> ${recipe.hex}</p>
        <p><strong>RGB:</strong> ${recipe.rgb}</p>
        <p><strong>Total Drops:</strong> ${recipe.drops}</p>
        <p><strong>Saved:</strong> ${recipe.date}</p>
        
        <button class="delete-btn"
        onclick="deleteRecipe(${index})">
        
        Delete Recipe
        
        </button>
        `;

        historyContainer.appendChild(card);

    });

}


function deleteRecipe(index) {

    const recipes =
    JSON.parse(localStorage.getItem("recipes")) || [];

    recipes.splice(index, 1);

    localStorage.setItem(
        "recipes",
        JSON.stringify(recipes)

    );

    displayRecipes();

}


if (clearHistoryBtn) {

    clearHistoryBtn.addEventListener("click", function () {

        if (confirm("Delete all saved recipes?")) {

            localStorage.removeItem("recipes");

            displayRecipes();
        }

    });

}