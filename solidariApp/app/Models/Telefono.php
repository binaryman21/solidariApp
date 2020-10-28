<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Telefono extends Model
{
    use HasFactory;
    protected $table = 'telefono';
    protected $primaryKey = 'idTelefono';
    public $timestamps = false;

    public static function listarTelefonosUsuario($idUsuario){
        return Telefono::where('idUsuario',$idUsuario)->get();
    }
}


