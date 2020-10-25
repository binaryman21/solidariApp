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
}
