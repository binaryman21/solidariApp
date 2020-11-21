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
        ->get();
    }
}

