CREATE DATABASE IF NOT EXISTS petlife;
USE petlife; 


CREATE TABLE pet (
    id_pet INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    sexo ENUM('macho', 'femea') NOT NULL,
    idade INT NOT NULL,
    cor VARCHAR(20) NOT NULL,
    porte VARCHAR(30) NOT NULL
);

CREATE TABLE usuario (
    id_usuario INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    cpf VARCHAR(20) NOT NULL UNIQUE,
    endereco VARCHAR(150),
    id_pet INT,
    FOREIGN KEY (id_pet) REFERENCES pet(id_pet)
);

select * from usuario;
select * from pet;
