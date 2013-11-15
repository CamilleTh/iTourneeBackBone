window.DocumentDao = function (db) {
	this.db = db;
};

_.extend(window.DocumentDao.prototype, {

	initialize_document:function () { // creation de la table iDocument

		this.db.transaction(
				function (tx) {
					//tx.executeSql("DROP TABLE IF EXISTS 'iDocument'");
					var sql = 'CREATE TABLE IF NOT EXISTS "iDocument" ("numero_document" VARCHAR PRIMARY KEY NOT NULL UNIQUE,';			
					sql += '"id_etude" VARCHAR(25) NOT NULL,';
					sql +='"nature_signification" INTEGER NOT NULL,'; // soit 1,2 ou 6
					sql +='"nature_parquet" VARCHAR(50) NOT NULL DEFAULT Français,';
					sql +='"nom_tiers_a_signifier" VARCHAR(300) NOT NULL,';
					sql +='"type_tiers_a_signifier" VARCHAR(1) NOT NULL,'; // M ou P
					sql +='"civilite_tiers_a_signifier" INTEGER NOT NULL,';
					sql +='"nom_debiteur" VARCHAR(300),';
					sql +='"commentaires_tiers" TEXT,';
					sql +='"domicile_elu" BOOL NOT NULL,';
					sql +='"presomption_domiciliation" BOOL NOT NULL,';
					sql +='"domicilie" BOOL NOT NULL,';
					sql +='"domiciliation" BOOL NOT NULL,';
					sql +='"numero_tiers_a_signifier" INTEGER NOT NULL,';
					sql +='"libelle_document" VARCHAR(200) NOT NULL,';
					sql +='"signataire" VARCHAR(25) NOT NULL,';
					sql +='"nombre_feuillets" INTEGER NOT NULL,';
					sql +='"adresse" VARCHAR(25) NOT NULL,';
					sql +='"immeuble" VARCHAR(25),';
					sql +='"signification" INTEGER,';
					sql +='"valide" BOOL NOT NULL)';



					tx.executeSql(sql);
					//	tx.executeSql('CREATE TABLE IF NOT EXISTS "iAdresse" ("id_adresse" INTEGER PRIMARY KEY  NOT NULL UNIQUE ,"texte_libre" VARCHAR,"complement1" VARCHAR,"complement2" VARCHAR,"numero" INTEGER DEFAULT (null) ,"complement_numero" VARCHAR,"nature_voie" VARCHAR,"lien_nature_nom_voie" VARCHAR,"nom_voie" VARCHAR,"code_postal" VARCHAR DEFAULT (null) ,"nom_commune" VARCHAR,"commentaire" TEXT DEFAULT (null) ,"statut" VARCHAR)');
					//	tx.executeSql('CREATE TABLE IF NOT EXISTS "iDomicile" ("id_immeuble" VARCHAR PRIMARY KEY  NOT NULL  UNIQUE ,"cle_ptt" BOOL,"cle_gaz" BOOL,"interphone" BOOL,"code_vigik" VARCHAR,"digicode" VARCHAR,"cle_ptt_sas" BOOL,"interphone_sas" BOOL,"acces_gardien_sas" BOOL,"digicode_sas" VARCHAR,"nom_gardien" VARCHAR,"telephone_gardien" VARCHAR,"plage_horaires_gardien" VARCHAR,"nom_syndic" VARCHAR,"tel_syndic" VARCHAR,"commentaire" VARCHAR,"etage" VARCHAR,"porte" VARCHAR,"modifie" BOOL)');



				},
				function (error) {
					alert('Transaction error1 ' + error.code);
				},
				function (tx) {

					console.log("succes");	

				}
		);

	},

	enregistrer_document :function(numero_document, // enregistrement d'un nouveau document dans la table
			id_etude,
			nature_signification,
			nature_parquet,
			nom_tiers_a_signifier,
			type_tiers_a_signifier,
			civilite_tiers_a_signifier,
			nom_debiteur,
			commentaires_tiers,
			domicile_elu,
			presomption_domiciliation,
			domicilie,
			domiciliation,
			numero_tiers_a_signifier,
			libelle_document,
			signataire,
			nombre_feuillets,
			adresse,
			immeuble,
			signification,
			valide){

		this.db.transaction(
				function(tx){ 
					var sql ="INSERT OR IGNORE INTO iDocument (numero_document,";
					sql +=	" id_etude,";
					sql +=	" nature_signification,";
					sql +=	" nature_parquet,";
					sql +=	" nom_tiers_a_signifier,";
					sql +=	" type_tiers_a_signifier,";
					sql +=	" civilite_tiers_a_signifier,";
					sql +=	" nom_debiteur,";
					sql +=	" commentaires_tiers,";
					sql +=	" domicile_elu,";
					sql +=	" presomption_domiciliation,";
					sql +=	" domicilie,";
					sql +=	" domiciliation,";
					sql +=	" numero_tiers_a_signifier,";
					sql +=	" libelle_document,";
					sql +=	" signataire,";
					sql +=	" nombre_feuillets,";
					sql +=	" adresse,";
					sql +=	" immeuble,";
					sql +=	" signification,";
					sql +=	" valide )";


					sql +="VALUES ('"+numero_document+"',";
					sql +="'"+id_etude+"'," ;
					sql +="'"+nature_signification+"',"; 
					sql +="'"+nature_parquet+"',";
					sql +="'"+nom_tiers_a_signifier+"',";
					sql +="'"+type_tiers_a_signifier+"',";
					sql +="'"+civilite_tiers_a_signifier+"',";
					sql +="'"+nom_debiteur+"',";
					sql +="'"+commentaires_tiers+"',";
					sql +="'"+domicile_elu+"',";
					sql +="'"+presomption_domiciliation+"',";
					sql +="'"+domicilie+"',";
					sql +="'"+domiciliation+"',";
					sql +="'"+numero_tiers_a_signifier+"',";
					sql +="'"+libelle_document+"',";
					sql +="'"+signataire+"',";
					sql +="'"+nombre_feuillets+"',";
					sql +="'"+adresse+"',";
					sql +="'"+immeuble+"',";
					sql +="'"+signification+"',";
					sql +="'"+valide+"')";


					tx.executeSql(sql);

				},
				function error(err) {	 // fonction appelée lorsqu'une requête SQL échoue

					alert("Erreur de traitement SQL : "+err.code); // affichage du code de l'erreur http://www.sqlite.org/c3ref/c_abort.html
					console.log("Erreur de traitement SQL : "+err.code); 
				}, 

				function success_ajout_iDocument() {

					console.log("Insertion réussie dans la table iDocument");

				}
		); 

	}, 

	contenu_document : function(){ // pour lister les documents contenus dans la table iDocument
		this.db.transaction(
				function (tx) {
					tx.executeSql("SELECT * FROM iDocument", [], function lister_iDocument(tx, results) {
						var len = results.rows.length;
						console.log("Table iDocument : " + len + " enregistrements trouvés.");
						for (var i=0; i<len; i++){
							
							console.log("Enregistrement = " + i + " ID_etude = " + results.rows.item(i).id_etude + " presomption de dom = " + results.rows.item(i).presomption_domiciliation + " Civ = " + results.rows.item(i).civilite_tiers_a_signifier + "Nom tiers = " + results.rows.item(i).nom_tiers_a_signifier + " Numéro document =  " + results.rows.item(i).numero_document + " valide =  " + results.rows.item(i).valide + " id immeuble =  " + results.rows.item(i).immeuble);
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

	find_document_by_id : function(numero_document){ // pour selectionner un document particulier
		var promise = $.Deferred(); // on utilise une promesse
		this.db.transaction(
				function (tx) {
					tx.executeSql("SELECT * FROM iDocument WHERE iDocument.numero_document ='"+numero_document+"'", [], function lister_iDocument(tx, results) {
						var len = results.rows.length;
						var libelle = "inconnu";
						
						//console.log("Table iDocument : " + len + " enregistrements trouvés.");
						for (var i=0; i<len; i++){

							//console.log("Enregistrement = " + i + " ID_etude = " + results.rows.item(i).id_etude + " Numéro document =  " + results.rows.item(i).numero_document + " Nature signification =  " + results.rows.item(i).nature_signification + " valide =  " + results.rows.item(i).valide);
							var new_doc = new DocumentModel({numero_document : results.rows.item(i).numero_document,
								nature_signification : results.rows.item(i).nature_signification,
								nature_parquet : results.rows.item(i).nature_parquet,
								nom_tiers_a_signifier : results.rows.item(i).nom_tiers_a_signifier,
								type_tiers_a_signifier : results.rows.item(i).type_tiers_a_signifier ,
								civilite_tiers_a_signifier : results.rows.item(i).civilite_tiers_a_signifier,
								nom_debiteur : results.rows.item(i).nom_debiteur ,
								commentaires_tiers : results.rows.item(i).commentaires_tiers ,
								domicile_elu : results.rows.item(i).domicile_elu,
								presomption_domiciliation : results.rows.item(i).presomption_domiciliation ,
								domicilie : results.rows.item(i).domicilie ,
								domiciliation :  results.rows.item(i).domiciliation ,
								numero_tiers_a_signifier : results.rows.item(i).numero_tiers_a_signifier ,
								libelle_document : results.rows.item(i).libelle_document ,
								signataire : results.rows.item(i).signataire,
								nombre_feuillets : results.rows.item(i).nombre_feuillets,
								adresse : results.rows.item(i).adresse,
								immeuble :	results.rows.item(i).immeuble,
								signification :	results.rows.item(i).signification,
								valide : results.rows.item(i).valide });


							promise.resolve(new_doc); // la promesse contient le document trouvé


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
		return promise; // on retourne la promesse
	},
	
	
	find_documents : function(numero_document){ // pour selectionner un document particulier
		var promise = $.Deferred(); // on utilise une promesse
		var array = new  Array();
		this.db.transaction(
				function (tx) {
					tx.executeSql("SELECT * FROM iDocument", [], function lister_iDocument(tx, results) {
						var len = results.rows.length;
						
						
						console.log("Table iDocument : " + len + " enregistrements trouvés.");
						for (var i=0; i<len; i++){

							console.log("Enregistrement = " + i + " ID_etude = " + results.rows.item(i).id_etude + " Numéro document =  " + results.rows.item(i).numero_document + " Nature signification =  " + results.rows.item(i).nature_signification + " valide =  " + results.rows.item(i).valide);
							var new_doc = new DocumentModel({numero_document : results.rows.item(i).numero_document,
								nature_signification : results.rows.item(i).nature_signification,
								nature_parquet : results.rows.item(i).nature_parquet,
								nom_tiers_a_signifier : results.rows.item(i).nom_tiers_a_signifier,
								type_tiers_a_signifier : results.rows.item(i).type_tiers_a_signifier ,
								civilite_tiers_a_signifier : results.rows.item(i).civilite_tiers_a_signifier,
								nom_debiteur : results.rows.item(i).nom_debiteur ,
								commentaires_tiers : results.rows.item(i).commentaires_tiers ,
								domicile_elu : results.rows.item(i).domicile_elu,
								presomption_domiciliation : results.rows.item(i).presomption_domiciliation ,
								domicilie : results.rows.item(i).domicilie ,
								domiciliation :  results.rows.item(i).domiciliation ,
								numero_tiers_a_signifier : results.rows.item(i).numero_tiers_a_signifier ,
								libelle_document : results.rows.item(i).libelle_document ,
								signataire : results.rows.item(i).signataire,
								nombre_feuillets : results.rows.item(i).nombre_feuillets,
								adresse : results.rows.item(i).adresse,
								immeuble :	results.rows.item(i).immeuble,
								signification :	results.rows.item(i).signification,
								valide : results.rows.item(i).valide });

							array.push(new_doc);

						}

						promise.resolve(array);


					}
					);

				},
				function (tx, error) {
					alert('Transaction error2 ' + error);
				},
				function (tx) {

					console.log("succes lecture");



				}
		);
		console.log("PROMISE " + promise);
		console.log("array "  + array)
		console.log("PROMISES " + JSON.stringify(promise));
		console.log("arrayS "  +  JSON.stringify(array))
		return promise;
	},
	
	documentsValid : function(){ 
		var promise = $.Deferred(); // on utilise une promesse
		this.db.transaction(
				function (tx) {
					tx.executeSql("SELECT * FROM iDocument WHERE valide == \"inconnu\" OR valide == \"false\"", [], function countDoc(tx, results) {
						var len = results.rows.length;				
						console.log("Table iDocument : " + len + " enregistrements trouvés.");
						promise.resolve(len);
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
		return promise; // on retourne la promesse
	},
	
	update_document :function(numero_document,valide){ // pour mettre à jour les champs d'un document particulier

		this.db.transaction(
				function(tx){ 
					var sql ="UPDATE iDocument SET valide='"+valide+"' WHERE numero_document='"+numero_document+"'";
					tx.executeSql(sql);

				},
				function error(err) {	 // fonction appelée lorsqu'une requête SQL échoue

					alert("Erreur de traitement SQL : "+err.code); // affichage du code de l'erreur http://www.sqlite.org/c3ref/c_abort.html
					console.log("Erreur de traitement SQL : "+err.code); 
				}, 

				function success_ajout_iDocument() {

					console.log("Update réussie dans la table iDocument");

				}
		); 

	},

	update_document_immeuble :function(numero_document,immeuble){ // pour mettre à jour les champs d'un document particulier

		this.db.transaction(
				function(tx){ 
					var sql ="UPDATE iDocument SET immeuble='"+immeuble+"' WHERE numero_document='"+numero_document+"'";
					tx.executeSql(sql);

				},
				function error(err) {	 // fonction appelée lorsqu'une requête SQL échoue

					alert("Erreur de traitement SQL : "+err.code); // affichage du code de l'erreur http://www.sqlite.org/c3ref/c_abort.html
					console.log("Erreur de traitement SQL : "+err.code); 
				}, 

				function success_ajout_iDocument() {

					console.log("Update réussie dans la table iDocument");

				}
		); 

	},
	
	update_document_domicilie :function(numero_document,domicilie){ // pour mettre à jour les champs d'un document particulier

		this.db.transaction(
				function(tx){ 
					var sql ="UPDATE iDocument SET domicilie='"+domicilie+"' WHERE numero_document='"+numero_document+"'";
					tx.executeSql(sql);

				},
				function error(err) {	 // fonction appelée lorsqu'une requête SQL échoue

					alert("Erreur de traitement SQL : "+err.code); // affichage du code de l'erreur http://www.sqlite.org/c3ref/c_abort.html
					console.log("Erreur de traitement SQL : "+err.code); 
				}, 

				function success_ajout_iDocument() {

					console.log("Update réussie dans la table iDocument");

				}
		); 

	}
			
			





});


/*function enregistrer_document(tx,id_etude,numero_document){
	var a = id_etude;
	var b = numero_document;
	alert("id_etude que je veux"+ a);
	alert("numero doc que je veux "+b);
	tx.executeSql("INSERT INTO iDocument (id_etude, numero_document) VALUES ('"+a+"','"+b+"')");
} */

/*function error(err) {	 // fonction appelée lorsqu'une requête SQL échoue

	alert("Erreur de traitement SQL : "+err.code); // affichage du code de l'erreur http://www.sqlite.org/c3ref/c_abort.html
	console.log("Erreur de traitement SQL : "+err.code); 
} */


/*function success_ajout_iDocument() {

	alert("Insertion réussie dans la table iDocument");

} */




