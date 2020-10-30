@extends("layouts.master")
@section('title', 'Contacto')
@section("meta")
@parent
<!-- Google -->
<meta name="google-signin-scope" content="profile email">
<meta name="google-signin-client_id" content="417738312803-p5r2efabrok2v72si97hoe2r0ctvrsg0.apps.googleusercontent.com">
<!-- Leaflet CSS -->
<link rel="stylesheet" href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css" integrity="sha512-xodZBNTC5n17Xt2atTPuE1HxjVMSvLVW9ocqUKLsCC5CXdbqCmblAshOMAS6/keqq/sMZMZ19scR4PsZChSR7A==" crossorigin="" />
@endsection
@section("contenido")
<div class="container-fluid px-sm-3 px-lg-5">
    <div class="row bg-white rounded justify-content-lg-center">
        <div class="col-xs-4 col-sm-4 col-lg-4 p-4 p-md-4">

        <form>
  <div class="form-group">
    <label for="txtNombre">Nombre</label> 
    <input id="txtNombre" name="txtNombre" placeholder="Ingresa tu nombre" type="text" required="required" class="form-control">
  </div>
  <div class="form-group">
    <label for="txtMail">Mail</label> 
    <input id="txtMail" name="txtMail" placeholder="Ingresa tu mail" type="text" required="required" class="form-control">
  </div>
  <div class="form-group">
    <label for="selectMotivo">Motivo</label> 
    <div>
      <select id="selectMotivo" name="selectMotivo" aria-describedby="selectMotivoHelpBlock" required="required" class="custom-select">
        <option value="1">Problemas con mi usuario</option>
        <option value="2">Problemas con la pagina</option>
        <option value="3">Consulta General</option>
        <option value="0">Otro</option>
      </select> 
      <span id="selectMotivoHelpBlock" class="form-text text-muted">Indicanos tu motivo de contacto.</span>
    </div>
  </div>
  <div class="form-group">
    <label for="txtDetalle">Detalle</label> 
    <textarea id="txtDetalle" name="txtDetalle" cols="40" rows="5" required="required" class="form-control"></textarea>
  </div> 
  <div class="form-group">
    <button name="submit" type="submit" class="btn btn-primary">Enviar</button>
  </div>
</form>



        </div>
    </div>
</div>

@endsection

@section('scripts')
@parent

<!-- Leaflet JS -->
<script src="https://unpkg.com/leaflet@1.7.1/dist/leaflet.js" integrity="sha512-XQoYMqMTK8LvdxXYG3nZ448hOEQiglfqkJs1NOQV44cWnUrBc8PkAOcXy20w0vlaXaVUearIOBhiXZ5V3ynxwA==" crossorigin=""></script>

<!-- JS -->
<script type="text/javascript" src="{{URL::asset('assets/js/logueo.js')}}"></script>
<script src="https://unpkg.com/axios/dist/axios.min.js"></script>
<!-- Validaciones -->

<!-- Utilidades -->
<script type="text/javascript" src="{{URL::asset('assets/js/utilidades.js')}}"></script>




@endsection