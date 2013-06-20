//Copyright Wagapi 2010-2011 All Rights Reserved


//Treeview widget
(function($){

	$.widget('wgp.engine', {
	
		options: {
			uploader: null
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
		},

		create: function(){
		    this.list = $( "<ul>" ).insertAfter( this.element );
			this._initBuffer('docsToSend');
			this._addToBuffer('docsToSend', [1,2,3]);
			var result = this._getBuffer('docsToSend');
			$(this.element).append(result.join(', '));
		}
		
		
	});
}(jQuery));