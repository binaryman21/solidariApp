<?php

namespace App\Http\Controllers;

use App\Models\CategoriaNecesidad;
use App\Models\Notificacion;
use App\Models\Organizacion;
use App\Models\Colaborador;
use App\Models\Colaboracion;
use App\Models\Necesidad;
use App\Models\CategoriNecesidad;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;

class NotificacionController extends Controller
{
    public function listarNotificaciones($idUsuario)
    {

        try
        {
            $notificaciones = Notificacion::listarNotificaciones($idUsuario);
            $noLeidas = 0;

            foreach($notificaciones as $notificacion){

                if($notificacion->idRolUsuario == '1')
                {
                    $colaborador = Colaborador::getColaborador($notificacion->idEmisor);
                    $notificacion['emisor'] = $colaborador;
                }else
                {
                    $organizacion = Organizacion::getOrganizacion($notificacion->idEmisor);
                    $notificacion['emisor'] = $organizacion;
                }
                if($notificacion->leido == '0') $noLeidas++;
                $necesidad = Necesidad::getNecesidad($notificacion->idNecesidad);
                $categoria = CategoriaNecesidad::getCategoria($necesidad->idCategoriaNecesidad);
                $tipoNecesidad = $categoria->nombreCategoria;
                $notificacion['tipoNecesidad'] = $tipoNecesidad;
                $notificacion['necesidad'] = $necesidad;
            }

            return response()->json([
                'notificaciones' => $notificaciones,
                'noLeidas' => $noLeidas,
                'result' => 1
            ]);
        }
        catch(\Exception $e)
        {
            return response()->json([
                'result' => 0,
                'message' => 'Error al cargar notificaciones',
            ]);
        }
    }

    public function upDateNotificacione(Request $request)
    {
        try
        {
            $datosNotificacion = json_decode($request->getContent());

            $notificacion = Notificacion::find($datosNotificacion->idNotificacion);
            $notificacion->leido = $datosNotificacion ->leido;
            $notificacion->save();

            return response()->json([
                'resultado' => 1,
                'message' => 'registro exitoso'
            ]);
        }
        catch (\Exception $e)
        {
            return response()->json([
                'resultado' => 0,
                'message' => $e->getMessage()
            ]);
        }
    }

    public function crearNotificacionColaboracion(Request $request)
    {
        try
        {
            $datos = json_decode($request->getContent());
            session_start();
            if(isset($_SESSION['usuario']))
            {
                $notificacion = new Notificacion;
                $notificacion->idMensaje = "1";
                $notificacion->idEmisor = $_SESSION['usuario']->idUsuario;
                $notificacion->idReceptor = $datos->idUsuario;
                $notificacion->leido = "0";
                $notificacion->idNecesidad = $datos->idNecesidad;
                $notificacion->save();
                return response()->json([
                    'resultado' => 1,
                ]);
            }
        }
        catch(\Exception $e)
        {
            return response()->json([
                'resultado' => 0,
                'message' => $e->getMessage()
            ]);

        }
    }

    public function crearNotificacionCalificacionOrganizacion(Request $request)
    {
        try{
            $calificacion = json_decode($request->getContent());
            session_start();
            if(isset($_SESSION['usuario']))
            {


                return response()->json([
                    'resultado' => 1,
                ]);
            }
        }
        catch(\Exception $e)
        {
            return response()->json([
                'resultado' => 0,
                'message' => $e->getMessage()
            ]);
        }
    }

    public function crearNotificacionCalificacionColaboracion(Request $request)
    {
        try{
            $idColaboracion = json_decode($request->getContent());
            session_start();
            if(isset($_SESSION['usuario']))
            {
                $colaboracion = Colaboracion::getColaboracion($idColaboracion);
                $notificacion = new Notificacion;
                $notificacion->idMensaje = '2';
                $notificacion->idEmisor = $_SESSION['usuario']->idUsuario;
                $notificacion->idReceptor = $colaboracion->idColaborador;
                $notificacion->leido = '0';
                $notificacion->idNecesidad = $colaboracion->idNecesidad;
                $notificacion->idColaboracion = $colaboracion->idColaboracion;
                $notificacion->save();

                return response()->json([
                    'resultado' => 1,
                ]);
            }
        }
        catch(\Exception $e)
        {
            return response()->json([
                'resultado' => 0,
                'message' => $e->getMessage()
            ]);
        }
    }
}
