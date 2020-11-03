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
        $usuario = Usuario::with('rol')->where('emailUsuario', $email)->where('claveUsuario',$pass)->first();
        if($idGoogle != 0)
        {
            $usuario = Usuario::with('rol')->where('emailUsuario', $email)->where('tokenGoogle',$idGoogle)->first();
        }

        return $usuario;
    }

    public static function isUser($email){
        /*TODO: agregar condicion: idEstadoUsuario = 1 */
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

    /*Dar de baja usuario*/
    public static function bajaUser($idUsuario)
    {
       /*Inicio log*/ 
      $myfile = fopen("C:\Users\PC\Documents\GitHub\solidariApp\solidariApp\storage\logs\pepe.txt", "w") or die("Unable to open file!");
      $txt = "LOG!:\n";
      fwrite($myfile, $txt);
      fwrite($myfile, $idUsuario);
      fclose($myfile);
        /*FIN log*/ 

      /*Seteo idEstadoUsuario en 0 */
      Usuario::where('idUsuario', $idUsuario)->update(array('idEstadoUsuario' => '2'));
    
      /*TODO: Si el usuario es de tipo Organizacion tengo que setear
      todas sus necesidades como resueltas*/

    }

    public static function updateFotoPerfil($idUsuario, $urlFotoPerfil)
    {
        Usuario::where('idUsuario', $idUsuario)->update(array('urlFotoPerfilUsuario' => $urlFotoPerfil));
    }
 
}



