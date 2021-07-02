from django.contrib import admin

# Register your models here.
from django.contrib.auth.admin import UserAdmin
from import_export import resources, fields, widgets

from .models import User, Profile, Contact, UserPasswordReset
from import_export.admin import ImportExportModelAdmin

admin.site.site_header = "Digitvl Dashboard"


class UserResource(resources.ModelResource):
    delete = fields.Field(widget=widgets.BooleanWidget())

    def for_delete(self, row, instance):
        return self.fields['delete'].clean(row)

    class Meta:
        model = User
        fields = ('first_name', 'last_name', 'username', 'email', 'phone_number', 'is_email_verified')


@admin.register(User)
class UserAdmin(ImportExportModelAdmin):
    resource_class = UserResource
    list_filter = ('is_email_verified',)
    search_fields = ('username', 'phone_number', 'email')


admin.site.register(Profile)
admin.site.register(Contact)
admin.site.register(UserPasswordReset)
