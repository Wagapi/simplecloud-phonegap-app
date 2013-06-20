<div id="output" style="min-height: 100px; white-space: pre; border: 1px solid black;"
     ondragenter="event.preventDefault();"
     ondragover="event.preventDefault();"
     ondrop="event.stopPropagation(); event.preventDefault(); dodrop(event);">

<script type="text/javascript"> 
<!--
document.write('<p class="accent">You\'re using ' + BrowserDetect.browser + ' ' + BrowserDetect.version + ' on ' + BrowserDetect.OS + '!</p>');
if ( BrowserDetect.browser != "Firefox" && BrowserDetect.browser != "Chrome"){
	document.write('Sorry, your brower does not work with this web site. Bye Bye');
	} 
else {
		document.write('Good job, your browser suits well !');
	}
	
dropzone.addEventListener("dragover", function(event) {
  event.preventDefault();
}, true);


dropzone.addEventListener("drop", function(event) {
  event.preventDefault();
  // Ready to do something with the dropped object
  var allTheFiles = event.dataTransfer.files;
  var ext = get_extension(allTheFiles[0].name);
  alert("You've just dropped " + allTheFiles.length + " files and one whose extension is : " + ext + " and the boolean is : " + is_drop_multiple(event));
}, true);

document.write('<p class="accent">' + get_extension("trd.pdf")+'</p>');

// -->
</script> 


//
function dodrop(event)
{
  var dt = event.dataTransfer;
  var files = dt.files;

  var count = files.length;
  alert("File Count: " + count + "\n");

	for (var i = 0; i < files.length; i++) {
	  alert(" File " + i + ":\n(" + (typeof files[i]) + ") : <" + files[i] + " > " +
			 files[i].name + " " + files[i].size + "\n");
	}
}