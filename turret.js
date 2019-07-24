class Turret {
    constructor (x, y, img) {
        this.attached = true;
        this.x = x;
        this.y = y;
        this.img = img;
        this.bullets = [];
        this.cooldown = 0;
        this.dmg = 1;
    }

    updateBasicTurret(deltaX, deltaY, bulletWidth) {
        // if the turret is attached wait for it to unattach
        if (this.attached) {
            this.x = mouseX;
            this.y = mouseY;
            return;
        }
        // update the turret's bullet locations
        if (bulletWidth > 0) {
            for (let i = this.bullets.length - 1; i >= 0; i--) {
                // splice bullets which are off screen
                if (this.bullets[i].x < -10 || this.bullets[i].x > width || this.bullets[i].y < -10 || this.bullets[i].y > height) {
                    this.bullets.splice(i, 1);
                } else {
                    this.bullets[i].x += deltaX;
                    this.bullets[i].y += deltaY;
                    // check if bullet has hit a minion
                    // loop through minions array backwards
                    for (let j = minions.length - 1; j >= 0; j--) {
                        // if a bullet hits a minion
                        if (dist(this.bullets[i].x, this.bullets[i].y, minions[j].x, minions[j].y) <= bulletWidth + (minions[j].size / 2)) {
                            // the minion is damaged
                            minions[j].attacked(this.dmg);
                            // if the minion is dead from getting damaged, splice it off the minions array
                            if (minions[j].health == 0)
                                minions.splice(j, 1);
                            // a bullet that hit a minion should be spliced too. Bullets shouldn't penetrate or double hit
                            this.bullets.splice(i, 1);
                            break;
                        }
                    }
                }
            }
        }
        // shoot a bullet if the cooldown is done
        if (this.cooldown <= 0) {
            this.bullets.push({x : this.x + 16, y : this.y + 16});
            this.cooldown = this.cdMax;
        }
        this.cooldown--;
    }

    render(bulletWidth) {
        // draw turret's bullets
        for (let i = 0; i < this.bullets.length; i++) {
            ellipse(this.bullets[i].x, this.bullets[i].y, bulletWidth, bulletWidth);
        }

        // draw the actual turret
        image(this.img, this.x, this.y, 32, 32);
    }
}


class VerticalTurret extends Turret {
    constructor (x, y, img) {
        super(x, y, img);
        this.cdMax = 40;
    }

    update() {
        super.updateBasicTurret(0, -4, 4);
    }

    render() {
        super.render(4);
    }
}

class HorizontalTurret extends Turret {
    constructor (x, y, img) {
        super(x, y, img);
        this.cdMax = 60;
    }

    update() {
        super.updateBasicTurret(-4, 0, 4);
    }

    render() {
        super.render(4);
    }
}
