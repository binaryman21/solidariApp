@extends("layouts.master")

@section("meta")
    @parent
    <meta property="og:url"                content="https://www.solidariapp.com.ar" />
    <meta property="og:type"               content="website" />
    <meta property="og:title"              content="SolidariApp" />
    <meta property="og:description"        content="Descripcion de la pag" />
    <meta property="og:image"              content="http://static01.nyt.com/bookJumbo-v2.jpg" />
@endsection
<!-- FACEBOOK -->

@section("contenido")
@parent
<div id="fb-root"></div>
 <!-- container -->
<div class="container-sm perfil bg-white px-lg-4">
    <div class="card card-user mb-3">
        <div class="card-img-block">
            <img id="cover" src="{{URL::asset('assets/img/cover.svg')}}" class="img-fluid" alt="portada de la organizacion">
        </div>
        <div class="card-body pt-5">
            <div class="media">
                <img id="urlFotoPerfilOrganizacion" class="shadow-sm rounded-circle imgPerfilOrg align-self-start mr-auto" src="{{URL::asset('assets/img/imgUserProfile.png')}}" alt="imagen de usuario">
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
        <div class="col-md-6 mb-3">
            <div class="card">
                <div class="card-body">
                    <!-- Titulo  Boton nueva necesidad-->
                    <div class="d-flex align-items-center">
                        <h6 class="card-title mr-auto">Necesidades</h6>
                        <h6 class="card-title">
                            <a class="px-2 py-1 text-decoration-none rounded" data-toggle="modal" href="#modalEditarNecesidad" id="btnNuevaNecesidad" style="background-color: aliceblue;">Nueva necesidad</a>
                        </h6>
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
        <!-- Calificaciones -->
        <div class="col-md-6">
            <div class="card class="card mt-4 mt-lg-2"">
                <div class="card-body">
                    <h6 class="card-title">Calificaciones</h6>
                    <!-- TABS Buenas | Regulares | Malas -->
                    <ul class="nav nav-tabs" id="calificacionesTAB" role="tablist">
                        <li class="nav-item" role="presentation">
                            <a class="nav-link active" id="Positivas-tab" data-toggle="tab" href="#trato-3" role="tab" aria-controls="Positivas" aria-selected="true">Positivas</a>
                        </li>
                        <li class="nav-item" role="presentation">
                            <a class="nav-link" id="Regulares-tab" data-toggle="tab" href="#trato-2" role="tab" aria-controls="Regulares" aria-selected="false">Regulares</a>
                        </li>
                        <li class="nav-item" role="presentation">
                            <a class="nav-link" id="Negativas-tab" data-toggle="tab" href="#trato-1" role="tab" aria-controls="Negativs" aria-selected="false">Negativas</a>
                        </li>
                    </ul>
                    <!-- Contenedor de la calificaciones -->
                    <div class="tab-content" id="calificaciones">
                        <div class="tab-pane fade active show" id="trato-3" role="tabpanel" aria-labelledby="Positivas-tab"></div>
                        <div class="tab-pane fade" id="trato-2" role="tabpanel" aria-labelledby="Regulares-tab"></div>
                        <div class="tab-pane fade" id="trato-1" role="tabpanel" aria-labelledby="Negativas-tab"></div>
                    </div>
                </div>
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

@include("UIPerfilModales/UIModalEditarNecesidad")
@include("UIPerfilModales/UIModalBajaNecesidad")
<!--agregue includes-->
@include("UIPerfilModales/UIModalCalificarOrganizacion")
@include("UIPerfilModales/UIModalSuscribirse")
@include("UIDetalleNecesidad")
@endsection

@section('scripts')
    @parent
    <script type="text/javascript" src="{{URL::asset('assets/js/necesidad.js')}}"></script>
    <script type="text/javascript" src="{{URL::asset('assets/js/perfilOrganizacion.js')}}"></script>
    <!-- <script type="text/javascript" src="{{URL::asset('assets/js/calificacion.js')}}"></script> -->
    <!-- <script type="text/javascript" src="{{URL::asset('assets/js/colaboracion.js')}}"></script> -->
    <!-- <script type="text/javascript" src="{{URL::asset('assets/js/validaciones.js')}}"></script> -->
@endsection
