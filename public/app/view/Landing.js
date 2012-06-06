Ext.define("poc.view.Landing", {
	extend : "Ext.Container",
	xtype : 'landingpage',
	requires : ['Ext.dataview.NestedList', 'Ext.navigation.Bar'],

	config : {
		fullscreen : true,

		layout : {
			type : 'hbox',
			animation : {
				type : 'pop',
				direction : 'left',
				duration : 250
			}
		},
		items : [{
			xtype : 'carousel',
			id: 'launchscreen',
			// width : '100%',
			// height : '100%',
			scrollable : true,
			flex : 1,
			defaults : {
				styleHtmlContent : true
			},

			items : [{
				html : 'Item 1',
				style : 'background-color: #5E99CC'
			}, {
				html : 'Item 2',
				style : 'background-color: #759E60'
			}, {
				html : 'Item 3'
			}]
		}, {
			id : 'mainNestedList',
			cls : 'mainNestedList',
			xtype : 'nestedlist',
			flex:1,
			useTitleAsBackText : false,
			docked : 'left',
			loadingText: "",
			width : 250,
			ui : 'yellow',
			title:"Shared Documents",
			showAnimation : {
				type : 'fadeIn',
				duration : 1000
			},
			getItemTextTpl : function() {
				return '{Name}';
			},
			getTitleTextTpl : function() {
				return '{Name}<tpl if="leaf !== true">/</tpl>';
			}
		}, {
			id : 'mainNavigationBar',
			xtype : 'titlebar',
			ui : 'yellow',
			docked : 'top',
			title : 'SharePoint POC',
			items : [{
				xtype : 'button',
				iconCls : 'time_repeat',
				title : 'Logout',
				align : 'right',
				action : 'logout',
				ui : 'yellow',
				iconMask : true
			}, {
				xtype : 'button',
				iconCls : 'list',
				align : 'left',
				action : 'list',
				iconMask : true
			}]
		}]
	}
});
