<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class InsigniaUsuario extends Model
{
    protected $table = 'insigniaUsuario';
    protected $primaryKey = 'idInsigniaAsignada';
    public $timestamps = false;
    use HasFactory;

    public function registrarInsignia($idUsuario,$idInsignia)
    {

    }
}
