<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CategoriaNecesidad extends Model
{
    use HasFactory;
    protected $table = 'categoriaNecesidad';
    protected $primaryKey = 'idCategoria';
    public $timestamps = false;

    public static function listarCategoriasNecesidad()
    {
        return CategoriaNecesidad::orderBy('categoriaNecesidad.idPrioridad', 'ASC')->get();

    }
    public static function getCategoria($idCategoria)
    {
        return CategoriaNecesidad::find($idCategoria);
    }
}
