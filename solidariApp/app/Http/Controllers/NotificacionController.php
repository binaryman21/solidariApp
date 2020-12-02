<?php

namespace App\Http\Controllers;

use App\Models\CategoriaNecesidad;
use App\Models\Notificacion;
use App\Models\Organizacion;
use App\Models\Colaborador;
use App\Models\Colaboracion;
use App\Models\Calificacion;
use App\Models\CalificacionOrganizacion;
use App\Models\Necesidad;
use App\Models\TratoCalificacion;
use App\Models\Usuario;
use App\Models\CategoriNecesidad;
use App\Models\Insignia;
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
                //SI ES DE TIPO 1, 2 o 5 TIENE NECECEISDADES
                if($notificacion->idMensaje == 1 || $notificacion->idMensaje == 5 || $notificacion->idMensaje == 2){
                    $necesidad = Necesidad::getNecesidad($notificacion->idNecesidad);
                    $categoria = CategoriaNecesidad::getCategoria($necesidad->idCategoriaNecesidad);
                    $tipoNecesidad = $categoria->nombreCategoria;
                    $notificacion['tipoNecesidad'] = $tipoNecesidad;
                    $notificacion['necesidad'] = $necesidad;

                }
                //SI ES DE TIPO 2 TIENE UNA AYUDA CALIFICADA
                if($notificacion->idMensaje == 2){
                    $calificacion = Calificacion::where('idColaboracion', '=', $notificacion->idColaboracion)->first();
                    $tratoRecibido = TratoCalificacion::where('idTrato','=', $calificacion->tratoRecibido)->first();;
                    $notificacion['tratoRecibido'] = $tratoRecibido->descripcion;
                }
                //SI ES TIPO 6 TIENE UNA CALIFICACION SOBRE SU ORGANIZACION
                if($notificacion->idMensaje == 6){
                    $calificacion = CalificacionOrganizacion::where('idCalificado',$notificacion->idReceptor)->where('idCalificante',$notificacion->idEmisor)->first();
                    $tratoRecibido = TratoCalificacion::where('idTrato','=', $calificacion->tratoRecibido)->first();
                    $notificacion['tratoRecibido'] = $tratoRecibido->descripcion;
                }

                  //SI ES TIPO 7 EL COLABORADOR TIENE UNA NUEVA INSIGNIA
                  if($notificacion->idMensaje == 7){
                    $insignia =  Insignia::where('idInsignia', '=', $notificacion->idInsignia)->first();
                    $notificacion['insignia'] = $insignia;
                }

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
                'message' => $e->getMessage(),
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
                $notificacion = new Notificacion;
                $notificacion->idMensaje = '6';
                $notificacion->idEmisor = $_SESSION['usuario']->idUsuario;
                $notificacion->idReceptor = $calificacion->idCalificado;
                $notificacion->leido = '0';
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

    public static function crearNotificacionInsignia($idInsignia,$idUsuario)
    {
        try{

            if (session_status() == PHP_SESSION_NONE)
        {
            session_start();
        }
            if(isset($_SESSION['usuario']))
            {
                $notificacion = new Notificacion;
                $notificacion->idMensaje = '7';
                $notificacion->idReceptor = $idUsuario;
                $notificacion->leido = '0';
                $notificacion->idInsignia = $idInsignia;
                $notificacion->save();

                return 1;
            }
        }
        catch(\Exception $e)
        {
            throw $e;
        }
    }

    public static function cargarNotificacionesCarousel(){
        set_time_limit(1000);

        try
        {
            $notificaciones = Notificacion::getNotificaciones();

            foreach($notificaciones as $notificacion){

                //SI ES TIPO 7 EL RECEPTOR OBTUVO UNA NUEVA INSIGNIA Y EL EMISOR ES EL SISTEMA
                if($notificacion->idMensaje == 7){
                    $insignia =  Insignia::where('idInsignia', '=', $notificacion->idInsignia)->first();
                    $notificacion['insignia'] = $insignia;
                    $notificacion['emisor'] = '0';
                    $usuario = Usuario::getUsuario($notificacion->idReceptor);
                    $notificacion['receptor'] = $usuario;
                }
                elseif($notificacion->idMensaje == 8)
                {
                    $notificacion['receptor'] = '0';
                    $usuario = Usuario::getUsuario($notificacion->idEmisor);
                    $notificacion['emisor'] = $usuario;
                }
                else
                {
                    $usuario = Usuario::getUsuario($notificacion->idEmisor);
                    $notificacion['emisor'] = $usuario;

                    $usuario = Usuario::getUsuario($notificacion->idReceptor);
                    $notificacion['receptor'] = $usuario;
                }

                //SI ES DE TIPO 1, 2 o 5 TIENE NECECEISDADES
                if($notificacion->idMensaje == 1 || $notificacion->idMensaje == 8 || $notificacion->idMensaje == 2){
                    $necesidad = Necesidad::getNecesidad($notificacion->idNecesidad);
                    $categoria = CategoriaNecesidad::getCategoria($necesidad->idCategoriaNecesidad);
                    $tipoNecesidad = $categoria->nombreCategoria;
                    $notificacion['tipoNecesidad'] = $tipoNecesidad;
                    $notificacion['necesidad'] = $necesidad;

                }
                //SI ES DE TIPO 2 TIENE UNA AYUDA CALIFICADA
                if($notificacion->idMensaje == 2){
                    $calificacion = Calificacion::where('idColaboracion', '=', $notificacion->idColaboracion)->first();
                    $tratoRecibido = TratoCalificacion::where('idTrato','=', $calificacion->tratoRecibido)->first();;
                    $notificacion['tratoRecibido'] = $tratoRecibido->descripcion;
                }
                //SI ES TIPO 6 TIENE UNA CALIFICACION SOBRE SU ORGANIZACION
                if($notificacion->idMensaje == 6){
                    $calificacion = CalificacionOrganizacion::where('idCalificado',$notificacion->idReceptor)->where('idCalificante',$notificacion->idEmisor)->first();
                    $tratoRecibido = TratoCalificacion::where('idTrato','=', $calificacion->tratoRecibido)->first();
                    $notificacion['tratoRecibido'] = $tratoRecibido->descripcion;
                }

            }

            return response()->json([
                'notificaciones' => $notificaciones,
                'result' => 1
            ]);
        }
        catch(\Exception $e)
        {
            return response()->json([
                'result' => 0,
                'message' => $e->getMessage(),
            ]);
        }
    }

}
