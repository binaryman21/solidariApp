<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Provincia extends Model
{
    use HasFactory;
    protected $table = 'provincia';
    protected $primaryKey = 'idProvincia';
    public $timestamps = false;
    public function listarProvincias()
    {
        return Provincia::All();
    }

    public function localidades()
    {
        return $this->hasMany('App\Models\Localidad','idProvincia','idProvincia');
    }

    public function listarLocalidades($idProvincia)
    {
        return Provincia::find($idProvincia)->localidades;
    }
}

