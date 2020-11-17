<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Denuncia;
use App\Models\Usuario;
use Illuminate\Support\Carbon;


class DenunciaController extends Controller
{
    //
    public function altaDenuncia( Request $request ){
        try{
            $datosReporte = json_decode($request->getContent());
            $denuncia = new Denuncia;
            $denuncia->idMotivoDenuncia = $datosReporte->motivo;
            $denuncia->fechaDenuncia = $datosReporte->fecha;
            $denuncia->idDenunciante = $datosReporte->idDenunciante;
            $denuncia->idDenunciado = $datosReporte->idDenunciado;
            $denuncia->descripcionDenuncia = $datosReporte->descripcion;
            $denuncia->save();
            return response()->json([
                'resultado' => 1,
                'message' => 'denuncia realizada'
            ]);
        }
        catch (\Exception $e)
        {
            return response()->json([
                'resultado' => 0,
                'message' => $e->getMessage(),
            ]);
        }
    }

    public function getDenuncias(){
        $denuncias = Denuncia::getDenuncias();
        foreach ($denuncias as $key => $denuncia) {
            $denuncia['denunciante'] = Usuario::getUsuario( $denuncia->idDenunciante );
            $denuncia['denunciado'] = Usuario::getUsuario( $denuncia->idDenunciado );
        }
        return response()->json([
            'denuncias' => $denuncias
        ]);
    }

    public function confirmarDenuncia( Request $request ){
        try {
            Denuncia::confirmarDenuncia( $request->idDenuncia );
            Usuario::bloquearUsuario( $request->idDenunciado );
            return response()->json([
                'resultado' => 1,
                'message'=> 'usuario bloqueado'
            ]);
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
