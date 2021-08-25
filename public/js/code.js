window.onload = function(){

$(document).ready(function(){
    

  
});




$(document).on('click','.btneditar',function(){

    var id = $(this).data('id');
   
   var myModal = new bootstrap.Modal(document.getElementById('modalAlumno'));

    var url='/edit/'+id;

   myModal.show();

   $.ajax({

    url:url,
    type:'GET',
    data:{},
    dataType:'JSON',
    success:function(data){

        console.log(data);

        $('#ideditar').val(id);
        $('#nombre_editar').val(data.nombre);
        $('#edad_editar').val(data.edad);
     
       
        /*$('.age').val(data.age);
        $('.start_date').val(data.start_date);
        $('.salary').val(data.salary);*/



    }


});




   // $('#modal-agregar').modal('show');

 // $("#modalAlumno").modal("show");


});


};