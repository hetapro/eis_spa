/**
 * Created by Heta on 02-09-2014.
 */
$(document).ready(function(event) {
     var $content=$("#content");

$("#content ul li a").click(function(){

    var rel=$(this).attr("rel");
    alert(rel+"hello")
   //  window.history.pushState({}, "Title", "/emp/"+rel+"/");

     $.ajax({
       url: '/emp/employee_details',
       type: 'GET',
       success: function(data) {
            $("#content").a
         console.log(data);
       }
     });

     // $("#content").hide();


    });

});
