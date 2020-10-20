<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\TipoLink;
class TipoLinkController extends Controller
{
    public function listarTipoLinks()
    {
        $tipoLinks = TipoLink::listarTipoLinks();

        return response()->json([
            'tipoLinks' => $tipoLinks
        ]);
    }
}
