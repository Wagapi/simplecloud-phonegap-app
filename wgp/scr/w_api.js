//Returns the extension of a dropped file
function get_extension(s){
	var ext = s.substring(s.lastIndexOf(".", s.length)+1, s.length);
	return ext;
}

//Returns a boolean stating whether multiple files were dropped (yes) or a single file (no). Takes an event as a argument
function is_drop_multiple(e){
	var b= !(e.dataTransfer.files.length==1);
	return b;
}

//Creates an XHR request
function createXHR() 
{
    var request = false;
        try {
            request = new ActiveXObject('Msxml2.XMLHTTP');
        }
        catch (err2) {
            try {
                request = new ActiveXObject('Microsoft.XMLHTTP');
            }
            catch (err3) {
		try {
			request = new XMLHttpRequest();
		}
		catch (err1) 
		{
			request = false;
		}
            }
        }
    return request;
}