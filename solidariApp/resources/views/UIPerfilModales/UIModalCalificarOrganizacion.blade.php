<!-- Modal -->
<div class="modal fade" id="modalCalificarOrganizacion" tabindex="-1" role="dialog" aria-labelledby="modalCalificarOrganizacionLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="modalCalificarOrganizacionLabel">Calificar a esta organizacion</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <form action="">
                <div class="modal-body text-center">    
                    <p class="mt-4">¿Como fue el trato recibido?</p>
                    <div class="form-check form-check-inline">
                        <input class="form-check-input" type="radio" name="radioTratoOrg" id="tratoMalo" value="1">
                        <label class="form-check-label" for="tratoMalo"><i class="far fa-frown"></i></label>
                    </div>
                    <div class="form-check form-check-inline">
                        <input class="form-check-input" type="radio" name="radioTratoOrg" id="tratoRegular" value="2">
                        <label class="form-check-label" for="tratoRegular"><i class="far fa-meh"></i></label>
                    </div>
                    <div class="form-check form-check-inline">
                        <input class="form-check-input" type="radio" name="radioTratoOrg" id="tratoBueno" value="3" checked>
                        <label class="form-check-label" for="tratoBueno"><i class="far fa-smile-beam"></i></label>
                    </div>
                    <div class="form-group mt-4">
                        <label for="textoComentariosOrg">Comentarios</label>
                        <textarea class="form-control" id="textoComentariosOrg" rows="5" required></textarea>
                    </div>
                </div>
                <div class="modal-footer justify-content-between">
                    <button type="button" class="btn btn-lg btn-outline-danger" data-toggle="modal" href="#modalReportar" data-dismiss="modal">Reportar</button>
                    <button type="submit" class="btn btn-lg btn-primary" id = "btnEnviarCalificacionOrganizacion">Calificar</button>
                </div>
            </form>
        </div>
    </div>
</div>
