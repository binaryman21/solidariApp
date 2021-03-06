
<!DOCTYPE html>
<html dir="lrt" lang="{{str_replace('_', '-', app()->getLocale())}}" class="h-100">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <title>@yield('title', 'SolidariAPP')</title>
    @yield("meta")
    <link rel="icon" type="image/png" href="{{URL::asset('assets/img/app-logo/Logo - Chico.png')}}">
    <!-- Google -->
    <meta name="google-signin-scope" content="profile email">
    <meta name="google-signin-client_id" content="417738312803-p5r2efabrok2v72si97hoe2r0ctvrsg0.apps.googleusercontent.com">
    <!-- Bootstrap CSS -->
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" integrity="sha384-JcKb8q3iqJ61gNV9KGb8thSsNjpSL0n8PARn9HuZOnIxN0hoP+VmmDGMN5t9UJ0Z" crossorigin="anonymous">
    <!-- CSS Propio -->
    <link rel="stylesheet" href="{{URL::asset('assets/css/style.css')}}">
    <!-- Font Awesome -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.1/css/all.min.css">
    <!-- Alertify -->
    <!-- CSS -->
    <link rel="stylesheet" href="//cdn.jsdelivr.net/npm/alertifyjs@1.13.1/build/css/alertify.min.css"/>
    <!-- Default theme -->
    <link rel="stylesheet" href="//cdn.jsdelivr.net/npm/alertifyjs@1.13.1/build/css/themes/default.min.css"/>
    <!-- Bootstrap theme -->
    <link rel="stylesheet" href="//cdn.jsdelivr.net/npm/alertifyjs@1.13.1/build/css/themes/bootstrap.min.css"/>
    <!-- RTL version-->
    <link rel="stylesheet" href="//cdn.jsdelivr.net/npm/alertifyjs@1.13.1/build/css/alertify.rtl.min.css"/>
    <!-- Default theme -->
    <link rel="stylesheet" href="//cdn.jsdelivr.net/npm/alertifyjs@1.13.1/build/css/themes/default.rtl.min.css"/>
    <!-- Bootstrap theme -->
    <link rel="stylesheet" href="//cdn.jsdelivr.net/npm/alertifyjs@1.13.1/build/css/themes/bootstrap.rtl.min.css"/>
</head>
<body class="d-flex flex-column h-100">
    <header>
        <nav class="navbar navbar-expand-lg navbar-light bg-light shadow-sm mb-md-3 bg-white pl-lg-5">
            <a class="navbar-brand" href="{{url('/')}}"><span class="mr-2"><img src="{{URL::asset('assets/img/app-logo/Logo - Chico.png')}}" alt="logo"></span>SolidariAPP</a>

            <button class="navbar-toggler ml-auto border-0 collapsed" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <i class="fas fa-bars fa-sm"></i>
            </button>

            <div class="navbar-collapse collapse" id="navbarSupportedContent">
                <ul class="navbar-nav ml-auto pr-3 align-items-center">
                    <li class="nav-item px-3" id="navInicio">
                        <a class="nav-link" href="{{url('/')}}">Inicio</a>
                    </li>
                    <!-- <li class="nav-item px-3" id="navContacto">
                        <a class="nav-link" href="{{url('/contacto')}}">Contacto</a>
                    </li>
                    <li class="nav-item px-3" id="navAcerca">
                        <a class="nav-link" href="{{url('/acerca')}}">Acerca de</a>
                    </li> -->

                    <button class="btn btn-outline-primary my-2 my-sm-0 px-5" data-toggle="modal" data-target="#modalLogin"  id = "btnIngresar">Ingresar</button>
                    <li class="nav-item dropdown oculto" id = "dropDownUsuario">
                        <a class="nav-link" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <img id = "imgPerfil" src="" alt="" class = "rounded-circle" width = "32px">
                        </a>
                        <div class="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
                            <a id = "btnVerMiPerfil" class="dropdown-item" href="">Mi perfil</a>
                            <div class="dropdown-divider"></div>
                            <a id = "btnCerrarSesion" class="dropdown-item" href="#">Salir</a>
                        </div>
                    </li>
                </ul>
            </div>
            <div class="d-none" id="notificaciones">
                <div class="">
                    <a class="btn" type="button" data-toggle="modal"  href="#modalNotificaciones" id="logoNotificacion">
                        <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true" id="spinnerNotif"></span>
                        <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-bell-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                            <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2zm.995-14.901a1 1 0 1 0-1.99 0A5.002 5.002 0 0 0 3 6c0 1.098-.5 6-2 7h14c-1.5-1-2-5.902-2-7 0-2.42-1.72-4.44-4.005-4.901z"/>
                        </svg>
                    </a>
                </div>
            </div>
        </nav>
    </header>
    <main role="main" class="d-flex flex-shrink-0">
        @yield("contenido")
        @include("../UIPerfilModales/UIModalNotificaciones")
        @include("/UIDetalleNecesidad")
        @include("UIPerfilModales/UIModalCalificar")
        @include("UIPerfilModales/UIModalReportar")
        @include("UIPrincipalRegistroGoogle")
    </main>
    <footer class="footer py-3 text-center text-white bg-dark mt-auto">
        <div class="container">
            <p>SolidariAPP© - 2020</p>
        </div>
    </footer>
   
    <!-- JQuery -->
    <script src="https://code.jquery.com/jquery-3.5.1.js" integrity="sha256-QWo7LDvxbWT2tbbQ97B53yJnYU3WhH/C8ycbRAkjPDc=" crossorigin="anonymous"></script>    <!-- Bootstrap JS -->
    <!-- Alertify -->
    <script src="//cdn.jsdelivr.net/npm/alertifyjs@1.13.1/build/alertify.min.js"></script>
    <!-- JS -->
    <script type="text/javascript" src="{{URL::asset('assets/js/logueo.js')}}"></script>
    <script type="text/javascript" src="{{URL::asset('assets/js/master.js')}}"></script>
    <script type="text/javascript" src="{{URL::asset('assets/js/notificacion.js')}}"></script>
     <!-- Utilidades -->
   <script type="text/javascript" src="{{URL::asset('assets/js/usuario.js')}}" defer></script>
   <script type="text/javascript" src="{{URL::asset('assets/js/utilidades.js')}}" defer></script>
   <script type="text/javascript" src="{{URL::asset('assets/js/colaboracion.js')}}" defer></script>
   <script type="text/javascript" src="{{URL::asset('assets/js/calificacion.js')}}" defer></script>
   <script type="text/javascript" src="{{URL::asset('assets/js/validaciones.js')}}"></script>
    <!-- {{-- <script type="text/javascript" src="{{URL::asset('assets/js/UIPrincipal.js')}}"></script> --}} -->
    <!-- Bootstrap JS -->
    <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.1/dist/umd/popper.min.js" integrity="sha384-9/reFTGAW83EW2RDu2S0VKaIzap3H66lZH81PoYlFhbGU+6BZp6G7niu735Sk7lN" crossorigin="anonymous"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js" integrity="sha384-B4gt1jrGC7Jh4AgTPSdUtOBvfO8shuf57BaghqFfPlYxofvL8/KUEfYiJOMMV+rV" crossorigin="anonymous"></script>
    <script src="https://unpkg.com/axios/dist/axios.min.js"></script>
    <!-- Google JS-->
    <script src="https://apis.google.com/js/platform.js" async defer></script>    
    <!-- Memento -->
    <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.29.1/moment.min.js"></script>
    <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.29.1/locale/es.min.js"></script>
    @yield('scripts')
</body>

</html>
