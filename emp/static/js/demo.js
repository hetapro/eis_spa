(function($) {
    var app=$.sammy(function() {
        this.element_selector = '#main';
        /*  *********************************** Department routes begin ***********************************  */

        // Main page List of Department
        this.get('#/department_list/', function(context) {
        context.log('hi1');
        $("#main").load('/emp/department_list/')
        $(document).ajaxStart(function(){$("#wait").css("display","block"); });
         $.ajax({
                     url: "/emp/department/",
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
                                 "<td>"+ "<a class=\"view\" id="+value.department_id+" name="+value.department_name+" href=\"#/view_details/"+value.department_id+"/"+value.department_name+"/\">View Details</a>" +"</td>"+
                                 "<td>"+ "<a class=\"edit\" id="+value.department_id+" name="+value.department_name+" href=\"#/update_department/"+value.department_id+"/"+value.department_name+"/edit/0/\">Edit</a>" +"</td>"+
                                 "<td>"+ "<a class=\"delete\" id="+value.department_id+" name="+value.department_name+" href=\"#/delete_department/"+value.department_id+"/"+value.department_name+"/\">Delete</a>" +"</td>"+
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
           });

           // View details of department
         this.get('#/view_details/:id/?:name?/', function(context) {
        context.log('hi3');
              $("#main").load('/emp/view_details/');
         var pk=context.params.id; var name=context.params.name;
         $(document).ajaxStart(function(){$("#wait").css("display","block"); });
        $.ajax({
            url: "/emp/employee/",
            type: "GET",
            dataType: "json",
            success: function(data){
                $("#viewdet").html("Employees of "+name+" department")
                if(data.length!=0){

                    $.each(data,function(key,value){
                            if(value.department==pk) {

                              $("#emp_list").append("<tr>" +
                                    "<td>" + value.ename + "</td>" +
                                     "<td>" + value.age + "</td>" +
                                     "<td>" + value.emailid + "</td>" +
                                    "<td>" + value.mobno + "</td>" +
                                    "<td>" + value.designation + "</td>" +
                                    "</tr>");
                            } });
                }
                else{

                    $("#emp_list").append( "<tr id=\"nodata3\">"+ "<td class='alert-info' colspan='5'><center>"+ "<b>No Data Found</b>" +"</center></td>"+"</tr>");
                }

            },
            error: function (xhr, status, errorThrown) {
                       console.log("Sorry, there was a problem!");
                       console.log("Error: " + errorThrown);
                       console.log("Status: " + status);
                     }
        });$(document).ajaxComplete(function(){ $("#wait").css("display","none");  });
           });

        // Update department details
         this.get('#/update_department/:id/?:name?/', function(context) {
           context.log('hi5');
           var department=$("#id_department1").val();
             var pk=context.params.id;  var name=context.params.name;
         if (department.length == 0) {

                window.location.hash="/update_department/"+pk+"/"+name+"/edit/1/";
         }
         else {
            $(document).ajaxStart(function(){   $("#wait").css("display","block");      });
            $.ajax({
                url:  "/emp/department/",
                type: "GET",
                dataType:"JSON",
                success: function (data) {
                   data=JSON.parse(data);
                   var flag = false;
                    $.each((data), function (k,v) {
                        if (department == v.department_name) { flag = true;  }  });
                    if (flag == true) {
                        window.location.hash="/update_department/"+pk+"/"+name+"/edit/2/";
                    }
                    else {
                     $(document).ajaxStart(function(){   $("#wait").css("display","block");      });
                       $.ajax({
                            url: "/emp/department/" + pk + "/",
                            type: "PUT",
                            data: { "department_name": "" + department + "" },
                            dataType: "json",

                            success: function () {
                                window.location.hash="/department_list/";

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


        //Edit department page
         this.get('#/update_department/:id/?:name?/?:edit?/?:value?/', function(context) {
        context.log('hi4');
         var pk=context.params.id; var name=context.params.name;
         var value=context.params.value;
         if(value==0){
             $("#main").load('/emp/update_department/',function(){
                    $("#error2").hide();
                    $("#id_department1").val(name);
                    $("#id_department1").focus();
                    $(".update").attr("href","#/update_department/"+pk+"/"+name+"/");         }); }
         else if(value==1){
               $("#error2").show();
               $("#error2").html("*Empty department field is not allowed!! Please try again");
               $("#error2").css("color", "red");
         }
         else if(value==2){
               $("#error2").show();
               $("#error2").html("*This department already exists! Please try again!!");
               $("#error2").css("color", "red");
         }
           });

        //delete department
         this.get('#/delete_department/:id/?:name?/', function(context) {
         context.log('hi6');
         var pk=context.params.id; var name=context.params.name;
         var delValue=confirm("Do you really want to delete  "+ name + " department?");
         if(delValue==true) {
            url = "/emp/department/"+pk+"/";
            $(document).ajaxStart(function(){   $("#wait").css("display","block");      });
            $.ajax({
                url: url,
                type: "DELETE",
                dataType: "parseJSON",
                success: function () { window.location.hash="/department_list/"; },
                error: function (xhr, status, errorThrown) {
                    console.log("Sorry, there was a problem!");
                    console.log("Error: " + errorThrown);
                    console.log("Status: " + status);
                }}); $(document).ajaxComplete(function(){ $("#wait").css("display","none");  });
         }
         else{  window.location.hash="/department_list/"; }
         });

        // Add new department
         this.get('#/add_department/', function(context) {
           context.log('hi7');
           var department=$("#id_department").val();
         if (department.length == 0) {

                window.location.hash="/new_department/new/1/";
         }
         else {
           url = "/emp/department/";
           var department = $("#id_department").val();
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

                        if (flag==true) {  window.location.hash="/new_department/new/2/"; }
                        else {
                            $(document).ajaxStart(function(){   $("#wait").css("display","block");      });
                            $.ajax({
                                url: url,
                                type: "POST",
                                data: { "department_name": "" + department + "" },
                                dataType: "json",
                                success: function (data) {
                                        window.location.hash="/department_list/";
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

                });$(document).ajaxComplete(function(){ $("#wait").css("display","none");  });  }

       });

        //new department page
         this.get('#/new_department/:new?/?:value?/', function(context) {
         context.log('hi8');
         var value=context.params.value;
         if(value==0){
             $("#main").load('/emp/add_department/',function(){
                    $('#id_department').val(null);
                    $('#error1').hide("");
                    $("#id_department").focus();
             }); }
         else if(value==1){
               $("#error1").show();
               $("#error1").html("*Empty department field is not allowed!! Please try again");
               $("#error1").css("color", "red");
         }
         else if(value==2){
               $("#error1").show();
               $("#error1").html("*This department already exists! Please try again!!");
               $("#error1").css("color", "red");
         }

           });


        /*  *********************************** Department routes end ***********************************  */

        /*  *********************************** Employee routes begin ***********************************  */

         // Main page List of Employee
        this.get('#/employee_list/', function(context) {
        context.log('hello1');
        $("#main").load('/emp/employee_list/')
        $(document).ajaxStart(function(){$("#wait").css("display","block"); });
         $.ajax({
                url: "/emp/employee/",
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
                                           var dept_name=data.department_name;
                                    $("#emp_list1").append("<tr id=" + value.employee_id + ">" +
                                    "<td id=\"emp1\">" + value.ename + "</td>" +
                                    "<td id=\"emp2\">" + value.age + "</td>" +
                                    "<td id=\"emp3\">" + value.emailid+ "</td>" +
                                    "<td id=\"emp4\">" + value.mobno + "</td>" +
                                    "<td id=\"emp5\">" + value.designation + "</td>" +
                                    "<td id=\"emp6\">" + dept_name + "</td>" +
                                    "<td>" + "<a class=\"view\" id="+value.employee_id+" name="+value.ename+" href=\"#/employee_detail/"+value.employee_id+"/"+value.ename+"/\">View Details</a>"+"</td>" +
                                    "<td>" + "<a class=\"edit\" id="+value.employee_id+" name="+value.ename+" href=\"#/update_employee/"+value.employee_id+"/"+value.ename+"/edit/0/\">Edit</a>"  + "</td>" +
                                    "<td>"+ "<a class=\"delete\" id="+value.employee_id+" name="+value.ename+" href=\"#/delete_employee/"+value.employee_id+"/"+value.ename+"/\">Delete</a>" +"</td>"+
                                    "</tr>");


                                },
                                error:function (xhr, status, errorThrown) {
                                      console.log("Sorry, there was a problem!"); }
                                }); $(document).ajaxComplete(function(){ $("#wait").css("display","none");  });
                 });
                }    },
            error: function (xhr, status, errorThrown) {
                console.log("Sorry, there was a problem!");
                console.log("Error: " + errorThrown);
                console.log("Status: " + status);       }  });
            $(document).ajaxComplete(function(){ $("#wait").css("display","none");  });
           });

         // Add new Employee
         this.get('#/add_employee/', function(context) {
           context.log('hello3');
            var name=document.getElementById("ename_new");
            var age=document.getElementById("age_new");
            var email=document.getElementById("email_new");
            var mob=document.getElementById("mob_new");
            var designation=document.getElementById("designation_new");
            var id=$("#dropdepartment1").find('option:selected').attr("id");
            var department=$("#dropdepartment1").find('option:selected').attr("name");
             var flag1,flag2,flag3,flag4,flag5; var letters = /^[A-Za-z- ]+$/; alert("Hi");
              if(name.value.length==0)
            {
                $("#new1").html("*Empty Name field is not allowed");  $("#new1").css("color","red"); flag1=false;
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
             window.location.hash="/new_employee/new/1/"

            if(flag1 && flag2 && flag3 && flag4 && flag5)
            {
                 url="/emp/employee/"
                 $(document).ajaxStart(function(){     $("#wait").css("display","block");       });
                 $.ajax({
                                url: url,
                                type: "POST",
                                data: { "ename": "" + name.value + "","age":  age.value ,"emailid": "" + email.value + "","mobno": mob.value,"designation": "" + designation.value + "" ,"department": id },
                                dataType: "json",
                                //processData:false,
                               // contentType:"application/json",
                                success: function (data) {
                                    window.location.hash="/employee_list/"

                                },
                                error: function (xhr, status, errorThrown) {

                                    console.log("Sorry, there was a problem!");
                                    console.log("Error: " + errorThrown);
                                    console.log("Status: " + status);
                                }
                         });$(document).ajaxComplete(function(){ $("#wait").css("display","none");  });
            }


       });

        //new employee page
         this.get('#/new_employee/:new?/?:value?/', function(context) {
         context.log('hello2');
         var value=context.params.value;
         if(value==0){
             $("#main").load('/emp/add_employee/',function(){

                $(document).ajaxStart(function(){     $("#wait").css("display","block");       });
                $.ajax({
                             url: "/emp/department/",
                              type: "GET",
                             dataType: "json",
                            success: function (data) {
                                if(data.length==0){ $("#newerror").show(); $("#newemp").hide();}
                                else{
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
             }); }
         else if(value==1) {  }
           });

          // View details of employee
         this.get('#/employee_detail/:id?/?:name?/', function(context) {
        context.log('hello4');
        $("#main").load('/emp/employee_detail/');
        var pk=context.params.id; var name=context.params.name;
          $(document).ajaxStart(function(){     $("#wait").css("display","block");       });
         $.ajax({
                url:  "/emp/employee/"+pk+"/",
                type: "GET",
                dataType: "json",
                success: function (data) {
                    $(document).ajaxStart(function(){     $("#wait").css("display","block");       });
                    $.ajax({
                                url:"/emp/department/" + data.department + "/",
                                type: "GET",
                                dataType: "json",
                                success: function(data1){

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

         // Update employee details
         this.get('#/update_employee/:id/?:name?/', function(context) {
           context.log('hello5');
            var pk=context.params.id;  var name1=context.params.name;
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
              window.location.hash="#/update_employee/"+pk+"/"+name1+"/edit/1/"
            if(flag1 && flag2 && flag3 && flag4 && flag5)
            {
                $(document).ajaxStart(function(){     $("#wait").css("display","block");       });
               $.ajax({
                                url: "/emp/employee/" + pk + "/",
                                type: "PUT",
                                data: { "ename": "" + name.value + "","age":  age.value ,"emailid": "" + email.value + "","mobno": mob.value ,"designation": "" + designation.value + "" ,"department": id },
                                dataType: "json",
                                success: function (data) {
                                    window.location.hash="/employee_list/"
                                },
                                error: function (xhr, status, errorThrown) {

                                    console.log("Sorry, there was a problem!");
                                    console.log("Error: " + errorThrown);
                                    console.log("Status: " + status);
                                }
                         });$(document).ajaxComplete(function(){ $("#wait").css("display","none");  });
            }
       });

        //Edit employee page
         this.get('#/update_employee/:id/?:name?/?:edit?/?:value?/', function(context) {
        context.log('hello4');
         var pk=context.params.id; var name=context.params.name;
         var value=context.params.value;
         if(value==0){
             $("#main").load('/emp/update_employee/',function(){

              $(document).ajaxStart(function(){     $("#wait").css("display","block");       });
            $.ajax({
                url: "/emp/employee/"+pk+"/",
                type: "GET",
                dataType: "json",
                success: function (data) {
                      $(document).ajaxStart(function(){     $("#wait").css("display","block");       });
                    $.ajax({
                             url: "/emp/department/",
                              type: "GET",
                             dataType: "json",
                            success: function (data1) {
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
                              $(".update").attr("href","#/update_employee/"+pk+"/"+name+"/");
                    },
                error: function (xhr, status, errorThrown) {
                    console.log("Sorry, there was a problem!");
                    console.log("Error: " + errorThrown);
                    console.log("Status: " + status);
                } });
                $(document).ajaxComplete(function(){ $("#wait").css("display","none");  });
                },
                error: function (xhr, status, errorThrown) {
                    console.log("Sorry, there was a problem!");
                    console.log("Error: " + errorThrown);
                    console.log("Status: " + status);
                }

            });$(document).ajaxComplete(function(){ $("#wait").css("display","none");  });

             }); }
         else if(value==1){  }
         });

        //delete employee
         this.get('#/delete_employee/:id/?:name?/', function(context) {
         context.log('hello6');
         var pk=context.params.id; var name=context.params.name;
         var delValue=confirm("Do you really want to delete  "+ name + " named employee?");
         if(delValue==true) {
            url = "/emp/employee/"+pk+"/";
            $(document).ajaxStart(function(){     $("#wait").css("display","block");       });
            $.ajax({
                url: url,
                type: "DELETE",
                dataType: "parseJSON",
                success: function () {
                    $(document).ajaxStart(function(){     $("#wait").css("display","block");       });
                    $.ajax({
                     url: "/emp/employee/",
                     type: "GET",
                     dataType: "json",
                     success: function (data) {
                            window.location.hash="/employee_list/";
                         }  });
                    $(document).ajaxComplete(function(){ $("#wait").css("display","none");  });
                },
                error: function (xhr, status, errorThrown) {
                    console.log("Sorry, there was a problem!");
                    console.log("Error: " + errorThrown);
                    console.log("Status: " + status);
                }

            }); $(document).ajaxComplete(function(){ $("#wait").css("display","none");  });
        }
         else{   window.location.hash="/employee_list/"; }
         });



        /*  *********************************** Employee routes end ***********************************  */
    });
    $(function() {
          app.run('#/department_details/');
        });

})(jQuery);
