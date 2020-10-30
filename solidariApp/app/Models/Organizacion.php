<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Organizacion extends Model
{
    use HasFactory;
    protected $table = 'organizacion';
    protected $primaryKey = 'idUsuario';
    public $timestamps = false;

    public static function getOrganizacion($idUsuario)
    {
        return Organizacion::join('usuario', 'organizacion.idUsuario', '=', 'usuario.idUsuario')
                    ->join('tipoOrganizacion', 'tipoOrganizacion.idTipoOrganizacion', '=', 'organizacion.idTipoOrganizacion')
                        ->where('organizacion.idUsuario',$idUsuario)->first();
    }
}
