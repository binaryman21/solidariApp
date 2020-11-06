<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Necesidad extends Model
{
    use HasFactory;
    protected $table = 'necesidad';
    protected $primaryKey = 'idNecesidad';
    public $timestamps = false;

    public static function listarNecesidades($idUsuario)
    {
        return Necesidad::where("idUsuario",$idUsuario)->with('categoria')->withCount('colaboraciones')->get();
    }

    public static function listarNecesidadesPantallaPrincipal($idUsuario)
    {
        return Necesidad::where("idUsuario",$idUsuario)
        ->join('categoriaNecesidad', 'categoriaNecesidad.idCategoria', '=', 'necesidad.idCategoriaNecesidad')    
        ->take(2)->get();
    }

    //BUSCAR NECESIDAD POR FILTRO DE TEXTO
    public static function buscarNecesidad($filtroTexto, $idUsuario)
    {
        return Necesidad::select('necesidad.*', 'categoriaNecesidad.*')
            ->where("necesidad.idUsuario",$idUsuario)
            ->where(function ($query) use ($filtroTexto) {
                $query->where("descripcionNecesidad",'like', '%' . $filtroTexto . '%')
                      ->orWhere("nombreCategoria",'like', '%' . $filtroTexto . '%')
                      ->orWhere("razonSocial",'like', '%' . $filtroTexto . '%');
            })
            ->join('categoriaNecesidad', 'categoriaNecesidad.idCategoria', '=', 'necesidad.idCategoriaNecesidad')    
            ->join('organizacion', 'organizacion.idUsuario', '=', 'necesidad.idUsuario')    
            ->take(2)->get();
    }

    //BUSCAR NECESIDAD POR CATEGORIA
    public static function buscarNecesidadPorCategoria($filtroTexto, $idUsuario)
    {
        return Necesidad::where("idUsuario",$idUsuario)
            ->where(function ($query) use ($filtroTexto) {
                $query->where("nombreCategoria",'like', '%' . $filtroTexto . '%');
            })
            ->join('categoriaNecesidad', 'categoriaNecesidad.idCategoria', '=', 'necesidad.idCategoriaNecesidad')    
            ->take(2)->get();
    }

    public static function getNecesidad($idNecesidad)
    {
        return Necesidad::find($idNecesidad);
    }

    public function categoria()
    {
        return $this->belongsTo('App\Models\CategoriaNecesidad','idCategoriaNecesidad','idCategoria');
    }

    public function colaboraciones()
    {
        return $this->hasMany('App\Models\Colaboracion','idNecesidad','idNecesidad');
    }

}


