window.SignificationDao = function (db) {
	this.db = db;
};

_.extend(window.SignificationDao.prototype, {

	initialize_signification:function () { // création de la table iImmeuble
		this.db.transaction(
				function (tx) {
					//tx.executeSql("DROP TABLE IF EXISTS 'iImmeuble'");
					
					tx.executeSql("DROP TABLE IF EXISTS 'type_mode_signification'");
					var sql = 'CREATE TABLE IF NOT EXISTS "type_mode_signification" ("id_type_mode_signification" int (10),';
					sql+= '"libelle" varchar (300),';
					sql +='"type_tiers" char (3),';
					sql += '"id_type_famille_document" int (10))';

					tx.executeSql(sql);
					
					tx.executeSql("insert into 'type_mode_signification' ('id_type_mode_signification', 'libelle', 'type_tiers', 'id_type_famille_document') values('1','A personne (Art 654 CPC)','P','1')");
					tx.executeSql("insert into 'type_mode_signification' ('id_type_mode_signification', 'libelle', 'type_tiers', 'id_type_famille_document') values('2','A domicile / A résidence (Art 655 CPC)','P','1')"); 
					tx.executeSql("insert into 'type_mode_signification' ('id_type_mode_signification', 'libelle', 'type_tiers', 'id_type_famille_document') values('4','A domicile, dépôt en étude (Art 656 CPC)','P','1')"); 
					tx.executeSql("insert into 'type_mode_signification' ('id_type_mode_signification', 'libelle', 'type_tiers', 'id_type_famille_document') values('5','PV659','P','1')"); 
					tx.executeSql("insert into 'type_mode_signification' ('id_type_mode_signification', 'libelle', 'type_tiers', 'id_type_famille_document') values('6','Recherche fructueuse','P','1')"); 
					tx.executeSql("insert into 'type_mode_signification' ('id_type_mode_signification', 'libelle', 'type_tiers', 'id_type_famille_document') values('7','Parquet étranger hors UE (Art 684 CPC)','P','1')"); 
					tx.executeSql("insert into 'type_mode_signification' ('id_type_mode_signification', 'libelle', 'type_tiers', 'id_type_famille_document') values('8','Parquet Communautés d''Outre-Mer (Art 660 CPC)','P','1')"); 
					tx.executeSql("insert into 'type_mode_signification' ('id_type_mode_signification', 'libelle', 'type_tiers', 'id_type_famille_document') values('9','Sans remise','P','1')"); 
					tx.executeSql("insert into 'type_mode_signification' ('id_type_mode_signification', 'libelle', 'type_tiers', 'id_type_famille_document') values('10','A personne (Art 654 CPC)','M','1')"); 
					tx.executeSql("insert into 'type_mode_signification' ('id_type_mode_signification', 'libelle', 'type_tiers', 'id_type_famille_document') values('11','A domicile / A résidence (Art 655 CPC)','M','1')"); 
					tx.executeSql("insert into 'type_mode_signification' ('id_type_mode_signification', 'libelle', 'type_tiers', 'id_type_famille_document') values('12','A domicile, dépôt en étude (Art 656 CPC)','M','1')"); 
					tx.executeSql("insert into 'type_mode_signification' ('id_type_mode_signification', 'libelle', 'type_tiers', 'id_type_famille_document') values('13','PV659','M','1')"); 
					tx.executeSql("insert into 'type_mode_signification' ('id_type_mode_signification', 'libelle', 'type_tiers', 'id_type_famille_document') values('14','Recherche fructueuse','M','1')"); 
					tx.executeSql("insert into 'type_mode_signification' ('id_type_mode_signification', 'libelle', 'type_tiers', 'id_type_famille_document') values('15','Parquet étranger hors UE (Art 684 CPC)','M','1')"); 
					tx.executeSql("insert into 'type_mode_signification' ('id_type_mode_signification', 'libelle', 'type_tiers', 'id_type_famille_document') values('16','Parquet Communautés d''Outre-Mer (Art 660 CPC)','M','1')"); 
					tx.executeSql("insert into 'type_mode_signification' ('id_type_mode_signification', 'libelle', 'type_tiers', 'id_type_famille_document') values('17','Sans remise','M','1')"); 
					tx.executeSql("insert into 'type_mode_signification' ('id_type_mode_signification', 'libelle', 'type_tiers', 'id_type_famille_document') values('18','A personne (Art 555 CPP)','P','6')"); 
					tx.executeSql("insert into 'type_mode_signification' ('id_type_mode_signification', 'libelle', 'type_tiers', 'id_type_famille_document') values('19','A domicile / A résidence (Art 556 et 557 CPP)','P','6')"); 
					tx.executeSql("insert into 'type_mode_signification' ('id_type_mode_signification', 'libelle', 'type_tiers', 'id_type_famille_document') values('20','A domicile, dépôt en étude (Art 558 CPP)','P','6')"); 
					tx.executeSql("insert into 'type_mode_signification' ('id_type_mode_signification', 'libelle', 'type_tiers', 'id_type_famille_document') values('21','Remise à parquet (Art 559 CPP)','P','6')"); 
					tx.executeSql("insert into 'type_mode_signification' ('id_type_mode_signification', 'libelle', 'type_tiers', 'id_type_famille_document') values('22','Recherche fructueuse','P','6')"); 
					tx.executeSql("insert into 'type_mode_signification' ('id_type_mode_signification', 'libelle', 'type_tiers', 'id_type_famille_document') values('23','Remise à parquet étranger hors UE (Art 684 CPC)','P','6')"); 
					tx.executeSql("insert into 'type_mode_signification' ('id_type_mode_signification', 'libelle', 'type_tiers', 'id_type_famille_document') values('24','Remise à parquet Communautés d''Outre-Mer (Art 660 CPC)','P','6')"); 
					tx.executeSql("insert into 'type_mode_signification' ('id_type_mode_signification', 'libelle', 'type_tiers', 'id_type_famille_document') values('25','Sans remise','P','6')"); 
					tx.executeSql("insert into 'type_mode_signification' ('id_type_mode_signification', 'libelle', 'type_tiers', 'id_type_famille_document') values('26','A personne (Art 555 CPP)','M','6')"); 
					tx.executeSql("insert into 'type_mode_signification' ('id_type_mode_signification', 'libelle', 'type_tiers', 'id_type_famille_document') values('27','A domicile / A résidence (Art 556 et 557 CPP)','M','6')"); 
					tx.executeSql("insert into 'type_mode_signification' ('id_type_mode_signification', 'libelle', 'type_tiers', 'id_type_famille_document') values('28','A domicile, dépôt en étude (Art 558 CPP)','M','6')"); 
					tx.executeSql("insert into 'type_mode_signification' ('id_type_mode_signification', 'libelle', 'type_tiers', 'id_type_famille_document') values('29','Remise à parquet (Art 559 CPP)','M','6')"); 
					tx.executeSql("insert into 'type_mode_signification' ('id_type_mode_signification', 'libelle', 'type_tiers', 'id_type_famille_document') values('30','Recherche fructueuse','M','6')"); 
					tx.executeSql("insert into 'type_mode_signification' ('id_type_mode_signification', 'libelle', 'type_tiers', 'id_type_famille_document') values('31','Remise à parquet étranger hors UE (Art 684 CPC)','M','6')"); 
					tx.executeSql("insert into 'type_mode_signification' ('id_type_mode_signification', 'libelle', 'type_tiers', 'id_type_famille_document') values('32','Remise à parquet Communautés d''Outre-Mer (Art 660 CPC)','M','6')"); 
					tx.executeSql("insert into 'type_mode_signification' ('id_type_mode_signification', 'libelle', 'type_tiers', 'id_type_famille_document') values('33','Sans remise','M','6')"); 
					tx.executeSql("insert into 'type_mode_signification' ('id_type_mode_signification', 'libelle', 'type_tiers', 'id_type_famille_document') values('38','Recherche infructueuse','P','1')"); 
					tx.executeSql("insert into 'type_mode_signification' ('id_type_mode_signification', 'libelle', 'type_tiers', 'id_type_famille_document') values('39','Recherche infructueuse','M','1')"); 
					tx.executeSql("insert into 'type_mode_signification' ('id_type_mode_signification', 'libelle', 'type_tiers', 'id_type_famille_document') values('40','Nouvelle adresse de signification','P','1')"); 
					tx.executeSql("insert into 'type_mode_signification' ('id_type_mode_signification', 'libelle', 'type_tiers', 'id_type_famille_document') values('41','Nouvelle adresse de signification','M','1')"); 
					tx.executeSql("insert into 'type_mode_signification' ('id_type_mode_signification', 'libelle', 'type_tiers', 'id_type_famille_document') values('42','Nouvelle tentative','P','1')"); 
					tx.executeSql("insert into 'type_mode_signification' ('id_type_mode_signification', 'libelle', 'type_tiers', 'id_type_famille_document') values('43','Nouvelle tentative','M','1')"); 
					tx.executeSql("insert into 'type_mode_signification' ('id_type_mode_signification', 'libelle', 'type_tiers', 'id_type_famille_document') values('44','Attestation de recherche infructueuse','P','1')"); 
					tx.executeSql("insert into 'type_mode_signification' ('id_type_mode_signification', 'libelle', 'type_tiers', 'id_type_famille_document') values('45','Attestation de recherche infructueuse','M','1')"); 
					
					
					
					
					
					
				},
				function (tx, error) {
					alert('Transaction error ' + error);
				},
				function (tx) {



					console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>succes type mode signif");



				}
		);
	},

	

	contenu_type_mode_signification : function(){ // liste tous les immeubles
		this.db.transaction(
				function (tx) {
					tx.executeSql("SELECT * FROM type_mode_signification", [], function lister_type_mode_signification(tx, results) {
						var len = results.rows.length;
						console.log("Table type mode signification : " + len + " enregistrements trouvés.");
						for (var i=0; i<len; i++){

							console.log("Enregistrement = " + i + " ID_immeuble = " + results.rows.item(i).id_immeuble + " Porte = " + results.rows.item(i).porte + "clé ptt =  " + results.rows.item(i).cle_ptt + " nom syndic =  " + results.rows.item(i).nom_syndic);
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

	find_immeuble_by_id : function(id_immeuble){ // trouver un immeuble par son id
		var promise = jQuery.Deferred(); 
		this.db.transaction(
				function (tx) {

					tx.executeSql("SELECT * FROM iImmeuble WHERE iImmeuble.id_immeuble ='"+id_immeuble+"'", [], function lister_iImmeuble(tx, results) {
						var len = results.rows.length;
						console.log("Table iImmeuble : " + len + " enregistrements trouvés.");
						if(len !=0){ // si l'immeuble est présent dans la table
							for (var i=0; i<len; i++){

								console.log("Enregistrement = " + i + " ID_immeuble = " + results.rows.item(i).id_immeuble + " code vigik  =  " + results.rows.item(i).code_vigik + " cle_ptt = " + results.rows.item(i).cle_ptt + " id adresse =  " + results.rows.item(i).adresse);
								var new_immeuble = new ImmeubleModel({id_immeuble : results.rows.item(i).id_immeuble, 
									cle_ptt : results.rows.item(i).cle_ptt,
									cle_gaz : results.rows.item(i).cle_gaz,
									interphone : results.rows.item(i).interphone,
									code_vigik : results.rows.item(i).code_vigik,
									digicode : results.rows.item(i).digicode,
									cle_ptt_sas : results.rows.item(i).cle_ptt_sas,
									interphone_sas : results.rows.item(i).interphone_sas, 
									acces_gardien_sas : results.rows.item(i).acces_gardien_sas, 
									digicode_sas : results.rows.item(i).digicode_sas, 
									nom_gardien : results.rows.item(i).nom_gardien, 
									telephone_gardien : results.rows.item(i).telephone_gardien, 
									plage_horaires_gardien : results.rows.item(i).plage_horaires_gardien,
									nom_syndic : results.rows.item(i).nom_syndic,
									tel_syndic : results.rows.item(i).tel_syndic ,
									commentaire : results.rows.item(i).commentaire,
									modifie : results.rows.item(i).modifie,
									etage : results.rows.item(i).etage,
									porte : results.rows.item(i).porte});

								promise.resolve(new_immeuble); // la promesse contient l'immeuble trouvé

							}
						}
						else{
							var monimmeuble = new ImmeubleModel({
								id_immeuble : " ",
								cle_ptt : "", 
								cle_gaz : "",
								interphone : "",
								code_vigik : "",
								digicode : "", 
								cle_ptt_sas : "", 
								interphone_sas : "", 
								acces_gardien_sas : "", 
								digicode_sas : "", 
								nom_gardien : "",
								telephone_gardien : "", 
								plage_horaires_gardien : "", 
								nom_syndic : "", 
								tel_syndic : "", 
								commentaire : "", 
								modifie : "",
								etage : "", 
								porte : "" 



							});
							promise.resolve(monimmeuble); // sinon la promesse contient un immeuble avec des champs vides
						}



						//	$('#div3').trigger('create');

					}
					);

				},
				function (error) {
					alert('Transaction error ' + error.code);
				},
				function (tx) {

					console.log("succes lecture");



				}
		);
		return promise;

	},

	update_immeuble :function(id_immeuble,  // pour mettre à jour un immeuble particulier
			cle_ptt, 
			cle_gaz,
			interphone,
			code_vigik,
			digicode, 
			cle_ptt_sas, 
			interphone_sas, 
			acces_gardien_sas, 
			digicode_sas, 
			nom_gardien,
			telephone_gardien, 
			plage_horaires_gardien, 
			nom_syndic, 
			tel_syndic, 
			commentaire, 
			modifie,
			etage, 
			porte){

		this.db.transaction(
				function(tx){ 
					alert("rentré dans la méthode");
					var sql ="UPDATE iImmeuble SET cle_ptt='"+cle_ptt+"', "
					sql += "cle_gaz='"+cle_gaz+"', ";
					sql += "interphone='"+interphone+"', ";
					sql += "code_vigik='"+code_vigik+"', ";
					sql += "digicode='"+digicode+"', ";
					sql += "cle_ptt_sas='"+cle_ptt_sas+"', ";
					sql += "interphone_sas='"+interphone_sas+"', ";
					sql += "acces_gardien_sas='"+acces_gardien_sas+"', ";
					sql += "digicode_sas='"+digicode_sas+"', ";
					sql += "nom_gardien='"+nom_gardien+"', ";
					sql += "telephone_gardien='"+telephone_gardien+"', ";
					sql += "plage_horaires_gardien='"+plage_horaires_gardien+"', ";
					sql += "nom_syndic='"+nom_syndic+"', ";
					sql += "tel_syndic='"+tel_syndic+"', ";
					sql += "commentaire='"+commentaire+"', ";
					sql += "modifie='"+modifie+"', ";
					sql += "etage='"+etage+"', ";
					sql += "porte='"+porte+"' ";
					sql += "WHERE id_immeuble='"+id_immeuble+"'";






					tx.executeSql(sql);

				},
				function error(err) {	 // fonction appelée lorsqu'une requête SQL échoue

					alert("Erreur de traitement SQL : "+err.code); // affichage du code de l'erreur http://www.sqlite.org/c3ref/c_abort.html
					console.log("Erreur de traitement SQL : "+err.code); 
				}, 

				function success_ajout_iImmeuble() {

					console.log("Update réussie dans la table iImmeuble");

				}
		); 

	}

});  

