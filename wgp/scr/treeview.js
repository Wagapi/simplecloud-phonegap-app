
function initialize_treeview(){
	var tv = $('.treeview').first();	//récupère l'id du premier élément qui est de la classe treeview, le seul qui sera traité comme un treeview
	channel_request('treeview', tags, '',function(data){
	$('<ul>').appendTo(tv);
		$( "#template-treeview" ).tmpl( data['treeview'] ).appendTo( "#tag-list" );  
	$('</ul>').appendTo(tv);
		});
}

