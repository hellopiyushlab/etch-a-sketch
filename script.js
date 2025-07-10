sketchBoard = document.querySelector("#sketch-board");
square = document.createElement("div");
square.classList.add("square");

const noOfBoxes = 64; // hard coding the value for now
const dimension = Math.sqrt(noOfBoxes);
const percent = 100 / dimension;

// using flex to generate rows, with each row being a flex box itself for columns
for (let i = 0; i < dimension; i++) {
    row = document.createElement("div");
    row.classList.add("row");
    row.style.height = `${percent}%`;
    sketchBoard.appendChild(row);
    for (let i = 0; i < dimension; i++) {
        column = document.createElement("div");
        column.classList.add("column");
        column.style.width = `${percent}%`;
        column.setAttribute("id", "boxes");
        row.appendChild(column);
    }
}