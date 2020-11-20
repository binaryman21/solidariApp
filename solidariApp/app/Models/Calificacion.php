<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Calificacion extends Model
{
    protected $table = 'calificacion';
    protected $primaryKey = 'idCalificacion';
    public $timestamps = false;
    use HasFactory;

    public static function getCalificaciones( $idUsuario )
    {
        return Calificacion::where('colaboraciones.idColaborador', '=', $idUsuario)
        ->join('colaboraciones', 'calificacion.idColaboracion', 'colaboraciones.idColaboracion')
        ->get();
    }
}

