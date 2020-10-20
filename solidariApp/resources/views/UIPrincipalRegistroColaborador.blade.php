 <!-- Modal -->
 <div class="modal fade" tabindex="-1" data-backdrop="static" role="dialog" id = "modalColaborador">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header bg-primary text-white">
          <h5 class="modal-title" id="exampleModalLabel">Completa tus datos</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <form action="">
            <div class="modal-body">
                <div class="form-group">
                    <label for="nombre">Nombre</label>
                    <input type="text" id="nombre" class="form-control" placeholder="Nombre" required>
                    <span class="error text-danger errorNombre"> </span>
                </div>
                <div class="form-group">
                    <label for="apellido">Apellido</label>
                    <input type="text" id="apellido" class="form-control" placeholder="Apellido" required>
                    <span class="error text-danger errorApellido"> </span>
                </div>
                <label for="codArea">Telefono</label>
                <div class="form-row">
                    <div class="col-3 mb-3">
                    <input type="text" class="form-control" id="codArea" placeholder="Cod. Area" required>
                    <span class="error text-danger errorCodArea"> </span>
                    </div>
                    <div class="col-9 mb-3">
                    <input type="text" class="form-control" id="nroTelefono" placeholder="Numero" required>
                    <span class="error text-danger errorNroTelefono"> </span>
                    </div>
                </div>
                <label for="calle">Domicilio</label>
                <div class="form-row">
                    <div class="col-9 col-md-6 mb-3">
                    <input type="text" class="form-control" id="calle" placeholder="Calle" required>
                    <span class="error text-danger errorCalle"> </span>
                    </div>
                    <div class="col-3 col-md-2 mb-3">
                    <input type="text" class="form-control" id="nro" placeholder="Nro" required>
                    <span class="error text-danger errorNro"> </span>
                    </div>
                    <div class="col-6 col-md-2 mb-3">
                    <input type="text" class="form-control" id="piso" placeholder="Piso" required>
                    <span class="error text-danger errorPiso"> </span>
                    </div>
                    <div class="col-6 col-md-2 mb-3">
                    <input type="text" class="form-control" id="depto" placeholder="Depto" required>
                    <span class="error text-danger errorDepto"> </span>
                    </div>
                </div>
                <div class="form-row">
                    <div class="col-md-6 mb-3">
                        <select id="localidad" class="form-control" required>
                            <option value="-1" selected disabled>-- Seleccione una localidad --</option>
                        </select>
                    <span class="error text-danger errorLocalidad"> </span>
                    </div>
                    <div class="col-md-6 mb-3">
                        <select id="provincia" class="form-control" required>
                            <option value="-1" selected disabled>-- Seleccione una provincia --</option>
                        </select>
                    <span class="error text-danger errorProvincia"> </span>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
            <button type="submit" class="btn btn-primary">Guardar</button>
            </div>
        </form>
      </div>
    </div>
  </div>


<!-- JS validaciones-->
<script type="text/javascript" src="{{URL::asset('assets/js/PrincipalRegistroColaborador.js')}}"></script>