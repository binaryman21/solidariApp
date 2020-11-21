@extends("layouts.master")
@section('title', 'SolidariAPP - Reportes de Denuncias')
@section("meta")
@endsection
@section("contenido")
<div class="container p-2">
    <div class="jumbotron">
        <div class="row align-middle">
            <div class="col-md-2">
                <img class="rounded-circle imgPerfilCol" src="{{URL::asset('assets/img/app-logo/Logo - Medio.png')}}" alt="imagen de usuario">
            </div>
            <div class="col-md-10 align-self-center">
                <p class="lead">
                    Administrador
                </p>
            </div>
        </div>
    </div>
    <div><a href="{{url('/administrador')}}" class="text-secondary">Menú Administrador</a></div>
    <h4>Reportes de Denuncias</h4>

    <div class="container-fluid px-sm-3 px-lg-5 h-100">
        <div class="row bg-white rounded justify-content-lg-center">
            <div class="col-12 p-0 p-md-2">
                <div id="listaDenuncias" class="overflow-auto px-lg-2 pb-2 h-100">

                </div>
            </div>
        </div>
    </div>
</div>
@include("UIVisualizarDenuncia")
@endsection

@section('scripts')
<!-- Scripts -->
<script type="text/javascript" src="{{URL::asset('assets/js/administrador.js')}}"></script>
<script type="text/javascript" src="{{URL::asset('assets/js/logueo.js')}}"></script>
<script type="text/javascript" src="{{URL::asset('assets/js/denuncia.js')}}"></script>
@endsection
