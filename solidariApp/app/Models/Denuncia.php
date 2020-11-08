<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Denuncia extends Model
{
    use HasFactory;
    protected $table = 'denuncia';
    protected $primaryKey = 'idDenuncia';
    public $timestamps = false;

    public static function getDenuncias(){
        return Denuncia::All();
    }
}
