Ext.define('poc.controller.Main', {
	extend : 'Ext.app.Controller',
	config : {
		refs : {
			loginPage : 'loginpage',
			loginBtn : 'loginpage button',
			landingPage : 'landingpage',
			nav : 'landingpage nestedlist',
			mainPage : 'mainpanel',
			logoutBtn : "landingpage button[action=logout]",
			loginFields : 'loginpage fieldset',
			// launchscreen : 'landingpage ',
			listBtn : 'landingpage button[action=list]'
		},
		control : {
			loginBtn : {
				tap : 'onLoginBtnTap'
			},
			logoutBtn : {
				tap : 'onLogoutBtnTap'
			},
			nav : {
				itemtap : 'onListItemTap',

				back : 'onBackTap',
				// show : 'onShow',
				// hide : 'onHide'
			},
			listBtn : {
				tap : 'onListBtnTap'
			}

		}
	},
	// onHide : function() {
		// Ext.Anim.run(this.getNav(), 'slide', {
			// direction : 'left',
						// autoClear : true,
			// duration : 200
		// });
	// },
	// onShow : function() {
		// Ext.Anim.run(this.getNav(), 'slide', {
			// direction : 'right',
						// autoClear : true,
			// duration : 200
		// });
	// },
	onLoginBtnTap : function(btn, e, eOpts) {
		this.getLoginPage().setMasked({
			xtype : 'loadmask',
			message : 'Loading...'
		});
		fields = this.getLoginFields();
		Ext.Anim.run(fields, 'fade', {
			out : true,
			autoClear : false,
			duration : 200
		});
		// this.getLoginFields().hide();

		var nav = this.getNav();
		var mainPage = this.getMainPage();
		var launchscreen = Ext.getCmp('launchscreen');
		this.getLoginPage().submit({
			success : function(form, result) {
				var cookie = result.cookie;
				sessionStorage.setItem("cookie", cookie);
				//set the view to the landing page.
				mainPage.setActiveItem(1);
				var baseStore = Ext.create('Ext.data.TreeStore', {
					model : 'poc.model.Document',
					autoLoad : true,
					proxy : {
						type : 'ajax',
						url : '/app/Document/json',
						reader : {
							rootProperty : "d.results",
							idProperty : "id"
						}
					}
				});
				nav.setStore(baseStore);
				reloadFileList("", mainPage);
			}
		});
	},
	onLogoutBtnTap : function(btn, e, eOpts) {
		var mainPage = this.getMainPage();
		mainPage.setActiveItem(0);
		fields = this.getLoginFields();
		Ext.Anim.run(fields, 'fade', {
			out : false,
			autoClear : false,
			duration : 1000
		});
		sessionStorage.removeItem("cookie");
	},
	onBackTap : function(list, item, lastList, cardActive, e) {
		//abandon last item
		pathArray.pop();

		var lastURL = pathArray[pathArray.length - 1];

		reloadFileList(lastURL, this.getMainPage());
	},
	onListItemTap : function(me, list, index, item, e) {
		var store = list.getStore();
        var lan = this.getMainPage();
		record = store.getAt(index);

		if(record.get("ContentType") === "Document") {

		} else {
			var newFilePath = record.get("id");

			if(pathArray.length == 0)
				pathArray.push(null);

			pathArray.push(newFilePath);

			reloadFileList(newFilePath, lan);

		}
		return;
	},
	onListBtnTap : function() {
		var nav = this.getNav();
		var width = nav.getWidth();
		if (width == 0) {
			nav.setWidth(250);
		} else {
			nav.setWidth(0);
		}
		
		// console.info(nav.getCls());
		// Ext.Anim.run(nav,'slide',{
		// out:true,
		// autoClear:false,
		// duration:2000,
		// from:"left:0px",
		// to:'left:-250px'
		// })
	}
});

