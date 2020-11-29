@extends("layouts.master")
@section("meta")
    @parent
    <meta property="og:url"                content="https://www.solidariapp.com.ar" />
    <meta property="og:type"               content="website" />
    <meta property="og:title"              content="SolidariApp" />
    <meta property="og:description"        content="Descripcion de la pag" />
    <meta property="og:image"              content="http://static01.nyt.com/images/2015/02/19/arts/international/19iht-btnumbers19A/19iht-btnumbers19A-facebookJumbo-v2.jpg" />
@endsection
@section("contenido")
@parent
<div id="fb-root"></div>
<script async defer crossorigin="anonymous" src="https://connect.facebook.net/es_LA/sdk.js#xfbml=1&version=v9.0" nonce="hChYh6rj"></script>
<div class="container p-2">
    <div class="jumbotron">
        <div class="row align-middle">
            <div class="col-md-2">
                <img class="rounded-circle imgPerfilOrg" src="{{URL::asset('assets/img/imgUserProfile.png')}}" alt="imagen de usuario">
            </div>
            <div class="col-md-8 align-self-center">
                <p class="lead">
                    Nombre de la organizacion
                </p>
                <p>
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

                <button class="btn btn-block btn-success" type="button" data-toggle="modal" href="#modalSubscribirse">Subscribirse</button>
                <button class="btn btn-block btn-primary" type="button" data-toggle="modal" href="#modalCalificar">Calificar</button>
            </div>
        </div>
    </div>

    <div class="row mb-4">
        <div class="col-md-6">
            <h4>Descripcion</h4>
            <div class="descripcion">
                <div class="card descripcion">
                    <div class="card-body">
                        <p class="card-text">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis molestias adipisci asperiores doloribus, soluta nostrum ab ea quasi ducimus aliquam. Illo accusamus rerum dignissimos aliquid culpa aperiam vitae ullam sunt.</p>
                        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aut iusto nam aspernatur itaque? Possimus dicta perspiciatis autem reprehenderit, fugit eveniet quos odit excepturi omnis quam est delectus optio, eum fugiat?</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-md-6">
            <div class="datos">
                <form action="">
                    <div class="form-group">
                        <label for="email">Email</label>
                        <input type="email" id="email" class="form-control" value="usuario@mail.com" disabled required>
                        <span class="error text-danger errorEmail"> </span>
                    </div>
                    <hr>
                    <label for="codArea">Telefono</label>
                    <div class="form-row">
                        <div class="col-3 col-mb-3 mb-3">
                            <input type="text" class="form-control" id="codArea" value="011" disabled placeholder="Cod. Area" required>
                            <span class="error text-danger errorCodArea"> </span>
                        </div>
                        <div class="col-6 col-mb-6 mb-6">

                            <input type="text" class="form-control" id="numeroTelefono" value="156472896" disabled placeholder="Numero" required>
                            <span class="error text-danger errorNroTelefono"></span>
                        </div>

                    </div>

                    <!-- Segundo Telefono -->
                    <div class="form-row">
                        <div class="col-3 col-mb-3 mb-3">
                            <input type="text" class="form-control" id="codArea" value="011" disabled placeholder="Cod. Area" required>
                            <span class="error text-danger errorCodArea"> </span>
                        </div>
                        <div class="col-6 col-mb-6 mb-6">
                            <input type="text" class="form-control" id="numeroTelefono" value="156472896" disabled placeholder="Numero" required>
                            <span class="error text-danger errorNroTelefono"></span>
                        </div>

                    </div>


                    <hr>
                    <label for="calle">Direccion</label>
                    <div class="form-row">
                        <div class="col-9 col-md-6 mb-3">
                            <input type="text" class="form-control" id="calle" disabled placeholder="Calle" required>
                            <span class="error text-danger errorCalle"> </span>
                        </div>
                        <div class="col-3 col-md-2 mb-3">
                            <input type="text" class="form-control" id="numero" disabled placeholder="Nro" required>
                            <span class="error text-danger errorNro"> </span>
                        </div>
                        <div class="col-6 col-md-2 mb-3">
                            <input type="text" class="form-control" id="piso" disabled placeholder="Piso" required>
                            <span class="error text-danger errorPiso"> </span>
                        </div>
                        <div class="col-6 col-md-2 mb-3">
                            <input type="text" class="form-control" id="depto" disabled placeholder="Depto" required>
                            <span class="error text-danger errorDepto"> </span>
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="col-md-5 mb-3">
                            <select id="selectProvincia" class="form-control" disabled required>
                                <option value="-1" selected>Provincia</option>
                            </select>
                            <span class="error text-danger errorProvincia"> </span>
                        </div>

                        <div class="col-md-5 mb-3">
                            <select id="selectLocalidad" class="form-control" disabled required>
                                <option value="-1" selected>Localidad</option>
                            </select>
                            <span class="error text-danger errorLocalidad"> </span>
                        </div>

                    </div>


                    <hr>
                    <div class="form-group">
                        <label for="fechaUsuario">Usuario desde</label>
                        <input type="text" id="fechaUsuario" class="form-control" value="07/02/2020" disabled required>
                        <span class="error text-danger errorFechaUsuario"> </span>
                    </div>
                </form>
                <hr>
                <div class="d-flex opciones justify-content-between">
                    <!--<a href="#" class="text-secondary">Editar datos</a>
                    <a href="#" class="text-danger">Darme de baja</a>-->
                    <a href="#" class="text-danger" data-toggle="modal" data-target="#modalReportar">Reportar Colaborador</a>


                </div>
            </div>
        </div>
    </div>

    <nav class="navbar navbar-light bg-light justify-content-between">
        <a class="navbar-brand">Necesidades</a>
        <form class="form-inline">
            <div class="busqueda">
                <input class="form-control mr-sm-2" type="search" placeholder="Buscar" aria-label="Search">
                <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Buscar</button>
            </div>
        </form>
    </nav>
    <div class="necesidades">
        <div class="row">
            <div class="col-md-6">
                <div class="card necesidad alimentos">
                    <div class="card-body">
                        <div class="row">
                            <div class="col-md-6">
                                <p class="font-weight-bold">Alimentos</p>
                                <p>Necesito fideos y arroz</p>
                                <p>Cantidad: 10</p>
                                <p>Fecha limite: no definida</p>
                            </div>
                            <div class="col-md-6 text-right d-flex flex-column justify-content-between">
                                <p class="ayudasRecibidas">
                                    <a href="#"><span class="nroAyudas">5</span><i class="fas fa-user-friends"></i></a>
                                </p>
                                <p class="verDetalle">
                                    <a href="#">Ver detalle</a>
                                </p>
                                <p class="estado">
                                    <i class="fas fa-spinner"></i>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-md-6">
                <div class="card necesidad ropa">
                    <div class="card-body">
                        <div class="row">
                            <div class="col-md-6">
                                <p class="font-weight-bold">Ropa</p>
                                <p>Necesito camperas.</p>
                                <p>Cantidad: no definida</p>
                                <p>Fecha limite: no definida</p>
                            </div>
                            <div class="col-md-6 text-right d-flex flex-column justify-content-between">
                                <p class="ayudasRecibidas">
                                    <a href="#"><span class="nroAyudas">1</span><i class="fas fa-user-friends"></i></a>
                                </p>
                                <p class="verDetalle">
                                    <a href="#">Ver detalle</a>
                                </p>
                                <p class="estado">
                                    <i class="fas fa-check-circle"></i>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!--row -->
        <div class="row">
            <div class="col-md-6">
                <div class="card necesidad servicios">
                    <div class="card-body">
                        <div class="row">
                            <div class="col-md-6">
                                <p class="font-weight-bold">Servicios</p>
                                <p>Necesito un electricista</p>
                                <p>Cantidad: no definida</p>
                                <p>Fecha limite: 23/09/2020</p>
                            </div>
                            <div class="col-md-6 text-right d-flex flex-column justify-content-between">
                                <p class="ayudasRecibidas">
                                    <a href="#"><span class="nroAyudas">1</span><i class="fas fa-user-friends"></i></a>
                                </p>
                                <p class="verDetalle">
                                    <a href="#">Ver detalle</a>
                                </p>
                                <p class="estado">
                                    <i class="fas fa-spinner"></i>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-md-6">
                <div class="card necesidad dinero">
                    <div class="card-body">
                        <div class="row">
                            <div class="col-md-6">
                                <p class="font-weight-bold">Dinero</p>
                                <p>Necesito dinero (en dolares).</p>
                                <p>Cantidad: 10000</p>
                                <p>Fecha limite: no definida</p>
                            </div>
                            <div class="col-md-6 text-right d-flex flex-column justify-content-between">
                                <p class="ayudasRecibidas">
                                    <a href="#"><span class="nroAyudas">0</span><i class="fas fa-user-friends"></i></a>
                                </p>
                                <p class="verDetalle">
                                    <a href="#">Ver detalle</a>
                                </p>
                                <p class="estado">
                                    <i class="far fa-sticky-note"></i>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!--row -->
        <div class="row">
            <div class="col-md-6">
                <div class="card necesidad limpieza">
                    <div class="card-body">
                        <div class="row">
                            <div class="col-md-6">
                                <p class="font-weight-bold">Limpieza</p>
                                <p>Necesito lavandina</p>
                                <p>Cantidad: 2</p>
                                <p>Fecha limite: 01/12/2020</p>
                            </div>
                            <div class="col-md-6 text-right d-flex flex-column justify-content-between">
                                <p class="ayudasRecibidas">
                                    <a href="#"><span class="nroAyudas">2</span><i class="fas fa-user-friends"></i></a>
                                </p>
                                <p class="verDetalle">
                                    <a href="#">Ver detalle</a>
                                </p>
                                <p class="estado">
                                    <i class="fas fa-check-circle"></i>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-md-6">
                <div class="card necesidad varios">
                    <div class="card-body">
                        <div class="row">
                            <div class="col-md-6">
                                <p class="font-weight-bold">Varios</p>
                                <p>Necesito una computadora</p>
                                <p>Cantidad: 1</p>
                                <p>Fecha limite: no definida</p>
                            </div>
                            <div class="col-md-6 text-right d-flex flex-column justify-content-between">
                                <p class="ayudasRecibidas">
                                    <a href="#"><span class="nroAyudas">5</span><i class="fas fa-user-friends"></i></a>
                                </p>
                                <p class="verDetalle">
                                    <a href="#">Ver detalle</a>
                                </p>
                                <p class="estado">
                                    <i class="fas fa-spinner"></i>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!--row -->
    </div> <!-- necesidades -->

    <div class="comentarios mt-4">
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

@include("UIPerfilModales/UIModalCalificar")
@include("UIPerfilModales/UIModalReportar")
@include("UIPerfilModales/UIModalSubscribirse")


<!-- scripts -->
<script type="text/javascript" src="{{URL::asset('assets/js/organizacion.js')}}"></script>
@endsection
