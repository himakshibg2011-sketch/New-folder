let paintNumber = 0;

const paintContainer = document.getElementById("paintContainer");
const createBtn = document.getElementById("generateBtn");
const addBtn = document.getElementById("addPaintBtn");
const clearBtn = document.getElementById("clearBtn");
const saveBtn = document.getElementById("saveBtn");
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

    