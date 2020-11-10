<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\MotivoDenuncia;


class MotivoDenunciaController extends Controller
{
    //
    public function getMotivos(){
        $motivos = MotivoDenuncia::getMotivos();
        return response()->json([
            'motivos' => $motivos
        ]);
    }
}
