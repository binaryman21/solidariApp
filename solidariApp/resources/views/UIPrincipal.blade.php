@extends("plantilla")

@section("meta")

<meta name="google-signin-scope" content="profile email">
<meta name="google-signin-client_id" content="417738312803-p5r2efabrok2v72si97hoe2r0ctvrsg0.apps.googleusercontent.com">

@endsection

@section("contenido")

<div class = "container">

    <div class = "row">
        <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-xs-12 p-2">
          <input class = "form-control" type="text">
          <div class = "shadow mt-2" style = "height: 500px;width: 100%;">
ssdf
          </div>
        </div>
        <div class="col-xl-9 col-lg-9 col-md-9 col-sm-12 col-xs-12">
          <h4>Mapa de las organizaciones</h4>
            <div class="row p-2"  style = "height:400px;">
              <div class = "d-flex flex-column rounded  p-2" style = "background-color:rgb(148, 148, 148);width:100%;height:100%;">

              </div>
            </div>
            <div class="row p-2">
                <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12 rounded p-2" >
                  <div class = "d-flex flex-column rounded p-4" style = "background-color:#C3E4DF;width:100%;height:100%;">
                    <h5>¿Quieres ayudar?</h5>
                    <p>Al registrarte como colaborador podrás ayudar a una organización con diferentes recursos</p>
                    <button class = "btn btn-light" data-toggle="modal" data-target="#exampleModal">Registrarme como colaborador</button>
                  </div>

                </div>
                <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12 p-2">
                    <div class = "d-flex flex-column rounded  p-4" style = "background-color:#B4CAE2;width:100%;height:100%;">
                      <h5>¿Necesitas ayuda?</h5>
                      <p>Al registrarte como organización serás visible en el mapa del sitio y los colaboradores podrán ayudarte con recursos que necesites</p>
                      <button class = "btn btn-light" data-toggle="modal" data-target="#exampleModal">Registrarme como organizacion</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

@include("UIPrincipalRegistroGoogle")

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
