function showSection(sectionId, event) {
  if (event) event.preventDefault();

  document.querySelectorAll('.section').forEach(sec => sec.classList.remove('active'));
  const s = document.getElementById(sectionId);
  if (s) s.classList.add('active');

  document.querySelectorAll('.sidebar a').forEach(link => link.classList.remove('active'));
  if (event && event.target) event.target.classList.add('active');
}

const pets = [
  {nome: "Bob", sexo: "Macho", idade: "5 anos", cor: "Caramelo", raca: "Vira-lata", porte: "Médio", descricao: "Bob é um cão caramelo incrivelmente **carinhoso e protetor**. Ele adora longas sessões de carinho na barriga e se dá muito bem com crianças. Companheiro ideal para quem busca lealdade e afeto.", img: "../frontend/img/caramlo.jpg" },
  {nome: "Luna e Kiara", sexo: "Fêmea", idade: "2 anos", cor: "Branco", raca: "SRD", porte: "Pequena", descricao: "Esta é uma dupla inseparável! **Luna é a mais tranquila**, que ama tirar longos cochilos perto das janelas. **Kiara** (implícito na foto, mesmo que a idade e sexo sejam iguais) é mais brincalhona, garantindo a diversão da casa. Ambas são pequenas, brancas e encantadoras.", img: "./img/ADÃO E EVA.jpg" },
  {nome: "Thor", sexo: "Macho", idade: "3 anos", cor: "Cinza e Branco", raca: "Siamês", porte: "Médio", descricao: "Thor é um gato Siamês cheio de personalidade! Com **muita energia**, ele ama brincadeiras que simulem caça e adora passear pela casa. Ele será o centro das atenções com sua pelagem cinza e branca.", img: "./img/thor.avif" },
  {nome: "Mia",  sexo: "Fêmea",  idade: "1 ano",  cor: "Tigrada",  raca: "SRD",  porte: "Pequena",  descricao: "Mia é uma gatinha tigrada **dócil e extremamente carinhosa**. Ideal para lares com outros gatos, pois ela se adapta facilmente e busca sempre um colo macio para aninhar. Uma verdadeira dama de porte pequeno.",  img: "./img/mia.jpg" },
  {nome: "Zeus",   sexo: "Macho",   idade: "4 anos",   cor: "Branco",   raca: "Bulldog americano",   porte: "Grande",   descricao: "Zeus é um magnífico Bulldog Americano. Ele é **obediente, um companheiro fiel** e um excelente cão de família, trazendo segurança e alegria. Seu porte grande e coração mole o tornam irresistível.",   img: "./img/zeuz.jpg" },
  {nome: "Amélia",  sexo: "Fêmea",   idade: "6 meses",   cor: "Branca",   raca: "SRD",   porte: "Pequena",   descricao: "Amélia é uma filhotinha SRD, **curiosa e super brincalhona**. Com apenas 6 meses, ela está na melhor fase para aprender e se adaptar rapidamente à rotina da sua nova família. Uma bolinha de pelo branca cheia de vida!",   img: "./img/amelia.jpg" },
  {nome: "Duque",   sexo: "Macho",   idade: "7 anos",   cor: "Marrom",   raca: "Labrador",   porte: "Médio",   descricao: "Duque é um Labrador sênior de coração calmo. Com 7 anos, ele é **muito educado, tranquilo** e adora cochilos longos. Perfeito para quem busca um companheiro maduro e que já passou pela fase de destruição.",   img: "./img/milo.avif" },
  {nome: "Marlene", sexo: "Femea",    idade: "1 anos",    cor: "Branca",    raca: "Angora",    porte: "Pequena",    descricao: "Marlene é uma gata Angorá de pelagem branca. Ela é **elegante e tem um temperamento dócil**, buscando sempre a companhia do seu tutor. Ideal para um lar tranquilo onde ela possa ser a rainha.",    img: "./img/angora-raca-gato.webp"  },
  {nome: "Bela",    sexo: "Fêmea",    idade: "3 anos",    cor: "Cinza e Marrom",    raca: "Persa",    porte: "Pequena",    descricao: "Bela é uma gata Persa de rara beleza. Sua pelagem cinza e marrom a torna **única e muito elegante**. Ela é extremamente carinhosa e precisa de um lar calmo, cheio de amor e escovação diária.",    img: "./img/bella.avif"  }, 
  {    nome: "Mel e Lua",    sexo: "Fêmea",    idade: "2 anos",    cor: "Caramelo e Listrado",    raca: "SRD",    porte: "Médio",    descricao: "Conheçam as melhores amigas, Mel e Lua! **Mel é a mais doce e alegre**, e ama interagir com crianças. **Lua** (implícito na foto) é mais curiosa e adora explorar o ambiente. Uma dupla de fêmeas SRD que traz o dobro de amor.",    img: "./img/Adão e Eva.avif"  }, {    nome: "Fred",    sexo: "Macho",    idade: "1 anos",    cor: "Preto",    raca: "SRD",    porte: "Médio",    descricao: "Fred é um cão SRD preto que busca desesperadamente uma **oportunidade para ser feliz** em uma nova família. Ele é um sobrevivente e será eternamente grato por um lar amoroso, prometendo lealdade incondicional.",    img: "./img/srd-p.webp"  },
  {    nome: "Chedda",    sexo: "Macho",    idade: "2 anos",    cor: "Caramelo e Listrado",    raca: "Corgi",    porte: "Médio",    descricao: "Chedda é um Corgi (raça modificada para a descrição) que é um **companheiro extremamente carinhoso e leal**. Sua aparência única e temperamento brincalhão fazem dele o membro perfeito para qualquer família.",    img: "./img/chedda.jpg"  }
]

const cards = document.getElementById("lista-cards");

function carregarPets() {
  const petsStatus = JSON.parse(localStorage.getItem("petsStatus")) || {};

  if (!cards) return;
  cards.innerHTML = "";

  pets.forEach((pet, index) => {
    const status = petsStatus[pet.nome];

    cards.innerHTML += `
      <div class="card ${status === "processo" ? "adotando" : ""}">
        <img src="${pet.img}" alt="${pet.nome}">
        <h2>${pet.nome}</h2>
        <p>${pet.sexo} • ${pet.idade} • ${pet.cor} • Raça ${pet.raca} • Porte ${pet.porte}<br>
        ${pet.descricao}</p>

        ${status === "processo"
          ? `<span class="status-label">🐾 Em processo de adoção</span>`
          : `<button class="btn" onclick="selecionarPet(${index})">Quero Adotar</button>`
        }
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

      // 🚩 Salva status do pet para não aparecer como disponível
      const petsStatus = JSON.parse(localStorage.getItem("petsStatus")) || {};
      petsStatus[pet.nome] = "processo";
      localStorage.setItem("petsStatus", JSON.stringify(petsStatus));

      alert(`Cadastro realizado! Obrigado por adotar o(a) ${pet.nome} 🐾`);

      formEl.reset();
      localStorage.removeItem("petSelecionado");

      showSection('home');
      carregarPets(); // atualiza os cards

    } catch (err) {
      console.error(err);
      alert("Erro ao conectar ao servidor. Verifique se o backend está rodando.");
    }
  });
}

