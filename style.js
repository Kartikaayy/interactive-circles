var canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var c = canvas.getContext('2d');

var maxradius = 40;
var mouse = {
    x: undefined,
    y: undefined
};

// Resize & Reset Circles
window.addEventListener('resize', function () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    init(); // Reinitialize circles after resizing
});

// Track Mouse Position
window.addEventListener('mousemove', function (event) {
    mouse.x = event.x;
    mouse.y = event.y;
});
window.addEventListener('click', function (event) {
    for (let i = 0; i < circleArray.length; i++) {
        let circle = circleArray[i];
        let distance = Math.sqrt((event.x - circle.x) ** 2 + (event.y - circle.y) ** 2);

        if (distance < circle.radius) {
            explode(circle.x, circle.y, circle.radius);
        }
    }
});

// Circle Constructor
function Circle(x, y, radius, dx, dy) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.minradius = radius;
    this.dx = dx;
    this.dy = dy;
    this.color = `rgb(${Math.floor(Math.random() * 256)}, 
                       ${Math.floor(Math.random() * 256)}, 
                       ${Math.floor(Math.random() * 256)})`;

    this.draw = function () {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.fillStyle = this.color;
        c.fill();
        c.lineWidth = 0.5;
        c.strokeStyle = "#000";
        c.stroke();
    };

    this.update = function () {
        if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
            this.dx = -this.dx;
        }
        if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
            this.dy = -this.dy;
        }

        this.x += this.dx;
        this.y += this.dy;

        // Interactivity: Increase size near mouse
        if (mouse.x - this.x < 50 && mouse.x - this.x > -50 &&
            mouse.y - this.y < 50 && mouse.y - this.y > -50) {
            if (this.radius < maxradius) {
                this.radius += 1;
            }
        } else if (this.radius > this.minradius) {
            this.radius -= 1;
        }

        this.draw();
    };
}
function explode(x, y, radius) {
    for (let i = 0; i < 5; i++) {
        let dx = (Math.random() - 0.5) * 8;
        let dy = (Math.random() - 0.5) * 8;
        let newRadius = radius / 2;
        circleArray.push(new Circle(x, y, newRadius, dx, dy));
    }
}

var circlearray = [];

// Initialize Circles
function init() {
    circlearray = []; // Reset array
    for (var i = 0; i < 800; i++) {
        var radius = Math.random() * 3 + 1;
        var x = Math.random() * (innerWidth - radius * 2) + radius;
        var y = Math.random() * (innerHeight - radius * 2) + radius;
        var dx = (Math.random() - 0.5) * 2; 
        var dy = (Math.random() - 0.5) * 2;
        circlearray.push(new Circle(x, y, radius, dx, dy));
    }
}

function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, innerWidth, innerHeight);
    for (var i = 0; i < circlearray.length; i++) {
        circlearray[i].update();
    }
}

init();
animate();
