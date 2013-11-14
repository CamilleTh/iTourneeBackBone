//Représentation d'un objet de type Adresse
var flag;

var AdresseModel = Backbone.Model.extend({

	defaults: {             // les valeurs par défaut des attributs

		// les attributs par défaut d'une Adresse

		// iAdresse
		id_adresse : "", 
		texte_libre : "",
		complement1 : "",
		complement2 : "",
		numero : "",
		complement_numero : "",
		nature_voie : "",
		lien_nature_nom_voie : "", 
		nom_voie : "", 
		code_postal : "", 
		nom_commune : "", 
		commentaire : "", 
		statut : "",
		type : ""

	},

	url : "/", // nécessaire pour appeler .save()

	sync: function (method, model, options) { // fonction sync spécifique au modèle
		switch (method) { 
		case 'create': //save()
			console.log("entré dans fonction sync du modèle Adresse");
			
			/*var promiseTypeAdresse = type_adressedao.getTypeAdresseLibelle(model.get('type'))
			
			promiseTypeAdresse.then(function(libelleType){*/
				adressedao.enregistrer_adresse(model.get('id_adresse'), // insertion dans la table
					model.get('texte_libre'),
					model.get('complement1'),
					model.get('complement2'),
					model.get('numero'),
					model.get('complement_numero'),
					model.get('nature_voie'),
					model.get('lien_nature_nom_voie'), 
					model.get('nom_voie'), 
					model.get('code_postal'), 
					model.get('nom_commune'), 
					model.get('commentaire'), 
					model.get('statut'),
					model.get('type')
					); // lorsqu'on appelle .save(), on execute cette méthode
			//});
			
			


			break;

		case 'update':
			alert("bien rentré dans update");
			break;

		case 'delete':
			break;

		case 'read': //fetch()


			var _this = this;
			var promiseOfAdresse = adressedao.find_adresse_by_id(model.get('id_adresse')); 
			promiseOfAdresse.then(function(adresse){
				_this.set(adresse.attributes);
				if(options.success)
					options.success();
			});


			break;
		}
	},


	// Se déclenche à chaque création d'un modèle
	initialize : function() {
		console.log("modele adresse crée");
	}
});

var AdresseCollection = Backbone.Collection.extend({ // les modèles sont regroupées dans une collection
	model: AdresseModel,
	url: "ITOURNEE_700_IMPORT_0508201308050942.xml", // le fichier XML " A signifier"
	initialize : function(){

		console.log(this);
	},
	parse: function(data) { // comme les données sont en XML il faut redéfinir la fonction parse
		var parsed=[];
		$(data).find('adresse').each(function(){ // on récupère les informations de chaque noeud document


			var id_adresse = $(this).find('id_adresse').text();
			var texte_libre = $(this).find('texte_libre').text();
			var complement1 = $(this).find('complement1').text();
			var complement2 = $(this).find('complement2').text();
			var numero = $(this).find('numero').text();
			var complement_numero = $(this).find('complement_numero').text();
			var nature_voie = $(this).find('nature_voie').text();
			var lien_nature_nom_voie = $(this).find('lien_nature_nom_voie').text();
			var nom_voie = $(this).find('nom_voie').text();
			var code_postal = $(this).find('code_postal').text();
			var nom_commune = $(this).find('nom_commune').text();
			var commentaire = $(this).find('commentaire').text();
			var statut = $(this).find('statut').text();
			var type = $(this).find('type').text();




			parsed.push({id_adresse : id_adresse, 
				texte_libre : texte_libre,
				complement1 : complement1,
				complement2 :complement2,
				numero : numero,
				complement_numero : complement_numero,
				nature_voie : nature_voie,
				lien_nature_nom_voie : lien_nature_nom_voie, 
				nom_voie : nom_voie, 
				code_postal : code_postal, 
				nom_commune : nom_commune, 
				commentaire : commentaire, 
				statut : statut,
				type : type

			});  // XML est transformé en JSON
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



