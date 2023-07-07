// Para declarar uma variável é necessário usar a palavra reservada let
// Let é uma variável com escopo local
// Variáveis locais são acessíveis apenas dentro do bloco onde foram declaradas,
// Ao declarar uma variável local fora de uma função ela se torna global
// Variáveis globais são acessíveis em todo o código
// Ao declarar uma variável não é necessário definir o tipo
let numero_de_colunas;                // Número de colunas
let numero_de_linhas;                 // Número de linhas
let lado_do_quadrado;                 // Tamanho do lado dos quadrados em re
let raio;                             // Raio dos círculos circunscritos nos quadrados
let velocidade_da_animacao;           // Velocidade da animação
let contador_de_quadros_da_animacao;  // Conta o numero de quadros da animação
let contador_de_iteracoes;            // Contador de iterações

// Função setup é executada uma vez no início do programa
function setup() {
  // Para declarar uma constante é necessário usar a palavra reservada const
  // Constantes não podem ser alteradas depois de serem inicializadas
  // Const é uma variável com escopo global
  // e são acessiveis em todo o código independente de onde foram declaradas
  const canvasSize = min(windowWidth, windowHeight); // Define o tamanho do canvas baseado na menor dimensão da janela
  createCanvas(canvasSize, canvasSize, WEBGL);       // Canvas quadrado
  smooth()                                           // Ativa o antialiasing
  noStroke();                                        // Desativa o contorno dos objetos
  
  // Variaveis globais são inicializadas no setup
  // = é o operador de atribuição, ou seja, atribui um valor a uma variável
  // O tipo de uma variável é definido pelo valor que ela recebe
  // Tipo inteiro é declarado sem casas decimais
  // Tipo reais é declarado com casas decimais
  // Tipo string é declarado entre aspas
  // Tipo booleano é declarado com true ou false
  numero_de_colunas = 10;
  numero_de_linhas = numero_de_colunas;
  lado_do_quadrado = canvasSize / numero_de_colunas;
  raio = sqrt(pow(lado_do_quadrado, 2) / 2);
  velocidade_da_animacao = 2;
  contador_de_quadros_da_animacao = 0; 
  contador_de_iteracoes = 0;
}

// Função draw é executada a cada quadro da animação
// A fução draw é como um while loop, ou seja, é executada continuamente até que o programa seja interrompido
// Exemplo: while (true) { draw(); }
function draw() {
  // Define a cor do fundo conforme o contador de iterações
  background(atualiza_cor_do_fundo(contador_de_iteracoes));

  // Preenche os quadrados com a cor do quadrado conforme o contador de iterações
  fill(atualiza_cor_do_quadrado(contador_de_iteracoes));

  // Posiciona os quadrados no canvas
  desenha_xadrez();
  
  // Atualiza o contador de quadros da animação conforme a velocidade da animação passada como parâmetro
  atualiza_contador_de_quadros_da_animacao(velocidade_da_animacao);
  
  // % é o operador de módulo, ou seja, retorna o resto da divisão
  // == é o operador de igualdade, ou seja, verifica se os valores são iguais
  // && é o operador lógico E, ou seja, verifica se as duas condições são verdadeiras
  // || é o operador lógico OU, ou seja, verifica se pelo menos uma das condições é verdadeira
  // ! é o operador lógico NÃO, ou seja, inverte o valor lógico da condição
  // A estrutura condicional if verifica se a variação angular é múltipla de 90 e diferente de 0
  if (variacao_angular() % 90 == 0 && variacao_angular() != 0) {
    // ++ é o operador de incremento, ou seja, incrementa o valor da variável em 1
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
  // / é o operador de divisão
  // - é o operador de subtração
  return (lado_do_quadrado / 2) - (width / 2);
}

// Desenha os quadrados no canvas conforme o número de colunas e linhas
function desenha_xadrez() {
  // for é um loop
  // Ele executa o bloco de código enquanto a condição for verdadeira
  // O loop for é composto por 3 partes separadas por ;
  // A primeira parte é executada antes do loop começar
  // A segunda parte é a condição que é verificada antes de cada iteração do loop
  // A terceira parte é executada depois de cada iteração do loop
  // A estrutura do loop for é: for (inicialização; condição; incremento) { bloco de código }
  for (let coluna = 0; coluna < numero_de_colunas / 2; coluna++) {
    for (let linha = 0; linha < numero_de_linhas; linha++) {
      desenha_quadrado(coordenada_x_do_quadrado(coluna), coordenada_y_do_quadrado(linha), deslocamento_de_x(linha, paridade_da_iteracao(contador_de_iteracoes)))
    }
  }
}

// Calcula a coordenada x do quadrado baseado na coluna
function coordenada_x_do_quadrado (coluna) {
  // * é o operador de multiplicação
  // + é o operador de adição
  // / é o operador de comentário
  // - é o operador de subtração
  // () é o operador de precedência, ou seja, define a ordem de execução das operações
  return (coluna * (lado_do_quadrado * 2)) + correcao_de_posicionamento();
}

// Calcula a coordenada y do quadrado baseado na linha
function coordenada_y_do_quadrado(linha) {
  return (linha * lado_do_quadrado) +  correcao_de_posicionamento();
}

// Desloca o quadrado para a direita ou para a esquerda conforme a paridade da linha e da iteração
function deslocamento_de_x(linha, paridade_da_iteracao) {
  // Se a linha for par e a iteração for par ou se a linha for ímpar e a iteração for ímpar então o deslocamento é 0
  if ((linha % 2 == 0 && paridade_da_iteracao == "par") || (linha % 2 != 0 && paridade_da_iteracao == "impar")) {
    return 0;
    // Else é a condição contrária, ou seja, se a condição anterior não for verdadeira então o deslocamento é igual ao lado do quadrado
  } else {
    return lado_do_quadrado;
  }
}

// Desenha um quadrado com os vértices deslocados conforme a variação angular
function desenha_quadrado(x, y, deslocamento) {
  let angulo = 45;
  beginShape();    
  // < é o operador de menor que
  // > é o operador de maior que
  // <= é o operador de menor ou igual que
  // >= é o operador de maior ou igual que
  // != é o operador de diferente de
  for (let vertice = 0; vertice < 4; vertice++) {
    vertex(x + deslocamento + raio * cos(radians(angulo + variacao_angular())), y + raio * sin(radians(angulo + variacao_angular())));
    // += é o operador de incremento, ou seja, incrementa o valor da variável em um valor específico
    // Equivale a: angulo = angulo + 90;
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