const perguntas = [
  { pergunta: "Qual é a principal causa das enchentes urbanas em São Paulo?", resposta: "acúmulo de lixo" },
  { pergunta: "Qual órgão brasileiro é responsável por monitorar desastres naturais?", resposta: "cemaden" },
  { pergunta: "Que tipo de solo contribui para o escoamento rápido da água da chuva?", resposta: "impermeável" },
  { pergunta: "Qual é a estação do ano com maior ocorrência de enchentes no Brasil?", resposta: "verão" },
  { pergunta: "Como a tecnologia pode ajudar a prever enchentes?", resposta: "inteligência artificial" }
];

let indiceAtual = 0;
let pontuacao = 0;

const perguntaEl = document.getElementById('pergunta');
const respostaEl = document.getElementById('resposta');
const botaoProximo = document.getElementById('proximo');
const mensagem = document.getElementById('message');
const containerPerguntas = document.getElementById('container-perguntas');
const containerResultado = document.getElementById('container-resultado');
const pontuacaoEl = document.getElementById('pontuacao');
const listaResultado = document.getElementById('lista-resultado');
const botaoReiniciar = document.getElementById('reiniciar');

function mostrarPergunta() {
  const atual = perguntas[indiceAtual];
  perguntaEl.textContent = atual.pergunta;
  respostaEl.value = '';
  mensagem.textContent = '';
  respostaEl.focus();
}

function finalizarQuiz() {
  containerPerguntas.classList.add('hidden');
  containerResultado.classList.remove('hidden');
  pontuacaoEl.textContent = `Você acertou ${pontuacao} de ${perguntas.length} perguntas.`;
}

botaoProximo.addEventListener('click', () => {
  const respostaUsuario = respostaEl.value.trim().toLowerCase();
  const respostaCorreta = perguntas[indiceAtual].resposta;

  const li = document.createElement('li');
  const correta = respostaUsuario === respostaCorreta;

  li.innerHTML = `<strong>${perguntas[indiceAtual].pergunta}</strong><br>Sua resposta: <em>${respostaUsuario}</em> ${correta ? '✅' : '❌'} - Correto: <strong>${respostaCorreta}</strong>`;
  listaResultado.appendChild(li);

  if (correta) pontuacao++;
  indiceAtual++;

  if (indiceAtual < perguntas.length) {
    mostrarPergunta();
  } else {
    finalizarQuiz();
  }
});

botaoReiniciar.addEventListener('click', () => {
  indiceAtual = 0;
  pontuacao = 0;
  listaResultado.innerHTML = '';
  containerPerguntas.classList.remove('hidden');
  containerResultado.classList.add('hidden');
  mostrarPergunta();
});

mostrarPergunta();
