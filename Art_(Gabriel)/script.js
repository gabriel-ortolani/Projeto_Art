const titleElement = document.querySelector('#name'); 
const text = "Genshin Impact";
let index = 0;
let isTyping = true;
let currentColor =  document.documentElement.classList.contains('light') ? 'black' : '#fff';

// Função para animar o texto(digitando e apagando)
function animateText(){
    if(isTyping){
        if(index < text.length){
            titleElement.textContent = text.slice(0, index + 1);
            index ++;
        }else {
            isTyping = false;
        }
    
    } else{
        if(index > 1){
            titleElement.textContent = text.slice(0, index -1);
            index --;
        }else{
            isTyping = true;
            // Alterna a cor entre preto e laranja
            currentColor = currentColor == (document.documentElement.classList.contains('light') ? 'black' : '#000') ? '#000' : (document.documentElement.classList.contains('light') ? 'black' : '#000');
            titleElement.style.color = currentColor;
        }
    }

    setTimeout(animateText, 300);
}
animateText()

// ====== CARROSSEL DE PROJETOS =====
//seleciona os elementos do carrosel
const carouselSlides = document.querySelector('.carousel-slides');
const slides = document.querySelectorAll('.carousel-slide');
const prevButton = document.querySelector('.carousel-button.prev');
const nextButton = document.querySelector('.carousel-button.next');
let currentSlide = 0;
let autoSlideInterval;

// Função para exibir o slide atual
function showSlide(slideIndex){
    slides.forEach(slide => {
        slide.classList.remove('active');
        slide.style.display = 'none';
    });

    // Ajusta o índice do slide para garantir que ele esteja dentro dos limites
    if(slideIndex <0) currentSlide = slides.length - 1;
    else if (slideIndex >= slides.length) currentSlide = 0;
    else currentSlide = slideIndex;

    // exibe o slide atual
    slides[currentSlide].classList.add('active');
    slides[currentSlide].style.display = 'flex';
    updateSlidePosition();
}

// Função para atualizar a posição do carrosel
function updateSlidePosition(){
    const slideWidth = slides[0].offsetWidth;
    carouselSlides.style.transform = `translateX(-${currentSlide * slideWidth}px)`;
}

// Função para avançar para o próximo slide
function nextSlide() {
    showSlide(currentSlide + 1);
    resetAutoSlide(); // Reinicia o intervalo de transição automática
}

// Função para voltar ao slide anterior
function prevSlide(){
    showSlide(currentSlide - 1);
    resetAutoSlide(); // Reinicia o intervalo de transição automática
}

// Função para iniciar a transição automática dos slides
function startAutoSlide(){
    autoSlideInterval = setInterval(nextSlide, 5000); //Avança o slide a cada 5 segundos
}

// Função para reiniciar a transição automática
function resetAutoSlide(){
    clearInterval(autoSlideInterval);
    startAutoSlide();
}

// Adiciona evento de clique aos botões de navegação do carrosel
nextButton.addEventListener('click', nextSlide);
prevButton.addEventListener('click', prevSlide);

// Inicaliza o carrosel ao carregar a página
window.addEventListener('load', () => {
    showSlide(currentSlide);
    startAutoSlide();

    // Atualiza a posição do carrosel ao redimensionar a janela
    window.addEventListener('resize', () => {
        updateSlidePosition();
    });
});

// Pausa a transição automática ao passar o mouse sobre o carrosel
carouselSlides.parentElement.addEventListener('mouseenter', () =>{
    clearInterval(autoSlideInterval);
});

// Retoma a transição automática ao remover o mouse do carrossel
carouselSlides.parentElement.addEventListener('mouseleave', startAutoSlide);