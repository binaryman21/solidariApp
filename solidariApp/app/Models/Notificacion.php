<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Notificacion extends Model
{
    use HasFactory;
    protected $table = 'notificacion';
    protected $primaryKey = 'idNotificacion';
    public $timestamps = false;

    public static function listarNotificaciones($idUsuario)
    {
        return Notificacion::where("idReceptor",$idUsuario)
        ->leftJoin('usuario', 'usuario.idusuario', '=', 'notificacion.idEmisor')
        ->join('mensajeNotificacion','mensajeNotificacion.idMensaje', '=','notificacion.idMensaje')
        // ->join('colaborador','colaborador.idUsuario', '=', 'notificacion.idEmisor')
        // ->where('usuario.idRolUsuario','=', 1 )
        // ->join('organizacion','organizacion.idUsuario', '=', 'notificacion.idEmisor')
        // ->where('usuario.idRolUsuario','=', 2 )
        ->orderBy('fechaNotificacion', 'DESC')
        ->get();
    }

    public static function getNotificacion($idNotificacion)
    {
        return Notificacion::find($idNotificacion);
    }

    public static function getNotificaciones()
    {
        return Notificacion::where('notificacion.idMensaje','not like','5')
        ->orderBy('fechaNotificacion', 'DESC')
        ->join('mensajeNotificacion','mensajeNotificacion.idMensaje', '=','notificacion.idMensaje')
        ->take(20)
        ->get();
    }

}
