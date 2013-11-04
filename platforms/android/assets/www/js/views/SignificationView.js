var SignificationView = Backbone.View.extend({  // la vue correspondant à l'affichage d'une seule Signification

	el: '#div6',
	template: template('signification_Template'),
	initialize: function() {
		this.model.bind('change', this.render, this);
		this.render();
	},

	events: {
		"change #select-native-1": "countrySelected",
		"change #select-native-5": "lieuRemiseSelected",
		"change #select-native-7": "avisPassageSelected"
			
	},
	
	resetForm : function(){
		$('#remis').css('display','none');
		$('#civilite').css('display','none');
		$('#div_nom').css('display','none');
		$('#div_prenom').css('display','none');
		$('#qualite').css('display','none');
		$('#lieu_remise').css('display','none');
		$('#motif_nom_remise').css('display','none');
		$('#div_motif_non_remise_autre').css('display','none');
		$('#mode_avis_passage').css('display','none');
		$('#div_avis_passage_autre').css('display','none');
		$('#type_cert').css('display','none');
		$('#div_information_complementaire').css('display','none');
		$('#div_domicile_certif').css('display','none');
		$('#div_adresse').css('display','none');
		
	},
	
	avisPassageSelected: function(){
	
		switch ($('#select-native-7').val()){
			case "142":
			  $('#div_avis_passage_autre').css('display','block');
			break;
			default:
			  $('#div_avis_passage_autre').css('display','none');
			break;
				
		}
	},
	
	lieuRemiseSelected: function(){
		
		
		switch ($('#select-native-5').val()){
			case "304":
				$('#div_adresse').css('display','block');
				$('#div_information_complementaire').css('display','block');
			break;
			case "305":
				$('#div_adresse').css('display','none');
				$('#div_information_complementaire').css('display','block');
			break;
			case "307":
			case "308":
			case "309":
				$('#div_adresse').css('display','none');
				$('#div_information_complementaire').css('display','none');
			break;
		}
	
	},
	
	countrySelected: function(){
		this.resetForm();
		switch ($('#select-native-1').val())
		{
		case "1":
			$('#lieu_remise').css('display','block');
			this.lieuRemiseSelected();
		break;
		case "2":
			$('#remis').css('display','block');
			$('#civilite').css('display','block');
			$('#qualite').css('display','block');
			$('#div_nom').css('display','block');
			$('#div_prenom').css('display','block');

		break;
		case "4":
			$('#motif_nom_remise').css('display','block');
			$('#div_motif_non_remise_autre').css('display','block');
			$('#mode_avis_passage').css('display','block');
			$('#div_domicile_certif').css('display','block');
		break;
		case "6":
		case "38":
			$('#div_information_complementaire').css('display','block');
		break;
		  
	
		}
	},
	
	render: function(){
		
		this.$el.html( this.template(this.model.toJSON())); // on insère dans le li les données du modèle en suivant le template
		$('#div6').trigger('create'); // nécessaire pour que le style jQuery mobile s'applique
		return this;
	}
}); 




