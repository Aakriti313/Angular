//Importar Servicios para utilizar el Back
import { GetService } from "../../app/services/get.service";
import { AppInjector } from "../../app/app.module";

//Creamos la clase principal Engine
export class Engine {
  //Variables globales
  canvas = null;
  ctx = null;
  pause = true;
  logo = new Image();
  game_image = new Image();
  backgroundMusic = new Audio("assets/sounds/audio.mp3");
  background1 = new Sprite({
    position: { x: 0, y: 0 },
    imageSrc: "assets/img/mapaJuegoMurderofCrime.png",
  });
  spacePressed = false;
  tutorial1_image = new Image();
  tutorial2_image = new Image();
  selectedCharacter = null;
  itemsImg = [];
  itemsCollected = [];
  points = 0;

  //Init
  init() {
    //Obtener referencia del canvas
    this.canvas = document.getElementById("canvas");
    //Establecemos This como una referencia a Engine.
    this.canvas.engine = this;
    //Permite interactuar con el canvas mediante el teclado
    this.canvas.setAttribute("tabindex", 0);
    //Contexto del canvas
    this.ctx = this.canvas.getContext("2d");

    this.canvas.style.cursor = "pointer";
    this.logo.src = "/assets/img/logo_pantalla_completa_dark.png";

    //Ejecutar al cargar la imagen logo
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
    };
  }

  initSound() {
    // Cargar y reproducir la música de fondo
    this.backgroundMusic.loop = true; // Para que se repita continuamente
    this.backgroundMusic.volume = 0.5; // Ajusta el volumen según lo necesites
    this.backgroundMusic.play();
  }

  stopSound() {
    if (this.backgroundMusic) {
      this.backgroundMusic.pause();
    }
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
    this.initSound();
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
    // //cuadradosetting
    // engine.ctx.fillStyle = "#F8F3EA";
    // engine.roundedRect(150, 180, 150, 150, 20);
    // //sett
    // engine.ctx.fillStyle = "#C4C4C4";
    // const settSize = 80;
    // engine.playIcon(455 - settSize / 2, 250 - settSize / 2, settSize);
    // //cuadradoranking
    // engine.ctx.fillStyle = "#F8F3EA";
    // engine.roundedRect(600, 180, 150, 150, 20);
    // //ranking
    // engine.ctx.fillStyle = "#C4C4C4";
    // const rankingSize = 80;
    // engine.playIcon(455 - rankingSize / 2, 250 - rankingSize / 2, rankingSize);

    engine.canvas.addEventListener("mousemove", (event) => {
      var x = event.clientX - engine.canvas.offsetLeft;
      var y = event.clientY - engine.canvas.offsetTop;

      if (
        x >= 350 &&
        x <= 550 &&
        y >= 200 &&
        y <= 400
        // (x >= 150 && x <= 300 && y >= 180 && y <= 330) ||
        // (x >= 600 && x <= 750 && y >= 180 && y <= 330)
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

  //Tutorial 1
  tutorial1() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.canvas.style.cursor = "default";
    this.tutorial1_image.src = "assets/img/tutorial1.png";
    const button = { x: 780, y: 430, width: 35, height: 30 };

    //Mostrar imagen Tutorial1
    this.tutorial1_image.onload = () => {
      this.ctx.drawImage(
        this.tutorial1_image,
        0,
        0,
        this.canvas.width,
        this.canvas.height
      );

      //Guardar la referencia de this
      const self = this;

      //Evento Click de Button
      this.canvas.addEventListener("click", function handleClick(event) {
        const clickX = event.offsetX;
        const clickY = event.offsetY;
        if (
          clickX >= button.x &&
          clickX <= button.x + button.width &&
          clickY >= button.y &&
          clickY <= button.y + button.height
        ) {
          self.canvas.removeEventListener("click", handleClick);
          self.tutorial2();
        }
      });
    };
  }

  //Tutorial 2
  tutorial2() {
    //Limpiar canvas y añadir imagen
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.tutorial2_image.src = "assets/img/tutorial2.png";
    //Zonas de los Botones
    const start = { x: 742, y: 430, width: 100, height: 30 };
    const button = { x: 700, y: 430, width: 35, height: 30 };

    //Mostrar imagen Tutorial1
    this.tutorial2_image.onload = () => {
      this.ctx.drawImage(
        this.tutorial2_image,
        0,
        0,
        this.canvas.width,
        this.canvas.height
      );

      //Guardar la referencia de this
      const self = this;

      //Botones
      function handleClick(event) {
        const clickX = event.offsetX;
        const clickY = event.offsetY;

        //Clic en Button
        if (
          clickX >= button.x &&
          clickX <= button.x + button.width &&
          clickY >= button.y &&
          clickY <= button.y + button.height
        ) {
          self.canvas.removeEventListener("click", handleClick);
          self.tutorial1();
        }

        //Clic en Start
        if (
          clickX >= start.x &&
          clickX <= start.x + start.width &&
          clickY >= start.y &&
          clickY <= start.y + start.height
        ) {
          self.canvas.removeEventListener("click", handleClick);
          self.characters();
        }
      }

      //Evento Ciclk
      this.canvas.addEventListener("click", handleClick);
    };
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
    //Acceder al servicio
    const charactersService = AppInjector.get(GetService);
    let engine = document.getElementById("canvas").engine;
    engine.ctx.clearRect(0, 0, engine.canvas.width, engine.canvas.height);

    //Cambiar el fondo del canvas
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

      // Definir las coordenadas de dibujo para cada zona gris
      const charactersZones = [
        { x: 20, y: 90 },
        { x: 195, y: 90 },
        { x: 370, y: 90 },
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

      const characterInfoZone = { x: 50, y: 310, width: 800, height: 140 };

      //button
      const button = { x: 780, y: 460, width: 100, height: 30 };
      engine.ctx.fillStyle = "#f8f3ea";
      engine.ctx.fillRect(button.x, button.y, button.width, button.height);

      // Text properties
      const text = "¡Start!";
      engine.ctx.fillStyle = "#86b7fe";
      engine.ctx.font = '18px "Press Start 2P"';
      engine.ctx.textAlign = "center";

      // Draw text inside the button
      const textX = button.x + button.width / 2;
      const textY = button.y + button.height / 2 + 5;
      engine.ctx.fillText(text, textX, textY);

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

        if (typeof characterData.image === "string") {
          characterImage.src = "data:image/png;base64," + characterData.image;
        } else {
          // Si es un Blob, creamos una URL del objeto Blob y luego asignamos esa URL a src.
          const blobUrl = URL.createObjectURL(characterData.image);
          characterImage.src = "data:image/png;base64, " + blobUrl;
        }

        characterImage.onload = () => {
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
              engine.selectedCharacter = characterData;
              selectedCharacterIndex = index;

              // Limpiar la zona de información del personaje
              engine.ctx.clearRect(
                characterInfoZone.x,
                characterInfoZone.y,
                characterInfoZone.width,
                characterInfoZone.height
              );

              // Rellenar la zona de información del personaje con el color deseado
              engine.ctx.fillStyle = "#f8f3ea";
              engine.ctx.fillRect(
                characterInfoZone.x,
                characterInfoZone.y,
                characterInfoZone.width,
                characterInfoZone.height
              );

              // Mostrar la información del personaje seleccionado en la zona gris
              const selectedCharacterInfo =
                charactersInfo[selectedCharacterIndex];
              engine.ctx.font = '9px "Press Start 2P"';
              engine.ctx.fillStyle = "#0b1853";
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
          engine.startPlayerAnimation();
        }
      });
    });
  }

  loadItems() {
    const itemsService = AppInjector.get(GetService);
    this.itemsCollected = [];

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
        // Obtener la zona correspondiente (usamos % para manejar más ítems que zonas)
        const zone = itemsZones[index % itemsZones.length];

        // Calcular la posición dentro de la zona
        let position = {
          x: zone.x + Math.random() * (zone.width - 80), // ajusta 50 según el tamaño del ítem
          y: zone.y + Math.random() * (zone.height - 80), // ajusta 50 según el tamaño del ítem
        };
        let item = new Item({
          position,
          itemName: itemData.name_item,
          imageSrc: "data:image/png;base64," + itemData.image,
        });

        //  item.draw();
        this.itemsImg.push(item);
        item.onerror = () => {
          console.log("Error al cargar la imagen del ítem:", itemData.image);
        };
      });
    });
  }

  printItems() {
    this.itemsImg.forEach(function (item) {
      item.draw();
    });
  }

  startPlayerAnimation() {
    let engine = document.getElementById("canvas").engine;
    console.log("SI");

    //Imagen del personaje escogido anteriormente por el jugador
    let selectedCharacterImageSrc = engine.selectedCharacter ? engine.selectedCharacter.image : "assets/img/fantasma.png";

    console.log(selectedCharacterImageSrc);
    //Crear Player
    let player = new Player({
      imageSrc: "data:image/png;base64," + selectedCharacterImageSrc,
      engine: engine,
    });

    //Puerta
    let doorPosition = { x: 885, y: 170 };
    let doorSize = { width: 50, height: 100 };
    //Cargar Items
    engine.loadItems();
    // Función de animación del jugador
    function animate() {
      //Dibujar mapa
      engine.background1.draw();
      //Dibujar Items
      engine.printItems();
      //Dibujar puerta
      engine.door(doorPosition.x, doorPosition.y);
      //Actualizar y pintat Payer
      player.update();
      player.draw();

      console.log("entra todo");

      // Calcular la distancia entre el jugador y la puerta
      const playerCenterX = player.position.x + player.width / 2;
      const playerCenterY = player.position.y + player.height / 2;
      const doorCenterX = doorPosition.x + doorSize.width / 2;
      const doorCenterY = doorPosition.y + doorSize.height / 2;

      const distanceX = Math.abs(playerCenterX - doorCenterX);
      const distanceY = Math.abs(playerCenterY - doorCenterY);
      const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

      let scoreSent = false;

      if (distance < 50) {
        engine.ctx.save();
        // Configurar el efecto de resplandor
        engine.ctx.shadowColor = "gold";
        engine.ctx.shadowBlur = 20;
        // Dibujar la puerta con el efecto de resplandor
        engine.door(doorPosition.x, doorPosition.y);
        // Restaurar el estado del contexto
        engine.ctx.restore();
        console.log("Game Over");
        window.addEventListener("keydown", (event) => {
          if (event.code === "Space" && !scoreSent) {
            // engine.endGame();
            scoreSent = true;

            // Enviar datos al backend mediante POST
            const currentUser = localStorage.getItem('currentUser');
            console.log(currentUser);

            const playerData = {
              nickname_user: JSON.parse(currentUser).nickname_user,
              items_collected: engine.itemsCollected
            };

            if (playerData.nickname_user && playerData.items_collected) {
              
              fetch('/server/points/calculate', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify(playerData)
              })
              .then(response => {
                if (!response.ok) {
                  throw new Error('Network response was not ok ' + response.statusText);
                }
                return response.json();
              })
              .then(data => {
                console.log('Datos enviados con éxito:', data);
                // Aquí puedes manejar la respuesta del backend si es necesario
              })
              .catch((error) => {
                console.error('Error al enviar los datos:', error);
              });

              engine.endGame();
            } else {
              console.error('Datos del jugador incompletos o inválidos:', playerData);
            }
          }
        });
      } else {
        // Dibujar la puerta con su apariencia normal
        engine.door(doorPosition.x, doorPosition.y);
      }

      // Verificar la proximidad del jugador a cada ítem
        engine.itemsImg.forEach((item, index) => {
        const itemCenterX = item.position.x + item.width / 2;
        const itemCenterY = item.position.y + item.height / 2;
        const distanceX = Math.abs(playerCenterX - itemCenterX);
        const distanceY = Math.abs(playerCenterY - itemCenterY);
        const distanceToItem = Math.sqrt(
          distanceX * distanceX + distanceY * distanceY
        );

        if (distanceToItem < 20) {
          // Distancia de proximidad para el resplandor
          engine.ctx.save();
          engine.ctx.shadowColor = "gold";
          engine.ctx.shadowBlur = 20;
          item.draw();
          engine.ctx.restore();
          
          if (engine.spacePressed) {
            player.collectItem(item.itemName);
            console.log("Item recogido:", item.itemName);
            // Opcional: eliminar el ítem del mapa después de recogerlo
            engine.itemsImg.splice(index, 1);
        }
        } else {
          item.draw();
        }
      });
    }

    // Agregar los eventos de teclado para el jugador
    window.addEventListener("keydown", (event) => {
      console.log(event.key);
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
        case " ":
          engine.spacePressed = true;
          break;
      }
      animate();
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
        case " ":
          engine.spacePressed = false;
          break;
      }
    });

    // Iniciar la animación del jugador
    animate();
  }


  // Método para mostrar el final del juego
  endGame() {
    //Acceder al servicio
    const endGameservice = AppInjector.get(GetService);
    let engine = document.getElementById("canvas").engine;
    engine.ctx.clearRect(0, 0, engine.canvas.width, engine.canvas.height);
    this.stopSound();
    //Cambiar fondo del canvas
    engine.ctx.fillStyle = "#f8f3ea";
    engine.ctx.fillRect(0, 0, canvas.width, canvas.height);

    engine.ctx.fillRect(500, 150, 300, 300);
    engine.points = 0;

    // Obtener los mensajes desde el servicio en Angular
    endGameservice.getGameOver().subscribe(
      (response) => {
        console.log("Cargando mensajes...");

        // Almacenar la información del mensaje
        const bodyMessage = response.body_message;

        // Mostrar mensaje de fin de partida
        engine.ctx.font = '20px "Press Start 2P"';
        engine.ctx.fillStyle = "#0b1853";
        engine.ctx.textAlign = "center";

        // Función para dividir el texto en líneas
        function splitTextIntoLines(text, maxWidth) {
          const words = text.split(" ");
          let currentLine = words[0];
          const lines = [];

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
          return lines;
        }

        // Dividir la información del mensaje en líneas
        const lines = splitTextIntoLines(bodyMessage, 800);

        // Calcular posición Y inicial para centrar verticalmente el texto
        const startY = 80;

        // Dibujar cada línea de texto
        lines.forEach((line, index) => {
          engine.ctx.fillText(
            line,
            engine.canvas.width / 2,
            startY + index * 20
          );
        });

        const murderZone = { x: 100, y: 180, width: 200, height: 200 };
        let murder = new Image();
        murder.src = "assets/img/personajes/AsesinoSospechoso.png";
        murder.onload = function () {
          engine.ctx.drawImage(
            murder,
            murderZone.x,
            murderZone.y,
            murderZone.width,
            murderZone.height
          );
        };
      },
      (error) => {
        console.error("Error al obtener el juego terminado:", error);
      }
    );

    // Obtener los mensajes desde el servicio en Angular
    const currentUser = localStorage.getItem('currentUser');
    const nicknameUser = JSON.parse(currentUser).nickname_user
    const pointsZone = { x: 600, y: 200, width: 200, height: 200 };

    console.log("cargaran los points?")
    // Array para almacenar todas las promesas de carga de puntos
    const promises = [];

    // Realizar la petición para obtener los puntos del usuario
    const pointsRequest = fetch(`/server/points/user/${nicknameUser}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
    },
  })
  .then(response => {
    if (!response.ok) {
        throw new Error('Network response was not ok ' + response.statusText);
    }
    return response.json();
});

// Agregar la promesa de carga de puntos a la lista de promesas
promises.push(pointsRequest);

// Manejar todas las promesas
Promise.all(promises)
.then(responses => {
    // Obtener la respuesta de la última petición de puntos
    const data = responses[responses.length - 1];

    console.log('Puntos del jugador:', data.points);
    
    // Dibujar los puntos en pointsZone después de recibir la respuesta
    this.ctx.font = '20px "Press Start 2P"';
    this.ctx.fillStyle = '#86b7fe';
    this.ctx.fillText(`Puntos del jugador: ${data.points}`, pointsZone.x, pointsZone.y, pointsZone.width, pointsZone.height);
})
.catch((error) => {
    console.error('Error al obtener los puntos del jugador:', error);
});

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

  // collisionDetection(player) {
  //   // Verificar colisiones del jugador con las paredes
  //   const playerColliding = this.checkCollision(player, this.colisiones());
  //   if (playerColliding) {
  //     // Si hay colisión, no permitir que el jugador avance
  //     player.velocity.x = 0;
  //     player.velocity.y = 0;
  //   }
  // }

  colisiones() {
    //Pared vertical hab1
    // this.ctx.fillStyle = "#ff00007d";
    // this.ctx.fillRect(437, 10, 22, 216);

    // //Pared horizontal hab1
    // this.ctx.fillStyle = "#ff00007d";
    // this.ctx.fillRect(437, 160, 153, 65);
    // //Pared horizontal hab1
    // this.ctx.fillStyle = "#ff00007d";
    // this.ctx.fillRect(627, 160, 300, 65);

    // //Pared vertical hab2
    // this.ctx.fillStyle = "#ff00007d";
    // this.ctx.fillRect(437, 256, 22, 182);

    // //Pared horizontal hab2
    // this.ctx.fillStyle = "#ff00007d";
    // this.ctx.fillRect(437, 256, 57, 65);
    // //Pared horizontal hab2
    // this.ctx.fillStyle = "#ff00007d";
    // this.ctx.fillRect(532, 256, 358, 65);

    // //Pared izquierda
    // this.ctx.fillStyle = "#ff00007d";
    // this.ctx.fillRect(0, 0, 12, 440);
    // //Pared derecha
    // this.ctx.fillStyle = "#ff00007d";
    // this.ctx.fillRect(888, 0, 14, 438);
    // //Pared invisible
    // this.ctx.fillStyle = "#ff00007d";
    // this.ctx.fillRect(0, 290, 320, 14);
    // //Pared abajo
    // this.ctx.fillStyle = "#ff00007d";
    // this.ctx.fillRect(0, 437, 900, 10);
    // //Pared arriba
    // this.ctx.fillStyle = "#ff00007d";
    // this.ctx.fillRect(0, 0, 900, 65);
  }
}

//Class Sprite
class Sprite {
  constructor({ position, imageSrc, frameRate = 1, frameBuffer = 2 }) {
    this.position = position;
    this.image = new Image();
    this.image.onload = () => {
      console.log("Loaded Sprite");
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
      top: 12,
      bottom: 26,
      left: -8,
      right: -3,
    };
    this.updateSides();
    this.items = [];
    this.engine = engine;
    this.walls = [
      { x: 437, y: 10, width: 22, height: 216 },
      { x: 437, y: 160, width: 300, height: 65 },
      { x: 627, y: 160, width: 300, height: 65 },
      { x: 437, y: 256, width: 22, height: 182 },
      { x: 437, y: 256, width: 57, height: 65 },
      { x: 532, y: 256, width: 358, height: 65 },
      { x: 0, y: 0, width: 12, height: 440 },
      { x: 888, y: 0, width: 14, height: 438 },
      { x: 0, y: 290, width: 320, height: 14 },
      { x: 0, y: 437, width: 900, height: 10 },
      { x: 0, y: 0, width: 900, height: 65 },
    ];
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

  handleCollisions() {
    for (let wall of this.walls) {
      if (
        this.sides.bottom > wall.y &&
        this.sides.top < wall.y + wall.height &&
        this.sides.right > wall.x &&
        this.sides.left < wall.x + wall.width
      ) {
        const overlapX = Math.min(
          this.sides.right - wall.x,
          wall.x + wall.width - this.sides.left
        );
        const overlapY = Math.min(
          this.sides.bottom - wall.y,
          wall.y + wall.height - this.sides.top
        );

        // Reducir la superposición en un pequeño margen para mantener al jugador más cerca de la pared
        const adjustmentMargin = 1;
        if (overlapX < overlapY) {
          if (this.velocity.x > 0) {
            this.position.x -= overlapX - adjustmentMargin;
            console.log(
              "Colisión a la derecha. Nueva posición x:",
              this.position.x
            );
          } else {
            this.position.x += overlapX - adjustmentMargin;
            console.log(
              "Colisión a la izquierda. Nueva posición x:",
              this.position.x
            );
          }
        } else {
          if (this.velocity.y > 0) {
            this.position.y -= overlapY - adjustmentMargin;
            console.log("Colisión arriba. Nueva posición y:", this.position.y);
          } else {
            this.position.y += overlapY - adjustmentMargin;
            console.log("Colisión abajo. Nueva posición y:", this.position.y);
          }
        }

        this.updateSides();
        break;
      }
    }
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
      // this.handleCollisions();
    }

    if (
      this.position.y + this.velocity.y >= 0 + this.margin.top &&
      this.sides.bottom + this.velocity.y <=
        this.engine.canvas.height - this.margin.bottom
    ) {
      this.position.y += this.velocity.y;
      this.updateSides();
      // this.handleCollisions();
    }
  }

  collectItem(itemName) {
    this.engine.itemsCollected.push(itemName);
    console.log(`Item recogido: ${itemName}`);
}
}

//Clase objeto
class Item extends Sprite {
  constructor({ position, imageSrc, frameRate, itemName }) {
    super({ position, imageSrc, frameRate });
    this.width = 100;
    this.height = 100;
    this.itemName = itemName;
    // this.position = {
    //   x: Math.floor(Math.random() * this.width) + 1,
    //   y: Math.floor(Math.random() * this.height) + 1,
    // };
    this.position = position; // Usar la posición proporcionada
    this.image.onload = () => {
      console.log("Loaded Sprite");
      this.loaded = true;
      this.width = this.image.width / this.frameRate;
      this.height = this.image.height;
      this.draw();
    };
  }
  draw() {
    let engine = document.getElementById("canvas").engine;
    engine.ctx.drawImage(
      this.image,
      this.position.x,
      this.position.y,
      this.width,
      this.height
    );
  }
}

window.onload = function() {
  // Configuración inicial del canvas y contexto
  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');
  canvas.engine = { ctx: ctx };

  // Posiciones específicas para los ítems
  const itemPositions = [
    { x: 100, y: 100 },
    { x: 300, y: 200 },
    { x: 500, y: 300 },
    { x: 700, y: 400 }
  ];

  // Crear ítems en posiciones específicas
  const items = itemPositions.map((position, index) => {
    return new Item({
      position: position,
      imageSrc: `assets/img/items/item${index + 1}.png`,
      frameRate: 1,
      itemName: `Item${index + 1}`
    });
  });

  // Dibujar los ítems en el canvas
  items.forEach(item => item.draw());
};

