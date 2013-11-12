//Représentation d'un objet de type document


var DocumentModel = Backbone.Model.extend({

	defaults: {             // les valeurs par défaut des attributs

		// les attributs par défaut d'un Document

		// iDocument

		id_etude : "inconnu", 
		numero_document : "inconnu", 
		nature_signification : "inconnu",
		nature_parquet : "inconnu",
		nom_tiers_a_signifier : "inconnu",
		type_tiers_a_signifier : "inconnu", 
		civilite_tiers_a_signifier : "inconnu", 
		nom_debiteur : "inconnu", 
		commentaires_tiers : "inconnu", 
		domicile_elu : "inconnu", 
		presomption_domiciliation : "inconnu",
		domicilie : "inconnu",
		domiciliation : "inconnu",
		numero_tiers_a_signifier : "inconnu",
		libelle_document : "inconnu", 
		signataire : "inconnu", 
		nombre_feuillets : "inconnu",
		adresse : "inconnu",
		immeuble : "inconnu",
		signification : "inconnu",
		valide : "inconnu"

	},
	url : "/", // nécessaire pour appeler .save()

	sync: function (method, model, options) { // fonction sync spécifique au modèle
		switch (method) {
	
		case 'create': // on rentre dans ce cas quand on fait un save()
			console.log("entré dans fonction sync du modèle Document");
			
			var promise = type_famille_documentdao.getTypeFamilleLibelle(model.get('nature_signification'));
		
			var typetiers = model.get('type_tiers_a_signifier');
			var promiseCivilite = type_civilitedao.getTypeCiviliteLibelle(model.get('civilite_tiers_a_signifier'),typetiers)
			
			promise.then(function(libelle){
				promiseCivilite.then(function(libelleCivilite){
				documentdao.enregistrer_document(model.get('numero_document'),
						model.get('id_etude'),
						libelle,
						model.get('nature_parquet'),
						model.get('nom_tiers_a_signifier'),
						model.get('type_tiers_a_signifier'),
						libelleCivilite,
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
				})
			})	
			
			
			
			break;

		case 'update':

			if(maj == false){
				if(model.get('valide') == 'true' || model.get('valide') == true){ // pourquoi ce comportement ? à cause de  SQLite ?
					console.log("entrée dans true modele");
					model.set('valide',false);
					documentdao.update_document(model.get('numero_document'),false);	
				}
				else{
					console.log("entrée dans false modele");
					model.set('valide',true);
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
	model: DocumentModel,

	url: "ITOURNEE_700_IMPORT_0508201308050942.xml", // le fichier XML " A signifier"
	initialize : function(){
	},
	
	parse: function(data) { // comme les données sont en XML il faut redéfinir la fonction parse
		
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
			
			parsed.push({id_etude : id_etude,
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
			}); // XML est transformé en JSON
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



