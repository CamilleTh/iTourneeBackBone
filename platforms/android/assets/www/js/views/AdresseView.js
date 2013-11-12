var AdresseView = Backbone.View.extend({  // la vue correspondant � l'affichage d'un seul Document

	el: '#div4',
	template: template('adresseTemplate'),
	initialize: function() {
		this.model.bind('change', this.render, this);
		this.render();
	},
	render: function(){

		this.$el.html( this.template(this.model.toJSON())); // on ins�re dans le li les donn�es du mod�le en suivant le template
		return this;
	}







});

var AdressesView = Backbone.View.extend({ // la vue correspondant � la liste lat�rale (tous les documents)

	initialize: function() {
		this.collection.getDataXML({reset: true}); // le fichier xml est parcouru --> cela lance un fetch() --> reset	
		this.collection.bind('reset', this.render, this);  // lorsque l'�venement reset est d�clench�, on lance le render
	},
	render: function(){
		console.log("entr�e dans render");
		console.log(this);
		this.collection.each(function(adresse){
			// pour chaque adresse dans la collection, on cr�e une nouvelle vue
			//var adresseView = new AdresseView({ model: adresse });
			adresse.save(); // et on sauvegarde le document --> fonction sync du model
		},this);

		adressedao.contenu_adresse(); // une fois la collection cr�e , on affiche son contenu   // pas le bon endroit pour mettre cette m�thode ?  .fetch() ne redirige pas vers le case read de la m�thode sync();
		return this;
	}
});