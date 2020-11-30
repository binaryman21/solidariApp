@extends("layouts.master")

@section("contenido")
@parent
<!-- container -->
<div class="container-sm perfil bg-white">
    <div class="row">
        <!-- tabs horizontal en xs -->
        <nav class="d-md-none w-100">
            <div class="nav nav-tabs" id="nav-tab" role="tablist">
                <a class="nav-link active" id="datos-perfil-tab" data-toggle="tab" href="#datos-perfil" role="tab" aria-controls="datos-perfil" aria-selected="true">Perfil</a>
                <a class="nav-link" id="datos-contacto-tab" data-toggle="tab" href="#datos-contacto" role="tab" aria-controls="datos-contacto" aria-selected="false">Contacto</a>
                <a class="nav-link" id="admin-seguridad-tab" data-toggle="tab" href="#admin-seguridad" role="tab" aria-controls="admin-seguridad" aria-selected="false">Seguridad</a>
                <a class="nav-link" id="admin-cuenta-tab" data-toggle="tab" href="#admin-cuenta" role="tab" aria-controls="admin-cuenta" aria-selected="false">Cuenta</a>
            </div>
        </nav>
        <!-- tabs vertical desde md en adelante -->
        <div class="d-none d-md-block col-3 px-0 border-right" id="v-nav-tab">
            <div class="nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                <a class="nav-link active" id="datos-perfil-tab" data-toggle="pill" href="#datos-perfil" role="tab" aria-controls="datos-perfil" aria-selected="true">Datos del Perfil</a>
                <a class="nav-link" id="datos-contacto-tab" data-toggle="pill" href="#datos-contacto" role="tab" aria-controls="datos-contacto" aria-selected="false">Datos de contacto</a>
                <a class="nav-link" id="admin-seguridad-tab" data-toggle="pill" href="#admin-seguridad" role="tab" aria-controls="admin-seguridad" aria-selected="false">Administrar seguridad</a>
                <a class="nav-link" id="admin-cuenta-tab" data-toggle="pill" href="#admin-cuenta" role="tab" aria-controls="admin-cuenta" aria-selected="false">Administrar cuenta</a>
            </div>
        </div>
        <!-- PANELES DE LAS CONFIGURACIONES -->
        <div class="col-md-9 p-4" id="config-panels">
            <div class="tab-content" id="v-pills-tabContent">
                <!-- Administracion de datos basicos -->
                <section class="tab-pane fade show active" id="datos-perfil" role="tabpanel" aria-labelledby="datos-perfil-tab">
                    <h5>Administracion de datos basicos del perfil</h5>
                    <div class="card-text text-muted">Aqui puedes configurar los datos basicos de tu cuenta como portada, avatar y descripcion</div>
                    <form action="" name="uploader">
                        <div class="card card-user shadow mt-4">
                            <div class="card-img-block">
                                <img id="cover" src="/assets/img/cover.svg" class="img-fluid" alt="portada de la organizacion">
                                <label for="actualizarPortada" class="fas fa-camera">
                                    <input type="file" id="actualizarPortada">
                                </label>
                            </div>
                            <div class="card-body pt-5">
                                <div class="media">
                                    <img id="urlFotoPerfilOrganizacion" class="shadow-sm rounded-circle imgPerfilOrg align-self-start mr-auto" src="/assets/img/imgUserProfile.png" alt="imagen de usuario">
                                    <label for="actualizarAvatar" class="fas fa-camera">
                                        <input type="file" id="actualizarAvatar" name="actualizarAvatar">
                                    </label>
                                </div>
                                <div class="clearfix"></div>
                                <h5 class="card-title mt-2 loading ldg-w-sm" id="nombreOrganizacion"></h5>
                                <h6 class="card-subtitle text-muted loading" id="tipoOrganizacion"></h6>
                                <div class="form-group">
                                    <textarea max-length="500" rows="5" class="form-control card-text mt-4 loading ldg-w-lg ldg-block" id="descripcionOrganizacion"></textarea>
                                </div>
                            </div>
                        </div>  
                        <div class="d-flex">
                            <button type="submit" class="btn btn-primary mt-5 ml-auto" id="btnConfirmarCambiosPerfil">Guardar cambios</button>
                        </div>
                    </form>
                </section>
                <!-- Administracion de contacto y privacidad-->
                <section class="tab-pane fade" id="datos-contacto" role="tabpanel" aria-labelledby="datos-contacto-tab">
                    <h5 class="">Administracion de contacto</h5>
                    <div class="card-text text-muted">Aqui puedes configurar los datos de contacto de tu cuenta y la privacidad de los mismos</div>
                    <div class="mt-4 mb-auto">
                        <div class="form-group">
                            <label for="emailOrganizacion">Email</label>
                            <p id="emailOrganizacion"></p>
                        </div>
                        <!-- Listado de telefonos y boton de agregar uno nuevo-->
                        <div class="d-flex align-items-center mt-5">
                            <p class="card-title mr-auto">Telefonos</p>
                            <p class="card-title">
                                <a  id="btnAgregarTelefono" class="px-2 py-1 text-decoration-none rounded"
                                data-toggle="collapse" href="#nuevoTelefono" role="button" aria-expanded="false"
                                aria-controls="nuevoTelefono" style="background-color: aliceblue;">Agregar telefono</a>
                            </p>
                        </div>
                        <div class="list-group my-2 text-muted loading" id="listadoTelefonos"></div>
                        <!-- Listado de direcciones y boton de agregar una nuevo-->
                        <div class="d-flex align-items-center mt-5">
                            <p class="card-title mr-auto">Direccion</p>
                            <p class="card-title">
                                <!-- <a id="btnAgregarDireccion" class="px-2 py-1 text-decoration-none rounded"
                                data-toggle="collapse" href="#formularioDomicilio" role="button" aria-expanded="false"
                                aria-controls="formularioDomicilio" style="background-color: aliceblue;">Agregar direccion</a> -->
                            </p>
                        </div>
                        <div class="list-group my-2 text-muted loading ldg-w-lg ldg-block" id="listadoDomicilios"></div>
                    </div>
                    <hr>
                    <!-- SECCION DE FORMULARIOS PARA DATOS DE CONTACTO -->
                    <section id="fomrs-contact" class="position-sticky">
                        <!-- NUEVO TELEFONO-->
                        <form id="nuevoTelefono" class="bg-white shadow-top rounded p-3 mb-n4 mx-n3 collapse">
                            <label for="calle" class="modal-header mx-n3 pt-0">
                                <span id="formTelTitle">Agregar un nuevo telefono</span>
                                <button type="button" class="close" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </label>
                            <div class="form-row my-3">
                                <div class="col-4">
                                    <input type="text" class="form-control" id="codArea" placeholder="Cod. Area" required="">
                                    <span class="error text-danger errorCodArea"> </span>
                                </div>
                                <div class="col-8">
                                    <input type="text" class="form-control" id="numeroTelefono" value="" placeholder="Numero" required="">
                                    <span class="error text-danger errorNroTelefono"></span>
                                </div>
                            </div>
                            <div class="modal-footer row">
                                <button type="button" class="btn btn-outline-secondary btnCancelar"">Cancelar</button>
                                <button type="button" class="btn btn-primary" data-tel="" id="btnGuardarTelefonos">Guardar cambios</button>
                            </div>
                        </form>
                        <!-- NUEVA DIRECCION-->
                        <form id="formularioDomicilio" class="bg-white shadow-top rounded p-3 mb-n4 mx-n3 collapse">
                            <label for="calle" class="modal-header pt-0 mx-n3 px-4">
                                <span id="formDirTitle">Agregar nueva direccion</span>
                                <button type="button" class="close" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </label>
                            <div class="form-row mb-3 pt-0">
                                <div class="col-9 col-md-6 d-none">
                                    <input type="text" class="form-control" id="idDomicilio">
                                </div>
                                <div class="col-9 col-md-6">
                                    <input type="text" class="form-control" id="calle" placeholder="Calle" required="">
                                    <span class="error text-danger errorCalle"> </span>
                                </div>
                                <div class="col-3 col-md-2 mb-3">
                                    <input type="text" class="form-control" id="numero" placeholder="Nro" required="">
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
                            </div>
                            <div class="form-row">
                                <div class="col mb-3">
                                    <select id="selectProvincia" class="form-control" required="">
                                        <option value="-1" selected="" disabled="">Seleccione una provincia ...</option>
                                    </select>
                                    <span class="error text-danger errorProvincia"> </span>
                                </div><div class="col mb-3">
                                    <select id="selectLocalidad" class="form-control" required="">
                                        <option value="-1" selected="" disabled="">Seleccione una localidad</option>
                                    </select>
                                    <span class="error text-danger errorLocalidad"> </span>
                                </div>
                            </div>
                            <div class="modal-footer row">
                                <button type="button" class="btn btn-outline-secondary btnCancelar">Cancelar</button>
                                <button type="button" class="btn btn-primary" data-dir="" id="btnGuardarCambiosDomicilio">Guardar cambios</button>
                            </div>
                        </form>
                    </section>
                </section>
                <!-- Administracion de la seguridad -->
                <section class="tab-pane fade" id="admin-seguridad" role="tabpanel" aria-labelledby="admin-seguridad-tab">
                    <h5 class="">Administracion de la seguridad</h5>
                    <div class="card-text text-muted">Aqui encontraras opciones que impactan sobre la seguridad de tu cuenta tal como la contraseña..</div>
                    <form class="mt-4">
                        <div class="form-group mb-3">
                            <label for="passActual">Contraseña actual</label>
                            <input type="password" id="claveVieja" class="form-control" required="">
                            <span class="error text-danger" id ="errorClaveVieja"></span>
                        </div>
                        <div class="form-group mb-3">
                            <label for="passNueva">Contraseña nueva</label>
                            <input type="password" id="claveNueva" class="form-control" required="">
                            <span class="error text-danger" id ="errorClaveNueva"></span>
                        </div>
                        <div class="form-group mb-3">
                            <label for="confirmacionPassNueva">Repetir contraseña nueva</label>
                            <input type="password" id="confirmacionClaveNueva" class="form-control" required="">
                            <span class="error text-danger" id ="errorClaveNuevaConfirmacion"></span>
                        </div>
                        <button type="button" class="btn btn-primary btn-block my-4" id="btnConfirmarPassNuevo">Confirmar</button>
                    </form>
                </section>
                <!-- Administracion de la cuenta -->
                <section class="tab-pane fade" id="admin-cuenta" role="tabpanel" aria-labelledby="admin-cuenta-tab">
                    <h5 class="">Administracion de la cuenta</h5>
                    <div class="card-text text-muted">Aqui puedes dar de baja tu cuenta</div>
                    <form>
                        <div>
                            En el caso de que seas una organizacion, todas tus necesidades se marcaran como completadas.
                            Si sos un colaborador todas tus colaboraciones pendientes pasaran a ser no concretadas.
                        </div>
                        <small class="card-text text-muted loading" id="fechaAltaUsuario"></small>
                        <button type="button" class="btn btn-danger btn-block my-4 " id="btnConfirmarDarmeDeBaja">Confirmar</button>
                    </form>
                </section>
            </div>
        </div>
    </div>
</div>
@endsection

@section('scripts')
    @parent
    <script type="text/javascript" src="{{URL::asset('assets/js/utilidades.js')}}"></script>
    <script type="text/javascript" src="{{URL::asset('assets/js/validaciones.js')}}"></script>
    <script type="text/javascript" src="{{URL::asset('assets/js/ajustesOrganizacion.js')}}"></script>
@endsection
