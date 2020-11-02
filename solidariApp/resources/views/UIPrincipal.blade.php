@extends("layouts.master")
@section('title', 'Inicio')
@section("meta")
    @parent
    <!-- Google -->
    <meta name="google-signin-scope" content="profile email">
    <meta name="google-signin-client_id" content="417738312803-p5r2efabrok2v72si97hoe2r0ctvrsg0.apps.googleusercontent.com">
    <!-- Leaflet CSS -->
    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css"
    integrity="sha512-xodZBNTC5n17Xt2atTPuE1HxjVMSvLVW9ocqUKLsCC5CXdbqCmblAshOMAS6/keqq/sMZMZ19scR4PsZChSR7A=="
    crossorigin=""/>
@endsection
@section("contenido")
    <div class="container-fluid px-sm-3 px-lg-5">
        <div class="row bg-white rounded justify-content-lg-center">
            <div class="col-xs-12 col-sm-4 col-lg-3 p-0 p-md-2">
                <div class="input-group my-2 mt-4 mt-lg-3">
                    <input class="form-control border-secondary border-right-0" type="text" placeholder="Buscar ... ">
                    <div class="input-group-append">
                        <button class="btn btn-outline-secondary border-secondary border-left-0" type="button"><i class="fa fa-search fa-xs"></i></button>
                    </div>
                </div>
                <div class = "card listaOrganizaciones border-0" >
                <!--<x-card-organizacion
                        orgcover="https://products.ls.graphics/paaatterns/images/009.png"
                        orgavatar="https://www.ievictorwiedemann.edu.co/images/pngocean.com-12.png"
                        orgname="Niños Felices"
                        orgtype="Comedor social"
                        orglocation="Ezeiza, Buenos Aires"
                    />-->
                </div>
            </div>
            <div class="col">
                <div class="row px-2 pt-3 justify-content-between align-items-center">
                    <div class="col-12 col-lg-5">
                        <h6 class="mb-0">Mapa de las organizaciones</h6>
                        <small class="text-muted">Organizaciones en el radio de tu ubicacion</small>
                    </div>
                    <div class="col-9 col-lg-5">
                        <input type="text" id="ubicacion" class="form-control form-control-sm" placeholder="Mi ubicacion">
                    </div>
                    <div class="col-3 col-lg-2">
                        <select class="custom-select border-0" id="rangoDeVisualizacion">
                            <option value="5" selected="">5 KM</option>
                            <option value="10">10 KM</option>
                            <option value="15">15 KM</option>
                            <option value="20">20 KM</option>
                            <option value="25">25 KM</option>
                            <option value="30">30 KM</option>
                            <option value="35">35 KM</option>
                        </select>
                    </div>
                </div>
                <div class="row p-2" >
                    <div class = "d-flex flex-column rounded p-2" style = "width:100%;height:100%;">
                        <div id="mapa" class = "mapa"></div>
                    </div>
                </div>
                <div class="row d-flex justify-content-between mx-1 align-items-center border rounded">
                    <div class="col py-2">Filtrar por</div>
                    <div class="col p-0 btn-group" role="group">
                        <button class="btn btn-light" data-toggle="tooltip" data-placement="top" title="Filtrar por Alimentos"><i class="fas fa-utensils fa-sm"></i></button>
                        <button class="btn btn-light" data-toggle="tooltip" data-placement="top" title="Filtrar por Ropa"><i class="fas fa-tshirt fa-sm"></i></button>
                        <button class="btn btn-light" data-toggle="tooltip" data-placement="top" title="Filtrar por Dinero"><i class="fas fa-donate fa-sm"></i></button>
                        <button class="btn btn-light" data-toggle="tooltip" data-placement="top" title="Filtrar por productos de limpieza"><i class="fas fa-spray-can fa-sm"></i></button>
                        <button class="btn btn-light" data-toggle="tooltip" data-placement="top" title="Filtrar por Alimentos"><i class="fas fa-hands-helping fa-sm"></i></button>
                        <button class="btn btn-light" data-toggle="tooltip" data-placement="top" title="Filtrar por Varios"><i class="fas fa-hand-holding-heart fa-sm"></i></button>
                    </div>
                </div>
                <div class="row p-2" id = "botonesRegistro">
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
    <script src="https://unpkg.com/axios/dist/axios.min.js" defer></script>
    <!-- Validaciones -->
    <script type="text/javascript" src="{{URL::asset('assets/js/validaciones.js')}}" defer></script>
    <!-- Utilidades -->
    <script type="text/javascript" src="{{URL::asset('assets/js/utilidades.js')}}" defer></script>



@endsection

