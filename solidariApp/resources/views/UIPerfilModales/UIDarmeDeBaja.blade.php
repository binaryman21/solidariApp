<div class="modal fade" tabindex="-1" data-backdrop="static" role="dialog" id ="modalDarmeDeBaja">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header bg-primary text-white">
        <h5 class="modal-title">Darme de Baja</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body p-5">
        <form>
              <div> 
                Esta accion no se puede deshacer.
                </div>

            <div class="form-group mb-3">
                <label for="motivo">Motivo:</label>
                <textarea class="form-control" id="motivo" rows="3"></textarea>
                <span class="error text-danger"></span>
            </div>
   

            <button type="button" class="btn btn-danger btn-block my-4 " id="btnConfirmarDarmeDeBaja">Confirmar</button>
            </div>
        </form>
    </div>
  </div>
</div>
