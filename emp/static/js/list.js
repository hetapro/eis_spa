/**
 * Created by Heta on 29-08-2014.
 */
$(document).ready(function() {
    //$(window).load(function (event) {
        var dept_name;
        event.preventDefault();
        url = "/emp/employee/"
     $(document).ajaxStart(function(){     $("#wait").css("display","block");       });
        $.ajax({
            url: url,
            type: "GET",
            dataType: "json",

            success: function (data) {

                if (data.length == 0) {
                    $("#emp_list1").append("<tr id=\"nodata2\">" + "<td class='alert-info' colspan='10'><center>" + "<b>No Data Found</b>" + "</center></td>" + "</tr>");
                }
                else {

                 $.each(data, function (key, value) {
                    $(document).ajaxStart(function(){     $("#wait").css("display","block");       });
                                $.ajax({
                                url:"/emp/department/" + value.department + "/",
                                type: "GET",

                                dataType: "json",
                                success: function(data){
                                            dept_name=data.department_name;
                                    $("#emp_list1").append("<tr id=" + value.employee_id + ">" +
                                    "<td id=\"emp1\">" + value.ename + "</td>" +
                                    "<td id=\"emp2\">" + value.age + "</td>" +
                                    "<td id=\"emp3\">" + value.emailid+ "</td>" +
                                    "<td id=\"emp4\">" + value.mobno + "</td>" +
                                    "<td id=\"emp5\">" + value.designation + "</td>" +
                                    "<td id=\"emp6\">" + dept_name + "</td>" +
                                    "<td>" + "<a class=\"view\" id=" + value.employee_id + " name=" + value.ename + " href=\"javascript:void(0)\">View Details</a>" + "</td>" +
                                    "<td>" + "<input type=\"button\" class=\"edit btn\" id=" + value.employee_id + " name=" + value.ename + " value=\"Edit\">" + "</td>" +
                                    "<td>" + "<input type=\"button\" class=\"delete btn\" id=" + value.employee_id + " name=" + value.ename + " value=\"Delete\">" + "</td>" +
                                    "</tr>");


                                },
                                error:function (xhr, status, errorThrown) {
                                      console.log("Sorry, there was a problem!"); }
                                }); $(document).ajaxComplete(function(){ $("#wait").css("display","none");  });

                 });
                }


            },
            error: function (xhr, status, errorThrown) {
                console.log("Sorry, there was a problem!");
                console.log("Error: " + errorThrown);
                console.log("Status: " + status);
            }

        }); $(document).ajaxComplete(function(){ $("#wait").css("display","none");  });



    $("#employeelist").on("click",".delete",function (event) {

        event.preventDefault();
        var pk=$(this).attr("id");

        var name=$(this).attr("name");

        var delValue=confirm("Do you really want to delete "+ name + " named employee?");
        if(delValue==true) {
            url = "/emp/employee/"+pk+"/";
            $(document).ajaxStart(function(){     $("#wait").css("display","block");       });
            $.ajax({
                url: url,
                type: "DELETE",
                dataType: "parseJSON",
                success: function () {
                  //  $("#employeelist tr#"+pk).remove();
                     $(document).ajaxStart(function(){     $("#wait").css("display","block");       });
                    $.ajax({
                     url: "/emp/employee/",
                     type: "GET",
                     dataType: "json",
                     success: function (data) {
                         if(data.length==0) {    $("#employeelist tr#"+pk).remove();
                             $("#emp_list1").append( "<tr id=\"nodata2\">"+ "<td class='alert-info' colspan='9'><center>"+ "<b>No Data Found</b>" +"</center></td>"+"</tr>");

                         } else{  $("#employeelist tr#"+pk).remove();} },
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
         $(document).ajaxStart(function(){     $("#wait").css("display","block");       });
        $.ajax({
            type:"GET",
            success: function(){
                  $("#content1").load("/emp/");
               // window.location.href="/emp/"
            },
            error: function (xhr, status, errorThrown) {
                       console.log("Sorry, there was a problem!");
                       console.log("Error: " + errorThrown);
                       console.log("Status: " + status);
                     }
        });$(document).ajaxComplete(function(){ $("#wait").css("display","none");  });
        });
    $("#employeelist").on("click",".edit",function (event) {
        event.preventDefault();
        var pk = $(this).attr("id");
        $("#dropdepartment option").remove();
        url = "/emp/employee/"+pk+"/";
              $(document).ajaxStart(function(){     $("#wait").css("display","block");       });
            $.ajax({
                url: url,
                type: "GET",
                dataType: "json",
                success: function (data) {
                      $(document).ajaxStart(function(){     $("#wait").css("display","block");       });
                    $.ajax({
                             url: "/emp/department/",
                              type: "GET",
                             dataType: "json",
                            success: function (data1) {
                                 $("#employeelist").hide();
                                 $("#editemployee").show();
                                 $("#ename1").val(data.ename);
                                 $("#age1").val(data.age);
                                 $("#email1").val(data.emailid);
                                 $("#mob1").val(data.mobno);
                                 $("#designation1").val(data.designation);
                    var dept=data.department;
                                $.each(data1,function(key,value){
                                    if(value.department_id==dept) {

                                        var newOption = $('<option value="'+value.department_name+'" id='+value.department_id+' name="'+value.department_name+'" selected>'+value.department_name+'</option>');
                                        $('#dropdepartment').append(newOption);

                                    }
                                    else{
                                     var newOption = $('<option value="'+value.department_name+'" id='+value.department_id+' name="'+value.department_name+'">'+value.department_name+'</option>');
                                        $('#dropdepartment').append(newOption);
                                    }
                                });
                    },
                error: function (xhr, status, errorThrown) {
                    console.log("Sorry, there was a problem!");
                    console.log("Error: " + errorThrown);
                    console.log("Status: " + status);
                }

            });$(document).ajaxComplete(function(){ $("#wait").css("display","none");  });
                },
                error: function (xhr, status, errorThrown) {
                    console.log("Sorry, there was a problem!");
                    console.log("Error: " + errorThrown);
                    console.log("Status: " + status);
                }

            });$(document).ajaxComplete(function(){ $("#wait").css("display","none");  });
        $("#listdepartment").hide();
        $("#updatedepartment").show();
        $("#id_department1").val(name);
        $(".update").attr("id", "" + pk + "");
    });
    $("#back1").click(function (event) {
            event.preventDefault();
            $('#editemployee').hide();
            $('#employeelist').show();
    });
    $("#back2").click(function (event) {
            event.preventDefault();
            $('#viewemployee').hide();
            $('#employeelist').show();

        });
    $('#employeelist').on("click",'.view' ,function(event){
        event.preventDefault();
        var pk=$(this).attr("id");
         url = "/emp/employee/"+pk+"/";
        var dept_name;
          $(document).ajaxStart(function(){     $("#wait").css("display","block");       });
         $.ajax({
                url: url,
                type: "GET",
                dataType: "json",
                success: function (data) {
                      $(document).ajaxStart(function(){     $("#wait").css("display","block");       });
                    $.ajax({
                                url:"/emp/department/" + data.department + "/",
                                type: "GET",
                                dataType: "json",
                                success: function(data1){
                                            $("#employeelist").hide();
                                            $("#viewemployee").show();
                                            $("#viewemp").html("Details of "+data.ename+" employee");
                                            $("#ename2").text(data.ename);
                                            $("#age2").text(data.age);
                                            $("#email2").text(data.emailid);
                                            $("#mob2").text(data.mobno);
                                            $("#designation2").text(data.designation);
                                            $("#department2").text(data1.department_name);
                                } });

                    $(document).ajaxComplete(function(){ $("#wait").css("display","none");  });

                },
                 error: function (xhr, status, errorThrown) {
                    console.log("Sorry, there was a problem!");
                    console.log("Error: " + errorThrown);
                    console.log("Status: " + status);
                }
         }); $(document).ajaxComplete(function(){ $("#wait").css("display","none");  });
    });
    $("#newemployee").click(function (event) {
            event.preventDefault();
            $('#employeelist').hide();
        $(document).ajaxStart(function(){     $("#wait").css("display","block");       });
            $.ajax({
                             url: "/emp/department/",
                              type: "GET",
                             dataType: "json",
                            success: function (data) {
                                if(data.length==0){ $("#newerror").show();}
                                else{
                                    $("#newemp").show(); $("#new1").html("");$("#new2").html("");$("#new3").html("");$("#new4").html("");
                                    $("#new5").html(""); $("#ename_new").val(""); $("#age_new").val(""); $("#email_new").val("");
                                    $("#mob_new").val("");$("#designation_new").val("");   $("#dropdepartment1 option").remove();
                                $.each(data, function (key, value) {

                                        var newOption = $('<option value="' + value.department_name + '" id=' + value.department_id + ' name="' + value.department_name + '">' + value.department_name + '</option>');
                                        $('#dropdepartment1').append(newOption);
                                }); }
                            },
                            error: function (xhr, status, errorThrown) {
                                        console.log("Sorry, there was a problem!");
                                        console.log("Error: " + errorThrown);
                                        console.log("Status: " + status);
                                }
             }); $(document).ajaxComplete(function(){ $("#wait").css("display","none");  });
     });
    $("#back3").click(function (event) {
            event.preventDefault();
            $('#newemp').hide();
            $('#employeelist').show();

        });
    $("#add").click(function (event) {

            event.preventDefault();
            var name=document.getElementById("ename_new");
            var age=document.getElementById("age_new");
            var email=document.getElementById("email_new");
            var mob=document.getElementById("mob_new");
            var designation=document.getElementById("designation_new");
            var id=$("#dropdepartment1").find('option:selected').attr("id");
            var department=$("#dropdepartment1").find('option:selected').attr("name");
             var flag1,flag2,flag3,flag4,flag5; var letters = /^[A-Za-z- ]+$/;
            if(name.value.length==0)
            {
                $("#new1").html("*Empty Name field is not allowed"); $("#new1").css("color","red"); flag1=false;
            }
            else if(!(name.value.match(letters)))
            {
                $("#new1").html("*Please input alphabet characters only."); $("#new1").css("color","red"); flag1=false;
            } else { $("#new1").html(""); flag1=true;}
            if(age.value.length==0)
            {
                $("#new2").html("*Empty Age field is not allowed"); $("#new2").css("color","red"); flag2=false;
            }
            else if(isNaN(age.value))
            {
                $("#new2").html("*Please input digits only."); $("#new2").css("color","red"); flag2=false;
            } else { $("#new2").html(""); flag2=true;}
              if(mob.value.length==0)
            {
                $("#new4").html("*Empty mobile no field is not allowed"); $("#new4").css("color","red"); flag3=false;
            }
               else if(isNaN(mob.value))
             {  $("#new4").html("*Only digits are allowed"); $("#new4").css("color","red"); flag3=false;}
             else if(!(mob.value.length == 10))
             {  $("#new4").html("*Only 10 digits are allowed"); $("#new4").css("color","red"); flag3=false;}else { $("#new4").html(""); flag3=true;}
             if(designation.value.length==0)
            {
                $("#new5").html("*Empty designation field is not allowed"); $("#new5").css("color","red"); flag4=false;
            }
            else if(!(designation.value.match(letters)))
            {
                $("#new5").html("*Please input alphabet characters only."); $("#new5").css("color","red"); flag4=false;
            } else { $("#new5").html(""); flag4=true;}
            var letters1=/^([a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$)/;
             if(email.value.length==0)
            {
                $("#new3").html("*Empty email id field is not allowed"); $("#new3").css("color","red"); flag5=false;
            }
            else if(!(email.value.match(letters1)))
            {
                $("#new3").html("*Please input correct email id."); $("#new3").css("color","red"); flag5=false;
            }

            else { $("#new3").html(""); flag5=true; }

            if(flag1 && flag2 && flag3 && flag4 && flag5)
            {   url="/emp/employee/"
                $(document).ajaxStart(function(){     $("#wait").css("display","block");       });
               $.ajax({
                                url: url,
                                type: "POST",
                                data: { "ename": "" + name.value + "","age":  age.value ,"emailid": "" + email.value + "","mobno": mob.value,"designation": "" + designation.value + "" ,"department": id },
                                dataType: "json",
                                //processData:false,
                               // contentType:"application/json",
                                success: function (data) {
                                     $('#newemp').hide();
                                    $('#employeelist').show();
                                    $('table tr#nodata2').hide();
                                    $("#employeelist #emp_list1").append( "<tr  id="+data.employee_id+">"+
                                 "<td id=\"emp1\">"+ data.ename +"</td>"+
                                        "<td id=\"emp2\">"+data.age+"</td>"+  "<td id=\"emp3\">"+data.emailid+"</td>"+  "<td id=\"emp4\">"+data.mobno+"</td>"+  "<td id=\"emp5\">"+data.designation+"</td>"+  "<td id=\"emp6\">"+department+"</td>"+
                                 "<td>"+ "<a class=\"view\" id="+data.employee_id+" name="+data.ename+" href=\"#\">View Details</a>" +"</td>"+
                                 "<td>"+ "<input type=\"button\" class=\"edit btn\" id="+data.employee_id+" name="+data.ename+" value=\"Edit\">" +"</td>"+
                                 "<td>"+ "<input type=\"button\" class=\"delete btn\" id="+data.employee_id+" name="+data.ename+" value=\"Delete\">" +"</td>"+
                                 "</tr>");

                                },
                                error: function (xhr, status, errorThrown) {

                                    console.log("Sorry, there was a problem!");
                                    console.log("Error: " + errorThrown);
                                    console.log("Status: " + status);
                                }
                         });$(document).ajaxComplete(function(){ $("#wait").css("display","none");  });
            }
        });
    $(".update").click(function(event){
         event.preventDefault();
              var pk=$(this).attr("id");
             var name=document.getElementById("ename1");
            var age=document.getElementById("age1");
            var email=document.getElementById("email1");
            var mob=document.getElementById("mob1");
            var designation=document.getElementById("designation1");
            var id=$("#dropdepartment").find('option:selected').attr("id");
            var department=$("#dropdepartment").find('option:selected').attr("name");
             var flag1,flag2,flag3,flag4,flag5; var letters = /^[A-Za-z- ]+$/;
            if(name.value.length==0)
            {
                $("#name1").html("*Empty Name field is not allowed"); $("#name1").css("color","red"); flag1=false;
            }
            else if(!(name.value.match(letters)))
            {
                $("#name1").html("*Please input alphabet characters only."); $("#name1").css("color","red"); flag1=false;
            } else { $("new1").html(""); flag1=true;}
            if(age.value.length==0)
            {
                $("#name1").html("*Empty Age field is not allowed"); $("#name1").css("color","red"); flag2=false;
            }
            else if(isNaN(age.value))
            {
                $("#name2").html("*Please input digits only."); $("#name2").css("color","red"); flag2=false;
            } else { $("#name2").html(""); flag2=true;}
              if(mob.value.length==0)
            {
                $("#name4").html("*Empty mobile no field is not allowed"); $("#name4").css("color","red"); flag3=false;
            }
              else if(isNaN(mob.value))
             {  $("#name4").html("*Only digits are allowed"); $("#name4").css("color","red"); flag3=false;}
             else if(!(mob.value.length == 10))
             {  $("#name4").html("*Only 10 digits are allowed"); $("#name4").css("color","red"); flag3=false;}
             else { $("#name4").html(""); flag3=true;}
             if(designation.value.length==0)
            {
                $("#name5").html("*Empty designation field is not allowed"); $("#name5").css("color","red"); flag4=false;
            }
            else if(!(designation.value.match(letters)))
            {
                $("#name5").html("*Please input alphabet characters only."); $("#name5").css("color","red"); flag4=false;
            } else { $("#new5").html(""); flag4=true;}
            var letters1=/^([a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$)/;
             if(email.value.length==0)
            {
                $("#name3").html("*Empty email id field is not allowed"); $("#name3").css("color","red"); flag5=false;
            }
            else if(!(email.value.match(letters1)))
            {
                $("#name3").html("*Please input correct email id."); $("#name3").css("color","red"); flag5=false;
            }

            else { $("#name3").html(""); flag5=true; }
            if(flag1 && flag2 && flag3 && flag4 && flag5)
            {
                $(document).ajaxStart(function(){     $("#wait").css("display","block");       });
               $.ajax({
                                url: "/emp/employee/" + pk + "/",
                                type: "PUT",
                                data: { "ename": "" + name.value + "","age":  age.value ,"emailid": "" + email.value + "","mobno": mob.value ,"designation": "" + designation.value + "" ,"department": id },
                                dataType: "json",
                                success: function (data) {

                                    $('#editemployee').hide();
                                    $('#employeelist').show();

                                    $("tr#"+pk+" td[id=\"emp1\"]").text(data.ename);
                                    $("tr#"+pk+" td[id=\"emp2\"]").text(data.age);
                                    $("tr#"+pk+" td[id=\"emp3\"]").text(data.emailid);
                                    $("tr#"+pk+" td[id=\"emp4\"]").text(data.mobno);
                                    $("tr#"+pk+" td[id=\"emp5\"]").text(data.designation);
                                    $("tr#"+pk+" td[id=\"emp6\"]").text(department);
                                    $("a[id=" + pk + "]").attr("name", "" + data.ename + "");
                                    $("input[id=" + pk + "]").attr("name", "" + data.ename + "");


                                },
                                error: function (xhr, status, errorThrown) {

                                    console.log("Sorry, there was a problem!");
                                    console.log("Error: " + errorThrown);
                                    console.log("Status: " + status);
                                }
                         });$(document).ajaxComplete(function(){ $("#wait").css("display","none");  });
            }  });

    $("#reset_emp").click(function (event) {
            $("#new1").html("");$("#new2").html("");$("#new3").html("");$("#new4").html("");
                                    $("#new5").html(""); $("#ename_new").val(""); $("#age_new").val(""); $("#email_new").val("");
                                    $("#mob_new").val("");$("#designation_new").val("");  });
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