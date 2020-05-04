console.log("hellowebpack")
import "./style.css"


window.addEventListener('keyup', e => {
    const audio = document.querySelector(`audio[data-key= "${e.keyCode}"]`);
    const key = document.querySelector(`.key[data-key= "${e.keyCode}"]`)
    if(!audio) return; //detener la funcion
    audio.currentTime = 0; //empezar
    audio.play ();
    key.classList.add('playing');
});

function removeTransition(e){
    if(e.propertyName !== 'transform') return ;
    this.classList.remove('playing');
}

const keys = document.querySelectorAll('.key');
keys.forEach(key => key.addEventListener('transitionend',removeTransition) );