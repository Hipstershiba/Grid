let raio; // Raio dos círculos
let theta; // Ângulo de rotação dos círculos
let numero_de_colunas; // Número de quadrados por linha
let numero_de_linhas;
let numero_total_de_quadrados;
let lado_do_quadrado; // Tamanho do lado dos quadrados **mudar para lado_do_quadrado
let contador_de_iteracoes; // Contador de iterações

let delta_velocidade; // Variável para controlar a rotação dos círculos
let numero_de_frames = 0; // Contador de frames

function setup() {
  const canvasSize = min(windowWidth, windowHeight); // Define o tamanho do canvas baseado na menor dimensão da janela
  createCanvas(canvasSize, canvasSize, WEBGL); // Canvas quadrado
  
  smooth()
  noStroke();
  
  theta = 0.1;
  numero_de_colunas = 10; // Número de quadrados por linha
  numero_de_linhas = numero_de_colunas; // Número de linhas
  numero_total_de_quadrados = numero_de_colunas * numero_de_linhas; // Número total de quadrados
  lado_do_quadrado = canvasSize / numero_de_colunas; // Tamanho do lado_do_quadrado em relação à dimensão do canvas
  raio = sqrt(pow(lado_do_quadrado, 2) / 2); // diagonal do quadrado dividido por 2
  contador_de_iteracoes = 0;
}

function draw() {
  background(atualiza_cor_do_fundo(contador_de_iteracoes));

  fill(atualiza_cor_do_quadrado(contador_de_iteracoes));

  desenha_xadrez();

  theta = delta_velocidade;
  delta_velocidade = 90 * pow(sin(radians(numero_de_frames / 2)), 2);
  
  numero_de_frames += 2;
  if (numero_de_frames > 180) {
    numero_de_frames = 0;
  }
  
  if (theta >= 90) {
    fim_da_animacao();
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

function desenha_xadrez() {
  for (let coluna = 0; coluna < numero_de_linhas / 2; coluna++) {
    for (let linha = 0; linha < numero_de_linhas; linha++) {
      desenha_quadrado(coordenada_x_do_quadrado(coluna), coordenada_y_do_quadrado(linha), deslocamento_de_x(linha, paridade_da_iteracao(contador_de_iteracoes)))
    }
  }
}

function coordenada_x_do_quadrado (_coluna) {
  return (_coluna * (lado_do_quadrado * 2)) + correcao_de_posicionamento();
}

function coordenada_y_do_quadrado(_linha) {
  return (_linha * lado_do_quadrado) +  correcao_de_posicionamento();
}

function correcao_de_posicionamento() {
  return (lado_do_quadrado / 2) - (width / 2);
}

function deslocamento_de_x(_linha, _paridade_da_iteracao) {
  if ((_linha % 2 == 0 && _paridade_da_iteracao == "par") || (_linha % 2 != 0 && _paridade_da_iteracao == "impar")) { //se a linha for par
    return 0;
  } else {
    return lado_do_quadrado;
  }
}

function atualiza_theta() {
  theta = delta_velocidade;
}

function atualiza_delta_velocidade() {
  delta_velocidade = 90 * pow(sin(radians(numero_de_frames / 2)), 2);
}


function atualiza_numero_de_frames() {
  numero_de_frames += 2;
  if (numero_de_frames > 180) {
    numero_de_frames = 0;
  }
}

// identifica a paridade da iteração
function paridade_da_iteracao(iteracao) {
  if (iteracao % 2 == 0) {
    return "par";
  } else {
    return "impar";
  }
}

// Alterna a cor do fundo conforme a iteração
function atualiza_cor_do_fundo(iteracao) {
  if (iteracao % 2 == 0) {
    return 255;
  } else {
    return 30;
  }
}

// Alterna a cor dos quadrados conforme a iteração
function atualiza_cor_do_quadrado(iteracao) {
  if (iteracao % 2 == 0) {
    return 30;
  } else {
    return 255;
  }
}

// Reinicia os valores de theta e delta_velocidade quando a animação termina e incrementa o contador de iterações
function fim_da_animacao() {
  theta = 0;
  delta_velocidade = 0;
  contador_de_iteracoes++;
 }