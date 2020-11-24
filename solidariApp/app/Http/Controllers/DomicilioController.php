<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Domicilio;
class DomicilioController extends Controller
{
    public function listarDomiciliosUsuario($idUsuario)
    {
        return response()->json([
            'domicilios' => Domicilio::listarDomiciliosUsuario($idUsuario)
        ]);
    }

    public function actualizarDomicilio(Request $request)
    {
        $datos = json_decode($request->getContent());

        $domicilio = Domicilio::find($datos->idDomicilio);

        if( $datos->calle == ''){

            return response()->json([
                'resultado' => 0,
                'failOn' => 'calle',
                'message' => "Ingrese una calle"
            ]);
        }

        if(strlen($datos->calle) < 3){
            return response()->json([
                'resultado' => 0,
                'failOn' => 'calle',
                'message' => "Ingrese una calle valida"
            ]);
        }

        if(strlen($datos->calle) > 50){
            return response()->json([
                'resultado' => 0,
                'failOn' => 'calle',
                'message' => "Maximo 50 caracteres"
            ]);
        }

        if(!preg_match('/^[A-Za-z0-9\s]+$/', $datos->calle)){

            return response()->json([
                'resultado' => 0,
                'failOn' => 'calle',
                'message' => "La calle tiene caracteres especiales"
            ]);
        }

        $domicilio->calle = $datos->calle;

        if(!preg_match('/[0-9]/', $datos->numero)){

            return response()->json([

                'resultado' => 0,
                'failOn' => 'numero',
                'message' => 'La altura no es valida'
            ]);
        }

        $domicilio->numero = $datos->numero;

        if(isset($datos->piso)){

            if(isset($datos->depto) && $datos->depto !=''){

                if(!preg_match('/[0-9]/', $datos->piso)){

                    return response()->json([

                        'resultado' => 0,
                        'failOn' => 'piso',
                        'message' => 'El piso debe ser numerico'
                    ]);
                }

                $domicilio->piso = $datos->piso;
                $domicilio->depto = $datos->depto;
            }
            else{

                return response()->json([
                    'resultado' => 0,
                    'failOn' => 'depto',
                    'message' => "Se requiere el depto"
                ]);
            }
        }

        if(isset($datos->latitud, $datos->longitud)){

            $domicilio->latitud = $datos->latitud;
            $domicilio->longitud = $datos->longitud;
        }

        if($datos->idLocalidad>0 && $datos->idLocalidad < 2382){

            $domicilio->save();

            return response()->json([
                'resultado' => 1
            ]);
        }
    }
}