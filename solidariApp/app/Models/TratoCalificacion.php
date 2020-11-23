<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TratoCalificacion extends Model
{
    use HasFactory;
    protected $table = 'tratoCalificacion';
    protected $primaryKey = 'idTrato';
    public $timestamps = false;

    public static function getTrato($idTrato){

        return TratoCalificacion::where('idTrato',$idTrato)->get();

    }
}
