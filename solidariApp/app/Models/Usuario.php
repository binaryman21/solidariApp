<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Usuario extends Model
{
    use HasFactory;
    protected $table = 'usuario';
    protected $primaryKey = 'idUsuario';
    public $timestamps = false;

    public static function login($datosLogin){
        $email = $datosLogin->email;
        $pass = $datosLogin->pass;
        $idGoogle = $datosLogin->idGoogle;
        $usuario = Usuario::with('rol')->where('emailUsuario', $email)->where('claveUsuario',$pass)->get();
        if($idGoogle != 0)
        {
            $usuario = Usuario::with('rol')->where('emailUsuario', $email)->where('tokenGoogle',$idGoogle)->get();
        }

        return $usuario;
    }

    public static function isUser($email){

        return Usuario::where('emailUsuario',$email)->exists();

    }

    public function rol()
    {
        return $this->belongsTo('App\Models\Rol','idRolUsuario','idRol');
    }

    public function domicilios()
    {
        return $this->hasMany('App\Models\Domicilio','idUsuario','idUsuario');
    }

}


