from django.contrib import admin
from .models import home, about, OurTeam, teamMemebers, Treatments, clinicInfo, Appointment, typeApp, typeCategory

# Register your models here.
admin.site.register(home)
admin.site.register(about)
admin.site.register(OurTeam)
admin.site.register(Treatments)
admin.site.register(teamMemebers)
admin.site.register(clinicInfo)
admin.site.register(Appointment)
admin.site.register(typeApp)
admin.site.register(typeCategory)
