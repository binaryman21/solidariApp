<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Necesidad;

class NecesidadController extends Controller
{
    public function registrarNecesidad(Request $request)
    {

        $datosNecesidad = json_decode($request->getContent());
        $necesidad = new Necesidad;
        $necesidad->descripcionNecesidad = $datosNecesidad ->descripcionNecesidad;
        $necesidad->cantidadNecesidad = $datosNecesidad ->cantidadNecesidad;
        $necesidad->fechaLimiteNecesidad = $datosNecesidad ->fechaLimiteNecesidad;
        $necesidad->idCategoriaNecesidad = $datosNecesidad ->categoria->idCategoriaNecesidad;
        $necesidad->save();
    }

}
