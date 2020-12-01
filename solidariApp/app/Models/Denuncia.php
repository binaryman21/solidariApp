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
        return Denuncia::join('motivoDenuncia', 'motivoDenuncia.idMotivoDenuncia','denuncia.idMotivoDenuncia')
        ->where('denuncia.confirmada','0')
        ->orderBy('denuncia.idDenuncia', 'DESC')
        ->get();
    }

    public static function confirmarDenuncia( $idDenuncia ){
        Denuncia::where('denuncia.idDenuncia', $idDenuncia)
        ->update(['confirmada'=>'1']);
    }
}
