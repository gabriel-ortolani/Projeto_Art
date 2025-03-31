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

    setTimeout(animateText, 150);
}
animateText()