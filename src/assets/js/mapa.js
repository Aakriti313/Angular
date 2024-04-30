import { Injectable } from "@angular/core";
import { GetService } from "../../app/services/get.service"; 

export class Engine {
  // Variables a utilizar
  canvas = null;
  ctx = null;
  pause = true;
  logo = new Image();
  game_image = new Image();
  background1 = new Sprite({
    position: {
      x: 0,
      y: 0,
    },
    imageSrc: "assets/img/mapaJuegoMurderofCrime.png",
  });
  spacePressed = false;
  tutorial1_image = new Image();
  tutorial2_image = new Image();

  constructor(characters) {
    this.characters = characters || new GetService();
    // this.items = new GetService();
    //window.addEventListener("load", this.init);
  }

  // Al iniciar
  init() {
    this.canvas = document.getElementById("canvas");
    this.canvas.engine = this;
    this.canvas.setAttribute("tabindex", 0);
    this.ctx = this.canvas.getContext("2d");

    this.canvas.style.cursor = "pointer";
    this.logo.src = "assets/img/logo_pantalla_completa_dark.png";
    this.logo.onload = () => {
      console.log("logo onload");
      this.ctx.drawImage(logo, 0, 0, this.canvas.width, this.canvas.height);
      this.canvas.removeEventListener("click", this.init);
      this.canvas.addEventListener("click", this.startGame, { once: true });
    };
  }

  // Comprobar que se ha dado dentro del boton play
  startGame(event) {
    console.log("startGame");
    // event.target.removeEventListener("click", event.target.click);
    // Obtener coordenadas del clic.
    var x = event.clientX - this.offsetLeft;
    var y = event.clientY - this.offsetTop;

    // Verificar que el clic se ha hecho dentro del this.canvas.
    if (x >= 0 && x <= 900 && y >= 0 && y <= 500) {
      this.engine.intro(this.engine);
    }
  }

  // Intro
  intro(engine) {
    console.log("intro");
    engine.ctx.clearRect(0, 0, engine.canvas.width, engine.canvas.height);
    engine.canvas.style.cursor = "wait";
    engine.game_image.src = "assets/img/IntroEnigmaOfMurders.png";
    engine.game_image.onload = () => {
      console.log("load game image");
      engine.ctx.drawImage(
        engine.game_image,
        0,
        0,
        engine.canvas.width,
        engine.canvas.height
      );
      setTimeout(() => {
        console.log("timout intro");
        // Limpiar el canvas después de 3 segundos
        engine.ctx.clearRect(0, 0, engine.canvas.width, engine.canvas.height);
        // this.canvas.removeEventListener("click", this.intro);
        engine.menuGame(engine);
      }, 3000);
    };
  }

  // Menu Game
  menuGame(engine) {
    engine.canvas.style.cursor = "default";

    engine.ctx.font = '30px "Press Start 2P"';
    engine.ctx.fillStyle = "red";
    engine.ctx.textAlign = "center";
    engine.ctx.fillText("ENIGMA OF MURDERS", engine.canvas.width / 2, 80);

    //cuadradoplay
    engine.ctx.fillStyle = "#F8F3EA";
    engine.roundedRect(350, 150, 200, 200, 20);
    //triangulo
    engine.ctx.fillStyle = "#C4C4C4";
    const playSize = 80;
    engine.playIcon(455 - playSize / 2, 250 - playSize / 2, playSize);
    //cuadradosetting
    engine.ctx.fillStyle = "#F8F3EA";
    engine.roundedRect(150, 180, 150, 150, 20);
    //sett
    engine.ctx.fillStyle = "#C4C4C4";
    const settSize = 80;
    engine.playIcon(455 - settSize / 2, 250 - settSize / 2, settSize);
    //cuadradoranking
    engine.ctx.fillStyle = "#F8F3EA";
    engine.roundedRect(600, 180, 150, 150, 20);
    //ranking
    engine.ctx.fillStyle = "#C4C4C4";
    const rankingSize = 80;
    engine.playIcon(455 - rankingSize / 2, 250 - rankingSize / 2, rankingSize);

    engine.canvas.addEventListener("mousemove", (event) => {
      var x = event.clientX - engine.canvas.offsetLeft;
      var y = event.clientY - engine.canvas.offsetTop;

      if (
        (x >= 350 && x <= 550 && y >= 200 && y <= 400) ||
        (x >= 150 && x <= 300 && y >= 180 && y <= 330) ||
        (x >= 600 && x <= 750 && y >= 180 && y <= 330)
      ) {
        engine.canvas.style.cursor = "pointer";
      } else {
        engine.canvas.style.cursor = "default";
      }
    });

    engine.canvas.addEventListener("click", engine.playGame, { once: true });
  }

  playGame(event) {
    this.removeEventListener("click", this.engine.playGame);
    // Obtener coordenadas del clic.
    var x = event.clientX - this.offsetLeft;
    var y = event.clientY - this.offsetTop;

    //Verificar que el clic se ha hecho dentro del playgame.
    if (x >= 350 && x <= 550 && y >= 150 && y <= 350) {
      this.engine.tutorial1();
    }
  }

  // Método para mostrar el primer tutorial
  tutorial1() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height); // Limpiar el canvas
    this.canvas.style.cursor = "default";
    this.tutorial1_image.src = "assets/img/tutorial1.png";
    this.tutorial1_image.onload = () => {
      this.ctx.drawImage(
        this.tutorial1_image,
        0,
        0,
        this.canvas.width,
        this.canvas.height
      );
      this.canvas.removeEventListener("click", this.tutorial1);
      this.canvas.addEventListener("click", this.tutorial2.bind(this), {
        once: true,
      }); // Al hacer clic, mostrar el segundo tutorial
    };
  }

  // Método para mostrar el segundo tutorial
  tutorial2() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height); // Limpiar el canvas
    this.tutorial2_image.src = "assets/img/tutorial2.png";
    this.tutorial2_image.onload = () => {
      this.ctx.drawImage(
        this.tutorial2_image,
        0,
        0,
        this.canvas.width,
        this.canvas.height
      );
      this.canvas.removeEventListener("click", this.tutorial2);
      this.canvas.addEventListener("click", this.characters, { once: true });
    };
  }

  //Función para pasar al siguiente tutorial o al mapa de juego
  nextTutorial(event) {
    // Obtener coordenadas del clic.
    var x = event.clientX - this.offsetLeft;
    var y = event.clientY - this.offsetTop;

    // Verificar que el clic se ha hecho dentro del área del botón siguiente.
    if (x >= this.width - 100 && y >= this.height - 50) {
      this.engine.tutorial2();
    }
  }

  start(event) {
    // Obtener coordenadas del clic.
    var x = event.clientX - this.offsetLeft;
    var y = event.clientY - this.offsetTop;
    console.log("DrawMap");
    // Verificar que el clic se ha hecho dentro del área del botón siguiente.
    if (x >= this.width - 100 && y >= this.height - 50) {
      console.log("DrawMap1");
      this.engine.drawMap();
    }
  }

  characters() {
    let engine = document.getElementById("canvas").engine;
    let charactersService = new GetService();
    engine.ctx.clearRect(0, 0, this.width, this.height); // Limpiar el canvas
    
    // Obtener los personajes desde el servicio en Angular
    charactersService.getCharacters().subscribe(characters => {
      characters.forEach(characterData => {
        // Crear una nueva instancia de Player para cada personaje
        let character = new Player({
          imageSrc: characterData.image, // Suponiendo que 'image' es el campo que contiene la URL de la imagen del personaje
          engine: engine,
          // Puedes pasar otros parámetros necesarios para la instancia de Player según los datos del personaje
        });

        // Dibujar el personaje en el lienzo
        character.draw();
      });
    });
    this.canvas.addEventListener("click", this.drawMap, { once: true }); // Al hacer clic, iniciar el mapa
  }

  // Mapa juego
  drawMap(event) {
    console.log("entra?");
    this.engine.startPlayerAnimation();
  }

  startPlayerAnimation() {
    let engine = document.getElementById("canvas").engine;
    console.log("SI");
    // Crear una instancia del jugador
    let player = new Player({
      imageSrc: "assets/img/fantasma.png",
      engine: engine,
    });

    //Crear un objeto aleatorio
    let item = new Item({
      itemName: "carta",
      imageSrc: "assets/img/items/item1_carta.png",
    });

    // this.items.getItems().draw;

    let doorPosition = { x: 885, y: 170 };

    // Función de animación del jugador
    function animate() {
      let engine = document.getElementById("canvas").engine;
      //this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      engine.background1.draw();
      engine.door(doorPosition.x, doorPosition.y);
      //engine.paredvertical1();
      //engine.paredvertical2();
      player.draw();
      player.update();
      window.requestAnimationFrame(animate);
      if (item) {
        item.draw();
        findItem();
        checkAllItemsCollected();
      }
      checkDoorProximity(player);
      checkAllItemsCollected(player, doorPosition);
    }

    // Agregar los eventos de teclado para el jugador
    window.addEventListener("keydown", (event) => {
      switch (event.key) {
        case "w":
          player.velocity.y = -3;
          break;
        case "a":
          player.velocity.x = -3;
          break;
        case "d":
          player.velocity.x = 3;
          break;
        case "s":
          player.velocity.y = 3;
          break;
      }
    });

    window.addEventListener("keyup", (event) => {
      switch (event.key) {
        case "w":
          player.velocity.y = 0;
          break;
        case "a":
          player.velocity.x = 0;
          break;
        case "d":
          player.velocity.x = 0;
          break;
        case "s":
          player.velocity.y = 0;
          break;
      }
    });

    // Iniciar la animación del jugador
    animate();

    //Función recoger item
    function findItem() {
      // Manejar eventos de teclado
      this.canvas.addEventListener("keydown", (event) => {
        if (event.key === " ") {
          spacePressed = true;
          event.preventDefault();
        }
      });

      this.canvas.addEventListener("keyup", (event) => {
        if (event.key === " ") {
          spacePressed = false;
          event.preventDefault();
        }
      });

      // Calcular la distancia entre el jugador y el item
      var distanceX = Math.abs(player.position.x - item.position.x);
      var distanceY = Math.abs(player.position.y - item.position.y);
      var distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

      if (distance < 30) {
        // Cambia este valor según qué tan cerca quieres que esté el jugador del item para resaltarlo
        // Guardar el estado actual del contexto
        this.ctx.save();
        // Configurar el efecto de resplandor
        this.ctx.shadowColor = "gold"; // Cambia el color del resplandor según sea necesario
        this.ctx.shadowBlur = 20; // Cambia el valor del desenfoque del resplandor según sea necesario
        // Dibujar el item con el efecto de resplandor
        item.draw();
        // Restaurar el estado del contexto
        this.ctx.restore();
      } else {
        // Dibujar el item con su apariencia normal
        item.draw();
      }

      if (
        player.position.x < item.position.x + item.width &&
        player.position.x + player.width > item.position.x &&
        player.position.y < item.position.y + item.height &&
        player.position.y + player.height > item.position.y
      ) {
        playerNearItem = true;
        if (spacePressed) {
          // Eliminar el item
          player.collectItem(item.itemName);
          item = null;
        }
      } else {
        playerNearItem = false;
      }
    }

    function checkAllItemsCollected(player) {
      // Verificar si item es null antes de intentar acceder a itemName
      // if (item !== null && typeof item !== 'undefined') {
      //     //Lista de todos los nombres de los items
      //     const allItemNames = [item.itemName];

      //     //Verificar si todos los items han sido recogidos
      //     const allItemsCollected = allItemNames.every(itemName => player.items.includes(itemName));

      //     //Si todos los items han sido recogidos
      //     if (allItemsCollected) {

      //Calcular la distancia entre el jugador y la puerta final
      var distanceX = Math.abs(player.position.x - doorPosition.position.x);
      var distanceY = Math.abs(player.position.y - doorPosition.position.y);
      var distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

      //Si el jugador está cerca de la puerta final
      if (distance < 30) {
        // Iluminar la puerta final
        this.ctx.save();
        this.ctx.shadowColor = "gold";
        this.ctx.shadowBlur = 100;
        door(doorPosition.x, doorPosition.y);
        this.ctx.restore();
        console.log("hi");
      } else {
        // Dibujar la puerta con su apariencia normal
        door(doorPosition.x, doorPosition.y);
      }
      animate();
      //         }else {
      //             // Dibujar la puerta con su apariencia normal
      //             door();
      //         }
      //     }
    }
  }

  // Creación del botón
  roundedRect(x, y, width, height, radius, engine) {
    // Poner sombra
    this.ctx.shadowColor = "white"; // Sombra exterior
    this.ctx.shadowBlur = 20;
    this.ctx.shadowOffsetX = 0; // Desplazamiento horizontal
    this.ctx.shadowOffsetY = 0; // Desplazamiento vertical

    this.ctx.beginPath();
    this.ctx.moveTo(x + radius, y);
    this.ctx.lineTo(x + width - radius, y);
    this.ctx.arcTo(x + width, y, x + width, y + radius, radius);
    this.ctx.lineTo(x + width, y + height - radius);
    this.ctx.arcTo(
      x + width,
      y + height,
      x + width - radius,
      y + height,
      radius
    );
    this.ctx.lineTo(x + radius, y + height);
    this.ctx.arcTo(x, y + height, x, y + height - radius, radius);
    this.ctx.lineTo(x, y + radius);
    this.ctx.arcTo(x, y, x + radius, y, radius);
    this.ctx.closePath();
    this.ctx.fill();

    // Restablecer sombra en 0
    this.ctx.shadowColor = "rgba(0, 0, 0, 0)"; // Sombra interior
    this.ctx.shadowBlur = 0;
    this.ctx.shadowOffsetX = 0; // Desplazamiento horizontal
    this.ctx.shadowOffsetY = 0; // Desplazamiento vertical
  }

  // Creación del triángulo
  playIcon(x, y, size) {
    this.ctx.beginPath();
    this.ctx.moveTo(x, y);
    this.ctx.lineTo(x + size, y + size / 2);
    this.ctx.lineTo(x, y + size);
    this.ctx.closePath();
    this.ctx.fill();
  }

  door(x, y) {
    this.ctx.fillStyle = "lightgrey";
    this.ctx.fillRect(x, y, 15, 88, 20);
  }

  paredvertical1() {
    this.ctx.fillStyle = "red";
    this.ctx.fillRect(437, 10, 22, 216);
  }

  paredvertical2() {
    this.ctx.fillStyle = "blue";
    this.ctx.fillRect(437, 256, 22, 182);
  }
}

//Class Sprite
class Sprite {
  constructor({ position, imageSrc, frameRate = 1, frameBuffer = 2 }) {
    this.position = position;
    this.image = new Image();
    this.image.onload = () => {
      this.loaded = true;
      this.width = this.image.width / this.frameRate;
      this.height = this.image.height;
    };
    this.image.src = imageSrc;
    this.loaded = false;
    this.frameRate = frameRate;
    this.currentframe = 0;
    this.elapsedFrame = 0;
    this.frameBuffer = frameBuffer;
  }
  draw() {
    let engine = document.getElementById("canvas").engine;

    if (!this.loaded) return;
    let cropbox = {
      position: {
        x: this.width * this.currentframe,
        y: 0,
      },
      width: this.width,
      height: this.height,
    };

    engine.ctx.drawImage(
      this.image,
      cropbox.position.x,
      cropbox.position.y,
      cropbox.width,
      cropbox.height,
      this.position.x,
      this.position.y,
      this.width,
      this.height
    );

    this.updateFrames();
  }

  updateFrames() {
    this.elapsedFrame++;

    if (this.elapsedFrame % this.frameBuffer === 0) {
      if (this.currentframe < this.frameRate - 1) this.currentframe++;
      else this.currentframe = 0;
    }
  }
}

// Clase Player
class Player extends Sprite {
  constructor({ imageSrc, engine, frameRate }) {
    super({ imageSrc, frameRate });
    this.position = {
      x: 100,
      y: 100,
    };
    this.velocity = {
      x: 0,
      y: 0,
    };
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
    this.engine = engine;
  }

  draw() {
    this.engine.ctx.drawImage(
      this.image,
      this.position.x,
      this.position.y,
      this.width,
      this.height
    );
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
    if (
      this.position.x + this.velocity.x >= 0 + this.margin.left &&
      this.sides.right + this.velocity.x <=
        this.engine.canvas.width - this.margin.right
    ) {
      this.position.x += this.velocity.x;
      this.updateSides();
    }

    if (
      this.position.y + this.velocity.y >= 0 + this.margin.top &&
      this.sides.bottom + this.velocity.y <=
        this.engine.canvas.height - this.margin.bottom
    ) {
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
class Item extends Sprite {
  constructor({ imageSrc, frameRate, itemName }) {
    super({ imageSrc, frameRate });
    this.position = {
      x: Math.floor(Math.random() * this.width) + 1,
      y: Math.floor(Math.random() * this.height) + 1,
    };
    this.width = 100;
    this.height = 100;
    this.itemName = itemName;
  }
  draw() {
    this.ctx.drawImage(
      this.image,
      this.position.x,
      this.position.y,
      this.width,
      this.height
    );
  }
}
