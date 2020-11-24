<?php

namespace App\Http\Controllers;

use App\Models\CategoriaNecesidad;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class CategoriaNecesidadController extends Controller
{
    public function listarCategoriasNecesidad()
    {

        $categoriaNecesidad = CategoriaNecesidad::listarCategoriasNecesidad();

        return response()->json([
            'CategoriasNecesidad' => $categoriaNecesidad
        ]);
    }

    public function nuevaCategoriaNecesidad(Request $request)
    {
        try
            {
            if(UsuarioController::tienePermisoPara("registrarCategoria"))
            {
                $datosCategoriaNueva = json_decode($request->getContent());

                /*validaciones*/
                if( $datosCategoriaNueva->nombreCategoria == '' ){
                    return response()->json([
                        'resultado' => 0,
                        'message' => 'debe ingresar un nombre para la categoria'
                    ]);
                }
                else if( strlen($datosCategoriaNueva->nombreCategoria) < 3 ){
                    return response()->json([
                        'resultado' => 0,
                        'message' => 'el nombre de la categoria debe tener al menos 3 caracteres'
                    ]);
                }
                else if (is_numeric($datosCategoriaNueva->nombreCategoria)){
                    return response()->json([
                        'resultado' => 0,
                        'message' => 'el nombre de la categoria no puede ser un numero'
                    ]);
                }
                else if (!is_numeric($datosCategoriaNueva->idPrioridad) || $datosCategoriaNueva->idPrioridad <= 0 || $datosCategoriaNueva->idPrioridad > 3  ){
                    return response()->json([
                        'resultado' => 0,
                        'message' => 'el id de la prioridad debe ser numerico'
                    ]);
                }
                else{
                    DB::beginTransaction();
                    $nuevaCategoria = new CategoriaNecesidad;
                    $nuevaCategoria->nombreCategoria = $datosCategoriaNueva->nombreCategoria;
                    $nuevaCategoria->idPrioridad = $datosCategoriaNueva->idPrioridad;
                    $nuevaCategoria->activo = 1;
                    $nuevaCategoria->save();
                    DB::commit();
                    return response()->json([
                        'resultado' => 1,
                        'message' => "categoria creada"
                    ]);
                }
            }
            else
            {
                return response()->json([
                    'resultado' => 0,
                    'message' => "ACCION NO PERMITIDA"

                ]);
            }
            
        }
        catch (\Exception $e)
            {
            return response()->json([
                'resultado' => 0,
                'message' => $e->getMessage()
            ]);
        }
    }

    public function modificarCategoria(Request $request)
    {
        try
            {
            if(UsuarioController::tienePermisoPara("editarCategoria"))
            {
                $datosCategoriaNueva = json_decode($request->getContent());
                /*validaciones*/
                if( $datosCategoriaNueva->nombreCategoria == '' ){
                    return response()->json([
                        'resultado' => 0,
                        'message' => 'debe ingresar un nombre para la categoria'
                    ]);
                }
                else if( strlen($datosCategoriaNueva->nombreCategoria) < 3 ){
                    return response()->json([
                        'resultado' => 0,
                        'message' => 'el nombre de la categoria debe tener al menos 3 caracteres'
                    ]);
                }
                else if (is_numeric($datosCategoriaNueva->nombreCategoria)){
                    return response()->json([
                        'resultado' => 0,
                        'message' => 'el nombre de la categoria no puede ser un numero'
                    ]);
                }
                else if (!is_numeric($datosCategoriaNueva->idPrioridad) || $datosCategoriaNueva->idPrioridad <= 0 || $datosCategoriaNueva->idPrioridad > 3  ){
                    return response()->json([
                        'resultado' => 0,
                        'message' => 'seleccione una prioridad'
                    ]);
                }
                else{
                    DB::beginTransaction();

                    $categoria = CategoriaNecesidad::find($datosCategoriaNueva->idCategoria);

                    $categoria->nombreCategoria = $datosCategoriaNueva->nombreCategoria;
                    $categoria->idPrioridad = $datosCategoriaNueva->idPrioridad;
                    $categoria->activo = $datosCategoriaNueva->activo;
                    $categoria->save();
                    DB::commit();
                    return response()->json([
                        'resultado' => 1,
                        'message' => "categoria actualizada"
                    ]);
                }
            }
            else
            {
                return response()->json([
                    'resultado' => 1,
                    'message' => "ACCION NO PERMITIDA"

                ]);
            }
            
        }
        catch (\Exception $e)
        {
            return response()->json([
                'resultado' => 0,
                'message' => $e->getMessage()
            ]);
        }
    }

}
