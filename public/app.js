Ext.application({
	name : 'poc',

	requires : ['Ext.Anim'],

	views : ['Main', 'Login', 'Landing','Files'],

	controllers : ['Main'],

	models : ['Document'],

	stores : ['DocumentStore'],

	icon : {
		'57' : 'resources/icons/Icon.png',
		'72' : 'resources/icons/Icon~ipad.png',
		'114' : 'resources/icons/Icon@2x.png',
		'144' : 'resources/icons/Icon~ipad@2x.png'
	},

	isIconPrecomposed : true,

	startupImage : {
		'320x460' : 'resources/startup/320x460.jpg',
		'640x920' : 'resources/startup/640x920.png',
		'768x1004' : 'resources/startup/768x1004.png',
		'748x1024' : 'resources/startup/748x1024.png',
		'1536x2008' : 'resources/startup/1536x2008.png',
		'1496x2048' : 'resources/startup/1496x2048.png'
	},

	launch : function() {
		// Destroy the #appLoadingIndicator element
		Ext.fly('appLoadingIndicator').destroy();

		// Initialize the main view
		// Ext.Viewport.add(Ext.create('poc.view.Main'));
		var main = Ext.create('poc.view.Main');
		Ext.Viewport.add(main);
		// var store = Ext.create('Ext.data.Store', {
		// model : "poc.model.Document"
		// });
		// store.load();
		// store.removeAll();
		// store.sync();
		// store.add({
		// ows_DocIcon : 'Sencha Touch',
		// ows_UniqueId:"1"
		// });
		// store.add({
		// ows_DocIcon : 'Ext JS',
		// ows_UniqueId:"1"
		// });

		//finally, save our Search data to localStorage
		// store.sync();
	}
});

var pathArray = new Array();

var reloadFileList = function(filePath, page) {
	if (page) {
			page.setMasked( {
				xtype: 'loadmask',
				message: 'Loading...'
			});
			page.mask();
		}
	
	var tpl = new Ext.XTemplate([
			"<div id='file-list'>",
				"<ul class='file-list-ul'>",
					'<tpl for=".">',
						"<li>",
						"	<div class='file-wrap'>",
						"		<div class='file-stack'>",
						"			<div class='flag-general'></div>",
						"			<div class='unknown-file {[values.Name.indexOf('.') > -1? values.Name.split('.')[values.Name.split('.').length -1].toLowerCase():'nil' ]}'>",
						"			</div>",
						"		</div>",
						"		<div class='file-name-wrap'>",
						"			<div class='file-name'>{Name}</div>",
						"		</div>",
						"	</div>",
						"</li>",
					'</tpl>',
				"</ul>",
			"</div>"
	]);
	Ext.Ajax.request({
		url : '/app/Document/files',
		params : {
			node : filePath
		},
		success : function(response) {
			var text = response.responseText;
			result = Ext.decode(text);
			var launchscreen = Ext.getCmp('launchscreen');
			var results = result.d.results;

			if(results) {
				launchscreen.updateHtml(tpl.applyTemplate(results));
				if (page)
						page.unmask();
			} else {
				alert('There was an error retrieving the weather.');
			}

		}
	});

};

var resortList = function() {
	var navBar = Ext.getCmp("mainNestedList");
	var innerStore = navBar.getStore();
	innerStore.sort({
		property : 'Name',
		direction : 'ASC'
	});

}; 