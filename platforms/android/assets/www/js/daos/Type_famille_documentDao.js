var data = [];

window.Type_famille_documentDao = function (db) {
	this.db = db;
	
};

_.extend(window.Type_famille_documentDao.prototype, {
	
	getTypeFamilleLibelle : function(idTypeFamille){
		

		var data =  this.type_famille_document_data();

	/*	console.log("1#"+data);
		console.log("2#"+JSON.stringify(data));
		console.log("3#"+data[1]);
		console.log("4#"+data["1"]);
		console.log("5#"+idTypeFamille);
		console.log("6#"+data[idTypeFamille]);

		return data[idTypeFamille];*/
		
		var promiseLibelle = jQuery.Deferred(); 
		this.db.transaction(
				function (tx) {
					tx.executeSql("SELECT * FROM type_famille_document WHERE id_type_famille_document = "+idTypeFamille+"", [], function geLibelle(tx, results) {
						promiseLibelle.resolve(results.rows.item(0).libelle);
					});
				},
				function (tx, error) {
					alert('Transaction error ' + error);
				},
				function (tx, results) {
					console.log("succes lecture");
	
				}
		);
		
		return promiseLibelle;
		

	},
	
	
	
	initialize_Type_famille_documentDao:function () { // création de la table type_famille_document

		this.db.transaction(
				function (tx) {
						
					tx.executeSql("DROP TABLE IF EXISTS 'type_famille_document'");

					var sql = 'CREATE TABLE "type_famille_document" (';
					sql += '"id_type_famille_document" int(10),';		 
					sql += '"libelle" varchar(25))'
					tx.executeSql(sql);

					tx.executeSql("INSERT INTO `type_famille_document` (`id_type_famille_document`, `libelle`) VALUES (1,'Actes');");
					tx.executeSql("INSERT INTO `type_famille_document` (`id_type_famille_document`, `libelle`) VALUES (2,'formalités');");
					tx.executeSql("INSERT INTO `type_famille_document` (`id_type_famille_document`, `libelle`) VALUES (3,'courriers');");
					tx.executeSql("INSERT INTO `type_famille_document` (`id_type_famille_document`, `libelle`) VALUES (4,'mails');");
					tx.executeSql("INSERT INTO `type_famille_document` (`id_type_famille_document`, `libelle`) VALUES (5,'sms');");
					tx.executeSql("INSERT INTO `type_famille_document` (`id_type_famille_document`, `libelle`) VALUES (6,'actes pénaux');");
					
				},
				function (tx, error) {
				},
				function (tx) {
				}
		);
	}
	

});  

