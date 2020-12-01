<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Organizacion extends Model
{
    use HasFactory;
    protected $table = 'organizacion';
    protected $primaryKey = 'idUsuario';
    public $timestamps = false;

    public static function getOrganizacion($idUsuario)
    {
        return Organizacion::join('usuario', 'organizacion.idUsuario', '=', 'usuario.idUsuario')
                    ->join('tipoOrganizacion', 'tipoOrganizacion.idTipoOrganizacion', '=', 'organizacion.idTipoOrganizacion')
                    ->where('organizacion.idUsuario',$idUsuario)
                    ->first();
    }

    public static function getOrganizaciones( $datosFiltros )
    {
        $desde = $datosFiltros->desde;
        $hasta = $datosFiltros->hasta;
        return Organizacion::join('usuario', 'organizacion.idUsuario', '=', 'usuario.idUsuario')
            ->join('tipoOrganizacion', 'tipoOrganizacion.idTipoOrganizacion', '=', 'organizacion.idTipoOrganizacion')    
            ->join('domicilio', 'domicilio.idUsuario', '=', 'organizacion.idUsuario')
            ->where('usuario.idEstadoUsuario','=',1)
            // ->leftJoin('necesidad', 'organizacion.idUsuario', '=', 'necesidad.idUsuario')->first()
            // ->distinct('usuario.idUsuario')
            // ->skip( $desde )
            // ->take( $hasta )
            ->get();
    }

    public static function traerOrganizacion($idOrganizacion)
    {
        return Organizacion::join('usuario', 'organizacion.idUsuario', '=', 'usuario.idUsuario')
            ->join('tipoOrganizacion', 'tipoOrganizacion.idTipoOrganizacion', '=', 'organizacion.idTipoOrganizacion')    
            ->join('domicilio', 'domicilio.idUsuario', '=', 'organizacion.idUsuario')    
            ->where('organizacion.idUsuario','=',$idOrganizacion)    
            ->where('usuario.idEstadoUsuario','=',1)    
            ->get();
    }

    public static function buscarOrganizacionesPorUbicacion( $datosFiltros )
    {
        $desde = $datosFiltros->desde;
        $hasta = $datosFiltros->hasta;
        $ubicacion = $datosFiltros->filtro;
        return Organizacion::join('usuario', 'organizacion.idUsuario', '=', 'usuario.idUsuario')
            ->join('tipoOrganizacion', 'tipoOrganizacion.idTipoOrganizacion', '=', 'organizacion.idTipoOrganizacion')    
            ->join('domicilio', 'domicilio.idUsuario', '=', 'organizacion.idUsuario')    
            ->join('localidad', 'domicilio.idLocalidad', '=', 'localidad.idLocalidad')    
            ->where('domicilio.calle', 'like', '%' . $ubicacion . '%')
            ->where('usuario.idEstadoUsuario','=',1)    
            ->orWhere('localidad.nombreLocalidad', 'like', '%' . $ubicacion . '%')
            // ->skip( $desde )
            // ->take( $hasta )
            ->get();
    }
}
