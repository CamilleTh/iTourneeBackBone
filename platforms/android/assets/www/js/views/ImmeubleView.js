

var ImmeubleView = Backbone.View.extend({  // la vue correspondant à l'affichage d'un seul Immeuble

	el: '#div5',
	template: template('immeubleTemplate'),
	initialize: function() {
	//	this.model.bind('change', this.render, this);
		this.render();
	},

	events: {
		'click #bouton_update' : 'update', // lors du clic sur un modèle on déclenche show alert (Bouton save)
		'click #bouton_creer' : 'creer_immeuble'	
	},
	render: function(){


		this.$el.html( this.template(this.model.toJSON())); // on insère dans le li les données du modèle en suivant le template
		$('#div5').trigger('create'); // nécessaire pour que le style jQuery mobile s'applique

		return this;
	},

	update : function() {
		this.model.sync('update',this.model);
	},

	creer_immeuble : function() {
		console.log('Creer immeuble')
		var now = new Date();
		var date = now.getDate() + "-" + now.getMonth() + "-" + now.getFullYear() + " " + now.getHours() +":"+now.getMinutes() +":"+ now.getSeconds(); // choix de la date pour avoir un id unique

		this.model.set({id_immeuble : date,  // création d'un modèle avc les données rentrées par l'utilisateur
			cle_ptt: $('input[name=radio_cle_ptt]:checked').val(), 
			cle_gaz: $('input[name=radio_cle_gaz]:checked').val(),
			interphone : $('input[name=radio_interphone]:checked').val(),
			code_vigik : $('#code_vigik').val(),
			digicode : 	$('#digicode').val(),
			cle_ptt_sas : 		$('input[name=radio_cle_ptt_sas]:checked').val(),
			interphone_sas : $('input[name=radio_interphone_sas]:checked').val(), 
			acces_gardien_sas : $('input[name=radio_acces_gardien_sas]:checked').val(),
			digicode_sas : $('#digicode_sas').val(),
			nom_gardien : $('#nom_gardien').val(),
			telephone_gardien : $('#telephone_gardien').val(),
			plage_horaires_gardien : 	$('#plage_horaires_gardien').val(), 
			nom_syndic : $('#nom_syndic').val(), 
			tel_syndic : $('#tel_syndic').val(),
			commentaire : $('#commentaire').val(),
			modifie : true,
			etage : $('#etage').val(),
			porte : $('#porte').val() });

		this.render();
		this.model.save();
		current_view_document.model.set('immeuble',date);


	},








}); 

var ImmeublesView = Backbone.View.extend({ 

	initialize: function() {

		this.collection.getDataXML({reset: true}); // le fichier xml est parcouru --> cela lance un fetch() --> reset	
		this.collection.bind('reset', this.render, this);  // lorsque l'évenement reset est déclenché, on lance le render
	},
	render: function(){
		console.log("entrée dans render");
		console.log(this);
		this.collection.each(function(immeuble){
			// pour chaque document dans la collection, on crée une nouvelle vue
			//var adresseView = new AdresseView({ model: adresse });
			immeuble.save(); // et on sauvegarde l'immeuble --> fonction sync du model

		},this);

		immeubledao.contenu_immeuble(); // une fois la collection crée , on affiche son contenu   // pas le bon endroit pour mettre cette méthode ?  .fetch() ne redirige pas vers le case read de la méthode sync();
		return this;
	}
});

