var AdresseView = Backbone.View.extend({  // la vue correspondant à l'affichage d'un seule Adresse

	el: '#div4',
	template: template('adresseTemplate'),
	initialize: function() {
		this.model.bind('change', this.render, this);
		this.render();
	},
	render: function(){

		this.$el.html( this.template(this.model.toJSON())); // on insère dans le li les données du modèle en suivant le template
		return this;
	}







});

var AdressesView = Backbone.View.extend({ 

	initialize: function() {
		this.collection.getDataXML({reset: true}); // le fichier xml est parcouru --> cela lance un fetch() --> reset	via getDataXml de AdresseModel
		this.collection.bind('reset', this.render, this);  // lorsque l'évenement reset est déclenché, on lance le render
	},
	render: function(){
		console.log("entrée dans render");
		console.log(this);
		this.collection.each(function(adresse){
		

			adresse.save(); //  pour chaque adresse dans la collection on sauvegarde en base si elle n'existe pas déja  --> fonction sync du model AdresseModel case create
		},this);

		adressedao.contenu_adresse(); // une fois la collection crée , on affiche son contenu   // pas le bon endroit pour mettre cette méthode ?  .fetch() ne redirige pas vers le case read de la méthode sync();
		return this;
	}
});