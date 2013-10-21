var SignificationView = Backbone.View.extend({  // la vue correspondant � l'affichage d'une seule Signification

	el: '#div6',
	template: template('signification_Template'),
	initialize: function() {
		this.model.bind('change', this.render, this);
		this.render();
	},

	events: {
		"change #select-native-1": "countrySelected"
		


	},
	
	countrySelected: function(){
		alert($('#select-native-1').val());
		switch ($('#select-native-1').val())
		{
		case "A personne (Art 654 CPC)":
		  $('#form_lieu_remise').css('display','block');
		break;
	
		}
	},
	render: function(){


		this.$el.html( this.template(this.model.toJSON())); // on ins�re dans le li les donn�es du mod�le en suivant le template
		$('#div6').trigger('create'); // n�cessaire pour que le style jQuery mobile s'applique

		return this;
	},

	












}); 




