@extends("layouts.master")
@section('title', 'SolidariApp')
@section("meta")
    @parent
    <!-- Google
    <meta name="google-signin-scope" content="profile email">
    <meta name="google-signin-client_id" content="417738312803-p5r2efabrok2v72si97hoe2r0ctvrsg0.apps.googleusercontent.com"> -->
    <!-- Leaflet CSS -->
    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css"
    integrity="sha512-xodZBNTC5n17Xt2atTPuE1HxjVMSvLVW9ocqUKLsCC5CXdbqCmblAshOMAS6/keqq/sMZMZ19scR4PsZChSR7A=="
    crossorigin=""/>
@endsection
@section("contenido")
    <div class="container-fluid px-sm-3 px-lg-5">
        <div class="row bg-white rounded justify-content-lg-center pb-3">
            <div class="col-xs-12 col-sm-4 col-lg-3 p-sm-1 p-md-2 mr-n3">
                <div class="input-group my-2 mt-3 mt-lg-2">
                    <input class="form-control border-secondary border-right-0" type="text" id="campoBuscarPorTexto" placeholder="Categoría, descripción o nombre de la Org.">
                    <div class="input-group-append">
                        <div class="dropdown">
                            <button type="button" class="btn btn-outline-secondary rounded-0 border-left-0 border-right-0" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" id="filtros">
                                <i class="fas fa-filter fa-xs"></i>
                            </button>
                            <div class="dropdown-menu dropdown-menu-right" id="filtrosCategoria" aria-labelledby="filtros" style="position: absolute; transform: translate3d(-124px, 38px, 0px); top: 0px; left: 0px; will-change: transform;" x-placement="bottom-end">
                                <button class="dropdown-item" data-toggle="tooltip" data-placement="top" title="Alimentos" type="button">
                                    <i class="fas fa-utensils fa-xs ml-n2 mr-3"></i><span>Alimentos</span></button>
                                <button class="dropdown-item" data-toggle="tooltip" data-placement="top" title="Ropa" type="button">
                                    <i class="fas fa-tshirt fa-xs ml-n2 mr-2"></i><span>Ropa</span></button>
                                <button class="dropdown-item" data-toggle="tooltip" data-placement="top" title="Dinero">
                                    <i class="fas fa-donate fa-sm ml-n2 mr-2"></i><span>Dinero</span></button>
                                <button class="dropdown-item" data-toggle="tooltip" data-placement="top" title="Limpieza e higiene">
                                    <i class="fas fa-spray-can fa-sm ml-n2 mr-2"></i><span>Limpieza e higiene</span></button>
                                <button class="dropdown-item" data-toggle="tooltip" data-placement="top" title="Servicios">
                                    <i class="fas fa-hands-helping fa-sm ml-n2 mr-2"></i><span>Servicios</span></button>
                                <button class="dropdown-item" data-toggle="tooltip" data-placement="top" title="Varios">
                                    <i class="fas fa-hand-holding-heart fa-sm ml-n2 mr-2"></i><span>Varios</span></button>
                            </div>
                        </div>
                        <button class="btn btn-outline-secondary border-secondary border-left-0" id="btnBuscarNeccesidades" type="button"><i class="fa fa-search fa-xs"></i></button>
                    </div>
                </div>
                <div class = "card listaOrganizaciones border-0" >
                </div>
            </div>
            <div class="col mr-n2">
                <div class="row px-2 pt-3 justify-content-between align-items-center">
                    <div class="col-12 col-lg-5">
                        <h6 class="mb-0">Mapa de las organizaciones</h6>
                        <small class="text-muted">Organizaciones en el radio de tu ubicacion</small>
                    </div>
                    <div class="col-12 col-lg-6 ml-2 mr-2 ml-lg-auto pr-0 pl-2 input-group">
                        <input type="text" id="ubicacion" class="form-control border-secondary border-right-0 " placeholder="Buscar por localidad o direccion">
                        <div class="input-group-append">
                            <button class="btn btn-outline-secondary border-secondary border-left-0" id="btnBuscarPorUbicacion" type="button"><i class="fa fa-search fa-xs"></i></button>
                        </div>
                    </div>
                </div>
                <div class="row p-2" >
                    <div class = "d-flex flex-column rounded p-2" style = "width:100%;height:100%;">
                        <div id="mapa" class = "mapa"></div>
                    </div>
                </div>
                <div class="row px-2" id = "botonesRegistro">
                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12 rounded p-2" >
                    <div class = "d-flex flex-column rounded justify-content-between p-4" style = "background-color:#C3E4DF;width:100%;height:100%;">
                        <h5>¿Quieres ayudar?</h5>
                        <p class="mb-4">Al registrarte como colaborador podrás ayudar a una organización con diferentes recursos</p>
                        <button class = "btn btn-light" data-toggle="modal" data-target="#modalLogin" id="btnRegistrarseComoColaborador">Registrarme como colaborador</button>
                    </div>
                    </div>
                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12 p-2">
                        <div class = "d-flex flex-column rounded justify-content-between p-4" style = "background-color:#B4CAE2;width:100%;height:100%;">
                            <h5>¿Necesitas ayuda?</h5>
                            <p class="mb-4">Al registrarte como organización serás visible en el mapa del sitio y los colaboradores podrán ayudarte con recursos que necesites</p>
                            <button class = "btn btn-light" data-toggle="modal" data-target="#modalLogin" id="btnRegistrarseComoOrganizacion">Registrarme como organizacion</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    @include("UIPrincipalRegistroGoogle")
    @include("UIPrincipalRegistro")
    @include("UIDetalleNecesidad")
    @include("UIPrincipalResultadoRegistro")
    @include("UIPrincipalModalOrganizaciones")
@endsection

@section('scripts')
    @parent

    <!-- Leaflet JS -->
    <script src="https://unpkg.com/leaflet@1.7.1/dist/leaflet.js"
    integrity="sha512-XQoYMqMTK8LvdxXYG3nZ448hOEQiglfqkJs1NOQV44cWnUrBc8PkAOcXy20w0vlaXaVUearIOBhiXZ5V3ynxwA=="
    crossorigin=""></script>
    <script type="text/javascript" src="{{URL::asset('assets/js/app.js')}}"></script>
    <!-- JS -->
    <script type="text/javascript" src="{{URL::asset('assets/js/logueo.js')}}"></script>
    <script type="text/javascript" src="{{URL::asset('assets/js/UIPrincipal.js')}}"></script>
    <script type="text/javascript" src="{{URL::asset('assets/js/colaboracion.js')}}"></script>
    <script src="https://unpkg.com/axios/dist/axios.min.js" defer></script>
    <!-- Validaciones -->
    <script type="text/javascript" src="{{URL::asset('assets/js/validaciones.js')}}" defer></script>
    <!-- Utilidades -->
    <script type="text/javascript" src="{{URL::asset('assets/js/utilidades.js')}}" defer></script>



@endsection

