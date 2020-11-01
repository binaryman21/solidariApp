<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Necesidad extends Model
{
    use HasFactory;
    protected $table = 'necesidad';
    protected $primaryKey = 'idNecesidad';
    public $timestamps = false;

    public static function listarNecesidades($idUsuario)
    {
        return Necesidad::where("idUsuario",$idUsuario)->with('categoria')->get();
    }

    public static function listarNecesidadesPantallaPrincipal($idUsuario)
    {
        return Necesidad::where("idUsuario",$idUsuario)->with('categoria')->take(2)->get();
    }

    public static function getNecesidad($idNecesidad)
    {
        return Necesidad::find($idNecesidad);
    }

    public function categoria()
    {
        return $this->belongsTo('App\Models\CategoriaNecesidad','idCategoriaNecesidad','idCategoria');
    }

}


