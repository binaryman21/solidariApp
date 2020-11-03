<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Usuario;

class UsuarioController extends Controller
{
    public function login(Request $request){
        $datosLogin = json_decode($request->getContent());
        $usuario = Usuario::login($datosLogin);
        session_start();
        $_SESSION['usuario'] = $usuario[0];
        return response()->json([
            'usuario' => $usuario[0]
            ]);
    }

    public function isUser(Request $request){
        $datos = json_decode($request->getContent());
        return response()->json([
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
                /*Busco el ID del usuario logeado*/
                $usuarioLogoeado = $_SESSION['usuario'];
                Usuario::bajaUser($usuarioLogoeado->idUsuario);
                  
            }

            return response()->json([
                'resultado' => 1,
                'message' => 'ejecucion exitosa'
            ]);
        }
        catch (\Exception $e)
        {
            return response()->json([
                'resultado' => 0,
                'message' => $e->getMessage()
            ]);
        }

    }

      
    /*Dar de baja al usuario logeado*/
    public function updateFotoPerfil($urlFotoPerfil)    
    {
        
        try
        {
            session_start();
            if(isset($_SESSION['usuario'])){
                /*Busco el ID del usuario logeado*/
                $usuarioLogoeado = $_SESSION['usuario'];
                Usuario::updateFotoPerfil($usuarioLogoeado->idUsuario,$urlFotoPerfil);
                  
            }

            return response()->json([
                'resultado' => 1,
                'message' => 'ejecucion exitosa'
            ]);
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

                $usuario = new Usuario;

                $usuario->claveUsuario = $datosUsuario->claveUsuario;
                $usuario->emailUsuario = $datosUsuario->emailUsuario;
                $usuario->tokenGoogle = $datosUsuario->tokenGoogle;
                $usuario->urlFotoPerfilUsuario = $datosUsuario->urlFotoPerfilUsuario;
                $usuario->idRolUsuario = $datosUsuario->idRolUsuario;
                $usuario->idEstadoUsuario = 1;
                $usuario->save();

            return response()->json([
                'message' => "Registro exitoso"

            ]);
        }
            catch (\Exception $e)
            {
                return response()->json([
                    'message' => $e->getMessage()
                ]);
            }

        }
}
