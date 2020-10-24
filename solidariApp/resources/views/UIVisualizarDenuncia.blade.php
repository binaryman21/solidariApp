<!-- Modal -->
<div class="modal fade" tabindex="-1" data-backdrop="static" role="dialog" id="modalVisualizarDenuncia">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header bg-secondary text-white justify-content-between">
                <h5 class="modal-title" id="exampleModalLabel">Código de denuncia: <span id="spnCodDenuncia"></span></h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true" class="text-white">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <div>Fecha: <span id="spnFechaDenuncia"></span></div>
                <hr/>
                <div>Motivo: <span id="spnMotivoDenuncia"></span></div>
                <hr/>
                <div class="d-flex flex-wrap">Denunciante: <span id="spnDenunciante"></span>
                    <a class="ml-auto" href="#">ver perfil</a>
                </div>
                <hr/>
                <div class="d-flex flex-wrap">Denunciado: <span id="spnDenunciado"></span>
                    <a class="ml-auto" href="#">ver perfil</a>
                </div>
                <hr/>
                <div>Descripción:</div><br>
                <span class="spnDescripcionDenuncia">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Mollitia et at quaerat repellendus magni corrupti nulla doloremque aperiam atque eum!</span>
                <div class="modal-footer">
                    <button class="btn btn-danger" id="btnConfirmarDenuncia">Confirmar denuncia</button>
                </div>
            </div>
        </div>
    </div>
</div>

