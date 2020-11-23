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
            <div class="clearfix"></div>
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
                    <!-- Titulo  Boton nueva necesidad-->
                    <div class="d-flex align-items-center">
                        <h6 class="card-title mr-auto">Necesidades</h6>
                        <h6 class="card-title">
                            <a class="px-2 py-1 text-decoration-none rounded" data-toggle="modal" href="#modalEditarNecesidad" id="btnNuevaNecesidad" style="background-color: aliceblue;">Nueva necesidad</a>
                        </h6>
                    </div>
                    <!-- Buscador -->
                    <div class="input-group my-3">
                        <input class="form-control border-secondary border-right-0" type="text" id="campoBuscarPorTexto" placeholder="Categoría, descripción o nombre de la Org.">
                        <div class="input-group-append">
                            <button class="btn btn-outline-secondary border-secondary border-left-0" id="btnBuscarNeccesidades" type="button"><i class="fa fa-search fa-xs"></i></button>
                        </div>
                    </div>
                    <!-- TABS En progreso | Cumplidas | Eliminadas -->
                    <ul class="nav nav-tabs" id="necesidadesTABS" role="tablist">
                        <li class="nav-item" role="presentation">
                            <a class="nav-link active" id="enproceso-tab" data-toggle="tab" href="#necesidadesEnProceso" role="tab" aria-controls="En proceso" aria-selected="true">En proceso</a>
                        </li>
                        <li class="nav-item" role="presentation">
                            <a class="nav-link" id="cumplidas-tab" data-toggle="tab" href="#necesidadesCumplidas" role="tab" aria-controls="Cumplidas" aria-selected="false">Cumplidas</a>
                        </li>
                        <li class="nav-item" role="presentation">
                            <a class="nav-link" id="eliminadas-tab" data-toggle="tab" href="#necesidadesEliminadas" role="tab" aria-controls="Eliminadas" aria-selected="false">Eliminadas</a>
                        </li>
                    </ul>
                    <!-- Contenedor de las necesidades -->
                    <div class="tab-content" id="misNecesidades">
                        <div class="tab-pane fade active show" id="necesidadesEnProceso" role="tabpanel" aria-labelledby="enproceso-tab"></div>
                        <div class="tab-pane fade" id="necesidadesCumplidas" role="tabpanel" aria-labelledby="cumplidas-tab"></div>
                        <div class="tab-pane fade" id="necesidadesEliminadas" role="tabpanel" aria-labelledby="eliminadas-tab"></div>
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

@include("UIPerfilModales.UIModalEditarNecesidad")
@include("UIPerfilModales.UIModalBajaNecesidad")
@endsection

@section('scripts')
    @parent
    <script type="text/javascript" src="{{URL::asset('assets/js/utilidades.js')}}"></script>
    <script type="text/javascript" src="{{URL::asset('assets/js/necesidad.js')}}"></script>
    <script type="text/javascript" src="{{URL::asset('assets/js/perfilOrganizacion.js')}}"></script>
@endsection
