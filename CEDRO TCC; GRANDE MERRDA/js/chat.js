// Chat responses and logic
const chatResponses = {
    "Sim, estou me sentindo ansioso(a)": {
        message: "É normal sentir ansiedade às vezes. Vamos fazer um exercício de respiração juntos para ajudar a acalmar seu sistema nervoso.",
        followUp: showBreathingExercise
    },
    "Estou tendo pensamentos negativos": {
        message: "Entendo que pensamentos negativos podem ser difíceis. Vamos tentar um exercício de aterramento para trazer sua mente para o momento presente.",
        followUp: showGroundingExercise
    },
    "Estou em pânico": {
        message: "Sinto muito que você esteja passando por isso. Vamos tentar uma técnica rápida para reduzir os sintomas de pânico. Primeiro, respire profundamente comigo.",
        followUp: showPanicHelp
    },
    "Preciso conversar com alguém": {
        message: "É importante buscar apoio quando precisamos. Além deste chat, você pode ligar para o CVV (188) a qualquer momento. Gostaria de tentar alguma técnica de relaxamento enquanto isso?",
        options: ["Sim, por favor", "Não, preciso de contato humano"]
    },
    "Sim, por favor": {
        message: "Vamos fazer um exercício de respiração simples para ajudar a relaxar.",
        followUp: showBreathingExercise
    },
    "Não, preciso de contato humano": {
        message: "Compreendo completamente. O contato humano é muito importante. Recomendo ligar para o CVV (188) agora mesmo, eles estão disponíveis 24h por dia. Você também pode agendar uma consulta com um de nossos profissionais através do formulário de contato.",
        followUp: showContactInfo
    },
    "Ainda ansioso(a)": {
        message: "Vamos tentar outra abordagem. Às vezes precisamos de diferentes técnicas para encontrar o que funciona melhor para você.",
        followUp: showAlternativeAnxietyTechnique
    },
    "Ainda com pensamentos negativos": {
        message: "Entendo que pode ser difícil mudar o padrão de pensamentos. Vamos tentar uma técnica de redirecionamento de pensamentos.",
        followUp: showThoughtRedirectionTechnique
    },
    "Ainda em pânico": {
        message: "Vamos continuar trabalhando nisso juntos. Tente este exercício de visualização para ajudar a acalmar seu sistema nervoso.",
        followUp: showVisualizationExercise
    },
    "Um pouco melhor": {
        message: "Que bom que está começando a se sentir melhor. Vamos continuar com mais uma técnica para ajudar ainda mais.",
        followUp: showProgressiveMuscleRelaxation
    },
    "Quero tentar outra técnica": {
        message: "Claro, vamos tentar uma abordagem diferente. Aqui está uma técnica de visualização que muitas pessoas acham útil.",
        followUp: showVisualizationExercise
    },
    "Preciso de mais ajuda": {
        message: "Estou aqui para ajudar. Vamos tentar uma técnica de relaxamento muscular progressivo que pode ajudar a liberar a tensão física.",
        followUp: showProgressiveMuscleRelaxation
    },
    "Gostaria de mais orientações": {
        message: "Que bom que você quer continuar. Aqui estão algumas estratégias adicionais que podem ajudar no seu bem-estar:",
        followUp: showAdditionalStrategies
    }
};

// Chat container reference
const chatContainer = document.getElementById('chatContainer');
const responseOptions = document.getElementById('responseOptions');

// Function to add a message to the chat
function addMessage(text, isUser = false) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `chat-message ${isUser ? 'user' : 'bot'}`;
    
    const messageContent = document.createElement('div');
    messageContent.className = 'message-content';
    
    const messageParagraph = document.createElement('p');
    messageParagraph.textContent = text;
    
    messageContent.appendChild(messageParagraph);
    messageDiv.appendChild(messageContent);
    chatContainer.appendChild(messageDiv);
    
    // Scroll to the bottom of the chat
    chatContainer.scrollTop = chatContainer.scrollHeight;
}

// Function to handle user option selection
function selectOption(option) {
    // Add user's selection to the chat
    addMessage(option, true);
    
    // Clear response options
    responseOptions.innerHTML = '';
    
    // Check if user is feeling better
    if (option === "Melhor" || option === "Estou melhor agora") {
        setTimeout(() => {
            addMessage("Fico feliz em saber que você está se sentindo melhor! Lembre-se que estamos sempre aqui para ajudar.");
            addMessage("Você gostaria de mais alguma orientação ou prefere encerrar o chat?");
            showOptions(["Gostaria de mais orientações", "Encerrar o chat"]);
        }, 500);
        return;
    }
    
    // If user wants to end chat after feeling better
    if (option === "Encerrar o chat") {
        setTimeout(() => {
            addMessage("Obrigado por usar nosso chat de emergência. Cuide-se e lembre-se que estamos sempre disponíveis quando precisar.");
            addMessage("Se precisar de ajuda novamente, basta retornar a esta página.");
        }, 500);
        return;
    }
    
    // Wait a moment before showing the bot's response
    setTimeout(() => {
        const response = chatResponses[option];
        
        if (response) {
            // Add bot's response
            addMessage(response.message);
            
            // If there's a follow-up function, call it
            if (response.followUp) {
                setTimeout(() => {
                    response.followUp();
                }, 1000);
            }
            
            // If there are new options, show them
            if (response.options) {
                setTimeout(() => {
                    showOptions(response.options);
                }, 1000);
            }
        } else {
            // If no specific response, continue with follow-up questions
            continueConversation(option);
        }
    }, 500);
}

// Function to show options
function showOptions(options) {
    responseOptions.innerHTML = '';
    
    options.forEach(option => {
        const button = document.createElement('button');
        button.className = 'btn btn-outline-primary mb-2 w-100';
        button.textContent = option;
        button.onclick = () => selectOption(option);
        responseOptions.appendChild(button);
    });
}

// Function to show breathing exercise
function showBreathingExercise() {
    const exerciseDiv = document.createElement('div');
    exerciseDiv.className = 'breathing-exercise';
    
    const heading = document.createElement('h3');
    heading.className = 'h5 mb-3';
    heading.textContent = 'Exercício de Respiração';
    
    const circle = document.createElement('div');
    circle.className = 'breathing-circle';
    circle.id = 'breathingCircle';
    circle.textContent = 'Inspire';
    
    const instructions = document.createElement('p');
    instructions.className = 'mb-0';
    instructions.textContent = 'Acompanhe o círculo: expanda ao inspirar, contraia ao expirar';
    
    exerciseDiv.appendChild(heading);
    exerciseDiv.appendChild(circle);
    exerciseDiv.appendChild(instructions);
    
    chatContainer.appendChild(exerciseDiv);
    chatContainer.scrollTop = chatContainer.scrollHeight;
    
    // Start breathing animation
    startBreathingAnimation();
    
    // After breathing exercise, show follow-up question
    setTimeout(() => {
        addMessage("Como você está se sentindo agora?");
        showOptions(["Melhor", "Ainda ansioso(a)", "Quero tentar outra técnica"]);
    }, 25000); // After about 4 breathing cycles
}

// Function to animate breathing
function startBreathingAnimation() {
    const circle = document.getElementById('breathingCircle');
    let count = 0;
    
    const breathingInterval = setInterval(() => {
        if (count % 2 === 0) {
            // Inhale
            circle.classList.add('inhale');
            circle.classList.remove('exhale');
            circle.textContent = 'Inspire';
        } else {
            // Exhale
            circle.classList.add('exhale');
            circle.classList.remove('inhale');
            circle.textContent = 'Expire';
        }
        
        count++;
        
        if (count >= 8) { // 4 complete breath cycles
            clearInterval(breathingInterval);
        }
    }, 3000); // 3 seconds for each inhale/exhale
}

// Function to show grounding exercise
function showGroundingExercise() {
    const exerciseDiv = document.createElement('div');
    exerciseDiv.className = 'grounding-exercise';
    
    const heading = document.createElement('h3');
    heading.className = 'h5 mb-3';
    heading.textContent = 'Exercício de Aterramento 5-4-3-2-1';
    
    const intro = document.createElement('p');
    intro.textContent = 'Observe ao seu redor e identifique:';
    
    const list = document.createElement('div');
    
    const items = [
        { icon: 'bi-eye', text: '5 coisas que você pode VER' },
        { icon: 'bi-hand', text: '4 coisas que você pode TOCAR' },
        { icon: 'bi-ear', text: '3 coisas que você pode OUVIR' },
        { icon: 'bi-nose', text: '2 coisas que você pode CHEIRAR' },
        { icon: 'bi-cup', text: '1 coisa que você pode PROVAR' }
    ];
    
    items.forEach(item => {
        const itemDiv = document.createElement('div');
        itemDiv.className = 'grounding-item';
        
        const icon = document.createElement('i');
        icon.className = `bi ${item.icon} fs-5`;
        
        const text = document.createElement('span');
        text.textContent = item.text;
        
        itemDiv.appendChild(icon);
        itemDiv.appendChild(text);
        list.appendChild(itemDiv);
    });
    
    exerciseDiv.appendChild(heading);
    exerciseDiv.appendChild(intro);
    exerciseDiv.appendChild(list);
    
    chatContainer.appendChild(exerciseDiv);
    chatContainer.scrollTop = chatContainer.scrollHeight;
    
    // After grounding exercise, show follow-up question
    setTimeout(() => {
        addMessage("Este exercício ajuda a trazer sua mente para o momento presente. Como você está se sentindo agora?");
        showOptions(["Melhor", "Ainda com pensamentos negativos", "Quero tentar outra técnica"]);
    }, 5000);
}

// Function to show panic help
function showPanicHelp() {
    addMessage("Vamos fazer um exercício simples de respiração para ajudar a reduzir o pânico:");
    
    setTimeout(() => {
        addMessage("1. Inspire lentamente pelo nariz contando até 4");
        
        setTimeout(() => {
            addMessage("2. Segure a respiração contando até 2");
            
            setTimeout(() => {
                addMessage("3. Expire lentamente pela boca contando até 6");
                
                setTimeout(() => {
                    addMessage("4. Repita este ciclo 4 vezes");
                    
                    setTimeout(() => {
                        addMessage("Lembre-se: ataques de pânico são temporários e vão passar. Você está seguro(a).");
                        
                        setTimeout(() => {
                            addMessage("Como você está se sentindo agora?");
                            showOptions(["Melhor", "Ainda em pânico", "Preciso de mais ajuda"]);
                        }, 3000);
                    }, 3000);
                }, 3000);
            }, 3000);
        }, 3000);
    }, 1000);
}

// Function to show contact information
function showContactInfo() {
    const contactDiv = document.createElement('div');
    contactDiv.className = 'contact-info p-3 bg-light rounded';
    
    contactDiv.innerHTML = `
        <h4 class="h5 mb-3">Contatos de Emergência:</h4>
        <p><strong>CVV (Centro de Valorização da Vida):</strong> 188 (24 horas)</p>
        <p><strong>SAMU:</strong> 192</p>
        <p><strong>Cedro Atendimento:</strong> (11) 4000-0000 (horário comercial)</p>
    `;
    
    chatContainer.appendChild(contactDiv);
    chatContainer.scrollTop = chatContainer.scrollHeight;
    
    setTimeout(() => {
        addMessage("Como você está se sentindo agora?");
        showOptions(["Melhor", "Ainda preciso de ajuda"]);
    }, 2000);
}

// Function to continue conversation based on user response
function continueConversation(option) {
    if (option.includes("Ainda") || option.includes("preciso") || option === "Um pouco melhor") {
        // User is not feeling better yet
        setTimeout(() => {
            addMessage("Vamos continuar trabalhando nisso juntos. Que tal tentarmos outra técnica?");
            showOptions([
                "Sim, quero tentar outra técnica",
                "Prefiro repetir a técnica anterior",
                "Preciso de contato humano"
            ]);
        }, 1000);
    } else if (option === "Sim, quero tentar outra técnica") {
        setTimeout(() => {
            addMessage("Aqui estão algumas técnicas que podem ajudar:");
            showOptions([
                "Exercício de respiração",
                "Técnica de aterramento",
                "Visualização guiada",
                "Relaxamento muscular"
            ]);
        }, 1000);
    } else if (option === "Exercício de respiração") {
        showBreathingExercise();
    } else if (option === "Técnica de aterramento") {
        showGroundingExercise();
    } else if (option === "Visualização guiada") {
        showVisualizationExercise();
    } else if (option === "Relaxamento muscular") {
        showProgressiveMuscleRelaxation();
    } else if (option === "Prefiro repetir a técnica anterior") {
        // Repeat last technique
        addMessage("Vamos repetir o exercício anterior, às vezes é preciso praticar algumas vezes para sentir o efeito.");
        // Default to breathing exercise if we don't know which was last
        showBreathingExercise();
    }
}

// Function to show visualization exercise
function showVisualizationExercise() {
    addMessage("Vamos fazer um exercício de visualização para ajudar a acalmar sua mente:");
    
    setTimeout(() => {
        addMessage("1. Feche os olhos e respire profundamente algumas vezes");
        
        setTimeout(() => {
            addMessage("2. Imagine um lugar onde você se sente completamente seguro e em paz");
            
            setTimeout(() => {
                addMessage("3. Observe os detalhes deste lugar - as cores, sons, texturas e cheiros");
                
                setTimeout(() => {
                    addMessage("4. Sinta a paz deste lugar envolvendo você como um cobertor quente e protetor");
                    
                    setTimeout(() => {
                        addMessage("5. Permaneça neste lugar por alguns momentos, respirando calmamente");
                        
                        setTimeout(() => {
                            addMessage("Como você está se sentindo agora?");
                            showOptions(["Melhor", "Um pouco melhor", "Ainda não estou bem"]);
                        }, 5000);
                    }, 3000);
                }, 3000);
            }, 3000);
        }, 3000);
    }, 1000);
}

// Function to show progressive muscle relaxation
function showProgressiveMuscleRelaxation() {
    addMessage("Vamos fazer um exercício de relaxamento muscular progressivo:");
    
    setTimeout(() => {
        addMessage("1. Sente-se confortavelmente e respire fundo algumas vezes");
        
        setTimeout(() => {
            addMessage("2. Tensione os músculos dos pés por 5 segundos, depois relaxe");
            
            setTimeout(() => {
                addMessage("3. Agora tensione os músculos das pernas por 5 segundos, depois relaxe");
                
                setTimeout(() => {
                    addMessage("4. Continue subindo pelo corpo - abdômen, peito, mãos, braços, ombros, pescoço e rosto");
                    
                    setTimeout(() => {
                        addMessage("5. Perceba como seu corpo está mais relaxado agora");
                        
                        setTimeout(() => {
                            addMessage("Como você está se sentindo após este exercício?");
                            showOptions(["Melhor", "Um pouco melhor", "Ainda tenso(a)"]);
                        }, 5000);
                    }, 3000);
                }, 3000);
            }, 3000);
        }, 3000);
    }, 1000);
}

// Function to show alternative anxiety technique
function showAlternativeAnxietyTechnique() {
    addMessage("Vamos tentar a técnica 4-7-8 para acalmar a ansiedade:");
    
    setTimeout(() => {
        addMessage("1. Inspire silenciosamente pelo nariz contando até 4");
        
        setTimeout(() => {
            addMessage("2. Segure a respiração contando até 7");
            
            setTimeout(() => {
                addMessage("3. Expire completamente pela boca fazendo um som suave contando até 8");
                
                setTimeout(() => {
                    addMessage("4. Repita este ciclo 4 vezes");
                    
                    setTimeout(() => {
                        addMessage("Como você está se sentindo agora?");
                        showOptions(["Melhor", "Um pouco melhor", "Ainda ansioso(a)"]);
                    }, 5000);
                }, 3000);
            }, 3000);
        }, 3000);
    }, 1000);
}

// Function to show thought redirection technique
function showThoughtRedirectionTechnique() {
    addMessage("Vamos praticar uma técnica para redirecionar pensamentos negativos:");
    
    setTimeout(() => {
        addMessage("1. Identifique o pensamento negativo que está tendo agora");
        
        setTimeout(() => {
            addMessage("2. Questione este pensamento: ele é baseado em fatos ou suposições?");
            
            setTimeout(() => {
                addMessage("3. Pense em uma perspectiva alternativa mais equilibrada");
                
                setTimeout(() => {
                    addMessage("4. Formule um pensamento mais realista e construtivo");
                    
                    setTimeout(() => {
                        addMessage("Como você está se sentindo após este exercício?");
                        showOptions(["Melhor", "Um pouco melhor", "Ainda com pensamentos negativos"]);
                    }, 5000);
                }, 3000);
            }, 3000);
        }, 3000);
    }, 1000);
}

// Function to show additional strategies
function showAdditionalStrategies() {
    const strategiesDiv = document.createElement('div');
    strategiesDiv.className = 'strategies-info p-3 bg-light rounded';
    
    strategiesDiv.innerHTML = `
        <h4 class="h5 mb-3">Estratégias para o Bem-estar:</h4>
        <ul>
            <li><strong>Prática diária de mindfulness:</strong> Dedique 5-10 minutos por dia</li>
            <li><strong>Atividade física regular:</strong> Mesmo caminhadas curtas podem ajudar</li>
            <li><strong>Sono adequado:</strong> Estabeleça uma rotina de sono consistente</li>
            <li><strong>Alimentação equilibrada:</strong> Evite excesso de cafeína e açúcar</li>
            <li><strong>Conexão social:</strong> Mantenha contato com pessoas que te apoiam</li>
        </ul>
    `;
    
    chatContainer.appendChild(strategiesDiv);
    chatContainer.scrollTop = chatContainer.scrollHeight;
    
    setTimeout(() => {
        addMessage("Espero que estas estratégias sejam úteis. Como você está se sentindo agora?");
        showOptions(["Estou melhor agora", "Ainda preciso de ajuda"]);
    }, 3000);
}