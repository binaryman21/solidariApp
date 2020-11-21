@extends("layouts.master")

@section("contenido")
@parent
<!-- container -->
<div class="container-sm perfil bg-white p-2 px-lg-5">
    <div class="row mb-4">
        <!-- Administracion de datos basicos -->
        <div class="col">
            <h5 class="mt-3">Administracion de datos basicos</h5>
            <div class="card-text text-muted">Aqui puedes configurar los datos basicos de tu cuenta como portada, avatar y descripcion</div>
            <div class="p-4">
                <div class="card mb-3 border-light">
                    <img src="{{URL::asset('assets/img/cover.svg')}}" class="card-img-top" alt="Portada actual">
                    <div class="card-body">
                        <h5 class="card-title">Portada de su cuenta</h5>
                        <p class="card-text text-muted">Aqui puede establecer la portada para su cuenta, recomendamos una imagen de estilo banner</p>
                        <div class="custom-file mt-3">
                            <input type="file" class="custom-file-input" id="customFile" lang="es">
                            <label class="custom-file-label" for="customFile">Subir nueva portada</label>
                        </div>
                    </div>
                </div>

                <div class="media mt-5">
                    <img src="{{URL::asset('assets/img/imgUserProfile.png')}}" class="mr-3" alt="..." style="width: 70px;">
                    <div class="media-body pr-4">
                        <h5 class="mt-0">Avatar de la cuenta</h5>
                        <div class="text-muted">Aqui puede establecer su avatar de la cuenta cargando una imagen, la misma debe estar en formato .jpg</div>
                        <div class="custom-file mt-3">
                            <input type="file" class="custom-file-input" id="customFile" lang="es">
                            <label class="custom-file-label" for="customFile">Subir avatar</label>
                        </div>
                    </div>
                </div>

                <div class="card mt-5">
                    <div class="card-body">
                        <h5 class="card-title">Descripcion de tu organizacion</h5>
                        <p class="card-text">Incluye una descripcion adecuada para describir tu organizacion</p>
                        <textarea class="form-control"></textarea>
                    </div>
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
