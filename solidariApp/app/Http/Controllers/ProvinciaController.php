<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Provincia;
class ProvinciaController extends Controller
{
    public function listarProvincias()
    {
        $p = new Provincia;
        $provincias = $p->listarProvincias();

        return response()->json([
            'provincias' => $provincias
        ]);
    }

    public function listarLocalidades($idProvincia)
    {
        $p = new Provincia;
        $localidades = $p->listarLocalidades($idProvincia);
        return response()->json([
            'localidades' => $localidades
        ]);
    }
}
