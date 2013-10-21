function start(){
	
	
	
	
	
}

function onDeviceReady() {
	alert("1");
	window.requestFileSystem(LocalFileSystem.TEMPORARY, 0, gotFS, fail);
}

function gotFS(fileSystem) {
	alert("2");
	fileSystem.root.getFile("test2.txt", {create: true, exclusive: false}, gotFileEntry, fail);
}

function gotFileEntry(fileEntry) {
	alert("3");
	fileEntry.createWriter(gotFileWriter, fail);
}

function gotFileWriter(writer) {
	alert("4");
	writer.onwriteend = function(evt) {
		console.log("contents of file now 'some sample text'");
		alert("7"); 
		writer.truncate(11);
		writer.onwriteend = function(evt) {
			console.log("contents of file now 'some sample'");
			alert("8"); 
			writer.seek(4);
			alert("9"); 
			writer.write(" different text");
			alert("10"); 
			writer.onwriteend = function(evt){
				console.log("contents of file now 'some different text'");
			}
		};
	};
	alert("5");  
	writer.write("some sample text");
	alert("6"); 
}

function fail(error) {
	alert(error)
	alert(JSON.stringify(error, null, 4));
	alert(error.code);
	console.log(error.code);
}