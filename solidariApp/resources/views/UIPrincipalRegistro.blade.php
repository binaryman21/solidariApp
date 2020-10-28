 <!-- Modal -->
 <div class="modal fade" tabindex="-1" data-backdrop="static" role="dialog" id = "modalRegistroColOrg">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header bg-primary text-white">
          <h5 class="modal-title" id="exampleModalLabel">Completa tus datos</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <form id="formularioRegistroDatos" action="">
            <div class="modal-body">

                <input type="hidden" name="" id = "urlFotoPerfilUsuario" value = "">
                <input type="hidden" name="" id = "idGoogle" value = "">
                <div class="form-group   exclusivoOrg">
                    <label for="nombreOrganizacion">Nombre de la organizacion</label>
                    <input type="text" id="nombreOrganizacion" class="form-control" placeholder="Nombre de Organizacion">
                    <span class="error text-danger errorNombreOrg"> </span>
                </div>
                <div class="form-group  exclusivoCol">
                    <label for="nombreColaborador">Nombre</label>
                    <input type="text" id="nombreColaborador" class="form-control" placeholder="Nombre">
                    <span class="error text-danger errorNombre"> </span>
                </div>
                <div class="form-group   exclusivoCol">
                    <label for="apellidoColaborador">Apellido</label>
                    <input type="text" id="apellidoColaborador" class="form-control" placeholder="Apellido">
                    <span class="error text-danger errorApellido"> </span>
                </div>
                <div class="form-group mb-3  exclusivoOrg">
                    <label for="selectTipoOrganizacion">Tipo organizacion</label>
                    <select id="selectTipoOrganizacion" class="form-control" >
                        <option value="-1" selected disabled>-- Elige el tipo de org --</option>
                    </select>
                    <span class="error text-danger errorTipoOrg"> </span>
                </div>
                <label for="codArea">Telefono</label>
                <div class="form-row">
                    <div class="col-mb-6 w-50 mb-3">
                        <input type="text" class="form-control" id="codArea" placeholder="Cod. Area" required>
                        <span class="error text-danger errorCodArea"> </span>
                    </div><div class="col-mb-6 w-50 mb-3">
                        <input type="text" class="form-control" id="numeroTelefono" placeholder="Numero" required>
                        <span class="error text-danger errorNroTelefono"></span>
                    </div>
                </div>
                <label for="calle">Direccion</label><div class="form-row">
                <div class="col-9 col-md-6 mb-3">
                    <input type="text" class="form-control" id="calle" placeholder="Calle" required>
                    <span class="error text-danger errorCalle"> </span>
                </div>
                <div class="col-3 col-md-2 mb-3">
                    <input type="text" class="form-control" id="numero" placeholder="Nro" required>
                    <span class="error text-danger errorNro"> </span>
                </div>
                <div class="col-6 col-md-2 mb-3">
                    <input type="text" class="form-control" id="piso" placeholder="Piso">
                    <span class="error text-danger errorPiso"> </span>
                </div>
                <div class="col-6 col-md-2 mb-3">
                    <input type="text" class="form-control" id="depto" placeholder="Depto">
                    <span class="error text-danger errorDepto"> </span>
                </div>
                <div class="form-row">
                    <div class="col-md-6 mb-3">
                        <select id="selectProvincia" class="form-control" required>
                            <option value="-1" selected disabled>-- Seleccione una provincia --</option>
                        </select>
                        <span class="error text-danger errorProvincia"> </span>
                    </div>
                    <div class="col-md-6 mb-3">
                        <select id="selectLocalidad" class="form-control" required>
                            <option value="-1" selected disabled>-- Seleccione una localidad --</option>
                        </select>
                        <span class="error text-danger errorLocalidad"> </span>
                    </div>
                </div>
                <div class="modal-footer row">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
                    <button type="button" class="btn btn-primary" id = "btnCrearCuenta">Guardar</button>
                </div>
            </div>
        </form>
      </div>
      </div>
    </div>
  </div>

