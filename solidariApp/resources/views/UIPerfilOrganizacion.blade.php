@extends("layouts.master")

@section("contenido")
@parent
    <div class="container p-2">
        <div class="jumbotron">
            <div class="row align-middle">
                <div class="col-md-2">
                    <img class="rounded-circle imgPerfilOrg" src="{{URL::asset('assets/img/user.png')}}" alt="imagen de usuario">
                </div>
                <div class="col-md-8 align-self-center">
                    <p class="lead">
                        Nombre de la organizacion
                    </p>
                    <p>
                        Tipo de organizacion
                    </p>
                </div>
                <div class="col-md-2">
                <button class="btn btn-block btn-danger" type="button">Reportar</button>
                <button class="btn btn-block btn-success" type="button">Subscribirse</button>
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
                            <label for="email">Correo</label>
                            <input type="email" id="email" class="form-control" value="usuario@mail.com" disabled required>
                            <span class="error text-danger errorEmail"> </span>
                        </div>
                        <div class="form-group">
                            <label for="tel">Telefono</label>
                            <input type="text" id="tel" class="form-control" value="(011) 2323232323" disabled required>
                            <span class="error text-danger errorTel"> </span>
                        </div>
                        <div class="form-group">
                            <label for="domicilio">Domicilio</label>
                            <input type="text" id="domicilio" class="form-control" value="Calle falsa 123, Buenos Aires" disabled required>
                            <span class="error text-danger errorDomicilio"> </span>
                        </div>
                        <div class="form-group">
                            <label for="fechaUsuario">Usuario desde</label>
                            <input type="text" id="fechaUsuario" class="form-control" value="07/02/2020" disabled required>
                            <span class="error text-danger errorFechaUsuario"> </span>
                        </div>
                    </form>
                    <div class="d-flex opciones justify-content-between">
                        <a href="#" class="text-secondary">Editar datos</a>     
                        <a href="#" class="text-danger">Darme de baja</a>     
                        <a href="#" class="text-primary">Cambiar clave</a>     
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
            <a href="#">
                <i class="fas fa-plus-circle agregarNecesidad"></i>
            </a>
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
                                    <p class="editarNecesidad">
                                        <a href="#"><i class="far fa-edit"></i></a>
                                    </p>
                                    <p class="ayudasRecibidas">
                                        <a href="#"><span class="nroAyudas">5</span><i class="fas fa-user-friends"></i></a>
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
                                    <p class="editarNecesidad">
                                        <a href="#"><i class="far fa-edit"></i></a>
                                    </p>
                                    <p class="ayudasRecibidas">
                                        <a href="#"><span class="nroAyudas">1</span><i class="fas fa-user-friends"></i></a>
                                    </p>
                                    <p class="estado">
                                        <i class="fas fa-check-circle"></i>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div> <!--row -->
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
                                    <p class="editarNecesidad">
                                        <a href="#"><i class="far fa-edit"></i></a>
                                    </p>
                                    <p class="ayudasRecibidas">
                                        <a href="#"><span class="nroAyudas">1</span><i class="fas fa-user-friends"></i></a>
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
                                    <p class="editarNecesidad">
                                        <a href="#"><i class="far fa-edit"></i></a>
                                    </p>
                                    <p class="ayudasRecibidas">
                                        <a href="#"><span class="nroAyudas">0</span><i class="fas fa-user-friends"></i></a>
                                    </p>
                                    <p class="estado">
                                        <i class="far fa-sticky-note"></i>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div> <!--row -->
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
                                    <p class="editarNecesidad">
                                        <a href="#"><i class="far fa-edit"></i></a>
                                    </p>
                                    <p class="ayudasRecibidas">
                                        <a href="#"><span class="nroAyudas">2</span><i class="fas fa-user-friends"></i></a>
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
                                    <p class="editarNecesidad">
                                        <a href="#"><i class="far fa-edit"></i></a>
                                    </p>
                                    <p class="ayudasRecibidas">
                                        <a href="#"><span class="nroAyudas">5</span><i class="fas fa-user-friends"></i></a>
                                    </p>
                                    <p class="estado">
                                        <i class="fas fa-spinner"></i>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div> <!--row -->
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

    @include("UIModalCalificar")


<!-- scripts -->
<script type="text/javascript" src="{{URL::asset('assets/js/organizacion.js')}}"></script>
@endsection