<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MotivoDenuncia extends Model
{
    use HasFactory;
    protected $table = 'motivoDenuncia';
    protected $primaryKey = 'idMotivoDenuncia';
    public $timestamps = false;

    public static function getMotivos(){
        return MotivoDenuncia::All();
    }

}
