from django import forms

class ValoresForm(forms.Form):
    conteudo = forms.CharField(label="Tabela de Casos", widget=forms.Textarea(attrs={'rows': 20, 'cols': 100}), max_length=800)
    conteudo2 = forms.CharField(label="Tabela de Detalhes", widget=forms.Textarea(attrs={'rows': 20, 'cols': 100}), max_length=800)
