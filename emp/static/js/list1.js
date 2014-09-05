/**
 * Created by Heta on 27-08-2014.
 */
//$.noConflict();

$(document).ready(function(){

//$(window).load(function(event){
  //  event.preventDefault();
    url="/emp/department/"
     $(document).ajaxStart(function(){
    $("#wait").css("display","block");
     });
         $.ajax({
                     url: url,
                     type: "GET",
                     dataType: "json",
                     contentType:"application/json",
                     success: function (data) {
                         if(data.length==0) {
                             $("#department_list").append( "<tr id=\"nodata1\">"+ "<td class='alert-info' colspan='5'><center>"+ "<b>No Data Found</b>" +"</center></td>"+"</tr>");

                         }
                         else
                         {

                         $.each(data,function(key,value){

                             //var obj = $.parseJSON( value );
                             $("#department_list").append( "<tr id="+value.department_id+">"+
                                 "<td>"+ value.department_name +"</td>"+
                                 "<td>"+ "<a class=\"view\" id="+value.department_id+" name="+value.department_name+" href=\"#\">View Details</a>" +"</td>"+
                                 "<td>"+ "<input type=\"button\" class=\"edit btn\" id="+value.department_id+" name="+value.department_name+" value=\"Edit\">" +"</td>"+
                                 "<td>"+ "<input type=\"button\" class=\"delete btn\" id="+value.department_id+" name="+value.department_name+" value=\"Delete\">" +"</td>"+
                                 "</tr>");
                         });
                         }


                     },
                     error: function(xhr, status, errorThrown) {
                       console.log("Sorry, there was a problem!");
                       console.log("Error: " + errorThrown);
                       console.log("Status: " + status);
                     }

            });$(document).ajaxComplete(function(){ $("#wait").css("display","none");  });




    $('#department_list').on("click",'.view' ,function(event){
        event.preventDefault();
        var pk=$(this).attr("id");

        var name=$(this).attr("name");
         $(document).ajaxStart(function(){     $("#wait").css("display","block");       });
       $.ajax({
            url: "/emp/employee/",
            type: "GET",
            dataType: "json",
            success: function(data){
                $("#listdepartment").hide();
                $("#emp_list tr td").remove();
                $("#viewdetails").show();
                $("#viewdet").html("Employees of "+name+" department")
                if(data.length==0){
                    $("#emp_list").append( "<tr id=\"nodata3\">"+ "<td class='alert-info' colspan='5'><center>"+ "<b>No Data Found</b>" +"</center></td>"+"</tr>");
                }
                else{
                $.each(data,function(key,value){
                            if(value.department==pk) {

                              $("#emp_list").append("<tr>" +
                                    "<td>" + value.ename + "</td>" +
                                     "<td>" + value.age + "</td>" +
                                     "<td>" + value.emailid + "</td>" +
                                    "<td>" + value.mobno + "</td>" +
                                    "<td>" + value.designation + "</td>" +
                                    "</tr>");
                            } }); }

            },
            error: function (xhr, status, errorThrown) {
                       console.log("Sorry, there was a problem!");
                       console.log("Error: " + errorThrown);
                       console.log("Status: " + status);
                     }
        }); $(document).ajaxComplete(function(){ $("#wait").css("display","none");  });
    });
    $("#department_list").on("click",".edit",function (event) {
        event.preventDefault();
        var pk = $(this).attr("id");
        var name = $(this).attr("name");
        $("#error2").hide();
        $("#listdepartment").hide();
        $("#updatedepartment").show();
        $("#id_department1").val(name);
        $(".update").attr("id", "" + pk + "");

    });
    $(".update").click(function(event){
         event.preventDefault();
        var department=$("#id_department1").val();
         var pk=$(".update").attr("id");
         if (department.length == 0) {
             $("#error2").show();
             $("#error2").html("*Empty department field is not allowed!! Please try again");
             $("#error2").css("color", "red");
             return false;
         }
         else {
            $(document).ajaxStart(function(){   $("#wait").css("display","block");      });
            $.ajax({
                url:  "/emp/department/",
                type: "GET",
                dataType:"JSON",
                success: function (data) {
                   // data=JSON.parse(data)
                   var flag = false; //alert(data)
                    $.each((data), function (k,v) {

                        if (department == v.department_name) {
                                flag = true;

                        }
                    });
                    if (flag == true) {
                         $("#error2").show();
                        $("#error2").html("*This department already exists. Please try again.");
                        $("#error2").css("color", "red");
                        return false;
                    }
                    else {
                     $(document).ajaxStart(function(){   $("#wait").css("display","block");      });
                       $.ajax({
                            url: "/emp/department/" + pk + "/",
                            type: "PUT",
                            data: { "department_name": "" + department + "" },
                            dataType: "json",

                            success: function () {
                               $("#updatedepartment").hide();
                                $("#listdepartment").show();
                                $("tr#"+pk+" td:first").text(department);
                                $("a[id=" + pk + "]").attr("name", "" + department + "");
                                $("input[id=" + pk + "]").attr("name", "" + department + "");
                            },
                            error: function (xhr, status, errorThrown) {
                                console.log("Sorry, there was a problem!");
                                console.log("Error: " + errorThrown);
                                console.log("Status: " + status);
                            }
                        });  $(document).ajaxComplete(function(){ $("#wait").css("display","none");  });
                    }
                },
         error: function (xhr, status, errorThrown) {
                    console.log("Sorry, there was a problem!");
                    console.log("Error: " + errorThrown);
                    console.log("Status: " + status);
                }
        }); $(document).ajaxComplete(function(){ $("#wait").css("display","none");  });  }
        });
    $("#back2").click(function (event) {
            event.preventDefault();
            $('#updatedepartment').hide();
            $("#error2").hide();
            $('#listdepartment').show();

        });
    $("#department_list").on("click",".delete",function (event) {

        event.preventDefault();
        var pk=$(this).attr("id");
        var name=$(this).attr("name");

        var delValue=confirm("Do you really want to delete  "+ name + " department?");

        if(delValue==true) {
            url = "/emp/department/"+pk+"/";
            $(document).ajaxStart(function(){   $("#wait").css("display","block");      });
            $.ajax({
                url: url,
                type: "DELETE",
                dataType: "parseJSON",

                success: function () {
                    $(document).ajaxStart(function(){   $("#wait").css("display","block");      });
                    $.ajax({
                     url: "/emp/department/",
                     type: "GET",
                     dataType: "json",
                     success: function (data) {

                         if(data.length==0) {
                             $("#department_list tr#"+pk).remove();
                             $("#department_list").append( "<tr id=\"nodata1\">"+ "<td class='alert-info' colspan='5'><center>"+ "<b>No Data Found</b>" +"</center></td>"+"</tr>");

                         }
                     else{
                            $("#department_list tr#"+pk).remove();
                         }},
                     error: function (xhr, status, errorThrown) {  console.log("Error: " + errorThrown); }  });
                    $(document).ajaxComplete(function(){ $("#wait").css("display","none");  });
                },
                error: function (xhr, status, errorThrown) {
                    console.log("Sorry, there was a problem!");
                    console.log("Error: " + errorThrown);
                    console.log("Status: " + status);
                }

            }); $(document).ajaxComplete(function(){ $("#wait").css("display","none");  });
        }
        });
    $("#back").click(function (event) {
        event.preventDefault();
        $.ajax({
            type:"GET",
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
        });
        $("#new").click(function (event) {
        event.preventDefault();
           // alert("Hello")
        $('#listdepartment').hide();
        $('#adddepartment').show();
        $('#id_department').val(null);
        $('#error1').hide("");
        });
        $("#add").click(function (event) {
            event.preventDefault();
            if ($("#id_department").val().length==0) {
                $("#error1").show();
                $("#error1").html("*Empty department field is not allowed.");
                $("#error1").css("color", "red");
                // event.preventDefault();
                return false;
            }
            else {
                url = "/emp/department/";

                var department = $("#id_department").val();
                if(department.length==0){alert("Hello");}
                $(document).ajaxStart(function(){   $("#wait").css("display","block");      });
                $.ajax({
                    url: url,
                    type: "GET",
                    dataType:"json",
                    success: function (data) {
                        var flag = false;

                        $.each(data, function (key, value) {
                            if (department == value.department_name) {

                                flag = true;
                            }
                        });

                        if (flag==true) {
                            $("#error1").show();
                            $("#error1").html("*This department already exists. Please try again.");
                            $("#error1").css("color", "red");

                        }
                        else { $(document).ajaxStart(function(){   $("#wait").css("display","block");      });
                            $.ajax({
                                url: url,
                                type: "POST",
                                data: { "department_name": "" + department + "" },
                                dataType: "json",
                                success: function (data) {
                                    $('#adddepartment').hide();
                                    $('#listdepartment').show();
                                    $('table tr#nodata1').hide();
                                    $("#listdepartment #department_list").append( "<tr  id="+data.department_id+">"+
                                 "<td id=\"1\">"+ data.department_name +"</td>"+
                                 "<td>"+ "<a class=\"view\" id="+data.department_id+" name="+data.department_name+" href=\"#\">View Details</a>" +"</td>"+
                                 "<td>"+ "<input type=\"button\" class=\"edit btn\" id="+data.department_id+" name="+data.department_name+" value=\"Edit\">" +"</td>"+
                                 "<td>"+ "<input type=\"button\" class=\"delete btn\" id="+data.department_id+" name="+data.department_name+" value=\"Delete\">" +"</td>"+
                                 "</tr>");

                                },
                                error: function (xhr, status, errorThrown) {
                                    console.log("Sorry, there was a problem!");
                                    console.log("Error: " + errorThrown);
                                    console.log("Status: " + status);
                                }
                            }); $(document).ajaxComplete(function(){ $("#wait").css("display","none");  });
                        }
                    },
                    error: function (xhr, status, errorThrown) {
                        console.log("Sorry, there was a problem!");
                        console.log("Error: " + errorThrown);
                        console.log("Status: " + status);
                    }

                });$(document).ajaxComplete(function(){ $("#wait").css("display","none");  });


            }
        });
        $("#back1").click(function (event) {
            event.preventDefault();
            $('#adddepartment').hide();
                    $('#listdepartment').show();

        });
        $("#reset_dept").click(function (event) {
            event.preventDefault();
            $('#id_department').val(null);
            $('#error1').html("");

        });
    $("#back3").click(function (event) {
            event.preventDefault();
            $('#viewdetails').hide();
                    $('#listdepartment').show();

        });
    $("#header_ele ul li a").click(function(){

    var rel=$(this).attr("rel");

   $("#content1").load("/emp/"+rel+"/",function(responseTxt,statusTxt,xhr){
    if(statusTxt=="success") {
        console.log("External content loaded successfully!");
        console.log(responseTxt)
    }
    if(statusTxt=="error")
      console.log("Error: "+xhr.status+": "+xhr.statusText);
  });


    });
//});
 });


