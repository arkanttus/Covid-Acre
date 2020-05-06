from django.contrib import admin
from django import forms
from django.forms import formset_factory
from .models import Caso, Registro, Cidade
from django.utils import timezone
import datetime

class CasoForm(forms.ModelForm):
    quantidade = forms.IntegerField(label='Quantidade', initial=1)

    class Meta:
        model = Caso
        exclude = ['data_update']

    def save(self, commit=True):
        quantidade = self.cleaned_data.get('quantidade', None)
        status = self.cleaned_data.get('status', None)
        cidade = self.cleaned_data.get('cidade', None)

        casos = [Caso(status=status, cidade=cidade, data_update=datetime.datetime.now()) for i in range(quantidade-1)]

        Caso.objects.bulk_create(casos)

        return super(CasoForm, self).save(commit=commit)

def marcar_confirmado(modeladmin, request, queryset):
    for caso in queryset:
        caso.status = "C";
        caso.save()

marcar_confirmado.short_description = "Marcar casos como confirmados"

def marcar_descartado(modeladmin, request, queryset):
    for caso in queryset:
        caso.status = "D";
        caso.save()

marcar_descartado.short_description = "Marcar casos como descartados"

def marcar_obito(modeladmin, request, queryset):
    for caso in queryset:
        caso.status = "O";
        caso.save()

marcar_obito.short_description = "Marcar casos como óbito"

@admin.register(Caso)
class CasoAdmin(admin.ModelAdmin):
    form = CasoForm
    fieldsets = (
            ('Informações', {'fields': ('cidade', 'status', 'quantidade')}),
        )


    list_display = ('status', 'cidade', 'data_update')
    list_filter = ['cidade']
    search_fields = ('status', 'cidade', 'data_update')
    ordering = ('cidade', 'status', 'data_update')
    actions = [marcar_confirmado, marcar_descartado, marcar_obito]
    filter_horizontal = ()



admin.site.site_header = "COVID-19 Acre"
admin.site.index_title = "Gerenciamento"
admin.site.site_title = admin.site.site_header + " - Painel"
admin.site.site_url = None

admin.site.register(Cidade)
admin.site.register(Registro)