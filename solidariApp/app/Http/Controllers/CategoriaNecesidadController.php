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
        if(UsuarioController::tienePermisoPara("registrarCategoria"))
        {
            $datosCategoriaNueva = json_decode($request->getContent());

            /*validaciones*/
            if (is_numeric($datosCategoriaNueva->nombreCategoria)){
                return response()->json([
                    'resultado' => 0,
                    'message' => 'el nombre de la categoria no puede ser un numero'
                ]);
            }

            if (!is_numeric($datosCategoriaNueva->idPrioridad) || $datosCategoriaNueva->idPrioridad <= 0 || $datosCategoriaNueva->idPrioridad > 3  ){
                return response()->json([
                    'resultado' => 0,
                    'message' => 'el id de la prioridad debe ser numerico'
                ]);
            }

            try
            {
                DB::beginTransaction();
                $nuevaCategoria = new CategoriaNecesidad;
                $nuevaCategoria->nombreCategoria = $datosCategoriaNueva->nombreCategoria;
                $nuevaCategoria->idPrioridad = $datosCategoriaNueva->idPrioridad;
                $nuevaCategoria->activo = 1;
                $nuevaCategoria->save();

                DB::commit();
            }
            catch (\Exception $e)
            {
                return response()->json([
                    'resultado' => 0,
                    'message' => $e->getMessage()
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
        return response()->json([
            'resultado' => 1,
            'message' => "alta exitosa!"

        ]);
    }

    public function modificarCategoria(Request $request)
    {
        if(UsuarioController::tienePermisoPara("editarCategoria"))
        {
            try
            {
                DB::beginTransaction();

                $datosCategoriaNueva = json_decode($request->getContent());

                $categoria = CategoriaNecesidad::find($datosCategoriaNueva->idCategoria);

                $categoria->nombreCategoria = $datosCategoriaNueva->nombreCategoria;
                $categoria->idPrioridad = $datosCategoriaNueva->idPrioridad;
                $categoria->activo = $datosCategoriaNueva->activo;
                $categoria->save();

                DB::commit();
            }
            catch (\Exception $e)
            {
                return response()->json([
                    'resultado' => 0,
                    'message' => $e->getMessage()
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
        return response()->json([
            'resultado' => 1,
            'message' => "actualizacion exitosa!"

        ]);
    }


}
