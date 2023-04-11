let balls = [];
let foods = [];

let end = false;

const radius_Min = 25;
const radius_Max = 30;

const food_Radius = 8;

const canvas_Real_Width = 1400;
const canvas_Real_Height = 650;


let speed_max_X = 1;
let total_Speed, avg_Speed;
let total_CD, avg_CD;
let total_Will_To_Populate, avg_Will_To_Populate;
let total_Death_Timer, avg_Death_Timer;


function setup() {
    createCanvas(canvas_Real_Width, canvas_Real_Height);

    for (let i = 0; i < 50; i++) {
        let ball = new Ball(random(width), random(height), random(radius_Min, radius_Max), random(-1 * speed_max_X, speed_max_X), random(-1 * speed_max_X, speed_max_X));
        ball.color = color(250 * random(0.1, 1.2), 250 * random(0.1, 1.2), 250 * random(0.1, 1.2));

        balls.push(ball);
        total_Speed += ball.speed;
    }

    for (let i = 0; i < 1; i++) {
        let ball = new Ball(50, 50, random(radius_Min * 2, radius_Max * 2), random(-1 * speed_max_X /2, speed_max_X /2), random(-1 * speed_max_X, speed_max_X));
        ball.color = color(100 * random(0.1, 1.2), 100 * random(0.1, 1.2), 100 * random(0.1, 1.2));
        ball.willToPopulate = 0.4;
        ball.coolDown = 75;
        // ball.reward = 2;
        balls.push(ball);
        total_Speed += ball.speed;
    }

    for (let i = 0; i < 50; i++) {
        let ball = new Ball(random(width), random(height), random(radius_Min, radius_Max), random(-1 * speed_max_X, speed_max_X), random(-1 * speed_max_X, speed_max_X), true);
        ball.color = color(1 * random(0.1, 1.2), 150 * random(0.1, 1.2), 1 * random(0.1, 1.2));
        ball.willToPopulate *= 2;
        ball.velocity.x *= 1.5;
        // ball.deathTimer /= 2;
        // ball.deathTimerOriginal /= 2;
        balls.push(ball);
        total_Speed += ball.speed;
    }

    for (let i = 0; i < 50; i++) {
        let food = new Food(random(width), random(height), food_Radius);
        foods.push(food);
    }
}

let time_counter = 0, reset_all_food = 0;

function draw() {
    background(0);
    // let avg_Speed = total_Speed / balls.length;
    // console.log(avg_Speed);

    if (time_counter == 50) {
        time_counter = 0;
        // console.log(reset_all_food);
        if (reset_all_food == 25) {
            foods = [];
            reset_all_food = -1;
        }
        for (let i = 0; i < 50; i++) {
            let food = new Food(random(width), random(height), food_Radius);
            foods.push(food);
            
        }
        reset_all_food++;
    }
    time_counter++;

    for (let i = 0; i < balls.length; i++) {
        balls[i].update();
        balls[i].show(i);
        balls[i].deathTimer -= 1;

        if (balls[i].herb == true && random(0, 1) > 0.995 && balls[i].radius > 25) {
            pushBall(balls[i]);
            // console.log("working");
        }


        // console.log(foods.length);
        for (let j = 0; j < foods.length; j++) {

            balls[i].eatPlants(foods[j]);

        }

        for (let j = i + 1; j < balls.length; j++) {
            try {

                let value = balls[i].eat(balls[j]);
                // console.log(value);
                if (value != null) {
                    value.deathTimer += 150;

                    while (value.radius >= 30 && random(0, value.willToPopulate) > 0.3 && !value.herb) {
                        pushBall(value); 
                     
                    }
                }
                
                // else if (random(0, 1) > 0.1) {
                //         value.radius *= 0.7;
                //         // const randomVal = random(0.9, 1.3);
                //         let ball = new Ball(value.position.x, value.position.y, value.radius, value.velocity.x * random(0.8, 1.2) * -1, value.velocity.y * random(0.8, 1.2) * -1);
                //         ball.color = color(value.color.levels[0] * random(0.9, 1.13), value.color.levels[1] * random(0.9, 1.13), value.color.levels[2] * random(0.9, 1.13));
                //         ball.coolDown = random(0.7, 1.42) * value.coolDown;
                //         ball.willToPopulate = random(0.7, 1.42) * value.willToPopulate;
                //         // console.log(value.color.levels);
                //         balls.push(ball);                        
                // }
            }
            catch (e) {
                // console.error(e);
            }
        }
    }
    

    total_Speed = 0;
    total_CD = 0;
    total_Death_Timer = 0;
    total_Will_To_Populate = 0;
    for (let i = 0; i < foods.length; i++) {
        foods[i].show(i);
        if (i < balls.length) {
            total_Speed += balls[i].speed;
            total_CD += balls[i].coolDown;
            total_Will_To_Populate += balls[i].willToPopulate;
            total_Death_Timer += balls[i].deathTimer;
            // console.log(balls[i].coolDown);
            // console.log(total_CD);
        }
    }

    avg_Speed = total_Speed / balls.length;
    avg_CD = total_CD / balls.length;
    avg_Death_Timer = total_Death_Timer / balls.length;
    avg_Will_To_Populate = total_Will_To_Populate / balls.length;

    fill(999);
    text("Average Speed: " + round(avg_Speed * 10), 25, 25);
    text("Total Bolbs: " + balls.length, 25, 50);
    text("Average Cooldown: " + round(avg_CD), 25, 75);
    text("Average Alive: " + round(avg_Death_Timer) + "%", 25, 100);
    text("Average Will to Populate: " + round(avg_Will_To_Populate * 70) + "%", 25, 120);

}

function pushBall(rawr) {
    rawr.radius *= 0.7;
    // const randomVal = random(0.9, 1.3);
    let ball = new Ball(rawr.position.x, rawr.position.y, rawr.radius, rawr.velocity.x * random(0.8, 1.2) * -1, rawr.velocity.y * random(0.8, 1.2) * -1);
    ball.color = color(rawr.color.levels[0] * random(0.9, 1.13), rawr.color.levels[1] * random(0.9, 1.13), rawr.color.levels[2] * random(0.9, 1.13));
    ball.coolDown = random(0.7, 1.42) * rawr.coolDown;
    ball.willToPopulate = random(0.7, 1.42) * rawr.willToPopulate;
    ball.herb = rawr.herb;
    // console.log(value.color.levels);
    balls.push(ball); 
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

    else if (keyCode === 66) {
        let ball = new Ball(random(width), random(height), random(radius_Min, radius_Max), random(-1 * speed_max_X, speed_max_X), random(-1 * speed_max_X, speed_max_X));
        ball.color = color(250 * random(0.1, 1.2), 250 * random(0.1, 1.2), 250 * random(0.1, 1.2));

        balls.push(ball);
        total_Speed += ball.speed;
    }

    else if (keyCode === 69) {
        let ball = new Ball(500, 250, random(radius_Min * 4, radius_Max * 4), random(-1 * speed_max_X  * 2, speed_max_X * 2), random(-1 * speed_max_X, speed_max_X));
        ball.color = color(100 * random(0.1, 1.2), 100 * random(0.1, 1.2), 100 * random(0.1, 1.2));
        ball.willToPopulate = 0.3;
        ball.coolDown = 75;
        // ball.reward = 2;
        balls.push(ball);
        total_Speed += ball.speed;
    }
}
