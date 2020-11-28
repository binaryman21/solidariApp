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
                <img id="imgPerfilColaborador" class="rounded-circle imgPerfilOrg align-self-start mr-auto" src="{{URL::asset('assets/img/imgUserProfile.png')}}" alt="imagen de usuario">
            </div>
            <!-- <button class="user-action d-flex btn ml-auto p-0" type="button" data-toggle="modal" href="#modalSubscribirse" id="btnSuscribirse">Subscribirse</button> -->
            <div class="clearfix mb-n4"></div>
            <h5 class="card-title mt-2 loading ldg-w-sm" id="nombreColaborador"></h5>
            <small class="card-text text-muted loading" id="fechaAltaUsuario"></small>
            <button id="btn-contacto" type="button" class="btn btn-link btn-sm text-decoration-none d-none" data-toggle="modal" data-target="#contacto">Informacion de contacto</button>
        </div>
    </div>
    <div class="row mb-4">
        <!-- Colaboraciones -->
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
                    <div id="colaboraciones"></div>
                </div>
                <div id="navColaboraciones"></div>
            </div>
        </div>
        <div class="col-md-6">
            <!-- Insignias -->
            <div class="card insignias mt-xs-4">
                <div class="card-body">
                    <h6 class="card-title">Insignias</h6>
                    <div id="insignias"></div>
                </div>
            </div>

            <div class="col-md-6">
                <!-- Calificaciones -->
                <div class="card mt-sm-4">
                    <div class="card-body">
                        <h6 class="card-title">Comentarios</h6>
                        <!-- TABS Buenas | Regulares | Malas -->
                        <ul class="nav nav-tabs" id="calificacionesTAB" role="tablist">
                            <li class="nav-item" role="presentation">
                                <a class="nav-link active" id="Positivos-tab" data-toggle="tab" href="#trato-1" role="tab" aria-controls="Positivos" aria-selected="true">Positivos</a>
                            </li>
                            <li class="nav-item" role="presentation">
                                <a class="nav-link" id="Regulares-tab" data-toggle="tab" href="#trato-2" role="tab" aria-controls="Regulares" aria-selected="false">Regulares</a>
                            </li>
                            <li class="nav-item" role="presentation">
                                <a class="nav-link" id="Negativos-tab" data-toggle="tab" href="#trato-3" role="tab" aria-controls="Negativos" aria-selected="false">Negativos</a>
                            </li>
                        </ul>
                        <!-- Contenedor de la calificaciones -->
                        <div class="tab-content" id="calificaciones">
                            <div class="tab-pane fade active show" id="trato-1" role="tabpanel" aria-labelledby="Positivos-tab"></div>
                            <div class="tab-pane fade" id="trato-2" role="tabpanel" aria-labelledby="Regulares-tab"></div>
                            <div class="tab-pane fade" id="trato-3" role="tabpanel" aria-labelledby="Negativos-tab"></div>
                        </div>
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
@endsection

@section('scripts')
    @parent
    <script type="text/javascript" src="{{URL::asset('assets/js/utilidades.js')}}"></script>
    <script type="text/javascript" src="{{URL::asset('assets/js/logueo.js')}}"></script> -->
    <script type="text/javascript" src="{{URL::asset('assets/js/perfilColaborador.js')}}"></script> -->
@endsection