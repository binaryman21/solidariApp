<?php

namespace App\Http\Controllers;

use App\Models\CategoriaNecesidad;
use App\Models\Notificacion;
use App\Models\Organizacion;
use App\Models\Colaborador;
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


                if($notificacion->usuario->idRolUsuario == '1')
                {
                    $notificacion['emisor'] = Colaborador::getColaborador($notificacion->idEmisor);
                }else
                {
                    $notificacion['emisor'] = Organizacion::getOrganizacion($notificacion->idEmisor);
                }

                if($notificacion->leido == '0') $noLeidas++;
                $notificacion['necesidad'] = Necesidad::getNecesidad($notificacion->idNecesidad);
                $notificacion->necesidad['categoria'] = CategoriaNecesidad::getCategoria($notificacion->necesidad->idCategoriaNecesidad);
            }
            $notificaciones['noLeidas'] = $noLeidas;


            return response()->json([
                'notificaciones' => $notificaciones,
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
}
