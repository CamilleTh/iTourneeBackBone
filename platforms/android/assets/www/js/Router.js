var db = window.openDatabase("test", "1.0", "Test DB", 1000000);
var type_famille_documentdao = new Type_famille_documentDao(db);
var documentdao = new window.DocumentDao(db);
var adressedao = new window.AdresseDao(db);
var immeubledao = new window.ImmeubleDao(db);
var type_mode_significationdao = new window.Type_mode_significationDao(db);
//var significationdao = new window.SignificationDao(db);

var current_view_detail_document;// ne fonctionne pas pour detail document
var current_view_adresse;
var current_view_immeuble;
var current_view_signification;

var Router = Backbone.Router.extend({
	routes: {
		'': 'defaut'
	},

	defaut: function(){
		console.log("route par defaut chargée");
		
		documentdao.initialize_document();
		var macollection = new DocumentCollection();
		var documentsView = new DocumentsView({ collection: macollection });
		adressedao.initialize_adresse();
		var ma_liste_adresse = new AdresseCollection();
		var adressesView = new AdressesView({ collection: ma_liste_adresse });
		immeubledao.initialize_immeuble(); 
		var ma_liste_immeuble = new ImmeubleCollection();
		var immeublesView = new ImmeublesView({ collection: ma_liste_immeuble}); 
		type_mode_significationdao.initialize_Type_mode_significationDao(); 
		type_famille_documentdao.initialize_Type_famille_documentDao();
		var ma_signification = new SignificationModel();
		var significationView = new SignificationView({model : ma_signification});
		//significationdao.initialize_immeuble(); 
		
	}
});

new Router;
Backbone.history.start();