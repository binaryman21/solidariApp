<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TipoOrganizacion extends Model
{
    use HasFactory;
    protected $table = 'tipoOrganizacion';
    protected $primaryKey = 'idTipoOrganizacion';
    public $timestamps = false;

    public static function listarTipoOrganizaciones()
    {
       return TipoOrganizacion::All();
    }
}
