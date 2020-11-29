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

    public function registrarTelefono(Request $request)
    {
        $datos = json_decode($request->getContent());
        $telefono = new Telefono;
        $telefono->codAreaTelefono = $datos->codAreaTelefono;
        $telefono->numeroTelefono = $datos->numeroTelefono;
        $telefono->esCelular = $datos->esCelular;
        $telefono->idUsuario = $datos->idUsuario;
        $telefono->save();
        return response()->json([
            'idTelefono' => $telefono->idTelefono,
        ]);
    }

    public function eliminarTelefono(Request $request)
    {
        $datos = json_decode($request->getContent());

        $tel = Telefono::find($datos->idTelefono);

        $tel->activo = false;

        $tel->save();

        return response()->json([
            'resultado' => 1,
            'message' => "registro exitoso!"

        ]);

    }
}
