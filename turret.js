class Turret {
    constructor (x, y, img) {
        this.attached = true;
        this.x = x;
        this.y = y;
        this.img = img;
        this.bullets = [];
        this.cooldown = 0;
    }

    updateBasicTurret(deltaX, deltaY) {
        // if the turret is attached wait for it to unattach
        if (this.attached) {
            this.x = mouseX;
            this.y = mouseY;
            return;
        }
        // update the turret's bullet locations
        if (this.bullets.length > 0) {
            for (let i = this.bullets.length - 1; i >= 0; i--) {
                // splice bullets which are off screen
                if (this.bullets[i].x < -10 || this.bullets[i].x > width || this.bullets[i].y < -10 || this.bullets[i].y > height) {
                    this.bullets.splice(i, 1);
                } else {
                    this.bullets[i].x += deltaX;
                    this.bullets[i].y += deltaY;
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
        super.updateBasicTurret(0, -4);
    }
}

class HorizontalTurret extends Turret {
    constructor (x, y, img) {
        super(x, y, img);
        this.cdMax = 60;
    }

    update() {
        super.updateBasicTurret(-4, 0);
    }
}
