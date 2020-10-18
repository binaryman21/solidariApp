<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProvinciaController;
/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/
Route::get('/', function(){return view('UIPrincipal');})->name('UIPrincipal');
Route::get('/colaborador', function(){return view('UIPerfilColaborador');})->name('UIColaborador');
Route::get('/listarProvincias', 'App\Http\Controllers\ProvinciaController@listarProvincias')->name('provincia');
Route::get('/listarTiposOrganizaciones', 'App\Http\Controllers\ProvinciaController@listarTipoOrganizaciones')->name('provincia');





