
document.addEventListener('DOMContentLoaded', () => {
  isLoggedIn();

  $("#seleccionCategoria").on('change', function () {
    seleccionaCrearNuevaCategoria();
  })

  listarCategoriasNecesidades();
  $("#btnAgregar").on('click', altaCategoriaNecesidad);
  $("#btnModificar").on('click', modificarCategoria);
  $("#btnDeshabilitar").on('click', bajaCategoria);
  $("#btnHabilitar").on('click', activarCategoria);

})

function validaciones() {
  let error = 0;

  /*valido campo nombre*/
  if (!isNaN($("#nombreCategoria").val())) {
    $("#errorNombre").text("Nombre Incorrecto");
    error = 1;
  } else {
    $("#errorNombre").text("");
  }

  /*valido campo Prioridad*/
  if (isNaN($("#seleccionPrioridad").val()) || $("#seleccionPrioridad").val() <= 0 || isNaN($("#seleccionPrioridad").val()) > 3) {
    $("#errorPrioridad").text("Prioriad Incorrecta");
    error = 1;
  } else {
    $("#errorPrioridad").text("");
  }

  if (error == 1){
    return false;
  }else{
    return true;
  }
}

/*Alta de nueva CategoriaNecesidad*/
function altaCategoriaNecesidad() {
  if (validaciones()) {
    let CategoriaNecesidad = {
      nombreCategoria: $("#nombreCategoria").val(),
      idPrioridad: $("#seleccionPrioridad").val()
    }
    axios.post("/nuevaCategoriaNecesidad", JSON.stringify(CategoriaNecesidad))
      .then((response) => {
        if (response.data.resultado == 1) {
          $("#modalABMCategorias").modal("hide");
          alertify.success('Se agrego categoria con exito!')
        } else {
          alertify.error('Error!')

        }
      });
  }
}

/*Modificar una Categoria*/
function modificarCategoria() {
  let CategoriaNecesidad = {
    idCategoria: Number($("#seleccionCategoria").val()),
    nombreCategoria: $("#nombreCategoria").val(),
    idPrioridad: $("#seleccionPrioridad").val(),
    activo: 1
  }
  console.log(CategoriaNecesidad.idCategoria);
  axios.post("/modificarCategoria", JSON.stringify(CategoriaNecesidad))
    .then((response) => {
      if (response.data.resultado == 1) {
        $("#modalABMCategorias").modal("hide");
        alertify.success('Se actualizo categoria con exito!');
      } else {
        alertify.error(response.data.message);

      }
    });

}

/*baja de una Categoria*/
function bajaCategoria() {
  let CategoriaNecesidad = {
    idCategoria: Number($("#seleccionCategoria").val()),
    nombreCategoria: $("#nombreCategoria").val(),
    idPrioridad: $("#seleccionPrioridad").val(),
    activo: 0
  }
  console.log(CategoriaNecesidad.idCategoria);
  axios.post("/modificarCategoria", JSON.stringify(CategoriaNecesidad))
    .then((response) => {
      if (response.data.resultado == 1) {
        $("#modalABMCategorias").modal("hide");
        alertify.success('Se actualizo categoria con exito!');
      } else {
        alertify.error(response.data.message);

      }
    });

}

/*activar de una Categoria*/
function activarCategoria() {
  let CategoriaNecesidad = {
    idCategoria: Number($("#seleccionCategoria").val()),
    nombreCategoria: $("#nombreCategoria").val(),
    idPrioridad: $("#seleccionPrioridad").val(),
    activo: 1
  }
  console.log(CategoriaNecesidad.idCategoria);
  axios.post("/modificarCategoria", JSON.stringify(CategoriaNecesidad))
    .then((response) => {
      if (response.data.resultado == 1) {
        $("#modalABMCategorias").modal("hide");
        alertify.success('Se actualizo categoria con exito!');
      } else {
        alertify.error(response.data.message);

      }
    });

}

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

/*Obtener el estado de una categoria*/
function setearEstado(categoria) {
  axios.get('/listarCategoriasNecesidad')
    .then((response) => {
      let Categorias = response.data.CategoriasNecesidad;

      $.each(Categorias, function () {
        if (this.idCategoria == categoria) {
          $("#seleccionEstado").val(Number(this.activo));
          if (this.activo == 1) {
            //Si esta activa muestro el boton "deshabilitar"
            $("#btnDeshabilitar").removeClass('d-none');
            $("#btnHabilitar").addClass('d-none');
          } else {
            //Si no esta activa muestro el boton "habilitar"
            $("#btnDeshabilitar").addClass('d-none');
            $("#btnHabilitar").removeClass('d-none');
          }
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
    //$("#btnDeshabilitar").removeClass('d-none');
    $("#btnModificar").removeClass('d-none');
    $("#idCategoria").val($("#seleccionCategoria").val());
    setearPrioridad($("#seleccionCategoria").val());
    setearEstado($("#seleccionCategoria").val());
    $("#nombreCategoria").val($("#seleccionCategoria option:selected").text());

  } else {
    /*no eligio categoria existente, es decir, agregar categoria nueva*/
    $("#btnDeshabilitar").addClass('d-none');
    $("#btnHabilitar").addClass('d-none');
    $("#btnModificar").addClass('d-none');
    $("#btnAgregar").removeClass('d-none');
    $("#idCategoria").val(Number($('#seleccionCategoria option:last').val()) + 1);
    $("#nombreCategoria").val("");
    $("#seleccionPrioridad").val(0);
    $("#seleccionEstado").val(1);

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
        $("#seleccionCategoria").append($("<option value='" + this.idCategoria + "' >" + this.nombreCategoria + "</option>"));
      })
      /*A modo ilustrativo muestro cual va a ser el siguiente id disponible*/
      $("#idCategoria").val(Number($('#seleccionCategoria option:last').val()) + 1);
    })
    .catch(e => {
      // Podemos mostrar los errores en la consola
      console.log(e);
    });
}

