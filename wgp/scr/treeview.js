
function initialize_treeview(){
	var tv = $('.treeview').first();	//r�cup�re l'id du premier �l�ment qui est de la classe treeview, le seul qui sera trait� comme un treeview
	channel_request('treeview', tags, '',function(data){
	$('<ul>').appendTo(tv);
		$( "#template-treeview" ).tmpl( data['treeview'] ).appendTo( "#tag-list" );  
	$('</ul>').appendTo(tv);
		});
}

