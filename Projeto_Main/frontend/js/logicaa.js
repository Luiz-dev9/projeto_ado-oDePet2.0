function showSection(sectionId, event) {
  if (event) event.preventDefault();

  document.querySelectorAll('.section').forEach(sec => sec.classList.remove('active'));
  const s = document.getElementById(sectionId);
  if (s) s.classList.add('active');

  document.querySelectorAll('.sidebar a').forEach(link => link.classList.remove('active'));
  if (event && event.target) event.target.classList.add('active');
}

const pets = [
  { nome: "Bob", sexo: "Macho", idade: "5 anos", cor: "Caramelo", raca: "Vira-lata", porte: "Médio", descricao: "Bob é carinhoso, protetor e adora receber carinho.", img: "../frontend/img/caramlo.jpg" },
  { nome: "Luna e Kiara", sexo: "Fêmea", idade: "2 anos", cor: "Branco", raca: "SRD", porte: "Pequena", descricao: "Luna é tranquila, ama janelas e cochilos ao sol.", img: "./img/ADÃO E EVA.jpg" },
  { nome: "Thor", sexo: "Macho", idade: "3 anos", cor: "Cinza e Branco", raca: "Siamês", porte: "Médio", descricao: "Thor tem muita energia, ama brincar e passear.", img: "./img/thor.avif" },
  { nome: "Mia", sexo: "Fêmea", idade: "1 ano", cor: "Tigrada", raca: "SRD", porte: "Pequena", descricao: "Mia é dócil, carinhosa e se dá bem com outros gatos.", img: "./img/mia.jpg" },
  { nome: "Zeus", sexo: "Macho", idade: "4 anos", cor: "Branco", raca: "Bulldog americano", porte: "Grande", descricao: "Zeus é obediente, companheiro e ótimo para famílias.", img: "./img/zeuz.jpg" },
  { nome: "Amélia", sexo: "Fêmea", idade: "6 meses", cor: "Branca", raca: "SRD", porte: "Pequena", descricao: "Amélia é curiosa e brincalhona, adapta-se rápido.", img: "./img/amelia.jpg" },
  { nome: "Duque", sexo: "Macho", idade: "7 anos", cor: "Marrom", raca: "Labrador", porte: "Médio", descricao: "Duque é calmo e muito educado.", img: "./img/milo.avif" },
  { nome: "Bela", sexo: "Fêmea", idade: "3 anos", cor: "Cinza e Marrom", raca: "Persa", porte: "Pequena", descricao: "Bela é elegante, carinhosa e precisa de um lar cheio de amor.", img: "./img/bella.avif" },
  { nome: "Mel e Lua", sexo: "Fêmea", idade: "2 anos", cor: "Caramelo e Listrado", raca: "SRD", porte: "Médio", descricao: "Mel é doce, alegre e ama crianças.", img: "./img/Adão  e Eva.avif" }
];

const cards = document.getElementById("lista-cards");

function carregarPets() {
  if (!cards) return;
  cards.innerHTML = "";

  pets.forEach((pet, index) => {
    cards.innerHTML += `
      <div class="card">
        <img src="${pet.img}" alt="${pet.nome}">
        <h2>${pet.nome}</h2>
        <p>${pet.sexo} • ${pet.idade} • ${pet.cor} • Raça ${pet.raca} • Porte ${pet.porte}<br>
        ${pet.descricao}</p>
        <button class="btn" onclick="selecionarPet(${index})">Quero Adotar</button>
      </div>
    `;
  });
}
carregarPets();

function selecionarPet(index) {
  const pet = pets[index];
  if (!pet) return;
  localStorage.setItem("petSelecionado", JSON.stringify(pet));
  showSection('Cadastro');
  preencherFormularioPet();
}

function preencherFormularioPet() {
  const pet = JSON.parse(localStorage.getItem("petSelecionado"));
  if (!pet) return;

  const fields = {
    petNome: pet.nome,
    petSexo: pet.sexo,
    petIdade: pet.idade,
    petCor: pet.cor,
    petRaca: pet.raca,
    petPorte: pet.porte
  };

  for (const id in fields) {
    const el = document.getElementById(id);
    if (el) el.value = fields[id];
  }
}

document.addEventListener("DOMContentLoaded", preencherFormularioPet);

const API = 'http://localhost:3000';

const formEl = document.getElementById("form");
if (formEl) {
  formEl.addEventListener('submit', async function (e) {
    e.preventDefault();

    const nome = document.getElementById("nome")?.value?.trim();
    const email = document.getElementById("email")?.value?.trim();
    const cpf = document.getElementById("cpf")?.value?.trim();
    const endereco = document.getElementById("ender")?.value?.trim();

    const pet = {
      nome: document.getElementById("petNome")?.value || "",
      sexo: document.getElementById("petSexo")?.value
        ?.toLowerCase()
        ?.normalize("NFD").replace(/[\u0300-\u036f]/g, ""),
      idade: parseInt(document.getElementById("petIdade")?.value) || 0,
      cor: document.getElementById("petCor")?.value || "",
      raca: document.getElementById("petRaca")?.value || "",
      porte: document.getElementById("petPorte")?.value || ""
    };

    if (!nome || !email || !cpf || !endereco || !pet.nome) {
      alert("Preencha todos os campos e selecione um pet antes de enviar.");
      return;
    }

    try {
      const res = await fetch(`${API}/cadastra`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome, email, cpf, endereco, pet })
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        alert(data.error || "Erro ao cadastrar");
        return;
      }

      alert(`Cadastro realizado! Obrigado por adotar o(a) ${pet.nome} 🐾`);
      formEl.reset();
      localStorage.removeItem("petSelecionado");

      showSection('home');

    } catch (err) {
      console.error(err);
      alert("Erro ao conectar ao servidor. Verifique se o backend está rodando.");
    }
  });
}
