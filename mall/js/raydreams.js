/**
 * Ray Tools
 * Copyright (c) 2016-2018 Tag Guillory
 * Created : 2016-Feb-18
 * Last Update : 2018-Feb-11
 * Version : 0.9
**/

(function ($)
{

	// object that holds all the settings and properties which is externally visible i.e. NOT private
	var base = {
		datasource: { data: [], keyfield: null },
		columns: [], //column definitions
		parentElem: null, // the base HTML element
		data: loadData, // function reference to set the data
		currentSelection: null, // last clicked row
		onRowClick: null, // external handler when a row is clicked
	};

	// iterates the data and fills in the table body
	function loadData(data, keyField)
	{
		// remove all data records from the table
		base.parentElem.find("tbody > tr").remove();
		base.datasource.data = data;
		base.datasource.keyfield = keyField;

		//Change to foreach to support dict or json object
		for (record in data)
		{
			var row = jQuery('<tr></tr>');// start a new row
			row.data('rowindex', record);
			var object=data[record]; //当前对象
			if (keyField != null) row.data('key', object[keyField]);
			//在此处显示每一列的数据
			for (var col of base.columns)
			{
				var fieldName = col.field;// get this field name
				var td = jQuery('<td></td>');// start the td

				// the render func returns false
				if (col.renderIf != null && !col.renderIf(object))
				{
					td.append("&nbsp;");
					row.append(td);
					continue;
				}

				//支持button
				if (col.button != null && col.button.length > 0) 
				{
					if (col.button.class!=null)
					{
						var btnclass=col.button.class;
					}
					for (var btn of col.button)
					{
						var button = jQuery('<button></button>');
						if (btn.class != null) button.addClass(btn.class);
						else button.addClass('btn');
						if (btn.handler != null)
							button.on('click', null, { rowindex: record, key: object[keyField] }, btn.handler);
						button.append(btn.title);
						td.append(button);
					}
				}

				//支持自定义组件
				if (col.control != null)
				{
					var control = jQuery(col.control);
					td.append(col.control);
				}

				//支持字段为函数名
				if (col.isFunc == true)
				{
					td.append(eval("object."+fieldName));
				}
				//通过字段赋值
				else if (fieldName != null)
				{
					if (col.format != null) td.append(col.format(object));
					else td.append(object[fieldName]);
				}

				if (jQuery.trim(td.html()).length < 1) td.append("&nbsp;");// if empty add a space
				row.append(td);
			}

			// append the row
			$(base.parentElem).find('table > tbody').append(row);
		}

	};

	// sets all the options
	jQuery.fn.raytable = function (options)
	{

		// remember the base element
		base.parentElem = $(this);
		$(this).html("");

		// test the root tag is either div or table, we want to put a div around a table
		if (base.parentElem.prop("tagName").toLowerCase() != 'div')
		{
			alert('Parent element must be a div tag!');
			return;
		}

		// get the input options
		base.datasource.data = options.datasource.data;
		base.datasource.keyfield = options.datasource.keyfield;

		base.onRowClick = options.rowClickHandler;

		// set the headers
		if (options.columns != null && options.columns.length > 0)
		{
			base.columns = options.columns;
		}
		else // use the HTML table headers
		{
			var ths = base.parentElem.find('thead tr').children();

			// create header objects based on the html tags
			for (var j = 0; j < ths.length; ++j)
			{
				// find the data-ray-field attr
				var field = $(ths[j]).data('ray-field');
				var title = $(ths[j]).text();
				base.columns.push({ field: field, title: title });
			}
		}

		// render header
		renderTable();

		// if data has been specified, then go ahead an load it, even empty data will cause this to run
		loadData(base.datasource.data, base.datasource.keyfield);

		// returning base exposes it publicly
		return base;
	};

	// creates the skeleton of the table
	function renderTable()
	{

		// skeleton of the table
		var skel = jQuery('<table class="table table-hover" style="margin-bottom:0px;"><thead><tr></tr></thead><tbody></tbody></table>');

		// add each header
		jQuery.each(base.columns, function (idx, h)
		{

			var cell = jQuery('<th>' + h.title + '</th>');

			if (h.width != undefined)
				cell.css('width', h.width + 'px');

			if (h.sort)
			{
				var sortBtn = jQuery("<span class='glyphicon glyphicon-sort-by-attributes' style='color:LightGray' aria-hidden='true' />");
				cell.append('&nbsp;');
				cell.append(sortBtn);
				sortBtn.on('click', null, h.field, doSortCol);
			}

			skel.find('tr').append(cell);
		});

		// add the table header and body to the parent elem
		base.parentElem.append(skel);

	}

	// when a row is clicked on
	function doRowClick(event)
	{
		base.currentSelection = event.data;
		base.onRowClick(event);
	}


}(jQuery));