<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Models\Usuario;
use App\Models\Link;
use App\Models\Colaborador;
use App\Models\Domicilio;
use App\Models\RegistroCalificaciones;
use App\Models\Telefono;

class ColaboradorController extends Controller
{
    public function registrarColaborador(Request $request)
    {
        try
        {
            DB::beginTransaction();
            $datosColaborador = json_decode($request->getContent());

            $usuario = new Usuario;
            $colaborador = new Colaborador;

             //VALIDACIÓN NOMBRE
             if( $datosColaborador->nombreColaborador === ''){
                return response()->json([
                    'resultado' => 0,
                    'message' => "Ingrese un nombre"
                ]);
            }
            $regEx = '/[A-Za-zÁÉÍÓÚñáéíóúÑ\s]/';
            if(!preg_match($regEx, $datosColaborador->nombreColaborador)){
                return response()->json([
                    'resultado' => 0,
                    'message' => "Ingrese un nombre valido"
                ]);
            }
            if(strlen($datosColaborador->nombreColaborador) < 3){
                return response()->json([
                    'resultado' => 0,
                    'message' => "Ingrese un nombre con longitud mayor a 2 caracteres"
                ]);
            }

            if(strlen($datosColaborador->nombreColaborador) > 30){
                return response()->json([
                    'resultado' => 0,
                    'message' => "Ingrese un nombre con longitud menor a 30 caracteres"
                ]);
            }

            //VALIDACIÓN APELLIDO
            if( $datosColaborador->apellidoColaborador === ''){
            return response()->json([
                'resultado' => 0,
                'message' => "Ingrese un apellido"
            ]);
            }
            $regEx = '/[A-Za-zÁÉÍÓÚñáéíóúÑ\s]/';
            if(!preg_match($regEx, $datosColaborador->apellidoColaborador)){
                return response()->json([
                    'resultado' => 0,
                    'message' => "Ingrese un apellido valido"
                ]);
            }
            if(strlen($datosColaborador->apellidoColaborador) < 3){
                return response()->json([
                    'resultado' => 0,
                    'message' => "Ingrese un apellido con longitud mayor a 2 caracteres"
                ]);
            }

            if(strlen($datosColaborador->apellidoColaborador) > 30){
                return response()->json([
                    'resultado' => 0,
                    'message' => "Ingrese un apellido con longitud menor a 30 caracteres"
                ]);
            }

            //VALIDACIÓN EMAIL
            if(!filter_var( $datosColaborador->emailUsuario, FILTER_VALIDATE_EMAIL)){
                return response()->json([
                    'resultado' => 0,
                    'message' => "Ingrese un email válido"
                ]);
            };

            if(strlen( $datosColaborador->emailUsuario) > 120){
                return response()->json([
                    'resultado' => 0,
                    'message' => "Ingrese un email con longitud menor a 120 caracteres"
                ]);
            }

            //VALIDAR CLAVE DE USUARIO
            if($datosColaborador->claveUsuario === ''){
                return response()->json([
                    'resultado' => 0,
                    'message' => "La longitud de la contraseña debe ser mayor a 7 caracteres"
                ]);
            }
            if(!preg_match("/[a-z]/", $datosColaborador->claveUsuario) || !preg_match("/[A-Z]/", $datosColaborador->claveUsuario) || !preg_match("/[0-9]/", $datosColaborador->claveUsuario) || !preg_match("/[^a-zA-Z\d]/", $datosColaborador->claveUsuario)){
                return response()->json([
                    'resultado' => 0,
                    'message' => "La contraseña debe tener al menos una mayuscula, una minuscula, un numero y un caracter especial"
                ]);
            };
            if(strlen($datosColaborador->claveUsuario) < 8){
                return response()->json([
                    'resultado' => 0,
                    'message' => "La longitud de la contraseña debe ser mayor a 7 caracteres"
                ]);
            }



            $usuario->claveUsuario = hash( 'sha256', $datosColaborador->claveUsuario );
            $usuario->emailUsuario = $datosColaborador->emailUsuario;
            $usuario->tokenGoogle = $datosColaborador->tokenGoogle;
            if($datosColaborador->urlFotoPerfilUsuario != ""){
                $usuario->urlFotoPerfilUsuario = $datosColaborador->urlFotoPerfilUsuario;
            }

            $usuario->idRolUsuario = 1;
            $usuario->idEstadoUsuario = 1;
            $usuario->save();
            $colaborador->idUsuario = $usuario->idUsuario;
            $colaborador->nombreColaborador = $datosColaborador->nombreColaborador;
            $colaborador->apellidoColaborador = $datosColaborador->apellidoColaborador;
            $colaborador->save();
            $telefonos = $datosColaborador->telefonos;
            foreach ($telefonos as $telefonoActual)
            {
                 //VALIDACIÓN CÓDIGO DE ÁREA
                 if( $telefonoActual->codAreaTelefono === ''){
                    return response()->json([
                        'resultado' => 0,
                        'message' => "Ingrese un código de área"
                    ]);
                }
                if(!preg_match("/^[0-9]+$/",$telefonoActual->codAreaTelefono )){
                    return response()->json([
                        'resultado' => 0,
                        'message' => "Ingrese un código de área válido"
                    ]);
                }
                if( strlen($telefonoActual->codAreaTelefono) > 4){
                    return response()->json([
                        'resultado' => 0,
                        'message' => "Ingrese un código de área con longitud menor a 4 dígitos"
                    ]);
                }
                if( strlen($telefonoActual->codAreaTelefono) < 2){
                    return response()->json([
                        'resultado' => 0,
                        'message' => "Ingrese un código de área con longitud mayor a 2 dígitos"
                    ]);
                }

                //VALIDACIÓN NÚMERO DE TELÉFONO
                if( $telefonoActual->numeroTelefono === ''){
                    return response()->json([
                        'resultado' => 0,
                        'message' => "Ingrese un número de teléfono"
                    ]);
                }
                if(!preg_match("/^[0-9]+$/",$telefonoActual->numeroTelefono )){
                    return response()->json([
                        'resultado' => 0,
                        'message' => "Ingrese un número de teléfono válido"
                    ]);
                }
                if(strlen($telefonoActual->numeroTelefono) < 8 ){
                    return response()->json([
                        'resultado' => 0,
                        'message' => "Ingrese un número de teléfono con longitud mayor a 8 caracteres"
                    ]);
                }
                if(strlen($telefonoActual->numeroTelefono) > 10 ){
                    return response()->json([
                        'resultado' => 0,
                        'message' => "Ingrese un número de teléfono con longitud menor a 10 caracteres"
                    ]);
                }

                $telefono = new Telefono;
                $telefono->codAreaTelefono = $telefonoActual->codAreaTelefono;
                $telefono->numeroTelefono = $telefonoActual->numeroTelefono;
                $telefono->esCelular = $telefonoActual->esCelular;
                $telefono->idUsuario = $usuario->idUsuario;
                $telefono->save();
            }
            $domicilios = $datosColaborador->domicilios;
            foreach ($domicilios as $domicilioActual)
            {
                $domicilio = new Domicilio;
                $domicilio->calle = $domicilioActual->calle;
                $domicilio->numero = $domicilioActual->numero;
                $domicilio->piso = $domicilioActual->piso;
                $domicilio->depto = $domicilioActual->depto;
                $domicilio->idLocalidad = $domicilioActual->localidad->idLocalidad;
                $domicilio->latitud = $domicilioActual->latitud;
                $domicilio->longitud= $domicilioActual->longitud;
                $domicilio->idUsuario = $usuario->idUsuario;
                $domicilio->save();
            }
            $links = $datosColaborador->links;

            foreach ($links as $linkActual)
            {
                $link = new Link;
                $link->urlLink = $linkActual->urlLink;
                $link->idTipoLink = $linkActual->tipoLink->idTipoLink;
                $link->idUsuario = $usuario->idUsuario;
                $link->save();
            }

            DB::commit();
        }
        catch (\Exception $e)
        {
            return response()->json([
                'resultado' => 0,
                'message' => $e->getMessage()
            ]);
        }

        return response()->json([
            'resultado' => 1,
            'message' => "registro exitoso!"

        ]);
    }

    public function getColaborador($idUsuario){
        try{
            $colaborador = Colaborador::getColaborador($idUsuario);
            if (session_status() == PHP_SESSION_NONE)
            {
                session_start();
            }
            if( $colaborador  && UsuarioController::tienePermisoPara("verDatosContacto")){
                return response()->json([
                    'resultado' => 1,
                    'colaborador'=> $colaborador,
                    'domicilios' => Domicilio::listarDomiciliosUsuario($idUsuario),
                    'telefonos' => Telefono::listarTelefonosUsuario($idUsuario),
                    'verContacto' => true
                ]);
            }
            else if($colaborador && isset($_SESSION['usuario'])  && $idUsuario == $_SESSION["usuario"]->idUsuario)
            {
                return response()->json([
                    'resultado' => 1,
                    'colaborador'=> $colaborador,
                    'domicilios' => Domicilio::listarDomiciliosUsuario($idUsuario),
                    'telefonos' => Telefono::listarTelefonosUsuario($idUsuario),
                    'verContacto' => true
                ]);  
            }
            else if($colaborador)
            {
                return response()->json([
                    'resultado' => 1,
                    'colaborador'=> $colaborador,
                    'verContacto' => false
                ]);
            }
            else{
                return response()->json([
                    'resultado' => 0,
                    'message'=> 'No se encontro al colaborador',
                    'redireccion'=>'/error404'
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
}
