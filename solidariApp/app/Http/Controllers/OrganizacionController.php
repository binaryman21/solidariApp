<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Models\Usuario;
use App\Models\Link;
use App\Models\Organizacion;
use App\Models\Domicilio;
use App\Models\Telefono;

class OrganizacionController extends Controller
{
    public function registrarorganizacion(Request $request)
    {

        try
        {

            $datosOrganizacion = json_decode($request->getContent());
            $usuario = new Usuario;
            if(Usuario::isUser($usuario->emailUsuario))
            {
                return response()->json([
                    'resultado' => 0
                ]);
            }
            $organizacion = new Organizacion;
            DB::beginTransaction();
            $usuario->claveUsuario = $datosOrganizacion->claveUsuario;
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
        return response()->json([
            'organizacion' => Organizacion::getOrganizacion($idUsuario),
            'domicilios' => Domicilio::listarDomiciliosUsuario($idUsuario),
            'telefonos' => Telefono::listarTelefonosUsuario($idUsuario)
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
