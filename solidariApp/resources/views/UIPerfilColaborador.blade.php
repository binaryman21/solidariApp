@extends("layouts.master")

@section("contenido")

<div class="container p-2">
    <div class="jumbotron">
        <div class="row align-middle">
            <div class="col-md-2">
                <img id = "imgPerfilColaborador" class="rounded-circle imgPerfilCol" src="{{URL::asset('assets/img/imgUserProfile.png')}}" alt="imagen de usuario">
                <button type="button" class="btn btn-success btn-sm d-none" data-toggle="modal" data-target="#modalModificarFotoPerfil" id="btnModificarImgPerfil">Modificar Foto </button>

            </div>

            <div class="col-md-8 align-self-center">
                <p id = "nombreColaborador" class="lead">
                        <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                        <span class="sr-only">cargando...</span>
                </p>
                <p class="lead" id="apellidoColaborador">
                </p>
                <div class="insignias">

                </div>

            </div>
            <div class="col-md-2">
                <button class="btn btn-block btn-primary d-none soloColaborador" type="button" id="editarMiPerfil">Editar <i class="far fa-edit"></i> </button>
                <button class="btn btn-block btn-primary d-none" type="button" id="guardarCambios">Guardar Cambios</button>
                <!-- <button class="btn btn-block btn-primary soloVisitante" type="button" data-toggle="modal" href="#modalCalificar">Calificar</button> -->
            </div>
        </div>

    </div>

    <div class="row">
        <div class="col-md-6">
            <h4>Comentarios</h4>
            <div class="comentarios">
                
            </div>
        </div>
        <div class="col-md-6">
            <div class="datos">
                <form action="">
                    <div class="form-group">
                        <label>Correo</label>
                        <p id = "correo">
                            <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                            <span class="sr-only">cargando...</span>
                        </p>

                    </div>
                    <hr>
                    <label for="codArea">Telefono</label>
                    <div class="nuevoTelefono d-none">
                        <div class="form-row">
                            <div class="col-3 col-mb-3 mb-3">
                                <input type="text" class="form-control" id="codArea" placeholder="Cod. Area" required>
                                <span class="error text-danger errorCodArea"> </span>
                            </div>
                            <div class="col-6 col-mb-6 mb-6">
                                <input type="text" class="form-control" id="numeroTelefono" value="" placeholder="Numero" required>
                                <span class="error text-danger errorNroTelefono"></span>
                            </div>
                            <div class="col-1 col-mb-1 mb-1">
                                <a id = "btnAgregarTelefono" class = "primary-text">
                                    <i class="fas fa-plus-circle agregarNecesidad"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                    <!-- Primer Telefono -->
                    <div id = "listadoTelefonos">
                        <p>
                            <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                            <span class="sr-only">cargando...</span>
                        </p>
                    </div>

                    <hr>
                    <label for="calle">Direccion</label>
                    <div id = "listadoDomicilios">
                        <p>
                            <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                            <span class="sr-only">cargando...</span>
                        </p>
                    </div>
                    <hr>
                    <div class="form-group">
                        <label for="fechaUsuario">Usuario desde</label>
                        <p id = "fechaAltaUsuario">
                            <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                            <span class="sr-only">cargando...</span>
                        </p>
                    </div>
                </form>
                <hr>
                <div class="d-flex opciones justify-content-between">
                    <!--<a href="#" class="text-secondary">Editar datos</a>
                    <a href="#" class="text-danger">Darme de baja</a>-->
                    <a href="#" class="text-primary soloColaborador" data-toggle="modal" data-target="#modalCambiarPass">Cambiar Contraseña</a>
                    <a href="#" class="text-primary soloColaborador" data-toggle="modal" data-target="#modalDarmeDeBaja">Darme de Baja</a>
                </div>
            </div>
        </div>
    </div>


    <nav class="navbar navbar-light bg-light justify-content-between mt-4">
        <a class="navbar-brand">Colaboraciones</a>
        <!-- <form class="form-inline">
            <input class="form-control mr-sm-2" type="search" placeholder="Buscar" aria-label="Search">
            <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Buscar</button>
        </form> -->
    </nav>
    <div class="necesidades row">

    </div>

    <div class="alert alert-success mt-4 soloColaborador" role="alert">
        <h4 class="alert-heading">Ayuda a las organizaciones para obtener nuevas insignias</h4>
        <p>Con tu colaboracion podes ayudar a construir un mundo mejor para todos.</p>
        <hr>
        <p class="mb-0"><a href="/">¡Segui ayudando!</a></p>
    </div>

</div> <!-- container -->
@include("UIPerfilModales/UICambiarPass")
@include("UIPerfilModales/UIDarmeDeBaja")
@include("UIPerfilModales/UIModificarFotoPerfil")
@include("UIPerfilModales/UIEditarDomicilio")
@include("UIPerfilModales/UIModalCalificar")
@include("UIPerfilModales/UIModalReportar")
@endsection

@section('scripts')
   <!-- Scripts -->
<script type="text/javascript" src="{{URL::asset('assets/js/utilidades.js')}}"></script>
<script type="text/javascript" src="{{URL::asset('assets/js/logueo.js')}}"></script>
<script type="text/javascript" src="{{URL::asset('assets/js/colaborador.js')}}"></script>
<script type="text/javascript" src="{{URL::asset('assets/js/validaciones.js')}}"></script>
<script type="text/javascript" src="{{URL::asset('assets/js/usuario.js')}}"></script>
<script src="https://apis.google.com/js/platform.js?onload=onLoad" async defer></script>
@endsection
