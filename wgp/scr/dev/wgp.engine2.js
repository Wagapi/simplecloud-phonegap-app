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
		
		_storeBuffer: function(ref,data){
			$(this.element).data(ref, data);
		},
				
		_getBuffer: function(ref){
			return $(this.element).data(ref);
		},
		
		cache_doc: function(doc){
			var docs_cache = _getBuffer('docs_cache');
			timestamp = new Date().getTime();
			docs_cache.add_doc(doc, timestamp);
			this._storeBuffer('docs_cache', docs_cache);			
		},
		cache_docs: function(docs_ids){
			var docs_cache = _getBuffer('docs_cache');
			timestamp = new Date().getTime();
			docs_cache.add_doc(doc_ids, timestamp);
			this._storeBuffer('docs_cache', docs_cache);
		},

		get_docs: function(docs_ids){
			var docs_cache = _getBuffer('docs_cache');
			timestamp = new Date().getTime();
			docs_cache.add_doc(doc, timestamp);
		},
		
		
		
		_create: function(){
			var docs_cache = new docs_cache();
			this._storeBuffer('docs_cache', docs_cache);
		}

		
	});
	
	function docs_cache(){
		this.data = {};
		this.ids = new Array();
		this.lastIndex = 0;
		
		//Registration of prototype function after checking they are not registered yet
		if( typeof docs_cache.initialized == "undefined" ) { 
			
			docs_cache.prototype.isset = function(id){
				if(typeof this.ids[id]=='undefined'){return false;}
				return true;
			};
			
			//Add document object to a doc_set object
			docs_cache.prototype.add_doc = function(doc,timestamp){
				if(this.ids[doc.id]){
					this.data[this.ids[doc.id]] = doc.data;
					this.data[this.ids[doc.id]][mtime] = timestamp;
				}else{
					this.data[this.lastIndex+1] = doc.data;
					this.data[this.lastIndex+1][mtime] = timestamp;
					this.lastIndex = this.lastIndex+1;
					this.ids[doc.id] = this.lastIndex+1;
				}
			};
			
			docs_cache.prototype.rem_doc = function(doc){
				delete this.data[this.ids[doc.id]];
				this.ids.splice(doc.id);
			};
			
			docs_cache.prototype.get_doc = function(id){
				return this.data[this.ids[id]];
			};
			
			docs_cache.prototype.get_docs = function(ids){
				var docs = new Array();
				for(var i in ids){
					docs.push(this.get_doc[i]);
				}
				return docs;
			};		
			
			docs_cache.prototype.add_docs = function(docs){
				var docs = new Array();
				timestamp = new Date().getTime();
				for(var i in ids){
					this.add_doc(docs[i], timestamp);
				}
			};					
			
			docs_cache.prototype.get_all_docs = function(){
				var docs = new Array();
				for(var doc in this.data){
					docs.push(doc);
				}
				return docs;
			};					
			
			docs_cache.initialized = true; 	
		}
	}	
	
	function doc(data){
		this.id = data['id'];
		this.extension = data['extension'];
		this.type = data['type'];
		this.name = data.name;
		this.size = data.size;
	}	
	
	
}(jQuery));




			