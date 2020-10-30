<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Domicilio;
class DomicilioController extends Controller
{
    public function listarDomiciliosUsuario($idUsuario)
    {
        return response()->json([
            'domicilios' => Domicilio::listarDomiciliosUsuario($idUsuario)
        ]);
    }

    public function actualizarDomicilio(Request $request)
    {
        $datos = json_decode($request->getContent());

        $domicilio = Domicilio::find($datos->idDomicilio);

        $domicilio->calle = $datos->calle;
        $domicilio->numero = $datos->numero;
        $domicilio->piso = $datos->piso;
        $domicilio->depto = $datos->depto;
        $domicilio->idLocalidad = $datos->idLocalidad;
        $domicilio->save();

        return response()->json([
            'resultado' => 1

        ]);

    }
}
