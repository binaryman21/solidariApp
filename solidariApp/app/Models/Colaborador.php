<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Colaborador extends Model
{
    use HasFactory;
    protected $table = 'colaborador';
    protected $primaryKey = 'idUsuario';
    public $timestamps = false;
    static function getColaborador($idUsuario)
    {
        return Colaborador::join('usuario', 'colaborador.idUsuario', '=', 'usuario.idUsuario')
                        ->where('colaborador.idUsuario',$idUsuario)->first();

    }
}


