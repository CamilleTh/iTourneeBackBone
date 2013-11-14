//Représentation d'un objet de type Immeuble

var ImmeubleModel = Backbone.Model.extend({

	defaults: {             // les valeurs par défaut des attributs

		// les attributs par défaut d'un Document


		//iDomicile

		id_immeuble : "", 
		cle_ptt : "", 
		cle_gaz : "",
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
		etage : "", 
		porte : ""

	},

	url : "/", // nécessaire pour appeler .save()

	sync: function (method, model, options) { // fonction sync spécifique au modèle
		switch (method) {
		case 'create':
			console.log("entré dans fonction sync du modèle Immeuble");

			if(model.get('modifie') == false || model.get('modifie') == 'false'){
				immeubledao.enregistrer_immeuble(model.get('id_immeuble'), // insertion dans la base
						model.get('cle_ptt'), 
						model.get('cle_gaz'),
						model.get('interphone'),
						model.get('code_vigik'),
						model.get('digicode'),
						model.get('cle_ptt_sas'),
						model.get('interphone_sas'), 
						model.get('acces_gardien_sas'), 
						model.get('digicode_sas'),
						model.get('nom_gardien'),
						model.get('telephone_gardien'), 
						model.get('plage_horaires_gardien'), 
						model.get('nom_syndic'), 
						model.get('tel_syndic'), 
						model.get('commentaire'), 
						model.get('modifie'),
						model.get('etage'),
						model.get('porte')); // lorsqu'on appelle .save(), on execute cette méthode

			}

			else if(model.get('modifie') == true || model.get('modifie') == 'true'){
				console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
				
			
				
				
				immeubledao.enregistrer_immeuble(model.get('id_immeuble'),
						model.get('cle_ptt'), 
						model.get('cle_gaz'),
						model.get('interphone'),
						model.get('code_vigik'),
						model.get('digicode'),
						model.get('cle_ptt_sas'),
						model.get('interphone_sas'), 
						model.get('acces_gardien_sas'), 
						model.get('digicode_sas'),
						model.get('nom_gardien'),
						model.get('telephone_gardien'), 
						model.get('plage_horaires_gardien'), 
						model.get('nom_syndic'), 
						model.get('tel_syndic'), 
						model.get('commentaire'), 
						model.get('modifie'),
						model.get('etage'),
						model.get('porte')); // lorsqu'on appelle .save(), on execute cette méthode


		

			}



			break;

		case 'update':

			immeubledao.update_immeuble(model.get('id_immeuble'),
					$('input[name=radio_cle_ptt]:checked').val(), 
					$('input[name=radio_cle_gaz]:checked').val(),
					$('input[name=radio_interphone]:checked').val(),
					$('#code_vigik').val(),
					$('#digicode').val(),
					$('input[name=radio_cle_ptt_sas]:checked').val(),
					$('input[name=radio_interphone_sas]:checked').val(), 
					$('input[name=radio_acces_gardien_sas]:checked').val(),
					$('#digicode_sas').val(),
					$('#nom_gardien').val(),
					$('#telephone_gardien').val(), 
					$('#plage_horaires_gardien').val(), 
					$('#nom_syndic').val(), 
					$('#tel_syndic').val(), 
					$('#commentaire').val(), 
					true,
					$('#etage').val(),
					$('#porte').val());

			break;

		case 'delete':
			break;

		case 'read': // fetch()


			var _this = this;
			var promiseOfImmeuble = immeubledao.find_immeuble_by_id(model.get('id_immeuble'));
			promiseOfImmeuble.then(function(immeuble){
				_this.set(immeuble.attributes);
				if(options.success)
					options.success();
			});

			break;
		}
	},


	// Se déclenche à chaque création d'un modèle
	initialize : function() {
		console.log("modele immeuble crée");
	}
});

var ImmeubleCollection = Backbone.Collection.extend({ // les modèles sont regroupées dans une collection
	model: ImmeubleModel,
	url: "ITOURNEE_700_IMPORT_0508201308050942.xml", // le fichier XML " A signifier"
	initialize : function(){

		console.log(this);
	},
	parse: function(data) { // comme les données sont en XML il faut redéfinir la fonction parse
		var parsed=[];
		$(data).find('immeuble').each(function(){ // on récupère les informations de chaque noeud document


			var id_immeuble = $(this).find('id_immeuble').text();
			var cle_ptt = $(this).find('cle_ptt').text();
			var cle_gaz = $(this).find('cle_gaz').text();
			var interphone = $(this).find('interphone').text();
			var code_vigik = $(this).find('code_vigik').text();
			var digicode = $(this).find('digicode').text();
			var cle_ptt_sas = $(this).find('cle_ptt_sas').text();
			var interphone_sas = $(this).find('interphone_sas').text();
			var acces_gardien_sas = $(this).find('acces_gardien_sas').text();
			var digicode_sas = $(this).find('digicode_sas').text();
			var nom_gardien = $(this).find('nom_gardien').text();
			var telephone_gardien = $(this).find('telephone_gardien').text();
			var plage_horaires_gardien = $(this).find('plage_horaires_gardien').text();
			var nom_syndic = $(this).find('nom_syndic').text();
			var tel_syndic = $(this).find('tel_syndic').text();
			var commentaire = $(this).find('commentaire').text();
			var etage = $(this).find('etage').text();
			var porte = $(this).find('porte').text();
			var modifie = $(this).find('modifie').text();




			parsed.push({id_immeuble : id_immeuble, 
				cle_ptt : cle_ptt, 
				cle_gaz : cle_gaz,
				interphone : interphone,
				code_vigik : code_vigik,
				digicode : digicode, 
				cle_ptt_sas : cle_ptt_sas, 
				interphone_sas : interphone_sas, 
				acces_gardien_sas : acces_gardien_sas, 
				digicode_sas : digicode_sas, 
				nom_gardien : nom_gardien,
				telephone_gardien : telephone_gardien, 
				plage_horaires_gardien : plage_horaires_gardien, 
				nom_syndic : nom_syndic, 
				tel_syndic : tel_syndic, 
				commentaire : commentaire, 
				modifie : modifie,
				etage : etage, 
				porte : porte

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



