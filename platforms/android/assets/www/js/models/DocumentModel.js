//Représentation d'un objet de type document


var DocumentModel = Backbone.Model.extend({

	defaults: {             // les valeurs par défaut des attributs

		// les attributs par défaut d'un Document

		// iDocument

		id_etude : "", 
		numero_document : "", 
		nature_signification : "",
		nature_parquet : "",
		nom_tiers_a_signifier : "",
		type_tiers_a_signifier : "", 
		civilite_tiers_a_signifier : "", 
		nom_debiteur : "", 
		commentaires_tiers : "", 
		domicile_elu : "", 
		presomption_domiciliation : "",
		domicilie : "",
		domiciliation : "",
		numero_tiers_a_signifier : "",
		libelle_document : "", 
		signataire : "", 
		nombre_feuillets : "",
		adresse : "",
		immeuble : "",
		signification : "",
		valide : ""

	},
	url : "/", // nécessaire pour appeler .save()

	sync: function (method, model, options) { // fonction sync spécifique au modèle
		switch (method) {
	
		case 'create': // on rentre dans ce cas quand on fait un save()
			console.log("entré dans fonction sync du modèle Document");
			
			
			documentdao.enregistrer_document(
						model.get('numero_document'), // insertion dans la base
						model.get('id_etude'),
						model.get('nature_signification'),
						model.get('nature_parquet'),
						model.get('nom_tiers_a_signifier'),
						model.get('type_tiers_a_signifier'),
						model.get('civilite_tiers_a_signifier'),
						model.get('nom_debiteur'),
						model.get('commentaires_tiers'),
						model.get('domicile_elu'),
						model.get('presomption_domiciliation'),
						model.get('domicilie'),
						model.get('domiciliation'),
						model.get('numero_tiers_a_signifier'),
						model.get('libelle_document'),
						model.get('signataire'),
						model.get('nombre_feuillets'),
						model.get('adresse'),
						model.get('immeuble'),
						model.get('signification'),
						false);   // lorsqu'on appelle .save(), on execute cette méthode

			break;

		case 'update':

			if(maj == false){
				if(model.get('valide') == 'true' || model.get('valide') == true){ // pourquoi ce comportement ? à cause de  SQLite ?
					console.log("entrée dans true modele");
					//model.set('valide',false);
					documentdao.update_document(model.get('numero_document'),false);	
				}
				else{
					console.log("entrée dans false modele");
					//model.set('valide',true);
					documentdao.update_document(model.get('numero_document'),true);			
				}
			}
			else{
				documentdao.update_document_immeuble(model.get('numero_document'),model.get('immeuble'));
			}	
			
			console.log("sortie update");
			break;

		case 'delete':
			break;

		case 'read':
			var _this = this;
			
			var promiseOfDocument = documentdao.find_document_by_id(model.get('numero_document'));
		
			promiseOfDocument.then(function(doc){
			
				_this.set(doc.attributes); // on remplace les attributs du modèle courant par ceux du document contenu dans la promesse
				/*_this.set('nom_tiers_a_signifier',doc.get('nom_tiers_a_signifier'));
				_this.set('valide',doc.get('valide'));
				//current_view_detail_document.model.set(_this.model.attributes);
				_this.set('numero_document',doc.get('numero_document'))
				_this.set('id_etude',doc.get('id_etude'))
				_this.set('nature_signification',doc.get('nature_signification'))
				_this.set('nature_parquet',doc.get('nature_parquet'))
				_this.set('nom_tiers_a_signifier',doc.get('nom_tiers_a_signifier'))
				_this.set('type_tiers_a_signifier',doc.get('type_tiers_a_signifier'))
				_this.set('civilite_tiers_a_signifier',doc.get('civilite_tiers_a_signifier'))
				_this.set('nom_debiteur',doc.get('nom_debiteur'))
				_this.set('commentaires_tiers',doc.get('commentaires_tiers'))
				_this.set('domicile_elu',doc.get('domicile_elu'))
				_this.set('presomption_domiciliation',doc.get('presomption_domiciliation'))
				_this.set('domicilie',doc.get('domicilie'))
				_this.set('domiciliation',doc.get('domiciliation'))
				_this.set('numero_tiers_a_signifier',doc.get('numero_tiers_a_signifier'))
				_this.set('libelle_document',doc.get('libelle_document'))
				_this.set('signataire',doc.get('signataire'))
				_this.set('nombre_feuillets',doc.get('nombre_feuillets'))
				_this.set('adresse',doc.get('adresse'))
				_this.set('immeuble',doc.get('immeuble'))
				_this.set('signification',doc.get('signification'))	 */
				if(options.success)
					options.success();
				
			});
			
			break;

		}
	},



	// Se déclenche à chaque création d'un modèle
	initialize : function() {
		console.log("modele document crée");
	}
});

var DocumentCollection = Backbone.Collection.extend({ // les modèles sont regroupées dans une collection
	
	model: DocumentModel, 	// on spécifie ici le modèle qui représente chaque item de la collection
	url: "ITOURNEE_700_IMPORT_0508201308050942.xml", 	// l'origine des données : ici un fichier XML local 
	initialize : function(){
		
		//rien dans initialize 
	},
	
	parse: function(data) { // comme les données proviennent d'un fichier XML il faut redéfinir la fonction parse
		
		var parsed=[];
		$(data).find('document').each(function(){ // on récupère les informations de chaque noeud document
				
			var id_etude = $(this).find('id_etude').text();
			var numero_document = $(this).find('numero_document').text();
			var nature_signification = $(this).find('nature_signification').text() ;//type_famille_documentdao.getTypeFamilleLibelle($(this).find('nature_signification').text());
			var nature_parquet = $(this).find('nature_parquet').text();
			var nom_tiers_a_signifier = $(this).find('nom_tiers_a_signifier').text();
			var type_tiers_a_signifier = $(this).find('type_tiers_a_signifier').text();
			var civilite_tiers_a_signifier = $(this).find('civilite_tiers_a_signifier').text();
			var nom_debiteur = $(this).find('nom_debiteur').text();
			var commentaires_tiers = $(this).find('commentaires_tiers').text();
			var domicile_elu = $(this).find('domicile_elu').text();
			var domiciliation = $(this).find('domiciliation').text();
			var presomption_domiciliation = $(this).find('presomption_domiciliation').text();
			var domicilie = $(this).find('domicilie').text();
			var numero_tiers_a_signifier = $(this).find('numero_tiers_a_signifier').text();
			var libelle_document = $(this).find('libelle_document').text();
			var signataire = $(this).find('signataire').text();
			var nombre_feuillets = $(this).find('nombre_feuillets').text();
			var adresse = $(this).find('id_adresse').text();
			var immeuble = $(this).find('id_immeuble').text();
			var signification = $(this).find('signification').text();
			
			parsed.push({id_etude : id_etude,     // XML est transformé en JSON
				numero_document : numero_document,
				nature_signification : nature_signification,
				nature_parquet : "Français",
				nom_tiers_a_signifier: nom_tiers_a_signifier,
				type_tiers_a_signifier : type_tiers_a_signifier,
				civilite_tiers_a_signifier : civilite_tiers_a_signifier,
				nom_debiteur : nom_debiteur,
				commentaires_tiers : commentaires_tiers,
				domicile_elu : domicile_elu,
				presomption_domiciliation : presomption_domiciliation,
				domicilie : domicilie,
				domiciliation : domiciliation,
				numero_tiers_a_signifier : numero_tiers_a_signifier,
				libelle_document : libelle_document,
				signataire : signataire,
				nombre_feuillets : nombre_feuillets,
				adresse : adresse,
				immeuble : immeuble,
				signification : signification
			}); 
		});
			
		return parsed;	
	},
	
	getDataXML: function (options) {  // fonction fetch personnalisée pour lire le fichier xml
		flag = true;

		options = options || {};
		options.dataType = "xml";
		return Backbone.Collection.prototype.fetch.call(this, options);
	}
});



