//Repr�sentation d'un objet de type Immeuble

var Type_mode_significationModel = Backbone.Model.extend({

	
	default : {
		liste : "inconnu"
	},
	url : "/", // n�cessaire pour appeler .save()

	sync: function (method, model, options) { // fonction sync sp�cifique au mod�le
		switch (method) {
		case 'create':





			break;

		case 'update':



			break;

		case 'delete':
			break;

		case 'read': // fetch()

			alert("bien entr�");
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



// Se d�clenche � chaque cr�ation d'un mod�le
initialize : function() {
	console.log("modele immeuble cr�e");
}
});



