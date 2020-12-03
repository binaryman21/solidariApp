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
                if(UsuarioController::tienePermisoPara("colaborar"))
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
                //'message' => 'Accion no disponible. Intente mas tarde'
                'message' => $e->getMessage()
            ]);
        }
    }

    public function getColaboraciones($idNecesidad){
        $colaboraciones = Colaboracion::where("idNecesidad",$idNecesidad)->with("calificaciones")
        ->join("colaborador","colaborador.idUsuario","=","colaboraciones.idColaborador")
        ->join("usuario","usuario.idUsuario","=","colaboraciones.idColaborador")
        ->where("colaboraciones.estadoColaboracion","<>","2")
        ->get();
        return response()->json([
            'colaboraciones' => $colaboraciones
        ]);
    }

    public function getColaboracionesPorUsuario($idUsuario){

        $colaboraciones = Colaboracion::where("idColaborador",$idUsuario)
        ->join("necesidad","necesidad.idNecesidad","=","colaboraciones.idNecesidad")
        ->join("estadoColaboracion","colaboraciones.estadoColaboracion","=","estadoColaboracion.idEstadoColaboracion")
        ->join("categoriaNecesidad","categoriaNecesidad.idCategoria","=","necesidad.idCategoriaNecesidad")
        ->join("organizacion","necesidad.idUsuario","=","organizacion.idUsuario")
        ->join("usuario","usuario.idUsuario","=","organizacion.idUsuario")
        ->orderBy('colaboraciones.estadoColaboracion', 'ASC')
        ->orderBy('colaboraciones.fechaColaboracion', 'DESC')
        ->select(

            'idColaboracion', 'razonSocial', 'nombreCategoria', 'descripcionNecesidad',
             'descripcionEstadoColaboracion', 'organizacion.idUsuario', 'fechaColaboracion',
             'urlFotoPerfilUsuario'
        )
        ->get(array([]));

        return response()->json([

            'resultado' => 1,
            'colaboraciones' => $colaboraciones
        ]);
    }

}
