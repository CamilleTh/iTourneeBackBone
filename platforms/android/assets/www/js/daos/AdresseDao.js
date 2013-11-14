window.AdresseDao = function (db) {
	this.db = db;
};

_.extend(window.AdresseDao.prototype, {

	initialize_adresse:function () { // creation de la table iAdresse
		this.db.transaction(
				function (tx) {
					tx.executeSql("DROP TABLE IF EXISTS 'iAdresse'");
					var sql = 'CREATE TABLE IF NOT EXISTS "iAdresse" ("id_adresse" VARCHAR(25) PRIMARY KEY NOT NULL UNIQUE,';
					sql += 	'"texte_libre" VARCHAR(50),';
					sql += 	'"complement1" VARCHAR(255),';
					sql += 	'"complement2" VARCHAR(255),';
					sql += 	'"numero" VARCHAR(255),';
					sql += 	'"complement_numero" VARCHAR(45),';
					sql += 	'"nature_voie" VARCHAR(45),';
					sql += 	'"lien_nature_nom_voie" VARCHAR(45),';
					sql += 	'"nom_voie" VARCHAR(255),';
					sql += 	'"code_postal" VARCHAR(45),';
					sql += 	'"nom_commune" VARCHAR(45),';
					sql += 	'"commentaire" TEXT,';
					sql += 	'"statut" VARCHAR(50) NOT NULL,';	
					sql += 	'"type" INTEGER NOT NULL)';	

					tx.executeSql(sql);

					//	tx.executeSql('CREATE TABLE IF NOT EXISTS "iAdresse" ("id_adresse" INTEGER PRIMARY KEY  NOT NULL UNIQUE ,"texte_libre" VARCHAR,"complement1" VARCHAR,"complement2" VARCHAR,"numero" INTEGER DEFAULT (null) ,"complement_numero" VARCHAR,"nature_voie" VARCHAR,"lien_nature_nom_voie" VARCHAR,"nom_voie" VARCHAR,"code_postal" VARCHAR DEFAULT (null) ,"nom_commune" VARCHAR,"commentaire" TEXT DEFAULT (null) ,"statut" VARCHAR)');
					//	tx.executeSql('CREATE TABLE IF NOT EXISTS "iDomicile" ("id_immeuble" VARCHAR PRIMARY KEY  NOT NULL  UNIQUE ,"cle_ptt" BOOL,"cle_gaz" BOOL,"interphone" BOOL,"code_vigik" VARCHAR,"digicode" VARCHAR,"cle_ptt_sas" BOOL,"interphone_sas" BOOL,"acces_gardien_sas" BOOL,"digicode_sas" VARCHAR,"nom_gardien" VARCHAR,"telephone_gardien" VARCHAR,"plage_horaires_gardien" VARCHAR,"nom_syndic" VARCHAR,"tel_syndic" VARCHAR,"commentaire" VARCHAR,"etage" VARCHAR,"porte" VARCHAR,"modifie" BOOL)');

				},
				function (error) {
					alert('Transaction error ' + error.code);
				},
				function (tx) {









				}
		);
	},

	enregistrer_adresse :function(id_adresse, // insertion d'une nouvelle adresse
			texte_libre,
			complement1,
			complement2,
			numero,
			complement_numero,
			nature_voie,
			lien_nature_nom_voie,
			nom_voie,
			code_postal,
			nom_commune,
			commentaire,
			statut,
			type){

		this.db.transaction(
				function(tx){
					var sql = "INSERT OR IGNORE INTO iAdresse (id_adresse,";

					sql+= "texte_libre,";
					sql+="complement1,";
					sql+="complement2,";
					sql+="numero,";
					sql+="complement_numero,";
					sql+="nature_voie,";
					sql+="lien_nature_nom_voie,";
					sql+="nom_voie,";
					sql+="code_postal,";
					sql+="nom_commune,";
					sql+="commentaire,";
					sql+="statut,";
					sql+="type)";

					sql+= "VALUES ('"+id_adresse+"',";
					sql+="'"+texte_libre+"',"
					sql+="'"+complement1+"',";
					sql+="'"+complement2+"',";
					sql+="'"+numero+"',";
					sql+="'"+complement_numero+"',";
					sql+="'"+nature_voie+"',";
					sql+="'"+lien_nature_nom_voie+"',";
					sql+="'"+nom_voie+"',";
					sql+="'"+code_postal+"',";
					sql+="'"+nom_commune+"',";
					sql+="'"+commentaire+"',";
					sql+="'"+statut+"',";
					sql+="'"+type+"')";

					tx.executeSql(sql);
					

				},
				function error(err) {	 // fonction appelée lorsqu'une requête SQL échoue

					alert("Erreur de traitement SQL : "+err.code); // affichage du code de l'erreur http://www.sqlite.org/c3ref/c_abort.html
					console.log("Erreur de traitement SQL : "+err.code); 
				}, 

				function success_ajout_iDocument() {

					console.log("Insertion réussie dans la table iAdresse");

				}
		); 

	}, 

	contenu_adresse : function(){ // liste toutes les adresses contenues dans la table iAdresse
		this.db.transaction(
				function (tx) {
					tx.executeSql("SELECT * FROM iAdresse", [], function lister_iAdresse(tx, results) {
						var len = results.rows.length;
						console.log("Table iAdresse : " + len + " enregistrements trouvés.");
						for (var i=0; i<len; i++){
							console.log("Enregistrement = " + i + " ID_adresse = " +results.rows.item(i).id_adresse + " Numéro =  " + results.rows.item(i).numero + " Nature signification =  " + results.rows.item(i).nature_signification + " id adresse =  " + results.rows.item(i).adresse);
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

	find_adresse_by_id : function(id_adresse){ // trouver une adresse par son id
		var promise = jQuery.Deferred();
		this.db.transaction(
				function (tx) {
					tx.executeSql("SELECT * FROM iAdresse WHERE iAdresse.id_adresse ='"+id_adresse+"'", [], function lister_iAdresse(tx, results) {
						var len = results.rows.length;
						//console.log("Table iAdresse : " + len + " enregistrements trouvés.");
						for (var i=0; i<len; i++){

							//console.log("Enregistrement = " + i + " ID_adresse = " + results.rows.item(i).id_adresse + " Numéro  =  " + results.rows.item(i).numero + " Nature signification =  " + results.rows.item(i).nature_signification + " id adresse =  " + results.rows.item(i).adresse);
							var new_adresse = new AdresseModel({id_adresse : results.rows.item(i).id_adresse, 
								texte_libre : results.rows.item(i).texte_libre,
								complement1 : results.rows.item(i).complement1,
								complement2 : results.rows.item(i).complement2,
								numero : results.rows.item(i).numero,
								complement_numero : results.rows.item(i).complement_numero,
								nature_voie : results.rows.item(i).nature_voie,
								lien_nature_nom_voie : results.rows.item(i).lien_nature_nom_voie, 
								nom_voie : results.rows.item(i).nom_voie, 
								code_postal : results.rows.item(i).code_postal, 
								nom_commune : results.rows.item(i).nom_commune, 
								commentaire : results.rows.item(i).commentaire, 
								statut : results.rows.item(i).statut,
								type : results.rows.item(i).type });

							promise.resolve(new_adresse); // la promesse contient l'adresse trouvée


						}


						//	$('#div3').trigger('create');

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




