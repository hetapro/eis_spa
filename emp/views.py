from bsddb import db
from django.views import generic

from emp.models import Employee,Department
from emp.serializers import DepSerializer, EmployeeSerializer
from rest_framework import viewsets


class Department_List(viewsets.ModelViewSet):
    model = Department
    queryset = Department.objects.all()
    serializer_class = DepSerializer

class Employee_List(viewsets.ModelViewSet):
    model = Employee
    queryset = Employee.objects.all()
    serializer_class = EmployeeSerializer

class IndexView(generic.TemplateView):
    template_name = 'emp/index.html'


class List1(generic.ListView):
  #  context_object_name = 'depl'
   # template_name = 'emp/department_details.html'
    template_name = 'emp/demo.html'
    model=Department
   # def get_queryset(self):
    #   return Department.objects.all()

class List(generic.ListView):
    #context_object_name = 'empl'
    template_name = 'emp/employee_details.html'
    model = Employee
    #def get_queryset(self):
     #  return Employee.objects.all()

class Department_list(generic.TemplateView):
    template_name = 'emp/department_list.html'

class Add_department(generic.TemplateView):
    template_name = 'emp/add_department.html'

class View_department(generic.TemplateView):
    template_name = 'emp/view_details.html'

class Update_department(generic.TemplateView):
    template_name = 'emp/update_department.html'

class Employee_list(generic.TemplateView):
    template_name = 'emp/employee_list.html'

class Add_employee(generic.TemplateView):
    template_name = 'emp/add_employee.html'

class View_employee(generic.TemplateView):
    template_name = 'emp/employee_detail.html'

class Update_department(generic.TemplateView):
    template_name = 'emp/update_employee.html'


