<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Insignia extends Model
{
    protected $table = 'insignia';
    protected $primaryKey = 'idInsignia';
    public $timestamps = false;
    use HasFactory;

    public static function listarInsignias()
    {
        return Insignia::All();
    }

}
