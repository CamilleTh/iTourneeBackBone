function start(){
	
	var promise = $.Deferred();
	
	var gotFileWriter = function(writer) {
		getDocuments().then(function(docsInXML){
			var header = getHeader("444");
			writer.write(header+"\n"+docsInXML);
			promise.resolve(true);
		});
	};

	var onError = function(){
		console.log(error)
		console.log(JSON.stringify(error, null, 4));
		console.log(error.code);
	};
	var gotFileEntry = function(fileEntry) {
		fileEntry.createWriter(gotFileWriter, onError);
	};
	var gotFS = function(fileSystem){
		fileSystem.root.getFile("test4.xml", {create: true, exclusive: false}, gotFileEntry, onError);
	};
	
	window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, gotFS,onError);
	
	return promise;
}


function getHeader(numeroTournee){
	var chaine =	"<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?>" + "\n"
	+ "<tournee>" + "\n" 
    + "<id_systeme_nomade>idSystemNomade</id_systeme_nomade>" + "\n"
    + "<numero_echange>numeroEchange</numero_echange>" + "\n"
    + "<numero_version_fichier>versionFichier</numero_version_fichier>" + "\n"
    + "<numero_tournee>"+numeroTournee+"</numero_tournee>" + "\n";
    return chaine;
}

function getDocuments(){

	var promiseDoc = $.Deferred();
	
	var pDocs = documentdao.find_documents();
	
	pDocs.then(function(docs){

		var chaine = "";
		for(var i=0;i<docs.length;i++){
			var doc = docs[i];
			
			chaine += 	DocumentToXml(doc);
			chaine += "\n"
		}
		promiseDoc.resolve(chaine);
		
	});
	return promiseDoc;	
}


function DocumentToXml(doc){
	
	
	numero_document = doc.get('numero_document');
	id_etude = doc.get('id_etude');
    numero_document = doc.get('numero_document');
    nature_signification = doc.get('nature_signification');
	nature_parquet = doc.get('nature_parquet');
	nom_tiers_a_signifier = doc.get('nom_tiers_a_signifier');
	type_tiers_a_signifier  = doc.get('type_tiers_a_signifier');
	civilite_tiers_a_signifier = doc.get('civilite_tiers_a_signifier');
	commentaires_tiers = doc.get('commentaires_tiers');
	domicile_elu = doc.get('domicile_elu');
	domiciliation = doc.get('domiciliation');
	numero_tiers_a_signifier = doc.get('numero_tiers_a_signifier');
	libelle_document = doc.get('libelle_document');
	signataire = doc.get('signataire');
	nombre_feuillets = doc.get('nombre_feuillets');
      
    var chaine =  "<document>" + "\n"
    + "<id_etude>"+id_etude+"</id_etude>" + "\n"
    + "<numero_document>"+numero_document+"</numero_document>" + "\n"
    + "<nature_signification>"+nature_signification+"</nature_signification>" + "\n"
    + "<nature_parquet>"+nature_parquet+"</nature_parquet>" + "\n"
    + "<nom_tiers_a_signifier>"+nom_tiers_a_signifier+"</nom_tiers_a_signifier>" + "\n"
    + "<type_tiers_a_signifier>"+type_tiers_a_signifier+"</type_tiers_a_signifier>" + "\n"
    + "<civilite_tiers_a_signifier>"+civilite_tiers_a_signifier+"</civilite_tiers_a_signifier>" + "\n"
    + "<commentaires_tiers>"+commentaires_tiers+"</commentaires_tiers>" + "\n"
    + "<domicile_elu>"+domicile_elu+"</domicile_elu>" + "\n"
    + "<domiciliation>"+domiciliation+"</domiciliation>" + "\n"
    + "<numero_tiers_a_signifier>"+numero_tiers_a_signifier+"</numero_tiers_a_signifier>" + "\n"
    + "<libelle_document>"+libelle_document+"</libelle_document>" + "\n"
    + "<signataire>"+signataire+"</signataire>" + "\n"
    + "<nombre_feuillets>"+nombre_feuillets+"</nombre_feuillets>" + "\n";
    
    // Adresse
    chaine  += "<adresse>"+ "\n"
    	
    chaine  += "</adresse>"+ "\n"
    	
    // Immeuble
    chaine  += "<immeuble>"+ "\n"
    	    	
    chaine  += "</immeuble>"+ "\n"
    		    	
    chaine  += "</document>"+ "\n"
	return chaine 

}
