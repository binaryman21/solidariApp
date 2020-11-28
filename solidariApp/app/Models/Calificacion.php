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
        ->join('necesidad', 'colaboraciones.idNecesidad', 'necesidad.idNecesidad')
        ->join('usuario', 'necesidad.idUsuario', 'usuario.idUsuario')
        ->join('organizacion', 'usuario.idUsuario', 'organizacion.idUsuario')
        ->select(

            'comentario', 'fechaCalificacion', 'ayudaConcretada', 'tratoRecibido', 'razonSocial', 'urlFotoPerfilUsuario', 'usuario.idUsuario'
        )
        ->get();
    }

    public static function getCalificacion($idColaboracion){
        return Calificacion::where('calificacion.idColaboracion', '=', $idColaboracion)->get();
    }

}

