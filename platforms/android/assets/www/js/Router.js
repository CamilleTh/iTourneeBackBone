// Ouverture database
var db = window.openDatabase("test", "1.0", "Test DB", 1000000);

//Creation des diff�rents DAOs
var type_famille_documentdao = new Type_famille_documentDao(db);
var documentdao = new window.DocumentDao(db);
var adressedao = new window.AdresseDao(db);
var immeubledao = new window.ImmeubleDao(db);
var type_mode_significationdao = new window.Type_mode_significationDao(db);
var type_civilitedao = new window.Type_civiliteDao(db);
var type_adressedao = new window.Type_adresseDao(db);
//var significationdao = new window.SignificationDao(db);

// Variables repr�sentant les vues courantes
var current_view_detail_document;
var current_view_adresse;
var current_view_immeuble;
var current_view_signification;

var Router = Backbone.Router.extend({
	routes: {
		'': 'defaut'  // 1 seule route, la route par d�faut
	},

	defaut: function(){
		console.log("route par defaut charg�e");
		documentdao.initialize_document(); //cr�ation de la table 'iDocument'  --> voir DocumentDao.js
		var macollection = new DocumentCollection(); // cr�ation d'une nouvelle collection de Documents -- > voir DocumentModel.js � DocumentCollection
		var documentsView = new DocumentsView({ collection: macollection }); // cr�ation d'une vue g�n�rale <ul> qui englobe plusieurs vues individuelles <li> qui repr�sentent tous les mod�les dans macollection --> voir DocumentView.js � DocumentsView 
		adressedao.initialize_adresse(); //cr�ation de la table 'iAdresse'  --> voir AdresseDao.js
		var ma_liste_adresse = new AdresseCollection(); // cr�ation d'une nouvelle collection d'Adresses -- > voir AdresseModel.js � AdresseCollection
		var adressesView = new AdressesView({ collection: ma_liste_adresse }); //  --> voir AdresseView.js � AdressesView
		immeubledao.initialize_immeuble();  //cr�ation de la table 'iImmeuble'  --> voir ImmeubleDao.js
		var ma_liste_immeuble = new ImmeubleCollection(); // cr�ation d'une nouvelle collection d'Immeubles -- > voir ImmeubleModel.js � ImmeubleCollection
		var immeublesView = new ImmeublesView({ collection: ma_liste_immeuble}); //  --> voir ImmeubleView.js � ImmeublesView
		
		var ma_signification = new SignificationModel();
		var significationView = new SignificationView({model : ma_signification});
		
		// DAOs secondaires : cr�ation des tables requises
		type_mode_significationdao.initialize_Type_mode_significationDao(); 
		type_famille_documentdao.initialize_Type_famille_documentDao();
		type_civilitedao.initialize_Type_civiliteDao_documentDao();
		type_adressedao.initialize_Type_adresseDao();

		
		/*var promiseTypeAdresse = type_adressedao.getTypeAdresseLibelle(1);

		promiseTypeAdresse.then(function(libelle){
			alert(libelle)
		});	*/	
	}
});

new Router;
Backbone.history.start();