const form = document.querySelector('#leadForm')
const nameInput = document.querySelector('#leadNameAndLastname')
const emailInput = document.querySelector('#leadEmail')
const whatsappInput = document.querySelector('#leadWhatsapp')

// Máscara do WhatsApp
whatsappInput.addEventListener('input', (e) => {
  let value = e.target.value.replace(/\D/g, "");
  if (value.length > 11) value = value.slice(0, 11);

  if (value.length > 10) {
    value = value.replace(/^(\d{2})(\d{5})(\d{4}).*/, "($1) $2-$3");
  } else if (value.length > 6) {
    value = value.replace(/^(\d{2})(\d{4})(\d{0,4}).*/, "($1) $2-$3");
  } else if (value.length > 2) {
    value = value.replace(/^(\d{2})(\d{0,5})/, "($1) $2");
  } else {
    value = value.replace(/^(\d*)/, "($1");
  }
  e.target.value = value;
});

// Validação no envio
form.addEventListener('submit', (e) => {
  let valid = true;

  if (!/^[A-Za-zÀ-ú]+\s+[A-Za-zÀ-ú]+$/.test(nameInput.value.trim())) {
    alert("Por favor, insira nome e sobrenome.");
    valid = false;
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value.trim())) {
    alert("Digite um e-mail válido.");
    valid = false;
  }

  const digits = whatsappInput.value.replace(/\D/g, "");
  if (digits.length < 10) {
    alert("Digite um número de WhatsApp válido.");
    valid = false;
  }

  if (!valid) {
    e.preventDefault(); // <-- BLOQUEIA envio
    return false;
  }

  alert('Dados enviados com sucesso!');
});


// Criando comentarios
const commentsData = [
  {
    profilePicUrl: 'https://i.ibb.co/sdqpJ2s0/semfoto.jpg',
    name: 'gtprojetos',
    time: 'há um mês',
    comment: 'Muito obrigado pela apresentação do Projeto Incrível. Ficamos impressionados com a qualidade e o potencial da proposta, e certamente consideraremos oportunidades de parceria futura. Agradecemos especialmente à Lígia(Pilar) pela atenção e pela forma clara como nos guiou durante toda a apresentação.Sua dedicação fez toda a diferença.Parabéns a todos os envolvidos'
  },
  {
    profilePicUrl: 'https://i.ibb.co/5ggjwRmK/retrato-do-homem-moderno-23-2147961425.jpg',
    name: 'Guilherme Ribeiro',
    time: 'há um ano',
    comment: 'Um empreendimento exclusivo, com apenas 40 apartamentos de alto padrão para aqueles que buscam exclusividade. Uma vista livre, olhando o sol, com um sobressolo que eleva o lazer para 6o andar permitindo que mesmo o apartamento mais baixo tenha vista. O lançamento será em agosto de 2024.'
  },
  {
    profilePicUrl: 'https://i.ibb.co/Kc6RFhJP/tatianagrehdi.webp',
    name: 'Tatiana Greghi',
    time: 'há 9 meses',
    comment: 'Empreendimento lindo demais. Localização privilegiada e condições super especiais na aquisição.'
  },
]

function createComment({ profilePicUrl, name, time, comment }) {
  //Cria elemento principal aonde vão os comentarios:
  const commentContainer = document.createElement('article')
  commentContainer.classList.add('comment')

  // Criar a caixa de header do comentario
  const commentHeaderBox = document.createElement('header')
  commentHeaderBox.classList.add('comment-box-header')

  // Div com as informacoes do usuario
  const userInformation = document.createElement('div')
  userInformation.classList.add('user-information')

  // Div foto de perfil
  const profilePic = document.createElement('div')
  profilePic.classList.add('profile-pic')
  profilePic.ariaHidden = true
  profilePic.style.backgroundImage = `url('${profilePicUrl}')`

  // Colocando profile pic dentro da div de info.
  userInformation.appendChild(profilePic)

  // Textos do nome
  const userNameInformation = document.createElement('div')
  userNameInformation.classList.add('user-name-information')

  //p com o nome
  const userName = document.createElement('p')
  userName.classList.add('user-name')
  userName.innerText = name

  //Criando o campo data
  const commentDate = document.createElement('p')
  commentDate.classList.add('comment-date')
  commentDate.innerText = time

  // colocando as informacoes dentro da div de informacoes e ela na principal
  userNameInformation.appendChild(userName)
  userNameInformation.appendChild(commentDate)
  userInformation.appendChild(userNameInformation)

  // Colando as informacoes na header
  commentHeaderBox.appendChild(userInformation)

  // Criando logo do google da header
  const googleLogo = document.createElement('img')
  googleLogo.classList.add('google-logo-icon')
  googleLogo.src = 'https://i.ibb.co/BVqZGSLY/Google-G-logo-svg.png'
  googleLogo.alt = 'Logo Google'
  googleLogo.loading = 'lazy'
  googleLogo.ariaHidden = true

  // Colando a logo na header
  commentHeaderBox.appendChild(googleLogo)

  // colocando a header no comentario principal
  commentContainer.appendChild(commentHeaderBox)

  // Criando a imagem das estrelas
  const fiveStarsImg = document.createElement('img')
  fiveStarsImg.classList.add('five-stars-image-comments')
  fiveStarsImg.src = 'https://i.ibb.co/VWH94nLD/five-stars-rating-icon-png.webp'
  fiveStarsImg.alt = '5 estrelas'
  fiveStarsImg.loading = 'lazy'
  fiveStarsImg.ariaHidden = true

  // colocando as estrelas no comentario principal
  commentContainer.appendChild(fiveStarsImg)

  // criando o compnente do comentario de fato
  const commentText = document.createElement('p')
  commentText.classList.add('comment-text')
  commentText.innerText = comment

  // colocando o comentario no lugar principal
  commentContainer.appendChild(commentText)

  return commentContainer
}

const commentsContainer = document.querySelector('.google-comments')

commentsData.forEach(valor => {
  commentsContainer.appendChild(createComment(valor))
})

const backToTopBtn = document.getElementById("backToTop");

window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    backToTopBtn.classList.add("show");
  } else {
    backToTopBtn.classList.remove("show");
  }
});

backToTopBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});

document.addEventListener('click', e => {
  const el = e.target
  if (el.classList.contains('scale')) {
    if (el.id === 'backToTop') return
    alert('Essa funcionalidade ainda não existe :D')
  }

  if (el.classList.contains('ri-whatsapp-line')) {
    alert('Essa funcionalidade ainda não existe :D')
  }
})