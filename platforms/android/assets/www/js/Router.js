// Ouverture database
var db = window.openDatabase("test", "1.0", "Test DB", 1000000);

//Creation des différents DAOs
var type_famille_documentdao = new Type_famille_documentDao(db);
var documentdao = new window.DocumentDao(db);
var adressedao = new window.AdresseDao(db);
var immeubledao = new window.ImmeubleDao(db);
var type_mode_significationdao = new window.Type_mode_significationDao(db);
var type_civilitedao = new window.Type_civiliteDao(db);
var type_adressedao = new window.Type_adresseDao(db);
//var significationdao = new window.SignificationDao(db);

// Variables représentant les vues courantes
var current_view_detail_document;
var current_view_document;
var current_view_signification;

var model_immeuble_vide = new ImmeubleModel({})
var model_adresse_vide = new AdresseModel({})
var model_document_vide = new DocumentModel({})

var vue_immeuble = new ImmeubleView({model : model_immeuble_vide});
var vue_adresse = new AdresseView({model : model_adresse_vide});
var vue_detail_document = new DetailDocumentView({model : model_document_vide});

var Router = Backbone.Router.extend({
	routes: {
		'': 'defaut'  // 1 seule route, la route par défaut
	},

	defaut: function(){
		console.log("route par defaut chargée");
		
		// DAOs secondaires : création des tables requises
		type_mode_significationdao.initialize_Type_mode_significationDao(); 
		type_famille_documentdao.initialize_Type_famille_documentDao();
		type_civilitedao.initialize_Type_civiliteDao_documentDao();
		type_adressedao.initialize_Type_adresseDao();
		
		documentdao.initialize_document(); //création de la table 'iDocument'  --> voir DocumentDao.js
		var macollection = new DocumentCollection(); // création d'une nouvelle collection de Documents -- > voir DocumentModel.js à DocumentCollection
		var documentsView = new DocumentsView({ collection: macollection }); // création d'une vue générale <ul> qui englobe plusieurs vues individuelles <li> qui représentent tous les modèles dans macollection --> voir DocumentView.js à DocumentsView 
		adressedao.initialize_adresse(); //création de la table 'iAdresse'  --> voir AdresseDao.js
		var ma_liste_adresse = new AdresseCollection(); // création d'une nouvelle collection d'Adresses -- > voir AdresseModel.js à AdresseCollection
		var adressesView = new AdressesView({ collection: ma_liste_adresse }); //  --> voir AdresseView.js à AdressesView
		immeubledao.initialize_immeuble();  //création de la table 'iImmeuble'  --> voir ImmeubleDao.js
		var ma_liste_immeuble = new ImmeubleCollection(); // création d'une nouvelle collection d'Immeubles -- > voir ImmeubleModel.js à ImmeubleCollection
		var immeublesView = new ImmeublesView({ collection: ma_liste_immeuble}); //  --> voir ImmeubleView.js à ImmeublesView
		
		var ma_signification = new SignificationModel();
		var significationView = new SignificationView({model : ma_signification});

	}
});

new Router;
Backbone.history.start();