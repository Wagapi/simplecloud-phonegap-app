//Copyright Wagapi 2010-2011 All Rights Reserved


//Treeview widget
(function($){

	$.widget('wgp.engine', {
	
		options: {
			uploader: null,
			needs_refresh_flag: false
		},

		
		_doc: function(data){
			this.id = data['id'];
			this.data = data;
		},
		
		_initBuffer: function(ref){
			var data = new Array();
			$(this.element).data(ref, data);
		},
		
		_addToBuffer:function(ref, new_data){
		var existing_data = this._getBuffer(ref);
		$.merge(existing_data, new_data);
		$(this.element).data(ref, existing_data);
		},
		
		_getBuffer: function(ref){
			return $(this.element).data(ref);
		},
		
		_create: function(){
		    this.list = $( "<ul>" ).insertAfter( this.element );
			this._initBuffer('docsToSend');
			this._addToBuffer('docsToSend', [1,2,3]);
			var result = this._getBuffer('docsToSend');
			$(this.element).append(result.join(', '));
			var doc_set = new Array();
			doc_set[0] = [0,'picture','jpg','987987097','46546545'];
			doc_set[1] = [1,'text','xls','234214','4325432'];
			this._initBuffer('bag');
			this._addToBuffer('bag', doc_set);
			var doc_set2 = new Array();
			doc_set2[0] = [2,'music','mp3','234214','4325432'];
			doc_set2[1] = [3,'picture','jpg','987987097','46546545'];
			this._addToBuffer('bag', doc_set2);
			var result2 = this._getBuffer('bag');
			//console.log(result2);
			//console.log(doc_set);
			$(this.element).append(result2.join('<br>'));
			
			doc_set3 = {
				0:{
					id: 1,
					ext:'txt',
					size:889798789
				},
				1:{
					id: 3,
					ext:'mp3',
					size:98789
				}				
			};
			
			//console.log(doc_set3);
			//var docs = new doc_set(doc_set3);
			
		}
/*
		create: function(){
		    this.list = $( "<ul>" ).insertAfter( this.element );
			this._initBuffer('docsToSend');
			this._addToBuffer('docsToSend', [1,2,3]);
			var result = this._getBuffer('docsToSend');
			$(this.element).append(result.join(', '));

		}
*/		
		
	});
}(jQuery));

function doc_set(data){
	this.data = data;
	this.ids = new Array();
	this.lastIndex = 0;
	for(var i in this.data){
		id = this.data[i]['id'];
		this.ids[id] = parseInt(i);
		//console.log(i);
		this.lastIndex = this.lastIndex + 1;
	}
	
	//Registration of prototype function after checking they are not registered yet
    if( typeof doc_set.initialized == "undefined" ) { 
		
        doc_set.prototype.isset = function(id){
			if(typeof this.ids[id]=='undefined'){return false;}
			return true;
		};
		
		//Add document object to a doc_set object
		doc_set.prototype.add = function(doc){
			if(this.ids[doc.id]){
				this.data[this.ids[doc.id]] = doc.data;
			}else{
				this.data[this.lastIndex+1] = doc.data;
				this.lastIndex = this.lastIndex+1;
				this.ids[doc.id] = this.lastIndex+1;
			}
		};
        doc_set.initialized = true; 	
	}
}


//vault is an object storing a big set of doc objects
//input data is an object listing several doc objects
function vault(data){

	this.ids = new Array();
	this.lastIndex = 0;

	if(data==null){
		this.data = new Array();
	}else{
		this.data = data;
		for(var i in this.data){
			id = this.data[i]['id'];
			this.ids[id] = parseInt(i);
			//console.log(i);
			this.lastIndex = this.lastIndex + 1;
		}
	}
	
	//Registration of prototype function after checking they are not registered yet
    if( typeof vault.initialized == "undefined" ) { 
		
        vault.prototype.isset = function(id){
			if(typeof this.ids[id]=='undefined'){return false;}
			return true;
		};
		
		//Add document object to a doc_set object
		vault.prototype.add = function(doc){
			if(this.ids[doc.id]){
				this.data[this.ids[doc.id]] = doc.data;
			}else{
				this.data[this.lastIndex+1] = doc.data;
				this.lastIndex = this.lastIndex+1;
				this.ids[doc.id] = this.lastIndex+1;
			}
		};
        vault.initialized = true; 	
	}
}

/*
doc_set.prototype = {
	isset: function(id){
		if(typeof this.ids[id]=='undefined'){return false;}
		return true;
	},
	
	add: function(doc){
		if(this.ids[doc.id]){
			this.data[this.ids[doc.id]] = doc.data;
		}else{
			this.data[this.lastIndex+1] = doc.data;
			this.lastIndex = this.lastIndex+1;
			this.ids[doc.id] = this.lastIndex+1;
		}
	}
}
*/
function doc(data){
	this.id = data['id'];
	this.data = data;
}

			doc_set3 = {
				0:{
					id: 1,
					ext:'txt',
					size:889798789
				},
				1:{
					id: 3,
					ext:'mp3',
					size:98789
				}				
			};
			doc_set4 = {
				0:{
					id: 1,
					ext:'txt',
					size:889798789
				},
				1:{
					id: 5,
					ext:'mp4',
					size:98789
				}				
			};
			
			var doc_set5 = new Array();
			doc_set5.push(doc_set3[0]);
			doc_set5.push(doc_set3[1]);
			//console.log(doc_set3);
			var docs = new doc_set(doc_set3);
			var test_doc = new Array();
			test_doc.push(doc_set4[1]);
			var doc = new doc(doc_set4[1]);
			docs.add(doc);
			var vault = new vault();
			vault.add(doc);
			console.log(vault.ids);
			//console.log(test_doc);
			console.log(docs.ids);
			console.log(docs.data[1].ext);
			//console.log(doc_set3.length);
			
function docs_cache(){
	this.data = {};
	this.ids = new Array();
	this.lastIndex = 0;
	for(var i in this.data){
		id = this.data[i]['id'];
		this.ids[id] = parseInt(i);
		//console.log(i);
		this.lastIndex = this.lastIndex + 1;
	}
	
	//Registration of prototype function after checking they are not registered yet
    if( typeof docs_cache.initialized == "undefined" ) { 
		
        docs_cache.prototype.isset = function(id){
			if(typeof this.ids[id]=='undefined'){return false;}
			return true;
		};
		
		//Add document object to a doc_set object
		docs_cache.prototype.add_doc = function(doc){
			if(this.ids[doc.id]){
				this.data[this.ids[doc.id]] = doc.data;
			}else{
				this.data[this.lastIndex+1] = doc.data;
				this.lastIndex = this.lastIndex+1;
				this.ids[doc.id] = this.lastIndex+1;
			}
		};
		
		docs_cache.prototype.rem_doc = function(doc){
			this.data[this.ids[doc.id]] = doc.data;
		};
		
		
        docs_cache.initialized = true; 	
	}
}