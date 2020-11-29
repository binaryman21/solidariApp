<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Usuario;
use App\Models\Necesidad;
use App\Models\Colaboracion;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Redirect;

class UsuarioController extends Controller
{
    public function login(Request $request){
        $datosLogin = json_decode($request->getContent());
        //VALIDACIONES
        //primero fijate el ID DE GOOGLE
        // if($datosLogin->pass == ''){
        //     return response()->json([
        //         'resultado' => 0,
        //         'message' => 'introduzca un password'
        //     ]);
        // }
        if(  !filter_var($datosLogin->email, FILTER_VALIDATE_EMAIL) ){
            return response()->json([
                'resultado' => 0,
                'message' => 'ingrese un email valido'
            ]);
        }
        else{
            $datosLogin->pass = hash( 'sha256',  $datosLogin->pass );
            $usuario = Usuario::login($datosLogin);
            if($usuario != null){
                session_start();
                $_SESSION['usuario'] = $usuario;
            }
            return response()->json([
                'resultado' => 1,
                'usuario' => $usuario
            ]);
        }
    }

    public function isUser(Request $request){
        $datos = json_decode($request->getContent());
       
        return response()->json([
            'resultado' => 1,
            'isUser' => Usuario::isUser($datos->email)
        ]);
    }

    public function isLoggedIn(){
        session_start();
        if(isset($_SESSION['usuario'])){
            return response()->json([
                'usuario' => $_SESSION['usuario']
            ]);
        }
        else{
            return response()->json([
                'usuario' =>  null
            ]);

        }
    }

    public function logOut(){
        session_start();
        unset($_SESSION['usuario']);
    }


    /*Dar de baja al usuario logeado*/
    public function bajaUsuario()
    {
        try
        {
            session_start();
            if(isset($_SESSION['usuario'])){
                if(UsuarioController::tienePermisoPara("darseDeBaja"))
                {
                    /*Busco el ID del usuario logeado*/
                    $usuarioLogueado = $_SESSION['usuario'];
                    DB::beginTransaction();
                    Usuario::bajaUser($usuarioLogueado->idUsuario);
                    if( $usuarioLogueado->rol->idRol == 2 ){
                        Necesidad::completarNecesidades( $usuarioLogueado->idUsuario );
                    }
                    else if( $usuarioLogueado->rol->idRol == 1 ){
                        Colaboracion::noConcretarColaboraciones( $usuarioLogueado->idUsuario );
                    }
                    DB::commit();
                    unset($_SESSION['usuario']);
                    // redirect()->route('UIPrincipal');
                    return response()->json([
                        'resultado' => 1,
                        'message' => 'ejecucion exitosa'
                    ]);
                }
                else{
                    return response()->json([
                        'resultado' => 0,
                        'message' => 'No tiene permisos para realizar esta accion'
                    ]);
                }
            }
            else{
                return response()->json([
                    'resultado' => 0,
                    'message' => 'No estas logueado'
                ]);
            }
        }
        catch (\Exception $e)
        {
            return response()->json([
                'resultado' => 0,
                'message' => $e->getMessage()
            ]);
        }
    }

    /*Actualizar foto de perfil del usuario logeado*/
    public function updateFotoPerfil()
    {
        try{
            session_start();
            if(isset($_SESSION['usuario'])){
                /*Busco el ID del usuario logeado*/
                $usuario = $_SESSION['usuario'];
                /*me traigo los archivos que recibo al realizar el submit*/
                if ($_FILES['fotoPerfil']['error'] == 0) {
                    $fileName = $_FILES['fotoPerfil']['name'];
                    $ubicacionActual = $_FILES['fotoPerfil']['tmp_name'];
                    /*Concateno el ID usuario al nombre del archivo*/
                    // $urlFotoPerfil = storage_path()."/app/public/fotosPerfil/".$usuario->idUsuario.$fileName ;
                    $urlFotoPerfil = public_path()."/fotosPerfil/".$usuario->idUsuario.$fileName ;
                    $urlFotoPerfil2 = $urlFotoPerfil;
                    move_uploaded_file($ubicacionActual, $urlFotoPerfil);
                }
        
                /*Preparo la url relativa para guardarla en la BDD*/
                $urlFotoPerfil = "../fotosPerfil/".$usuario->idUsuario.$fileName ;
                Usuario::updateFotoPerfil($usuario->idUsuario,$urlFotoPerfil);
                $_SESSION['usuario']->urlFotoPerfilUsuario = $urlFotoPerfil;
                return response()->json([
                    'resultado' => 1,
                    'message' => 'Foto actualizada',
                    'imgUrlTemp' => $urlFotoPerfil2
                ]);
            }
            else{
                return response()->json([
                    'resultado' => 0,
                    'message' => 'no estas logueado'
                ]);
            }
        }
        catch (\Exception $e)
        {
            return response()->json([
                'resultado' => 0,
                'message' => $e->getMessage()
            ]);
        }
    }

    public function registrarUsuario(Request $request)
    {
        try
        {
            $datosUsuario = json_decode($request->getContent());

            if( !filter_var($datosUsuario->emailUsuario, FILTER_VALIDATE_EMAIL) ){
                return response()->json([
                    'resultado' => 0,
                    'message' => 'ingrese un email valido'
                ]);
            }
            else if( $datosUsuario->claveUsuario == '' ){
                return response()->json([
                    'resultado' => 0,
                    'message' => 'ingrese una clave'
                ]);
            }
            else if( strlen($datosUsuario->claveUsuario) < 8){
                return response()->json([
                    'resultado' => 0,
                    'message' => 'la clave debe tener al menos 8 caracteres'
                ]);
            }
            else{
                $usuario = new Usuario;
    
                $usuario->claveUsuario = hash( 'sha256', $datosUsuario->claveUsuario );
                $usuario->emailUsuario = $datosUsuario->emailUsuario;
                $usuario->tokenGoogle = $datosUsuario->tokenGoogle;
                $usuario->urlFotoPerfilUsuario = $datosUsuario->urlFotoPerfilUsuario;
                $usuario->idRolUsuario = $datosUsuario->idRolUsuario;
                $usuario->idEstadoUsuario = 1;
                $usuario->save();
    
                return response()->json([
                    'resultado' => 1,
                    'message' => "Registro exitoso"
                ]);
            }

        }
        catch (\Exception $e)
        {
            return response()->json([
                'resultado' => 0,
                'message' => $e->getMessage()
            ]);
        }

    }

    public function cambiarClave( Request $request ){
        session_start();
        if(isset($_SESSION['usuario']))
        {
            if(UsuarioController::tienePermisoPara("cambiarPass"))
            {
                try
                {
                    $datosClaves = json_decode($request->getContent());
                    if( $datosClaves->claveVieja == '' ){
                        return response()->json([
                            'resultado' => 0,
                            'message' => 'ingrese su primer clave'
                        ]);
                    }
                    else if( strlen($datosClaves->claveVieja) < 8){
                        return response()->json([
                            'resultado' => 0,
                            'message' => 'la clave debe tener al menos 8 caracteres'
                        ]);
                    }
                    else if( $datosClaves->claveNueva == '' ){
                        return response()->json([
                            'resultado' => 0,
                            'message' => 'ingrese su nueva clave'
                        ]);
                    }
                    else if( strlen($datosClaves->claveNueva) < 8){
                        return response()->json([
                            'resultado' => 0,
                            'message' => 'la clave nueva debe tener al menos 8 caracteres'
                        ]);
                    }
                    else{
                        $datosClaves->idUsuario = $_SESSION['usuario']->idUsuario;
                        $datosClaves->claveVieja = hash( 'sha256', $datosClaves->claveVieja );
                        $datosClaves->claveNueva = hash( 'sha256', $datosClaves->claveNueva );
                        $user = Usuario::comprobarClave( $datosClaves );
                        if ( $user ){
                            Usuario::cambiarClave( $datosClaves );
                            return response()->json([
                                'resultado' => 1,
                                'message' => "cambio de clave exitoso!"
                            ]);
                        }
                        else{
                            return response()->json([
                                'resultado' => 0,
                                'message' => "clave incorrecta"
                            ]);
                        }
                    }
                }
                catch (\Exception $e)
                {
                    return response()->json([
                        'resultado' => 0,
                        'message' => $e->getMessage()
                    ]);
                }   
            }
            else{
                return response()->json([
                    'resultado' => 0,
                    'message' => 'No tiene permisos para realizar esta accion'
                ]);
            }
        }
        else{
            return response()->json([
                'resultado' => 0,
                'message' => "no estas logueado"
            ]);
        }
    }

    public static function tienePermisoPara($pStringPermiso)
    {
        if (session_status() == PHP_SESSION_NONE)
        {
            session_start();
        }
        if(isset($_SESSION['usuario']))
        {
            $usuario = $_SESSION['usuario'];
            $rolUsuario = $usuario->rol;
            $permisos = $rolUsuario->permisos;
            foreach ($permisos as $permiso)
            {
                if($permiso->nombrePermiso === $pStringPermiso)
                {
                    return true;
                }
            }
            return false;
        }
        else
        {
            return false;
        }
    }

    public static function ExisteUsuario($id){

        if( Usuario::EsUsuario($id) )
            return true;
        else
            return false;
    }
}
