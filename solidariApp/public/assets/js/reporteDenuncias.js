$(document).ready(function(){

    $("#btnConfirmarDenuncia").on('click',function(){
        alert("La denuncia 'codigo' ha sido confirmada");
        $("#modalVisualizarDenuncia").modal('hide');
        console.log('confirmar denuncia');
    })
})
