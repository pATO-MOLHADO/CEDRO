<?php
// Configuração da conexão com o banco de dados
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "cedro_db";

// Criar conexão
$conn = new mysqli($servername, $username, $password, $dbname);

// Verificar conexão
if ($conn->connect_error) {
    die("Falha na conexão: " . $conn->connect_error);
}

// Processar dados do formulário
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $nome = $_POST['nome'];
    $email = $_POST['email'];
    $cartao = $_POST['cartao'];
    $validade = $_POST['validade'];
    $cvv = $_POST['cvv'];
    
    // Sanitizar dados
    $nome = $conn->real_escape_string($nome);
    $email = $conn->real_escape_string($email);
    
    // Verificar se o usuário já existe
    $sql = "SELECT user_id FROM users WHERE email = '$email'";
    $result = $conn->query($sql);
    
    if ($result->num_rows > 0) {
        // Usuário já existe, obter ID
        $row = $result->fetch_assoc();
        $user_id = $row["user_id"];
    } else {
        // Criar novo usuário
        $password_hash = password_hash(uniqid(), PASSWORD_DEFAULT); // Senha temporária
        $sql = "INSERT INTO users (username, email, password) VALUES ('$nome', '$email', '$password_hash')";
        
        if ($conn->query($sql) === TRUE) {
            $user_id = $conn->insert_id;
        } else {
            echo "Erro ao criar usuário: " . $conn->error;
            exit;
        }
    }
    
    // Obter ID do plano mensal
    $sql = "SELECT plan_id FROM subscription_plans WHERE plan_name = 'Plano Mensal Sem Anúncios'";
    $result = $conn->query($sql);
    
    if ($result->num_rows > 0) {
        $row = $result->fetch_assoc();
        $plan_id = $row["plan_id"];
        
        // Calcular data de término (1 mês a partir de hoje)
        $end_date = date('Y-m-d H:i:s', strtotime('+1 month'));
        
        // Criar assinatura
        $sql = "INSERT INTO user_subscriptions (user_id, plan_id, end_date) 
                VALUES ('$user_id', '$plan_id', '$end_date')";
        
        if ($conn->query($sql) === TRUE) {
            $subscription_id = $conn->insert_id;
            
            // Registrar transação de pagamento
            $sql = "INSERT INTO payment_transactions (subscription_id, amount, payment_method, transaction_status) 
                    VALUES ('$subscription_id', 9.90, 'Cartão de Crédito', 'Aprovado')";
            
            if ($conn->query($sql) === TRUE) {
                // Redirecionar para página de sucesso
                header("Location: assinatura-sucesso.html");
                exit;
            } else {
                echo "Erro ao registrar pagamento: " . $conn->error;
            }
        } else {
            echo "Erro ao criar assinatura: " . $conn->error;
        }
    } else {
        echo "Plano não encontrado";
    }
}

$conn->close();
?>