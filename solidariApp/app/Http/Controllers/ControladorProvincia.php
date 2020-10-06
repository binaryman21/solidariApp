<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
class ControladorProvincia extends Controller
{
    public function listarProvincia()
    {
        $p = new Provincia;
        $provincias = $p->listarProvincias();
        
        return response()->json([
            'provincias' => $provincias
        ]);
    }
}
