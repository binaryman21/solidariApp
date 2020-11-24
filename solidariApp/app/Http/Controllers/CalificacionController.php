<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Calificacion;
use App\Models\CalificacionOrganizacion;
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
            if(isset($_SESSION['usuario']))
            {
                if(UsuarioController::tienePermisoPara("calificarColaborador"))
                {
                    $resultado = Calificacion::where('idColaboracion',$datos->idColaboracion)->where('idRolCalificado',$datos->idRolCalificado)->first();

                    if(!$resultado)
                    {
                        if(!$datos->ayudaConcretada){
                            $datos->cantidadRecibida = 0;
                        }
                        else
                        {
                            //VALIDO SI LA CANTIDAD INGRESADA ES UN NUMERO
                            if(is_numeric($datos->cantidadRecibida))
                            {
                                //VALIDO SI LA CANTIDAD INGRESADA ES POSITIVA
                                if($datos->cantidadRecibida < 0)
                                {
                                    return response()->json([
                                        'resultado' => 0,
                                        'message' => 'La cantidad debe ser mayor a 0'
                                    ]);
                                }
                            }
                            else
                            {
                                return response()->json([
                                    'resultado' => 0,
                                    'message' => 'La cantidad debe ser un numero'
                                ]);
                            }
                        }

                        DB::beginTransaction();
                        $calificacion = new Calificacion;
                        $calificacion->idColaboracion = $datos->idColaboracion;
                        $calificacion->comentario = $datos->comentario;
                        $calificacion->ayudaConcretada = $datos->ayudaConcretada;
                        $calificacion->tratoRecibido = $datos->tratoRecibido;
                        $calificacion->idRolCalificado = $datos->idRolCalificado;
                        $calificacion->save();

                        $necesidad = Necesidad::find($datos->idNecesidad);
                        $necesidad->cantidadRecibida += $datos->cantidadRecibida;
                        if($necesidad->cantidadRecibida > $necesidad->cantidadNecesidad){
                            $necesidad->estadoNecesidad = 2;
                        }
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
                            'message' => 'Se ha enviado la calificacion'
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
                'message' => $e->getMessage()
            ]);
        }
    }

    public function registrarCalificacionOrganizacion(Request $request)
    {
        try
        {
            $datos = json_decode($request->getContent());
            session_start();
            if(isset($_SESSION['usuario']))
            {
                $usuario = $_SESSION['usuario'];
                $datos->idCalificante = $usuario->idUsuario;
                if( UsuarioController::tienePermisoPara("calificarOrganizacion") )
                {
                    $resultado = CalificacionOrganizacion::where('idCalificado',$datos->idCalificado)->where('idCalificante',$datos->idCalificante)->first();

                    if(!$resultado)
                    {
                        DB::beginTransaction();
                        $calificacion = new CalificacionOrganizacion;
                        $calificacion->idCalificado = $datos->idCalificado;
                        $calificacion->idCalificante = $datos->idCalificante;
                        $calificacion->tratoRecibido = $datos->tratoRecibido;
                        $calificacion->comentario = $datos->comentario;
                        $calificacion->save();
                        DB::commit();
                        return response()->json([
                            'resultado' => 1,
                            'message' => 'Se ha enviado la calificacion'
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
                // echo $cantidadColaboraciones."----";
            }
            else
            {
                $cantidadColaboraciones = Colaboracion::where("idColaborador",$idUsuario)->whereHas("necesidad",function($q)use ($insignia){
                    $q->where('idCategoriaNecesidad', '=', $insignia->idCategoria);
                })->where("estadoColaboracion",1)->count();
                // echo $cantidadColaboraciones."----";

            }

            if($cantidadColaboraciones == $insignia->cantidadRequerida)
            {
                try
                {
                    NotificacionController::crearNotificacionInsignia($insignia->idInsignia,$idUsuario);
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

    public function getCalificacionesOrganizacion($idUsuario)
    {
        try
        {
            return response()->json([
                'resultado' => 1,
                'calificaciones' => CalificacionOrganizacion::getCalificaciones($idUsuario)
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
