# from django.db import models
#
#
# # Create your models here.
# class Donations(models.Model):
#     email = models.EmailField(max_length=300)
#     instagram_username = models.CharField(max_length=234,
#                                           help_text="just for a record purpose, who help us. you can leave it blank.",
#                                           null=True, blank=True)
#     amount = models.CharField(max_length=240)
#     payment_method_id = models.CharField(max_length=500)
#     donate_at = models.DateField(auto_now_add=True, db_index=True)
#
#     class Meta:
#         ordering = ('-donate_at',)
#
#     def __str__(self):
#         return f'{self.instagram_username} donate {self.amount}'
