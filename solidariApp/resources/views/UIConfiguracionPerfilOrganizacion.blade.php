@extends("layouts.master")

@section("contenido")
@parent
<!-- container -->
<div class="container-sm perfil bg-white p-3 px-lg-5">
    <div class="row mb-4">
        <!-- Administracion de datos basicos -->
        <div class="col">
            <h5 class="mt-3">Administracion de datos basicos</h5>
            <div class="card-text text-muted">Aqui puedes configurar los datos basicos de tu cuenta como portada, avatar y descripcion</div>
            <div class="card card-user mb-3">
                <div class="card-img-block">
                    <img id="cover" src="/assets/img/cover.svg" class="img-fluid" alt="portada de la organizacion">
                    <label for="actualizarPortada" class="fas fa-camera">
                        <input type="file" id="actualizarPortada">
                    </label>
                </div>
                <div class="card-body pt-5">
                    <div class="media">
                        <img id="urlFotoPerfilOrganizacion" class="rounded-circle imgPerfilOrg align-self-start mr-auto" src="/assets/img/imgUserProfile.png" alt="imagen de usuario">
                        <label for="actualizarAvatar" class="fas fa-camera">
                            <input type="file" id="actualizarAvatar">
                        </label>
                    </div>
                    <div class="clearfix"></div>
                    <h5 class="card-title mt-2 loading ldg-w-sm" id="nombreOrganizacion"></h5>
                    <h6 class="card-subtitle text-muted loading" id="tipoOrganizacion"></h6>
                    <div class="form-group">
                        <textarea max-length="500" rows="5" class="form-control card-text mt-4 loading ldg-w-lg ldg-block" id="descripcionOrganizacion"></textarea>
                    </div>
                    <!--<small class="card-text text-muted loading" id="fechaAltaUsuario"></small>-->
                </div>
            </div>
        </div>
    </div>
    <div class="row mb-4">
        <!-- Administracion de contacto y privacidad-->
        <div class="col">
            <h5 class="">Administracion de contacto</h5>
            <div class="card-text text-muted">Aqui puedes configurar los datos de contacto de tu cuenta y la privacidad de los mismos</div>
        </div>
    </div>
    <div class="row mb-4">
        <!-- Administracion de la seguridad -->
        <div class="col">
            <h5 class="">Administracion de la seguridad</h5>
            <div class="card-text text-muted">Aqui econtraras opciones que impactan sobre la seguridad de tu cuenta tal como la contraceña..</div>

        </div>
    </div>
    <div class="row mb-4">
        <!-- Administracion de la cuenta -->
        <div class="col">
            <h5 class="">Administracion de la cuenta</h5>
            <div class="card-text text-muted">Aqui puedes dar de baja tu cuenta</div>
        </div>
    </div>
</div>
@endsection

@section('scripts')
    @parent
    <script type="text/javascript" src="{{URL::asset('assets/js/utilidades.js')}}"></script>
    <script type="text/javascript" src="{{URL::asset('assets/js/ajustesOrganizacion.js')}}"></script>
@endsection
