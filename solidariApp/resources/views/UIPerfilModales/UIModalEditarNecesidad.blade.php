<!-- Modal -->
<div class="modal fade" tabindex="-1" data-backdrop="static" role="dialog" id="modalEditarNecesidad">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="mr-2">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true" class="">&times;</span>
                </button>
             </div>
             <form action="">
                <div class="modal-body">
                    <div class="form-group" >
                        <label for="slctCategoria">Categoría de la Necesidad</label>
                        <select name="slctCategoria" id="slctCategoria" class="form-control">
                            <option value="">Alimentos</option>
                            <option value="">Servicios</option>
                            <option value="">Ropa</option>
                            <option value="">Dinero</option>
                            <option value="">Limpieza</option>
                            <option value="">Otros</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="txtDescripcion">Necesito:</label>
                        <textarea name="txtDescripcion" id="txtDescripcion" class="form-control" cols="30" rows="8"></textarea>
                    </div>
                    <div class="form-group">
                        <label for="inpCantidad">Cantidad:</label>
                        <input type="number" name="inpCantidad" id="inpCantidad" class="form-control" min="0">
                    </div>
                    <div class="form-group">
                        <label for="inpFechaLimite">Fecha limite:</label>
                        <input type="date" name="inpFechaLimite" id="inpFechaLimete" class="form-control">
                    </div>
                    <br>
                    <div class="d-flex justify-content-between">
                        <button class="btn btn-no-border text-danger" id="btnEliminarNecesidad">
                            <svg width="2em" height="2em" viewBox="0 0 16 16" class="bi bi-trash-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5a.5.5 0 0 0-1 0v7a.5.5 0 0 0 1 0v-7z"/>
                            </svg>
                        </button>
                        <button class="btn btn-primary" id="btnGuardarCambiosNecesidad">Guardar</button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</div>
