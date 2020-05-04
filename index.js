console.log("hellowebpack")
import "./style.css"


// @TODO: Agregar lista de teclas y sonidos para renderizar dinámicamente
// @TODO2: Cargar este contenido de un archivo .json
const configuration = {
	keys: [
		{
			key: 'Q',
			keyCode: 81,
			sound: 'clap'
		},
		{
			key: 'W',
			keyCode: 87,
			sound: 'hihat'
		}

	]
}

// @TODO: Cuando termine de cargar el DOM, se debe renderizar dinámicamente las teclas.
const renderKeys = () => {
	const keyboard = document.querySelector('.new-keyboard');
	const htmlKeys = configuration.keys.map( key => {
		const html = `
			<div data-key="${key.keyCode}" class="key">
	            <kbd>${key.key}</kbd>
	            <span class="sound">${key.sound}</span>
	        </div>
		`;
		
		return html;
	});
	debugger;

	keyboard.innerHTML = htmlKeys.join('');
};

window.onload = () => {
	renderKeys(); 
};


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