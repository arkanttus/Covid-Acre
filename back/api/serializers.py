from rest_framework import serializers
from api.models import Cidade

class CidadeSerializer(serializers.ModelSerializer):
    casos = serializers.SlugRelatedField(many=True, slug_field='status', read_only=True)



    class Meta:
        model = Cidade
        fields = ['nome', 'casos']