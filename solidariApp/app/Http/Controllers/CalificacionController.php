<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Calificacion;
use App\Models\Necesidad;
use Illuminate\Support\Facades\DB;
class CalificacionController extends Controller
{
    public function registrarCalificacion(Request $request)
    {
        try
        {
            DB::beginTransaction();
            $datos = json_decode($request->getContent());
            session_start();
            if(isset($_SESSION['usuario']))
            {
                $calificacion = new Calificacion;
                $calificacion->idColaboracion = $datos->idColaboracion;
                $calificacion->comentario = $datos->comentario;
                $calificacion->ayudaConcretada = $datos->ayudaConcretada;
                $calificacion->tratoRecibido = $datos->tratoRecibido;
                $calificacion->idRolCalificado = $datos->idRolCalificado;
                $calificacion->save();

                $necesidad = Necesidad::find($datos->idNecesidad);
                $necesidad->cantidadRecibida += $datos->cantidadRecibida;
                $necesidad->save();
                DB::commit();
                return response()->json([
                    'resultado' => 1,
                    'message' => 'Se ha enviado la calificación'
                ]);
            }

            else
            {
                return response()->json([
                    'resultado' => 0,
                    'message' => 'notLoggedIn'
                ]);
            }

        }
        catch (\Exception $e)
        {
            return response()->json([
                'resultado' => 0,
                'message' => $e->getMessage()
            ]);
        }
    }
}
