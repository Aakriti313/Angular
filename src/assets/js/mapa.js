//Variables a utilizar
var logo = new Image(), canvas = null, ctx = null, map_image = new Image();

window.addEventListener("load", init);

//Al iniciar
function init () {
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');
    ctx.fillStyle = 'white';
    ctx.fillRect(350, 150, 200, 200);
    canvas.addEventListener("click", startGame);
}

function startGame(event) {
    //Obtener coordenadas del clic.
    var x = event.clientX - canvas.offsetLeft;
    var y = event.clientY - canvas.offsetTop;

    //Verificar que el clic se ha hecho dentro del rectángulo blanco.
    if (x >= 400 && x <= 600 && y >= 200 && y <= 400) {
        //Llamar a la función
        intro(logo);
    }
}

function intro(logo) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    logo.src = 'assets/img/Logo_svg.svg';
    logo.onload = function () {
    ctx.drawImage(logo, 35, 40);

    setTimeout(function () {
        // Limpiar el canvas después de 3 segundos
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }, 3000);
    
    };
    drawMap(map_image);
}

function drawMap(map_image) {
    map_image.src = 'assets/img/mapaJuegoMurderofCrime.svg';
    map_image.onload = function () {
        ctx.drawImage(map_image, 35, 40);
    };
}

function paint(ctx) {
    ctx.fillStyle = 'white';
    ctx.fillRect(300, 200, 400, 50);
    ctx.fillStyle = 'white';
    ctx.fillRect(300, 270, 400, 50);   
}