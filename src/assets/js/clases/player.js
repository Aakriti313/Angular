var ctx = null;

export class Player {
    constructor() {
        this.position = {
            x: 100,
            y: 100,
        }

        this.velocity = {
            x: 0,
            y: 0,
        }

        this.width = 100;
        this.height = 100;
        this.sides = {
            bottom: this.position.y + this.height,
            right: this.position.x + this.width,
        }
    }

    draw() {
        ctx.fillStyle = 'red';
        ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
    }

    update() {
        if (this.position.x + this.velocity.x >= 0 && this.sides.right + this.velocity.x <= canvas.width) {
            this.position.x += this.velocity.x;
            this.sides.right = this.position.x + this.width;
        }

        if (this.position.y + this.velocity.y >= 0 && this.sides.bottom + this.velocity.y <= canvas.height) {
            this.position.y += this.velocity.y;
            this.sides.bottom = this.position.y + this.height;
        }
    }
}