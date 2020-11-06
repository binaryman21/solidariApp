@extends("layouts.master")

@section("contenido")
@parent

<div class="container p-2">
    <div class="jumbotron">
        <div class="row align-middle">
            <div class="col-md-2">
                <img id = "urlFotoPerfilOrganizacion" class="rounded-circle imgPerfilOrg" src="{{URL::asset('assets/img/user.png')}}" alt="imagen de usuario">
                <button type="button" class="btn btn-success btn-sm d-none" data-toggle="modal" data-target="#modalModificarFotoPerfil" id="btnModificarImgPerfil">Modificar Foto </button>
            </div>
            <div class="col-md-8 align-self-center">
                <p class="lead" id = "nombreOrganizacion">
                    Nombre de la organizacion
                </p>
                <p id = "tipoOrganizacion">
                    Tipo de organizacion
                </p>

                <div>
                    <i class="fas fa-snowplow"></i>
                    <i class="fas fa-hand-holding-heart"></i>
                    <i class="fas fa-handshake"></i>
                    <i class="fas fa-hand-holding-usd"></i>

            </div>
        </div>
            <div class="col-md-2">
                <button class="btn btn-block btn-primary d-none" type="button" id="editarMiPerfil">Editar <i class="far fa-edit"></i> </button>
                <button class="btn btn-block btn-primary d-none" type="button" id="guardarCambios">Guardar Cambios</button>
                <button class="btn btn-block btn-success d-none" type="button" data-toggle="modal" href="#modalSubscribirse" id = "btnSuscribirse">Subscribirse</button>
                <button class="btn btn-block btn-primary d-none" type="button" data-toggle="modal" href="#modalCalificar"  id = "btnCalificar">Calificar</button>
            </div>
        </div>
    </div>

    <div class="row mb-4">
        <div class="col-md-6">
            <div class = "d-flex flex-row">
                <h4 class="text-center">Descripcion</h4>
                <a class="ml-2" id="btnEditarDescripcion"><i class="far fa-edit d-none"></i></a>
                <a class="ml-2 oculto" id="btnGuardarDescripcion"><i class="far fa-save"></i></a>
            </div>
            <div class="descripcion">
                <div class="card descripcion">
                    <div class="card-body">
                        <p class="card-text" id = "descripcionOrganizacion" contenteditable="false">
                            <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                            <span class="sr-only">cargando...</span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-md-6">
            <div class="datos">
                <form action="">
                    <div class="form-group">
                        <label for="inptEmail">Email</label>
                        <p id = "emailOrganizacion">
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
                        <label for="fechaAltaUsuario">Usuario desde</label>
                        <p id = "fechaAltaUsuario">
                            <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                            <span class="sr-only">cargando...</span>
                        </p>
                    </div>
                    <hr>
                    <div class="d-flex opciones justify-content-between">
                        <a href="#" class="text-primary" data-toggle="modal" data-target="#modalCambiarPass">Cambiar clave</a>
                        <a href="#" class="text-primary" data-toggle="modal" data-target="#modalDarmeDeBaja">Darme de Baja</a>
                    </div>
                </form>
            </div>
        </div>
    </div>


    <nav class="navbar navbar-light bg-light justify-content-between">
        <a class="navbar-brand ">Necesidades</a>
        <form class="form-inline">
            <div class="busqueda">
                <input class="form-control mr-sm-2" type="search" placeholder="Buscar" aria-label="Search">
                <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Buscar</button>
            </div>
        </form>
        <a data-toggle="modal" href="#modalEditarNecesidad" id = "btnNuevaNecesidad">
            <i class="fas fa-plus-circle agregarNecesidad"></i>
        </a>
    </nav>
    <div class="necesidades row">
        <p>
            <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
            <span class="sr-only">cargando...</span>
        </p>
    </div> <!-- necesidades -->

    <hr>

    <div class="comentarios  text-center mt-4">
        <h4>Comentarios</h4>
        <div class="card comentario">
            <div class="card-body">
                <h5 class="card-title d-flex justify-content-between"> <span class="tituloComentario">Gran ayuda</span> <span class="fechaComentario">15/07/2020</span></h5>
                <p class="card-text">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis molestias adipisci asperiores doloribus, soluta nostrum ab ea quasi ducimus aliquam. Illo accusamus rerum dignissimos aliquid culpa aperiam vitae ullam sunt.</p>
            </div>
        </div>
        <div class="card comentario">
            <div class="card-body">
                <h5 class="card-title d-flex justify-content-between"> <span class="tituloComentario">Dudoso</span> <span class="fechaComentario">15/07/2020</span></h5>
                <p class="card-text">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tempora quasi, fuga voluptates accusamus odit id quam alias sint officia harum, explicabo veniam incidunt, repellat molestiae quaerat eum delectus eligendi beatae!</p>
            </div>
        </div>
        <div class="card comentario">
            <div class="card-body">
                <h5 class="card-title d-flex justify-content-between"> <span class="tituloComentario">Confiable</span> <span class="fechaComentario">15/07/2020</span></h5>
                <p class="card-text">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ducimus in praesentium fugiat itaque laboriosam provident totam sed omnis reprehenderit! Inventore culpa enim ad nihil corrupti aperiam eos nisi nulla dolore?</p>
            </div>
        </div>
    </div>

</div> <!-- container -->
@include("UIPerfilModales/UICambiarPass")
@include("UIPerfilModales/UIDarmeDeBaja")
@include("UIPerfilModales/UIModificarFotoPerfil")
@include("UIPerfilModales/UIModalEditarNecesidad")
@include("UIPerfilModales/UIEditarDomicilio")
@include("UIPerfilModales/UIModalBajaNecesidad")
@include("UIPerfilModales/UIModalCalificar")
@include("UIDetalleNecesidad")

@endsection

@section('scripts')
<!-- scripts -->
<script type="text/javascript" src="{{URL::asset('assets/js/utilidades.js')}}"></script>
<script type="text/javascript" src="{{URL::asset('assets/js/logueo.js')}}"></script>
<script type="text/javascript" src="{{URL::asset('assets/js/organizacion.js')}}"></script>
<script type="text/javascript" src="{{URL::asset('assets/js/necesidad.js')}}"></script>
<script type="text/javascript" src="{{URL::asset('assets/js/colaboracion.js')}}"></script>
<script type="text/javascript" src="{{URL::asset('assets/js/validaciones.js')}}"></script>
<script src="https://apis.google.com/js/platform.js?onload=onLoad" async defer></script>
@endsection
