let balls = [];

let end = false;

const radius_Min = 25;
const radius_Max = 30;

let speed_max_X = 2;

function setup() {
    createCanvas(1450, 650);

    for (let i = 0; i < 50; i++) {
        let ball = new Ball(random(width), random(height), random(radius_Min, radius_Max), random(-1 * speed_max_X, speed_max_X), random(-1 * speed_max_X, speed_max_X));
        balls.push(ball);
    }
}

function draw() {
    background(200);

    for (let i = 0; i < balls.length; i++) {
        balls[i].update();
        balls[i].show(i);

        for (let j = i + 1; j < balls.length; j++) {
            try {
                balls[i].eat(balls[j]);
                // console.log(balls.length);
            }
            catch (e) {
                console.error(e);
            }
        }
    }
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
