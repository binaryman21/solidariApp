<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Models\Usuario;
use App\Models\Necesidad;
use App\Models\Link;
use App\Models\Organizacion;
use App\Models\Domicilio;
use App\Models\Telefono;
use App\Models\Rol;
class OrganizacionController extends Controller
{
    public function registrarorganizacion(Request $request)
    {

        try
        {
            $datosOrganizacion = json_decode($request->getContent());
            $usuario = new Usuario;

            //VALIDACIONES
            if(Usuario::isUser($usuario->emailUsuario))
            {
                return response()->json([
                    'resultado' => 0
                ]);
            }
            //VALIDACIÓN NOMBRE
            if( $datosOrganizacion->razonSocial === ''){
                return response()->json([
                    'resultado' => 0,
                    'message' => "Ingrese un nombre"
                ]);
            }
            $regEx = '/[A-Za-zÁÉÍÓÚñáéíóúÑ\s]/';
            if(!preg_match($regEx, $datosOrganizacion->razonSocial)){
                return response()->json([
                    'resultado' => 0,
                    'message' => "Ingrese un nombre valido"
                ]);
            }
            if(strlen($datosOrganizacion->razonSocial) < 3){
                return response()->json([
                    'resultado' => 0,
                    'message' => "Ingrese un nombre con longitud mayor a 2 caracteres"
                ]);
            }

            if(strlen($datosOrganizacion->razonSocial) > 30){
                return response()->json([
                    'resultado' => 0,
                    'message' => "Ingrese un nombre con longitud menor a 30 caracteres"
                ]);
            }

            //VALIDACIÓN EMAIL
            if(!filter_var($datosOrganizacion->emailUsuario, FILTER_VALIDATE_EMAIL)){
                return response()->json([
                    'resultado' => 0,
                    'message' => "Ingrese un email válido"
                ]);
            };

            if(strlen($datosOrganizacion->emailUsuario) > 120){
                return response()->json([
                    'resultado' => 0,
                    'message' => "Ingrese un email con longitud menor a 120 caracteres"
                ]);
            }

            //VALIDACIÓN CLAVE USUARIO
            if($datosOrganizacion->claveUsuario === ''){
                return response()->json([
                    'resultado' => 0,
                    'message' => "La longitud de la contraseña debe ser mayor a 7 caracteres"
                ]);
            }
            if(!preg_match("/[a-z]/", $datosOrganizacion->claveUsuario) || !preg_match("/[A-Z]/", $datosOrganizacion->claveUsuario) || !preg_match("/[0-9]/", $datosOrganizacion->claveUsuario) || !preg_match("/[^a-zA-Z\d]/", $datosOrganizacion->claveUsuario)){
                return response()->json([
                    'resultado' => 0,
                    'message' => "La contraseña debe tener al menos una mayuscula, una minuscula, un numero y un caracter especial"
                ]);
            };
            if(strlen($datosOrganizacion->claveUsuario) < 8){
                return response()->json([
                    'resultado' => 0,
                    'message' => "La longitud de la contraseña debe ser mayor a 7 caracteres"
                ]);
            }

            $organizacion = new Organizacion;
            DB::beginTransaction();
            $usuario->claveUsuario = hash( 'sha256', $datosOrganizacion->claveUsuario );
            $usuario->emailUsuario = $datosOrganizacion->emailUsuario;
            $usuario->tokenGoogle = $datosOrganizacion->tokenGoogle;
            if($datosOrganizacion->urlFotoPerfilUsuario != ""){
            $usuario->urlFotoPerfilUsuario = $datosOrganizacion->urlFotoPerfilUsuario;
            }
            $usuario->idRolUsuario = 2;
            $usuario->idEstadoUsuario = 1;
            $usuario->save();
            $organizacion->idUsuario = $usuario->idUsuario;
            $organizacion->razonSocial = $datosOrganizacion->razonSocial;
            $organizacion->idTipoOrganizacion = $datosOrganizacion->tipoOrganizacion->idTipoOrganizacion;
            $organizacion->save();
            $telefonos = $datosOrganizacion->telefonos;
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
            $domicilios = $datosOrganizacion->domicilios;
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
            $links = $datosOrganizacion->links;

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

    public function getOrganizacion($idUsuario){

        try{
            $organizacion = Organizacion::getOrganizacion($idUsuario);
            if( $organizacion ){
                return response()->json([
                    'resultado' => 1,
                    'organizacion' => $organizacion,
                    'domicilios' => Domicilio::listarDomiciliosUsuario($idUsuario),
                    'telefonos' => Telefono::listarTelefonosUsuario($idUsuario)
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

    public function busquedaOrganizaciones($filtroTexto){
        $organizaciones = Organizacion::getOrganizaciones();
        $organizacionesConNecesidad = [];

        foreach( $organizaciones as  $key => $organizacion ){
            $necesidades = Necesidad::buscarNecesidad( $filtroTexto, $organizacion->idUsuario );
            $json_array  = json_decode($necesidades, true);
            $organizacion['necesidades'] = $necesidades;
            //Si hay necesidades entonces traigo esa organizacion, sino no
            if( count($json_array) > 0 ){
                array_push($organizacionesConNecesidad, $organizacion);
            }
        }
        $organizaciones = $organizacionesConNecesidad;
        return json_encode([
            'organizaciones' => $organizaciones
        ]);
    }

    public function busquedaOrganizacionesPorCategoria($filtroTexto){
        $organizaciones = Organizacion::getOrganizaciones();
        $organizacionesConNecesidad = [];

        foreach( $organizaciones as  $key => $organizacion ){
            $necesidades = Necesidad::buscarNecesidadPorCategoria( $filtroTexto, $organizacion->idUsuario );
            $json_array  = json_decode($necesidades, true);
            $organizacion['necesidades'] = $necesidades;
            //Si hay necesidades entonces traigo esa organizacion, sino no
            if( count($json_array) > 0 ){
                array_push($organizacionesConNecesidad, $organizacion);
            }
        }
        $organizaciones = $organizacionesConNecesidad;

        return json_encode([
            'organizaciones' => $organizaciones
        ]);
    }

    public function busquedaOrganizacionesPorUbicacion($ubicacion){
        $organizaciones = Organizacion::buscarOrganizacionesPorUbicacion( $ubicacion );
        $organizacionesConNecesidad = [];

        foreach( $organizaciones as  $key => $organizacion ){
            $necesidades = Necesidad::listarNecesidadesPantallaPrincipal( $organizacion->idUsuario );
            $json_array  = json_decode($necesidades, true);
            $organizacion['necesidades'] = $necesidades;
            //Si hay necesidades entonces traigo esa organizacion, sino no
            if( count($json_array) > 0 ){
                array_push($organizacionesConNecesidad, $organizacion);
            }
        }
        $organizaciones = $organizacionesConNecesidad;

        return json_encode([
            'organizaciones' => $organizaciones
        ]);
    }

    //Traerme todas las organizaciones
    public function getOrganizaciones(){

        $organizaciones = Organizacion::getOrganizaciones();

        foreach( $organizaciones as $organizacion ){
            $organizacion['necesidades'] = Necesidad::listarNecesidadesPantallaPrincipal( $organizacion->idUsuario );
        }

        return json_encode([
            'organizaciones' => $organizaciones
        ]);
    }

    //Traerme la organizacion del link
    public function traerOrganizacion($idOrganizacion, $idNecesidad){

        $organizaciones = Organizacion::traerOrganizacion($idOrganizacion);
        foreach( $organizaciones as $organizacion ){
            $organizacion['necesidades'] = Necesidad::traerNecesidad($idNecesidad);
        }
        return json_encode([
            'organizaciones' => $organizaciones
        ]);
    }

    public function actualizarDescripcion(Request $request)
    {
        $datos = json_decode($request->getContent());

        $flight = Organizacion::find($datos->idUsuario);

        $flight->descripcionOrganizacion = $datos->descripcionOrganizacion;

        $flight->save();

        return response()->json([
            'resultado' => 1,
            'message' => "registro exitoso!"

        ]);

    }
}
