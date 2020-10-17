<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TipoTelefono extends Model
{
    use HasFactory;
    protected $table = 'tipoTelefono';
    protected $primaryKey = 'idTipoTelefono';
}
