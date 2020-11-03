 <!-- Modal -->
 <div class="modal fade" tabindex="-1" data-backdrop="static" role="dialog" id = "modalEditarDomicilio">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header bg-primary text-white">
          <h5 class="modal-title" id="exampleModalLabel">Domicilio</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <form id="formularioDomicilio" action="">
            <div class="modal-body">

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
                    <button type="button" class="btn btn-primary" id = "btnGuardarDomicilio">Guardar</button>
                </div>
            </div>
        </form>
      </div>
      </div>
    </div>
  </div>

