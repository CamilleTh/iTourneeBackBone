
var DetailDocumentView = Backbone.View.extend({  // la vue correspondant à l'affichage d'un seul Document

	el: '#div3',
	template: template('documentTemplate2'),
	initialize: function() {

		//this.model.bind('change:civilite_tiers_a_signifier', this.render, this);
		this.render();

	},
	render: function(){
		console.log("render detail_document");
		this.$el.html( this.template(this.model.toJSON()));
		$('#div3').trigger('create'); // nécessaire pour que le style jQuery mobile s'applique
		console.log(this.model.get('valide'));
		if(this.model.get('valide')== true || this.model.get('valide') == "true"){
			$('#div2').textinput().textinput('disable'); // si le document est validé on desactive la div pour empecher l'édition
		}
		else {
			$('#div2').textinput().textinput('enable'); // sinon on réactive pour permettre l'édition
		}

		// on insère dans le li les données du modèle en suivant le template */
		return this;
	},
	events: {
		// lors du clic sur un modèle on déclenche show alert

	},

});





//<script src="http://code.jquery.com/jquery-1.9.1.min.js"></script>





/*$("#flip-1").bind("change",function(event){ // comment binder cela à l'interieur du modèle ?

	modele_courant.sync('update',modele_courant); // force à rentrer dans le cas update dans la fonction sync 

//		if($("#flip-1").val() == "on"){
//	$('#test input').textinput('disable'); // désactive tous les input des trois formulaires de droite fonctionne mais provoque une erreur
//	$('[type="button"]').button('disable'); 
//	$('[type="button"]').button('refresh');
//	//$('#div2 input').button('disable'); // désactive tous les input des trois formulaires de droite

}

else{
	$('#div2 input').textinput('enable'); // active tous les input des trois formulaires de droite
}  


});  */



