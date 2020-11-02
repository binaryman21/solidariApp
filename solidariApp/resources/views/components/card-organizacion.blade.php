<div {{$attributes->merge([
        'class' => 'cardOrganizacion my-2 border',
        'style' => 'background-color: #ffffff;
                    box-shadow: 0 2px 4px rgba(0,0,0,0.2), 0 -1px 0px rgba(0,0,0,0.02);'
    ])}}
>
<div class="d-flex flex-row m-0 mx-1 mt-1 px-2 pt-5 justify-content-star detalleOrganizacion align-items-center"
    style="background: -webkit-linear-gradient(rgba(0,0,0,0) 0%,rgba(0,0,0,0) 25%,rgba(0,0,0,0.15) 45%,rgb(0 0 0 / 34%) 60%,rgba(0,0,0,0.6) 80%,rgba(0,0,0,0.7) 100%),
    url({{$orgcover}});
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;">
<img class="rounded-circle imgPerfilOrg" src={{$orgavatar}} alt="{{"avatar de ".$orgname}}">
    <div id="card-org-name" class="ml-2"
        style="text-shadow: -6px 7px 16px black;"
    >
        <p>{{$orgname}}</p>
        <p>{{$orgtype}}</p>
    </div>
</div>
    <div class="listaNecesidades">
    <div class="p-2 text-muted"><small>En {{$orglocation}}</small>
</div>
    <div class="list-group">
  <button class="btn btn-light" data-toggle="modal" data-target="#modalDetalleNecesidad" style="
    /* border-left: 8px solid var(--ropa-color); */
    background-color: #f1f1ff;
    color: #9364bf;
    border: none;
    border-radius: 0;
    ">
    <div class="d-flex w-100 justify-content-between align-items-center">
      <i class="fas fa-tshirt fa-xs mr-2 mr-lg-3"></i>
      <p class="m-0">Necesito camperas</p>
    <small class="badge badge-light ml-auto">14 de 55</small></div>
  </button>
  <button class="btn btn-light" data-toggle="modal" data-target="#modalDetalleNecesidad" style="
    /* border-left: 8px solid var(--ropa-color); */
    background-color: #f7fdf7;
    color: rgb(50 117 50);
    border: none;
    border-radius: 0;
    ">
    <div class="d-flex w-100 justify-content-between align-items-center">
      <i class="fas fa-donate fa-xs mr-2 mr-lg-3"></i>
      <p class="m-0">Apoyanos con tu donacion</p>
    <small class="badge badge-light ml-auto"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">60%</font></font></small></div>
  </button>
</div>
<div class="d-flex px-3 text-muted py-2 justify-content-between align-items-center" style="
    background-color: #ffffff;
">
<button class="btn text-reset btn-link btn-sm mx-auto px-0">
    <font style="vertical-align: inherit;">
        <font style="vertical-align: inherit;">Ver mas necesidades</font>
    </font>
</button></div>
</div>
</div>
