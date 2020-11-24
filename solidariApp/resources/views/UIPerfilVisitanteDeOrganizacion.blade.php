@extends("layouts.master")

@section("contenido")
@parent
 <!-- container -->
<div class="container-sm perfil bg-white p-2 px-lg-4">
    <div class="card card-user mb-3">
        <div class="card-img-block">
            <img id="cover" src="{{URL::asset('assets/img/cover.svg')}}" class="img-fluid" alt="portada de la organizacion">
        </div>
        <div class="card-body pt-5">
            <div class="media">
                <img id="urlFotoPerfilOrganizacion" class="rounded-circle imgPerfilOrg align-self-start mr-auto" src="{{URL::asset('assets/img/imgUserProfile.png')}}" alt="imagen de usuario">
            </div>
            <div class="user-action d-flex">
                <button class="btn ml-auto p-0" type="button" data-toggle="modal" href="#modalSubscribirse" id="btnSuscribirse">Subscribirse</button>
                <div class="btn-group">
                        <i class="fas fa-ellipsis-v fa-sm ml-2 mt-2 text-black" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"></i>
                    <div class="dropdown-menu dropdown-menu-right shadow">
                        <button class="dropdown-item user-select-none" type="button" data-toggle="modal" href="#modalReportar"><i class="far fa-flag fa-sm mr-3"></i>Reportar</button>
                    </div>
                </div>
            </div>
            <div class="clearfix mb-n4"></div>
            <h5 class="card-title mt-2 loading ldg-w-sm" id="nombreOrganizacion"></h5>
            <h6 class="card-subtitle text-muted loading" id="tipoOrganizacion"></h6>
            <p class="card-text mt-4 loading ldg-w-lg ldg-block" id="descripcionOrganizacion"></p>
            <small class="card-text text-muted loading" id="fechaAltaUsuario"></small>
            <button id="btn-contacto" type="button" class="btn btn-link btn-sm text-decoration-none d-none" data-toggle="modal" data-target="#contacto">Informacion de contacto</button>
        </div>
    </div>
    <div class="row mb-4">
        <!-- necesidades -->
        <div class="col-md-6">
            <div class="card">
                <div class="card-body">
                    <h6 class="card-title float-left">Necesidades</h6>
                    <!-- Buscador -->
                    <div class="input-group my-3">
                        <input class="form-control border-secondary border-right-0" type="text" id="campoBuscarPorTexto" placeholder="Categoría, descripción o nombre de la Org.">
                        <div class="input-group-append">
                            <button class="btn btn-outline-secondary border-secondary border-left-0" id="btnBuscarNeccesidades" type="button"><i class="fa fa-search fa-xs"></i></button>
                        </div>
                    </div>
                    <!-- TABS En progreso | Finalizadas -->
                    <ul class="nav nav-tabs" id="necesidadeTABS" role="tablist">
                        <li class="nav-item" role="presentation">
                            <a class="nav-link active" id="inprogress-tab" data-toggle="tab" href="#necesidadesEnProgreso" role="tab" aria-controls="En progreso" aria-selected="true">En progreso</a>
                        </li>
                        <li class="nav-item" role="presentation">
                            <a class="nav-link" id="finished-tab" data-toggle="tab" href="#necesidadesFinalizadas" role="tab" aria-controls="Finalizadas" aria-selected="false">Finalizadas</a>
                        </li>
                    </ul>
                    <!-- Contenedor de las necesidades -->
                    <div class="tab-content" id="misNecesidades">
                        <div class="tab-pane fade active show" id="necesidadesEnProgreso" role="tabpanel" aria-labelledby="inprogress-tab"></div>
                        <div class="tab-pane fade" id="necesidadesFinalizadas" role="tabpanel" aria-labelledby="finished-tab"></div>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-md-6">
            <div class="card comentarios mt-4">
                <div class="card-body">
                    <h6 class="card-title">Comentarios</h6>
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
                <div id="navComentarios"><a href="JavaScript:Void(0);" rel="0" class="active">1</a> <a href="JavaScript:Void(0);" rel="1">2</a> </div></div>
            </div>
        </div>
    </div>
</div>

<!-- Modal Contacto-->
<div class="modal fade" id="contacto" tabindex="-1" aria-labelledby="contactoTitulo" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="contactoTitulo">Contacto</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body datos">
            <label for="inptEmail">Email</label>
            <p class="mx-2 py-2 text-muted loading" id="correo"></p>
            <label for="codArea">Telefono</label>
            <div class="list-group list-group-flush mx-2 text-muted loading" id="listadoTelefonos"></div>
            <label for="calle">Direccion</label>
            <div class="list-group list-group-flush mx-2 text-muted loading ldg-w-lg ldg-block" id="listadoDomicilios"></div>
        </div>
      </div>
      </div>
    </div>
  </div>
</div>


@include("UIPerfilModales.UIModalReportar")
@include("UIPerfilModales.UIModalSuscribirse")
@endsection

@section('scripts')
    @parent
    <script type="text/javascript" src="{{URL::asset('assets/js/utilidades.js')}}"></script>
    <script type="text/javascript" src="{{URL::asset('assets/js/visitanteDeOrganizacion.js')}}"></script>
@endsection
