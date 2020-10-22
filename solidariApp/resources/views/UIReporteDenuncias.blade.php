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

    <div class="container-fluid px-sm-3 px-lg-5">
        <div class="row bg-white rounded justify-content-lg-center">
            <div class="col-12 p-0 p-md-2">
                <div class="flex-md-row input-group">
                    <input class="form-control my-2 rounded" type="text">
                    <div class="input-group-append">
                        <div class="dropdown">
                            <button class="btn btn-secondary dropdown-toggle my-2 rounded m-2" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                              Filtrar
                            </button>
                            <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                              <a class="dropdown-item" href="#">Fecha</a>
                              <a class="dropdown-item" href="#">Motivo</a>
                              <a class="dropdown-item" href="#">Codigo de reporte</a>
                              <a class="dropdown-item" href="#">Organización</a>
                              <a class="dropdown-item" href="#">Colaborador</a>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="" class="overflow-auto px-lg-2 pb-2 h-75">
                    <div class="card" name="cardReporte" id="cardReporte">
                        <div class="card-body justify-content-between d-flex flex-wrap ">
                            <div class="m-2" id="fechaReporte">dd/mm/aaaa</div>
                            <div class="m-2" id="motivoReporte">Motivo:</div>
                            <div class="m-2" id="codigoReporte">codigo:</div>
                            <div class="m-2" id="denuncianteReporte">Denunciante:</div>
                            <div class="m-2" id="denunciadoReporte">Denunciado:</div>
                            <a  data-toggle="modal" href="#modalVisualizarDenuncia" class="btn btn-primary mx-2">Ver</a>
                        </div>
                    </div>
                    <div class="card" name="cardReporte" id="cardReporte">
                        <div class="card-body -flex justify-content-between d-flex flex-wrap ">
                            <div class="m-2" id="fechaReporte">dd/mm/aaaa</div>
                            <div class="m-2" id="motivoReporte">Motivo:</div>
                            <div class="m-2" id="codigoReporte">codigo:</div>
                            <div class="m-2" id="denuncianteReporte">Denunciante:</div>
                            <div class="m-2" id="denunciadoReporte">Denunciado:</div>
                            <a  data-toggle="modal" href="#modalVisualizarDenuncia" class="btn btn-primary mx-2">Ver</a>
                        </div>
                    </div>
                    <div class="card" name="cardReporte" id="cardReporte">
                        <div class="card-body -flex justify-content-between d-flex flex-wrap ">
                            <div class="m-2" id="fechaReporte">dd/mm/aaaa</div>
                            <div class="m-2" id="motivoReporte">Motivo:</div>
                            <div class="m-2" id="codigoReporte">codigo:</div>
                            <div class="m-2" id="denuncianteReporte">Denunciante:</div>
                            <div class="m-2" id="denunciadoReporte">Denunciado:</div>
                            <a  data-toggle="modal" href="#modalVisualizarDenuncia" class="btn btn-primary mx-2">Ver</a>
                        </div>
                    </div>

                </div>
            </div>

        </div>
    </div>
</div>
@include("UIVisualizarDenuncia")
@endsection
