<!-- Modal -->
<div class="modal fade" id="modalCalificar" tabindex="-1" role="dialog" aria-labelledby="modalCalificarLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="modalCalificarLabel">Calificar</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <form action="">
                <h4 class = "text-center">Calificando a</h4>
                <div id = "usuarioCalificado"></div>
                <h4 class = "text-center">por su colaboración en</h4>
                <div id = "necesidadCalificada"></div>
                 <div class="modal-body text-center">

                    <p>¿Se concreto la ayuda?</p>
                    <div class="form-check form-check-inline">
                        <input class="form-check-input" type="radio" name="radioConcretoAyuda" id="siConcreto" value="1" checked>
                        <label class="form-check-label" for="siConcreto"><i class="far fa-check-circle"></i></label>
                    </div>
                    <div class="form-check form-check-inline">
                        <input class="form-check-input" type="radio" name="radioConcretoAyuda" id="noConcreto" value="0">
                        <label class="form-check-label" for="noConcreto"><i class="far fa-times-circle"></i></label>
                    </div>
                    <div class="form-group mt-4">
                        <label for="cantidadRecibida">Cantidad recibida</label>
                        <input class="form-control col-6 offset-3" type="number" id="cantidadRecibida">
                        <span class="text-danger" id="errorCantidadRecibida"></span>
                    </div>
                    <p class="mt-4">¿Como fue el trato recibido?</p>
                    <div class="form-check form-check-inline">
                        <input class="form-check-input" type="radio" name="radioTrato" id="tratoMalo" value="1">
                        <label class="form-check-label" for="tratoMalo"><i class="far fa-frown"></i></label>
                    </div>
                    <div class="form-check form-check-inline">
                        <input class="form-check-input" type="radio" name="radioTrato" id="tratoRegular" value="2">
                        <label class="form-check-label" for="tratoRegular"><i class="far fa-meh"></i></label>
                    </div>
                    <div class="form-check form-check-inline">
                        <input class="form-check-input" type="radio" name="radioTrato" id="tratoBueno" value="3" checked>
                        <label class="form-check-label" for="tratoBueno"><i class="far fa-smile-beam"></i></label>
                    </div>
                    <div class="form-group mt-4">
                        <label for="textoComentarios">Comentarios</label>
                        <textarea class="form-control" id="textoComentarios" rows="5" required></textarea>
                        <span class="text-danger" id="errorTextoComentarios"></span>
                    </div>
                </div>
                <div class="modal-footer justify-content-between">
                    <button type="button" class="btn btn-lg btn-outline-danger" data-toggle="modal" href="#modalReportar" data-dismiss="modal">Reportar</button>
                    <button type="submit" class="btn btn-lg btn-primary" id = "btnEnviarCalificacion">Calificar</button>
                </div>
            </form>
        </div>
    </div>
</div>
