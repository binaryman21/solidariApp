
<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>@yield('title', 'SolidariAPP')</title>
    @yield("meta")

    <!-- Bootstrap CSS -->
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" integrity="sha384-JcKb8q3iqJ61gNV9KGb8thSsNjpSL0n8PARn9HuZOnIxN0hoP+VmmDGMN5t9UJ0Z" crossorigin="anonymous">
    <!-- CSS Propio -->
    <link rel="stylesheet" href="{{URL::asset('assets/css/style.css')}}">
    <!-- Font Awesome -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.1/css/all.min.css">
</head>
<body>
    <nav class="navbar navbar-expand-lg navbar-light bg-light shadow-sm mb-md-4 bg-white px-5">
        <a class="navbar-brand" href="{{url('/')}}">SolidariAPP</a>
        <button class="navbar-toggler collapsed" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="navbar-collapse collapse" id="navbarSupportedContent">
          <ul class="navbar-nav ml-auto px-5">
            <li class="nav-item px-3" id="navInicio">
              <a class="nav-link" href="{{url('/')}}">Inicio</a>
            </li>
            <li class="nav-item px-3" id="navContacto">
              <a class="nav-link" href="{{url('/contacto')}}">Contacto</a>
            </li>
            <li class="nav-item px-3" id="navAcerca">
              <a class="nav-link" href="{{url('/acerca')}}">Acerca de</a>
            </li>


          <button class="btn btn-outline-primary my-2 my-sm-0 px-5" data-toggle="modal" data-target="#modalLogin"  id = "btnIngresar">Ingresar</button>

          <li class="nav-item dropdown oculto" id = "dropDownUsuario">
            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <img id = "imgPerfil" src="" alt="" class = "rounded-circle" width = "32px">
            </a>
            <div class="dropdown-menu" aria-labelledby="navbarDropdown">
              <a id = "btnVerMiPerfil" class="dropdown-item" href="">Mi perfil</a>
              <div class="dropdown-divider"></div>
              <a id = "btnCerrarSesion" class="dropdown-item" href="#">Salir</a>
            </div>
          </li>
        </ul>

        </div>
    </nav>
    @yield("contenido")


    <footer class="p-3 text-center bg-dark text-white mt-4">
      <p>SolidariAPP&copy; - 2020</p>
    </footer>
    <!-- JS -->
    <script type="text/javascript" src="{{URL::asset('assets/js/master.js')}}"></script>
    <!-- JQuery -->
    <script src="https://code.jquery.com/jquery-3.5.1.js" integrity="sha256-QWo7LDvxbWT2tbbQ97B53yJnYU3WhH/C8ycbRAkjPDc=" crossorigin="anonymous"></script>    <!-- Bootstrap JS -->
    <!-- Bootstrap JS -->
    <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.1/dist/umd/popper.min.js" integrity="sha384-9/reFTGAW83EW2RDu2S0VKaIzap3H66lZH81PoYlFhbGU+6BZp6G7niu735Sk7lN" crossorigin="anonymous"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js" integrity="sha384-B4gt1jrGC7Jh4AgTPSdUtOBvfO8shuf57BaghqFfPlYxofvL8/KUEfYiJOMMV+rV" crossorigin="anonymous"></script>
    <script src="https://unpkg.com/axios/dist/axios.min.js"></script>
    <!-- Google JS-->
    <script src="https://apis.google.com/js/platform.js" async defer></script>
    <script type="text/javascript" src="{{URL::asset('assets/js/google.js')}}"></script>
    @yield('scripts')
</body>
</html>
