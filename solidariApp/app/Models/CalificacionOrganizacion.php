<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CalificacionOrganizacion extends Model
{
    protected $table = 'calificacionOrganizacion';
    protected $primaryKey = 'idCalificacion';
    public $timestamps = false;
    use HasFactory;

    public static function getCalificaciones( $idUsuario )
    {
        return CalificacionOrganizacion::where('idCalificado', '=', $idUsuario)
        ->join('usuario', 'calificacionOrganizacion.idCalificante', 'usuario.idUsuario')
        ->join('colaborador', 'calificacionOrganizacion.idCalificante', 'colaborador.idUsuario')
        ->select(
            
            'idCalificante', 'tratoRecibido', 'fechaCalificacion', 'comentario',
            'colaborador.nombreColaborador', 'colaborador.apellidoColaborador',
            'usuario.urlFotoPerfilUsuario'
        )
        ->get();
    }
}