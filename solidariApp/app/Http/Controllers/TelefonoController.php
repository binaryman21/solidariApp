<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Telefono;
class TelefonoController extends Controller
{
    public function listarTelefonosUsuario($idUsuario)
    {
        return response()->json([
            'telefonos' => Telefono::listarTelefonosUsuario($idUsuario)
        ]);
    }
}
