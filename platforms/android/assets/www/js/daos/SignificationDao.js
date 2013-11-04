window.SignificationDao = function (db) {
	this.db = db;
};

_.extend(window.SignificationDao.prototype, {

	initialize_signification:function () { // cr�ation de la table iSingnification
		this.db.transaction(
				function (tx) {

				},
				function (tx, error) {
					alert('Transaction error ' + error);
				},
				function (tx) {

				}
		);
	},

	

	contenu_type_mode_signification : function(){ 
		this.db.transaction(
				function (tx) {
					tx.executeSql("SELECT * FROM type_mode_signification", [], function lister_type_mode_signification(tx, results) {
						var len = results.rows.length;
						console.log("Table type mode signification : " + len + " enregistrements trouv�s.");
						for (var i=0; i<len; i++){

							console.log("Enregistrement = " + i + " ID_immeuble = " + results.rows.item(i).id_immeuble + " Porte = " + results.rows.item(i).porte + "cl� ptt =  " + results.rows.item(i).cle_ptt + " nom syndic =  " + results.rows.item(i).nom_syndic);
						}
					}
					);

				},
				function (tx, error) {
					alert('Transaction error ' + error);
				},
				function (tx) {

					console.log("succes lecture");

				}
		);

	}

	
});  

