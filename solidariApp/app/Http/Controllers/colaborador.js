var colaborador =
{
    idUsuario:0,
    claveUsuario:"",
    emailUsuario:"",
    tokenGoogle:"",
    urlFotoPerfilUsuario:"",
    rol:{idRolUsuario:0,nombreRolUsuario:""},
    estado:{idEstadoUsuario:0,nombreEstadoUsuario:""},
    nombreColaborador:"",
    apellidoColaborador:"",
    telefonos:
    [
        {idTelefono:0,codAreaTelefono:"",numeroTelefono:"",tipoTelefono:{idTipoTelefono:0,nombeTipoTelefono:""}}
    ],
    domicilios:
    [
        {idDomicilio:0,calle:"",numero:"",piso:"",depto:"",latitud:"",longitud:"",localidad:{idLocalidad:0,nombreLocalidad:""}}
    ],
    links:
    [
        {idLink:0,urlLink:"",tipoLink:{idTipoLink:0,nombreTipoLink:""}}
    ]
}


























/*

function cargarNecesidades(idOrganizacion)
{

    var necesidades;

    $.each(necesidades, function (indexInArray, necesidad) {


        '<a data-toggle="modal" href="#modalEditarNecesidad" id = editar'+necesidad.idNecesidad+'><i class="far fa-edit"></i></a>'
        $("#editar" + necesidad.idNecesidad).click(function(){llenarModalEditarNecesidad(necesidad)});

}

function llenarModalEditarNecesidad(necesidad)
{

    $("#txtDescipcion") = necesidad.descripcionNecesidad;
}
*/













