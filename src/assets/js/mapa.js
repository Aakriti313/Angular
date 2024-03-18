// Variables a utilizar
var canvas = null, ctx = null, pause = true, logo = new Image(), game_image = new Image(),
map_image = new Image(), spacePressed = false, tutorial1_image = new Image(), tutorial2_image = new Image();

window.addEventListener("load", init);

//Class Sprite
class Sprite{
    constructor({position, imageSrc, frameRate= 1, frameBuffer = 2,}){
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
        this.frameBuffer = frameBuffer;
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
            bottom: 26,
            left: -7,
            right: -3,
        };
        this.updateSides();
        this.items = [];
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

    collectItem(itemName) { 
        this.items.push(itemName); 
        console.log(`Item encontrado: ${itemName}`);
    }
}

//Clase objeto
class Item extends Sprite{
    constructor({imageSrc, frameRate, itemName}) {
        super({imageSrc, frameRate})
        this.position = {
            x: Math.floor(Math.random() * canvas.width) + 1,
            y: Math.floor(Math.random() * canvas.height) + 1,
        }
        this.width = 100;
        this.height = 100;
        this.itemName = itemName;
    }
        draw() {
            ctx.drawImage(this.image, this.position.x, this.position.y, this.width, this.height);
        }
}

// Al iniciar
function init() {
    canvas = document.getElementById('canvas');
    canvas.setAttribute('tabindex', 0);
    ctx = canvas.getContext('2d');
    canvas.style.cursor = "pointer";
    logo.src = 'assets/img/logo_pantalla_completa_dark.png';
    logo.onload = function () {
        ctx.drawImage(logo, 0, 0, canvas.width, canvas.height);
        canvas.removeEventListener("click", init);
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
    game_image.src = 'assets/img/IntroEnigmaOfMurders.png';
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

        if ((x >= 350 && x <= 550 && y >= 200 && y <= 400) ||
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
    canvas.removeEventListener("click", playGame);
    // Obtener coordenadas del clic.
    var x = event.clientX - canvas.offsetLeft;
    var y = event.clientY - canvas.offsetTop;

    //Verificar que el clic se ha hecho dentro del playgame.
    if (x >= 350 && x <= 550 && y >= 150 && y <= 350) {
        tutorial1();
    }
}
    
//Tutorial
function tutorial1() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    canvas.style.cursor = "default";
    tutorial1_image.src = 'assets/img/tutorial1.png';
    tutorial1_image.onload = function () {
        ctx.drawImage(tutorial1_image, 0, 0, canvas.width, canvas.height);
        canvas.removeEventListener("click", tutorial1);
        canvas.addEventListener("click", tutorial2);

        // canvas.addEventListener("mousemove", function(event) {
        //     var x = event.clientX - canvas.offsetLeft;
        //     var y = event.clientY - canvas.offsetTop;
    
        //     if ((x >= 600 && x <= 750 && y >= 180 && y <= 330)) {
        //         canvas.style.cursor = "pointer";
        //     } else {
        //         canvas.style.cursor = "default";
        //     }
        // });
    };
}

function tutorial2() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    tutorial2_image.src = 'assets/img/tutorial2.png';
    tutorial2_image.onload = function () {
        ctx.drawImage(tutorial2_image, 0, 0, canvas.width, canvas.height);
        canvas.removeEventListener("click", tutorial2);
        canvas.addEventListener("click", drawMap);
    };
}

//Función para pasar al siguiente tutorial o al mapa de juego
function nextTutorial(event) {
    // Obtener coordenadas del clic.
    var x = event.clientX - canvas.offsetLeft;
    var y = event.clientY - canvas.offsetTop;

    // Verificar que el clic se ha hecho dentro del área del botón siguiente.
    if (x >= canvas.width - 100 && y >= canvas.height - 50) {
        tutorial2();
    }
}

function start(event) {
    // Obtener coordenadas del clic.
    var x = event.clientX - canvas.offsetLeft;
    var y = event.clientY - canvas.offsetTop;

    // Verificar que el clic se ha hecho dentro del área del botón siguiente.
    if (x >= canvas.width - 100 && y >= canvas.height - 50) {
        drawMap();
    }
}

// Mapa juego
function drawMap() {
    startPlayerAnimation();
}

function startPlayerAnimation() {
    // Crear una instancia del jugador
    let player = new Player({
        imageSrc: 'assets/img/fantasma.png',
    });

    //Crear un objeto aleatorio
    let item = new Item({
        itemName: 'carta',
        imageSrc: 'assets/img/items/item1_carta.png',
    });

    let maletin = new Item({
        itemName: 'maletin',
        imageSrc: 'assets/img/items/maletin.png',
    });

    // Función de animación del jugador
    function animate() {
        //ctx.clearRect(0, 0, canvas.width, canvas.height);
        background1.draw();
        
        player.draw();
        player.update();
        window.requestAnimationFrame(animate);
        if (item) {
            item.draw();
            findItem();
            checkAllItemsCollected();
        }
        
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

    //Función recoger item
    function findItem() {
    // Manejar eventos de teclado
    canvas.addEventListener('keydown', (event) => {
        if (event.key === ' ') {
            spacePressed = true;
            event.preventDefault();
        }
    });
    
    canvas.addEventListener('keyup', (event) => {
        if (event.key === ' ') {
            spacePressed = false;
            event.preventDefault();
        }
    });
    
    // Calcular la distancia entre el jugador y el item
    var distanceX = Math.abs(player.position.x - item.position.x);
    var distanceY = Math.abs(player.position.y - item.position.y);
    var distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

    if (distance < 30) { // Cambia este valor según qué tan cerca quieres que esté el jugador del item para resaltarlo
        // Guardar el estado actual del contexto
        ctx.save();

        // Configurar el efecto de resplandor
        ctx.shadowColor = 'gold'; // Cambia el color del resplandor según sea necesario
        ctx.shadowBlur = 20; // Cambia el valor del desenfoque del resplandor según sea necesario

        // Dibujar el item con el efecto de resplandor
        item.draw();

        // Restaurar el estado del contexto
        ctx.restore();
    } else {
        // Dibujar el item con su apariencia normal
        item.draw();
    }

        if (player.position.x < item.position.x + item.width &&
            player.position.x + player.width > item.position.x &&
            player.position.y < item.position.y + item.height &&
            player.position.y + player.height > item.position.y) {
            playerNearItem = true;
            if (spacePressed) {
                // Eliminar el item
                player.collectItem(item.itemName);
                item = null
                //item.draw(10,50,canvas.width, canvas.height);
            }
        } else {
            playerNearItem = false;
        }
    }
    
    function checkAllItemsCollected() {
        // Verificar si item es null antes de intentar acceder a itemName
        if (item !== null && typeof item !== 'undefined') {
            //Lista de todos los nombres de los items
            const allItemNames = [item.itemName]; 
        
            //Verificar si todos los items han sido recogidos
            const allItemsCollected = allItemNames.every(itemName => player.items.includes(itemName));
        
            //Si todos los items han sido recogidos
            if (allItemsCollected) {
                //Calcular la distancia entre el jugador y la puerta final
                const doorX = canvas.width - 50; //Posición X de la puerta final
                const doorY = canvas.height / 2 - 50; //Posición Y de la puerta final
                const distanceX = Math.abs(player.position.x - doorX);
                const distanceY = Math.abs(player.position.y - doorY);
                const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
        
                //Si el jugador está cerca de la puerta final
                if (distance < 30) {
                    // Iluminar la puerta final
                    ctx.save();
                    ctx.shadowColor = 'gold';
                    ctx.shadowBlur = 20;
                    ctx.fillRect(doorX - 50, doorY - 50, 100, 100);
                    ctx.restore();
                    console.log('hi');
                }
            }
        }
    }
    

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
