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
            <input class="form-control my-2 rounded" type="text">
            <div class = "card " >
                <div class = "p-2 m-2 cardOrganizacion">
                    <div class ="d-flex flex-row p-2 justify-content-between detalleOrganizacion">

                            <img class="rounded-circle imgPerfilOrg" src="{{URL::asset('assets/img/user.png')}}" alt="imagen de usuario">
                            <div class = "m-2">
                                <p class="lead">
                                    Nombre de la organizacion
                                </p>
                                <p>
                                    Tipo de organizacion
                                </p>
                                <a class = "btn btn-link float-right" href = "/organizacion">Ver perfil</a>
                            </div>

                    </div>
                    <div class  = "listaNecesidades" class="px-lg-2 pb-2">
                        <div class="card necesidad ropa">
                            <div class="card-body">
                                <div class="row">
                                    <div class="col-md-6">
                                        <p class="font-weight-bold">Ropa</p>
                                        <p>Necesito camperas.</p>
                                    </div>
                                    <div class = "col-md-6 d-flex flex-row align-items-end justify-content-end"><button class = "btn btn-primary">Me interesa</button></div>
                                </div>
                            </div>
                        </div>

                        <div class="card necesidad dinero">
                            <div class="card-body">
                                <div class="row">
                                    <div class="col-md-6">
                                        <p class="font-weight-bold">Dinero</p>
                                        <p>Necesito dinero</p>
                                    </div>
                                    <div class = "col-md-6 d-flex flex-row align-items-end justify-content-end"><button class = "btn btn-primary">Me interesa</button></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <button class = "btn btn-link float-right">Ver todas</button>
            </div>

            <div class = "p-2 m-2 cardOrganizacion">
                <div class ="d-flex flex-row p-2 justify-content-between detalleOrganizacion" style = "background-color:#EEEEEE;">

                        <img class="rounded-circle imgPerfilOrg" src="{{URL::asset('assets/img/user.png')}}" alt="imagen de usuario">
                        <div class = "m-2">
                            <p class="lead">
                                Nombre de la organizacion
                            </p>
                            <p>
                                Tipo de organizacion
                            </p>
                            <a class = "btn btn-link float-right" href = "/organizacion">Ver perfil</a>
                        </div>

                </div>
                <div class="listaNecesidades" class="px-lg-2 pb-2">
                    <div class="card necesidad ropa">
                        <div class="card-body">
                            <div class="row">
                                <div class="col-md-6">
                                    <p class="font-weight-bold">Ropa</p>
                                    <p>Necesito camperas.</p>
                                </div>
                                <div class = "col-md-6 d-flex flex-row align-items-end justify-content-end"><button class = "btn btn-primary">Me interesa</button></div>
                            </div>
                        </div>
                    </div>

                    <div class="card necesidad dinero">
                        <div class="card-body">
                            <div class="row">
                                <div class="col-md-6">
                                    <p class="font-weight-bold">Dinero</p>
                                    <p>Necesito dinero</p>
                                </div>
                                <div class = "col-md-6 d-flex flex-row align-items-end justify-content-end"><button class = "btn btn-primary">Me interesa</button></div>
                            </div>
                        </div>
                    </div>
                </div>
                <button class = "btn btn-link float-right">Ver todas</button>
        </div>
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
                <div class="row p-2" style = "height:400px;">
                <div class = "d-flex flex-column rounded p-2" style = "width:100%;height:100%;">
                    <div id="mapa"></div>
                </div>
                </div>
                <div class="row p-2" id = "botonesRegistro">
                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12 rounded p-2" >
                    <div class = "d-flex flex-column rounded justify-content-between p-4" style = "background-color:#C3E4DF;width:100%;height:100%;">
                        <h5>¿Quieres ayudar?</h5>
                        <p class="mb-4">Al registrarte como colaborador podrás ayudar a una organización con diferentes recursos</p>
                        <button class = "btn btn-light" data-toggle="modal" data-target="#modalLogin" id="btnRegistrarseComoOrganizacion">Registrarme como colaborador</button>
                    </div>

                    </div>
                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12 p-2">
                        <div class = "d-flex flex-column rounded justify-content-between p-4" style = "background-color:#B4CAE2;width:100%;height:100%;">
                        <h5>¿Necesitas ayuda?</h5>
                        <p class="mb-4">Al registrarte como organización serás visible en el mapa del sitio y los colaboradores podrán ayudarte con recursos que necesites</p>
                        <button class = "btn btn-light" data-toggle="modal" data-target="#modalLogin" id="btnRegistrarseComoColaborador">Registrarme como organizacion</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    @include("UIPrincipalRegistroGoogle")
    @include("UIPrincipalRegistro")
    @include("UIPrincipalResultadoRegistro")
@endsection

@section('scripts')
    @parent
    <!-- Google JS-->
    <script src="https://apis.google.com/js/platform.js" async defer></script>
    <script type="text/javascript" src="{{URL::asset('assets/js/google.js')}}"></script>
    <!-- Leaflet JS -->
    <script src="https://unpkg.com/leaflet@1.7.1/dist/leaflet.js"
    integrity="sha512-XQoYMqMTK8LvdxXYG3nZ448hOEQiglfqkJs1NOQV44cWnUrBc8PkAOcXy20w0vlaXaVUearIOBhiXZ5V3ynxwA=="
    crossorigin=""></script>
    <script type="text/javascript" src="{{URL::asset('assets/js/app.js')}}"></script>
    <!-- JS -->
    <script type="text/javascript" src="{{URL::asset('assets/js/UIPrincipal.js')}}"></script>
    <script src="https://unpkg.com/axios/dist/axios.min.js"></script>

<script>
  function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('User signed out.');
    });
  }
</script>
@endsection

