<?php

namespace App\Http\Controllers;

use App\Models\CategoriaNecesidad;
use Illuminate\Http\Request;
use App\Models\Necesidad;
use Illuminate\Support\Carbon;

class NecesidadController extends Controller
{
    public function registrarNecesidad(Request $request)
    {
        try
        {
            if(UsuarioController::tienePermisoPara("registrarNecesidad"))
            {
                $datosNecesidad = json_decode($request->getContent());
                $necesidad = new Necesidad;
                $necesidad->descripcionNecesidad = $datosNecesidad ->descripcionNecesidad;
                $necesidad->cantidadNecesidad = $datosNecesidad ->cantidadNecesidad;
                $necesidad->fechaLimiteNecesidad = $datosNecesidad ->fechaLimiteNecesidad;
                $necesidad->idCategoriaNecesidad = $datosNecesidad ->idCategoria;
                $necesidad->idUsuario = $datosNecesidad ->idUsuario;
                $necesidad->save();
                return response()->json([
                    'resultado' => 1,
                    'message' => 'registro exitoso',
                    'id' => $necesidad->idNecesidad
                ]);
            }
            else
            {
                return response()->json([
                    'resultado' => 0,
                    'message' => "ACCION NO PERMITIDA",
                    'id' => -1
                ]);
            }
        }
        catch (\Exception $e)
        {
            return response()->json([
                'resultado' => 0,
                'message' => $e->getMessage(),
                'id' => -1
            ]);
        }

    }
    public function listarCategorias()
    {
        return response()->json([
            'categorias' => CategoriaNecesidad::listarCategoriasNecesidad()
        ]);
    }

    public function listarNecesidades($idUsuario)
    {
        return response()->json([
            'necesidades' => Necesidad::listarNecesidades($idUsuario)
        ]);
    }

    public static function listarNecesidadesPantallaPrincipal($idUsuario)
    {
        return response()->json([
            'necesidades' => Necesidad::listarNecesidadesPantallaPrincipal($idUsuario)
        ]);
    }

    public static function buscarNecesidad($filtroTexto, $idUsuario)
    {
        return response()->json([
            'necesidades' => Necesidad::buscarNecesidad($filtroTexto, $idUsuario)
        ]);
    }

    public function getNecesidad($idNecesidad)
    {
        return response()->json([
            'necesidad' => Necesidad::getNecesidad($idNecesidad)
        ]);
    }

    public function necesidad($idOrganizacion, $idNecesidad)
    {
        // $necesidad = Necesidad::getNecesidad($idNecesidad);
        // return view('UIPrincipal')->with('idNecesidad',$idNecesidad);
        return view('UIPrincipal', compact('idOrganizacion','idNecesidad'));
    }

    public function updateNecesidad(Request $request)
    {
        try
        {
            if(UsuarioController::tienePermisoPara("editarNecesidad"))
            {
                $datosNecesidad = json_decode($request->getContent());

                $necesidad = Necesidad::find($datosNecesidad->idNecesidad);
                $necesidad->descripcionNecesidad = $datosNecesidad ->descripcionNecesidad;
                $necesidad->cantidadNecesidad = $datosNecesidad ->cantidadNecesidad;
                $necesidad->fechaLimiteNecesidad = $datosNecesidad ->fechaLimiteNecesidad;
                $necesidad->idCategoriaNecesidad = $datosNecesidad ->idCategoria;
                $necesidad->save();

                return response()->json([
                    'resultado' => 1,
                    'message' => 'registro exitoso'
                ]);
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

    public function bajaNecesidad(Request $request)
    {
        try
        {
            if(UsuarioController::tienePermisoPara("editarNecesidad"))
            {
                $fechaBaja = Carbon::now();
                $datosNecesidad = json_decode($request->getContent());

                $necesidad = Necesidad::find($datosNecesidad->idNecesidad);
                $necesidad->fechaBajaNecesidad = $fechaBaja;
                $necesidad->estadoNecesidad = 3;
                $necesidad->save();

                return response()->json([
                    'resultado' => 1,
                    'message' => 'La necesidad se ha eliminado'
                ]);
            }
            else
            {
                return response()->json([
                'resultado' => 0,
                'message' => 'ACCION NO PERMITIDA'
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


