// about 

const about = document.querySelector('#about');

const swiperWrapper = document.querySelector('.swiper-wrapper'); // corrigido aqui


const formulario = document.querySelector('#formulario');



async function getAboutGitHub() {
    
    try{
        const resposta = await fetch('https://api.github.com/users/Bfr-Jhon');
        const perfil = await resposta.json();

        about.innerHTML = '';
        
        about.innerHTML = `

         <!-- Imagem da Seção About -->
            <figure class="about-image">
                <img src="${perfil.avatar_url}" alt="${perfil.name}">
            </figure>

            <!-- Conteúdo da Seção About -->
            <article class="about-content">
                <h2>Sobre mim</h2>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Blanditiis aliquam perferendis possimus commodi amet,
                    odio recusandae quae expedita eius provident harum facilis
                    adipisci doloribus. Laborum, eligendi fugiat.
                    Officia, sed illo!</p>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Blanditiis aliquam perferendis possimus commodi amet,
                odio recusandae quae expedita eius provident harum facilis
                adipisci doloribus. Laborum, eligendi fugiat.
                Officia, sed illo!</p>

                <!-- Links (GitHub + Currículo) e Dados do GitHub -->
                <div class="about-buttons-data">
                    <!-- Links -->
                    <div class="buttons-container">
                        <a href="${perfil.html_url}" target="_blank" class="botao">GitHub</a>
                        <a href="#" target="_blank" class="botao-outline">Currículo</a>
                    </div>

                    <!-- Dados -->
                    <div class="data-container">
                        <!-- Seguidores -->
                        <div class="data-item">
                            <span class="data-number">${perfil.followers}</span>
                            <span class="data-label">Seguidores</span>
                        </div>
                        <!-- Repositórios Públicos -->
                        <div class="data-item">
                            <span class="data-number">${perfil.public_repos}</span>
                            <span class="data-label">Repositórios</span>
                        </div>
                    </div>

                </div>
            </article>
            `

    } catch(error){
        console.error('Erro ao buscar dados no GitHub', error);
    }

}
    

async function getProjectsGitHub() {

     
    try{
        const resposta = await fetch('https://api.github.com/users/Bfr-Jhon/repos?sort=updated&per_page=6'); // corrigido aqui
        const repositorios = await resposta.json();

        swiperWrapper.innerHTML = '';
        
        // Cores e ícones das linguagens
        const linguagens = {
            'JavaScript': { icone: 'javascript' },
            'TypeScript': { icone: 'typescript' },
            'Python': { icone: 'python' },
            'Java': { icone: 'java' },
            'HTML': { icone: 'html' },
            'CSS': { icone: 'css' },
            'PHP': { icone: 'php' },
            'C#': { icone: 'csharp' },
            'Go': { icone: 'go' },
            'Kotlin': { icone: 'kotlin' },
            'Swift': { icone: 'swift' },
            'GitHub': { icone: 'github' },
        }

        repositorios.forEach(repositorio =>{
            
            const linguagem = repositorio.language || 'github';
            
            const config = linguagens[linguagem] || linguagens ['GitHub'] // corrigido aqui

            const urlIcone = `./assets/icons/languages/${config.icone}.svg`

            const nomeFormatado = repositorio.name
                .replace(/[-_]/g, ' ')
                .replace(/[^a-zA-Z0-9\s]/g, '')
                .toUpperCase();

            const descricao = repositorio.description ?  // corrigido aqui
                (repositorio.description.length > 100 ? repositorio.description.substring(0,97) + '...' : repositorio.description)
                : 'Projeto desenvolvido no GitHub'
       
            const tags = repositorio.topics?.length > 0 
            ? repositorio.topics.slice(0, 3).map(topic => `<span class="tag">${topic}</span>`).join('')
            :  `<span class="tag">${linguagem}</span>`

         const botoesAcao = `
          <!-- Links do Projeto -->
          <div class="project-buttons">
            <a href="${repositorio.html_url}" target="_blank" class="botao botao-sm">
              GitHub
            </a>
            ${repositorio.homepage ?
              `<a href="${repositorio.homepage}" target="_blank" class="botao-outline botao-sm">
                Deploy
              </a>`
            : ''}
          </div>
      `

      // Construir o Card

      swiperWrapper.innerHTML += `
      
          <div class="swiper-slide">

            <article class="project-card">

              <!-- Ícone da Tecnologia padrão do projeto -->
              <figure class="project-image">
                <img src="${urlIcone}"
                     alt="Ícone ${linguagem}"
                >
              </figure>

              <!-- Conteúdo do Projeto -->
              <div class="project-content">

                <h3>${nomeFormatado}</h3>
                <p>${descricao}</p>

                <!-- Tags do Projeto -->
                <div class="project-tags">
                  ${tags}
                </div>

                ${botoesAcao}

              </div>

            </article>

          </div>
      `

		})

    iniciarSwiper();

	} catch (error) {
		console.error('Erro ao buscar dados no GitHub', error)
	}
}

function iniciarSwiper() {
    new Swiper('.projects-swiper', {
        slidesPerView: 1,
        slidesPerGroup: 1,
        spaceBetween: 24,
        centeredSlides: false,
        loop: true,
        watchOverflow: true,
        
        breakpoints: {
            0: {
                slidesPerView: 1,
                slidesPerGroup: 1,
                spaceBetween: 40,
                centeredSlides: false
            },
            769: { 
                slidesPerView: 2,
                slidesPerGroup: 2,
                spaceBetween: 40,
                centeredSlides: false
            },
            1025: { 
                slidesPerView: 3,
                slidesPerGroup: 3, 
                spaceBetween: 54,
                centeredSlides: false
            }
        },
        
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
            dynamicBullets: true,
        },
        
        autoplay: {
            delay: 5000,
            pauseOnMouseEnter: true,
            disableOnInteraction: false,
        },
        
        grabCursor: true, 
        slidesOffsetBefore: 0, 
        slidesOffsetAfter: 0, 
    });
}

// executar a função getAboutGitHub
getAboutGitHub();

// Executar a função getProjects GitHub
getProjectsGitHub();