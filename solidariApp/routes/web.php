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
Route::get('/colaborador/visitante', function(){return view('UIPerfilColaboradorVisitante');})->name('UIColaboradorVisitante');
Route::get('/organizacion/visitante', function(){return view('UIPerfilOrganizacionVisitante');})->name('UIOrganizacionVisitante');

Route::get('/organizacion', function()
{
    /*session_start();
    if(!isset($_SESSION['usuario']))
    {
        return redirect('/');
    }
    else
    {*/
        return view('UIPerfilOrganizacion');
   /* }*/

})->name('UIOrganizacion');

Route::get('/administrador', function(){return view('UIPerfilAdministrador');})->name('UIAdministracion');
Route::get('/administrador/reportes', function(){return view('UIReporteDenuncias');})->name('UIReporteDenuncias');
Route::get('/contacto', function(){return view('UIContacto');})->name('UIContacto');
Route::get('/listarProvincias', 'App\Http\Controllers\ProvinciaController@listarProvincias')->name('provincia');
Route::get('/listarTiposOrganizaciones', 'App\Http\Controllers\ProvinciaController@listarTipoOrganizaciones')->name('provincia');

Route::get('/listarProvincias', 'App\Http\Controllers\ProvinciaController@listarProvincias')->name('listarProvincias');
Route::get('/listarLocalidades/{idProvincia}', 'App\Http\Controllers\ProvinciaController@listarLocalidades')->name('listarLocalidades');
Route::get('/listarTipoOrganizaciones', 'App\Http\Controllers\TipoOrganizacionController@listarTipoOrganizaciones')->name('listarTipoOrganizaciones');
Route::get('/listarTipoLinks', 'App\Http\Controllers\TipoLinkController@listarTipoLinks')->name('listarTipoLinks');
Route::get('/listarCategoriasNecesidad', 'App\Http\Controllers\CategoriaNecesidadController@listarCategoriasNecesidad')->name('listarCategoriasNecesidad');

Route::post('/registrarColaborador', 'App\Http\Controllers\ColaboradorController@registrarColaborador')->name('registrarColaborador');
Route::post('/registrarOrganizacion', 'App\Http\Controllers\OrganizacionController@registrarOrganizacion')->name('registrarOrganizacion');
Route::post('/login', 'App\Http\Controllers\UsuarioController@login')->name('login');
Route::post('/logOut', 'App\Http\Controllers\UsuarioController@logout')->name('logout');
Route::post('/isUser', 'App\Http\Controllers\UsuarioController@isUser')->name('isUser');
Route::get('/isLoggedIn', 'App\Http\Controllers\UsuarioController@isLoggedIn')->name('isLoggedIn');
Route::post('/registrarUsuario', 'App\Http\Controllers\UsuarioController@registrarUsuario')->name('registrarUsuario');
Route::post('/registrarNecesidad', 'App\Http\Controllers\NecesidadController@registrarNecesidad')->name('registrarNecesidad');
Route::get('/getOrganizacion/{idUsuario}', 'App\Http\Controllers\OrganizacionController@getOrganizacion')->name('getOrganizacion');
Route::get('/getColaborador/{idUsuario}', 'App\Http\Controllers\ColaboradorController@getColaborador')->name('getColaborador');
Route::get('/listarDomiciliosUsuario/{idUsuario}', 'App\Http\Controllers\DomicilioController@listarDomiciliosUsuario')->name('listarDomiciliosUsuario');
Route::get ('/listarTelefonosUsuario/{idUsuario}', 'App\Http\Controllers\TelefonoController@listarTelefonosUsuario')->name('listarTelefonosUsuario');
Route::get('/listarNecesidades/{idUsuario}', 'App\Http\Controllers\NecesidadController@listarNecesidades')->name('listarNecesidades');
Route::get('/getNecesidad/{idNecesidad}', 'App\Http\Controllers\NecesidadController@getNecesidad')->name('getNecesidad');
Route::post('/bajaNecesidad','App\Http\Controllers\NecesidadController@bajaNecesidad')->name('bajaNecesidad');
Route::post('/updateNecesidad','App\Http\Controllers\NecesidadController@updateNecesidad')->name('updateNecesidad');
Route::post('/actualizarDescripcion', 'App\Http\Controllers\OrganizacionController@actualizarDescripcion')->name('listarNecesidades');
Route::post('/registrarTelefono', 'App\Http\Controllers\TelefonoController@registrarTelefono')->name('listarNecesidades');
Route::post('/eliminarTelefono', 'App\Http\Controllers\TelefonoController@eliminarTelefono')->name('listarNecesidades');
Route::post('/actualizarDomicilio', 'App\Http\Controllers\DomicilioController@actualizarDomicilio')->name('listarNecesidades');





