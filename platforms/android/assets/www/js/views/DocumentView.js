var modele_courant; // utilisation d'une variable globale. mauvaise pratique ?
var maj = false;


var DocumentView = Backbone.View.extend({  // la vue correspondant à l'affichage d'un seul Document

	tagName: 'li', // infos contenues dans un li
	template: template('document_item_Template'),  // --> voir index.html template  'document_item_Template'
	initialize: function() {

	//	this.model.bind('change:valide', this.render, this);// lorsqu'on change l'attribut valide du modele --> render
	//	this.model.bind('change:civilite_tiers_a_signifier', this.render, this);
	//	this.model.bind('change:immeuble', this.maj_immeuble, this);  // lorsqu'on change l'attribut immeuble du modele --> on déclenche la méthode maj_immeuble 
	},
	render: function(){
        //alert("render");
		
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
		//var current_view_detail_document  = new DetailDocumentView({ model: this.model});
		this.model.fetch({ // on fait un fetch, ce qui nous fait rentrer dans le case read de la function sync dans DocumentModel
			success: function(data){
				
				var promise = type_famille_documentdao.getTypeFamilleLibelle(data.get('nature_signification'));
				var typetiers = data.get('type_tiers_a_signifier');
				var civ = data.get('civilite_tiers_a_signifier');

				var promiseCivilite = type_civilitedao.getTypeCiviliteLibelle(civ,typetiers);
				
				promise.then(function(libelleNatureSignification){
					promiseCivilite.then(function(libelleCivilite){
						

						var modele_detail_doc = new DocumentModel(
								{   
									'nom_tiers_a_signifier' : data.get('nom_tiers_a_signifier'),
									'valide': data.get('valide'),
								    'numero_document': data.get('numero_document'),
									'id_etude': data.get('id_etude'),
									'nature_signification': data.get('nature_signification'),
									'nature_parquet': data.get('nature_parquet'),
									'nom_tiers_a_signifier': data.get('nom_tiers_a_signifier'),
									'type_tiers_a_signifier': data.get('type_tiers_a_signifier'),
									'nom_debiteur': data.get('nom_debiteur'),
									'commentaires_tiers': data.get('commentaires_tiers'),
									'domicile_elu': data.get('domicile_elu'),
									'presomption_domiciliation': data.get('presomption_domiciliation'),
									'domicilie': data.get('domicilie'),
									'domiciliation': data.get('domiciliation'),
									'numero_tiers_a_signifier': data.get('numero_tiers_a_signifier'),
									'libelle_document': data.get('libelle_document'),
									'signataire': data.get('signataire'),
									'nombre_feuillets': data.get('nombre_feuillets'),
									'adresse': data.get('adresse'),
									'immeuble': data.get('immeuble'),
									'signification': data.get('signification'),	 
									'nature_signification': libelleNatureSignification,
									'civilite_tiers_a_signifier' : libelleCivilite
									
							}
								);
						var vue_detail_document  = new DetailDocumentView({ model: modele_detail_doc });
						
						$('#div2').css('display','block');
						$('#maform').css('display','block'); // affichage du slider dans le footer

					});
				});
				
				var adresse = new AdresseModel(
						{
							'id_adresse' : data.get('adresse')
							
						}
						
				);
				adresse.fetch({
					success: function(data_adresse){
						var promise_type_adresse = type_adressedao.getTypeAdresseLibelle(data_adresse.get('type'));
						promise_type_adresse.then(function(libelleTypeAdresse){
								var modele_adresse = new AdresseModel(
										{   
											'texte_libre' : data_adresse.get('texte_libre'),
											'complement1' : data_adresse.get('complement1'),
											'complement2' : data_adresse.get('complement2'),
											'numero' : data_adresse.get('numero'),
											'complement_numero' : data_adresse.get('complement_numero'),
											'nature_voie' : data_adresse.get('nature_voie'),
											'lien_nature_nom_voie' : data_adresse.get('lien_nature_nom_voie'), 
											'nom_voie' : data_adresse.get('nom_voie'), 
											'code_postal' : data_adresse.get('code_postal'), 
											'nom_commune' : data_adresse.get('nom_commune'), 
											'commentaire' : data_adresse.get('commentaire'), 
											'statut' : data_adresse.get('statut'),
											'type' : libelleTypeAdresse
											
									}
										);
								var vue_adresse  = new AdresseView({ model: modele_adresse });

							});
						
						var immeuble = new ImmeubleModel(
								{
									'id_immeuble' : data.get('immeuble')
									
								}
								
						);
						
						immeuble.fetch({
							success: function(data_immeuble){
										var modele_immeuble = new ImmeubleModel(
												{   
													'id_immeuble' : data_immeuble.get('id_immeuble'),
													'cle_ptt' : data_immeuble.get('cle_ptt'),
													'cle_gaz' : data_immeuble.get('cle_gaz'),
													'interphone' : data_immeuble.get('interphone'),
													'code_vigik' : data_immeuble.get('code_vigik'),
													'digicode' : data_immeuble.get('digicode'),
													'cle_ptt_sas' : data_immeuble.get('cle_ptt_sas'),
													'interphone_sas' : data_immeuble.get('interphone_sas'), 
													'acces_gardien_sas' : data_immeuble.get('acces_gardien_sas'), 
													'digicode_sas' : data_immeuble.get('digicode_sas'), 
													'nom_gardien' : data_immeuble.get('nom_gardien'), 
													'telephone_gardien' : data_immeuble.get('telephone_gardien'), 
													'plage_horaires_gardien' : data_immeuble.get('plage_horaires_gardien'),
													'nom_syndic' : data_immeuble.get('nom_syndic'),
													'tel_syndic' : data_immeuble.get('tel_syndic'),
													'commentaire' : data_immeuble.get('commentaire'),
													'modifie' : data_immeuble.get('modifie'),
													'etage' : data_immeuble.get('etage'),
													'porte' : data_immeuble.get('porte')
													
													
											}
												);
										var vue_immeuble  = new ImmeubleView({ model: modele_immeuble });		
							}
						})

				
				
				//	$('#div2').css('display','block');
				//		$('#maform').css('display','block'); // affichage du slider dans le footer
				/*	modele_courant = _this.model;


				if(_this.model.get('valide') == "true"){ // si le document est validé, on passe le slider dans la position validé
					$("#flip-1").val("on");
					$("#flip-1").slider("refresh");	
				}
				else{
					$("#flip-1").val("off"); // sinon dans la position non validé
					$("#flip-1").slider("refresh");	
				}  */
						
						
			}// fin success
		});	// fin fetch adresse
			} // fin success		
		}); // fin fetch model
	} // fin afficher infos
	
		
	/*	var type_mode_signification = new Type_mode_significationModel({});
		type_mode_signification.fetch({
			success : function(){

				
				//alert(type_mode_signification.get('liste'));
				$('#select-native-1').append(type_mode_signification.get('liste'));


			}
			
		}); */




	//}
		
});

var DocumentsView = Backbone.View.extend({ // la vue correspondant à la liste latérale (tous les documents)

	el: '#liste_significations', // insertion dans la liste #liste_significations
	tagName: 'ul', 
	initialize: function() {

		this.collection.getDataXML({reset: true}); // parcours du fichier XML via les méthodes getDataXML et parse --> voir DocumentModel.js à DocumentCollection   un événement reset est déclenché	
		this.collection.bind('reset', this.render, this); // lorsque l'évenement reset est déclenché, on rentre dans le render --> affichage de la vue
	
		//current_view_detail_document  = new DetailDocumentView({ model: mondoc}); // création d'une nouvelle vue DetailDocument avc les attributs vides de mondoc : inutile ? --> voir DetailDocumentView.js à initialize




	//	current_view_adresse  = new AdresseView({ model: monadresse}); // création d'une nouvelle vue Adresse avc les attributs vides de monadresse : inutile ? --> voir AdresseView.js à initialize


	//	current_view_immeuble  = new ImmeubleView({ model: monimmeuble}); // création d'une nouvelle vue Immeuble avc les attributs vides de monimmeuble : inutile ? --> voir ImmeubleView.js à initialize


	},
	render: function(){ // fonction qui va afficher notre vue générale <ul>
		console.log("entrée dans render documents view");
		var _this = this;
		this.collection.each(function(document){ // ce code s'exécute pour chaque document de la collection


			document.save(); // et on sauvegarde le document si il n'existe pas déja --> fonction sync du model case create
			//document.set('civilite_tiers_a_signifier','Monsieur');
			//var documentView = new DocumentView({ model: document }); // pour chaque document on va créer une nouvelle vue individuelle DocumentView

		
		//	this.$el.append(documentView.render().el); // insertion des données dans une vue individuelle

			document.fetch({ //  on va selectionner le document pour checker son attribut valide --> fonction sync du model DocumentModel case read 
				             // possibilité de faire plus simple ? pourquoi en deux fois ?
				success: function(data){

				


					//alert("VIEW" +document.get('civilite_tiers_a_signifier'))
					var promiseCivilite = type_civilitedao.getTypeCiviliteLibelle(data.get('civilite_tiers_a_signifier'),data.get('type_tiers_a_signifier'));
					promiseCivilite.then(function(libelle){
					
                        
						var modele_doc = new DocumentModel(
								{
									//'nature_signification': libelleNatureSignification,
									
									'nom_tiers_a_signifier': data.get('nom_tiers_a_signifier'),
									'numero_tiers_a_signifier' :  data.get('numero_tiers_a_signifier'),
									'numero_document' :  data.get('numero_document'),
									'civilite_tiers_a_signifier' : libelle,
									'valide' : ""
							}
								);
						if( data.get('valide') == 'true' || data.get('valide') == true){ // pareil, pourquoi parfois c'est true et d'autre fois "true" ?
							modele_doc.set('valide',true); // --> déclenche l'événement 'change:valide' de DocumentView et donc le render , c'est ce qui affiche le VALIDE sur la barre latérale 
						} 
						else{
							modele_doc.set('valide',false);
						}
						var vue_document  = new DocumentView({ model: modele_doc });
						
						_this.$el.append(vue_document.render().el); // insertion des données dans une vue individuelle
						//vue_document.render();
						$('#liste_significations').listview('refresh'); // indispensable ?
					});

				} 
			});



		},this);

		
		documentdao.contenu_document(); // une fois la collection crée , on affiche son contenu dans la console   // pas le bon endroit pour mettre cette méthode ?  .fetch() ne redirige pas vers le case read de la méthode sync();
		//type_mode_significationdao.contenu_type_mode_signification();
		
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
		//	current_view_detail_document.model.set('valide',false); // --> déclenche l'événement 'change:valide' de DocumentView et donc le render , c'est ce qui affiche le VALIDE sur la barre latérale 
		} 

		if($("#flip-1").val() == "on"){
			console.log("dans on");
			$('#div3').trigger('create'); // nécessaire pour que le style jQuery mobile s'applique
			//current_view_detail_document.model.set('valide',false);  // WTF !!!!!!!!!!!!!    // --> déclenche l'événement 'change:valide' de DocumentView et donc le render , c'est ce qui affiche le VALIDE sur la barre latérale 
			modele_courant.sync('update',modele_courant); // force à rentrer dans le cas update dans la fonction sync
		//	current_view_detail_document.model.set('valide',true);  // --> déclenche l'événement 'change:valide' de DocumentView et donc le render , c'est ce qui affiche le VALIDE sur la barre latérale 
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









