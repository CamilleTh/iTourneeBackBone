var data = [];

window.Type_civiliteDao = function (db) {
	this.db = db;
	
};

_.extend(window.Type_civiliteDao.prototype, {
	
	getTypeCiviliteLibelle : function(idTypeCivilite,type){
				
		var promiseLibelle = jQuery.Deferred(); 
		
		
		if(type == 'P'){
			this.db.transaction(
					function (tx) {
						tx.executeSql("SELECT * FROM type_civilite WHERE id_type_civilite = "+idTypeCivilite+"", [], function geLibelle(tx, results) {
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
		}else {
			this.db.transaction(
					function (tx) {
						tx.executeSql("SELECT * FROM type_personne_morale WHERE id_type_personne_morale = "+idTypeCivilite+"", [], function geLibelle(tx, results) {
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
		}
		
		return promiseLibelle;
		

	},
	
	
	
	initialize_Type_civiliteDao_documentDao:function () { // création de la table type_famille_document

		this.db.transaction(
				function (tx) {	
						
					tx.executeSql("DROP TABLE IF EXISTS `type_civilite`;");

					var sql = '	CREATE TABLE `type_civilite` (';
					sql += ' `id_type_civilite` int(10),';
					sql += ' `libelle` varchar(45),';
					sql += ' `libelle_court` varchar(10))';
								
					tx.executeSql(sql);
					
					sql = 'INSERT INTO `type_civilite` (`id_type_civilite`,`libelle`, `libelle_court`)';
					sql += "VALUES";
					sql += "(1,'Monsieur','M.'),";
					sql += "(2,'Madame','Mme'),";
					sql += "(4,'Maître','Me'),";
					sql += "(5,'Docteur','Dr'),";
					sql += "(6,'Monsieur ou Madame','M. ou Mme'),";
					sql += "(7,'Monsieur et Madame','M. et Mme'),";
					sql += "(8,'Indéfini',''),";
					sql += "(9,'Escargot','Esc.');";

					tx.executeSql(sql);
					
					tx.executeSql("DROP TABLE IF EXISTS `type_personne_morale`;");
					
					sql = 'CREATE TABLE `type_personne_morale` (';
					sql += '`id_type_personne_morale` int(10),';
					sql += '`libelle` varchar(50),';
					sql += '`libelle_court` varchar(10));';

					tx.executeSql(sql);
					
					sql = 'INSERT INTO `type_personne_morale` (`id_type_personne_morale`, `libelle`, `libelle_court`)';
					sql += 'VALUES';
					sql += "(1,'SA','SA'),";
					sql += "(2,'SCP (Huissiers)','SCP'),";
					sql += "(3,'Société en nom collectif','Société'),";
					sql += "(4,'GIE','GIE'),";
					sql += "(5,'Société de fait entre personnes physiques','Société'),";
					sql += "(6,'Société de caution mutuelle','Société'),";
					sql += "(7,'Société en commandite simple','Société'),";
					sql += "(8,'Société en commandite par actions','Société'),";
					sql += "(9,'Société à Responsabilité Limitée','SARL'),";
					sql += "(10,'Société d''exercice libéral à  res','SERL'),";
					sql += "(11,'SARL unipersonnelle','SARL'),";
					sql += "(12,'Société coopérative agricole','Sté coop.'),";
					sql += "(13,'Société mutuelle d''assurance','Sté mutu'),";
					sql += "(14,'Groupement agricole d''exploitation en commun','GAEC'),";
					sql += "(15,'Société civile immobilière','SCI'),";
					sql += "(16,'Société Civile de Moyens','SCM'),";
					sql += "(17,'Mutuelle','Mutuelle'),";
					sql += "(18,'Syndicat de salariés','Syndicat'),";
					sql += "(19,'Syndicat patronal','Syndicat'),";
					sql += "(20,'Syndicat de copropriété','Syndic cop'),";
					sql += "(21,'Association loi 1901','Assoc.'),";
					sql += "(22,'Trésorerie','Trésorerie'),";
					sql += "(23,'SEP','SEP'),";
					sql += "(24,'SELARL','SELARL'),";
					sql += "(25,'Etude','Etude'),";
					sql += "(26,'TI','TI'),";
					sql += "(27,'TC-TGI','TC-TGI'),";
					sql += "(28,'TC-TI','TC-TI'),";
					sql += "(29,'TGI','TGI'),";
					sql += "(30,'TC','TC'),";
					sql += "(31,'SCP HdJ associés','SCP'),";
					sql += "(32,'EARL','EARL'),";
					sql += "(33,'NC',''),";
					sql += "(34,'Association','Assoc.'),";
					sql += "(35,'Société Civile d''Exploitation Agricole','SCEA'),";
					sql += "(36,'SCP','SCP'),";
					sql += "(37,'GEIE','GEIE'),";
					sql += "(38,'Comité d''Entreprise','CE'),";
					sql += "(39,'Cabinet d''avocats',NULL),";
					sql += "(40,'Compagnie d''assurance',NULL),";
					sql += "(41,'EURL','EURL'),";
					sql += "(42,'Fondation',NULL),";
					sql += "(43,'URSSAF',NULL),";
					sql += "(44,'Artisan','Artisan')";

					tx.executeSql(sql);
				},
				function (tx, error) {
				},
				function (tx) {
				}
			);
	}
	

});    

