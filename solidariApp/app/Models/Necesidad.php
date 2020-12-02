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
        return Necesidad::select('necesidad.*', 'categoriaNecesidad.*', 'estadoNecesidad.descripcionEstado')
        ->where("idUsuario",$idUsuario)
        ->join('categoriaNecesidad', 'categoriaNecesidad.idCategoria', '=', 'necesidad.idCategoriaNecesidad')
        ->join('estadoNecesidad', 'estadoNecesidad.idEstadoNecesidad', '=', 'necesidad.estadoNecesidad')    
        ->withCount('colaboraciones')
        ->orderBy('necesidad.estadoNecesidad', 'ASC')
        ->orderBy('fechaLimiteNecesidad', 'ASC')
        ->orderBy('categoriaNecesidad.idPrioridad', 'ASC')
        ->get();
    }

    public static function listarNecesidadesPantallaPrincipal( $idUsuario )
    {
        return Necesidad::where("idUsuario",$idUsuario)
        ->where("necesidad.estadoNecesidad",'<>',3)
        ->join('categoriaNecesidad', 'categoriaNecesidad.idCategoria', '=', 'necesidad.idCategoriaNecesidad')
        ->join('estadoNecesidad', 'estadoNecesidad.idEstadoNecesidad', '=', 'necesidad.estadoNecesidad')    
        ->orderBy('necesidad.estadoNecesidad', 'ASC')
        ->orderBy('fechaLimiteNecesidad', 'ASC')
        ->orderBy('categoriaNecesidad.idPrioridad', 'ASC')
        ->take(3)
        ->get();
    }

    //BUSCAR NECESIDAD POR FILTRO DE TEXTO
    public static function buscarNecesidad($datosFiltros, $idUsuario)
    {
        $filtroTexto = $datosFiltros->filtro;
        
        return Necesidad::select('necesidad.*', 'categoriaNecesidad.*','estadoNecesidad.descripcionEstado')
            ->where("necesidad.idUsuario",$idUsuario)
            ->where("necesidad.estadoNecesidad",'<>',3)
            ->where(function ($query) use ($filtroTexto) {
                $query->where("descripcionNecesidad",'like', '%' . $filtroTexto . '%')
                      ->orWhere("nombreCategoria",'like', '%' . $filtroTexto . '%')
                      ->orWhere("razonSocial",'like', '%' . $filtroTexto . '%');
            })
            ->join('categoriaNecesidad', 'categoriaNecesidad.idCategoria', '=', 'necesidad.idCategoriaNecesidad')
            ->join('organizacion', 'organizacion.idUsuario', '=', 'necesidad.idUsuario')
            ->join('estadoNecesidad', 'estadoNecesidad.idEstadoNecesidad', '=', 'necesidad.estadoNecesidad')    
            ->orderBy('necesidad.estadoNecesidad', 'ASC')
            ->orderBy('fechaLimiteNecesidad', 'ASC')
            ->orderBy('categoriaNecesidad.idPrioridad', 'ASC')
            ->take(3)
            ->get();
    }

    //BUSCAR NECESIDAD POR CATEGORIA
    public static function buscarNecesidadPorCategoria($datosFiltros, $idUsuario)
    {
        $filtroTexto = $datosFiltros->filtro;

        return Necesidad::where("idUsuario",$idUsuario)
            ->where("necesidad.estadoNecesidad",'<>',3)
            ->where(function ($query) use ($filtroTexto) {
                $query->where("nombreCategoria",'like', '%' . $filtroTexto . '%');
            })
            ->join('categoriaNecesidad', 'categoriaNecesidad.idCategoria', '=', 'necesidad.idCategoriaNecesidad')
            ->join('estadoNecesidad', 'estadoNecesidad.idEstadoNecesidad', '=', 'necesidad.estadoNecesidad')    
            ->orderBy('necesidad.estadoNecesidad', 'ASC')
            ->orderBy('fechaLimiteNecesidad', 'ASC')
            ->orderBy('categoriaNecesidad.idPrioridad', 'ASC')
            ->take(3)
            ->get();
    }

    //TRAER NECESIDAD
    public static function traerNecesidad($idNecesidad)
    {
        return Necesidad::where("idNecesidad",$idNecesidad)
            ->join('categoriaNecesidad', 'categoriaNecesidad.idCategoria', '=', 'necesidad.idCategoriaNecesidad')    
            ->join('estadoNecesidad', 'estadoNecesidad.idEstadoNecesidad', '=', 'necesidad.estadoNecesidad')    
            // ->withCount('colaboraciones')
            ->orderBy('necesidad.estadoNecesidad', 'ASC')
            ->orderBy('fechaLimiteNecesidad', 'ASC')
            ->orderBy('categoriaNecesidad.idPrioridad', 'ASC')
            ->get();
    }

    public static function getNecesidad($idNecesidad)
    {
        return Necesidad::where('idNecesidad',$idNecesidad)
        ->join('estadoNecesidad', 'estadoNecesidad.idEstadoNecesidad', '=', 'necesidad.estadoNecesidad')   
        // ->withCount('colaboraciones') 
        ->first();
    }

    public static function completarNecesidades($idUsuario)
    {
        return Necesidad::where('idUsuario',$idUsuario)
                        ->update(['estadoNecesidad'=>'3']);
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


