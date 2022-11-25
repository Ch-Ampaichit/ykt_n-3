from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('authentication.urls')),
    path('', include('core.urls')),
    path('', include('forecast.urls')),
    path('report/', include('reports.urls')),

] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

admin.site.site_header = "YKT Forecast N+3 Admin"
admin.site.site_title = "YKT Forecast N+3 Portal"
admin.site.index_title = "Welcome to YKT Forecast N+3 Portal"
