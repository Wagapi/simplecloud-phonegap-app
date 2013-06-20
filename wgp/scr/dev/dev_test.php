
	<script src="//ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js"></script>	
	<script src="/wgp/scr/jquery-ui-1.8.16.custom.min.js"></script>
		<script src="wgp.engine2.js" type="text/javascript"></script>
	
	<div id="engine-div">
	
	</div>
	
	<script>	
	
	$('#engine-div').append('Coucou <br>');
	$('#engine-div').engine();
	
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
	$.engine.cache_docs(doc_set3);
	$.engine.cache_docs(doc_set4);
	var k = $.engine.get_all_docs();
	console.log(k);
	
	
	</script>