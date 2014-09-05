from django.forms import widgets
from rest_framework import serializers
from emp.models import Employee,Department


class DepSerializer(serializers.ModelSerializer):
    class Meta:
        model = Department
        fields = ['department_id','department_name']

class EmployeeSerializer(serializers.ModelSerializer):
    class Meta:
        model=Employee
        fields=['employee_id','ename','age','emailid','mobno','designation','department']






