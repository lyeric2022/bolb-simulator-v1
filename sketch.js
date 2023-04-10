let balls = [];
let foods = [];

let end = false;

const radius_Min = 25;
const radius_Max = 30;

const food_Radius = 8;

const canvas_Real_Width = 1400;
const canvas_Real_Height = 650;


let speed_max_X = 2;
let total_Speed, avg_Speed;

function setup() {
    createCanvas(canvas_Real_Width, canvas_Real_Height);

    for (let i = 0; i < 50; i++) {
        let ball = new Ball(random(width), random(height), random(radius_Min, radius_Max), random(-1 * speed_max_X, speed_max_X), random(-1 * speed_max_X, speed_max_X));
        balls.push(ball);
        total_Speed += ball.speed;
    }

    for (let i = 0; i < 50; i++) {
        let food = new Food(random(width), random(height), food_Radius);
        foods.push(food);
    }
}

let time_counter = 0;

function draw() {
    background(0);
    let avg_Speed = total_Speed / balls.length;
    // console.log(avg_Speed);

    if (time_counter == 20) {
        time_counter = 0;
        for (let i = 0; i < 30; i++) {
            let food = new Food(random(width), random(height), food_Radius);
            foods.push(food);
        }
    }
    time_counter++;

    for (let i = 0; i < balls.length; i++) {
        balls[i].update();
        balls[i].show(i);

        // console.log(foods.length);
        for (let j = 0; j < foods.length; j++) {

            balls[i].eatPlants(foods[j]);

        }

        for (let j = i + 1; j < balls.length; j++) {
            try {

                let value = balls[i].eat(balls[j]);
                // console.log(value);
                if (value != null) {
                    if (value.radius >= 30) {
                        value.radius *= 0.7;
                        // const randomVal = random(0.9, 1.3);
                        let ball = new Ball(value.position.x, value.position.y, value.radius, value.velocity.x * random(0.9, 1.08) * -1, value.velocity.y * random(0.9, 1.08) * -1);
                        ball.color = color(value.color.levels[0] * random(0.8, 1.2), value.color.levels[1] * random(0.8, 1.2), value.color.levels[2] * random(0.8, 1.2));
                        ball.coolDown = random(0.8, 1.2) * value.coolDown;
                        // console.log(value.color.levels);
                        balls.push(ball);                        
                    }

                }
            }
            catch (e) {
                // console.error(e);
            }
        }
    }
    

    total_Speed = 0;
    for (let i = 0; i < foods.length; i++) {
        foods[i].show(i);
        if (i < balls.length) {
            total_Speed = balls[i].speed;
        }
    }

    fill(999);
    text("Average Speed: " + round(avg_Speed * 400), 25, 25);
    text("Total Bolbs: " + balls.length, 25, 50);
}

function keyPressed() {
    if (keyCode === 80) {
        if (!end) {
            noLoop();
            end = true;
        }
        else {
            end = false;
            loop();
        }
    }
}
