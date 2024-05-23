import { GetService } from "../../app/services/get.service";
import { AppInjector } from "../../app/app.module";

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

  // constructor() {}

  // Al iniciar
  init() {
    this.canvas = document.getElementById("canvas");
    this.canvas.engine = this;
    this.canvas.setAttribute("tabindex", 0);
    this.ctx = this.canvas.getContext("2d");

    this.canvas.style.cursor = "pointer";
    this.logo.src = "/assets/img/logo_pantalla_completa_dark.png";
    this.logo.onload = () => {
      console.log("logo onload");
      this.ctx.drawImage(
        this.logo,
        0,
        0,
        this.canvas.width,
        this.canvas.height
      );
      
      this.canvas.removeEventListener("click", this.init);
      this.canvas.addEventListener("click", this.startGame, { once: true });
      this.initSound();
    };
    
  }

  initSound(){
      // Cargar y reproducir la música de fondo
      const backgroundMusic = new Audio('assets/sounds/audio.mp3');
      backgroundMusic.loop = true; // Para que se repita continuamente
      backgroundMusic.volume = 0.5; // Ajusta el volumen según lo necesites
      backgroundMusic.play();
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
    const charactersService = AppInjector.get(GetService);
    let engine = document.getElementById("canvas").engine;
    engine.ctx.clearRect(0, 0, engine.canvas.width, engine.canvas.height); // Limpiar el canvas

    //change backgroundcolor
    engine.ctx.fillStyle = "#f8f3ea";
    engine.ctx.fillRect(0, 0, canvas.width, canvas.height);

    //title
    engine.ctx.font = '20px "Press Start 2P"';
    engine.ctx.fillStyle = "#0b1853";
    engine.ctx.textAlign = "center";
    engine.ctx.fillText("CHARACTERS", engine.canvas.width / 2, 70);

    // Obtener los personajes desde el servicio en Angular
    charactersService.getCharacters().subscribe((characters) => {
      console.log("Cargando personajes...");
      let loadedCharacters = 0; // Contador para rastrear cuántos personajes se han cargado correctamente

      // Definir las coordenadas de dibujo para cada zona gris
      const charactersZones = [
        { x: 20, y: 90 },
        { x: 195, y: 90 },
        { x: 370, y:  90 },
        { x: 545, y: 90 },
        { x: 720, y: 90 },
      ];

      const charactersNameZones = [
        { x: 20, y: 280 },
        { x: 195, y: 280 },
        { x: 370, y: 280 },
        { x: 545, y: 280 },
        { x: 720, y: 280 },
      ];

      const characterInfoZone = { x: 50, y: 300, width: 800, height: 140 };

      const button = { x: 780, y: 450, width: 100, height: 30 };
      engine.ctx.fillStyle = "grey";
      engine.ctx.fillRect(780, 450, 100, 30);

      // Dibujar la zona gris
      engine.ctx.fillStyle = "#f8f3ea";
      engine.ctx.fillRect(
        characterInfoZone.x,
        characterInfoZone.y,
        characterInfoZone.width,
        characterInfoZone.height
      );

      // Almacenar la información de los personajes
      const charactersInfo = characters.map((character) => ({
        name: character.name_character,
        description: character.description_character,
        skills: character.skills_character,
      }));

      characters.forEach((characterData, index) => {
        let characterImage = new Image();
        let charactername = characterData.name_character;
        let selectedCharacterIndex = -1;
        console.log(charactername);

        // Seleccionar las coordenadas de dibujo según el índice del personaje
        const charactersImageZone =
          charactersZones[index % charactersZones.length];
        //const charactersNameZone = charactersNameZones[index % charactersNameZones.length];

        if (typeof characterData.image === "string") {
          // Si es una cadena de URL, simplemente asignamos la URL a src.
          // image.onload = () => { engine.ctx.drawImage(image, 0, 0) }
          characterImage.src = "data:image/png;base64," + characterData.image;
        } else {
          // Si es un Blob, creamos una URL del objeto Blob y luego asignamos esa URL a src.
          const blobUrl = URL.createObjectURL(characterData.image);
          characterImage.src = "data:image/png;base64, " + blobUrl;
        }

        characterImage.onload = () => {
          // Incrementar el contador de personajes cargados
          loadedCharacters++;

          // Dibujar la imagen del personaje en el lienzo con las coordenadas de la zona gris
          engine.ctx.drawImage(
            characterImage,
            charactersImageZone.x,
            charactersImageZone.y,
            160,
            200
          );

          engine.ctx.font = '8px "Press Start 2P"';
          engine.ctx.fillStyle = "black";
          const charactersNameZone =
            charactersNameZones[index % charactersNameZones.length];
          // engine.ctx.textAlign = "center";
          // engine.ctx.fillText(charactername, charactersImageZone.x + 200, charactersImageZone.y + 210);

          // Ajustar las coordenadas X e Y para centrar el nombre dentro de la zona
          const nameX = charactersNameZone.x + 160 / 2;
          const nameY = charactersNameZone.y + 10; // Ajuste para centrar verticalmente

          // Dibujar el nombre del personaje dentro de la zona de nombre
          engine.ctx.fillText(charactername, nameX, nameY);

          engine.canvas.addEventListener("click", function (event) {
            const clickX = event.offsetX;
            const clickY = event.offsetY;
            if (
              clickX >= charactersImageZone.x &&
              clickX <= charactersImageZone.x + 160 &&
              clickY >= charactersImageZone.y &&
              clickY <= charactersImageZone.y + 200
            ) {
              selectedCharacterIndex = index;

              // Limpiar la zona de información del personaje
              engine.ctx.clearRect(
                characterInfoZone.x,
                characterInfoZone.y,
                characterInfoZone.width,
                characterInfoZone.height
              );

              // Mostrar la información del personaje seleccionado en la zona gris
              const selectedCharacterInfo =
              charactersInfo[selectedCharacterIndex];
              engine.ctx.font = '9px "Press Start 2P"';
              engine.ctx.fillStyle = "red";
              engine.ctx.textAlign = "left";
              let infoX = characterInfoZone.x + 10;
              let infoY = characterInfoZone.y + 20;
              const maxWidth = characterInfoZone.width - 20;
              const lines = [];

              // Función para dividir el texto en líneas
              function splitTextIntoLines(text, maxWidth) {
                const words = text.split(" ");
                let currentLine = words[0];

                for (let i = 1; i < words.length; i++) {
                  const word = words[i];
                  const width = engine.ctx.measureText(
                    currentLine + " " + word
                  ).width;

                  if (width < maxWidth) {
                    currentLine += " " + word;
                  } else {
                    lines.push(currentLine);
                    currentLine = word;
                  }
                }
                lines.push(currentLine);
              }

              // Dividir la información del personaje en líneas
              // splitTextIntoLines(selectedCharacterInfo.name, maxWidth);
              splitTextIntoLines(selectedCharacterInfo.description, maxWidth);
              splitTextIntoLines(selectedCharacterInfo.skills, maxWidth);

              // Dibujar cada línea de texto
              lines.forEach((line) => {
                engine.ctx.fillText(line, infoX, infoY);
                infoY += 20; // Ajuste vertical entre líneas
              });
            }
          });
        };

        characterImage.onerror = () => {
          console.log(
            "Error al cargar la imagen del personaje:",
            characterData.image
          );
          // En caso de error al cargar la imagen, también se incrementa el contador de personajes cargados para no bloquear el código
          loadedCharacters++;

          // Verificar si todos los personajes se han cargado
          if (loadedCharacters === characters.length) {
            console.log("¡Todos los personajes han sido cargados!");
            // Agregar evento click para pasar al mapa de juego después de que se hayan cargado todos los personajes
            engine.canvas.addEventListener("click", engine.drawMap, {
              once: true,
            });
          }
        };
      });

      // Agregar evento de clic para avanzar a la otra vista al hacer clic en el botón
      engine.canvas.addEventListener("click", function (event) {
        const clickX = event.offsetX;
        const clickY = event.offsetY;
        if (
          clickX >= button.x &&
          clickX <= button.x + button.width &&
          clickY >= button.y &&
          clickY <= button.y + button.height
        ) {
          console.log("Clic en el botón");
          engine.canvas.addEventListener("click", engine.drawMap, {
              once: true,
            });
        }
      });
    });
  }

  loadItems() {
    const itemsService = AppInjector.get(GetService);
    let engine = document.getElementById("canvas").engine;
    engine.ctx.clearRect(0, 0, engine.canvas.width, engine.canvas.height); // Limpiar el canvas
  
    // Obtener los ítems desde el servicio en Angular
    itemsService.getItems().subscribe((items) => {
      console.log("Cargando ítems...");
  
      // Definir las coordenadas de dibujo para cada zona
      const itemsZones = [
        { x: 12, y: 65, width: 424, height: 224 }, // medicina
        { x: 12, y: 305, width: 424, height: 131 }, // entrada
        { x: 460, y: 65, width: 427, height: 95 }, // director
        { x: 460, y: 320, width: 427, height: 118 }, // laboratorio
      ];
  
      items.forEach((itemData, index) => {
        console.log("entroooooo");
  
        // Asegúrate de que hay suficientes zonas para los ítems
        if (index >= itemsZones.length) {
          console.error("No hay suficientes zonas definidas para los ítems.");
          return null;
        }
  
        const zone = itemsZones[index];
        const item = {
          itemName: itemData.name_item,
          img: new Image(),
          x: zone.x + Math.random() * zone.width,
          y: zone.y + Math.random() * zone.height,
          width: 50, // Ancho del ítem, ajustar según sea necesario
          height: 50 // Alto del ítem, ajustar según sea necesario
        };
  
        // Asignar el src de la imagen
        if (typeof itemData.image === "string") {
          item.img.src = "data:image/png;base64," + itemData.image;
        } else {
          // Si es un Blob, creamos una URL del objeto Blob y luego asignamos esa URL a src.
          const blobUrl = URL.createObjectURL(itemData.image);
          item.img.src = blobUrl;
        }
  
        // item.img.onload = () => {
        //   // Dibujar la imagen del ítem en el lienzo con las coordenadas de la zona
        //   engine.ctx.drawImage(
        //     item.img,
        //     item.x,
        //     item.y,
        //     item.width,
        //     item.height
        //   );
        // };
  
        item.img.onerror = () => {
          console.log("Error al cargar la imagen del ítem:", itemData.image);
        };
      });
    });
  }
  
  // Mapa juego
  drawMap(event) {
    console.log("entra?");
    this.engine.startPlayerAnimation();
  }

  startPlayerAnimation() {
    let engine = document.getElementById("canvas").engine;
    console.log("SI");


    let selectedCharacterImageSrc = engine.selectedCharacter
      ? engine.selectedCharacter.image : "assets/img/fantasma.png";

    let itemsImageSrc = engine.selectedCharacter
      ? engine.selectedCharacter.image : "assets/img/fantasma.png";
    // let itemsName = engine.selectedCharacter ? engine.selectedCharacter.image : "assets/img/fantasma.png";

    console.log(selectedCharacterImageSrc);

    // Crear una instancia del jugador
    let player = new Player({
      imageSrc: "assets/img/fantasma.png",
      engine: engine,
    });

    //Crear un objeto aleatorio
    // items(){
    //   const itemsService = AppInjector.get(GetService);
    // }

    let item = new Item({
      itemName: "carta",
      imageSrc: "assets/img/items/item1_carta.png",
    });

    // this.items.getItems().draw;

    let doorPosition = { x: 885, y: 170 };

     // Definir las colisiones (rectángulos)
    let collisions = [
      { x: 437, y: 10, width: 22, height: 216 },
      { x: 437, y: 160, width: 500, height: 65 },
      { x: 437, y: 256, width: 22, height: 182 },
      { x: 437, y: 256, width: 500, height: 440 },
      { x: 0, y: 0, width: 12, height: 65 },
      { x: 888, y: 0, width: 14, height: 438 },
      { x: 0, y: 290, width: 320, height: 14 },
      { x: 0, y: 437, width: 900, height: 10 },
      { x: 0, y: 0, width: 900, height: 65 }
  ];

  // Función de detección de colisiones
  function checkCollisions(player) {
      for (let i = 0; i < collisions.length; i++) {
          let collision = collisions[i];
          if (player.position.x < collision.x + collision.width &&
              player.position.x + player.width > collision.x &&
              player.position.y < collision.y + collision.height &&
              player.position.y + player.height > collision.y) {
              return true;
          }
      }
      return false;
  }

    // Función de animación del jugador
    function animate() {
      let engine = document.getElementById("canvas").engine;

      player.update();
      if (checkCollisions(player)) {
        // Detener al jugador si hay una colisión
        player.velocity.x = 0;
        player.velocity.y = 0;
      }

      engine.background1.draw();
      engine.door(doorPosition.x, doorPosition.y);
      engine.colisiones();
      player.draw();
      
      // items.forEach((item) => {
      //   engine.ctx.drawImage(
      //     item.img,
      //     item.x,
      //     item.y,
      //     item.width,
      //     item.height
      //   );
      // });


      // const button = { x: 780, y: 450, width: 100, height: 30 };
      // engine.button.src = "assets/img/Ajustes/questionMark.png";
      // engine.src.fillRect(780, 450, 100, 30);

          // Agregar evento de clic para avanzar a la otra vista al hacer clic en el botón
          engine.canvas.addEventListener("click", function (event) {
            const clickX = event.offsetX;
            const clickY = event.offsetY;
            if (
              clickX >= button.x &&
              clickX <= button.x + button.width &&
              clickY >= button.y &&
              clickY <= button.y + button.height
            ) {
              engine.canvas.addEventListener("click", engine.tutorial1, {
                once: true,
              });
            }
          });
      // item.draw();
      // Verificar colisiones del jugador con las paredes
      // engine.collisionDetection(player);

      player.update();

      // Verificar colisiones del jugador con las paredes
      engine.collisionDetection(player);

      window.requestAnimationFrame(engine.animate.bind(engine));
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

      // //Calcular la distancia entre el jugador y la puerta final
      // var distanceX = Math.abs(player.position.x - doorPosition.position.x);
      // var distanceY = Math.abs(player.position.y - doorPosition.position.y);
      // var distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

      // //Si el jugador está cerca de la puerta final
      // if (distance < 30) {
      //   // Iluminar la puerta final
      //   this.ctx.save();
      //   this.ctx.shadowColor = "gold";
      //   this.ctx.shadowBlur = 100;
      //   door(doorPosition.x, doorPosition.y);
      //   this.ctx.restore();
      //   console.log("hi");
      // } else {
      //   // Dibujar la puerta con su apariencia normal
      //   door(doorPosition.x, doorPosition.y);
      // }
      // animate();
    }

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

    // Iniciar la animación del jugador
    animate();
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

  collisionDetection(player) {
    // Verificar colisiones del jugador con las paredes
    const playerColliding = this.checkCollision(player, this.colisiones());
    if (playerColliding) {
      // Si hay colisión, no permitir que el jugador avance
      player.velocity.x = 0;
      player.velocity.y = 0;
    }
  }

  colisiones() {
    //Pared vertical hab1
    this.ctx.fillStyle = "#ff00007d";
    this.ctx.fillRect(437, 10, 22, 216);

    this.ctx.fillStyle = "#ff00007d";
    this.ctx.fillRect(437, 160, 500, 65);

    //Pared vertical hab2
    this.ctx.fillStyle = "#ff00007d";
    this.ctx.fillRect(437, 256, 22, 182);
    //Pared horizontal hab2
    this.ctx.fillStyle = "#ff00007d";
    this.ctx.fillRect(437, 256, 500, 65);

    //Pared izquierda
    this.ctx.fillStyle = "#ff00007d";
    this.ctx.fillRect(0, 0, 12, 440);
    //Pared derecha
    this.ctx.fillStyle = "#ff00007d";
    this.ctx.fillRect(888, 0, 14, 438);
    //Pared invisible
    this.ctx.fillStyle = "#ff00007d";
    this.ctx.fillRect(0, 290, 320, 14);
    //Pared abajo
    this.ctx.fillStyle = "#ff00007d";
    this.ctx.fillRect(0, 437, 900, 10);
    //Pared arriba
    this.ctx.fillStyle = "#ff00007d";
    this.ctx.fillRect(0, 0, 900, 65);
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
      x: -3,
      y: 299,
    };
    this.velocity = {
      x: 0,
      y: 0,
    };
    this.width = 64;
    this.height = 64;
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
