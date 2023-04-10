class Ball {
    constructor(x, y, r, vx, vy) {
        this.position = createVector(x, y);
        this.velocity = createVector(vx, vy);
        this.radius = r;
        this.color = color(random(255), random(255), random(255));
        this.time_counter = 0;
    }

    update() {
        this.position.add(this.velocity);

        if (this.position.x + this.radius > width) {
            this.position.x = width - this.radius;
            this.velocity.x *= -1;
        } else if (this.position.x - this.radius < 0) {
            this.position.x = this.radius;
            this.velocity.x *= -1;
        }

        if (this.position.y + this.radius > height) {
            this.position.y = height - this.radius;
            this.velocity.y *= -1;
        } else if (this.position.y - this.radius < 0) {
            this.position.y = this.radius;
            this.velocity.y *= -1;
        }

        if (this.time_counter == 150) {
            this.time_counter = 0;
            this.radius = max(abs(this.radius * 0.98), 0);
        }
        
        this.time_counter++;
        // console.log(this.time_counter);
    }

    show(i) {
        noStroke();
        fill(this.color);
        ellipse(this.position.x, this.position.y, this.radius * 2, this.radius * 2);
        fill(999);
        text(i, this.position.x, this.position.y - 20);
        text(round(pow(this.radius, 2)), this.position.x, this.position.y);

    }

    eat(other) {
        let distance = dist(this.position.x, this.position.y, other.position.x, other.position.y);

        const combined_radius = this.radius + other.radius;

        if (distance < combined_radius * 0.75 && (this.radius - other.radius) / other.radius > 0.1) {
            this.radius = (sqrt(pow(this.radius, 2) + pow(other.radius, 2)));
            // this.velocity.add(this.velocity);
            other.remove();
        }
        else if (distance < combined_radius * 0.75 && (other.radius - this.radius) / this.radius > 0.1) {
            this.radius = (sqrt(pow(this.radius, 2) + pow(other.radius, 2)));
            // this.velocity.add(this.velocity);
            this.remove();
        }
    }

    remove() {
        balls.splice(balls.indexOf(this), 1);
    }
}