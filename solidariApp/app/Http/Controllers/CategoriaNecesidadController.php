<?php

namespace App\Http\Controllers;

use App\Models\CategoriaNecesidad;
use Illuminate\Http\Request;

class CategoriaNecesidadController extends Controller
{
    public function listarCategoriasNecesidad()
    {

        $categoriaNecesidad = CategoriaNecesidad::listarCategoriasNecesidad();

        return response()->json([
            'CategoriasNecesidad' => $categoriaNecesidad
        ]);
    }
}
