let numero_de_colunas; // Número de quadrados por linha
let numero_de_linhas; // Número de linhas
let lado_do_quadrado; // Tamanho do lado dos quadrados
let raio; // Raio dos círculos circunscritos nos quadrados
let velocidade_da_animacao; // Velocidade da animação
let contador_de_quadros_da_animacao; // Conta o numero de quadros da animação
let contador_de_iteracoes; // Contador de iterações

function setup() {
  const canvasSize = min(windowWidth, windowHeight); // Define o tamanho do canvas baseado na menor dimensão da janela
  createCanvas(canvasSize, canvasSize, WEBGL); // Canvas quadrado
  
  smooth()
  noStroke();
  
  numero_de_colunas = 10; // Número de quadrados por linha
  numero_de_linhas = numero_de_colunas; // Número de linhas
  lado_do_quadrado = canvasSize / numero_de_colunas; // Tamanho do lado_do_quadrado em relação à dimensão do canvas
  raio = sqrt(pow(lado_do_quadrado, 2) / 2); // Hipotenusa do triângulo retângulo formado pelo lado_do_quadrado
  velocidade_da_animacao = 2; // Velocidade da animação
  contador_de_quadros_da_animacao = 0; // conta o numero de quadros da animação
  contador_de_iteracoes = 0; // Contador de iterações
}

function draw() {
  // Define a cor do fundo conforme o contador de iterações
  background(atualiza_cor_do_fundo(contador_de_iteracoes));

  // Preenche os quadrados com a cor do quadrado conforme o contador de iterações
  fill(atualiza_cor_do_quadrado(contador_de_iteracoes));

  // Posiciona os quadrados no canvas
  desenha_xadrez();
  
  // Atualiza o contador de quadros da animação conforme a velocidade da animação passada como parâmetro
  atualiza_contador_de_quadros_da_animacao(velocidade_da_animacao);
  
  // Incrementa o contador de iterações quando a variação angular for múltipla de 90
  if (variacao_angular() % 90 == 0 && variacao_angular() != 0) {
    contador_de_iteracoes++;
  }
  
  // informa no console o número de iterações, a variação angular e o contador de quadros da animação 
  console.log(contador_de_iteracoes, "//", variacao_angular(), "//", contador_de_quadros_da_animacao);
  
  // Para a animação quando o contador de iterações for igual a 2
  if (contador_de_iteracoes == 2) {
    //noLoop();
  }
}

// Calcula a correção de posicionamento para centralizar o xadrez no canvas
function correcao_de_posicionamento() {
  return (lado_do_quadrado / 2) - (width / 2);
}

// Desenha os quadrados no canvas conforme o número de colunas e linhas
function desenha_xadrez() {
  for (let coluna = 0; coluna < numero_de_colunas / 2; coluna++) {
    for (let linha = 0; linha < numero_de_linhas; linha++) {
      desenha_quadrado(coordenada_x_do_quadrado(coluna), coordenada_y_do_quadrado(linha), deslocamento_de_x(linha, paridade_da_iteracao(contador_de_iteracoes)))
    }
  }
}

// Calcula a coordenada x do quadrado baseado na coluna
function coordenada_x_do_quadrado (coluna) {
  return (coluna * (lado_do_quadrado * 2)) + correcao_de_posicionamento();
}

// Calcula a coordenada y do quadrado baseado na linha
function coordenada_y_do_quadrado(linha) {
  return (linha * lado_do_quadrado) +  correcao_de_posicionamento();
}

// Desloca o quadrado para a direita ou para a esquerda conforme a paridade da linha e da iteração
function deslocamento_de_x(linha, _paridade_da_iteracao) {
  // Se a linha for par e a iteração for par ou se a linha for ímpar e a iteração for ímpar então o deslocamento é 0
  if ((linha % 2 == 0 && _paridade_da_iteracao == "par") || (linha % 2 != 0 && _paridade_da_iteracao == "impar")) {
    return 0;
  } else {
    return lado_do_quadrado;
  }
}

// Desenha um quadrado com os vértices deslocados conforme a variação angular
function desenha_quadrado(_x, _y, _deslocamento) {
  let angulo = 45;
  beginShape();    
  for (let vertice = 0; vertice < 4; vertice++) {
    vertex(_x + _deslocamento + raio * cos(radians(angulo + variacao_angular())), _y + raio * sin(radians(angulo + variacao_angular())));
    angulo += 90;
  }
  endShape(CLOSE);
}

// Calcula a variação angular conforme o contador de quadros da animação
function variacao_angular() {
  return 90 * pow(sin(radians(contador_de_quadros_da_animacao / 2)), 2);
}

// Atualiza o contador de quadros da animação
function atualiza_contador_de_quadros_da_animacao(velocidade_da_animacao) {
  contador_de_quadros_da_animacao += velocidade_da_animacao;
  // Reinicia a animação quando o contador de quadros da animação atinge 180
  if (contador_de_quadros_da_animacao > 180) {
    contador_de_quadros_da_animacao = 0;
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