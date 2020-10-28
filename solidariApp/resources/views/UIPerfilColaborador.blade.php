@extends("layouts.master")

@section("contenido")

<div class="container p-2">
    <div class="jumbotron">
        <div class="row align-middle">
            <div class="col-md-2">
                <img class="rounded-circle imgPerfilCol" src="{{URL::asset('assets/img/user.png')}}" alt="imagen de usuario">
            </div>
            <div class="col-md-8 align-self-center">
                <p class="lead" id="nombreColaborador">
                    Nombre
                </p>
                <p class="lead" id="apellidoColaborador">
                    Apellido
                </p>
                <p class="lead" id="apellidoColaborador">
                    Insignias: 
                </p>
            </div>
            <div class="col-md-2">
                <button class="btn btn-block btn-primary" type="button">Editar Mi Perfil</button>
                <button class="btn btn-block btn-primary" type="button">Guardar Cambios</button>
            </div>
        </div>

    </div>

    <div class="row">
        <div class="col-md-6">
            <h4>Comentarios</h4>
            <div class="comentarios">
                <div class="card comentario">
                    <div class="card-body">
                        <h5 class="card-title d-flex justify-content-between"> <span class="tituloComentario">Cooperanza</span> <span class="fechaComentario">15/07/2020</span></h5>
                        <p class="card-text">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis molestias adipisci asperiores doloribus, soluta nostrum ab ea quasi ducimus aliquam. Illo accusamus rerum dignissimos aliquid culpa aperiam vitae ullam sunt.</p>
                    </div>
                </div>
                <div class="card comentario">
                    <div class="card-body">
                        <h5 class="card-title d-flex justify-content-between"> <span class="tituloComentario">Rapidez</span> <span class="fechaComentario">15/07/2020</span></h5>
                        <p class="card-text">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tempora quasi, fuga voluptates accusamus odit id quam alias sint officia harum, explicabo veniam incidunt, repellat molestiae quaerat eum delectus eligendi beatae!</p>
                    </div>
                </div>
                <div class="card comentario">
                    <div class="card-body">
                        <h5 class="card-title d-flex justify-content-between"> <span class="tituloComentario">Despliegue</span> <span class="fechaComentario">15/07/2020</span></h5>
                        <p class="card-text">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ducimus in praesentium fugiat itaque laboriosam provident totam sed omnis reprehenderit! Inventore culpa enim ad nihil corrupti aperiam eos nisi nulla dolore?</p>
                    </div>
                </div>
                <div class="card comentario">
                    <div class="card-body">
                        <h5 class="card-title d-flex justify-content-between"> <span class="tituloComentario">Confianza</span> <span class="fechaComentario">15/07/2020</span></h5>
                        <p class="card-text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim sint quaerat incidunt reprehenderit nesciunt et sapiente dignissimos nam error exercitationem? Nulla suscipit, iure vel eum laudantium velit illum ipsum voluptates.</p>
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
                    <button type="button" class="btn btn-success btn-sm">Agregar</button>
                    <!--  <span class="badge badge-pill badge-primary">Agregar</span>-->
                    <div class="form-row">
                        <div class="col-3 col-mb-3 mb-3">
                            <input type="text" class="form-control" id="codArea" value="011" disabled placeholder="Cod. Area" required>
                            <span class="error text-danger errorCodArea"> </span>
                        </div>
                        <div class="col-6 col-mb-6 mb-6">
                            <!-- <span class="badge badge-pill badge-danger pull-right">Eliminar</span>-->
                            <input type="text" class="form-control" id="numeroTelefono" value="156472896" disabled placeholder="Numero" required>
                            <span class="error text-danger errorNroTelefono"></span>
                        </div>
                        <div class="col-1 col-mb-1 mb-1">
                        <button type="button" class="btn btn-danger btn-sm">Eliminar</button>
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
                        <div class="col-1 col-mb-1 mb-1">
                            <button type="button" class="btn btn-danger btn-sm">Eliminar</button>
                        </div>
                    </div>
                  
                   
                    <hr>
                    <label for="calle">Direccion</label>
                    <button type="button" class="btn btn-success btn-sm">Agregar</button>
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
                        <div class="col-1 col-mb-1 mb-1">
                            <button type="button" class="btn btn-danger btn-sm">Eliminar</button>
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
                    <a href="#" class="text-primary" data-toggle="modal" data-target="#modalCambiarPass">Cambiar Contraseña</a>
                    <a href="#" class="text-primary" data-toggle="modal" data-target="#modalCambiarPass">Darme de Baja</a>
                </div>
            </div>
        </div>
    </div>


    <nav class="navbar navbar-light bg-light justify-content-between mt-4">
        <a class="navbar-brand">Colaboraciones</a>
        <form class="form-inline">
            <input class="form-control mr-sm-2" type="search" placeholder="Buscar" aria-label="Search">
            <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Buscar</button>
        </form>
    </nav>
    <div class="necesidades">
        <div class="row">
            <div class="col-md-6">
                <div class="card necesidad alimentos">
                    <div class="card-body">
                        <p class="text-right">18/10/2020</p>
                        <div class="row">
                            <div class="col-md-3">
                                <img class="rounded-circle imgNecesidad" src="{{URL::asset('assets/img/user.png')}}" alt="imagen de usuario">
                            </div>
                            <div class="col-md-9">
                                <h5 class="card-title">Nombre organizacion</h5>
                                <p class="card-text">Alimentos.</p>
                            </div>
                        </div>
                        <p class="mt-2">Descripcion de la necesidad</p>
                    </div>
                </div>
            </div>
            <div class="col-md-6">
                <div class="card necesidad ropa">
                    <div class="card-body">
                        <p class="text-right">18/10/2020</p>
                        <div class="row">
                            <div class="col-md-3">
                                <img class="rounded-circle imgNecesidad" src="{{URL::asset('assets/img/user.png')}}" alt="imagen de usuario">
                            </div>
                            <div class="col-md-9">
                                <h5 class="card-title">Nombre organizacion</h5>
                                <p class="card-text">Ropa.</p>
                            </div>
                        </div>
                        <p class="mt-2">Descripcion de la necesidad</p>
                    </div>
                </div>
            </div>
        </div>
        <!--row -->
        <div class="row">
            <div class="col-md-6">
                <div class="card necesidad limpieza">
                    <div class="card-body">
                        <p class="text-right">18/10/2020</p>
                        <div class="row">
                            <div class="col-md-3">
                                <img class="rounded-circle imgNecesidad" src="{{URL::asset('assets/img/user.png')}}" alt="imagen de usuario">
                            </div>
                            <div class="col-md-9">
                                <h5 class="card-title">Nombre organizacion</h5>
                                <p class="card-text">Limpieza.</p>
                            </div>
                        </div>
                        <p class="mt-2">Descripcion de la necesidad</p>
                    </div>
                </div>
            </div>
            <div class="col-md-6">
                <div class="card necesidad varios">
                    <div class="card-body">
                        <p class="text-right">18/10/2020</p>
                        <div class="row">
                            <div class="col-md-3">
                                <img class="rounded-circle imgNecesidad" src="{{URL::asset('assets/img/user.png')}}" alt="imagen de usuario">
                            </div>
                            <div class="col-md-9">
                                <h5 class="card-title">Nombre organizacion</h5>
                                <p class="card-text">Varios.</p>
                            </div>
                        </div>
                        <p class="mt-2">Descripcion de la necesidad</p>
                    </div>
                </div>
            </div>
        </div>
        <!--row -->
    </div>

    <div class="alert alert-success mt-4" role="alert">
        <h4 class="alert-heading">Ayuda a las organizaciones para obtener nuevas insignias</h4>
        <p>Aww yeah, you successfully read this important alert message. This example text is going to run a bit longer so that you can see how spacing within an alert works with this kind of content.</p>
        <hr>
        <p class="mb-0">¡Segui ayudando!</p>
    </div>

</div> <!-- container -->
@include("UICambiarPass")
<!-- Scripts -->
<script type="text/javascript" src="{{URL::asset('assets/js/colaborador.js')}}"></script>
@endsection