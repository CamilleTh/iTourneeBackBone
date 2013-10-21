//Représentation d'un objet de type Immeuble

var Type_mode_significationModel = Backbone.Model.extend({

	
	default : {
		liste : "inconnu"
	},
	url : "/", // nécessaire pour appeler .save()

	sync: function (method, model, options) { // fonction sync spécifique au modèle
		switch (method) {
		case 'create':





			break;

		case 'update':



			break;

		case 'delete':
			break;

		case 'read': // fetch()

			alert("bien entré");
			var _this = this;
			var promiseOfType_mode_signification = type_mode_significationdao.remplir_liste();
			promiseOfType_mode_signification.then(function(type_mode){
			
					_this.set(type_mode.attributes);
				
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



