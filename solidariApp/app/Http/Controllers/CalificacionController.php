<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Calificacion;
use App\Models\Colaboracion;
use App\Models\Insignia;
use App\Models\InsigniaUsuario;
use App\Models\Necesidad;
use Illuminate\Support\Facades\DB;
class CalificacionController extends Controller
{
    public function registrarCalificacion(Request $request)
    {
        try
        {

            $datos = json_decode($request->getContent());
            session_start();
            if(UsuarioController::tienePermisoPara("calificarColaborador") || UsuarioController::tienePermisoPara("calificarOrganizacion"))
            {
                $resultado = Calificacion::where('idColaboracion',$datos->idColaboracion)->where('idRolCalificado',$datos->idRolCalificado)->first();

                if(!$resultado)
                {
                    DB::beginTransaction();
                    $calificacion = new Calificacion;
                    $calificacion->idColaboracion = $datos->idColaboracion;
                    $calificacion->comentario = $datos->comentario;
                    $calificacion->ayudaConcretada = $datos->ayudaConcretada;
                    $calificacion->tratoRecibido = $datos->tratoRecibido;
                    $calificacion->idRolCalificado = $datos->idRolCalificado;
                    $calificacion->save();

                    if(!$datos->ayudaConcretada){
                        $datos->cantidadRecibida = 0;
                    }
                    $necesidad = Necesidad::find($datos->idNecesidad);
                    $necesidad->cantidadRecibida += $datos->cantidadRecibida;
                    $necesidad->save();

                    $colaboracion = Colaboracion::find($datos->idColaboracion);
                    if($datos->ayudaConcretada && $datos->idRolCalificado == 1)
                    {
                        $colaboracion->estadoColaboracion = 1;
                    }
                    else if(!$datos->ayudaConcretada && $datos->idRolCalificado == 1)
                    {
                        $colaboracion->estadoColaboracion = 2;
                    }

                    $colaboracion->save();
                    $this->actualizarInsignias($colaboracion->idColaborador);
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
                        'message' => 'Error: Ya ha realizado esta calificacion'
                    ]);
                }

            }

            else
            {
                return response()->json([
                    'resultado' => 0,
                    'message' => 'ACCION NO PERMITIDA'
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

    public function actualizarInsignias($idUsuario)
    {
        $insignias = Insignia::listarInsignias();

        foreach ($insignias as $key => $insignia)
        {
            if($insignia->idCategoria == null)
            {
                $cantidadColaboraciones = Colaboracion::where("idColaborador",$idUsuario)->where("estadoColaboracion",1)->count();
                echo $cantidadColaboraciones."----";
            }
            else
            {
                $cantidadColaboraciones = Colaboracion::where("idColaborador",$idUsuario)->whereHas("necesidad",function($q)use ($insignia){
                    $q->where('idCategoriaNecesidad', '=', $insignia->idCategoria);
                })->where("estadoColaboracion",1)->count();
                echo $cantidadColaboraciones."----";

            }

            if($cantidadColaboraciones == $insignia->cantidadRequerida)
            {
                try
                {
                    $nuevaInsignia = new InsigniaUsuario;
                    $nuevaInsignia->idUsuario = $idUsuario;
                    $nuevaInsignia->idInsignia = $insignia->idInsignia;
                    $nuevaInsignia->save();
                }
                catch(\Exception $e)
                {
                    throw $e;
                }
            }
        }
    }


    public function getCalificaciones($idUsuario)
    {
        try
        {
            return response()->json([
                'resultado' => 1,
                'calificaciones' => Calificacion::getCalificaciones($idUsuario)
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
