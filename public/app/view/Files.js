/**
 * Demonstrates how use an Ext.Carousel in vertical and horizontal configurations
 */
Ext.define('poc.view.Files', {
    extend: 'Ext.Container',
	xtype:'filecontainer',
    requires: [
        'Ext.Carousel'
    ],

    config: {
    	fullscreen:true,
    	
        items: [{
            xtype: 'carousel',
            defaults : {
				styleHtmlContent : true
			},
            items: [{
                html: '<p>Swipe left to show the next card&hellip;</p>',
                cls: 'card'
            },
            {
                html: '<p>You can also tap on either side of the indicators.</p>',
                cls: 'card'
            },
            {
                html: 'Card #3',
                cls: 'card'
            }]
        }]
    }
});
