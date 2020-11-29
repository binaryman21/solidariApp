@extends("layouts.master")

@section("contenido")
@parent
<!-- container -->
<div class="container-sm bg-white p-2 px-lg-4 perfil">
    <div class="card card-user mb-3">
        <div class="card-img-block">
            <img id="cover" src="{{URL::asset('assets/img/cover.svg')}}" class="img-fluid" alt="portada del colaborador">
        </div>
        <div class="card-body pt-5">
        <div class="media">
            <img id="imgPerfilColaborador" class="rounded-circle imgPerfilOrg align-self-start mr-auto" src="{{URL::asset('assets/img/imgUserProfile.png')}}" alt="imagen de usuario">
        </div>
        <button class="user-action d-flex btn ml-auto p-0" type="button" data-toggle="modal" href="#modalSubscribirse" id="btnSuscribirse">Seguir</button>
        <div class="clearfix mb-n4"></div>
        <h5 class="card-title mt-2" id="nombreColaborador">Nombre del colaborador</h5>
        <small class="card-text text-muted">
            <span>Usuario desde </span>
            <span id="fechaAltaUsuario">2020-10-25 23:03:50</span>
        </small></div>
    </div>
    <div class="row mb-4">
    <!-- necesidades -->
        <div class="col-md-6">
        <div class="card">
            <div class="card-body">
                <h6 class="card-title float-left">Colaboraciones</h6>
                <div class="input-group my-3">
                        <input class="form-control border-secondary border-right-0" type="text" id="campoBuscarPorTexto" placeholder="Categoría, descripción o nombre de la Org.">
                        <div class="input-group-append">
                            <button class="btn btn-outline-secondary border-secondary border-left-0" id="btnBuscarNeccesidades" type="button"><i class="fa fa-search fa-xs"></i></button>
                        </div>
                    </div>
            <div class="necesidades"><div class="card need limpieza" style="" id="necesidad5">
            <div class="card-body">
                <div class="row">
                    <div class="col-md-6">
                        <p class="font-weight-bold">Limpieza e higiene</p>
                        <p>asdasdasdasdasdasdasd</p>
                        <p>Cantidad: 1</p>
                        <p>Fecha limite: 13/12/2020</p>
                    </div>
                    <div class="col-md-6 text-right d-flex flex-column justify-content-between">

                        <p class="ayudasRecibidas">
                            <a href="#" data-toggle="modal" data-target="#modalDetalleNecesidad" id="btnDetalleNecesidad5"><span class="nroAyudas">1</span><i class="fas fa-user-friends"></i></a>
                        </p>
                        <p class="estado">
                            <i class="fas fa-spinner"></i>
                        </p>
                    </div>
                </div>
            </div>
        </div>
        <div class="card need dinero" style="" id="necesidad6">
            <div class="card-body">
                <div class="row">
                    <div class="col-md-6">
                        <p class="font-weight-bold">Dinero</p>
                        <p>Mucho</p>
                        <p>Cantidad: 1</p>
                        <p>Fecha limite: 31/10/2020</p>
                    </div>
                    <div class="col-md-6 text-right d-flex flex-column justify-content-between">

                        <p class="ayudasRecibidas">
                            <a href="#" data-toggle="modal" data-target="#modalDetalleNecesidad" id="btnDetalleNecesidad6"><span class="nroAyudas">0</span><i class="fas fa-user-friends"></i></a>
                        </p>
                        <p class="estado">
                            <i class="fas fa-spinner"></i>
                        </p>
                    </div>
                </div>
            </div>
        </div><div class="card need dinero" style="">
            <div class="card-body">
                <div class="row">
                    <div class="col-md-6">
                        <p class="font-weight-bold">Dinero</p>
                        <p>asdasdasd</p>
                        <p>Cantidad: 1</p>
                        <p>Fecha limite: 28/11/2020</p>
                    </div>
                    <div class="col-md-6 text-right d-flex flex-column justify-content-between">

                        <p class="ayudasRecibidas">
                            <a href="#" data-toggle="modal" data-target="#modalDetalleNecesidad" id="btnDetalleNecesidad7"><span class="nroAyudas">0</span><i class="fas fa-user-friends"></i></a>
                        </p>
                        <p class="estado">
                            <i class="fas fa-spinner"></i>
                        </p>
                    </div>
                </div>
            </div>
        </div><div class="card need limpieza" style="">
            <div class="card-body">
                <div class="row">
                    <div class="col-md-6">
                        <p class="font-weight-bold">Limpieza e higiene</p>
                        <p>lavandina</p>
                        <p>Cantidad: 1</p>
                        <p>Fecha limite: 31/10/2020</p>
                    </div>
                    <div class="col-md-6 text-right d-flex flex-column justify-content-between">

                        <p class="ayudasRecibidas">
                            <a href="#" data-toggle="modal" data-target="#modalDetalleNecesidad" id="btnDetalleNecesidad8"><span class="nroAyudas">0</span><i class="fas fa-user-friends"></i></a>
                        </p>
                        <p class="estado">
                            <i class="fas fa-spinner"></i>
                        </p>
                    </div>
                </div>
            </div>
        </div>
        </div>
        <div id="navNecesidades">
        </div>
        </div>
        </div>
        </div>
            <div class="col-md-6">
                <div class="datos">
                    <div class="card">
                        <div class="card-body">
                            <h6 class="card-title">Contacto</h6>
                            <label for="inptEmail">Email</label>
                            <p class="mx-2 py-3 text-muted" id="correo"></p>
                            <label for="codArea">Telefono</label>
                            <div class="list-group list-group-flush mx-2 text-muted" id="listadoTelefonos"></div>
                            <label for="calle">Direccion</label>
                            <div class="list-group list-group-flush mx-2 text-muted" id="listadoDomicilios">
                            </div>
                        </div>
                    </div>
                </div>

                <div class="card comentarios mt-4">
                    <div class="card-body">
                        <div class="card-title clearfix">
                            <h6 class="float-left">Comentarios</h6>
                            <button class="btn float-right p-0" type="button" data-toggle="modal" href="#modalCalificar" id="btnCalificar">Calificar</button>
                        </div>
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
                        <div class="card comentario" style="display: none;">
                            <div class="card-body">
                                <h5 class="card-title d-flex justify-content-between"> <span class="tituloComentario">Confiable</span> <span class="fechaComentario">15/07/2020</span></h5>
                                <p class="card-text">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ducimus in praesentium fugiat itaque laboriosam provident totam sed omnis reprehenderit! Inventore culpa enim ad nihil corrupti aperiam eos nisi nulla dolore?</p>
                            </div>
                        </div>
                        <div id="navComentarios">
                        </div></div>
                    </div></div>
                </div>
    </div>
</div>

@include("UIPerfilModales/UIModalCalificar")
@include("UIPerfilModales/UIModalReportar")
@include("UIPerfilModales/UIModalSubscribirse")

@endsection

@section('scripts')
    @parent
    <script type="text/javascript" src="{{URL::asset('assets/js/utilidades.js')}}"></script>
    <script type="text/javascript" src="{{URL::asset('assets/js/logueo.js')}}"></script>
    <script type="text/javascript" src="{{URL::asset('assets/js/visitanteDeColaborador.js')}}"></script>
@endsection
