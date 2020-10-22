document.addEventListener('DOMContentLoaded', ()=>{
    
    
    $("#seleccionCategoria").on('change',function(){
        seleccionaCrearNuevaCategoria();
    })

    cargarCategorias();
})

/*Cuando elijo una categoria existente entonces habilito el boton "Deshabilitar", si no lo oculto*/ 
function seleccionaCrearNuevaCategoria(){
  if ($( "#seleccionCategoria" ).val() != 0) {
    console.log("elpepe");
    $("#btnDeshabilitar").removeClass('d-none');
  }else{
    $("#btnDeshabilitar").addClass('d-none');
  }
}

/*Cargar lista con las categorias existentes*/
function cargarCategorias(){
    /*TODO: CARGAR CATEGORIAS*/
}