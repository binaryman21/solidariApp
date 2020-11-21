$(document).ready(function(){
    cargarDenuncias();
    $("#btnConfirmarDenuncia").on('click', confirmarDenuncia)
})

function confirmarDenuncia( e ){
    e.preventDefault();
    let datosDenuncia = {
        idDenuncia: $('#spnCodigoDenuncia').text(),
        idDenunciado: $('#spnDenunciado').text()
    }
    axios.post("/confirmarDenuncia",datosDenuncia)
    .then((response)=>{
        if ( response.data.resultado ){
            // alertify.success( response.data.message )
            let idDenuncia = $('#spnCodigoDenuncia').text();
            alertify.success(`La denuncia ${ idDenuncia } ha sido confirmada`);
            $(`#cardReporte${idDenuncia}`).remove();
        }
        else{
            alertify.error( response.data.message )
        }    
        $("#modalVisualizarDenuncia").modal('hide');
    });
}


function cargarDenuncias(){
    fetch(`/getDenuncias`)
        .then(response => response.json())
        .then(data => {
        // console.log( response.data );
        let denuncias = data.denuncias;

        let divDenuncias = $('#listaDenuncias');
        divDenuncias.html("");
        denuncias.forEach(denuncia => {
            crearCardDenuncia( denuncia );
        })
    })
}

function crearCardDenuncia( denuncia ){
    // console.log( denuncia.denunciante[0].idUsuario );
    let cardDenuncia = 
    `<div class="card" name="cardReporte" id="cardReporte${denuncia.idDenuncia}">
        <div class="card-body justify-content-between d-flex flex-wrap ">
            <div class="m-2"">${new Date(denuncia.fechaDenuncia).toLocaleDateString('es-AR')}</div>
            <div class="m-2"">Motivo: ${denuncia.descripcionMotivoDenuncia}</div>
            <div class="m-2">Código: ${denuncia.idDenuncia}</div>
            <div class="m-2">Denunciante: <a href="/${denuncia.denunciante[0].rol.nombreRol}/${denuncia.idDenunciante}">${denuncia.denunciante.nombre[0].nombre}</a></div>
            <div class="m-2">Denunciado: <a href="/${denuncia.denunciado[0].rol.nombreRol}/${denuncia.idDenunciado}">${denuncia.denunciado.nombre[0].nombre}</a></div>
            <a  data-toggle="modal" href="#modalVisualizarDenuncia" id="visualizarDenuncia${denuncia.idDenuncia}" class="btn btn-primary mx-2">Ver</a>
        </div>
    </div>`	
    $('#listaDenuncias').append( cardDenuncia );
    $(`#visualizarDenuncia${denuncia.idDenuncia}`).click(()=>{
        cargarDatosModalDetalleDenuncia( denuncia );
    });
}

function cargarDatosModalDetalleDenuncia( denuncia ){
    $('#spnCodigoDenuncia').text( denuncia.idDenuncia );
    $('#spnFechaDenuncia').text( new Date(denuncia.fechaDenuncia).toLocaleDateString('es-AR') );
    $('#spnMotivoDenuncia').text( denuncia.descripcionMotivoDenuncia );
    $('#spnDenunciante').text( denuncia.idDenunciante );
    $('#spnNombreDenunciante').text( ' ' + denuncia.denunciante.nombre[0].nombre );
    $('#spnDenunciado').text( denuncia.idDenunciado );
    $('#spnNombreDenunciado').text( ' ' + denuncia.denunciado.nombre[0].nombre );
    $(`#verPerfilDenunciante`).attr('href', `/${denuncia.denunciante[0].rol.nombreRol}/${denuncia.idDenunciante}`);
    $(`#verPerfilDenunciado`).attr('href', `/${denuncia.denunciado[0].rol.nombreRol}/${denuncia.idDenunciado}`);
    $(`#spnDescripcionDenuncia`).text( denuncia.descripcionDenuncia );
}