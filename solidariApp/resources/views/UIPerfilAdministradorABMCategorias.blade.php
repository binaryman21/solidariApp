 <!-- Modal -->
 <div class="modal fade" tabindex="-1" data-backdrop="static" role="dialog" id="modalABMCategorias">
     <div class="modal-dialog" role="document">
         <div class="modal-content">
             <div class="modal-header bg-primary text-white">
                 <h5 class="modal-title" id="exampleModalLabel">ABM Categorias</h5>
                 <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                     <span aria-hidden="true">&times;</span>
                 </button>
             </div>
             <form action="">
                 <div class="modal-body">
                     <div class="form-group mb-3">
                         <label for="seleccionCategoria">Selecciona la categoria</label>
                         <select id="seleccionCategoria" class="form-control" required>
                             <option value="0" selected class="font-weight-bold">Nueva Categoria</option>
                            <!--Las categorias se rellenan por JS-->
                         </select>
                         <span class="error text-danger" id="errorCategoria"> </span>
                     </div>
                     <label for="idCategoria">ID</label>
                     <div class="form-row">
                         <div class="col-mb-6 w-50 mb-3">
                             <input type="text" class="form-control" id="idCategoria" placeholder="ID" readonly>
                             <span class="error text-danger" id="errorID"> </span>
                         </div>
                     </div>
                     <label for="nombreCategoria">Nombre de la Categoria</label>
                     <div class="form-row">
                         <div class="col-9 col-md-6 mb-3">
                             <input type="text" class="form-control" id="nombreCategoria" placeholder="Nombre de la Categoria" required>
                             <span class="error text-danger" id="errorNombre"> </span>
                         </div>
                     </div>
                     <div class="form-group mb-3">
                         <label for="seleccionPrioridad">Selecciona la prioridad</label>
                         <select id="seleccionPrioridad" class="form-control" required>
                             <option value="0" selected class="font-weight-bold">Seleccione Prioridad</option>
                             <option value="1"  class="font-weight-bold">Alta</option>
                             <option value="2"  class="font-weight-bold">Media</option>
                             <option value="3"  class="font-weight-bold">Baja</option>
                         </select>
                         <span class="error text-danger" id="errorPrioridad"> </span>
                     </div>

                     <div class="form-group mb-3">
                         <label for="seleccionEstado">Estado</label>
                         <select id="seleccionEstado" class="form-control" disabled required>
                             <option value="2"  class="font-weight-bold">Estado</option>
                             <option value="1"  selected class="font-weight-bold">Habilitado</option>
                             <option value="0"  class="font-weight-bold">Deshabilitado</option>
                         </select>
                         <span class="error text-danger" id="errorEstado"> </span>
                     </div>

                     <div class="modal-footer row">
                         <button type="button" id="btnDeshabilitar" class="btn btn btn-danger d-none">Deshabilitar</button>
                         <button type="button" id="btnHabilitar" class="btn btn btn-success d-none">Habilitar</button>
                         <button type="button" id="btnAgregar" class="btn btn-primary">Agregar</button>
                         <button type="button" id="btnModificar" class="btn btn-primary d-none">Modificar</button>
                         <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
                     </div>
                 </div>
             </form>
         </div>
     </div>
 </div>