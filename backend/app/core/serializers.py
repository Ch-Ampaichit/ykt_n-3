from rest_framework import serializers
from .models import UserSetup, MenuSuite, Menu, SubMenu
from forecast.models import MRPJournalBatch


class SubMenuSerializer(serializers.ModelSerializer):

    class Meta:
        model = SubMenu
        # fields = '__all__'
        fields = ['key', 'label', 'title', 'icon', 'type', 'children']
        depth = 5


class MenuSerializer(serializers.ModelSerializer):
    children = SubMenuSerializer(many=True)

    class Meta:
        model = Menu
        fields = ['key', 'label', 'title', 'icon', 'type', 'children']
        depth = 5


class MenuSuiteSerializer(serializers.ModelSerializer):
    menus = MenuSerializer(many=True)

    class Meta:
        model = MenuSuite
        fields = '__all__'
        depth = 5


class MRPJournalBatchSerializer(serializers.ModelSerializer):

    class Meta:
        model = MRPJournalBatch
        fields = ['batch_name']


class UserSetupSerializer(serializers.ModelSerializer):
    menu_suite = MenuSuiteSerializer()
    mrp_jnl_batch = MRPJournalBatchSerializer()

    class Meta:
        model = UserSetup
        fields = ['menu_suite', 'mrp_jnl_batch']
        depth = 1
