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
        try{
            session_start();
            if(isset($_SESSION['usuario']))
            {
                $datos = json_decode($request->getContent());
                $domicilio = Domicilio::find($datos->idDomicilio);

                if(isset($datos->calle)){

                    if($datos->calle == ''){

                        return response()->json([
                            'resultado' => 0,
                            'message' => "Ingrese una calle"
                        ]);
                    }
                    if(strlen($datos->calle) < 3){

                        return response()->json([
                            'resultado' => 0,
                            'message' => "Ingrese una calle valida"
                        ]);
                    }
                    if(strlen($datos->calle) > 50){

                        return response()->json([
                            'resultado' => 0,
                            'message' => "Maximo 50 caracteres"
                        ]);
                    }
                    if(!preg_match('/^[A-Za-z0-9\s]+$/', $datos->calle)){
            
                        return response()->json([
                            'resultado' => 0,
                            'message' => "La calle tiene caracteres especiales"
                        ]);
                    }
                    
                    $domicilio->calle = $datos->calle;
                }

                if(isset($datos->numero)){

                    if(!preg_match('/[0-9]/', $datos->numero)){

                        return response()->json([

                            'resultado' => 0,
                            'message' => 'La altura no es valida'
                        ]);
                    }

                    $domicilio->numero = $datos->numero;
                }

                if(isset($datos->piso)){

                    if(isset($datos->depto)){

                        if($datos->piso!= '' && !preg_match('/[0-9]/', $datos->piso)){

                            return response()->json([

                                'resultado' => 0,
                                'message' => 'El piso debe ser numerico'
                            ]);
                        }

                        $domicilio->piso = $datos->piso;
                        $domicilio->depto = $datos->depto;

                    }
                    else{

                        return response()->json([
                            'resultado' => 0,
                            'message' => "Se requiere el depto"
                        ]);
                    }
                }

                if(isset($datos->latitud, $datos->longitud)){

                    $domicilio->latitud = $datos->latitud;
                    $domicilio->longitud = $datos->longitud;

                }

                if(isset($datos->idLocalidad)){
                    
                    if($datos->idLocalidad>0 && $datos->idLocalidad < 2382){

                        $domicilio->idLocalidad = $datos->idLocalidad;
                    }
                    else return response()->json(['resultado' => 0, 'message'=> 'No existe la localidad']);
                }

                $domicilio->save();

                return response()->json([
                    'resultado' => 1
                ]);
            }
            else
            {
                return response()->json([
                    'resultado' => 0,
                    'message' => 'No estas logueado'
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
