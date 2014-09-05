from django.db import models

class Department(models.Model):
    department_id=models.AutoField(primary_key=True)
    department_name=models.CharField(max_length=200)

    def __unicode__(self):
        return self.department_name

class Employee(models.Model):
    employee_id=models.AutoField(primary_key=True)
    ename=models.CharField(max_length=200)
    age=models.IntegerField(default=0)
    emailid=models.EmailField(max_length=200)
    mobno=models.IntegerField()
    designation=models.CharField(max_length=20)
    department=models.ForeignKey(Department, on_delete=models.CASCADE)

