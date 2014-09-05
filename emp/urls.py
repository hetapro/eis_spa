from django.conf.urls import patterns,url
from emp.views import Department_List,Employee_List
from emp import views
from rest_framework.urlpatterns import format_suffix_patterns
from rest_framework import renderers
dep_list = Department_List.as_view({
    'get': 'list',
    'post': 'create'
},)
dep_detail = Department_List.as_view({
    'get': 'retrieve',
    'put': 'update',
    'patch': 'partial_update',
    'delete': 'destroy'
})
emp_list = Employee_List.as_view({
    'get': 'list',
    'post': 'create'
},)
emp_detail = Employee_List.as_view({
    'get': 'retrieve',
    'put': 'update',
    'patch': 'partial_update',
    'delete': 'destroy'
})
urlpatterns=patterns('',url(r'^$',views.IndexView.as_view(), name="index"),
                        url(r'^employee_details/$', views.List.as_view(), name="List"),
                        url(r'^department_details/$',views.List1.as_view(),name="List1"),
                        url(r'^department/$',dep_list,name='department'),
                        url(r'^department/(?P<pk>[0-9]+)/$',dep_detail,name='department1'),
                        url(r'^employee/$',emp_list,name='employee'),
                        url(r'^employee/(?P<pk>[0-9]+)/$',emp_detail,name='employee1'),
                        url(r'^department_list/$',views.Department_list.as_view(),name="department_list"),
                        url(r'^add_department/$',views.Add_department.as_view(),name="add_department"),
                        url(r'^view_details/$',views.View_department.as_view(),name="view_details"),
                        url(r'^update_department/$',views.Update_department.as_view(),name="update_department"),
                        url(r'^employee_list/$',views.Employee_list.as_view(),name="employee_list"),
                        url(r'^add_employee/$',views.Add_employee.as_view(),name="add_employee"),
                        url(r'^employee_detail/$',views.View_employee.as_view(),name="employee_detail"),
                        url(r'^update_employee/$',views.Update_department.as_view(),name="update_employee"),
                     )
#urlpatterns = format_suffix_patterns(urlpatterns)

