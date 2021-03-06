<!-- Modal detalle necesidad -->
<div class="modal fade" id="modalDetalleNecesidad" tabindex="-1" role="dialog" aria-labelledby="modalDetalleNecesidadLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="modalDetalleNecesidadLabel">Detalle de necesidad</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
            <div class="alert alert-success" role="alert" id = "alertDetalleNecesidad">
                <button type="button" class="close alert-close"  aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                <h4 class="alert-heading" id = "tituloAlert">alert title</h4>
                <p id = "mensajeAlert">alert msj</p>
              </div>
            <div class="row">
                <div class="col-md-6 detalleNecesidadModal">

                </div>
                <div class="col-md-6">
                    <p class="lead" id = "cantDeColaboraciones2">

                    </p>
                    <div class="busqueda mt-2 mb-2 d-none" id = "inputBuscarColaboraciones">
                        <input class="form-control" type="search" placeholder="Buscar" aria-label="Search">
                    </div>
                    <div class="usuarios" id = "listadoColaboraciones">
                        <div class="spinner-border text-primary" role="status">
                            <span class="sr-only">Loading...</span>
                          </div>
                    </div> <!-- usuarios -->
                </div>
            </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
        </div>
      </div>
    </div>
</div>



<!-- Modal colaborar -->
<div class="modal fade" id="modalColaborar" tabindex="-1" role="dialog" aria-labelledby="modalColaborarLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="modalColaborarLabel">Colaborar</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <p>¿Estás seguro de que deseas ayudar? Si aceptas te comprometes formalmente a ayudar a la organización. La organizacion recibira un mensaje acerca de tu intencion y se contactará contigo.</p>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
          <button type="button" class="btn btn-primary" id = "btnConfirmarColaboracion">Aceptar</button>
        </div>
      </div>
    </div>
</div>
