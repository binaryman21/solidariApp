@extends("layouts.master")
@section("contenido")
@parent
<div class="container">
    <h3 class="text-center">¿Quiénes somos?</h3>
    <p class="text-justify">
        Si tuviéramos que definir <b>SolidariApp</b> en una sola palabra, sin duda la mas adecuada sería ​conectar. La aplicación tiene como objetivo principal ​conectar organizaciones con personas que deseen ayudar ​con diferentes recursos (colaboradores). Gracias a la aplicación las organizaciones pueden generar un listado de cosas que necesitan, y cada colaborador podrá tomar la responsabilidad de subsanar dicha necesidad. ​
    </p>
    <p> 
        <b>SolidariApp</b> nació como parte del proyecto final de carrera, somos un grupo de estudiantes de Desarrollo de Software de la UPE. 
    </p>
    <div class="card-columns">
        <div class="card">
            <div class="card-body">
                <h5 class="card-title bg-light p-3"> <img class="fotoAcercaDe rounded-circle mx-2" src="{{URL::asset('assets/img/fotos/giuliano.jpg')}}" alt="foto"> Giuliano Rizzi</h5>
                <p class="card-text textoCard"> 
                    <span class="mail"> 
                        <i class="far fa-envelope iconoAcercaDe"></i> 
                        giuliano.rizzi08@gmail.com
                    </span>
                    <span class="linkedin">
                        <i class="fab fa-linkedin iconoAcercaDe"> </i>
                        <a href="https://www.linkedin.com/in/giuliano-rizzi-917644176/">Ir al perfil</a> 
                    </span>
                </p>
        </div>
        </div>
        <div class="card">
            <div class="card-body">
                <h5 class="card-title bg-light p-3"> <img class="fotoAcercaDe rounded-circle mx-2" src="{{URL::asset('assets/img/fotos/dario.webp')}}" alt="foto"> Dario Lalanne</h5>
                <p class="card-text textoCard">
                    <span class="mail"> 
                        <i class="far fa-envelope iconoAcercaDe"></i> 
                        binaryman21@gmail.com
                    </span>
                    <span class="linkedin">
                        <i class="fab fa-linkedin iconoAcercaDe"> </i>
                        <a href="https://www.linkedin.com/in/dario-lalanne-8a703b19b/">Ir al perfil</a> 
                    </span>
                </p>
            </div>
        </div>
        <div class="card">
            <div class="card-body">
                <h5 class="card-title bg-light p-3"> <img class="fotoAcercaDe rounded-circle mx-2" src="{{URL::asset('assets/img/fotos/flavio.webp')}}" alt="foto">Flavio Segade</h5>
                <p class="card-text textoCard">
                    <span class="mail"> 
                        <i class="far fa-envelope iconoAcercaDe"></i> 
                        flaviosegade@gmail.com
                    </span>
                    <span class="linkedin">
                        <i class="fab fa-linkedin iconoAcercaDe"> </i>
                        <a href="https://www.linkedin.com/in/flavio-segade-096399192/">Ir al perfil</a> 
                    </span>
                </p>
            </div>
        </div>
        <div class="card">
            <div class="card-body">
                <h5 class="card-title bg-light p-3"> <img class="fotoAcercaDe rounded-circle mx-2" src="{{URL::asset('assets/img/fotos/juan.jpg')}}" alt="foto">Juan Salomon</h5>
                <p class="card-text textoCard">
                    <span class="mail"> 
                        <i class="far fa-envelope iconoAcercaDe"></i> 
                        juan-m.salomon@outlook.com
                    </span>
                    <span class="linkedin">
                        <i class="fab fa-linkedin iconoAcercaDe"> </i>
                        <a href="https://www.linkedin.com/in/juan-salomon/">Ir al perfil</a> 
                    </span>
                </p>
            </div>
        </div>
        <div class="card">
            <div class="card-body">
                <h5 class="card-title bg-light p-3"> <img class="fotoAcercaDe rounded-circle mx-2" src="{{URL::asset('assets/img/fotos/kevin.webp')}}" alt="foto">Kevin Zelada</h5>
                <p class="card-text textoCard">
                    <span class="mail"> 
                        <i class="far fa-envelope iconoAcercaDe"></i> 
                        kevinzelada@gmail.com
                    </span>
                    <span class="linkedin">
                        <i class="fab fa-linkedin iconoAcercaDe"> </i>
                        <a href="https://www.linkedin.com/in/kevin-zelada-80b4a074/">Ir al perfil</a> 
                    </span>
                </p>
            </div>
        </div>
    </div>
</div>
@endsection
@section('scripts')
@parent
<script type="text/javascript" src="{{ URL::asset('assets/js/acercaDe.js') }}"></script>
@endsection