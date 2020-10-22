@extends("layouts.master")
@section('title', 'SolidariAPP - Menu Administrador')
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

    <div class="row">
        <div class="col-md-12">
            <h4>Menu del Administrador</h4>
            <div class="menuDelAdministrador">
                <div class="row">
                    <div class="col-sm-6">
                        <div class="card">
                            <div class="card-body">
                                <h5 class="card-title">ABM Categorias</h5>
                                <p class="card-text">Permite realizar el Alta, Baja y Modificacion de Categorias de las Necesidades.</p>
                                <br>
                                <a data-toggle="modal" href="#modalABMCategorias" class="btn btn-primary">ABM Categorias</a>
                            </div>
                        </div>
                    </div>
                    <div class="col-sm-6">
                        <div class="card">
                            <div class="card-body">
                                <h5 class="card-title">Visualizar reporte de denuncias</h5>
                                <p class="card-text">Permite Visualizar todos los reportes con posibilidad de confirmarlos.</p>
                                <br>
                                <a href="{{url('administrador/reportes')}}" class="btn btn-primary">Ver Reporte</a>
                            </div>
                        </div>
                    </div>
                    <div class="col-sm-6">
                        <div class="card">
                            <div class="card-body">
                                <h5 class="card-title">Special title treatment</h5>
                                <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
                                <br>
                                <a href="#" class="btn btn-primary">Go somewhere</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

@include("UIPerfilAdministradorABMCategorias")
{{-- @include("UIReporteDenuncias") --}}
@endsection

@section('scripts')
@parent
<!-- JS -->
<script type="text/javascript" src="{{URL::asset('assets/js/administrador.js')}}"></script>
@endsection
