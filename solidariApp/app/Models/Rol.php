<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Rol extends Model
{
    use HasFactory;
    protected $table = 'rol';
    protected $primaryKey = 'idRol';
    public $timestamps = false;

    public function usuarios()
    {
        return $this->hasMany('App\Models\Usuario','idRolUsuario','idRol');
    }
}


