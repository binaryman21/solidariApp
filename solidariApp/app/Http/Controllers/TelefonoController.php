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
        try{
            session_start();
            if(isset($_SESSION['usuario']))
            {
                $datos = json_decode($request->getContent());
                $telefono = new Telefono;
                $telefono->codAreaTelefono = $datos->codAreaTelefono;
                $telefono->numeroTelefono = $datos->numeroTelefono;
                $telefono->esCelular = $datos->esCelular;
                $telefono->idUsuario = $_SESSION['usuario']->idUsuario;
                $telefono->save();

                return response()->json([
                    'idTelefono' => $telefono->idTelefono,
                    'resultado' => 1,
                    'message' => "Se ha registrado el telefono."
                ]);
            }
            else
            {
                return response()->json([
                    'resultado' => 0,
                    'message' => 'No estas logueado'
                ]);
            }
        }
        catch (\Exception $e)
        {
            return response()->json([
                'resultado' => 0,
                //'message' => 'Accion no disponible. Intente mas tarde'
                'message' => $e->getMessage()
            ]);
        }
    }

    public function eliminarTelefono(Request $request)
    {
        $datos = json_decode($request->getContent());
        $tel = Telefono::find($datos->idTelefono);
        if($tel){
            $tel->activo = false;
            $tel->save();

            $result = [
                
                'idTelefono' => $tel->idTelefono,
                'resultado' => 1,
                'message' => "Se ha eliminado el telefono."
            ];

            return response()->json($result);
        }
        else{

            return response()->json([
                
                'idTelefono' => $datos->idTelefono,
                'resultado' => 0,
                'message' => 'El telefono no esta registrado'
            ]);
        }
    }
}