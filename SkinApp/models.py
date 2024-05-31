from django.db import models

# Create your models here.
class home(models.Model):
    title = models.CharField(max_length=50)
    smallContent = models.TextField(max_length=2000)

class about(models.Model):
    title = models.CharField(max_length=50)
    Content = models.TextField(max_length=2000)
    photo1 = models.TextField(max_length=5000)
    photo2 = models.TextField(max_length=5000)

class OurTeam(models.Model):
    topContent = models.TextField(max_length=2000)

class teamMemebers(models.Model):
    position = models.CharField(max_length=50)
    name = models.CharField(max_length=50)
    moreInfo = models.TextField(max_length=2000)
    photo = models.TextField(max_length=5000)
    def __str__(self):
        return f"{self.name}"

class Treatments(models.Model):
    title = models.CharField(max_length=50)
    moreInfo = models.TextField(max_length=2000)
    photo = models.TextField(max_length=5000)
    possitionInDesignRight = models.BooleanField(default=True)
    def __str__(self):
        return f"{self.title}"

class clinicInfo(models.Model):
    phoneNumber = models.CharField(max_length=50)
    location = models.TextField(max_length=100)
    locationLink = models.TextField(max_length=2000)
    emailAddress = models.TextField(max_length=2000)

class typeCategory(models.Model):
    title = models.CharField(max_length=100)

    def __str__(self):
        return self.title

class typeApp(models.Model):
    title = models.CharField(max_length=100)
    category = models.ForeignKey(typeCategory, on_delete=models.CASCADE, related_name='category', default=1)
    description = models.TextField(max_length=2000, blank=True)

    def __str__(self):
        return self.title


class Appointment(models.Model):
    name = models.CharField(max_length=100)
    type = models.ForeignKey(typeApp, on_delete=models.CASCADE, related_name='type', default=1)
    email = models.EmailField()
    phone = models.CharField(max_length=15)
    date = models.DateField()
    time = models.TimeField()
    description = models.TextField(max_length=2000, default="", blank=True)

    def __str__(self):
        return f"{self.name} - {self.date} at {self.time}"