var modele_courant; // utilisation d'une variable globale. mauvaise pratique ?
var maj = false;


var DocumentView = Backbone.View.extend({  // la vue correspondant à l'affichage d'un seul Document

	tagName: 'li', // infos contenues dans un li
	template: template('document_item_Template'),
	initialize: function() {

		this.model.bind('change:valide', this.render, this);  // lorsqu'on change l'attribut valide du modele --> render
		this.model.bind('change:immeuble', this.maj_immeuble, this);  // lorsqu'on change l'attribut valide du modele --> render
	},// le template qui sera utilisé
	render: function(){

		this.$el.html( this.template(this.model.toJSON())); // on insère dans le li les données du modèle en suivant le template
		//	current_view_detail_document.model.set('valide',this.model.get('valide'));
		return this;
	},

	events: {
		'click' : 'afficher_infos' // lors du clic sur un modèle on déclenche la méthode afficher infos
	},

	maj_immeuble: function(){
		maj = true;
		this.model.sync('update',this.model);
		maj = false;
	},

	afficher_infos: function(){
		
		var _this = this;
		
		this.model.fetch({
			success: function(){
				//var d = new DetailDocumentView({ model: _this.model });
				current_view_detail_document.model.set(_this.model.attributes);     // ne marche pas avec DocumentView . Pourquoi ?
				//current_view_detail_document.render();
				//s	$('#div3').trigger('create'); // nécessaire pour que le style jQuery mobile s'applique

				$('#maform').css('display','block'); // affichage du slider dans le footer
				modele_courant = _this.model;


				if(_this.model.get('valide') == "true"){ // si le document est validé, on passe le slider dans la position validé

					$("#flip-1").val("on");
					
					
					
				}
				else{
					$("#flip-1").val("off"); // sinon dans la position non validé
					$("#flip-1").slider("refresh");	
				}
			}
		});	
		
		var adresse = new AdresseModel({id_adresse : this.model.get('adresse')});
		adresse.fetch({

			success: function(){

				//	var a = new AdresseView({ model: adresse });
				current_view_adresse.model.set(adresse.attributes); // ici cela fonctionne . quelle est la meilleure solution?
				$('#div4').trigger('create');





			}
		});
		var immeuble = new ImmeubleModel({id_immeuble : this.model.get('immeuble')});
		immeuble.fetch({

			success : function(){

				//var i = new ImmeubleView({ model: immeuble });

				current_view_immeuble.model.set(immeuble.attributes);
				//current_view_immeuble.render();

				//current_view_immeuble = i;
				$('#div5').trigger('create');


			}
		});
		
		var type_mode_signification = new Type_mode_significationModel({});
		type_mode_signification.fetch({
			success : function(){

				
				//alert(type_mode_signification.get('liste'));
				$('#select-native-1').append(type_mode_signification.get('liste'));


			}
			
		}); 
		//var d = new DetailDocumentView({ model: this.model });
		//$('#div3').trigger('create');



	}

});

var DocumentsView = Backbone.View.extend({ // la vue correspondant à la liste latérale (tous les documents)
	el: '#liste_significations', // insertion dans ma_liste
	tagName: 'ul',
	initialize: function() {

		this.collection.getDataXML({reset: true}); // le fichier xml est parcouru --> cela lance un fetch() --> reset	
		this.collection.bind('reset', this.render, this); // lorsque l'évenement reset est déclenché, on lance le render
		var mondoc = new DocumentModel({id_etude : "",
			numero_document : "",
			nature_signification : "",
			nature_parquet : "",
			nom_tiers_a_signifier: "",
			type_tiers_a_signifier : "",
			civilite_tiers_a_signifier : "",
			nom_debiteur : "",
			commentaires_tiers : "",
			domicile_elu : "",
			presomption_domiciliation : "",
			domicilie : "",
			numero_tiers_a_signifier : "",
			libelle_document : "",
			signataire : "",
			nombre_feuillets : "",
			signification : "",
			valide : ""
		}); 
		//var d = new DetailDocumentView({ model: mondoc });
		current_view_detail_document  = new DetailDocumentView({ model: mondoc});


		var monadresse = new AdresseModel({
			idAdresse : "",
			texte_libre : "",
			complement1 : "",
			complement2 : "",
			numero :"",
			complement_numero : "",
			nature_voie : "",
			lien_nature_nom_voie : "", 
			nom_voie : "", 
			code_postal : "", 
			nom_commune : "", 
			commentaire : "", 
			statut : "",
			type : ""
		}); // création d'un modèle avec des valeurs nulles pour le démarrage de l'application

		//var a= new AdresseView({ model: monadresse});
		current_view_adresse  = new AdresseView({ model: monadresse}); // bonne ou mauvaise pratique ?

		var monimmeuble = new ImmeubleModel({
			id_immeuble : "", 
			cle_ptt : " ", 
			cle_gaz : " ",
			interphone : "",
			code_vigik : "",
			digicode : "", 
			cle_ptt_sas : "", 
			interphone_sas : "", 
			acces_gardien_sas : "", 
			digicode_sas : "", 
			nom_gardien : "",
			telephone_gardien : "", 
			plage_horaires_gardien : "", 
			nom_syndic : "", 
			tel_syndic : "", 
			commentaire : "", 
			modifie : "",
			etage : "", 
			porte : ""



		}); // création d'un modèle avec des valeurs nulles pour le démarrage de l'application


		current_view_immeuble  = new ImmeubleView({ model: monimmeuble});


	},
	render: function(){
		console.log("entrée dans render");
		console.log(this);
		this.collection.each(function(document){ // pour chaque document dans la collection, on crée une nouvelle vue


			var documentView = new DocumentView({ model: document });
			document.save(); // et on sauvegarde le document --> fonction sync du model

			this.$el.append(documentView.render().el); // insertion des données dans une vue individuelle

			document.fetch({ // onsauvegarde les nouveaux documents, puis on regarde si il est deja validé ou non
				success: function(){

					if( document.get('valide') == 'true' || document.get('valide') == true){ // pareil, pourquoi parfois c'est true et d'autre fois "true" ?
						document.set('valide',true);
					} 

				} 
			});



		},this);

		documentdao.contenu_document(); // une fois la collection crée , on affiche son contenu   // pas le bon endroit pour mettre cette méthode ?  .fetch() ne redirige pas vers le case read de la méthode sync();
		type_mode_significationdao.contenu_type_mode_signification();
		$('#liste_significations').listview('refresh');
		return this;
	}
});

function template(id){
	return _.template( $('#'+id).html());
}

$( "#flip-1" ).slider({
	stop: function( event, ui ) {

		if($("#flip-1").val() == "off"){
			console.log($("#flip-1").val());
			$('#div3').trigger('create'); // nécessaire pour que le style jQuery mobile s'applique
			modele_courant.sync('update',modele_courant); // force à rentrer dans le cas update dans la fonction sync
			current_view_detail_document.model.set('valide',false);
		} 

		if($("#flip-1").val() == "on"){
			console.log("dans on");
			$('#div3').trigger('create'); // nécessaire pour que le style jQuery mobile s'applique
			current_view_detail_document.model.set('valide',false);  
			modele_courant.sync('update',modele_courant); // force à rentrer dans le cas update dans la fonction sync
			current_view_detail_document.model.set('valide',true);
		} 
	}
});


$("#cloreTournee").click(function(){
	
	alert("Généraration fichier...");
	var promiseValid = documentdao.documentsValid();
	console.log(promiseValid);
	
	promiseValid.then(function(DocumentUnValide){
		//if(DocumentUnValide == 0){
		start().then(function(success){
			alert("Fichier généré!");
		});
		//}
	})
});









