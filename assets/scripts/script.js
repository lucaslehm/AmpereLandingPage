const formHeaderBtn = document.querySelector('.header-button')

formHeaderBtn.addEventListener('click', function(e) {
    e.preventDefault()
})

//<article class="comment"> // ok
//                        <header class="comment-box-header"> //ok
//                            <div class="user-information"> // ok
//                                <div class="profile-pic" aria-hidden="true"></div> // ok
//                                <div class="user-name-information">  // ok
//                                    <p class="user-name">Arnaldo</p> // ok
//                                    <time class="comment-date" datetime="2025-02-04">04/02/2025</time>
//                                </div>
//                            </div>
//                            <img class="google-logo-icon" src="https://i.ibb.co/BVqZGSLY/Google-G-logo-svg.png"
//                                alt="Logo Google" loading="lazy" aria-hidden="true">
//                        </header>
//
//                        <img class="five-stars-image-comments"
//                            src="https://i.ibb.co/VWH94nLD/five-stars-rating-icon-png.webp" alt="5 estrelas"
//                            loading="lazy" aria-hidden="true">
//
//                        <p class="comment-text">
//                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates doloribus numquam
//                            explicabo! Nulla,
//                            modi error! Pariatur deserunt vero deleniti natus rerum quos amet atque accusantium delectus
//                            est. Velit,
//                            asperiores quas.
//                        </p>
//        </article>


const commentsData = [
    {
        profilePicUrl: '',
        name: '',
        
    }
]

function createComment({profilePicUrl, name}) {
    //Cria elemento principal aonde vão os comentarios:
    const commentContainer = document.createElement('article')
    commentContainer.classList.add('comment')

    // Criar a caixa de header do comentario
    const commentHeaderBox = document.createElement('header')
    commentHeaderBox.classList.add('comment-box-header')

    // Div com as informacoes do usuario
    const userInformation = document.querySelector('div')
    userInformation.classList.add('user-information')

    // Div foto de perfil
    const profilePic = document.querySelector('div')
    profilePic.classList.add('profile-pic')
    profilePic.ariaHidden = true
    profilePic.style.backgroundImage = `url ${profilePicUrl}`

    // Colocando profile pic dentro da div de info.
    userInformation.appendChild(profilePic)

    // Textos do nome
    const userNameInformation = document.querySelector('div')
    userNameInformation.classList.add('user-name-information')

    //p com o nome
    const userName = document.querySelector('p')
    userName.classList.add('user-name')
    userName.innerText = name
}