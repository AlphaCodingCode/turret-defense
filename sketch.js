// Any global variables can be defined up here
var tileNames = [];
var tileset;
let turret1img;
let turret2img;
var slimeImg;
let money = 60;
let turretAttached = null;
let turrets = [];
let minions = [];
const worldMap = [
["23", "23", "23", "23", "23", "23", "23", "23", "23", "23", "23", "23", "23", "23", "23", "21", "28", "12", "29", "1", "1", "22", "23", "23", "23", "23", "23", "23", "23", "23", "23", "23"],
["2", "2", "2", "2", "2", "2", "2", "2", "2", "2", "2", "24", "20", "20", "20", "16", "28", "15", "10", "3", "3", "17", "20", "20", "25", "2", "2", "2", "2", "2", "2", "2"],
["2", "2", "2", "2", "2", "2", "2", "2", "24", "20", "20", "16", "0", "1", "1", "1", "8", "10", "0", "1", "3", "3", "3", "3", "17", "20", "20", "20", "20", "20", "20", "25"],
["2", "2", "2", "2", "2", "2", "24", "20", "16", "1", "1", "0", "0", "0", "0", "0", "0", "0", "1", "3", "3", "3", "3", "3", "3", "3", "3", "3", "3", "3", "3", "22"],
["20", "25", "2", "2", "2", "24", "16", "1", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "1", "3", "3", "3", "3", "3", "3", "3", "3", "3", "3", "3", "3", "17"],
["0", "17", "20", "25", "2", "21", "0", "0", "0", "0", "0", "0", "1", "1", "1", "0", "0", "0", "1", "1", "1", "1", "3", "3", "3", "3", "3", "0", "0", "3", "3", "3"],
["26", "9", "0", "17", "20", "16", "0", "0", "0", "0", "0", "3", "3", "3", "3", "0", "7", "9", "0", "0", "0", "1", "1", "1", "3", "1", "1", "0", "6", "0", "3", "3"],
["12", "13", "26", "26", "9", "0", "0", "1", "0", "0", "3", "3", "3", "0", "7", "26", "11", "13", "26", "26", "9", "0", "0", "0", "1", "3", "1", "1", "0", "7", "9", "3"],
["27", "27", "27", "27", "10", "0", "0", "0", "0", "3", "3", "0", "0", "0", "28", "15", "27", "27", "27", "14", "29", "0", "0", "0", "1", "3", "3", "1", "3", "8", "10", "3"],
["1", "1", "0", "0", "0", "0", "0", "0", "0", "3", "3", "3", "3", "0", "28", "29", "5", "6", "5", "28", "13", "26", "9", "0", "1", "1", "1", "1", "3", "1", "1", "1"],
["3", "3", "3", "3", "0", "0", "0", "0", "0", "0", "0", "3", "3", "7", "11", "13", "9", "4", "5", "28", "12", "12", "29", "0", "0", "0", "0", "0", "0", "0", "0", "3"],
["3", "1", "3", "3", "3", "3", "3", "3", "3", "0", "0", "3", "0", "28", "12", "12", "29", "5", "6", "28", "15", "27", "10", "0", "0", "0", "0", "0", "0", "0", "0", "3"],
["19", "18", "3", "1", "3", "3", "3", "1", "1", "0", "0", "3", "3", "8", "27", "14", "13", "26", "26", "11", "29", "0", "0", "3", "0", "0", "0", "0", "7", "26", "26", "26"],
["17", "16", "1", "1", "1", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "8", "27", "27", "27", "27", "10", "0", "0", "3", "0", "0", "0", "0", "8", "27", "14", "12"],
["1", "1", "0", "0", "0", "0", "0", "1", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "3", "0", "0", "0", "3", "3", "0", "8", "27"],
["1", "1", "0", "0", "0", "0", "1", "0", "0", "0", "0", "1", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "3", "0", "0", "0", "0", "0", "3", "3", "0", "0"],
["26", "26", "9", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "1", "1", "0", "0", "0", "0", "0", "0", "0", "3", "0", "0", "0", "0", "0", "3", "0", "1"],
["12", "12", "29", "0", "0", "1", "3", "3", "1", "1", "1", "0", "0", "0", "0", "1", "1", "1", "1", "1", "1", "0", "3", "3", "0", "0", "0", "0", "3", "3", "0", "1"],
["27", "27", "10", "1", "1", "1", "0", "0", "0", "3", "1", "0", "0", "0", "0", "1", "1", "1", "1", "1", "3", "3", "3", "0", "0", "1", "0", "0", "0", "0", "3", "1"],
["1", "1", "1", "3", "3", "1", "1", "0", "0", "3", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "3", "3", "0", "0", "0", "0", "0", "0", "0", "1", "1", "1"],
["3", "3", "1", "1", "3", "3", "1", "0", "6", "3", "1", "0", "0", "7", "9", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "1", "3", "3", "3"],
["1", "3", "3", "3", "3", "1", "3", "0", "0", "0", "3", "1", "1", "28", "29", "0", "0", "1", "1", "0", "0", "0", "0", "1", "1", "1", "1", "1", "3", "3", "3", "3"],
["3", "1", "3", "3", "1", "3", "3", "0", "3", "3", "3", "3", "1", "28", "13", "9", "1", "1", "3", "3", "3", "3", "3", "3", "3", "3", "3", "3", "3", "3", "3", "3"],
["3", "3", "3", "3", "3", "3", "3", "3", "3", "3", "3", "3", "1", "28", "12", "29", "1", "3", "3", "3", "3", "3", "3", "3", "3", "3", "3", "3", "3", "3", "3", "3"],
["3", "19", "23", "23", "23", "23", "18", "3", "3", "3", "3", "3", "3", "28", "12", "29", "19", "23", "23", "23", "23", "23", "23", "18", "3", "3", "3", "3", "3", "3", "3", "3"],
];
let moveableSquares = [0, 7, 8, 9, 10, 11, 12, 13, 14, 15, 26, 27, 28, 29];

function preload() {
    // set the tile names as numbers from 0 - 34
    for (let i = 0; i < 34; i++) {
        tileNames.push("" + i);
    }
    tileset = new Tileset("imgs/tileset3.png", 32, 32, tileNames);
    tileset.setMap(worldMap);
    tileset.initMoveableList(moveableSquares);

    // load turret images
    turret1img = loadImage("imgs/turret1.png");
    turret2img = loadImage("imgs/turret2.png");
    slimeImg = loadImage("imgs/blueslime.png");
}

function setup() {
    createCanvas(1024, 800);
    minions.push(new Minion(32 * 15, 24 * 32, slimeImg));
}

function draw() {
    // Update
    for (let i = 0; i < turrets.length; i++) {
        turrets[i].update();
    }
    //
    // if (random(0, 50) <= 1) {
    // }
    for (let i = 0; i < minions.length; i++) {
        minions[i].update();
    }
    // Render
    tileset.displayMap();

    // draw the minion
    for (let i = 0; i < minions.length; i++) {
        minions[i].render();
    }

    // draw red rectangle tile indicator
    noFill();
    try {
        strokeWeight(2);
        stroke(255, 0, 0);
        rect(round(mouseX / tileset.tileW) * tileset.tileW, round(mouseY / tileset.tileH) * tileset.tileH, tileset.tileW, tileset.tileH);
        stroke(0);
        strokeWeight(1);
        //console.log(tileset.map[round(mouseY / tileset.tileH)][round(mouseX / tileset.tileW)]);
    } catch (err) {
        console.log("mouse out of canvas. - indicator unshown.");
    }

    drawTurretToolbar();
    for (let i = 0; i < turrets.length; i++) {
        turrets[i].render();
    }
    fill(0);
    textSize(20);
    text(round(mouseX / tileset.tileW) * tileset.tileW + ", " +  round(mouseY / tileset.tileH) * tileset.tileH, mouseX, mouseY);


}


function drawTurretToolbar() {
    fill(0);
    rect(0, 0, 260, 100);
    fill(255);
    textSize(20);
    textAlign(CENTER);
    text("You have $" + money, 130, 30);
    textSize(14);

    // turret 1
    image(turret1img, 10, 50, 32, 32);
    text("$5", 10 + 16, 50 + 32 + 12);

    // turret 2
    image(turret2img, 10 + 32, 50, 32, 32);
    text("$10", 10 + 32 + 16, 50 + 32 + 12);

}

function mouseClicked() {
    // if the user has a turret attached that turret needs to be replaced in a valid location.
    if (turretAttached != null) {
        // check is square is valid to place a unit on
        if (tileset.moveable(round(mouseX / tileset.tileW), round(mouseY / tileset.tileH))) {
            /// drop the turret
            turretAttached.x = round(mouseX / tileset.tileW) * tileset.tileW;
            turretAttached.y = round(mouseY / tileset.tileH) * tileset.tileH;
            turretAttached.attached = false;
            turretAttached = null;
        }
    }
    // check if the user has clicked on a turret
    if (mouseOnRect(10, 50, 32, 32) && money >= 5) {
        money -= 5;
        turretAttached = new Turret(mouseX, mouseY, turret1img, 1);
        turrets.push(turretAttached);
    } else if (mouseOnRect(42, 50, 32, 32) && money >= 10) {
        money -= 10;
        turretAttached = new Turret(mouseX, mouseY, turret2img, 2);
        turrets.push(turretAttached);
    }

}

function mouseOnRect(x, y, w, h) {
    if ((mouseX > x) && (mouseX < x + w) && (mouseY > y) && (mouseY < y + h)) {
        return true;
    }
    return false;
}

//
//
// function mouseClicked () {
//     tileset.handleClick();
// }
//
// function mouseDragged () {
//     tileset.handleDrag();
// }
