<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Localidad extends Model
{
    use HasFactory;
    protected $table = 'localidad';
    protected $primaryKey = 'idLocalidad';
    public $timestamps = false;
    public function listarLocalidades()
    {
        return Localidad::All();
    }

    public function provincia()
    {
        return $this->belongsTo('App\Models\Provincia');
    }
}
