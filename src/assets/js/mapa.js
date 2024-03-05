// Variables a utilizar
var canvas = null, ctx = null, pause = true, logo = new Image(), game_image = new Image(), map_image = new Image();

window.addEventListener("load", init);

//Class Sprite
class Sprite{
    constructor({position, imageSrc, frameRate= 1}){
        this.position = position;
        this.image = new Image();
        this.image.onload = () => {
            this.loaded = true;
            this.width = this.image.width / this.frameRate;
            this.height = this.image.height;
        }
        this.image.src = imageSrc;
        this.loaded = false;
        this.frameRate = frameRate;
        this.currentframe = 0;
        this.elapsedFrame = 0;
        this.frameBuffer = 2;
    }
    draw(){
        if (! this.loaded) return
        let cropbox = {
            position: {
                x: this.width * this.currentframe,
                y:0,
            },
            width: this.width,
            height: this.height,
        }

        ctx.drawImage(
            this.image, 
            cropbox.position.x, cropbox.position.y, cropbox.width, cropbox.height, 
            this.position.x, this.position.y, this.width, this.height
        )

        this.updateFrames()
    }

    updateFrames(){
        this.elapsedFrame++;

        if(this.elapsedFrame % this.frameBuffer === 0){
        if(this.currentframe < this.frameRate - 1) this.currentframe++
            else this.currentframe = 0;
        }
    }
}

let background1 = new Sprite({
    position: {
        x: 0,
        y: 0,
    },
    imageSrc: 'assets/img/mapaJuegoMurderofCrime.png',
})

// Clase Player
class Player extends Sprite{
    constructor({imageSrc, frameRate}) {
        super({imageSrc, frameRate})
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
        this.margin = {
            top: 0,
            bottom: 23,
            left: -18,
            right: -9,
        };
        this.updateSides();
    }

    draw() {
        ctx.drawImage(this.image, this.position.x, this.position.y, this.width, this.height);
    }

    updateSides() {
        this.sides = {
            top: this.position.y - this.margin.top,
            bottom: this.position.y + this.height + this.margin.bottom,
            left: this.position.x - this.margin.left,
            right: this.position.x + this.width + this.margin.right,
        };
    }

    //Evitar que salga del marco
    update() {
        if (this.position.x + this.velocity.x >= 0 + this.margin.left && this.sides.right + this.velocity.x <= canvas.width - this.margin.right) {
            this.position.x += this.velocity.x;
            this.updateSides();
        }

        if (this.position.y + this.velocity.y >= 0 + this.margin.top && this.sides.bottom + this.velocity.y <= canvas.height - this.margin.bottom) {
            this.position.y += this.velocity.y;
            this.updateSides();
        }
    }
}

// Al iniciar
function init() {
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');
    canvas.style.cursor = "pointer";
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
    if (x >= 0 && x <= 900 && y >= 0 && y <= 500) {
        intro(game_image);
    }
}

// Intro
function intro(game_image) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    canvas.style.cursor = "wait";
    game_image.src = 'assets/img/IntroMurderOfCrime.png';
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
    canvas.style.cursor = "default";

    ctx.font = '30px "Press Start 2P"'
    ctx.fillStyle = 'red';
    ctx.textAlign = "center";
    ctx.fillText("ENIGMA OF MURDERS", canvas.width / 2, 80);

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

    canvas.addEventListener("mousemove", function(event) {
        var x = event.clientX - canvas.offsetLeft;
        var y = event.clientY - canvas.offsetTop;

        if ((x >= 350 && x <= 550 && y >= 150 && y <= 350) ||
            (x >= 150 && x <= 300 && y >= 180 && y <= 330) ||
            (x >= 600 && x <= 750 && y >= 180 && y <= 330)) {
            canvas.style.cursor = "pointer";
        } else {
            canvas.style.cursor = "default";
        }
    });

    canvas.addEventListener("click", playGame);
    
}

function playGame(event) {
    // Obtener coordenadas del clic.
    var x = event.clientX - canvas.offsetLeft;
    var y = event.clientY - canvas.offsetTop;

    //Verificar que el clic se ha hecho dentro del playgame.
    if (x >= 350 && x <= 550 && y >= 150 && y <= 350) {
        drawMap();
    }
}

// //Fantasma
// let background2 = new Sprite({
//     position: {
//         x: 0,
//         y: 0,
//     },
//     imageSrc: 'assets/img/textoFantasma.gif',
//     onLoad: function() {
//         drawMap();
//     }
// })

// function fantasma() {
//     ctx.clearRect(0, 0, canvas.width, canvas.height);
//     background2.draw();
// }

// Mapa juego
function drawMap() {
    startPlayerAnimation();
}

function startPlayerAnimation() {
    // Crear una instancia del jugador
    let player = new Player({
        imageSrc: 'assets/img/fantasmaSheet.png',
        frameRate: 5,
    });

    // Función de animación del jugador
    function animate() {
        //ctx.clearRect(0, 0, canvas.width, canvas.height);
        background1.draw();
        player.draw();
        player.update();
        window.requestAnimationFrame(animate);
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
    //background1.draw();
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
