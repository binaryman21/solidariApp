<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Suscripcion extends Model
{
    use HasFactory;
    protected $table = 'suscripcion';
    protected $primaryKey = 'idSuscripcion';
    public $timestamps = false;

    public static function getSuscriptores( $idOrganizacion ){
        return Suscripcion::where('idOrganizacion', $idOrganizacion)
        ->get();
    }
}