
document.addEventListener('DOMContentLoaded', () => {
  isLoggedIn();

  $("#seleccionCategoria").on('change', function () {
    seleccionaCrearNuevaCategoria();
  })
  

 /* $("#btnABMCategorias").on('mouseup', function () {*/
    listarCategoriasNecesidades();
/*  })*/
 
 
})
   
/*Obtener la prioridad de una categoria*/
function setearPrioridad(categoria) {
  axios.get('/listarCategoriasNecesidad')
    .then((response) => {
      let Categorias = response.data.CategoriasNecesidad;

      $.each(Categorias, function () {
        if (this.idCategoria == categoria) {
            $("#seleccionPrioridad").val(Number(this.idPrioridad));
          }
      })

    })
    .catch(e => {
      // Podemos mostrar los errores en la consola
      console.log(e);
  });
}     

/*Cuando elijo una categoria existente entonces habilito el boton "Deshabilitar", si no lo oculto*/
function seleccionaCrearNuevaCategoria() {
  if ($("#seleccionCategoria").val() != 0) {
    /*Eligio una categoria ya existente*/ 
    $("#btnAgregar").addClass('d-none');
    $("#btnDeshabilitar").removeClass('d-none');
    $("#btnModificar").removeClass('d-none');
    $("#idCategoria").val($("#seleccionCategoria").val());
    setearPrioridad($("#seleccionCategoria").val());
    $("#nombreCategoria").val($("#seleccionCategoria option:selected").text());

  } else {
    /*no eligio categoria existente, es decir, agregar categoria nueva*/
    $("#btnDeshabilitar").addClass('d-none');
    $("#btnModificar").addClass('d-none');
    $("#btnAgregar").removeClass('d-none');
    $("#idCategoria").val(Number($('#seleccionCategoria option:last').val())+1);
    $("#nombreCategoria").val("");
    $("#seleccionPrioridad").val(0);
  }
}

/*Cargar lista con las categorias existentes*/
function listarCategoriasNecesidades() {
  axios.get('/listarCategoriasNecesidad')
    .then((response) => {
      let Categorias = response.data.CategoriasNecesidad;
         
      $.each(Categorias, function () {
        let idActual = this.idCategoria;
        let categoriaActual = this.nombreCategoria;
        $("#seleccionCategoria").append($("<option value='" + this.idCategoria+ "' >"+ this.nombreCategoria + "</option>"));
    })
    /*A modo ilustrativo muestro cual va a ser el siguiente id disponible*/
    $("#idCategoria").val(Number($('#seleccionCategoria option:last').val())+1);
    })
    .catch(e => {
      // Podemos mostrar los errores en la consola
      console.log(e);
  });
}

