from django.conf.urls import patterns, include, url


from django.contrib import admin

admin.autodiscover()

urlpatterns = patterns('',
    # Examples:
    # url(r'^$', 'eis.views.home', name='home'),
    # url(r'^blog/', include('blog.urls')),

    url(r'^emp/', include('emp.urls',namespace="emp")),
    url(r'^admin/', include(admin.site.urls)),
)
