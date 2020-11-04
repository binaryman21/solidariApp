<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RegistroCalificaciones extends Model
{
    protected $table = 'registroCalificaciones';
    protected $primaryKey = 'idRegistro';
    public $timestamps = false;
    use HasFactory;
}
