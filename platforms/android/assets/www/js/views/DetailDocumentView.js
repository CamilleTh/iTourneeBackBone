
var DetailDocumentView = Backbone.View.extend({  // la vue correspondant � l'affichage d'un seul Document

	el: '#div3',
	template: template('documentTemplate2'),
	initialize: function() {

		//this.model.bind('change:civilite_tiers_a_signifier', this.render, this);
		this.render();

	},
	render: function(){
		console.log("render detail_document");
		this.$el.html( this.template(this.model.toJSON()));
		$('#div3').trigger('create'); // n�cessaire pour que le style jQuery mobile s'applique
		console.log(this.model.get('valide'));
		if(this.model.get('valide')== true || this.model.get('valide') == "true"){
			$('#div2').textinput().textinput('disable'); // si le document est valid� on desactive la div pour empecher l'�dition
		}
		else {
			$('#div2').textinput().textinput('enable'); // sinon on r�active pour permettre l'�dition
		}

		// on ins�re dans le li les donn�es du mod�le en suivant le template */
		return this;
	},
	events: {
		// lors du clic sur un mod�le on d�clenche show alert

	},

});





//<script src="http://code.jquery.com/jquery-1.9.1.min.js"></script>





/*$("#flip-1").bind("change",function(event){ // comment binder cela � l'interieur du mod�le ?

	modele_courant.sync('update',modele_courant); // force � rentrer dans le cas update dans la fonction sync 

//		if($("#flip-1").val() == "on"){
//	$('#test input').textinput('disable'); // d�sactive tous les input des trois formulaires de droite fonctionne mais provoque une erreur
//	$('[type="button"]').button('disable'); 
//	$('[type="button"]').button('refresh');
//	//$('#div2 input').button('disable'); // d�sactive tous les input des trois formulaires de droite

}

else{
	$('#div2 input').textinput('enable'); // active tous les input des trois formulaires de droite
}  


});  */



