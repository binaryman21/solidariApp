<!-- Modal -->
<div class="modal fade" id="modalReportar" tabindex="-1" role="dialog" aria-labelledby="modalReportarLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="modalReportarLabel">Reportar</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <form action="">
                <div class="modal-body text-center">
                    <div class="form-group">
                        <label for="fechaIncidente">Fecha del incidente</label>
                        <input type="date" class="form-control" id="fechaIncidente" required>
                        <span class="error text-danger" id ="errorFechaIncidente"></span>
                    </div>
                    <div class="form-group">
                        <label for="motivoReporte">Motivo del reporte</label>
                        <select class="form-control" id="motivoReporte" required>

                        </select>
                        <span class="error text-danger" id ="errorMotivoReporte"></span>
                    </div>
                    <div class="form-group">
                        <label for="textoDescripcion">Descripcion</label>
                        <textarea class="form-control" id="textoDescripcion" rows="5" required></textarea>
                        <span class="error text-danger" id ="errorTextoDescripcion"></span>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="submit" class="btn btn-block btn-outline-danger" id="btnConfirmarReporte">Reportar</button>
                </div>
            </form>
        </div>
    </div>
</div>
