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
@endsection
