//Variables a utilizar
var logo = new Image(), canvas = null, ctx = null;

//Al iniciar
window.onload = function () {
    canvas = document.getElementById('mapa');
    ctx = canvas.getContext('2d');
    
    logo.src = 'assets/img/Logo_svg.svg';
    logo.onload = function(){
        ctx.drawImage(logo, 78, 90);
        setTimeout(function() {
            //Limpiar el canvas después de 3 segundos
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            //Llamar a otra función después de que la imagen haya desaparecido
            paint(ctx);
        }, 3000);
    }
}

//Formulario
function paint(ctx) {
    ctx.font = "150px Press Start 2P";
    ctx.fillStyle = "#f8f3ea";
    ctx.textAlign = "center";
    ctx.fillText("Wellcome player!", 500, 190);
    ctx.fillStyle = 'white';
    ctx.fillRect(300, 200, 400, 50);
    ctx.fillStyle = 'white';
    ctx.fillRect(300, 270, 400, 50);   
}