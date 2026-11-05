# MedCore - Sistema Hospitalar 🏥

Trabalho prático desenvolvido para a disciplina de **Programação Modular**. O sistema visa informatizar a gestão de um hospital, englobando o controle de pacientes, profissionais da saúde, agendamento de consultas e gestão de internações e leitos.

---

## 📄 Documentação (Versão atualizada de acordo com a Sprint2)

- **Diagrama UML:** [Diagrama.UML.TP-PM.drawio-version(2).pdf](artefatos/Diagrama.UML.TP-PM.drawio-version%282%29.pdf)
- **Cartão CRC:** [CartaoCRC-MedCore.pdf](artefatos/CartaoCRC-MedCore.pdf)

---

## 🛠️ Tecnologias Utilizadas

- **Backend:** Java, Spring Boot, Spring Data JPA
- **Banco de Dados:** PostgreSQL
- **Frontend:** React, Vite, CSS Modules

---

## ⚙️ Como Configurar e Rodar o Projeto

### 1. Pré-requisitos

Certifique-se de ter instalado em sua máquina:

- [Java 17+](https://www.oracle.com/java/technologies/javase-downloads.html)
- [PostgreSQL](https://www.postgresql.org/download/) (e pgAdmin4, se preferir interface gráfica)
- [Node.js](https://nodejs.org/) (para rodar o frontend)

### 2. Configurando o Banco de Dados (PostgreSQL)

Antes de rodar o backend, você precisa criar o banco de dados localmente.

1. Abra o **pgAdmin** ou o terminal do PostgreSQL (`psql`).
2. Crie um novo banco de dados vazio com o nome **exato**: `clinicavida`.

   ```sql
   CREATE DATABASE clinicavida;
   ```

3. No código do projeto, navegue até o arquivo `back/src/main/resources/application.properties`.
4. Altere as credenciais de acesso para corresponderem ao seu usuário e senha do PostgreSQL local:

   ```properties
   spring.datasource.username=SEU_USUARIO_AQUI
   spring.datasource.password=SUA_SENHA_AQUI
   ```

**Observação:** O Hibernate está configurado com `ddl-auto=update`, então as tabelas serão criadas automaticamente quando você rodar o projeto pela primeira vez.

### 3. Rodando o Backend

O projeto utiliza o Maven Wrapper, então não é necessário ter o Maven instalado globalmente.

Abra o terminal e navegue até a pasta `back`:

```bash
cd back
```

Execute a aplicação:

**Windows:**

```bash
.\mvnw spring-boot:run
```

**Mac/Linux:**

```bash
./mvnw spring-boot:run
```

A API estará rodando em:

`http://localhost:8080`

### 4. Rodando o Frontend

Abra um novo terminal e navegue até a pasta do frontend:

```bash
cd medcore-front
```

Instale as dependências:

```bash
npm install
```

Inicie o servidor de desenvolvimento:

```bash
npm run dev
```

Acesse a interface no navegador pelo endereço informado pelo Vite no terminal, geralmente:

`http://localhost:5173`

---

## 🚀 Entregas da Sprint 2

- Modelagem atualizada com **Polimorfismo e Herança** (Profissional e Atendimento).
- Implementação das camadas **Model, Repository, Service e Controller**.
- Integração de **Internações com ocupação automática de Quartos**.
- Tratamento global de exceções (**HTTP 400** para quebras de regras de negócio).
- Máquina de estados para impedir fluxo incorreto de **Consultas e Procedimentos**.
