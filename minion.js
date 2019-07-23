class Minion {
    constructor (x, y, img) {
        this.x = x + 8;
        this.y = y + 8;
        this.img = img;
        this.frame = 0;
        this.frameCDs = [4, 4, 4, 4];
        this.frameCD = this.frameCDs[0];
        this.health = 2;
        this.path = tileset.shortestPath(tileset.map[round(this.y / tileset.tileH)][round(this.x / tileset.tileW)], tileset.map[10][16]);
        this.pathIndex = 0;
        this.speed = 0.5;
        console.log(this.path, "is the path");
    }

    update() {
        // update the minion's position along the calc'd path
        // if the minion is within 8 pixels of the path, time to move on to the next index
        if (dist(this.x - 8, this.y - 8, this.path[this.pathIndex].x, this.path[this.pathIndex].y) <= 8) {
            this.pathIndex++;
            if (this.pathIndex == this.path.length) {
                let temp = [];
                temp.push(this.path[this.path.length - 1]);
                this.path = temp;
                this.pathIndex = 0;
                console.log("minion arrived!");
            }
        }
        // head towards the path index specified
        if (this.x - 8 > this.path[this.pathIndex].x) {
            this.x -= this.speed;
        } else if (this.x - 8 < this.path[this.pathIndex].x) {
            this.x += this.speed;
        }
        if (this.y - 8 > this.path[this.pathIndex].y) {
            this.y -= this.speed;
        } else if (this.y - 8 < this.path[this.pathIndex].y) {
            this.y += this.speed;
        }
        console.log(this.x, this.y);

        //update minion's frame
        if (this.frameCD <= 0) {
            this.frame++;
            if (this.frame == this.frameCDs.length)
                this.frame = 0;
            this.frameCD = this.frameCDs[this.frame];
        }
        this.frameCD--;
        // if minion reaches it's goal, we should lose a heart
    }

    render() {
        // draw the minion
        imageMode(CORNER);
        image(this.img, this.x, this.y, 16, 16, 16 * this.frame, 0, 16, 16);
    }

}
