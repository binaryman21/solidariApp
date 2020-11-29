<div class="modal fade" tabindex="-1" data-backdrop="static" role="dialog" id="modalModificarFotoPerfil">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header bg-primary text-white">
        <h5 class="modal-title">Modificar Foto Perfil</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <form enctype="multipart/form-data" action="/updateFotoPerfil" method="POST">
        <div class="modal-body p-5">

          <div>
            Seleccione su nueva foto de perfil.
            Se recomienda un tamaño de 256x256 px minimo.
          </div>

          <div class="form-group">
            <label for="formControlFile1">Seleccione su nueva foto de perfil:</label>
            <input type="file" name="fotoPerfil" class="form-control-file" id="formControlFile1">
          </div>
          @csrf
          <button type="submit" class="btn btn-primary btn-block my-4 " id="btnConfirmarFotoPerfil">Confirmar</button>
        </div>
      </form>
    </div>
  </div>
</div>