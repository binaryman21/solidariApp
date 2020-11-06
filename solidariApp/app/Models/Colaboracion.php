<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Colaboracion extends Model
{
    protected $table = 'colaboraciones';
    protected $primaryKey = 'idColaboracion';
    public $timestamps = false;
    use HasFactory;
}
