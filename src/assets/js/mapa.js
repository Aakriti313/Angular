//Variables a utilizar
var logo = new Image(), canvas = null, ctx = null;

window.addEventListener("load", init);

//Al iniciar
function init () {
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');
    ctx.fillStyle = 'white';
    ctx.fillRect(400, 200, 200, 200);
    // canvas.addEventListener("mousemove", handleMouseMove);
}

//Posicion del ratón dentro del canvas
// function handleMouseMove(event) {
//     //Coordenadas del ratón dentro del canvas
//     const mouseX = event.clientX - canvas.getBoundingClientRect().left;
//     const mouseY = event.clientY - canvas.getBoundingClientRect().top;
//     //Limpiar el canvas
//     ctx.clearRect(0, 0, canvas.width, canvas.height);
//     //Dibujar un punto en la posición del ratón
//     ctx.beginPath();
//     ctx.arc(mouseX, mouseY, 4, 0, Math.PI * 2);
//     ctx.fillStyle = "white";
//     ctx.fill();
// }

function hideForm(){
    intro(logo);
}
function intro(logo) {
    logo.src = 'assets/img/Logo_svg.svg';
    ctx.drawImage(logo, 78, 90);
    setTimeout(function() {
        //Limpiar el canvas después de 3 segundos
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }, 3000);
}

// function paint(ctx) {
//     ctx.fillStyle = 'white';
//     ctx.fillRect(300, 200, 400, 50);
//     ctx.fillStyle = 'white';
//     ctx.fillRect(300, 270, 400, 50);   
// }