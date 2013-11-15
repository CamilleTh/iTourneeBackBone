window.SignificationDao = function (db) {
	this.db = db;
};

_.extend(window.SignificationDao.prototype, {

	initialize_Type_mode_significationDao:function () { // création de la table type_famille_document
		this.db.transaction(
				function (tx) {
					
					//tx.executeSql("DROP TABLE IF EXISTS 'type_mode_signification'");
					var sql = 'CREATE TABLE IF NOT EXISTS "type_mode_signification" ("id_type_mode_signification" int (10),';
					sql+= '"libelle" varchar (300),';
					sql +='"type_tiers" char (3),';
					sql += '"id_type_famille_document" int (10))';

					tx.executeSql(sql);

					tx.executeSql("insert or ignore into 'type_mode_signification' ('id_type_mode_signification', 'libelle', 'type_tiers', 'id_type_famille_document') values('1','A personne (Art 654 CPC)','P','1')");
					tx.executeSql("insert or ignore into 'type_mode_signification' ('id_type_mode_signification', 'libelle', 'type_tiers', 'id_type_famille_document') values('2','A domicile / A résidence (Art 655 CPC)','P','1')"); 
					tx.executeSql("insert or ignore into 'type_mode_signification' ('id_type_mode_signification', 'libelle', 'type_tiers', 'id_type_famille_document') values('4','A domicile, dépôt en étude (Art 656 CPC)','P','1')"); 
					tx.executeSql("insert or ignore into 'type_mode_signification' ('id_type_mode_signification', 'libelle', 'type_tiers', 'id_type_famille_document') values('5','PV659','P','1')"); 
					tx.executeSql("insert or ignore into 'type_mode_signification' ('id_type_mode_signification', 'libelle', 'type_tiers', 'id_type_famille_document') values('6','Recherche fructueuse','P','1')"); 
					tx.executeSql("insert or ignore into 'type_mode_signification' ('id_type_mode_signification', 'libelle', 'type_tiers', 'id_type_famille_document') values('7','Parquet étranger hors UE (Art 684 CPC)','P','1')"); 
					tx.executeSql("insert or ignore into 'type_mode_signification' ('id_type_mode_signification', 'libelle', 'type_tiers', 'id_type_famille_document') values('8','Parquet Communautés d''Outre-Mer (Art 660 CPC)','P','1')"); 
					tx.executeSql("insert or ignore into 'type_mode_signification' ('id_type_mode_signification', 'libelle', 'type_tiers', 'id_type_famille_document') values('9','Sans remise','P','1')"); 
					tx.executeSql("insert or ignore into 'type_mode_signification' ('id_type_mode_signification', 'libelle', 'type_tiers', 'id_type_famille_document') values('10','A personne (Art 654 CPC)','M','1')"); 
					tx.executeSql("insert or ignore into 'type_mode_signification' ('id_type_mode_signification', 'libelle', 'type_tiers', 'id_type_famille_document') values('11','A domicile / A résidence (Art 655 CPC)','M','1')"); 
					tx.executeSql("insert or ignore into 'type_mode_signification' ('id_type_mode_signification', 'libelle', 'type_tiers', 'id_type_famille_document') values('12','A domicile, dépôt en étude (Art 656 CPC)','M','1')"); 
					tx.executeSql("insert or ignore into 'type_mode_signification' ('id_type_mode_signification', 'libelle', 'type_tiers', 'id_type_famille_document') values('13','PV659','M','1')"); 
					tx.executeSql("insert or ignore into 'type_mode_signification' ('id_type_mode_signification', 'libelle', 'type_tiers', 'id_type_famille_document') values('14','Recherche fructueuse','M','1')"); 
					tx.executeSql("insert or ignore into 'type_mode_signification' ('id_type_mode_signification', 'libelle', 'type_tiers', 'id_type_famille_document') values('15','Parquet étranger hors UE (Art 684 CPC)','M','1')"); 
					tx.executeSql("insert or ignore into 'type_mode_signification' ('id_type_mode_signification', 'libelle', 'type_tiers', 'id_type_famille_document') values('16','Parquet Communautés d''Outre-Mer (Art 660 CPC)','M','1')"); 
					tx.executeSql("insert or ignore into 'type_mode_signification' ('id_type_mode_signification', 'libelle', 'type_tiers', 'id_type_famille_document') values('17','Sans remise','M','1')"); 
					tx.executeSql("insert or ignore into 'type_mode_signification' ('id_type_mode_signification', 'libelle', 'type_tiers', 'id_type_famille_document') values('18','A personne (Art 555 CPP)','P','6')"); 
					tx.executeSql("insert or ignore into 'type_mode_signification' ('id_type_mode_signification', 'libelle', 'type_tiers', 'id_type_famille_document') values('19','A domicile / A résidence (Art 556 et 557 CPP)','P','6')"); 
					tx.executeSql("insert or ignore into 'type_mode_signification' ('id_type_mode_signification', 'libelle', 'type_tiers', 'id_type_famille_document') values('20','A domicile, dépôt en étude (Art 558 CPP)','P','6')"); 
					tx.executeSql("insert or ignore into 'type_mode_signification' ('id_type_mode_signification', 'libelle', 'type_tiers', 'id_type_famille_document') values('21','Remise à parquet (Art 559 CPP)','P','6')"); 
					tx.executeSql("insert or ignore into 'type_mode_signification' ('id_type_mode_signification', 'libelle', 'type_tiers', 'id_type_famille_document') values('22','Recherche fructueuse','P','6')"); 
					tx.executeSql("insert or ignore into 'type_mode_signification' ('id_type_mode_signification', 'libelle', 'type_tiers', 'id_type_famille_document') values('23','Remise à parquet étranger hors UE (Art 684 CPC)','P','6')"); 
					tx.executeSql("insert or ignore into 'type_mode_signification' ('id_type_mode_signification', 'libelle', 'type_tiers', 'id_type_famille_document') values('24','Remise à parquet Communautés d''Outre-Mer (Art 660 CPC)','P','6')"); 
					tx.executeSql("insert or ignore into 'type_mode_signification' ('id_type_mode_signification', 'libelle', 'type_tiers', 'id_type_famille_document') values('25','Sans remise','P','6')"); 
					tx.executeSql("insert or ignore into 'type_mode_signification' ('id_type_mode_signification', 'libelle', 'type_tiers', 'id_type_famille_document') values('26','A personne (Art 555 CPP)','M','6')"); 
					tx.executeSql("insert or ignore into 'type_mode_signification' ('id_type_mode_signification', 'libelle', 'type_tiers', 'id_type_famille_document') values('27','A domicile / A résidence (Art 556 et 557 CPP)','M','6')"); 
					tx.executeSql("insert or ignore into 'type_mode_signification' ('id_type_mode_signification', 'libelle', 'type_tiers', 'id_type_famille_document') values('28','A domicile, dépôt en étude (Art 558 CPP)','M','6')"); 
					tx.executeSql("insert or ignore into 'type_mode_signification' ('id_type_mode_signification', 'libelle', 'type_tiers', 'id_type_famille_document') values('29','Remise à parquet (Art 559 CPP)','M','6')"); 
					tx.executeSql("insert or ignore into 'type_mode_signification' ('id_type_mode_signification', 'libelle', 'type_tiers', 'id_type_famille_document') values('30','Recherche fructueuse','M','6')"); 
					tx.executeSql("insert or ignore into 'type_mode_signification' ('id_type_mode_signification', 'libelle', 'type_tiers', 'id_type_famille_document') values('31','Remise à parquet étranger hors UE (Art 684 CPC)','M','6')"); 
					tx.executeSql("insert or ignore into 'type_mode_signification' ('id_type_mode_signification', 'libelle', 'type_tiers', 'id_type_famille_document') values('32','Remise à parquet Communautés d''Outre-Mer (Art 660 CPC)','M','6')"); 
					tx.executeSql("insert or ignore into 'type_mode_signification' ('id_type_mode_signification', 'libelle', 'type_tiers', 'id_type_famille_document') values('33','Sans remise','M','6')"); 
					tx.executeSql("insert or ignore into 'type_mode_signification' ('id_type_mode_signification', 'libelle', 'type_tiers', 'id_type_famille_document') values('38','Recherche infructueuse','P','1')"); 
					tx.executeSql("insert or ignore into 'type_mode_signification' ('id_type_mode_signification', 'libelle', 'type_tiers', 'id_type_famille_document') values('39','Recherche infructueuse','M','1')"); 
					tx.executeSql("insert or ignore into 'type_mode_signification' ('id_type_mode_signification', 'libelle', 'type_tiers', 'id_type_famille_document') values('40','Nouvelle adresse de signification','P','1')"); 
					tx.executeSql("insert or ignore into 'type_mode_signification' ('id_type_mode_signification', 'libelle', 'type_tiers', 'id_type_famille_document') values('41','Nouvelle adresse de signification','M','1')"); 
					tx.executeSql("insert or ignore into 'type_mode_signification' ('id_type_mode_signification', 'libelle', 'type_tiers', 'id_type_famille_document') values('42','Nouvelle tentative','P','1')"); 
					tx.executeSql("insert or ignore into 'type_mode_signification' ('id_type_mode_signification', 'libelle', 'type_tiers', 'id_type_famille_document') values('43','Nouvelle tentative','M','1')"); 
					tx.executeSql("insert or ignore into 'type_mode_signification' ('id_type_mode_signification', 'libelle', 'type_tiers', 'id_type_famille_document') values('44','Attestation de recherche infructueuse','P','1')"); 
					tx.executeSql("insert or ignore into 'type_mode_signification' ('id_type_mode_signification', 'libelle', 'type_tiers', 'id_type_famille_document') values('45','Attestation de recherche infructueuse','M','1')"); 

				},
				function (tx, error) {
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
						console.log("Table type mode signification : " + len + " enregistrements trouvés.");
						for (var i=0; i<len; i++){

							console.log("Enregistrement = " + i + " libelle = " + results.rows.item(i).libelle);
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

	},
	
	remplir_liste : function(){
		var promise = jQuery.Deferred();
		var liste = "";
      
		this.db.transaction(
				function (tx) {
					tx.executeSql("SELECT * FROM type_mode_signification where type_tiers = 'P' AND id_type_famille_document = '1'", [], function lister_type_mode_signification(tx, results) {
						var len = results.rows.length;
						console.log("Table type mode signification : " + len + " enregistrements trouvés.");
						for (var i=0; i<len; i++){

							console.log("Enregistrement = " + i + " libelle = " + results.rows.item(i).libelle);
							
							liste = liste + " <option value='"+results.rows.item(i).id_type_mode_signification+"'>"+results.rows.item(i).libelle+"</option>"
						}
						
					//	new ImmeubleModel({id_immeuble : results.rows.item(i).id_immeuble, 
						var new_liste = new Type_mode_significationModel({liste : liste });
						promise.resolve(new_liste);
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
		
		return promise;
		
	
		
	}





});  

