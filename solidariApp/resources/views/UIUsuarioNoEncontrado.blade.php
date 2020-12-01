@extends("layouts.master")

@section("contenido")
@parent
 <!-- container -->
<div class="container-sm perfil bg-white p-2 px-lg-4">
    <div class="card card-user mb-3">
        <div class="card-img-block">
            <img id="cover" src="{{URL::asset('assets/img/cover.svg')}}" class="img-fluid" alt="portada de la organizacion">
        </div>
        <div class="card-body pt-5">
            <div class="media">
                <img id="imgPerfilColaborador" class="shadow-sm rounded-circle imgPerfilOrg align-self-start mr-auto" src="{{URL::asset('assets/img/imgUserProfile.png')}}" alt="imagen de usuario">
            </div>
            <div class="clearfix"></div>
            <h5 class="card-title mt-2 loading ldg-w-sm">Usuario no encontrado</h5>
            <div class="card-text">Este usuario no existe o probablemente no tenga una cuenta activa</div>
        </div>
    </div>
</div>
@endsection

@section('scripts')
    @parent
    <script type="text/javascript" src="{{URL::asset('assets/js/noEncontrado.js')}}"></script>
@endsection