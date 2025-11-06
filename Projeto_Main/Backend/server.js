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

app.post("/cadastra", (req, res) => {
    const { nome, email, cpf, endereco, pet } = req.body;

    if (!nome || !email || !cpf || !endereco || !pet || !pet.nome) {
        return res.status(400).json({ error: "Preencha todos os campos obrigatórios." });
    }
    const checkUser = "SELECT id_usuario FROM usuario WHERE cpf = ?";
    db.query(checkUser, [cpf], (err, userResult) => {
        if (err) {
            console.error("Erro ao verificar usuário:", err);
            return res.status(500).json({ error: "Erro ao verificar usuário." });
        }

        const sqlPet = `
            INSERT INTO pet (nome, sexo, idade,  raca, cor, porte)
            VALUES (?, ?, ?,?, ?, ?)
        `;

        db.query(sqlPet, [pet.nome, pet.sexo, pet.idade, pet.cor, pet.raca, pet.porte], (errPet, petResult) => {
            if (errPet) {
                console.error("Erro ao cadastrar pet:", errPet);
                return res.status(500).json({ error: "Erro ao salvar pet." });
            }

            const petId = petResult.insertId;
            if (userResult.length > 0) {
                const idUsuario = userResult[0].id_usuario;

                const linkPetUser = `
                    UPDATE usuario SET id_pet = ? WHERE id_usuario = ?
                `;
                db.query(linkPetUser, [petId, idUsuario]);

                return res.status(201).json({
                    message: "Pet cadastrado com sucesso para usuário já existente!",
                    id_pet: petId,
                    id_usuario: idUsuario
                });
            }

            const sqlUser = `
                INSERT INTO usuario (nome, email, cpf, endereco, id_pet)
                VALUES (?, ?, ?, ?, ?)
            `;

            db.query(sqlUser, [nome, email, cpf, endereco, petId], (errUser, userInserted) => {
                if (errUser) {
                    console.error("Erro ao cadastrar usuário:", errUser);
                    return res.status(500).json({ error: "Erro ao salvar usuário." });
                }

                res.status(201).json({
                    message: "Usuário e pet cadastrados com sucesso!",
                    id_usuario: userInserted.insertId,
                    id_pet: petId
                });
            });
        });
    });
});


app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
