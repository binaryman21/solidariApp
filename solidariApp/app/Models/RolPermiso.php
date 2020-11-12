<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RolPermiso extends Model
{
    protected $table = 'permisosRoles';
    protected $primaryKey = 'idPermisoRol';
    public $timestamps = false;
    use HasFactory;
}


