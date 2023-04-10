class Food {
    constructor(x, y, r) {
        this.position = createVector(x, y);
        // this.velocity = createVector(vx, vy);
        this.radius = r;
        this.color = color(random(255), random(255), random(255));
        // this.time_counter = 0;
        // this.time_counter = 0;
    }

    show() {
        noStroke();
        fill(this.color);
        ellipse(this.position.x, this.position.y, this.radius * 2, this.radius * 2);

        // if (this.time_counter == 500) {
        //     let food = new Food(random(width), random(height), food_Radius);
        //     foods.push(food);
        //     this.time_counter = 0;
        // }

        // this.time_counter++;
    }

    removeFood() {
        foods.splice(foods.indexOf(this), 1);
    }
    
}