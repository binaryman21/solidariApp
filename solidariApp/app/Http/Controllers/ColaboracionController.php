<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Colaboracion;
class ColaboracionController extends Controller
{
    public function registrarColaboracion(Request $request)
    {

        try
        {
            $datos = json_decode($request->getContent());
            session_start();
            if(isset($_SESSION['usuario']))
            {
                if($_SESSION['usuario']->rol->nombreRol == "colaborador")
                {
                    $resultado = Colaboracion::where("idNecesidad",$datos->idNecesidad)
                    ->where("idColaborador",$_SESSION['usuario']->idUsuario)
                    ->first();

                    if(!$resultado)
                    {
                        $colaboracion = new Colaboracion;
                        $colaboracion->idNecesidad = $datos->idNecesidad;
                        $colaboracion->idColaborador = $_SESSION['usuario']->idUsuario;
                        $colaboracion->save();
                        return response()->json([
                            'resultado' => 1,
                            'message' => 'Gracias por colaborar con esta necesidad. Se envió una notificación a la organización'
                        ]);
                    }
                    else
                    {
                        return response()->json([
                            'resultado' => 0,
                            'message' => 'Usted ya esta colaborando con esta necesidad'
                        ]);
                    }

                }
                else
                {
                    return response()->json([
                        'resultado' => 0,
                        'message' => 'Debe ser un colaborador para realizar esta accion'
                    ]);
                }

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
                'message' => 'Accion no disponible. Intente mas tarde'
            ]);
        }
    }

    public function getColaboraciones($idNecesidad){
        $colaboraciones = Colaboracion::where("idNecesidad",$idNecesidad)
        ->join("colaborador","colaborador.idUsuario","=","colaboraciones.idColaborador")
        ->join("usuario","usuario.idUsuario","=","colaboraciones.idColaborador")
        ->get();
        return response()->json([
            'colaboraciones' => $colaboraciones
        ]);
    }
}
