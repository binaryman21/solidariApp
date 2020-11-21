<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\InsigniaUsuario;

class InsigniaUsuarioController extends Controller
{
    public function getInsignias($idUsuario)
    {
        try
        {
            return response()->json([
                'resultado' => 1,
                'insignias' => InsigniaUsuario::getInsignias($idUsuario)
            ]);
        }
        catch (\Exception $e)
        {
            return response()->json([
                'resultado' => 0,
                'message' => $e->getMessage(),
            ]);
        }
    }

}