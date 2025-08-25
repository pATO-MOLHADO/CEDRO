// Dados dos testes
const testes = {
    ansiedade: {
        titulo: "Teste de Ansiedade",
        perguntas: [
            {
                texto: "Com que frequência você se sente nervoso ou ansioso?",
                opcoes: ["Nunca", "Raramente", "Às vezes", "Frequentemente", "Sempre"]
            },
            {
                texto: "Você tem dificuldade para relaxar?",
                opcoes: ["Nunca", "Raramente", "Às vezes", "Frequentemente", "Sempre"]
            },
            {
                texto: "Você se preocupa excessivamente com coisas pequenas?",
                opcoes: ["Nunca", "Raramente", "Às vezes", "Frequentemente", "Sempre"]
            },
            {
                texto: "Você sente sintomas físicos como coração acelerado ou suor?",
                opcoes: ["Nunca", "Raramente", "Às vezes", "Frequentemente", "Sempre"]
            },
            {
                texto: "Você evita situações que podem causar ansiedade?",
                opcoes: ["Nunca", "Raramente", "Às vezes", "Frequentemente", "Sempre"]
            }
        ]
    },
    depressao: {
        titulo: "Teste de Depressão",
        perguntas: [
            {
                texto: "Com que frequência você se sente triste ou desanimado?",
                opcoes: ["Nunca", "Raramente", "Às vezes", "Frequentemente", "Sempre"]
            },
            {
                texto: "Você perdeu interesse em atividades que antes gostava?",
                opcoes: ["Nunca", "Raramente", "Às vezes", "Frequentemente", "Sempre"]
            },
            {
                texto: "Você tem dificuldade para dormir ou dorme demais?",
                opcoes: ["Nunca", "Raramente", "Às vezes", "Frequentemente", "Sempre"]
            },
            {
                texto: "Você se sente sem energia ou cansado?",
                opcoes: ["Nunca", "Raramente", "Às vezes", "Frequentemente", "Sempre"]
            },
            {
                texto: "Você tem pensamentos negativos sobre si mesmo?",
                opcoes: ["Nunca", "Raramente", "Às vezes", "Frequentemente", "Sempre"]
            }
        ]
    },
    estresse: {
        titulo: "Teste de Estresse",
        perguntas: [
            {
                texto: "Você se sente sobrecarregado com suas responsabilidades?",
                opcoes: ["Nunca", "Raramente", "Às vezes", "Frequentemente", "Sempre"]
            },
            {
                texto: "Você tem dificuldade para se concentrar?",
                opcoes: ["Nunca", "Raramente", "Às vezes", "Frequentemente", "Sempre"]
            },
            {
                texto: "Você se irrita facilmente com pequenas coisas?",
                opcoes: ["Nunca", "Raramente", "Às vezes", "Frequentemente", "Sempre"]
            },
            {
                texto: "Você sente tensão muscular ou dores de cabeça?",
                opcoes: ["Nunca", "Raramente", "Às vezes", "Frequentemente", "Sempre"]
            },
            {
                texto: "Você tem dificuldade para tomar decisões?",
                opcoes: ["Nunca", "Raramente", "Às vezes", "Frequentemente", "Sempre"]
            }
        ]
    }
};

let testeAtual = null;
let perguntaAtual = 0;
let respostas = [];

function iniciarTeste(tipo) {
    testeAtual = testes[tipo];
    perguntaAtual = 0;
    respostas = [];
    
    document.getElementById('teste-titulo').textContent = testeAtual.titulo;
    document.querySelector('section').style.display = 'none';
    document.getElementById('teste-area').style.display = 'block';
    document.getElementById('resultado-area').style.display = 'none';
    
    mostrarPergunta();
}

function mostrarPergunta() {
    const pergunta = testeAtual.perguntas[perguntaAtual];
    document.getElementById('pergunta-texto').textContent = pergunta.texto;
    document.getElementById('progresso-texto').textContent = `Pergunta ${perguntaAtual + 1} de ${testeAtual.perguntas.length}`;
    
    const opcoesContainer = document.getElementById('opcoes-container');
    opcoesContainer.innerHTML = '';
    
    pergunta.opcoes.forEach((opcao, index) => {
        const button = document.createElement('button');
        button.className = 'btn btn-outline-primary';
        button.textContent = opcao;
        button.onclick = () => responder(index);
        opcoesContainer.appendChild(button);
    });
    
    document.getElementById('btn-voltar').style.display = perguntaAtual > 0 ? 'block' : 'none';
}

function responder(valor) {
    respostas[perguntaAtual] = valor;
    perguntaAtual++;
    
    if (perguntaAtual < testeAtual.perguntas.length) {
        mostrarPergunta();
    } else {
        mostrarResultado();
    }
}

function voltarPergunta() {
    if (perguntaAtual > 0) {
        perguntaAtual--;
        mostrarPergunta();
    }
}

function mostrarResultado() {
    const pontuacao = respostas.reduce((total, resposta) => total + resposta, 0);
    const maxPontuacao = testeAtual.perguntas.length * 4;
    const percentual = (pontuacao / maxPontuacao) * 100;
    
    let nivel, cor, recomendacao;
    
    if (percentual <= 25) {
        nivel = "Baixo";
        cor = "success";
        recomendacao = "Seus níveis estão dentro do normal. Continue cuidando do seu bem-estar!";
    } else if (percentual <= 50) {
        nivel = "Moderado";
        cor = "warning";
        recomendacao = "Alguns sinais podem indicar a necessidade de atenção. Considere conversar com um profissional.";
    } else if (percentual <= 75) {
        nivel = "Alto";
        cor = "danger";
        recomendacao = "Recomendamos buscar ajuda profissional para melhor avaliação e suporte.";
    } else {
        nivel = "Muito Alto";
        cor = "danger";
        recomendacao = "É importante buscar ajuda profissional o quanto antes. Não hesite em nos contatar.";
    }
    
    document.getElementById('resultado-conteudo').innerHTML = `
        <div class="alert alert-${cor} mb-4">
            <h4 class="fw-bold">Nível: ${nivel}</h4>
            <p class="mb-0">${recomendacao}</p>
        </div>
        <p class="text-muted">
            <strong>Importante:</strong> Este teste é apenas uma ferramenta de autoavaliação e não substitui 
            uma avaliação profissional. Para um diagnóstico preciso, consulte um psicólogo ou psiquiatra.
        </p>
    `;
    
    document.getElementById('teste-area').style.display = 'none';
    document.getElementById('resultado-area').style.display = 'block';
}

function reiniciarTeste() {
    document.getElementById('resultado-area').style.display = 'none';
    document.querySelector('section').style.display = 'block';
    testeAtual = null;
    perguntaAtual = 0;
    respostas = [];
}