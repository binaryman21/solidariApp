<!-- Modal detalle necesidad -->
<div class="modal fade" id="modalDetalleNecesidad" tabindex="-1" role="dialog" aria-labelledby="modalDetalleNecesidadLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="modalDetalleNecesidadLabel">Detalle de necesidad</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
            <div class="row">
                <div class="col-md-6">
                    <div class="card necesidad alimentos">
                        <div class="card-body">
                            <div class="container-fluid">
                                <div class="datosNecesidad">
                                    <p class="font-weight-bold">Alimentos</p>
                                    <p>Necesito fideos y arroz</p>
                                    <p>Cantidad: 10</p>
                                    <p>Fecha limite: no definida</p>
                                    <p>Estado: en proceso</p>
                                    <p>Colaboradores: 5</p>
                                </div>
                            </div>
                            <button type="button" class="btn btnColaborar btn-block btn-outline-primary mt-4" data-toggle="modal" data-target="#modalColaborar"><i class="far fa-handshake"></i>COLABORAR</button>
                        </div>

                    </div>

                </div>
                <div class="col-md-6">
                    <p class="lead">
                        Ayudando en esta necesidad <span>5</span> colaboradores.
                    </p>
                    <div class="busqueda mt-2 mb-2">
                        <input class="form-control" type="search" placeholder="Buscar" aria-label="Search">
                    </div> 
                    <div class="usuarios">
                        <div class="usuario">
                            <div class="alert alert-secondary" role="alert">
                                <div class="row align-items-center">
                                    <div class="col-md-2">
                                        <img class="rounded-circle imgPerfilOrg" style="height: 50px;"src="{{URL::asset('assets/img/user.png')}}" alt="imagen de usuario">
                                    </div>
                                    <div class="col-md-3">
                                        <p class="lead">
                                            Usuario
                                        </p>
                                    </div>
                                    <div class="col-md-4">
                                        <p>Cantidad: 2</p>
                                    </div>
                                    <div class="col-md-3">
                                        <a href="#">Ver perfil</a>
                                    </div>
                                </div>
                            </div>
                        </div> <!-- usuario -->
                        <div class="usuario">
                            <div class="alert alert-secondary" role="alert">
                                <div class="row align-items-center">
                                    <div class="col-md-2">
                                        <img class="rounded-circle imgPerfilOrg" style="height: 50px;"src="{{URL::asset('assets/img/user.png')}}" alt="imagen de usuario">
                                    </div>
                                    <div class="col-md-3">
                                        <p class="lead">
                                            Usuario
                                        </p>
                                    </div>
                                    <div class="col-md-4">
                                        <p>Cantidad: 2</p>
                                    </div>
                                    <div class="col-md-3">
                                        <a href="#">Ver perfil</a>
                                    </div>
                                </div>
                            </div>
                        </div> <!-- usuario -->
                        <div class="usuario">
                            <div class="alert alert-secondary" role="alert">
                                <div class="row align-items-center">
                                    <div class="col-md-2">
                                        <img class="rounded-circle imgPerfilOrg" style="height: 50px;"src="{{URL::asset('assets/img/user.png')}}" alt="imagen de usuario">
                                    </div>
                                    <div class="col-md-3">
                                        <p class="lead">
                                            Usuario
                                        </p>
                                    </div>
                                    <div class="col-md-4">
                                        <p>Cantidad: 2</p>
                                    </div>
                                    <div class="col-md-3">
                                        <a href="#">Ver perfil</a>
                                    </div>
                                </div>
                            </div>
                        </div> <!-- usuario -->
                        <div class="usuario">
                            <div class="alert alert-secondary" role="alert">
                                <div class="row align-items-center">
                                    <div class="col-md-2">
                                        <img class="rounded-circle imgPerfilOrg" style="height: 50px;"src="{{URL::asset('assets/img/user.png')}}" alt="imagen de usuario">
                                    </div>
                                    <div class="col-md-3">
                                        <p class="lead">
                                            Usuario
                                        </p>
                                    </div>
                                    <div class="col-md-4">
                                        <p>Cantidad: 2</p>
                                    </div>
                                    <div class="col-md-3">
                                        <a href="#">Ver perfil</a>
                                    </div>
                                </div>
                            </div>
                        </div> <!-- usuario -->
                        <div class="usuario">
                            <div class="alert alert-secondary" role="alert">
                                <div class="row align-items-center">
                                    <div class="col-md-2">
                                        <img class="rounded-circle imgPerfilOrg" style="height: 50px;"src="{{URL::asset('assets/img/user.png')}}" alt="imagen de usuario">
                                    </div>
                                    <div class="col-md-3">
                                        <p class="lead">
                                            Usuario
                                        </p>
                                    </div>
                                    <div class="col-md-4">
                                        <p>Cantidad: 2</p>
                                    </div>
                                    <div class="col-md-3">
                                        <a href="#">Ver perfil</a>
                                    </div>
                                </div>
                            </div>
                        </div> <!-- usuario -->
                    </div> <!-- usuarios -->
                </div>
            </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
        </div>
      </div>
    </div>
</div>



<!-- Modal colaborar -->
<div class="modal fade" id="modalColaborar" tabindex="-1" role="dialog" aria-labelledby="modalColaborarLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="modalColaborarLabel">Colaborar</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <p>¿Estás seguro de que deseas ayudar? Si aceptas te comprometes formalmente a ayudar a la organización. La organizacion recibira un mensaje acerca de tu intencion y se contactará contigo.</p>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
          <button type="button" class="btn btn-primary">Aceptar</button>
        </div>
      </div>
    </div>
</div>