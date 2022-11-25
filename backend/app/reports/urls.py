from django.urls import path
from .views import *

urlpatterns = [
    path("vendor_forecast/<str:description>/",
         vendor_forecast, name="vendor-forecast-report"),
    path("posted_vendor_forecast/<str:description>/",
         posted_vendor_forecast, name="posted-vendor-forecast-report"),
    path('mrp_summary_preview/', view=mrp_summary_preview,
         name='mrp-summary-preview'),
    path('save_to_pdf/', save_to_pdf, name='save-to-pdf')
]
