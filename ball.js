class Ball {
    constructor(x, y, r, vx, vy, herb) {
        this.position = createVector(x, y);
        this.velocity = createVector(vx, vy);
        this.radius = r;
        this.color = color(random(255), random(255), random(255));
        this.time_counter = 0;
        this.eatDisabled = false;
        this.speed = sqrt( pow(this.velocity.x, 2) + pow(this.velocity.y, 2) );
        this.coolDown = 150;
        this.willToPopulate = 1.1;
        this.herb = herb;
        this.reward = 1;

        if (this.willToPopulate > 1) {
            this.deathTimer = 1000;
        }
        else {
            this.deathTimer = 500;

        }

        this.deathTimerOriginal = this.deathTimer;

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

        if (this.time_counter == round(this.coolDown)) {
            this.time_counter = 0;

            // let speed_Cost = sqrt( pow(this.velocity.x, 2) + pow(this.velocity.y, 2) ) /100;
            this.radius = max(this.radius * 0.9, 5);
            this.eatDisabled = false;
        }
        
        this.time_counter++;
        // console.log(this.time_counter);

        if (this.deathTimer <= 0) {
            this.remove();
        }
    }

    show(i) {
        noStroke();
        fill(this.color);
        ellipse(this.position.x, this.position.y, this.radius * 2, this.radius * 2);
        fill(999);
        // text(i, this.position.x, this.position.y - 20);
        // text("eating cd: " + round(this.coolDown), this.position.x, this.position.y - 20);
        // text("mass: " + round(pow(this.radius, 2)), this.position.x, this.position.y);
        // // text(round(this.coolDown), this.position.x, this.position.y + 20);
        // text(round(this.willToPopulate * 70), this.position.x, this.position.y + 20);
        // text(this.deathTimer, this.position.x, this.position.y + 40);


    }

    eat(other) {
        let distance = dist(this.position.x, this.position.y, other.position.x, other.position.y);

        const combined_radius = this.radius + other.radius;

        if (distance < combined_radius * 0.75 && (this.radius - other.radius) / other.radius > 0.2 && !this.eatDisabled && !this.herb) {
            this.radius = (sqrt(pow(this.radius, 2) + pow(other.radius, 2))) * this.reward;
            // this.velocity.add(this.velocity);
            other.remove();
            this.time_counter = 0;
            this.eatDisabled = true;
            // console.log(this.radius);
            // this.deathTimer++;
            return this;
        }
        else if (distance < combined_radius * 0.75 && (other.radius - this.radius) / this.radius > 0.2 && !other.eatDisabled && !other.herb) {
            other.radius = (sqrt(pow(this.radius, 2) + pow(other.radius, 2))) * other.reward;
            // this.velocity.add(this.velocity);
            this.remove();
            other.time_counter = 0;
            other.eatDisabled = true;
            // console.log(other.radius);
            // other.deathTimer++;
            return other;
        }

        return null;
    }

    eatPlants(other) {
        const dist_p1 = pow(this.position.x - other.position.x, 2);
        const dist_p2 = pow(this.position.y - other.position.y, 2);
        const distance = sqrt( dist_p1 + dist_p2 );
        
        // console.log(distance);

        if (distance < (this.radius + other.radius) * 0.75) {
            other.removeFood();
            this.radius = (sqrt(pow(this.radius, 2) + 100));

            // console.log("done");
        }
    }

    remove() {
        balls.splice(balls.indexOf(this), 1);
    }

    removeFood() {
        // console.log("penis");
        // food.splice(foods.indexOf(this), 1);
    }
}