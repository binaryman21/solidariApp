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
}
