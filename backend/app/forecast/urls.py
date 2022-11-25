from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

from . import api

router = DefaultRouter()
router.register(r'items', api.ItemViewSet, basename='items')
router.register(r'vendors', api.VendorViewSet, basename='vendors')
router.register(r'item-categories', api.ItemCategoryViewSet,
                basename='item-category')
router.register(r'units-of-measure', api.UnitOfMeasureViewSet,
                basename='units-of-measure')
router.register(r'mrp_journal_line', api.MRPJournalLineViewSet,
                basename='mrp-journal-line')
router.register(r'mrp_jnl_batch', api.MRPJournalBatchViewSet,
                basename='mrp-jnl-batch')
router.register(r'vendor_forecast', api.VendorForecastHeaderViewSet,
                basename='vendor-forecast')
router.register(r'posted_vendor_forecast', api.PostedVendorForecastHeaderViewSet,
                basename='posted-vendor-forecast')
router.register(r'vendor_forecast_detail', api.VendForecastHeaderDetailViewSet,
                basename='vendor-forecast-detail')

urlpatterns = [
    path('api/', include(router.urls)),
    path('api/mrp_worksheet/', api.mrp_worksheet),
    path('api/gen_vend_forecast/', api.generate_vend_forecast),
    # path('api/showvfh/', views.show_vfh, name='showvfh'),
]
