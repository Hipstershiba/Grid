let raio; // Raio dos círculos
let theta; // Ângulo de rotação dos círculos
let numero_de_quadrados_por_linha; // Número de quadrados por linha
let numero_de_linhas;
let numero_total_de_quadrados;
let lado; // Tamanho do lado dos quadrados
let contador_de_iteracoes; // Contador de iterações

let delta_velocidade; // Variável para controlar a rotação dos círculos
let numero_de_frames = 0; // Contador de frames

function setup() {
  const canvasSize = min(windowWidth, windowHeight); // Define o tamanho do canvas baseado na menor dimensão da janela
  createCanvas(canvasSize, canvasSize, WEBGL); // Canvas quadrado
  
  colorMode(RGB);
  smooth()
  noStroke();
  
  theta = 0.1;
  numero_de_quadrados_por_linha = 10; // Número de quadrados por linha
  numero_de_linhas = numero_de_quadrados_por_linha; // Número de linhas
  numero_total_de_quadrados = numero_de_quadrados_por_linha * numero_de_linhas; // Número total de quadrados
  lado = canvasSize / numero_de_quadrados_por_linha; // Tamanho do lado em relação à dimensão do canvas
  raio = sqrt(pow(lado, 2) / 2); // diagonal do quadrado dividido por 2
  contador_de_iteracoes = 0;
}

function draw() {
  // translate(-width / 2, -height / 2);

  let paridade_da_iteracao = "par";
  let brilho = 0;
  let brilho2 = 0;

  if (contador_de_iteracoes % 2 == 0) {
    brilho = 255;
    brilho2 = 30;
    paridade_da_iteracao = "par";
  } else {
    brilho = 30;
    brilho2 = 255;
    paridade_da_iteracao = "impar";
  }

  background(brilho);
  fill(brilho2);
  desenha_xadrez(paridade_da_iteracao);

  theta = delta_velocidade;
  delta_velocidade = 90 * pow(sin(radians(numero_de_frames / 2)), 2);
  
  numero_de_frames += 2;
  if (numero_de_frames > 180) {
    numero_de_frames = 0;
  }
  
  if (theta >= 90) {
    theta = 0;
    delta_velocidade = 0;
    contador_de_iteracoes++;
  }
  
  console.log(contador_de_iteracoes, "//", delta_velocidade, "//", numero_de_frames, "//", theta);
  
  if (contador_de_iteracoes == 2) {
    // noLoop();
  }
}

function desenha_quadrado(_x, _y, _deslocamento) {
  let angulo = 45;
  beginShape();    
  for (let vertice = 0; vertice < 4; vertice++) {
    vertex(_x + _deslocamento + raio * cos(radians(angulo + theta)), _y + raio * sin(radians(angulo + theta)));
    angulo += 90;
  }
  endShape(CLOSE);
}

function desenha_xadrez(_paridade_da_iteracao) {
  for (let coluna = 0; coluna < numero_de_linhas / 2; coluna++) {
    for (let linha = 0; linha < numero_de_linhas; linha++) {
      desenha_quadrado(coordenada_x_do_quadrado(coluna), coordenada_y_do_quadrado(linha), deslocamento_de_x(linha, _paridade_da_iteracao))
    }
  }
}

function coordenada_x_do_quadrado (_coluna) {
  return (_coluna * (lado * 2)) + correcao_de_posicionamento();
}

function coordenada_y_do_quadrado(_linha) {
  return (_linha * lado) +  correcao_de_posicionamento();
}

function correcao_de_posicionamento() {
  return (lado / 2) - (width / 2);
}

function deslocamento_de_x(_linha, _paridade_da_iteracao) {
  if ((_linha % 2 == 0 && _paridade_da_iteracao == "par") || (_linha % 2 != 0 && _paridade_da_iteracao == "impar")) { //se a linha for par
    return 0;
  } else {
    return lado;
  }
}

