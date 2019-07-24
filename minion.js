class Minion {
    constructor (x, y, img) {
        this.x = (x * tileset.tileW) + 8;
        this.y = (y * tileset.tileH) + 8;
        this.img = img;
        this.frame = 0;
        this.frameCDs = [4, 4, 4, 4]; // how many frames to wait before cycling to the next frame
        this.frameCD = this.frameCDs[0];
        this.health = 2;
        this.path = tileset.shortestPath(tileset.map[round(this.y / tileset.tileH)][round(this.x / tileset.tileW)], tileset.map[10][16]);
        this.pathIndex = 0;
        this.speed = 0.5;
        this.sizeDisplacement = 8;
        this.arrived = false;
    }

    update(displacement) {
        // update the minion's position along the calc'd path
        // if the minion is within 8 pixels of the path, time to move on to the next index
        if (dist(this.x - displacement, this.y - displacement, this.path[this.pathIndex].x, this.path[this.pathIndex].y) <= displacement) {
            this.pathIndex++;
            if (this.pathIndex == this.path.length) {
                let temp = [];
                temp.push(this.path[this.path.length - 1]);
                this.path = temp;
                this.pathIndex = 0;
                // the minion has reached it's goal
                this.arrived = true;
            }
        }
        // head towards the path index specified
        if (this.x - displacement > this.path[this.pathIndex].x) {
            this.x -= this.speed;
        } else if (this.x - displacement < this.path[this.pathIndex].x) {
            this.x += this.speed;
        }
        if (this.y - displacement > this.path[this.pathIndex].y) {
            this.y -= this.speed;
        } else if (this.y - displacement < this.path[this.pathIndex].y) {
            this.y += this.speed;
        }

        //update minion's frame
        if (this.frameCD <= 0) {
            this.frame++;
            if (this.frame == this.frameCDs.length)
                this.frame = 0;
            this.frameCD = this.frameCDs[this.frame];
        }
        this.frameCD--;
    }

    attacked(dmg = 1) {
        if ((this.health - dmg) > 0) {
            this.health -= dmg;
        } else {
            // the unit is killed
            this.health = 0;
        }
    }

    render(size) {
        // draw the minion
        imageMode(CORNER);
        image(this.img, this.x, this.y, size, size, size * this.frame, 0, size, size);
    }

}

class Slime extends Minion {
    constructor (x, y, img) {
        super(x, y, img);
        this.frameCDs = [4, 4, 4, 4]; // how many frames to wait before cycling to the next frame
        this.frameCD = this.frameCDs[0];
        this.health = 2;
        this.speed = 0.5; // half a pixel per frame
        this.sizeDisplacement = 8; // how much to offset the image so it's centered on the tile
        this.size = 16;
    }

    update() {
        super.update(this.sizeDisplacement);
    }

    render() {
        super.render(this.size);
    }
}
