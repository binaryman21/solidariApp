<?php

namespace App\Http\Controllers;

use App\Models\TipoOrganizacion;
use Illuminate\Http\Request;

class TipoOrganizacionController extends Controller
{
    public function listarTipoOrganizaciones()
    {

        $tipoOrganizaciones = TipoOrganizacion::listarTipoOrganizaciones();

        return response()->json([
            'tipoOrganizaciones' => $tipoOrganizaciones
        ]);
    }
}
