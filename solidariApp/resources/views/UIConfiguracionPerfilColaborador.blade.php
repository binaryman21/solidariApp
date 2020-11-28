@extends("layouts.master")

@section("contenido")
@parent
<!-- container -->
<div class="container-sm perfil bg-white p-2 px-lg-4">
    <div class="row mb-4">
        <!-- Administracion de datos basicos -->
        <div class="col">
            <h5 class="">Administracion de datos basicos</h5>
            
        </div>
    </div>
    <div class="row mb-4">
        <!-- Administracion de contacto -->
        <div class="col">
            <h5 class="">Administracion de contacto</h5>
        </div>
    </div>
    <div class="row mb-4">
        <!-- Administracion de la seguridad -->
        <div class="col">
            <h5 class="">Administracion de la seguridad</h5>
        </div>
    </div>
    <div class="row mb-4">
        <!-- Administracion de la cuenta -->
        <div class="col">
            <h5 class="">Administracion de la cuenta</h5>
        </div>
    </div>
</div>
@endsection

@section('scripts')
    @parent
    <script type="text/javascript" src="{{URL::asset('assets/js/utilidades.js')}}"></script>
    <script type="text/javascript" src="{{URL::asset('assets/js/ajustesColaborador.js')}}"></script>
@endsection
