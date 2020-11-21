<!-- Modal -->
<div class="modal fade" tabindex="-1" data-backdrop="static" role="dialog" id="modalVisualizarDenuncia">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header bg-secondary text-white justify-content-between">
                <h5 class="modal-title" id="exampleModalLabel">Detalle de denuncia</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true" class="text-white">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <div>Codigo: <span id="spnCodigoDenuncia"></span></div>
                <hr/>
                <div>Fecha: <span id="spnFechaDenuncia"></span></div>
                <hr/>
                <div>Motivo: <span id="spnMotivoDenuncia"></span></div>
                <hr/>
                <div class="d-flex flex-wrap">Denunciante: <span id="spnNombreDenunciante"></span><span id="spnDenunciante" class="d-none"></span>
                    <a class="ml-auto" id="verPerfilDenunciante" href="#">ver perfil</a>
                </div>
                <hr/>
                <div class="d-flex flex-wrap">Denunciado: <span id="spnNombreDenunciado"></span><span id="spnDenunciado" class="d-none"></span>
                    <a class="ml-auto" id="verPerfilDenunciado" href="#">ver perfil</a>
                </div>
                <hr/>
                <div>Descripción: </div><br>
                <span id="spnDescripcionDenuncia"></span>
                <div class="modal-footer">
                    <button class="btn btn-danger" id="btnConfirmarDenuncia">Bloquear</button>
                </div>
            </div>
        </div>
    </div>
</div>

