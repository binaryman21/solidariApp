<div class="modal fade" tabindex="-1" data-backdrop="static" role="dialog" id ="modalRegistrarse">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header bg-primary text-white">
        <h5 class="modal-title">Registrarse como <span id="registroVisitante"></span></h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body p-5">
        <form>
            <div class="form-group mb-3">
                <label for="email">Email</label>
                <input type="email" id="email" class="form-control" placeholder="example@example.com" required="">
                <span class="error text-danger"></span>
            </div>
            <div class="form-group mb-3">
                <label for="password">Contraseña</label>
                <input type="password" id="password" class="form-control" required="">
                <span class="error text-danger"></span>
            </div>
            <div class="form-group mb-3">
                <div class="form-check">
                  <input type="checkbox" class="form-check-input" id="recordarme">
                  <label class="form-check-label" for="dropdownCheck">Recordarme</label>
                </div>
              </div>
            <button type="button" class="btn btn-primary btn-block my-4" data-toggle="modal" id="btnCrearCuenta"
            data-target="#modalOrganizacion">Crear cuenta</button>
            <div class="text-center">- o -</div>
            <div class="g-signin2 mt-5" data-onsuccess="onSignIn" data-theme="light">
            </div>
        </form>
    </div>
  </div>
</div>
