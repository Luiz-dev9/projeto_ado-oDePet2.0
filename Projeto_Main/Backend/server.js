const express = require("express");
const cors = require("cors");
const db = require("./db");
const PORT = 3000;
const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Servidor AdotaPet rodando!");
});

// Rota de cadastro (usuário + pet)
app.post("/cadastra", (req, res) => {
    const { nome, email, cpf, endereco, pet } = req.body;

    if (!nome || !email || !cpf || !endereco || !pet || !pet.nome) {
        return res.status(400).json({ error: "Preencha todos os campos obrigatórios." });
    }

    // Verifica se usuário já existe
    const checkUser = "SELECT id_usuario FROM usuario WHERE cpf = ?";
    db.query(checkUser, [cpf], (err, result) => {
        if (err) {
            console.error("Erro ao verificar usuário:", err);
            return res.status(500).json({ error: "Erro ao verificar usuário." });
        }

        if (result.length > 0) {
            return res.status(400).json({ error: "Usuário com este CPF já possui cadastro!" });
        }

        // Cadastrar PET primeiro
        const sqlPet = `
            INSERT INTO pet (nome, sexo, idade, cor, porte)
            VALUES (?, ?, ?, ?, ?)
        `;

        db.query(sqlPet, [pet.nome, pet.sexo, pet.idade, pet.cor, pet.porte], (errPet, petResult) => {
            if (errPet) {
                console.error("Erro ao cadastrar pet:", errPet);
                return res.status(500).json({ error: "Erro ao salvar pet." });
            }

            const petId = petResult.insertId;

            // Depois cadastrar usuário com id_pet
            const sqlUser = `
                INSERT INTO usuario (nome, email, cpf, endereco, id_pet)
                VALUES (?, ?, ?, ?, ?)
            `;

            db.query(sqlUser, [nome, email, cpf, endereco, petId], (errUser) => {
                if (errUser) {
                    console.error("Erro ao cadastrar usuário:", errUser);
                    return res.status(500).json({ error: "Erro ao salvar usuário." });
                }

                res.status(201).json({ message: "Cadastro realizado com sucesso!" });
            });
        });
    });
});

app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
