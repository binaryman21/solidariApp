<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TipoLink extends Model
{
    use HasFactory;
    protected $table = 'tipoLink';
    protected $primaryKey = 'idTipoLink';
    public $timestamps = false;

    public static function listarTipoLinks()
    {
        return TipoLink::All();
    }
}
