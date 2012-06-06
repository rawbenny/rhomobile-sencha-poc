/*Ext.define('poc.model.Document', {
    extend: 'Ext.data.Model',
    config: {
        fields: [
            { name: 'ContentTypeID', type: 'string' },
            { name: 'Name', type: 'string' },
            { name: 'Title', type: 'string' },
            { name: 'Approved', type: 'string' },
            { name: 'Description', type: 'string' },
            { name: 'Id', type: 'string' },
            { name: 'ContentType', type: 'string' },
            { name: 'Created', type: 'string' },
            { name: 'Path', type: 'string' }
        ],
        proxy: {
            type: 'ajax',
            url  : '/app/Document/json',
            reader:{
            	type:'json',
            	rootProperty:'d.results'
            }
        }
    }
});

*/
Ext.define('poc.model.Document', {
	extend : 'Ext.data.Model',
	config : {
		fields : [{
			name : 'id',
			type : 'string',
			convert : function(value, record) {
				//the path for root folder is "/Shared Documents"
				var nid = "/Shared Documents";
				var fpath = record.get('Path');
				var fname = record.get('Name');
				var ftype = record.get('ContentType');
				if(fname)
					nid = fpath + "/" + fname;
				else
					return nid;

				if(ftype === "Folder")
					nid = nid + "/";
				return nid;
			}
		}, {
			name : 'Name',
			type : 'string'
		}, {
			name : 'Approved',
			type : 'string'
		}, {
			name : 'Modified',
			type : 'string'
		}, {
			name : 'Path',
			type : 'string'
		}, {
			name : 'ContentType',
			type : 'string'
		}, {
			name : 'leaf',
			type : 'boolean',
			convert : function(value, record) {
				var ctype = record.get('ContentType');
				if(ctype === "Document")
					return true;
				else
					return false;
			}
		}]
	}
});