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
            <div id="listaNecesidades" class="px-lg-2 pb-2">
                <div class="card necesidad ropa">
                    <div class="card-body">
                        <div class="row">
                            <div class="col-md-6">
                                <p class="font-weight-bold">Ropa</p>
                                <p>Necesito camperas.</p>
                                <p>Cantidad: no definida</p>
                                <p>Fecha limite: no definida</p>
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
                                <p>Cantidad: 10000</p>
                                <p>Fecha limite: no definida</p>
                            </div>
                            <div class = "col-md-6 d-flex flex-row align-items-end justify-content-end"><button class = "btn btn-primary">Me interesa</button></div>
                        </div>
                    </div>
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
                <div class="row p-2">
                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12 rounded p-2" >
                    <div class = "d-flex flex-column rounded justify-content-between p-4" style = "background-color:#C3E4DF;width:100%;height:100%;">
                        <h5>¿Quieres ayudar?</h5>
                        <p class="mb-4">Al registrarte como colaborador podrás ayudar a una organización con diferentes recursos</p>
                        <button class = "btn btn-light" data-toggle="modal" data-target="#modalRegistrarse" id="btnRegistrarseComoOrganizacion">Registrarme como colaborador</button>
                    </div>

                    </div>
                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12 p-2">
                        <div class = "d-flex flex-column rounded justify-content-between p-4" style = "background-color:#B4CAE2;width:100%;height:100%;">
                        <h5>¿Necesitas ayuda?</h5>
                        <p class="mb-4">Al registrarte como organización serás visible en el mapa del sitio y los colaboradores podrán ayudarte con recursos que necesites</p>
                        <button class = "btn btn-light" data-toggle="modal" data-target="#modalRegistrarse" id="btnRegistrarseComoColaborador">Registrarme como organizacion</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    @include("UIPrincipalRegistroGoogle")
    @include("UIPrincipalRegistro")
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
@endsection

@section('script')
<script src="https://apis.google.com/js/platform.js" async defer></script>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
<script src="https://unpkg.com/axios/dist/axios.min.js"></script>
<script>
              axios.post('/registrarColaborador',JSON.stringify
              (
{
    idUsuario:0,
    claveUsuario:"asdasdasd",
    emailUsuario:"a@a.com",
    tokenGoogle:"123123",
    urlFotoPerfilUsuario:"asd",
    rol:{idRolUsuario:0,nombreRolUsuario:""},
    estado:{idEstadoUsuario:0,nombreEstadoUsuario:""},
    nombreColaborador:"pepe",
    apellidoColaborador:"pepepepepe",
    telefonos:
    [
        {idTelefono:0,codAreaTelefono:"123",numeroTelefono:"123123",tipoTelefono:{idTipoTelefono:1,nombeTipoTelefono:""}}
    ],
    domicilios:
    [
        {idDomicilio:0,calle:"asss",numero:"123",piso:"1",depto:"1",latitud:"11",longitud:"11",localidad:{idLocalidad:1,nombreLocalidad:""}}
    ],
    links:
    [
        {idLink:0,urlLink:"",tipoLink:{idTipoLink:1,nombreTipoLink:""}}
    ]
}))
                .then((response)=>{

                alert(response.data.message);

                });

  function onSignIn(googleUser) {
    // Useful data for your client-side scripts:
    var profile = googleUser.getBasicProfile();
    console.log("ID: " + profile.getId()); // Don't send this directly to your server!
    console.log('Full Name: ' + profile.getName());
    console.log('Given Name: ' + profile.getGivenName());
    console.log('Family Name: ' + profile.getFamilyName());
    console.log("Image URL: " + profile.getImageUrl());
    console.log("Email: " + profile.getEmail());

    // The ID token you need to pass to your backend:
    var id_token = googleUser.getAuthResponse().id_token;
    console.log("ID Token: " + id_token);
  }
</script>

@endsection
