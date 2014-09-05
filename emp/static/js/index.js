/**
 * Created by Heta on 27-08-2014.
 */




/*$(document).ready(function(event) {


$("ul li a").click(function(){

    var rel=$(this).attr("rel");
    $.ajax({
        url:"/emp/"+rel+"/",
        dataType:"html",
        method: "GET",
        success: function(){
               // href="/emp/"
                  //history.pushState({}, " ", href);
                    $("#content1").load("/emp/");
               //window.location.href="/emp/"
            },
        error: function (xhr, status, errorThrown) {
                       console.log("Sorry, there was a problem!");
                       console.log("Error: " + errorThrown);
                       console.log("Status: " + status);
                     }

    });
   // alert(rel+"hello")
   //  window.history.pushState({}, "Title", "/emp/"+rel+"/");

    //$("#content1").load("/emp/"+rel+"/");
  //  window.location.href="/emp/"+rel+"/";
   $("#content1").load("/emp/"+rel+"/",function(responseTxt,statusTxt,xhr){
    if(statusTxt=="success") {
        console.log("External content loaded successfully!");
        console.log(responseTxt)
    }
    if(statusTxt=="error")
      console.log("Error: "+xhr.status+": "+xhr.statusText);
  });


    });

});  */

