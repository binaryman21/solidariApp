<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Domicilio extends Model
{
    use HasFactory;
    protected $table = 'domicilio';
    protected $primaryKey = 'idDomicilio';
    public $timestamps = false;

    public function usuario()
    {
        return $this->belongsTo('App\Models\Usuario','idUsuario','idDomicilio');
    }

    public function localidad()
    {
        return $this->belongsTo('App\Models\Localidad','idLocalidad','idDomicilio');
    }

    public static function listarDomiciliosUsuario($idUsuario){
        return Domicilio::join("localidad","localidad.idLocalidad","=","domicilio.idLocalidad")
                            ->join("provincia","provincia.idProvincia","=","localidad.idProvincia")
                            ->where('domicilio.idUsuario',$idUsuario)->get();
    }
}
