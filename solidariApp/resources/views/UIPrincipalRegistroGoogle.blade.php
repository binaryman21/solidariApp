<div class="modal fade" tabindex="-1" data-backdrop="static" role="dialog" id ="modalRegistrarse">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header bg-primary text-white">
        <h5 class="modal-title">Registrarse</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <form>
            <div class="form-group mb-3">
                <label for="email">Email</label>
                <input type="email" id="email" class="form-control" placeholder="example@example.com" required>
                <span class="error text-danger"></span>
            </div>
            <div class="form-group mb-3">
                <label for="password">Contraseña</label>
                <input type="password" id="password" class="form-control" required>
                <span class="error text-danger"></span>
            </div>
            <hr>
            <div class="g-signin2" data-onsuccess="onSignIn" data-theme="dark">

            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-primary" data-dismiss="modal">Cancelar</button>
            <button type="button" class="btn btn-primary" data-toggle="modal" id="btnCrearCuenta">Crear cuenta</button>
          </div>
        </form>
    </div>
  </div>
</div>
