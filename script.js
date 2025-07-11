const colorPicker   = document.getElementById("colorChoice");

let noOfBoxes       = 64; // initial number of boxes

createGrid(noOfBoxes); // initial grid

// get all pixel selector buttons
const eightBit      = document.querySelector("#eightBit");
const sixteenBit    = document.querySelector("#sixteenBit");
const thirtyTwoBit  = document.querySelector("#thirtyTwoBit");
const sixtyFourBit  = document.querySelector("#sixtyFourBit");
const oneTwentyEight = document.querySelector("#oneTwentyEight");

// add "click" event listeners to pixel selector buttons
// each event listener changes noOfBoxes & calls createGrid()
eightBit.addEventListener("click", () => {
    noOfBoxes = 8*8;
    createGrid(noOfBoxes);
}); // add click event listener to eightBit, use arrow function
sixteenBit.addEventListener("click", () => {
    noOfBoxes = 16*16;
    createGrid(noOfBoxes);
});
thirtyTwoBit.addEventListener("click", () => {
    noOfBoxes = 32*32;
    createGrid(noOfBoxes);
});
sixtyFourBit.addEventListener("click", () => {
    noOfBoxes = 64*64;
    createGrid(noOfBoxes);
});
oneTwentyEight.addEventListener("click", () => {
    noOfBoxes = 128*128;
    createGrid(noOfBoxes);
});

// eraser button
const eraser        = document.querySelector("#eraser");
eraser.addEventListener("click", () => {colorPicker.value = "#ffffff"})

// get upload & download buttons, and reference image div
const uploadButton  = document.querySelector("#uploadButton");
const downloadButton = document.querySelector("#downloadButton");
const referenceImage = document.querySelector("#referenceImage");
const imageInput = document.getElementById("imageUpload");

// add event listeners on upload and download button
uploadButton.addEventListener("click", () => {imageInput.click();});
imageInput.addEventListener("change", () => {
  const file = imageInput.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      referenceImage.style.backgroundImage = `url(${e.target.result})`;
      referenceImage.style.backgroundSize = 'contain';
      referenceImage.style.backgroundRepeat = 'no-repeat';
      referenceImage.style.backgroundPosition = 'center';
    };
    reader.readAsDataURL(file);
  }
});
downloadButton.addEventListener("click", () => {
    const originalBoxShadow = sketchBoard.style.boxShadow;
    sketchBoard.style.boxShadow = "none";
    html2canvas(sketchBoard).then(canvas => {
        const link = document.createElement("a");
        link.download = "sketch.png"; // name of the downloaded file
        link.href = canvas.toDataURL("image/png");
        link.click();
        sketchBoard.style.boxShadow = originalBoxShadow;
    });
});

// to color only when holding left click
let isMouseDown     = false;
document.addEventListener("mousedown", () => {isMouseDown = true;});
document.addEventListener("mouseup", () => {isMouseDown = false;});

// createGrid function
function createGrid(noOfBoxes) {

    const dimension = Math.sqrt(noOfBoxes);
    const percent   = 100/dimension; // required to decide the height of each box in grid

    // remove old grid
    const sketchBoard = document.getElementById("sketchBoard");
    while (sketchBoard.firstChild) {
        sketchBoard.removeChild(sketchBoard.firstChild);
    }

    // use flex to generate rows
    // each row is a flex box for columns within row

    // loop to generate rows
    for (let i = 0; i < dimension; i++) {
        const row = document.createElement("div");
        row.classList.add("row");
        row.style.height = `${percent}%`;
        sketchBoard.appendChild(row);

        // inner loop to generate columns / boxes
        for (let j = 0; j < dimension; j++) {
            const column = document.createElement("div");
            column.classList.add("box");
            column.style.width = `${percent}%`;
            row.appendChild(column);
        }
    }

    // enable drawing
    const boxes = document.querySelectorAll(".box"); // select all boxes, returns a NodeList
    boxes.forEach(box => {
        box.addEventListener("mouseenter", () => {
            if (isMouseDown) {
                box.style.backgroundColor = colorPicker.value;
            }
        });
        box.addEventListener("click", () => {
            box.style.backgroundColor = colorPicker.value;
        });
    });
}