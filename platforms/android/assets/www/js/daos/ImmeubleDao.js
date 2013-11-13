window.ImmeubleDao = function (db) {
	this.db = db;
};

_.extend(window.ImmeubleDao.prototype, {

	initialize_immeuble:function () { // création de la table iImmeuble
		this.db.transaction(
				function (tx) {
					//tx.executeSql("DROP TABLE IF EXISTS 'iImmeuble'");
					var sql = 'CREATE TABLE IF NOT EXISTS "iImmeuble" ("id_immeuble" VARCHAR PRIMARY KEY NOT NULL UNIQUE,';
					sql +='"cle_ptt" BOOL,';
					sql +=	'"cle_gaz" BOOL,';
					sql +=	'"interphone" BOOL,';
					sql +=	'"code_vigik" VARCHAR(25),';
					sql +=	'"digicode" VARCHAR(25),';
					sql +=	'"cle_ptt_sas" BOOL,';
					sql +=	'"interphone_sas" BOOL,';
					sql +=	'"acces_gardien_sas" BOOL,';
					sql +=	'"digicode_sas" VARCHAR(25),';
					sql +=	'"nom_gardien" VARCHAR(25),';
					sql +=	'"telephone_gardien" VARCHAR(25),';
					sql +=	'"plage_horaires_gardien" VARCHAR(25),';
					sql +=	'"nom_syndic" VARCHAR(25),';
					sql +=	'"tel_syndic" TEXT,';
					sql +=	'"commentaire"TEXT,';
					sql +=	'"modifie" BOOL NOT NULL,';
					sql +=	'"etage" VARCHAR(25),';
					sql +=	'"porte" VARCHAR(25))';




					tx.executeSql(sql);
				},
				function (tx, error) {
					alert('Transaction error ' + error);
				},
				function (tx) {







				}
		);
	},

	enregistrer_immeuble :function(id_immeuble,  //insertion d'un nouvel immeuble dans la table
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

					var sql = "INSERT OR IGNORE INTO iImmeuble (id_immeuble,";
					sql += "cle_ptt,";
					sql +="cle_gaz,";
					sql +="interphone,";
					sql +="code_vigik,";
					sql +="digicode,"; 
					sql +="cle_ptt_sas,"; 
					sql +="interphone_sas,"; 
					sql +="acces_gardien_sas,"; 
					sql +="digicode_sas,"; 
					sql +="nom_gardien,";
					sql +="telephone_gardien,"; 
					sql +="plage_horaires_gardien,"; 
					sql +="nom_syndic,"; 
					sql +="tel_syndic,"; 
					sql +="commentaire,"; 
					sql +="modifie,";
					sql +="etage,"; 
					sql +="porte)"; 

					sql += "VALUES ('"+id_immeuble+"',";
					sql += "'"+cle_ptt+"',"; 
					sql += "'"+cle_gaz+"',";
					sql += "'"+interphone+"',";
					sql += "'"+code_vigik+"',";
					sql += "'"+digicode+"',";
					sql += "'"+cle_ptt_sas+"',";
					sql += "'"+interphone_sas+"',";
					sql += "'"+acces_gardien_sas+"',";
					sql += "'"+digicode_sas+"',"; 
					sql += "'"+nom_gardien+"',";
					sql += "'"+telephone_gardien+"',"; 
					sql += "'"+plage_horaires_gardien+"',"; 
					sql += "'"+nom_syndic+"',"; 
					sql += "'"+tel_syndic+"',"; 
					sql += "'"+commentaire+"',"; 
					sql += "'"+modifie+"',";
					sql += "'"+etage+"',"; 
					sql += "'"+porte+"')";

					tx.executeSql(sql);

				},
				function error(err) {	 // fonction appelée lorsqu'une requête SQL échoue

					alert("Erreur de traitement SQL : "+err.code); // affichage du code de l'erreur http://www.sqlite.org/c3ref/c_abort.html
					console.log("Erreur de traitement SQL : "+err.code); 
				}, 

				function success_ajout_iImmeuble() {

					console.log("Insertion réussie dans la table iImmeuble");

				}
		); 

	},

	contenu_immeuble : function(){ // liste tous les immeubles
		this.db.transaction(
				function (tx) {
					tx.executeSql("SELECT * FROM iImmeuble", [], function lister_iImmeuble(tx, results) {
						var len = results.rows.length;
						console.log("Table iImmeuble : " + len + " enregistrements trouvés.");
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
						//console.log("Table iImmeuble : " + len + " enregistrements trouvés.");
						if(len !=0){ // si l'immeuble est présent dans la table
							for (var i=0; i<len; i++){

								//console.log("Enregistrement = " + i + " ID_immeuble = " + results.rows.item(i).id_immeuble + " code vigik  =  " + results.rows.item(i).code_vigik + " cle_ptt = " + results.rows.item(i).cle_ptt + " id adresse =  " + results.rows.item(i).adresse);
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




