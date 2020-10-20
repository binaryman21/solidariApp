<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Models\Usuario;
use App\Models\Link;
use App\Models\Colaborador;
use App\Models\Domicilio;
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

            $usuario->claveUsuario = $datosColaborador->claveUsuario;
            $usuario->emailUsuario = $datosColaborador->emailUsuario;
            $usuario->tokenGoogle = $datosColaborador->tokenGoogle;
            $usuario->urlFotoPerfilUsuario = $datosColaborador->urlFotoPerfilUsuario;
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
                $telefono = new Telefono;
                $telefono->codAreaTelefono = $telefonoActual->codAreaTelefono;
                $telefono->numeroTelefono = $telefonoActual->numeroTelefono;
                $telefono->idTipoTelefono = $telefonoActual->tipoTelefono->idTipoTelefono;
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
                'message' => $e->getMessage()
            ]);
        }

        return response()->json([
            'message' => "Registro exitoso"

        ]);
    }
}
