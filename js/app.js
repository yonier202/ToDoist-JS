// varaibles

const formulario= document.querySelector('#formulario');
const ListaTwets = document.querySelector('#lista-tweets');

let tweets =[];

//event Listeners
eventListeners();

function eventListeners() {
    // Cuano el usuario agregue un twet 
    formulario.addEventListener('submit', agregarTweet);

    //Cuando el documento esta listo
    document.addEventListener('DOMContentLoaded',()=>{
        //Si el arreglo no contiene nada asignar como vacio(en vez de null)
        tweets=JSON.parse(localStorage.getItem('twets')) || [];

        crearHtml();
    });
}

//Funciones
function agregarTweet(e) {
    e.preventDefault();
    
    const tweet = document.querySelector('#tweet').value;
    
    if (tweet==="") {
        mjError('Un mensaje no puede ir vacio');

        return; //no se ejecutan mas lineas de codigo(mientras este en una funcion)
    }

    const tweetObj={
        id: Date.now(),
        tweet: tweet.toUpperCase(),
    }

    tweets=[...tweets,tweetObj ];
    // console.log('Agregando tweet');

    //una vez agregado vamos a crear el Html

    crearHtml();

    //Reiniciar el Html
    formulario.reset();


}

function mjError(error) {
    const message = document.createElement('P');
    message.textContent = error;
    message.classList.add('error');

    //Insertar en el contenido

    const contenido = document.querySelector('#contenido');
    contenido.appendChild(message);

    //elimina la alerta despues de 3 segundos
    setTimeout(() => {
        message.remove();
    }, 3000);
}

function crearHtml() {
    LimpiarHtml();

    if (tweets.length>0) {
        tweets.forEach( tweet=>{
            //agregando bton de eliminar
            const btnEliminar = document.createElement('a');
            btnEliminar.classList.add('borrar-tweet');
            btnEliminar.textContent = 'X';

            btnEliminar.onclick = () => {
                borrarTweet(tweet.id);
            };
            //crear el html
            const li = document.createElement('li');
            //añadir el texto
            li.textContent = tweet.tweet;
            
            //asignar el boton
            li.appendChild(btnEliminar);

            //insertarlo en el Html
            ListaTwets.appendChild(li);
        });
    }

    sincronizarStorage();
}
function borrarTweet(id) {
    tweets = tweets.filter(tweet =>{
        return tweet.id !== id;
    })
    crearHtml();
}

//Agrega los Tweets actualse

function sincronizarStorage() {
    localStorage.setItem('twets', JSON.stringify(tweets));
}

function LimpiarHtml(){
    while (ListaTwets.firstChild) {
        ListaTwets.removeChild(ListaTwets.firstChild);
    }
}