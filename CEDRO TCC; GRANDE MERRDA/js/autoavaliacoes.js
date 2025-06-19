// Função para calcular o resultado da avaliação de ansiedade
function calcularAnsiedade() {
    // Verificar se todas as perguntas foram respondidas
    let formulario = document.getElementById('ansiedadeForm');
    let perguntas = ['pergunta1', 'pergunta2', 'pergunta3', 'pergunta4', 'pergunta5'];
    let todasRespondidas = true;
    
    for (let pergunta of perguntas) {
        let opcoes = formulario.elements[pergunta];
        let respondida = false;
        
        for (let i = 0; i < opcoes.length; i++) {
            if (opcoes[i].checked) {
                respondida = true;
                break;
            }
        }
        
        if (!respondida) {
            todasRespondidas = false;
            break;
        }
    }
    
    if (!todasRespondidas) {
        alert('Por favor, responda todas as perguntas para ver o resultado.');
        return;
    }
    
    // Calcular pontuação
    let pontuacao = 0;
    
    for (let pergunta of perguntas) {
        let opcoes = formulario.elements[pergunta];
        
        for (let i = 0; i < opcoes.length; i++) {
            if (opcoes[i].checked) {
                pontuacao += parseInt(opcoes[i].value);
                break;
            }
        }
    }
    
    // Mostrar resultado
    let resultado = document.getElementById('resultadoAnsiedade');
    let pontuacaoTexto = document.getElementById('pontuacaoAnsiedade');
    let interpretacao = document.getElementById('interpretacaoAnsiedade');
    
    pontuacaoTexto.textContent = `Sua pontuação: ${pontuacao} de 15 pontos`;
    
    if (pontuacao >= 0 && pontuacao <= 4) {
        interpretacao.textContent = 'Sintomas mínimos de ansiedade. Continue monitorando seu bem-estar emocional.';
    } else if (pontuacao >= 5 && pontuacao <= 9) {
        interpretacao.textContent = 'Sintomas leves a moderados de ansiedade. Considere implementar técnicas de gerenciamento de estresse.';
    } else if (pontuacao >= 10 && pontuacao <= 14) {
        interpretacao.textContent = 'Sintomas moderados a severos de ansiedade. Recomendamos buscar orientação profissional.';
    } else {
        interpretacao.textContent = 'Sintomas severos de ansiedade. Recomendamos fortemente buscar ajuda profissional o mais breve possível.';
    }
    
    resultado.classList.remove('d-none');
    resultado.scrollIntoView({ behavior: 'smooth' });
}

// Função para calcular o resultado da avaliação de depressão
function calcularDepressao() {
    // Verificar se todas as perguntas foram respondidas
    let formulario = document.getElementById('depressaoForm');
    let perguntas = ['pergunta1d', 'pergunta2d', 'pergunta3d', 'pergunta4d', 'pergunta5d'];
    let todasRespondidas = true;
    
    for (let pergunta of perguntas) {
        let opcoes = formulario.elements[pergunta];
        let respondida = false;
        
        for (let i = 0; i < opcoes.length; i++) {
            if (opcoes[i].checked) {
                respondida = true;
                break;
            }
        }
        
        if (!respondida) {
            todasRespondidas = false;
            break;
        }
    }
    
    if (!todasRespondidas) {
        alert('Por favor, responda todas as perguntas para ver o resultado.');
        return;
    }
    
    // Calcular pontuação
    let pontuacao = 0;
    
    for (let pergunta of perguntas) {
        let opcoes = formulario.elements[pergunta];
        
        for (let i = 0; i < opcoes.length; i++) {
            if (opcoes[i].checked) {
                pontuacao += parseInt(opcoes[i].value);
                break;
            }
        }
    }
    
    // Mostrar resultado
    let resultado = document.getElementById('resultadoDepressao');
    let pontuacaoTexto = document.getElementById('pontuacaoDepressao');
    let interpretacao = document.getElementById('interpretacaoDepressao');
    
    pontuacaoTexto.textContent = `Sua pontuação: ${pontuacao} de 15 pontos`;
    
    if (pontuacao >= 0 && pontuacao <= 4) {
        interpretacao.textContent = 'Sintomas mínimos de depressão. Continue monitorando seu bem-estar emocional.';
    } else if (pontuacao >= 5 && pontuacao <= 9) {
        interpretacao.textContent = 'Sintomas leves a moderados de depressão. Considere implementar atividades que promovam bem-estar.';
    } else if (pontuacao >= 10 && pontuacao <= 14) {
        interpretacao.textContent = 'Sintomas moderados a severos de depressão. Recomendamos buscar orientação profissional.';
    } else {
        interpretacao.textContent = 'Sintomas severos de depressão. Recomendamos fortemente buscar ajuda profissional o mais breve possível.';
    }
    
    resultado.classList.remove('d-none');
    resultado.scrollIntoView({ behavior: 'smooth' });
}