// Détection du type d'explorateur.
var BrowserDetect = {
	init: function () {
		this.browser = this.searchString(this.dataBrowser) || "An unknown browser";
		this.version = this.searchVersion(navigator.userAgent)
			|| this.searchVersion(navigator.appVersion)
			|| "an unknown version";
		this.OS = this.searchString(this.dataOS) || "an unknown OS";
	},
	searchString: function (data) {
		for (var i=0;i<data.length;i++)	{
			var dataString = data[i].string;
			var dataProp = data[i].prop;
			this.versionSearchString = data[i].versionSearch || data[i].identity;
			if (dataString) {
				if (dataString.indexOf(data[i].subString) != -1)
					return data[i].identity;
			}
			else if (dataProp)
				return data[i].identity;
		}
	},
	searchVersion: function (dataString) {
		var index = dataString.indexOf(this.versionSearchString);
		if (index == -1) return;
		return parseFloat(dataString.substring(index+this.versionSearchString.length+1));
	},
	dataBrowser: [
		{
			string: navigator.userAgent,
			subString: "Chrome",
			identity: "Chrome"
		},
		{ 	string: navigator.userAgent,
			subString: "OmniWeb",
			versionSearch: "OmniWeb/",
			identity: "OmniWeb"
		},
		{
			string: navigator.vendor,
			subString: "Apple",
			identity: "Safari",
			versionSearch: "Version"
		},
		{
			prop: window.opera,
			identity: "Opera"
		},
		{
			string: navigator.vendor,
			subString: "iCab",
			identity: "iCab"
		},
		{
			string: navigator.vendor,
			subString: "KDE",
			identity: "Konqueror"
		},
		{
			string: navigator.userAgent,
			subString: "Firefox",
			identity: "Firefox"
		},
		{
			string: navigator.vendor,
			subString: "Camino",
			identity: "Camino"
		},
		{		// for newer Netscapes (6+)
			string: navigator.userAgent,
			subString: "Netscape",
			identity: "Netscape"
		},
		{
			string: navigator.userAgent,
			subString: "MSIE",
			identity: "Explorer",
			versionSearch: "MSIE"
		},
		{
			string: navigator.userAgent,
			subString: "Gecko",
			identity: "Mozilla",
			versionSearch: "rv"
		},
		{ 		// for older Netscapes (4-)
			string: navigator.userAgent,
			subString: "Mozilla",
			identity: "Netscape",
			versionSearch: "Mozilla"
		}
	],
	dataOS : [
		{
			string: navigator.platform,
			subString: "Win",
			identity: "Windows"
		},
		{
			string: navigator.platform,
			subString: "Mac",
			identity: "Mac"
		},
		{
			   string: navigator.userAgent,
			   subString: "iPhone",
			   identity: "iPhone/iPod"
	    },
		{
			string: navigator.platform,
			subString: "Linux",
			identity: "Linux"
		}
	]

};
BrowserDetect.init();

function browser_notif(){
document.write('<p class="accent">You\'re using ' + BrowserDetect.browser + ' ' + BrowserDetect.version + ' on ' + BrowserDetect.OS + '!</p>');
if ( BrowserDetect.browser != "Firefox" && BrowserDetect.browser != "Chrome"){
	document.write('Sorry, your brower does not work with this web site. Bye Bye');
	} 
else {
		document.write('Good job, your browser suits well !');
	}
}

function dodrop(event){
  var allTheFiles = event.dataTransfer.files;
  var ext = get_extension(allTheFiles[0].name);
  //alert("You've just dropped " + allTheFiles.length + " files and one whose extension is : " + ext + " and the boolean is : " + is_drop_multiple(event));
  upload(event);
}

function upload(event) {
    
    var data = event.dataTransfer;

    var boundary = '------multipartformboundary' + (new Date).getTime();
    var dashdash = '--';
    var crlf     = '\r\n';

    /* Build RFC2388 string. */
    var builder = '';

    builder += dashdash;
    builder += boundary;
    builder += crlf;
    
    var xhr = new XMLHttpRequest();
    
    /* For each dropped file. */
    for (var i = 0; i < data.files.length; i++) {
        var file = data.files[i];

        /* Generate headers. */            
        builder += 'Content-Disposition: form-data; name="user_file[]"';
        if (file.fileName) {
          builder += '; filename="' + file.fileName + '"';
        }
        builder += crlf;

        builder += 'Content-Type: application/octet-stream';
        builder += crlf;
        builder += crlf; 

        /* Append binary data. */
        builder += file.getAsBinary();
        builder += crlf;

        /* Write boundary. */
        builder += dashdash;
        builder += boundary;
        builder += crlf;
    }
    
    /* Mark end of the request. */
    builder += dashdash;
    builder += boundary;
    builder += dashdash;
    builder += crlf;

    xhr.open("POST", "upload.php", true);
    xhr.setRequestHeader('content-type', 'multipart/form-data; boundary=' 
        + boundary);
    xhr.sendAsBinary(builder);        
    
    xhr.onload = function(event) { 
        /* If we got an error display it. */
        if (xhr.responseText) {
            alert(xhr.responseText);
        }
		//tag_search2();
    };
    
    /* Prevent FireFox opening the dragged file. */
    event.stopPropagation();
    
}

jQuery.JSON = {
	encode: function(o) {
		if (typeof (JSON) == 'object' && JSON.stringify)
			return JSON.stringify(o);

		var type = typeof (o);

		if (o === null)
			return "null";

		if (type == "undefined")
			return undefined;

		if (type == "number" || type == "boolean")
			return o + "";

		if (type == "string")
			return this.quoteString(o);

		if (type == 'object') {
			if (typeof o.toJSON == "function")
				return this.encode(o.toJSON());

			if (o.constructor === Date) {
				var month = o.getUTCMonth() + 1;
				if (month < 10)
					month = '0' + month;

				var day = o.getUTCDate();
				if (day < 10)
					day = '0' + day;

				var year = o.getUTCFullYear();

				var hours = o.getUTCHours();
				if (hours < 10)
					hours = '0' + hours;

				var minutes = o.getUTCMinutes();
				if (minutes < 10)
					minutes = '0' + minutes;

				var seconds = o.getUTCSeconds();
				if (seconds < 10)
					seconds = '0' + seconds;

				var milli = o.getUTCMilliseconds();
				if (milli < 100)
					milli = '0' + milli;
				if (milli < 10)
					milli = '0' + milli;

				return '"' + year + '-' + month + '-' + day + 'T' + hours + ':'
			+ minutes + ':' + seconds + '.' + milli + 'Z"';
			}

			if (o.constructor === Array) {
				var ret = [];
				for (var i = 0; i < o.length; i++)
					ret.push(this.encode(o[i]) || "null");

				return "[" + ret.join(",") + "]";
			}

			var pairs = [];
			for (var k in o) {
				var name;
				var type = typeof k;

				if (type == "number")
					name = '"' + k + '"';
				else if (type == "string")
					name = this.quoteString(k);
				else
					continue; // skip non-string or number keys

				if (typeof o[k] == "function")
					continue; // skip pairs where the value is a function.

				var val = this.encode(o[k]);

				pairs.push(name + ":" + val);
			}

			return "{" + pairs.join(", ") + "}";
		}
	}
}

        function formatFileSize (size) {
            if (size >= 1000000000) {
                return (size / 1000000000).toFixed(2) + ' GB';
            }
            if (size >= 1000000) {
                return (size / 1000000).toFixed(2) + ' MB';
            }
            return (size / 1000).toFixed(2) + ' KB';
        }