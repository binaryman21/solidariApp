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
    <input type="hidden" name="" id = "filtroActual">
    <input type="hidden" name="" id = "valorFiltroActual">
    <input type="hidden" name="" id = "cantidadRegistros">
    <div id="necesidadOculta" class="d-none">{{$idNecesidad}}</div>
    <div id="organizacionOculta" class="d-none">{{$idOrganizacion}}</div>
    <div class="container-fluid px-sm-3 px-lg-5">
        <div class="row bg-white rounded justify-content-lg-center pb-3">
            <div class="col-xs-12 col-sm-4 col-lg-3 p-sm-1 p-md-2 mr-n3" style = "height:100%;">
                <div class="input-group my-2 mt-3 mt-lg-2">
                    <input class="form-control border-secondary border-right-0" type="text" id="campoBuscarPorTexto" placeholder="¿Con qué querés colaborar?">
                    <div class="input-group-append">
                        <div id="dropdownFilters" class="dropdown">
                            <button type="button" class="btn btn-outline-secondary rounded-0 border-left-0 border-right-0" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" id="filtros">
                                <i class="fas fa-filter fa-xs"></i>
                            </button>
                            <div class="dropdown-menu dropdown-menu-right" id="filtrosCategoria"
                            aria-labelledby="filtros" x-placement="bottom-end">

                            </div>
                        </div>
                        <button class="btn btn-outline-secondary border-secondary border-left-0" id="btnBuscarNeccesidades" type="button"><i class="fa fa-search fa-xs"></i></button>
                    </div>
                </div>
                <div class = "card scrollpane border-0 overflow-auto" style = "height:650px;">
                    <div class = "card listaOrganizaciones border-0" id= "results" ></div>
                </div>
            </div>
            <div class="col mr-n2">
                <div class="row px-2 pt-3 justify-content-between align-items-center">
                    <div class="col-12 col-lg-5">
                        <h6 class="mb-0">Mapa de las organizaciones</h6>
                        <small class="text-muted">Organizaciones en el radio de tu ubicacion</small>
                    </div>
                    <div class="col-12 col-lg-6 ml-2 mr-2 ml-lg-auto pr-0 pl-2 input-group">
                        <input type="text" id="ubicacion" class="form-control border-secondary border-right-0 " placeholder="¿Dondé queres colaborar?">
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
                <div class="row p-2" >
                    <div class = "d-flex flex-column rounded p-2 h-auto" style = "width:100%;height:100%;">
                        <div id="carouselNotif" class="carouselNotif"></div>
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

    <!-- {{-- @include("UIPrincipalRegistroGoogle") --}} -->
    @include("UIPrincipalRegistro")
    <!-- {{-- @include("UIDetalleNecesidad") --}} -->
    <!-- {{-- @include("UIPrincipalResultadoRegistro") --}} -->
@endsection

@section('scripts')
    @parent

    <!-- Leaflet JS -->
    <script src="https://unpkg.com/leaflet@1.7.1/dist/leaflet.js"
    integrity="sha512-XQoYMqMTK8LvdxXYG3nZ448hOEQiglfqkJs1NOQV44cWnUrBc8PkAOcXy20w0vlaXaVUearIOBhiXZ5V3ynxwA=="
    crossorigin=""></script>
    <script type="text/javascript" src="{{URL::asset('assets/js/app.js')}}"></script>
    <!-- JS -->
    <!-- Utilidades -->
    <script type="text/javascript" src="{{URL::asset('assets/js/utilidades.js')}}" defer></script>
    <script type="text/javascript" src="{{URL::asset('assets/js/UIPrincipal.js')}}"></script>
    <script type="text/javascript" src="{{URL::asset('assets/js/colaboracion.js')}}"></script>
    <!-- <script src="https://unpkg.com/axios/dist/axios.min.js" defer></script> -->
    <!-- Validaciones -->
    <script type="text/javascript" src="{{URL::asset('assets/js/validaciones.js')}}" defer></script>


    
    
@endsection
