		function auth(){
			var data = 'user=' + document.getElementById('user').value +  '&password=' + document.getElementById('password').value;	
			$.ajax({
				type: "POST",
				url: "https://www.wagapi.com/wgp/login.php",
				data: data,
				dataType: "JSON",				
				success: function(data){
					//console.log(data);
					if(data['auth']['code']==0){
						//Let's initialize the interface
						$.mobile.changePage( $('#home-box'));
					}else{
						$('.message-auth').html(data['auth']['message']);
					}
					$('#user').attr('value','');
					$('#password').attr('value','');				
			   }
			});	
		}
		
		function unauth(){
			var data = '';	
			$.ajax({
				type: "POST",
				url: "https://www.wagapi.com/wgp/unlog.php",
				data: data,
				success: function(){
					//window.location.reload(true);
					//$.mobile.changePage( $('#login-box'));
					navigator.app.exitApp();
			   }
			});			
		}

		function lookup() {
		var tags = $("#q_tag").attr('value');
				channel_request('lookup', tags, '',function(data){
				render_lookup(data['lookup']);
				//render_tagbox(data['tagbox']);
				//render_alltagbox(data['alltagbox']);	
				console.log(data);
				});
		}
		
		function get_selection_from_listed_docs(){
			var checkbox_ids = new Array();
			$('input:checked.list-checkbox').each(function(){
				var e = $(this).parents("tr[id|='list']").first().attr('id');
				e = e.substring(5);
				checkbox_ids.push(e);
			});
			// prepares and returns string with doc ids
			if (!(checkbox_ids.length <1)){
				checkbox_ids_string = checkbox_ids.join(";");
				return checkbox_ids_string;
			} else {return "";}
		}
		
		function get_selection(){
			var checkbox_ids = new Array();
			$('input:checked.list-checkbox').each(function(){
				var e = $(this).parents("tr[id|='list']").first().attr('id');
				e = e.substring(5);
				checkbox_ids.push(e);
			});
				return checkbox_ids;
		}
	
		function channel_request(request, input, options,callback){
			var channel = {}; //on va stocker dans le tableau les différentes données d'entrée à transmettre au serveur
			channel['request'] = request;
			if(input){channel['input'] = input;}	//request input data
			if(options){channel['options'] = options;}	//request input data
			channel['selected_docs'] = get_selection();
			//channel['selected_docs'] = get_selection_from_listed_docs();
			var channel_string = JSON.stringify(channel);
			//console.log(channel_string);
			//We channel the request with all input data to the server and use the callback function to deal with the answer
			$.mobile.showPageLoadingMsg();
			$.ajax({
					type: "POST",
					url: "https://www.wagapi.com/wgp/w_axm.php",
					data: "channel=" + channel_string,
					dataType: "JSON",
					success: function(data){
						//if(data!=null && data['redirect']=='auth'){
						//	$.mobile.changePage( $('#login-box'));
						//}else{
							callback(data);
						//}
						$.mobile.hidePageLoadingMsg();
						//wgp.set_buffer(data);
						//console.log(data['console']);
				   }
				 });					
		}

		function render_lookup(data) {
			//var type = get_type_to_display();
			//console.log(type);
			//$( "#doc-list" ).empty();
			//$('<tr><th style="display:none">Id</th><th>Type</th><th>Name</th><th>Extension</th><th>Created</th><th>Size</th><th style="width:15;"></th><th style="width:15;"></th><th style="width:15;"></th><th><input type="checkbox" id="list-check-all"></th></tr>').appendTo( "#lookup_tbl" );
			$( "#template-lookup" ).tmpl( data ).appendTo( "#doc-list" );
			//console.log(wgp.get_buffer());
			//$("#video-box").empty();
			//$( "#template-lookup-video" ).tmpl( data ).appendTo( "#video-box" );
			//$("#audio-box").empty();
			//$( "#template-lookup-audio" ).tmpl( data ).appendTo( "#audio-box" );
			//render_picturebox(data);
			//set_type_to_display(type);
			$('#q_tag').val('');
		}
		
		function render_tagbox(data){
			$("#tag-list").empty();
			$( "#template-tagbox" ).tmpl( data ).appendTo( "#tag-list" );   
		}
		
		function render_alltagbox(data){
			$("#all-tag-list").empty();
			$( "#template-alltagbox" ).tmpl( data ).appendTo( "#all-tag-list" );
		}
		
		function render_inbox(data){
			//$("#inbox-box").accordion('destroy');
			$("#in-box").empty();
			$( "#template-inbox" ).tmpl( data ).appendTo( "#in-box" );
			/*
			$(function(){
				$("#inbox-box").accordion({ header: "h3" });
			});*/
		}
		
		function render_mosaic(data){
			$("#mosaic").empty();
			$( "#template-mosaic" ).tmpl( data ).appendTo( "#mosaic" );
		}
		
		function render_picturebox(data){
			$("#picture-box").empty();
			$( "#template-mosaic" ).tmpl( data ).appendTo( "#picture-box" );
			//$.yoxview.update();
		}	

		
		function get_type_to_display(){
			return $('#doc-type-form').find('input:checked').first().attr('id');
		}
		function set_type_to_display(type){
			$('#'+ type).trigger('click');
		}
		
		function render_rep(data){
			files_flag_on();
			//$("#doc-list").empty();
			$( "#template-rep" ).tmpl( data ).appendTo( "#doc-list" );
		}	
		
		function render_parents(data){
			//$("#doc-list").empty();
			$( "#template-parents" ).tmpl( data ).appendTo( "#doc-list" );
		}	
		
		function render_browse_results(data){
			$("#file-list").empty();
			$( "#template-lookup" ).tmpl( data['results'] ).appendTo( "#file-list" );
		}	
		
		function encode_utf8( s )
		{
		  return unescape( encodeURIComponent( s ) );
		}

		function decode_utf8( s )
		{
		  return decodeURIComponent( escape( s ) );
		}
		
		function render_set_tags(data){
			$("#tag-list").empty();
			$( "#template-set-tags" ).tmpl( data ).appendTo( "#tag-list" );
		}

		function render_list_tags(data){
			$("#message-tags-list").empty();
			$( "#template-list-tags" ).tmpl( data ).appendTo( "#message-tags-list" );
		}		

		
//Pictures synchonization with wagapi		
	
	
		function sync_pictures(){
			 window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, access_photo_library, fail);
		}
		
		function access_photo_library(fileSystem){
			console.log(fileSystem.name);
			console.log(fileSystem.root.name);
			fileSystem.root.getDirectory("DCIM", {create: false, exclusive: false}, access_pictures, fail);
		}
		
		function access_pictures(dirEntry){
		
			// Get a directory reader
			var directoryReader = dirEntry.createReader();

			// Get a list of all the entries in the directory
			directoryReader.readEntries(
				function(entries){
					$.mobile.showPageLoadingMsg();
					var i;
					//var picture_list = new Array();
					for (i=0; i<entries.length; i++) {
						if(entries[i].isDirectory){					//we check if the entry is a directory
							if(entries[i].name.indexOf('.')!=0){	//we want only true pictures, not thumbnails
								var dirReader = entries[i].createReader();
								dirReader.readEntries(
									function(entries2){
										magic(entries2,0);
									},
									function(error){}
								);
							}
						}
						//console.log(entries[i].name);
					}
					$.mobile.hidePageLoadingMsg();
				},
				function(error){
					alert("Failed to list directory contents: " + error.code);
				});			
		}
		
		
		function uploadPhoto(imageURI) {
			var options = new FileUploadOptions();
			options.fileKey="files[]";
			options.fileName=imageURI.substr(imageURI.lastIndexOf('/')+1);
			//options.chunkedMode = false; 
			//options.mimeType="image/jpeg";

			var params = new Object();
			params.value1 = "test";
			params.value2 = "param";

			options.params = params;

			var ft = new FileTransfer();
			ft.upload(imageURI, "https://www.wagapi.com/wgp/upload2.php", win, fail, options);
		}			
		
        function win(r) {
            console.log("Code = " + r.responseCode);
            console.log("Response = " + r.response);
            console.log("Sent = " + r.bytesSent);
        }

        function fail(error) {
            alert("An error has occurred: Code = " = error.code);
            console.log("upload error source " + error.source);
            console.log("upload error target " + error.target);
        }

		function f_success(f){
			//console.log(f.name);
			console.log(f.size);
			var input = {};
			input['fullname'] = f.name;
			input['size'] = f.size;
			input['mimetype'] = f.type;
			//input['last_modif'] = f.lastModifiedDate;
			input['device'] = 'phone';
			channel_request('check-doc-existence', input, '',function(data){
				console.log(data['check-doc-existence']);
				if(data['check-doc-existence']==0){
					upload(f);
				}
			});
		}		
		function f_error(error){
			console.log(error.code);
		}
		function files_to_send(file){
		}
		
		function upload(file) {
			var options = new FileUploadOptions();
			options.fileKey="files[]";
			options.fileName=file.name;
			//options.chunkedMode = false; 
			//options.mimeType="image/jpeg";

			//var params = new Object();
			//params.value1 = "test";
			//params.value2 = "param";

			//options.params = params;

			var ft = new FileTransfer();
			ft.upload(file.fullPath, "https://www.wagapi.com/wgp/upload2.php", win, fail, options);
		}					

	
	function magic(entry,index){
		var e = entry;
		var i = index;
		if(i<e.length){
			e[i].getParent(
				function(dentry){
					magic_2(dentry, e,i);
				},function(error){}
			);			
		}
	}
	function magic_2(dentry,entry,index){
		var e = entry;
		var i = index;
		var full_path = e[i].fullPath;
		dentry.getFile(full_path,{create: false, exclusive: false},
				function(file_entry){
					magic_3(file_entry,e,i)},
					function(error){}
			);		
	}
	function magic_3(file_entry,entry,index){
		var e = entry;
		var i = index;	
		file_entry.file(function(f){
			magic_4(f,e,i);
			},function(error){});
	}

	function magic_4(f,entry,index){
		var e = entry;
		var i = index;
		//console.log(f.name);
		console.log(f.size);
		var input = {};
		input['fullname'] = f.name;
		input['size'] = f.size;
		input['mimetype'] = f.type;
		//input['last_modif'] = f.lastModifiedDate;
		input['device'] = 'phone';
		channel_request('check-doc-existence', input, '',function(data){
			console.log(data['check-doc-existence']);
			if(data['check-doc-existence']==0){
				magic_5(f,e,i);
			}else{
				magic(e,i+1);
			}
		});
	}	
	function magic_5(file,entry,index) {
		var e = entry;
		var i = index;	
		var options = new FileUploadOptions();
		options.fileKey="files[]";
		options.fileName=file.name;
		options.chunkedMode = true; 
		//options.mimeType="image/jpeg";

		//var params = new Object();
		//params.value1 = "test";
		//params.value2 = "param";

		//options.params = params;

		var ft = new FileTransfer();
		ft.upload(file.fullPath, "https://www.wagapi.com/wgp/upload2.php", 
			function(data){
				magic(e,i+1);
			}
			, fail, options);
	}

	
		function sync_test(){
			 window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, sync_test2, fail);
		}
		
		function sync_test2(fileSystem){
			console.log(fileSystem.name);
			console.log(fileSystem.root.name);
			fileSystem.root.getDirectory("DCIM", {create: false, exclusive: false}, sync_test3, fail);
		}
		
		function sync_test3(dirEntry){
		
			// Get a directory reader
			var directoryReader = dirEntry.createReader();

			// Get a list of all the entries in the directory
			directoryReader.readEntries(
				function(entries){
					$.mobile.showPageLoadingMsg();
					var i;
					//var picture_list = new Array();
					for (i=0; i<entries.length; i++) {
						if(entries[i].isDirectory){					//we check if the entry is a directory
							if(entries[i].name.indexOf('.')!=0){	//we want only true pictures, not thumbnails
								var dirReader = entries[i].createReader();
								dirReader.readEntries(
									function(entries2){
										console.log(list_documents(entries2));
									},
									function(error){}
								);
							}
						}
						//console.log(entries[i].name);
					}
					$.mobile.hidePageLoadingMsg();
				},
				function(error){
					alert("Failed to list directory contents: " + error.code);
				});			
		}	
	
	function list_documents(entry){
		var e = entry;
		var l = new Array(); //liste destinée à contenir les propriétés des documents
		var i =0;
		if(i<e.length){
			ld_1(e,i,l);
			return l;
		}else{return l;}		
	}

	
	function ld_1(entry,index,list){
		var e = entry;
		var i = index;
		var l = list;
		if(i<e.length){
			e[i].getParent(
				function(dentry){
					ld_2(dentry, e,i,l);
				},function(error){}
			);			
		}else{
			console.log(l);
		}
	}	
	function ld_2(dentry,entry,index,list){
		var e = entry;
		var i = index;
		var l = list;
		var full_path = e[i].fullPath;
		dentry.getFile(full_path,{create: false, exclusive: false},
				function(file_entry){
					ld_3(file_entry,e,i,l)},
					function(error){}
			);		
	}
	function ld_3(file_entry,entry,index,list){
		var e = entry;
		var i = index;	
		var l = list;
		file_entry.file(function(f){
			ld_4(f,e,i,l);
			},function(error){});
	}

	function ld_4(f,entry,index,list){
		var e = entry;
		var i = index;
		var l = list;
		//console.log(f.name);
		//console.log(f.size);
		var properties = {};
		properties['fullname'] = f.name;
		properties['size'] = f.size;
		properties['mimetype'] = f.type;
		properties['last_modif'] = f.lastModifiedDate;
		l[i] = properties;
		ld_1(e,i+1,l);
	}	
/*
	var doc_tree = function(entries){
		this.entries = entries;
		this.current_entry = 0;
		this.size = entries.size;
		this.list
	}
	*/
	