const compra = new Carrito();
const listaCompra = document.querySelector("#lista-compra tbody");
const carrito = document.getElementById('carrito');
const procesarCompraBtn = document.getElementById('procesar-compra');
const cliente = document.getElementById('cliente');
const correo = document.getElementById('correo');


cargarEventos();

function cargarEventos() {
    document.addEventListener('DOMContentLoaded', compra.leerLocalStorageCompra());

    //Eliminar productos del carrito
    carrito.addEventListener('click', (e) => { compra.eliminarProducto(e) });

    compra.calcularTotal();

    //cuando se selecciona procesar Compra
    procesarCompraBtn.addEventListener('click', procesarCompra);

    carrito.addEventListener('change', (e) => { compra.obtenerEvento(e) });
    carrito.addEventListener('keyup', (e) => { compra.obtenerEvento(e) });
}

    function procesarCompra() {

    // e.preventDefault();
    if (compra.obtenerProductosLocalStorage().length === 0) {
        Swal.fire({
            type: 'error',
            text: 'No hay productos, selecciona alguno',
            showConfirmButton: false,
            timer: 2000
        }).then(function () {
            window.location = "productos.html";
        })
    }
    else if (cliente.value === '' || correo.value === '') {
        Swal.fire({
            type: 'error',
            text: 'Ingrese su nombre y correo',
            showConfirmButton: false,
            timer: 2000
        })
    }

    else {
        
        //Porcesar Compra
        (function () {
            emailjs.init('user_Fs2T2qF8S7sfpev2gkjmE');
        })();

            const cargandoGif = document.querySelector('#cargando');
            cargandoGif.style.display = 'block';

            const enviado = document.createElement('img');
            enviado.src = 'img/mail.gif';
            enviado.style.display = 'block';
            enviado.width = '150';

            const btn = document.getElementById('procesar-compra');

            document.getElementById('procesar-pago')
            .addEventListener('submit', function(event) {
            event.preventDefault();

            btn.value = 'Enviando...';

            cargandoGif.style.display = 'none';
            document.querySelector('#loaders').appendChild(enviado);

            setTimeout(() => {
            compra.vaciarLocalStorage();
            enviado.remove();
            window.location = "productos.html";
         }, 2000);

            const serviceID = 'default_service';
            const templateID = 'template_pf1ez3q';

            emailjs.sendForm(serviceID, templateID, this)
            .then(() => {
            btn.value = 'Enviando';
            
        }, (err) => {
            btn.value = 'Enviando';
            alert(JSON.stringify(err));
            myform.find("button").text("send");
         });
         return false;
       }); 

    }
}

