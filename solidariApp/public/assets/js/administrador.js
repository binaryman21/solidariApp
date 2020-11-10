
document.addEventListener('DOMContentLoaded', () => {
  isLoggedIn();

  $("#seleccionCategoria").on('change', function () {
    seleccionaCrearNuevaCategoria();
  })
  

 /* $("#btnABMCategorias").on('mouseup', function () {*/
    listarCategoriasNecesidades();
/*  })*/
 
 
})

/*Cuando elijo una categoria existente entonces habilito el boton "Deshabilitar", si no lo oculto*/
function seleccionaCrearNuevaCategoria() {
  if ($("#seleccionCategoria").val() != 0) {
    /*Eligio una categoria ya existente*/ 
    
    $("#btnDeshabilitar").removeClass('d-none');
    $("#idCategoria").val($("#seleccionCategoria").val());
    $("#nombreCategoria").val($("#seleccionCategoria option:selected").text());

  } else {
    /*no eligio categoria existente */
    $("#btnDeshabilitar").addClass('d-none');
    $("#idCategoria").val(0);
    $("#nombreCategoria").val("");
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

    })
    .catch(e => {
      // Podemos mostrar los errores en la consola
      console.log(e);
  });
}

