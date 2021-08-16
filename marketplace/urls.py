from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
                  path('admin/', admin.site.urls),
                  path('api/v1/', include('accounts.urls')),
                  path('api/v1/', include('announcement.urls')),
                  path('api/v1/', include('advertisement.urls')),
                  path('api/v1/', include('userdata.urls')),
                  path('api/v1/', include('beats.urls')),
                  path('api/v1/', include('feeds.urls')),
                  path('api/v1/', include('donations.urls')),
                  path('api/v1/', include('redeemCoins.urls')),
                  path('api/v1/', include('support.urls')),
                  path('api/v1/', include('tweets.urls')),
                  path('api/v1/', include('blogs.urls')),
                  path('api/v1/', include('invitation.urls')),
                  path('api/v1/', include('subscriptions.urls')),
                  path("stripe/", include("djstripe.urls", namespace="djstripe")),


              ] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)




