Ext.define("poc.view.Main", {
	extend : 'Ext.Panel',
	xtype:'mainpanel',
	requires : ['Ext.TitleBar'],
	config : {
		layout : {
			type : 'card',
			animation : {
				type : 'pop',
				direction : 'left',
				duration : 250
			}
		},
		activeItem : 0,
		items : [{
			xtype : 'loginpage'
		}, {
			xtype : 'landingpage'
		}]
	}
});
