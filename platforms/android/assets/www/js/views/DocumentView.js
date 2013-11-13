var modele_courant; // utilisation d'une variable globale. mauvaise pratique ?
var maj = false;


var DocumentView = Backbone.View.extend({  // la vue correspondant à l'affichage d'un seul Document

	tagName: 'li', // infos contenues dans un li
	template: template('document_item_Template'),  // --> voir index.html template  'document_item_Template'
	initialize: function() {

		this.model.bind('change:valide', this.render, this);// lorsqu'on change l'attribut valide du modele --> render
		this.model.bind('change:civilite_tiers_a_signifier', this.render, this);
		this.model.bind('change:immeuble', this.maj_immeuble, this);  // lorsqu'on change l'attribut immeuble du modele --> on déclenche la méthode maj_immeuble 
	},
	render: function(){
        //alert("render");
		
		alert(this.model.get('civilite_tiers_a_signifier'))
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
		
		this.model.fetch({ // on fait un fetch, ce qui nous fait rentrer dans le case read de la function sync dans DocumentModel
			success: function(){
				//var d = new DetailDocumentView({ model: _this.model });
				
				// ne marche pas avec DocumentView . Pourquoi ?
			
				//current_view_detail_document.model.set(_this.model.attributes);
				current_view_detail_document.model.set('numero_document',_this.model.get('numero_document'))
				current_view_detail_document.model.set('id_etude',_this.model.get('id_etude'))
				//current_view_detail_document.model.set('nature_signification',_this.model.get('nature_signification'))
				current_view_detail_document.model.set('nature_parquet',_this.model.get('nature_parquet'))
				current_view_detail_document.model.set('nom_tiers_a_signifier',_this.model.get('nom_tiers_a_signifier'))
				current_view_detail_document.model.set('type_tiers_a_signifier',_this.model.get('type_tiers_a_signifier'))
				//current_view_detail_document.model.set('civilite_tiers_a_signifier',_this.model.get('civilite_tiers_a_signifier'))
				current_view_detail_document.model.set('nom_debiteur',_this.model.get('nom_debiteur'))
				current_view_detail_document.model.set('commentaires_tiers',_this.model.get('commentaires_tiers'))
				current_view_detail_document.model.set('domicile_elu',_this.model.get('domicile_elu'))
				current_view_detail_document.model.set('presomption_domiciliation',_this.model.get('presomption_domiciliation'))
				current_view_detail_document.model.set('domicilie',_this.model.get('domicilie'))
				current_view_detail_document.model.set('domiciliation',_this.model.get('domiciliation'))
				current_view_detail_document.model.set('numero_tiers_a_signifier',_this.model.get('numero_tiers_a_signifier'))
				current_view_detail_document.model.set('libelle_document',_this.model.get('libelle_document'))
				current_view_detail_document.model.set('signataire',_this.model.get('signataire'))
				current_view_detail_document.model.set('nombre_feuillets',_this.model.get('nombre_feuillets'))
				current_view_detail_document.model.set('adresse',_this.model.get('adresse'))
				current_view_detail_document.model.set('immeuble',_this.model.get('immeuble'))
				current_view_detail_document.model.set('signification',_this.model.get('signification'))					
				alert("1");
				
				var promise = type_famille_documentdao.getTypeFamilleLibelle(_this.model.get('nature_signification'));
				
				
				var typetiers = _this.model.get('type_tiers_a_signifier');
				var civ = _this.model.get('civilite_tiers_a_signifier')
			
				var promiseCivilite = type_civilitedao.getTypeCiviliteLibelle(civ,typetiers);
				
				promise.then(function(libelleNatureSignification){
					alert("2");
					promiseCivilite.then(function(libelleCivilite){
						alert("3");
						current_view_detail_document.model.set('nature_signification',libelleNatureSignification)
						current_view_detail_document.model.set('civilite_tiers_a_signifier',libelleCivilite)
						alert("4");
					});
				});
				//current_view_detail_document.render();
				//s	$('#div3').trigger('create'); // nécessaire pour que le style jQuery mobile s'applique
				
				$('#div2').css('display','block');
				$('#blockValide').css('display','block');
				$('#maform').css('display','block'); // affichage du slider dans le footer
				modele_courant = _this.model;


				if(_this.model.get('valide') == "true"){ // si le document est validé, on passe le slider dans la position validé
					$("#flip-1").val("on");
					$("#flip-1").slider("refresh");	
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
	el: '#liste_significations', // insertion dans la liste #liste_significations
	tagName: 'ul', 
	initialize: function() {

		this.collection.getDataXML({reset: true}); // parcours du fichier XML via les méthodes getDataXML et parse --> voir DocumentModel.js à DocumentCollection   un événement reset est déclenché	
		this.collection.bind('reset', this.render, this); // lorsque l'évenement reset est déclenché, on rentre dans le render --> affichage de la vue
		var mondoc = new DocumentModel({id_etude : "",    // création d'un doc avc des attributs vides pour l'afficher dans la partie droite de l'appli --> inutile maintenant ?
			numero_document : "",
			nature_signification : "",
			nature_parquet : "",
			nom_tiers_a_signifier: "",
			type_tiers_a_signifier : "",
			civilite_tiers_a_signifier : "",
			nom_debiteur : "",
			commentaires_tiers : "",
			domicile_elu : "",
			domiciliation : "",
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
		current_view_detail_document  = new DetailDocumentView({ model: mondoc}); // création d'une nouvelle vue DetailDocument avc les attributs vides de mondoc : inutile ? --> voir DetailDocumentView.js à initialize


		var monadresse = new AdresseModel({ // création d'une adresse avc des attributs vides pour l'afficher dans la partie droite de l'appli --> inutile maintenant ?
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
		}); 

		//var a= new AdresseView({ model: monadresse});
		current_view_adresse  = new AdresseView({ model: monadresse}); // création d'une nouvelle vue Adresse avc les attributs vides de monadresse : inutile ? --> voir AdresseView.js à initialize

		var monimmeuble = new ImmeubleModel({ // création d'un immeuble avc des attributs vides pour l'afficher dans la partie droite de l'appli --> inutile maintenant ?
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



		}); 


		current_view_immeuble  = new ImmeubleView({ model: monimmeuble}); // création d'une nouvelle vue Immeuble avc les attributs vides de monimmeuble : inutile ? --> voir ImmeubleView.js à initialize


	},
	render: function(){ // fonction qui va afficher notre vue générale <ul>
		console.log("entrée dans render");
		
		this.collection.each(function(document){ // ce code s'exécute pour chaque document de la collection


			document.save(); // et on sauvegarde le document si il n'existe pas déja --> fonction sync du model case create
			//document.set('civilite_tiers_a_signifier','Monsieur');
			var documentView = new DocumentView({ model: document }); // pour chaque document on va créer une nouvelle vue individuelle DocumentView

		
			this.$el.append(documentView.render().el); // insertion des données dans une vue individuelle

			document.fetch({ //  on va selectionner le document pour checker son attribut valide --> fonction sync du model DocumentModel case read 
				             // possibilité de faire plus simple ? pourquoi en deux fois ?
				success: function(){

					if( document.get('valide') == 'true' || document.get('valide') == true){ // pareil, pourquoi parfois c'est true et d'autre fois "true" ?
						document.set('valide',true); // --> déclenche l'événement 'change:valide' de DocumentView et donc le render , c'est ce qui affiche le VALIDE sur la barre latérale 
					} 


					//alert("VIEW" +document.get('civilite_tiers_a_signifier'))
					
					var promiseCivilite = type_civilitedao.getTypeCiviliteLibelle(document.get('civilite_tiers_a_signifier'),document.get('type_tiers_a_signifier'));
					promiseCivilite.then(function(libelle){
					
						document.set('civilite_tiers_a_signifier', libelle);
					});

				} 
			});



		},this);

		
		documentdao.contenu_document(); // une fois la collection crée , on affiche son contenu dans la console   // pas le bon endroit pour mettre cette méthode ?  .fetch() ne redirige pas vers le case read de la méthode sync();
		//type_mode_significationdao.contenu_type_mode_signification();
		$('#liste_significations').listview('refresh'); // indispensable ?
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
			current_view_detail_document.model.set('valide',false); // --> déclenche l'événement 'change:valide' de DocumentView et donc le render , c'est ce qui affiche le VALIDE sur la barre latérale 
		} 

		if($("#flip-1").val() == "on"){
			console.log("dans on");
			$('#div3').trigger('create'); // nécessaire pour que le style jQuery mobile s'applique
			//current_view_detail_document.model.set('valide',false);  // WTF !!!!!!!!!!!!!    // --> déclenche l'événement 'change:valide' de DocumentView et donc le render , c'est ce qui affiche le VALIDE sur la barre latérale 
			modele_courant.sync('update',modele_courant); // force à rentrer dans le cas update dans la fonction sync
			current_view_detail_document.model.set('valide',true);  // --> déclenche l'événement 'change:valide' de DocumentView et donc le render , c'est ce qui affiche le VALIDE sur la barre latérale 
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









