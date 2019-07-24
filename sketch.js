// Any global variables can be defined up here
let tileNames = [];
let tileset;
let turret1img;
let turret2img;
let slimeImg;
let money = 60;
let turretAttached = null;
let turrets = [];
let minions = [];
let minionCD = 60;

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
    createCanvas(1024, 800); // 32 x 25
    minions.push(new Slime(15, 24, slimeImg));
}

function draw() {
    // Update
    // Update the turrets
    for (let i = 0; i < turrets.length; i++) {
        turrets[i].update();
    }

    // Update the minions
    minionCD--;
    if (minionCD <= 0) {
        // reset spawning cooldown
        minionCD = 60;
        // pick a map coordinate to spawn the slime
        while (true) {
            let x = round(random(0, 31));
            let y = round(random(0, 24));
            let path = tileset.shortestPath(tileset.map[y][x], tileset.map[10][16]);
            if (path.length > 10) {
                minions.push(new Slime(x, y, slimeImg));
                break;
            }
        }
        // push a new slime into the minion array
    }
    for (let i = 0; i < minions.length; i++) {
        minions[i].update();
    }

    // Render
    // draw the map
    tileset.displayMap();

    // draw the minion
    for (let i = 0; i < minions.length; i++) {
        minions[i].render();
    }

    // draw red rectangle tile indicator
    noFill();
    strokeWeight(2);
    stroke(255, 0, 0);
    let x = round(mouseX / tileset.tileW) * tileset.tileW;
    let y = round(mouseY / tileset.tileH) * tileset.tileH;
    rect(x, y, tileset.tileW, tileset.tileH);
    stroke(0);
    strokeWeight(1);

    // draw the shop
    drawTurretToolbar();

    // draw the turrets
    for (let i = 0; i < turrets.length; i++) {
        turrets[i].render();
    }
}


function drawTurretToolbar() {
    // black rect background for shop
    fill(0);
    rect(0, 0, 260, 100);

    // draw money in white
    fill(255);
    textSize(20);
    textAlign(CENTER);
    text("You have $" + money, 130, 30);

    // turret 1 image
    image(turret1img, 10, 50, 32, 32);
    textSize(14);
    text("$5", 10 + 16, 50 + 32 + 12);

    // turret 2 image
    image(turret2img, 10 + 32, 50, 32, 32);
    text("$10", 10 + 32 + 16, 50 + 32 + 12);
}


function mouseClicked() {
    // if the user has a turret attached that turret needs to be replaced in a valid location.
    if (turretAttached != null) {
        // check is square is valid to place a unit on
        let tileX = round(mouseX / tileset.tileW);
        let tileY = round(mouseY / tileset.tileH);
        if (tileset.moveable(tileX, tileY)) {
            /// drop the turret
            turretAttached.x = tileX * tileset.tileW;
            turretAttached.y = tileY * tileset.tileH;
            turretAttached.attached = false;
            turretAttached = null;
        }
    } else {
        // check if the user has clicked on a turret
        if (mouseOnRect(10, 50, 32, 32) && money >= 5) {
            money -= 5;
            turretAttached = new HorizontalTurret(mouseX, mouseY, turret1img);
            turrets.push(turretAttached);
        } else if (mouseOnRect(42, 50, 32, 32) && money >= 10) {
            money -= 10;
            turretAttached = new VerticalTurret(mouseX, mouseY, turret2img);
            turrets.push(turretAttached);
        }
    }
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
