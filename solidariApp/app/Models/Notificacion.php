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
        return Notificacion::select("notificacion.*")
        ->where("idReceptor",$idUsuario)
        ->join('usuario', 'usuario.idusuario', '=', 'notificacion.idEmisor')
        ->join('mensajeNotificacion','mensajeNotificacion.idMensaje', '=','notificacion.idMensaje')
        // ->join('colaborador as emisor','colaborador.idUsuario', '=', 'notificacion.idEmisor')
        // ->where('usuario.idRolUsuario','=', 1 )
        // ->join('organizacion as emisor','organizacion.idUsuario', '=', 'notificacion.idEmisor')
        // ->where('usuario.idRolUsuario','=', 2 )
        ->orderBy('fechaNotificacion', 'ASC')
        ->get();
    }
}
