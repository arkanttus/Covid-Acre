from django import forms

class ValoresForm(forms.Form):
    recuperados = forms.IntegerField()
    conteudo = forms.CharField(widget=forms.Textarea, max_length=500)