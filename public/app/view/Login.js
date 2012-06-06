Ext.define('poc.view.Login',{
	extend:'Ext.form.Panel',
	xtype:'loginpage',
	requires:['Ext.field.Password','Ext.form.FieldSet'],
	config : {
		fullscreen : true,
		url:"/app/Settings/do_login",
		cls:'login-page',
		id:'login-page',
		layout : {
			type : 'vbox',
			pack : 'center',
			animation : {
				type : 'pop',
				direction : 'left',
				duration : 250
			}
		},

		items : [{
			xtype : 'panel',
			id : 'wrapper',
			layout:{
				type:"hbox",
				pack:'center'
			},
			items : [{
				xtype : 'fieldset',
				id : 'fieldset',
				title : 'SharePoint Mobile Access',
				instructions : 'Please enter your credentials',
				defaults : {
					required : true,
					labelAlign : 'left',
					labelWidth : '40%',
					iconMask:true,
					clearIcon:false
				},
				items : [{
					xtype : 'textfield',
					name : 'username',
					label : 'Username',
					value:'doctester',
					placeHolder : 'username',
				}, {
					xtype : 'passwordfield',
					name : 'password',
					label : 'Password',
					value:'Pwcwelcome1',
				}, {
					xtype : 'button',
					id:'login',
					text : 'Login',
					margin : '10 30 10 30',
					ui : 'action',
					iconCls:'refresh'
				}]
			}]
		}]
	}
});
