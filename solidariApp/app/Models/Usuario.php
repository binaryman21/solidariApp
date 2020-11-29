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
        
        $usuario = Usuario::with('rol.permisos')
                            ->where('emailUsuario', $email)
                            ->where('claveUsuario',$pass)
                            ->where('idEstadoUsuario',1)
                            ->first();
        if($idGoogle != 0)
        {
            $usuario = Usuario::with('rol.permisos')
                                ->where('emailUsuario', $email)->where('tokenGoogle',$idGoogle)
                                ->where('idEstadoUsuario',1)
                                ->first();
        }

        return $usuario;
    }

    public static function getUsuario($idUsuario){
        $usuario = Usuario::with('rol')->where('usuario.idUsuario', $idUsuario)->get();
        if( $usuario[0]->rol->idRol == '1' ){
            $usuario['nombre'] = 
            // Usuario::select('colaborador.nombreColaborador as nombre' , 'colaborador.apellidoColaborador as apellido')
                Usuario::select(Usuario::raw("CONCAT(colaborador.nombreColaborador, \" \",colaborador.apellidoColaborador) AS nombre"))
                ->join('colaborador', 'usuario.idUsuario', 'colaborador.idUsuario')
                ->where('usuario.idUsuario', $idUsuario)
                ->get();
        }
        else{
            $usuario['nombre'] = 
                Usuario::select('organizacion.razonSocial as nombre')
                ->join('organizacion', 'usuario.idUsuario', 'organizacion.idUsuario')
                ->where('usuario.idUsuario', $idUsuario)
                ->get();
        }
        return $usuario;
    }

    public static function isUser($email){
        return Usuario::where('emailUsuario',$email)
                        ->where('idEstadoUsuario',1)
                        ->exists();
    }

    public static function EsUsuario($id){

        return Usuario::where('idUsuario',$id)->where('idEstadoUsuario',1)->exists();
    }

    public function rol()
    {
        return $this->belongsTo('App\Models\Rol','idRolUsuario','idRol');
    }

    public function domicilios()
    {
        return $this->hasMany('App\Models\Domicilio','idUsuario','idUsuario');
    }

    /*Dar de baja usuario*/
    public static function bajaUser($idUsuario)
    {
      /*Seteo idEstadoUsuario en 2 */
      Usuario::where('idUsuario', $idUsuario)->update(array('idEstadoUsuario' => '2'));

    }

    //bloquear usuario por denuncia
    public static function bloquearUsuario($idUsuario)
    {
      Usuario::where('idUsuario', $idUsuario)
            ->update(['idEstadoUsuario'=>'3']);
    }

    public static function updateFotoPerfil($idUsuario, $urlFotoPerfil)
    {
        Usuario::where('idUsuario', $idUsuario)->update(array('urlFotoPerfilUsuario' => $urlFotoPerfil));
    }

    public static function updateFotoPortada($idUsuario, $urlFotoPortada)
    {
        Usuario::where('idUsuario', $idUsuario)->update(array('urlFotoPortadaUsuario' => $urlFotoPortada));
    }

    public static function cambiarClave( $datosClaves )
    {
        Usuario::where('idUsuario', $datosClaves->idUsuario)
            ->update(['claveUsuario'=>$datosClaves->claveNueva]);
    }

    public static function comprobarClave( $datosClaves )
    {
        return Usuario::where('idUsuario', $datosClaves->idUsuario )
                ->where('claveUsuario', $datosClaves->claveVieja )
                // ->get();
                ->count();
    }
}



