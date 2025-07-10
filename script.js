// sketch board is the div in very center
sketchBoard = document.querySelector("#sketch-board");
square = document.createElement("div");
square.classList.add("square");

const noOfBoxes = 128; // hard coded the value for now
const dimension = Math.sqrt(noOfBoxes); // give the number of boxes on each dimension
const percent = 100 / dimension; // give the percentage for width / height

// use flex to generate rows, with each row being a flex box itself for columns

// loop for generating rows
for (let i = 0; i < dimension; i++) {
    row = document.createElement("div");
    row.classList.add("row");
    row.style.height = `${percent}%`;
    sketchBoard.appendChild(row);

    // loop for generating columns / boxes within each row
    for (let i = 0; i < dimension; i++) {
        column = document.createElement("div");
        column.classList.add("box");
        column.style.width = `${percent}%`;
        row.appendChild(column);
    }
}

// to color only when holding mouse button
let isMouseDown = false;
document.addEventListener("mousedown", () => {isMouseDown = true;});
document.addEventListener("mouseup", () => {isMouseDown = false;});

const boxes = document.querySelectorAll(".box"); // select all boxes, returns a NodeList
boxes.forEach(box => {
    box.addEventListener("mouseenter", () => {
        if (isMouseDown) {
            box.style.backgroundColor = "black";
        }
    });
});

//summar of code above
//so first we applied event listener to each box, which could've been done by a traditional function syntax and then each event listener calls a function (arrow function in this case, could've been a traditional syntax) and changes color