var isSearchbyCat;

$(document).on('pagebeforeshow', "#results", function(event, ui) {
	
	if(isSearchbyCat){
		alert("cid"+currentcid+"subid"+currentcid2);	
		$.ajax({									
		url : "http://bigbox.herokuapp.com/BigBoxServer/itemsearchbycat/"+currentcid+"/"+currentcid2,
		contentType : "application/json",
		success : function(data, textStatus, jqXHR) {
			var itemList = data.items;
			//alert(JSON.stringify(itemList));
			//alert(JSON.stringify(itemList[0].i_name));
			//alert(itemList.length);
			//alert(itemList[0].i_name);
			//list.listview("refresh");
			var len = itemList.length;
			var list = $("#items-list");
			list.empty();
			var item;
			for (var i = 0; i < len; ++i) {
				item = itemList[i];

				list.append("<li><a onclick=GetItem(" + item.i_id + ",true)>" + "<img src='" + item.i_img + "'/>" + "<p id='info'>" + item.i_name + "</p>" + "<p class='ui-li-aside'> $" + item.i_price + "</p>" + "</a></li>");
			}
			list.listview("refresh");
		},
		error : function(data, textStatus, jqXHR) {
			console.log("textStatus: " + textStatus);
			alert("Data not found!");
		}
		});
	
	}
	else{
	$.ajax({
		url : "http://bigbox.herokuapp.com/BigBoxServer/itemsearch/"+searchValue,
		contentType : "application/json",
		success : function(data, textStatus, jqXHR) {
			var itemList = data.items;

			//alert(JSON.stringify(itemList));
			//alert(JSON.stringify(itemList[0].i_name));
			//alert(itemList.length);
			//alert(itemList[0].i_name);

			var len = itemList.length;
			var list = $("#items-list");
			list.empty();
			var item;
			for (var i = 0; i < len; ++i) {
				item = itemList[i];

				list.append("<li><a onclick=GetItem(" + item.i_id + ",true)>" + "<img src='" + item.i_img + "'/>" + "<p id='info'>" + item.i_name + "</p>" + "<p class='ui-li-aside'> $" + item.i_price + "</p>" + "</a></li>");
			}
			list.listview("refresh");
		},
		error : function(data, textStatus, jqXHR) {
			console.log("textStatus: " + textStatus);
			alert("Data not found!");
		}
	});
	}
});

$(document).on('pagebeforeshow', "#rmvcategories", function(event, ui) {
	
$.ajax({
		url : "http://bigbox.herokuapp.com/BigBoxServer/rmvcategories",
		contentType : "application/json",
		success : function(data, textStatus, jqXHR) {
			
			var categoriesList = data.categories;
			var subcategoriesList = data.subcategories;
			var secsubcategoriesList = data.secsubcategories;
			/*
			alert(JSON.stringify(categoriesList));
			alert(categoriesList.length);
			alert(categoriesList[0].cid);
			alert(categoriesList[0].cname);
			
			
			alert(JSON.stringify(subcategoriesList));
			alert(subcategoriesList.length);
			
			alert(JSON.stringify(secsubcategoriesList));
			alert(secsubcategoriesList.length);
			*/
			//alert(categoriesList[0].cname);
			var list = $("#dataPointList");
			list.empty();
			
			for (var i = 0; i < categoriesList.length; i++) {
				//alert();
				
				list.append('<li>\
						<input type="checkbox"  id="checkbox-'+categoriesList[i].cid+'"/>\
						<label for="checkbox-'+categoriesList[i].cid+'">'+ categoriesList[i].cname + '</label>\
					</li>').listview('refresh');
             // list.append('<li>' + categoriesList[i].cname + " ("+categoriesList[i].count+')</li>');
		 	
		 }
				//list.listview("refresh");
		},
        error : function(data, textStatus, jqXHR) {
  	      console.log("textStatus: " + textStatus);
    	  alert("Data not found!");
        }
	});

		
});

$(document).on('pagebeforeshow', "#changecategories", function(event, ui) {
$.ajax({
		url : "http://bigbox.herokuapp.com/BigBoxServer/rmvcategories",
		contentType : "application/json",
		success : function(data, textStatus, jqXHR) {
			
			var categoriesList = data.categories;
			var subcategoriesList = data.subcategories;
			var secsubcategoriesList = data.secsubcategories;
			/*
			alert(JSON.stringify(categoriesList));
			alert(categoriesList.length);
			alert(categoriesList[0].cid);
			alert(categoriesList[0].cname);
			
			
			alert(JSON.stringify(subcategoriesList));
			alert(subcategoriesList.length);
			
			alert(JSON.stringify(secsubcategoriesList));
			alert(secsubcategoriesList.length);
			
			//alert(categoriesList[0].cname);
			*/
			var list = $("#changecategorylist");
			list.empty();
			
			for (var i = 0; i < categoriesList.length; i++) {
				//alert();
				
				list.append('<li><a onclick= getButtonValue("' + categoriesList[i].cname + '") >'+categoriesList[i].cname+'<a data-icon="arrow-d" onclick= editSubCategory("' + categoriesList[i].cid + '") ></a></a></li></li>');
             // list.append('<li>' + categoriesList[i].cname + " ("+categoriesList[i].count+')</li>');
		 	
		 }
				list.listview("refresh");
				
		},
        error : function(data, textStatus, jqXHR) {
  	      console.log("textStatus: " + textStatus);
    	  alert("Data not found!");
        }
	});

});

var currentCatId_editSub;
function editSubCategory(cid){
	currentCat_editSub = cid;
	$.mobile.navigate("/App/view/changeSubcategories.html");
	
				
}
var currentCatId_editSub2;
function editSecSubCategory(cid){
	currentCatId_editSub2 = cid;
	$.mobile.navigate("/App/view/changeSecSubcategories.html");
	
				
}

$(document).on('pagebeforeshow', "#changesubcategories", function(event, ui) {
$.ajax({
		url : "http://bigbox.herokuapp.com/BigBoxServer/rmvcategories",
		contentType : "application/json",
		success : function(data, textStatus, jqXHR) {
			
			var categoriesList = data.categories;
			var subcategoriesList = data.subcategories;
			var secsubcategoriesList = data.secsubcategories;
			/*
			alert(JSON.stringify(categoriesList));
			alert(categoriesList.length);
			alert(categoriesList[0].cid);
			alert(categoriesList[0].cname);
			
			
			alert(JSON.stringify(subcategoriesList));
			alert(subcategoriesList.length);
			
			alert(JSON.stringify(secsubcategoriesList));
			alert(secsubcategoriesList.length);
			
			//alert(categoriesList[0].cname);
			*/
			var list = $("#changesubcategorylist");
			list.empty();
			
			for (var i = 0; i < subcategoriesList.length; i++) {
				//alert();
				if(currentCat_editSub == subcategoriesList[i].cid )
				list.append('<li><a onclick= getButtonValue("' + subcategoriesList[i].scname + '") >'+subcategoriesList[i].scname+'<a data-icon="arrow-d" onclick= editSecSubCategory("' + subcategoriesList[i].subid + '")></a></a></li></li>');
             // list.append('<li>' + categoriesList[i].cname + " ("+categoriesList[i].count+')</li>');
		 	
		 }
				list.listview("refresh");
				
		},
        error : function(data, textStatus, jqXHR) {
  	      console.log("textStatus: " + textStatus);
    	  alert("Data not found!");
        }
	});

});

$(document).on('pagebeforeshow', "#changesecsubcategories", function(event, ui) {
$.ajax({
		url : "http://bigbox.herokuapp.com/BigBoxServer/rmvcategories",
		contentType : "application/json",
		success : function(data, textStatus, jqXHR) {
			
			var categoriesList = data.categories;
			var subcategoriesList = data.subcategories;
			var secsubcategoriesList = data.secsubcategories;
			/*
			alert(JSON.stringify(categoriesList));
			alert(categoriesList.length);
			alert(categoriesList[0].cid);
			alert(categoriesList[0].cname);
			
			
			alert(JSON.stringify(subcategoriesList));
			alert(subcategoriesList.length);
			
			alert(JSON.stringify(secsubcategoriesList));
			alert(secsubcategoriesList.length);
			
			//alert(categoriesList[0].cname);
			*/
			var list = $("#changesecsubcategorylist");
			list.empty();
			
			for (var i = 0; i < secsubcategoriesList.length; i++) {
				//alert();
				if(currentCatId_editSub2 == secsubcategoriesList[i].subid )
				list.append('<li><a onclick= getButtonValue("' + secsubcategoriesList[i].sscname + '") >'+secsubcategoriesList[i].sscname+'<a data-icon="arrow-d"  ></a></a></li></li>');
             // list.append('<li>' + categoriesList[i].cname + " ("+categoriesList[i].count+')</li>');
		 	
		 }
				list.listview("refresh");
				
		},
        error : function(data, textStatus, jqXHR) {
  	      console.log("textStatus: " + textStatus);
    	  alert("Data not found!");
        }
	});

});
function getButtonValue(name){
	
	$( "input" ).val( name);
				
}



$(document).on('pagebeforeshow', "#categories", function(event, ui) {
	$.ajax({
		url : "http://bigbox.herokuapp.com/BigBoxServer/categories",
		contentType : "application/json",
		success : function(data, textStatus, jqXHR) {
				isSearchbyCat = true;
			//$.getScript("/App/appjs/category.js", function() {
				//alert("Script loaded and executed.");

				var categoriesList = data.categories;
				//alert(JSON.stringify(categoriesList));
				//alert(JSON.stringify(categoriesList[0].cname));
				//alert(categoriesList.length);
				//alert(categoriesList[0].cname);

				// Merge object2 into object1(cast)
				//var newCategory = new Category;

				var list = $("#categoriesUl");
				list.empty();
				//$.extend(newCategory, categoriesList[0]);
				//Get root; and cast it
				//rootNumbSub = newCategory.numbSub;
				//Check number of root subcategory

				for (var i = 0; i < categoriesList.length; i++) {

					//alert(newCategory.getSubCategory(i).cid);
					//alert(JSON.stringify(newCategory.getSubCategory(i)));
					//alert(newCategory.numbSub);
					//list.append('<li><a onclick= GetCategory("' + newCategory.getSubCategory(i).cid + '") >' + newCategory.getSubCategory(i).cname + '</a></li>');
					if(categoriesList[i].count == 0)
						list.append('<li><a onclick= GetCategory("' + categoriesList[i].cid + ',false")  >' + categoriesList[i].cname + '</a></li>');
					else
						list.append('<li><a onclick= GetCategory("' + categoriesList[i].cid + ',true") >' + categoriesList[i].cname + '</a></li>');
				}
				list.listview("refresh");
				//alert(newCategory);
				//alert(JSON.stringify(newCategory));
				//alert(JSON.stringify(newCategory.subcategory));
				//alert(newCategory.test());
				//alert( newCategory instanceof Category);
			//});

		},
		error : function(data, textStatus, jqXHR) {
			console.log("textStatus: " + textStatus);
			alert("Data not found!");
		}
	});
});

$(document).on('pagebeforeshow', "#subcategories", function(event, ui) {
	$.ajax({
		url : "http://bigbox.herokuapp.com/BigBoxServer/subcategories/" + currentcid,
		contentType : "application/json",
		success : function(data, textStatus, jqXHR) {

			//$.getScript("/App/appjs/category.js", function() {

			//alert("Second Script loaded and executed.");
			var categoriesList = data.categories;
			
			//alert("Im here");
			//alert(JSON.stringify(categoriesList));
			//alert(JSON.stringify(categoriesList[0].scname));
			//alert(categoriesList.length);
			//alert(categoriesList[0].scname);

			// Merge object2 into object1(cast)
			//var newCategory = new Category;
			//var newCategory2 = new Category;

			//$.extend(newCategory, categoriesList[0]);//Cast root

			//newCategory = newCategory.getSubCategory(currentcid); //Get Selected subcategory
			//$.extend(newCategory2, newCategory);//Cast second level

			var list = $("#subcategoriesUl");
			list.empty();

			//for (var i = 0; i < newCategory2.numbSub; i++) {

			//	list.append('<li><a onclick= GetSecondCategory("' + newCategory2.getSubCategory(i).cid + '") >' + newCategory2.getSubCategory(i).cname + '</a></li>');
			//}

			//list.listview("refresh");
			/*
			for (var i = 0; i < newCategory2.numbSub; i++) {
			currentCategories.push(categoriesList[0].getSubCategory(cid).getSubCategory(i));
			}
			alert(1);
			$.mobile.navigate("/App/view/subcategories.html");
			*/

			//Get root; and cast it
			//rootNumbSub = newCategory.numbSub;
			//Check number of root subcategory
			//if (categoriesList.length == 0) {
			//alert("Here");
			//$.mobile.navigate("/App/view/results.html");
			//} else {

			for (var i = 0; i < categoriesList.length; i++) {
				//alert(newCategory.getSubCategory(i).cid);
				//alert(JSON.stringify(newCategory.getSubCategory(i)));
				//alert(newCategory.numbSub);
				if(categoriesList[i].count == 0)
					list.append('<li><a href="/App/view/results.html"  >' + categoriesList[i].scname + '</a></li>');
				else
					list.append('<li><a onclick= GetSecondCategory("' + categoriesList[i].subid + '") >' + categoriesList[i].scname + '</a></li>');
			}
			list.listview("refresh");
			//			}
			//alert(newCategory);
			//alert(JSON.stringify(newCategory));
			//alert(JSON.stringify(newCategory.subcategory));
			//alert(newCategory.test());
			//alert( newCategory instanceof Category);
			//});

		},
		error : function(data, textStatus, jqXHR) {
			console.log("textStatus: " + textStatus);
			alert("Data not found!");
		}
	});
});

$(document).on('pagebeforeshow', "#secondsubcategories", function(event, ui) {
	$.ajax({

		url : "http://bigbox.herokuapp.com/BigBoxServer/2subcategories/" + currentcid2,
		contentType : "application/json",
		success : function(data, textStatus, jqXHR) {

			//$.getScript("/App/appjs/category.js", function() {

			//alert("Third Script loaded and executed.");
			var categoriesList = data.categories;

			//alert("Second fast");
			//alert(JSON.stringify(categoriesList));
			//alert(JSON.stringify(categoriesList[0].scname));
			//alert(categoriesList.length);
			//alert(categoriesList[0].scname);

			// Merge object2 into object1(cast)
			//var newCategory = new Category;
			//var newCategory2 = new Category;
			//var newCategory3 = new Category;
			//alert("1");
			//$.extend(newCategory, categoriesList[0]);//Cast root
			//alert(newCategory.showCurrentCategory());

			//alert("2");
			//newCategory = newCategory.getSubCategory(currentcid); //Get Selected subcategory

			//$.extend(newCategory2, newCategory);//Cast second level
			//alert(newCategory2.showCurrentCategory());
			//alert(newCategory2 instanceof Category);

			//alert("3");
			//alert(JSON.stringify(newCategory2.getSubCategory(0)));

			//newCategory2 = newCategory2.getSubCategory(currentcid2);
			//newCategory2 = newCategory2.getSubCategory(currentcid2); //Get Selected subcategory
			//alert(newCategory2 instanceof Category);
			//$.extend(newCategory3, newCategory2);//Cast third level
			//alert(newCategory3 instanceof Category);
			//alert("4");
			var list = $("#secondsubcategoriesUl");
			list.empty();
			//alert("5");
			for (var i = 0; i < categoriesList.length; i++) {

				//list.append('<li><a onclick= GetSecondCategory("' + newCategory3.getSubCategory(i).cid + '") >' + newCategory3.getSubCategory(i).cname + '</a></li>');
				list.append('<li><a href="/App/view/results.html" >' + categoriesList[i].sscname + '</a></li>');

			}
			//alert("termine");
			list.listview("refresh");
			/*
			for (var i = 0; i < newCategory2.numbSub; i++) {
			currentCategories.push(categoriesList[0].getSubCategory(cid).getSubCategory(i));
			}
			alert(1);
			$.mobile.navigate("/App/view/subcategories.html");
			*/

			//Get root; and cast it
			//rootNumbSub = newCategory.numbSub;
			//Check number of root subcategory

			//for (var i = 0; i < rootNumbSub; i++) {

			//alert(newCategory.getSubCategory(i).cid);
			//alert(JSON.stringify(newCategory.getSubCategory(i)));
			//alert(newCategory.numbSub);
			//list.append('<li><a onclick= GetCategory("' + newCategory.getSubCategory(i).cid + '") >' + newCategory.getSubCategory(i).cname + '</a></li>');
			//}
			//list.listview("refresh");
			//alert(newCategory);
			//alert(JSON.stringify(newCategory));
			//alert(JSON.stringify(newCategory.subcategory));
			//alert(newCategory.test());
			//alert( newCategory instanceof Category);
			//});

		},
		error : function(data, textStatus, jqXHR) {
			console.log("textStatus: " + textStatus);
			alert("Data not found!");
		}
	});
});

//item view page
$(document).on('pagebeforeshow', "#details", function(event, ui) {
	console.log("pageBeforeShow Details");
	var detailsHeader = $("#detailsHeader");
	detailsHeader.empty();
	detailsHeader.append(currentItem[0].i_name);

	var detailsImg = $("#details-image");
	detailsImg.empty();
	detailsImg.append("<img src='" + currentItem[0].i_img + "'>");

	var detailsPara = $("#detailsPara");
	detailsPara.empty();
	detailsPara.append(currentItem[0].i_info);

	var detailsPrice = $("#detailsPrice");
	detailsPrice.empty();
	detailsPrice.append("" + currentItem[0].i_price);

	var detailsBid = $("#detailsBid");
	detailsBid.empty();
	detailsBid.append("" + currentItem[0].i_bid);

	var detailsShipFrom = $("#detailsShipFrom");
	detailsShipFrom.empty();
	detailsShipFrom.append("" + currentItem[0].i_shipfrom);

	var detailsShipTo = $("#detailsShipTo");
	detailsShipTo.empty();
	detailsShipTo.append("" + currentItem[0].i_shipto);

	var detailsCondition = $("#detailsCondition");
	detailsCondition.empty();
	detailsCondition.append("" + currentItem[0].i_condition);
});

$(document).on('pagebeforeshow', "#bidPage", function(event, ui) {
	console.log("pageBeforeShow Description");

	var prodBidName = $("#prodBitName");
	prodBidName.empty();
	prodBidName.append(" " + currentItem[0].i_name);

	//var prodBidInfo = $("#imgSpace");
	//prodBidInfo.empty();
	$('#imgSpace').attr('src', "" + currentItem[0].i_img);
	//prodBidInfo.append("<img src= '/App/image/" + currentItem.img + "class='ui-li-thumb'>");

	var currentBid = $("#currentBid");
	currentBid.empty();
	currentBid.append(" Current Bid &emsp; &emsp; &emsp;" + currentItem[0].i_bid);
});

//cart page
$(document).on('pagebeforeshow', "#cart", function(event, ui) {
	var len = cartList.length;
	var cList = $("#cart-list");
	var subtotal = $("#subtotal");
	var page = $("#cart");
	var sTotal = 0.00;
	var itemsQty = 0;

	cList.empty();
	var item;
	
	
	for (var i = 0; i < len; ++i) {
		item = cartList[i];
		cList.append("<li><a onclick=GetItem(" + item.i_id + ",true)>" + "<img src='" + item.i_img + "'/>" + "<p id='infoCart'>" + item.i_name + "</p>" + "<p> $" + item.i_price + "</p>" + "<p> Qty: " + item.qtyToPurchase + "</p>" +
		//				"<form class='ui-li-aside'><div data-role='fieldcontain'><label for='qty'>Qty:</label><br /><input onclick='#' style='width:35px' name='qty' id='qty' type='number' /></div></form>" +
		"<a data-icon='delete' data-role='button' onclick='deleteCartItem(" + item.id + ")'></a></a></li>");
		sTotal += parseFloat(item.i_price) * item.qtyToPurchase;
		itemsQty += item.qtyToPurchase;
	
	}

	subtotal.empty();
	subtotal.append("<p>Subtotal (" + itemsQty + " items) <br />$" + sTotal.toFixed(2));
	cList.listview("refresh");

});

//checkout page
$(document).on('pagebeforeshow', "#checkout-page", function(event, ui) {
	var shipTo = $("#shipTo");
	var payment = $("#payment");
	var items_ship_head = $("#items-shipping-header");
	var items_ship = $("#items-shipping");
	var shippingTotal = 0.00;
	var subTotal = 0.00;
	var total;

	if (is_from_cart) {
		var item;
		var len = cartList.length;
		var options = "";

		for ( i = 0; i < len; ++i) {
			item = cartList[i];
			
			options = "";
			for ( j = 1; j <= item.i_qtyavailable; j++) {
				if (j == item.qtyToPurchase) {
					options += "<option value=' " + j + "' selected='selected'>  " + j + "  </option>";
				} else {
					options += "<option value=' " + j + "'>  " + j + "  </option>";
				}
			}
			shippingTotal += parseFloat(item.i_shippingprice);
			subTotal += parseFloat(item.i_price);
			items_ship.append("<li>" + "<img src='" + item.i_img + "'/>" + "<p id='infoCart'>" + item.i_name + "</p>" + "<p> $" + item.i_price + 
			"</p>" + "<div class='ui-li-aside'><fieldset data-role='controlgroup'>" + "<legend><pre>Qty: </pre> </legend>" + "<select name='qty' id='qty'>" + options + "</select></fieldset></div></li>");

			//			"<li><a href='#addSelect'><p style='padding-top:10px'>Quantity 3</p></a></li>" +
			//			"<li><a href='#shipSelect'><p style='padding-top:10px'>Shpping type <br> Estimated shipping time</p></li><hr style='padding:0; margin:0'>");
		}

	} else {
		var item = currentItem;
		var options = "";
		shippingTotal = parseFloat(item[0].i_shippingprice);
		subTotal = parseFloat(item[0].i_price);
		for ( i = 1; i <= item[0].i_qtyavailable; i++) {
			options += "<option value=' " + i + "'>  " + i + "  </option>";
		}
		items_ship.append("<li>" + "<img src='" + item[0].i_img + "'/>" + "<p id='infoCart'>" + item[0].i_name + "</p>" + "<p> $" + item[0].i_price + "</p>" + "<div class='ui-li-aside'><fieldset data-role='controlgroup'>" + "<legend><pre>Qty: </pre> </legend>" + "<select name='qty' id='qty'>" + options + "</select></fieldset></div></li>");
	}
	total = shippingTotal + subTotal;

	//Shipping address
	if (s_address_selected) {
		//ya selecciono
		shipTo.empty();
		shipTo.append("<h5> Ship to <hr style='padding:0;margin:0' /></h5><a onClick='GetAddresses(true)'>" + "<p style='padding:5px 10px 20px 0;margin:0'> " + shipping_address[0].a_name + "<br />" + shipping_address[0].a_street + "<br />" + 
		shipping_address[0].a_city + ", " + shipping_address[0].a_state + " " + shipping_address[0].a_zip + " " + shipping_address[0].a_country + "<br />" + shipping_address[0].a_phone + "</p></a><hr style='padding:0;margin:0'/><br />");

	} else {
		//todavia no ha seleccionado
		shipTo.empty();
		shipTo.append("<h5> Ship to <hr style='padding:0;margin:0'/></h5><a onClick='GetAddresses(true)'><p style='padding:0px 10px 10px 0; margin:0'><strong>Select Address</strong></p></a><hr style='margin:0'><br />");
	}

	//Payment
	if (payment_selected) {
		//codigo cuando ya puso trajeta
		payment.empty();
		var cardNumberDisplay = new Array(currentCreditCard[0].cc_number.length - 4 + 1).join('x') + currentCreditCard[0].cc_number.slice(-4);
		cardNumberDisplay = cardNumberDisplay.substring(cardNumberDisplay.length - 7);
		payment.append("<h5> Payment <hr style='padding:0;margin:0' /></h5><a onClick='GetCreditCards(false)'>" + 
		"<p style='padding:5px 10px 0px 0'><strong>Payment method:</strong></p>" + "<p>" + currentCreditCard[0].cc_holdername + "<br />" + cardNumberDisplay + "</p></a>");

		//verificar si ya puso una un billing address
		if (b_address_selected) {
			//codigo para billing cuando ya selecciono uno
			payment.append("<hr style='margin:0'><a onClick='GetAddresses(false)'><p style='padding:5px 10px 20px 0;margin:0'><strong>Billing Address:</strong> <br>" + billing_address[0].a_name + "<br />" + 
			billing_address[0].a_street + "<br />" + billing_address[0].a_city + ", " + billing_address[0].a_state + " " + billing_address[0].a_zip + " " + 
			billing_address[0].a_country + "<br />" + billing_address[0].a_phone + "</p></a>");  
			payment.append("<hr style='padding:0;margin:0;border-top:dashed 1px'/><br /><p style='margin-bottom:0;padding-bottom:5px'>Price: $" + subTotal.toFixed(2) + "<br>Shipping: $" + shippingTotal.toFixed(2) + "<hr style='padding:0;margin:0;width:100px'/>Total: $" + total.toFixed(2) + "</p><hr>");

		} else {
			//todavia no ha seleccionado una tajeta
			payment.append("<hr style='margin:0'><a onClick='GetAddresses(false)'><p style='padding:10px 10px 10px 0; margin:0'><strong>Select Billing Address</strong></p></a>");  
			payment.append("<hr style='padding:0;margin:0;border-top:dashed 1px'/><br /><p style='margin-bottom:0;padding-bottom:5px'>Price: $" + subTotal.toFixed(2) + "<br>Shipping: $" + shippingTotal.toFixed(2) + "<hr style='padding:0;margin:0;width:100px'/>Total: $" + total.toFixed(2) + "</p><hr>"); 
		}

	} else {
		//no ha puesto tarjeta
		payment.empty();
		payment.append("<h5> Payment <hr style='padding:0;margin:0'/></h5><a onClick='GetCreditCards()'><p style='padding:0px 10px 10px 0; margin:0'><strong>Select Credit Card</strong></p></a>");
		payment.append("<hr style='padding:0;margin:0;border-top:dashed 1px'/><br /><p style='margin-bottom:0;padding-bottom:5px'>Price: $" + subTotal.toFixed(2) + "<br>Shipping: $" + shippingTotal.toFixed(2) + "<hr style='padding:0;margin:0;width:100px'/>Total: $" + total.toFixed(2) + "</p><hr>");

	}

	items_ship_head.empty();
	items_ship_head.append("<h5> Items and Shipping <hr style='padding:0;margin:0'/></h5>");

	if (!s_address_selected || !payment_selected || !b_address_selected) {
		$("#place-order").addClass("ui-disabled");
	} else {
		$("#place-order").addClass("ui-enabled");
	}

	shipTo.listview("refresh");
	payment.listview("refresh");
	items_ship_head.listview("refresh");
	items_ship.listview("refresh");
});

//Shipping and Payment selection
$(document).on('pagebeforeshow', "#ShippingOrPaymentSel", function(event, ui) {

	var head = $("#SoPheader");
	var newSoP = $("#newSoP");
	var savedSoP = $("#savedSoP");
	if (is_addr) {
		head.empty();
		newSoP.empty();
		savedSoP.empty();
		head.append("Select Address");
		newSoP.append("<br /><li data-icon='plus' data-iconpos='left'><a href='/App/view/addNewAddress.html'><h5>Add new address</h5></a></li><br />");

		//conseguir todas las direcciones del usuario y apendiarlas
		var len = addressList.length;
		var anAddress;
		for ( i = 0; i < len; ++i) {
			anAddress = addressList[i];
			savedSoP.append("<li><a onClick='GetAddress(" + anAddress.a_id + ")'>" + "<p>" + anAddress.a_name + "<br />" + anAddress.a_street + "<br />" + anAddress.a_city + ", " + anAddress.a_state + " " + anAddress.a_zip + " " + anAddress.a_country + "<br />" + anAddress.a_phone + "</p></a></li>");
		}

	} else {
		head.empty();
		newSoP.empty();
		savedSoP.empty();
		head.append("Payment Method");
		newSoP.append("<br /><li data-icon='plus'><a href='/App/view/addNewCard.html'><h5>Add new card</h5></a></li>");

		//conseguir todas las tarjetas del usuario y apendiarlas
		var lenC = creditcardList.length;
		var aCredCard;
		var cardNumberDisp;
		for ( i = 0; i < lenC; ++i) {
			aCredCard = creditcardList[i];
			cardNumberDisp = new Array(aCredCard.cc_number.length - 3).join('x') + aCredCard.cc_number.slice(-1);
			cardNumberDisp = cardNumberDisp.substring(cardNumberDisp.length - 7);
			savedSoP.append("<li><a onClick='GetCreditCard(" + aCredCard.cc_number + ")'>" + "<p>" + aCredCard.cc_holdername + "<br />" + cardNumberDisp + "<br />Exp. Date " + aCredCard.cc_expmonth + "/" + aCredCard.cc_expyear + "</p></a></li>");
		}

	}

	newSoP.listview("refresh");
	savedSoP.listview("refresh");

});

$(document).on('pagebeforeshow', "#descriptionPage", function(event, ui) {
	console.log("pageBeforeShow Description");

	var descHSpace = $("#descHeader");
	descHSpace.empty();
	descHSpace.append("Description");

	var prodDescSpace = $("#prodDesPara");
	prodDescSpace.empty();
	prodDescSpace.append("" + currentItem[0].i_info);

	console.log(currentItem);
	var detailsParaSpace = $(".detailsPara");
	detailsParaSpace.empty();
	detailsParaSpace.append("Name: " + currentItem[0].i_name + "<br/> Model: " + currentItem[0].i_model + "<br/> Year: " + currentItem[0].i_year + "<br/> Dimension: " + currentItem[0].i_width + "x" + currentItem[0].i_length + "x" + currentItem[0].i_heigth + "<br/> Weigth: " + currentItem[0].i_weigth + "<br/> Ship to:" + currentItem[0].i_shipto + " <br/> Ship from: " + currentItem[0].i_shipfrom);

});

/*=====================================================================================================================================
 Button events
 =====================================================================================================================================*/

function ConverToJSON(formData) {
	var result = {};
	$.each(formData, function(i, o) {
		result[o.name] = o.value;
	});
	return result;
}

var currentcid;
function GetCategory(cid, condition) {
	alert(condition);
	currentcid = cid;
	if(condition)
		$.mobile.navigate("/App/view/subcategories.html");
	else
		$.mobile.navigate("/App/view/result.html");
}

var currentcid2;
function GetSecondCategory(cid) {
	//alert("subid:"+cid);
	currentcid2 = cid;
	$.mobile.navigate("/App/view/secondSubCategory.html");
}

//get a item by its id
var currentItem = {};
function GetItem(id, display) {
	$.mobile.loading("show");
	$.ajax({
		async : false,
		url : "http://bigbox.herokuapp.com/BigBoxServer/items/" + id,
		method : 'get',
		contentType : "application/json",
		dataType : "json",
		success : function(data, textStatus, jqXHR) {
			currentItem = data.items;
			//alert(JSON.stringify(currentItem));
			//alert(JSON.stringify(currentItem));
			//alert(JSON.stringify(currentItem[0].i_name));
			//alert(currentItem.length);
			//alert(currentItem[0].i_name);
			$.mobile.loading("hide");
			if (display) {
				$.mobile.navigate("/App/view/details.html");
			}
		},
		error : function(data, textStatus, jqXHR) {
			console.log("textStatus: " + textStatus);
			$.mobile.loading("hide");
			if (data.status == 404) {
				alert("Item not found.");
			} else {
				alert("Internal Server Error.");
			}
		}
	});
}

/*===============================================================================================
 Methods related to shipping and billing addresses
 =============================================================================================*/
var shipping_address;
var billing_address;
var s_address_selected;
var b_address_selected;
var is_addr;
var is_ship;

function SetAddress(is_address) {
	is_addr = is_address;
	$.mobile.navigate("/App/view/AddressOrPayment.html");
}

//Add an address to the saved list
function AddAddress() {
	$.mobile.loading("show");
	var form = $("#address-form");
	var formData = form.serializeArray();
	console.log("form Data: " + formData);
	var newAddress = ConverToJSON(formData);
	console.log("New Address: " + JSON.stringify(newAddress));
	var newAddressJSON = JSON.stringify(newAddress);
	$.ajax({
		url : "http://bigbox.herokuapp.com/BigBoxServer/addresses",
		method : 'post',
		data : newAddressJSON,
		contentType : "application/json",
		dataType : "json",
		success : function(data, textStatus, jqXHR) {
			$.mobile.loading("hide");
			GetAddresses(is_ship);
		},
		error : function(data, textStatus, jqXHR) {
			console.log("textStatus: " + textStatus);
			$.mobile.loading("hide");
			alert("Address could not be added!");
		}
	});

}

//Get an addres based on its ID
function GetAddress(id) {
	$.mobile.loading("show");
	$.ajax({
		url : "http://bigbox.herokuapp.com/BigBoxServer/addresses/" + id,
		method : 'get',
		contentType : "application/json",
		dataType : "json",
		success : function(data, textStatus, jqXHR) {
			$.mobile.loading("hide");
			if (is_ship) {
				shipping_address = data.address;
				s_address_selected = true;
			} else {
				
				billing_address = data.address;
				b_address_selected = true;
			}
			$.mobile.navigate("/App/view/checkout.html");
		},
		error : function(data, textStatus, jqXHR) {
			console.log("textStatus: " + textStatus);
			$.mobile.loading("hide");
			if (data.status == 404) {
				alert("Address not found.");
			} else {
				alert("Internal Server Error.");
			}
		}
	});
}

//Get all addresses
var addressList = new Array();
function GetAddresses(isShipping) {
	$.ajax({
		url : "http://bigbox.herokuapp.com/BigBoxServer/addresses",
		method : 'get',
		contentType : "application/json",
		success : function(data, textStatus, jqXHR) {
			addressList = data.addresses;
			is_ship = isShipping;
			SetAddress(true);

		},
		error : function(data, textStatus, jqXHR) {
			console.log("textStatus: " + textStatus);
			alert("Data not found!");
		}
	});
}

/*===============================================================================================
Functions related Cart
=============================================================================================*/
//arreglar la funcion para que detecte que es el cart de cierto usuario
var cartList = {};
function GetCart(show) {
	console.log("cartList");
	$.ajax({
		async : false,
		url : "http://bigbox.herokuapp.com/BigBoxServer/cart/",
		contentType : "application/json",
		dataType : "json",
		success : function(data, textStatus, jqXHR) {

			cartList = data.cart;
			console.log(cartList);
				

		},
		error : function(data, textStatus, jqXHR) {
			console.log("textStatus: " + textStatus);
			alert("Data not found!");
		}
	});
	$.mobile.loading("hide");
	if (show && cartList != "") {
		$.mobile.navigate("/App/view/cart.html");
	}
	else if(show && cartList ==""){
		$.mobile.navigate("/App/view/emptyCart.html");
	}

}

//A-adir un item al carro
function AddToCart() {
	//Comentado por fase 2.
	/*var id = currentItem.id;
	$.mobile.loading("show");
	var newProdJSON = JSON.stringify(currentItem);
	$.ajax({
		url : "http://bigbox.herokuapp.com/BigBoxServer/cart/" + id,
		method : 'put',
		data : newProdJSON,
		contentType : "application/json",
		dataType : "json",
		success : function(data, textStatus, jqXHR) {
			$.mobile.loading("hide");
			GetCart(true);
		},
		error : function(data, textStatus, jqXHR) {
			console.log("textStatus: " + textStatus);
			$.mobile.loading("hide");
			if (data.status == 404) {
				alert("Cart not found.");
			} else {
				alert("Internal Server Error.");
			}
		}
	});
	*/
	GetCart(true);
}

function deleteCartItem(ItemId) {
	//Comentado por fase 2
	/*
	var userConfirmation = confirm("Are you sure you want to remove this item?");
	if (userConfirmation == false) {
		return;
	}

	var cartList = document.getElementById("cart-list");

	$.mobile.loading("show");
	$.ajax({
		async : false,
		url : "http://bigbox.herokuapp.com/BigBoxServer/cart/" + ItemId,
		method : 'delete',
		contentType : "application/json",
		dataType : "json",
		success : function(data, textStatus, jqXHR) {
			$.mobile.loading("hide");
			GetCart(false);
			refreshPage();
		},
		error : function(data, textStatus, jqXHR) {
			console.log("textStatus: " + textStatus);
			$.mobile.loading("hide");
			if (data.status == 404) {
				alert("Item not found.");
			} else {
				alert("Internal Server Error.");
			}
		}
	});
	*/
	
}

/*===============================================================================================
 Functions related to payment method
 =============================================================================================*/
var paymentMethod;
//Add a card to the cards list
function AddCreditCard() {
	$.mobile.loading("show");
	var form = $("#card-form");
	var formData = form.serializeArray();
	console.log("form Data: " + formData);
	var newCreditCard = ConverToJSON(formData);
	console.log("New Credit Card: " + JSON.stringify(newCreditCard));
	var newCreditCardJSON = JSON.stringify(newCreditCard);
	$.ajax({
		url : "http://bigbox.herokuapp.com/BigBoxServer/creditcards",
		method : 'post',
		data : newCreditCardJSON,
		contentType : "application/json",
		dataType : "json",
		success : function(data, textStatus, jqXHR) {
			$.mobile.loading("hide");
			GetCreditCards();
		},
		error : function(data, textStatus, jqXHR) {
			console.log("textStatus: " + textStatus);
			$.mobile.loading("hide");
			alert("Credit Card could not be added!");
		}
	});

}

//Get a credit card based on its ID
var currentCreditCard = {};
function GetCreditCard(id) {
	$.mobile.loading("show");
	console.log(id);
	$.ajax({
		url : "http://bigbox.herokuapp.com/BigBoxServer/creditcards/" + id,
		method : 'get',
		contentType : "application/json",
		dataType : "json",
		success : function(data, textStatus, jqXHR) {
			currentCreditCard = data.creditcard;
			paymentMethod = currentCreditCard;
			$.mobile.loading("hide");
			payment_selected = true;
			$.mobile.navigate("/App/view/checkout.html");
		},
		error : function(data, textStatus, jqXHR) {
			console.log("textStatus: " + textStatus);
			$.mobile.loading("hide");
			if (data.status == 404) {
				alert("Credit Card not found.");
			} else {
				alert("Internal Server Error.");
			}
		}
	});
}

//Get all credit cards
var creditcardList = new Array();
function GetCreditCards() {
	$.ajax({
		url : "http://bigbox.herokuapp.com/BigBoxServer/creditcards",
		method : 'get',
		contentType : "application/json",
		success : function(data, textStatus, jqXHR) {
			creditcardList = data.creditcards;
			SetAddress(false);

		},
		error : function(data, textStatus, jqXHR) {
			console.log("data: " + data);
			console.log("textStatus: " + textStatus);
			alert("Data not found! Error");
		}
	});
}

var is_from_cart;
var currentOrder;
var payment_selected;

function CheckoutFromCart(isFromCart) {
	is_from_cart = isFromCart;
	$.mobile.navigate("/App/view/checkout.html");
}

function prepareOrder(is_from_cart) {
	currentOrder = new Order();
	address_selected = false;
	payment_selected = false;
	this.is_from_cart = is_from_cart;

	$.mobile.navigate("/App/view/checkout.html");
}

var searchValue;
function displayunicode(e) {
	var unicode = e.keyCode ? e.keyCode : e.charCode;
	searchValue = document.getElementsByName('searchValue')[0].value;
	// Got the User Search Value;

	//Check if Enter was received.
	if (unicode == 13) {
		isSearchbyCat = false;
		$.mobile.navigate("/App/view/results.html");
	}
}

function getSubmitValue() {
	var bidValue = document.getElementsByName('bidValue')[0].value;

	var userConfirmation = confirm("Are you sure of the current Bid? \n Bid: $" + bidValue);
	if (userConfirmation == false) {
		return;
	}

	/*
	 var jsonData={"name":""+currentItem.name, "model":""+currentItem.model, "year":""+currentItem.year,"info":""+currentItem.info,"buyItNow":""+currentItem.buyItNow, "price":""+currentItem.price, "img":""+currentItem.img,
	 "width":""+currentItem.width, "length":""+currentItem.length, "heigth":""+currentItem.heigth, "weigth":""+currentItem.weigth, "shipTo":""+currentItem.shipTo, "shipFrom":""+currentItem.shipFrom, "condition":""+currentItem.condition ,
	 "hasBid":""+currentItem.hasBid, "bid":""+currentItem.bid, "seller":""+currentItem.seller, "shippingPrice":""+currentItem.shippingPrice){

	 var j = JSON.stringify(jsonData);*/
	currentItem.bid = bidValue;
	var newProdJSON = JSON.stringify(currentItem);
	$.ajax({
		url : "http://bigbox.herokuapp.com/BigBoxServer/items/" + currentItem.id,
		method : 'put',
		data : newProdJSON,
		contentType : "application/json",
		dataType : "json",
		success : function(data, textStatus, jqXHR) {
			GetItem(currentItem.id, true);
			//refresh Current Item
		},
		error : function(data, textStatus, jqXHR) {
			console.log("textStatus: " + textStatus);
			$.mobile.loading("hide");
			if (data.status == 404) {
				alert("Item not found. GET ITEM");
			} else {
				alert("Internal Server Error.");
			}
		}
	});

}

function checkBid() {
	var bidValue = document.getElementsByName('bidValue')[0].value;
	//Se le suma 0.50 para un bid aceptado- No implementado aun.
	if (parseFloat(bidValue).toFixed(2) - parseFloat(currentItem.bid).toFixed(2) <= 0) {
		$('#submit').addClass('ui-disabled');
	} else if (parseFloat(bidValue).toFixed(2) - parseFloat(currentItem.bid).toFixed(2) > 0) {
		$('#submit').removeClass('ui-disabled');
	} else {
		$('#submit').addClass('ui-disabled');
	}
}

/*===============================================================================================
 Login Functions
 =============================================================================================*/
var currentUser;
function login() {
	var user = document.getElementById('username').value;
	var pass = document.getElementById('password').value;
	var logInfo = JSON.stringify({
		'username' : user,
		'password' : pass
	});
	$.ajax({
		url : "http://bigbox.herokuapp.com/BigBoxServer/user",
		method : "post",
		contentType : "application/json",
		data : logInfo,
		success : function(data, textStatus, jqXHR) {
			//alert(data.user);
			currentUser = data.user;
			clearInfo();
			//alert(currentUser);
			$.mobile.navigate("/App/view/user.html");
			//$.mobile.navigate("/App/view/user.html")
		},
		error : function(data, textStatus, jqXHR) {

			alert("Wrong username or password.");
			//$.mobile.navigate("/index.html");

		}
	});

}

function logout() {

	$.ajax({
		url : "http://bigbox.herokuapp.com/BigBoxServer/logout",
		contentType : "application/json",
		success : function(data, textStatus, jqXHR) {
			$.mobile.navigate("/index.html");

		},
		error : function(data, textStatus, jqXHR) {
			console.log("what happend?");
		}
	});

}

function account() {
	$.ajax({
		url : "http://bigbox.herokuapp.com/BigBoxServer/account",
		contentType : "application/json",
		success : function(data, textStatus, jqXHR) {
			$.mobile.navigate("/App/view/account/watching.html");

		},
		error : function(data, textStatus, jqXHR) {
			console.log("what happend?");
		}
	});

}

function register() {

	var fname = document.getElementById('fname').value;
	var lname = document.getElementById('lname').value;
	var address = document.getElementById('address').value;
	var city = document.getElementById('city').value;
	var state = document.getElementById('state').value;
	var country = document.getElementById('country').value;
	var zipcode = document.getElementById('zipcode').value;
	var phone = document.getElementById('phone').value;
	var new_username = document.getElementById('new_username').value;
	var email = document.getElementById('email').value;
	var new_password = document.getElementById('new_password').value;
	var renter = document.getElementById('renter').value;
	var question = document.getElementById('question').value;
	var answer = document.getElementById('answer').value;

	var registerInfo = JSON.stringify({
		'fname' : fname,
		'lname' : lname,
		'address' : address,
		'city' : city,
		'state' : state,
		'country' : country,
		'zipcode' : zipcode,
		'phone' : phone,
		'new_username' : new_username,
		'email' : email,
		'new_password' : new_password,
		'renter' : renter,
		'question' : question,
		'answer' : answer
	});

	$.ajax({
		url : "http://bigbox.herokuapp.com/BigBoxServer/register",
		type : "post",
		contentType : "application/json",
		data : registerInfo,
		success : function(data, textStatus, jqXHR) {
			$.mobile.navigate("/App/view/signedUp.html");

		},
		error : function(data, textStatus, jqXHR) {
			console.log("try again");
			$.mobile.navigate("/index.html");

		}
	});

}

/*===============================================================================================
 USER CHECK Function
 =============================================================================================*/
function registerChecker(num) {
	if (num == 0) {
		$.ajax({
			url : "http://bigbox.herokuapp.com/BigBoxServer/verify/",
			contentType : "application/json",
			success : function(data, textStatus, jqXHR) {
				console.log(data);
				if (data != 'OK')
					$.mobile.navigate("/App/view/user.html");
			},
			error : function(data, textStatus, jqXHR) {
			}
		});
	} else if (num == 5) {
		$.ajax({
			url : "http://bigbox.herokuapp.com/BigBoxServer/verify/",
			contentType : "application/json",
			success : function(data, textStatus, jqXHR) {
				console.log(data);
				$(".user_header").empty;
				$(".user_header").append('<a href="" data-rel="page"  class="ui-btn-left"\
				style="color: #FFFFFF" onclick="account()"><h5>Welcome\
				 ' + data.rows[0].u_fname + ' ' + data.rows[0].u_lname + '!</h5> </a>');
			},
			error : function(data, textStatus, jqXHR) {
				console.log("try again");

			}
		});
	} else {

		$.ajax({
			url : "http://bigbox.herokuapp.com/BigBoxServer/verify/",
			contentType : "application/json",
			success : function(data, textStatus, jqXHR) {
				$(".user_header").empty;
				$(".user_header").append('<a href="/App/view/account/watching.html" data-rel="page" \
				class="ui-btn-left"style="color: #FFFFFF" ><h5>Welcome! \
				' + data.rows[0].u_fname + ' ' + data.rows[0].u_lname  + '</h5></a>');
				
				$('.account').append('Account: ' + data.rows[0].u_id);
				if (data.rows[0].u_admin) {
					$('#navbar_admin' + num).show();
					$('#navbar_user' + num).hide();
				} else {
					$('#navbar_user' + num).show();
					$('#navbar_admin' + num).hide();
				}

				$('#home').page();

			},
			error : function(data, textStatus, jqXHR) {
				console.log("try again");

			}
		});

	}

}

function searchUser(e) {
	var unicode = e.keyCode ? e.keyCode : e.charCode;
	var searchValue = document.getElementsByName('searchValue')[0].value;
	// Got the User Search Value;

	//Check if Enter was received.
	if (unicode == 13) {

	}
}

/*===============================================================================================
 Order Functions
 =============================================================================================*/
function placeOrder(){
	
	//Implementacion usando una tabla de la relacion item_order y qtyavailable != 0
	//Esto implica que solo se va a utilizar un cart por usuario
	if(is_from_cart){
		//codigo insertar en la tabla item_order y update la tabla de item qtyavailable--;
		//y luego eliminar el cart de la tabla cart, cart_items y donde aparezca delete from table where cart_id = id.
		
	}
	else{
		//codigo insertar en la tabla item_order y update la tabla de item qtyavailable--; sin usar el cart
	}
	
	$.mobile.navigate("/App/view/orderSubmitted.html");
}
/*===============================================================================================
 Helper Function
 =============================================================================================*/
function refreshPage() {
	$.mobile.changePage(window.location.href, {
		allowSamePageTransition : true,
		transition : 'none',
		showLoadMsg : false,
		reloadPage : true
	});
}
 function clearInfo(){
	s_address_selected = false;
	b_address_selected = false;
	payment_selected = false; 	
 }
 
//Selling
 
$(document).on('pagebeforeshow', "#buying", function(event, ui) {
$.ajax({
		url : "http://bigbox.herokuapp.com/BigBoxServer/buying",
		contentType : "application/json",
		success : function(data, textStatus, jqXHR) {
		 var list=$("#buying_list");
		 var purchase_history = "";
		 console.log("DATA");
		 console.log(data);
		 for (var i=0; i < data.rows.length; i++) {
		 	purchase_history += '<li>Order:'+data.rows[i].o_number+' Item:'+ data.rows[i].i_name;
		 };
		 
		   list.append('<ul data-role="listview" data-theme="d" data-divider-theme="d"  >\
					<li data-role="list-divider" role="heading">Bidding</li>\
					<li data-role="list-divider" role="heading">Purchase History</li>'
					+purchase_history+
					'<li data-role="list-divider" role="heading">Didn\'t Win</li></ul>');
		   
		   list.listview("refresh");
		   
		
		},
        error : function(data, textStatus, jqXHR) {
  	      console.log("textStatus: " + textStatus);
    	  alert("Data not found!");
        }
	});

});

