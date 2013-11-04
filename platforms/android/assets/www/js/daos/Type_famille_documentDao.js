window.Type_famille_documentDao = function (db) {
	this.db = db;
};

_.extend(window.Type_famille_documentDao.prototype, {

	getTypeFamilleLibelle : function(idTypeFamille){
		this.db.transaction(
				function (tx) {
					tx.executeSql("SELECT * FROM type_famille_document WHERE id_type_famille_document = "+idTypeFamille+"", [], function geLibelle(tx, results) {
						console.log("idTypeFamille = "+idTypeFamille+" => "+results.rows.item(0).libelle);	
					});
				},
				function (tx, error) {
					alert('Transaction error ' + error);
				},
				function (tx) {
	
					console.log("succes lecture");
	
				}
		);

	},
	
	initialize_Type_famille_documentDao:function () { // création de la table type_famille_document
		this.db.transaction(
				function (tx) {
					
					tx.executeSql("DROP TABLE IF EXISTS 'type_famille_document'");
					var sql = 'CREATE TABLE IF NOT EXISTS "type_mode_signification" ("id_type_mode_signification" int (10),';
					sql+= '"libelle" varchar (300),';
					sql +='"type_tiers" char (3),';
					sql += '"id_type_famille_document" int (10))';

					var sql = 'CREATE TABLE "type_famille_document" (';
					sql += '"id_type_famille_document" int(10),';		 
					sql += '"libelle" varchar(25))'
					tx.executeSql(sql);

					tx.executeSql("INSERT INTO `type_famille_document` (`id_type_famille_document`, `libelle`) VALUES (1,'actes');");
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

