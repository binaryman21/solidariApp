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
            DB::beginTransaction();

            $datosCategoriaNueva = json_decode($request->getContent());

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

        return response()->json([
            'resultado' => 1,
            'message' => "alta exitosa!"

        ]);
    }

    public function modificarCategoria(Request $request)
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

        return response()->json([
            'resultado' => 1,
            'message' => "actualizacion exitosa!"

        ]);
    }


}
