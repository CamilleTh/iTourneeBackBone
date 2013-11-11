var data = [];

window.Type_adresseDao = function (db) {
	this.db = db;
	
};

_.extend(window.Type_adresseDao.prototype, {
	
	getTypeAdresseLibelle : function(idTypeAdresse){
				
		var promiseLibelle = jQuery.Deferred(); 

		this.db.transaction(
				function (tx) {
					tx.executeSql("SELECT * FROM type_adresse WHERE id_type_adresse = "+idTypeAdresse, [], function geLibelle(tx, results) {
						alert(results.rows.item(0).libelle)
						promiseLibelle.resolve(results.rows.item(0).libelle);
					});
				},
				function (tx, error) {
					alr
					alert('Transaction error ' + error);
				},
				function (tx, results) {
					console.log("succes lecture");
	
				}
		);

		return promiseLibelle;

	},
	
	
	
	initialize_Type_adresseDao:function () { // création de la table type_famille_document
		alert("init");
		this.db.transaction(
				function (tx) {	
						
					tx.executeSql("DROP TABLE IF EXISTS `type_adresse`;");

					var sql = '	CREATE TABLE `type_adresse` (';
					sql += ' `id_type_adresse` int(10),';
					sql += ' `libelle` varchar(45))';
								
					tx.executeSql(sql);
					
					sql = 'INSERT INTO `type_adresse` (`id_type_adresse`,`libelle`)';
					sql += "VALUES";
					sql += "(1,'Principale'),";
					sql += "(2,'Résidence'),";
					sql += "(4,'Lieu de travail'),";
					sql += "(5,'Autre lieu'),";
					sql += "(6,'Etablissement secondaire'),";
					sql += "(7,'Domicile représentant légal');";

					tx.executeSql(sql);

				},
				function (tx, error) {
				},
				function (tx) {
				}
			);
	}
	

});    

