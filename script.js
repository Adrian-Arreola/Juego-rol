let xp = 0;
let salud = 100;
let oro = 50;
let armaActual = 0;
let peleando;
let saludMonstruo;
let inventario = ["palo"];

const boton1 = document.querySelector('#button1');
const boton2 = document.querySelector("#button2");
const boton3 = document.querySelector("#button3");
const texto = document.querySelector("#text");
const xpTexto = document.querySelector("#xpText");
const saludTexto = document.querySelector("#healthText");
const oroTexto = document.querySelector("#goldText");
const estadisticasMonstruo = document.querySelector("#monsterStats");
const nombreMonstruo = document.querySelector("#monsterName");
const saludMonstruoTexto = document.querySelector("#monsterHealth");

const armas = [
  { name: 'palo', power: 5 },
  { name: 'daga', power: 30 },
  { name: 'martillo', power: 50 },
  { name: 'espada', power: 100 },
  { name: 'lanza', power: 150 },
  { name: 'hacha mágica', power: 250 }
];

const monstruos = [
  { name: "baba", level: 2, health: 15 },
  { name: "bestia colmilluda", level: 8, health: 60 },
  { name: "dragón", level: 20, health: 300 }
];

const ubicaciones = [
  {
    name: "plaza del pueblo",
    "button text": ["Ir a la tienda", "Ir a la cueva", "Pelear con el dragón"],
    "button functions": [irTienda, irCueva, pelearDragon],
    text: "Estás en la plaza del pueblo. Ves un letrero que dice \"Tienda\"."
  },
  {
    name: "tienda",
    "button text": ["Comprar 10 de vida (10 de oro)", "Comprar arma (30 de oro)", "Volver al pueblo"],
    "button functions": [comprarVida, comprarArma, irPueblo],
    text: "Has entrado a la tienda."
  },
  {
    name: "cueva",
    "button text": ["Pelear con baba", "Pelear con bestia colmilluda", "Volver al pueblo"],
    "button functions": [pelearBaba, pelearBestia, irPueblo],
    text: "Has entrado a la cueva. Ves algunos monstruos."
  },
  {
    name: "pelea",
    "button text": ["Atacar", "Esquivar", "Huir"],
    "button functions": [atacar, esquivar, irPueblo],
    text: "¡Estás en combate!"
  },
  {
    name: "monstruo vencido",
    "button text": ["Volver al pueblo", "Volver al pueblo", "¿Juego secreto?"],
    "button functions": [irPueblo, irPueblo, huevoPascua],
    text: '¡El monstruo grita "¡Argh!" y muere! Ganas experiencia y oro.'
  },
  {
    name: "derrota",
    "button text": ["¿REINTENTAR?", "¿REINTENTAR?", "¿REINTENTAR?"],
    "button functions": [reiniciar, reiniciar, reiniciar],
    text: "Has muerto. ☠️"
  },
  {
    name: "victoria",
    "button text": ["¿JUGAR DE NUEVO?", "¿JUGAR DE NUEVO?", "¿JUGAR DE NUEVO?"],
    "button functions": [reiniciar, reiniciar, reiniciar],
    text: "¡Has vencido al dragón! ¡HAS GANADO! 🎉"
  },
  {
    name: "juego secreto",
    "button text": ["2", "8", "Volver al pueblo"],
    "button functions": [elegirDos, elegirOcho, irPueblo],
    text: "Has encontrado un juego secreto. Elige un número. Si coincide con uno de los 10 generados aleatoriamente, ¡ganas!"
  }
];

boton1.onclick = irTienda;
boton2.onclick = irCueva;
boton3.onclick = pelearDragon;

function actualizar(ubicacion) {
  estadisticasMonstruo.style.display = "none";
  boton1.innerText = ubicacion["button text"][0];
  boton2.innerText = ubicacion["button text"][1];
  boton3.innerText = ubicacion["button text"][2];
  boton1.onclick = ubicacion["button functions"][0];
  boton2.onclick = ubicacion["button functions"][1];
  boton3.onclick = ubicacion["button functions"][2];
  texto.innerHTML = ubicacion.text;

  switch (ubicacion.name) {
    case "plaza del pueblo":
      document.body.style.backgroundImage = "url('./img/pueblo.jpg')";
      break;
    case "tienda":
      document.body.style.backgroundImage = "url('./img/tienda.jpg')";
      break;
    case "cueva":
      document.body.style.backgroundImage = "url('./img/cueva.jpg')";
      break;
    case "pelea":
      document.body.style.backgroundImage = "url('./img/pelea.jpg')";
      break;
    default:
      document.body.style.backgroundImage = "url('./img/pueblo.jpg')";
  }
}

function irPueblo() {
  actualizar(ubicaciones[0]);
}

function irTienda() {
  actualizar(ubicaciones[1]);
}

function irCueva() {
  actualizar(ubicaciones[2]);
}

function comprarVida() {
  if (oro >= 10) {
    oro -= 10;
    salud += 10;
    oroTexto.innerText = oro;
    saludTexto.innerText = salud;
  } else {
    texto.innerText = "No tienes suficiente oro para comprar vida.";
  }
}

function comprarArma() {
  if (armaActual < armas.length - 1) {
    if (oro >= 30) {
      oro -= 30;
      armaActual++;
      oroTexto.innerText = oro;
      let nuevaArma = armas[armaActual].name;
      texto.innerText = "Ahora tienes una " + nuevaArma + ".";
      inventario.push(nuevaArma);
      texto.innerText += " En tu inventario tienes: " + inventario;
    } else {
      texto.innerText = "No tienes suficiente oro para comprar un arma.";
    }
  } else {
    texto.innerText = "¡Ya tienes el arma más poderosa!";
    boton2.innerText = "Vender arma por 15 de oro";
    boton2.onclick = venderArma;
  }
}

function venderArma() {
  if (inventario.length > 1) {
    oro += 15;
    oroTexto.innerText = oro;
    let armaVendida = inventario.shift();
    texto.innerText = "Vendiste una " + armaVendida + ".";
    texto.innerText += " En tu inventario tienes: " + inventario;
    armaActual--;
  } else {
    texto.innerText = "¡No vendas tu única arma!";
  }
}

function pelearBaba() {
  peleando = 0;
  irPelea();
}

function pelearBestia() {
  peleando = 1;
  irPelea();
}

function pelearDragon() {
  peleando = 2;
  irPelea();
}

function irPelea() {
  actualizar(ubicaciones[3]);
  saludMonstruo = monstruos[peleando].health;
  estadisticasMonstruo.style.display = "block";
  nombreMonstruo.innerText = monstruos[peleando].name;
  saludMonstruoTexto.innerText = saludMonstruo;
}

function atacar() {
  texto.innerText = "El " + monstruos[peleando].name + " te ataca.";
  texto.innerText += " Tú lo atacas con tu " + armas[armaActual].name + ".";
  salud -= obtenerDañoMonstruo(monstruos[peleando].level);
  if (aciertaAtaque()) {
    saludMonstruo -= armas[armaActual].power + Math.floor(Math.random() * xp) + 1;
  } else {
    texto.innerText += " ¡Fallaste!";
  }
  saludTexto.innerText = salud;
  saludMonstruoTexto.innerText = saludMonstruo;
  if (salud <= 0) {
    derrota();
  } else if (saludMonstruo <= 0) {
    peleando === 2 ? victoria() : vencerMonstruo();
  }
  if (Math.random() <= .1 && inventario.length !== 1) {
    texto.innerText += " Tu " + inventario.pop() + " se rompió.";
    armaActual--;
  }
}

function obtenerDañoMonstruo(nivel) {
  const golpe = (nivel * 5) - Math.floor(Math.random() * xp);
  return golpe > 0 ? golpe : 0;
}

function aciertaAtaque() {
  return Math.random() > .2 || salud < 20;
}

function esquivar() {
  texto.innerText = "Esquivaste el ataque del " + monstruos[peleando].name + ".";
}

function vencerMonstruo() {
  oro += Math.floor(monstruos[peleando].level * 6.7);
  xp += monstruos[peleando].level;
  oroTexto.innerText = oro;
  xpTexto.innerText = xp;
  actualizar(ubicaciones[4]);
}

function derrota() {
  actualizar(ubicaciones[5]);
}

function victoria() {
  actualizar(ubicaciones[6]);
}

function reiniciar() {
  xp = 0;
  salud = 100;
  oro = 50;
  armaActual = 0;
  inventario = ["palo"];
  oroTexto.innerText = oro;
  saludTexto.innerText = salud;
  xpTexto.innerText = xp;
  irPueblo();
}

function huevoPascua() {
  actualizar(ubicaciones[7]);
}

function elegirDos() {
  elegirNumero(2);
}

function elegirOcho() {
  elegirNumero(8);
}

function elegirNumero(numero) {
  const numeros = [];
  while (numeros.length < 10) {
    numeros.push(Math.floor(Math.random() * 11));
  }
  texto.innerText = "Elegiste " + numero + ". Los números aleatorios fueron:\n";
  for (let i = 0; i < 10; i++) {
    texto.innerText += numeros[i] + "\n";
  }
  if (numeros.includes(numero)) {
    texto.innerText += "¡Correcto! ¡Ganas 20 de oro!";
    oro += 20;
    oroTexto.innerText = oro;
  } else {
    texto.innerText += "¡Fallaste! Pierdes 10 de vida.";
    salud -= 10;
    saludTexto.innerText = salud;
    if (salud <= 0) {
      derrota();
    }
  }
}
