// Variables a utilizar
var canvas = null, ctx = null, logo = new Image(), game_image = new Image(), map_image = new Image();

window.addEventListener("load", init);

// Clase Player
class Player {
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

// Al iniciar
function init() {
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');
    logo.src = 'assets/img/logo_pantalla_completa.png';
    logo.onload = function () {
        ctx.drawImage(logo, 0, 0, canvas.width, canvas.height);
        canvas.addEventListener("click", startGame);
    };
}

// Comprobar que se ha dado dentro del boton play
function startGame(event) {
    canvas.removeEventListener("click", startGame);
    // Obtener coordenadas del clic.
    var x = event.clientX - canvas.offsetLeft;
    var y = event.clientY - canvas.offsetTop;

    // Verificar que el clic se ha hecho dentro del canvas.
    if (x >= 350 && x <= 550 && y >= 150 && y <= 350) {
        intro(game_image);
    }
}

// Intro
function intro(game_image) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    game_image.src = 'assets/img/PortadaEnigmaOfMurders.png';
    game_image.onload = function () {
        ctx.drawImage(game_image, 0, 0, canvas.width, canvas.height);
        setTimeout(function () {
            // Limpiar el canvas después de 3 segundos
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            menuGame();
        }, 3000);
    };
}

// Menu Game
function menuGame() {
    // ctx.fillStyle = 'red';
    // ctx.fillText("ENIGMA OF MURDERS",10,50);
    // ctx.
    //cuadradoplay
    ctx.fillStyle = '#F8F3EA';
    roundedRect(350, 150, 200, 200, 20);
    //triangulo
    ctx.fillStyle = '#C4C4C4';
    const playSize = 80;
    playIcon(455 - playSize / 2, 250 - playSize / 2, playSize);
    //cuadradosetting
    ctx.fillStyle = '#F8F3EA';
    roundedRect(150, 180, 150, 150, 20);
    //sett
    ctx.fillStyle = '#C4C4C4';
    const settSize = 80;
    playIcon(455 - settSize / 2, 250 - settSize / 2, settSize);
    //cuadradoranking
    ctx.fillStyle = '#F8F3EA';
    roundedRect(600, 180, 150, 150, 20);
    //ranking
    ctx.fillStyle = '#C4C4C4';
    const rankingSize = 80;
    playIcon(455 - rankingSize / 2, 250 - rankingSize / 2, rankingSize);

    canvas.addEventListener("click", playGame);
}

function playGame(event) {
    // Obtener coordenadas del clic.
    var x = event.clientX - canvas.offsetLeft;
    var y = event.clientY - canvas.offsetTop;

    //Verificar que el clic se ha hecho dentro del playgame.
    if (x >= 350 && x <= 550 && y >= 150 && y <= 350) {
        drawMap(map_image);
    }
}

// Mapa juego
function drawMap(map_image) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    map_image.src = 'assets/img/mapaJuegoMurderofCrime.svg';
    map_image.onload = function () {
        ctx.drawImage(map_image, 0, 0, canvas.width, canvas.height);
        startPlayerAnimation();
    };
}

function startPlayerAnimation() {
    // Crear una instancia del jugador
    let player = new Player();

    // Función de animación del jugador
    function animate() {
        window.requestAnimationFrame(animate);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        player.draw();
        player.update();
    }

    // Agregar los eventos de teclado para el jugador
    window.addEventListener('keydown', (event) => {
        switch (event.key) {
            case 'w':
                player.velocity.y = -3;
                break;
            case 'a':
                player.velocity.x = -3;
                break;
            case 'd':
                player.velocity.x = 3;
                break;
            case 's':
                player.velocity.y = 3;
                break;
        }
    })

    window.addEventListener('keyup', (event) => {
        switch (event.key) {
            case 'w':
                player.velocity.y = 0;
                break;
            case 'a':
                player.velocity.x = 0;
                break;
            case 'd':
                player.velocity.x = 0;
                break;
            case 's':
                player.velocity.y = 0;
                break;
        }
    })

    // Iniciar la animación del jugador
    animate();
}

// Creación del botón
function roundedRect(x, y, width, height, radius) {
    // Poner sombra
    ctx.shadowColor = 'white'; // Sombra exterior
    ctx.shadowBlur = 20;
    ctx.shadowOffsetX = 0; // Desplazamiento horizontal
    ctx.shadowOffsetY = 0; // Desplazamiento vertical
    
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + width - radius, y);
    ctx.arcTo(x + width, y, x + width, y + radius, radius);
    ctx.lineTo(x + width, y + height - radius);
    ctx.arcTo(x + width, y + height, x + width - radius, y + height, radius);
    ctx.lineTo(x + radius, y + height);
    ctx.arcTo(x, y + height, x, y + height - radius, radius);
    ctx.lineTo(x, y + radius);
    ctx.arcTo(x, y, x + radius, y, radius);
    ctx.closePath();
    ctx.fill();

    // Restablecer sombra en 0
    ctx.shadowColor = 'rgba(0, 0, 0, 0)'; // Sombra interior
    ctx.shadowBlur = 0;
    ctx.shadowOffsetX = 0;  // Desplazamiento horizontal
    ctx.shadowOffsetY = 0; // Desplazamiento vertical
}

// Creación del triángulo
function playIcon(x, y, size) {
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + size, y + size / 2);
    ctx.lineTo(x, y + size);
    ctx.closePath();
    ctx.fill();
}
