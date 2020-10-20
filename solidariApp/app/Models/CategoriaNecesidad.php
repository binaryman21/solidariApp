<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CategoriaNecesidad extends Model
{
    use HasFactory;
    public $timestamps = false;
    protected $table = 'categoriaNecesidad';
    protected $primaryKey = 'idCategoriaNecesidad';
}
