-- Database structure for subscription system

-- Users table
CREATE TABLE users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_active BOOLEAN DEFAULT TRUE
);

-- Subscription plans table
CREATE TABLE subscription_plans (
    plan_id INT AUTO_INCREMENT PRIMARY KEY,
    plan_name VARCHAR(50) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    duration_months INT NOT NULL DEFAULT 1,
    is_active BOOLEAN DEFAULT TRUE
);

-- Insert default monthly plan
INSERT INTO subscription_plans (plan_name, description, price, duration_months) 
VALUES ('Plano Mensal Sem Anúncios', 'Acesso a todo o conteúdo do site sem anúncios por um mês', 9.90, 1);

-- User subscriptions table
CREATE TABLE user_subscriptions (
    subscription_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    plan_id INT NOT NULL,
    start_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    end_date TIMESTAMP,
    is_active BOOLEAN DEFAULT TRUE,
    auto_renew BOOLEAN DEFAULT TRUE,
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    FOREIGN KEY (plan_id) REFERENCES subscription_plans(plan_id)
);

-- Payment transactions table
CREATE TABLE payment_transactions (
    transaction_id INT AUTO_INCREMENT PRIMARY KEY,
    subscription_id INT NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    payment_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    payment_method VARCHAR(50) NOT NULL,
    transaction_status VARCHAR(20) NOT NULL,
    payment_details TEXT,
    FOREIGN KEY (subscription_id) REFERENCES user_subscriptions(subscription_id)
);