var express = require('express'), http = require('http'), path = require('path');

var app = express();

var pg = require('pg');
var conString = "postgres://klzxnqyrzdnesy:giCp39ZjPjzGGIg-P8j7zEl21c@ec2-107-20-214-225.compute-1.amazonaws.com:5432/d1iov417vkjb04";

var client = new pg.Client(conString);
var user_id;

client.connect(function(err) {
	if (err) {
		return console.error('could not connect to postgres', err);
	}


	var allowCrossDomain = function(req, res, next) {
		res.header('Access-Control-Allow-Origin', '*');
		res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
		res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
		// intercept OPTIONS method
		if ('OPTIONS' == req.method) {
			res.send(200);
		} else {
			next();
		}
	};
	app.configure(function() {
		app.use(allowCrossDomain);
		app.set('port', process.env.PORT || 3412);
		//	app.set('views', __dirname + '/views');
		app.engine('html', require('ejs').renderFile);
		app.use(express.favicon());
		app.use(express.logger('dev'));
		app.use(express.bodyParser());
		app.use(express.methodOverride());
		app.use(express.cookieParser('your secret here'));
		app.use(express.session());
		app.use(app.router);
		//	app.use(require('stylus').middleware(__dirname + '/public'));
		//	app.use(express.static(path.join(__dirname, 'public')));

	});

	app.configure('development', function() {
		app.use(express.errorHandler());
	});

	app.use(express.bodyParser());

	var cookie = new Array();

	var Category = require("./category.js");

	var item = require("./item.js");
	var Item = item.Item;

	var address = require("./address.js");
	var Address = address.Address;
	var addressNextId = 0;
	var addressList = new Array();

	var creditcard = require("./creditcard.js");
	var CreditCard = creditcard.CreditCard;

	var cartItem = require("./cartItem.js");
	var CartItem = cartItem.CartItem;
	
	
	/*  Variables to store the data in the server  */

	/*====================================================================================================================================
	 Get paths
	 ========================================================================================================================================*/
	app.get("/", function(req, res) {
		res.sendfile("index.html");
	});
	app.get("/index.html", function(req, res) {
		res.sendfile("index.html");
	});
	app.get("/App*", function(req, res) {
		console.log(req.params[0]);
		res.sendfile("App" + req.params[0]);
	});
	/*========================================================================================================================================*/

	/*====================================================================================================================================
	 REST Opertaion : HTTP GET
	 ====================================================================================================================================*/

	app.get('/BigBoxServer/rmvcategories', function(req, res) {
		client.query("select  * from category", function(err, result) {
			if (err) {
				return console.error('error running query', err);
			}
			console.log("GET-categories");
			
		client.query("select cid,subid,scname from category natural full join subcategory where subid is not null", function(err, result2) {
			if (err) {
				return console.error('error running query', err);
			}
			console.log("GET-categories");
			
		client.query("select cid,subid,ssubid,sscname from subcategory natural full join secondsubcategory where ssubid is not null", function(err, result3) {
			if (err) {
				return console.error('error running query', err);
			}
			console.log("GET-categories");

			var response = {
				"categories" : result.rows,
				"subcategories" : result2.rows,
				"secsubcategories" : result3.rows
			};
			console.log("reponse:" + JSON.stringify(response));
			res.json(response);
		});
		});
		});
	});



	app.get('/BigBoxServer/categories', function(req, res) {
		client.query("select  cid,cname,count(subid) from category natural full join subcategory group by cid, cname", function(err, result) {
			if (err) {
				return console.error('error running query', err);
			}
			console.log("GET-categories");

			var response = {
				"categories" : result.rows
			};
			console.log("reponse:" + JSON.stringify(response));
			res.json(response);
		});
	});

	app.get('/BigBoxServer/subcategories/:id', function(req, res) {
		var id = req.params.id;
		console.log("id send:" + id);
		client.query("select  subid,scname,count(ssubid) from subcategory natural full join secondsubcategory group by subid, scname ,cid having cid = " + id, function(err, result) {
			if (err) {
				return console.error('error running query', err);
			}
			console.log(" " + result.rows.scname);
			var id = req.params.id;
			console.log("GET item: " + id);

			var response = {
				"categories" : result.rows
			};
			console.log("reponse:" + JSON.stringify(response));
			res.json(response);

		});
	});

	app.get('/BigBoxServer/2subcategories/:id', function(req, res) {
		var id = req.params.id;
		console.log("subid send:" + id);
		client.query("SELECT * from category natural join subcategory natural join secondsubcategory where subid = " + id, function(err, result) {
			if (err) {
				return console.error('error running query', err);
			}
			console.log(" " + result.rows[0].sscname);
			var id = req.params.id;
			console.log("GET item: " + id);

			var response = {
				"categories" : result.rows
			};
			res.json(response);

		});
	});




	app.get('/BigBoxServer/itemsearchbycat/:currentcid/:currentcid2/:currentcid3', function(req, res) {
			var cidValue = req.params.currentcid;
			var subidValue = req.params.currentcid2;
			var ssubidValue = req.params.currentcid3;
			
			console.log("cidValue: "+cidValue );
					
			client.query("select * from items where cid = " + cidValue + "and subid =" + subidValue + "and ssubid ="+ssubidValue, function(err, result) {
				if (err) {
					return console.error('error running query', err);
				}
				console.log(" " + JSON.stringify(result.rows[0]));
				var response = {
					"items" : result.rows
				};
				res.json(response);
			});
		});


	app.get('/BigBoxServer/itemsearch/:searchValue', function(req, res) {
		var searchValue = req.params.searchValue;
		console.log("searchValue: " + searchValue.slice(1, searchValue.length));

		//Use to improve search (Case Insensitive and Space Insensitive)
		var Upper = "";
		Upper = Upper.concat(searchValue.toUpperCase());
		Upper = Upper.replace(/ /g, "%");
		console.log("upper:" + Upper);
		console.log("GET-itemS");

		client.query("select * from items where upper(replace(i_name, ' ', '')) like '%" + Upper + "%'", function(err, result) {
			if (err) {
				return console.error('error running query', err);
			}
			console.log(" " + JSON.stringify(result.rows[0]));
			var response = {
				"items" : result.rows
			};
			res.json(response);
		});
	});

	//Read all items in the cart
	app.get('/BigBoxServer/cart', function(req, res) {
		console.log("GET-CART for user" + user_id);

		client.query("SELECT * FROM (cart_items natural join users natural join cart) as thecarts, items  WHERE thecarts.i_id = items.i_id AND thecarts.u_id =" + user_id + "and cart_id%2!=0", function(err, result) {
			if (err) {
				return console.error('error running query', err);
			}
			console.log(" " + result.rows);

			var response = {
				"cart" : result.rows
			};
			res.json(response);
		});
	});

	//Read all the addresses that a user has saved
	app.get('/BigBoxServer/addresses', function(req, res) {
		console.log("GET-ADDRESSES for user" + user_id);

		client.query("SELECT * FROM users natural join addresses natural join user_addresses  WHERE u_id =" + user_id, function(err, result) {
			if (err) {
				return console.error('error running query', err);
			}
			console.log(" " + result.rows);

			var response = {
				"addresses" : result.rows
			};
			res.json(response);
		});
	});

	//Read all the credit card that a user has saved
	app.get('/BigBoxServer/creditcards', function(req, res) {
		console.log("GET CREDIT CARDS for user" + user_id);
		client.query("SELECT * FROM users natural join user_creditcards natural join creditcards  WHERE u_id =" + user_id, function(err, result) {
			if (err) {
				return console.error('error running query', err);
			}
			console.log(" " + result.rows);

			var response = {
				"creditcards" : result.rows
			};
			res.json(response);
		});
	});

	//Read a car based on its id
	app.get('/BigBoxServer/items/:id', function(req, res) {
		var id = req.params.id;
		console.log("GET item: " + id);

		client.query("select * from items where i_id = " + id, function(err, result) {
			if (err) {
				return console.error('error running query', err);
			}
			console.log(" " + JSON.stringify(result.rows));
			var response = {
				"items" : result.rows
			};
			res.json(response);
		});
	});

	//Read an address based on its id
	app.get('/BigBoxServer/addresses/:id', function(req, res) {
		var id = req.params.id;
		console.log("GET address: " + id);
		client.query("select * from addresses where a_id = " + id, function(err, result) {
			if (err) {
				return console.error('error running query', err);
			}
			console.log(" " + JSON.stringify(result.rows));
			var response = {
				"address" : result.rows
			};
			res.json(response);
		});

	});

	//Read a credit card based on its id
	app.get('/BigBoxServer/creditcards/:id', function(req, res) {
		console.log(req.params);
		var id = req.params.id;
		console.log("GET credit card " + id);

		client.query("select * from creditcards where cc_number = '" + id + "'", function(err, result) {
			if (err) {
				return console.error('error running query', err);
			}
			console.log(" " + JSON.stringify(result.rows));
			var response = {
				"creditcard" : result.rows
			};
			res.json(response);
		});
	});

	//Verify if user a user is logged
	app.get('/BigBoxServer/verify/', function(req, res) {

		// if user is not logged in, ask them to login
		console.log(cookie[0]);
		if (cookie[0] != undefined) {
			console.log("made it");
			if ( typeof cookie[0].username == 'undefined') {
				console.log("then here");
				res.send(401, "Please Login.");
			} else {

				var queryString = "select * from users where u_username = $1";

				client.query(queryString, [cookie[0].username], function(err, result) {
					if (err) {
						return console.error('error running query', err);
					} else {

						var response = {
							"user" : result.rows
						};
						user_id = result.rows[0].u_id;
						console.log("Response: " + JSON.stringify(response));
						res.json(result);

					}
				});
			}
		} else
			res.send(200);
		//catch bug when reloading site after user is logged in
	});

	//User logout, back to home page
	app.get('/BigBoxServer/logout', function(req, res) {
		// delete the session variable
		cookie.pop();
		res.send(200);

	});

	app.get('/BigBoxServer/account', function(req, res) {

		if (!isLoggedIn(cookie[0].username)) {
			res.send(401, "Please Login.");
		} else
			res.send(200);
	});
	
	
	app.get('/BigBoxServer/buying', function(req, res) {

				var queryString = " select u_username,o_number,i_name,i_id,i_price,i_img " +
				"from ( select o_number,i_id,i_name,u_id,i_price,i_img " +
				       "from (select o_number,i_id,i_name,i_price,i_img from items natural " +
				       		 "join items_orders)as tmp natural join orders) as a " +
					         "natural join users where u_username=$1 ";
				
								   
				var queryBid = 'select i_id,i_img,i_name,i_bid\
				from(select bid_id, i_id, seller_id,buyer_id, sold, i_name, i_bid,i_img\
				from bids natural join items) as tmp natural join users\
				where buyer_id = u_id and u_username = $1';
				var response ="";

				client.query(queryString,[cookie[0].username],function(err, result) {
					if (err) {
						return console.error('error running query', err);
					} else {

						response = '{ "item" : '+JSON.stringify(result.rows);
					
						console.log("RESPONSE");
						console.log(response);


					}
				});
				
						client.query(queryBid,[cookie[0].username],function(err, result) {
					if (err) {
						return console.error('error running query', err);
					} else {
						
						temp = ',"bid" :'+ JSON.stringify(result.rows) + "}";
						
						response = JSON.stringify(response +temp);
						
						console.log("REPONSE 2");
						console.log(response);
						
						res.json(JSON.parse(response));
						

					}
				});
		});
	
	
		
	app.get('/BigBoxServer/buying', function(req, res) {


				var queryString = "select i_id,i_img,i_name,u_username,i_price\
								   from items natural join users\
								   where u_username=$1";
								   
					console.log("COOKIE");
					console.log(cookie);
					console.log("USER ID");
					console.log(cookie[0]);

				client.query(queryString,[cookie[0].username],function(err, result) {
					if (err) {
						return console.error('error running query', err);
					} else {

						var response = {
							"item" : result.rows
						};
						console.log("Response: " + JSON.stringify(response));
						res.json(result);

					}
				});
			
		});
	
		
	app.get('/BigBoxServer/report', function(req, res) {


				var queryString = "select SUM(o_totalprice) as total, o_date\
								   from orders\
								   group by  o_date order by o_date DESC";

				client.query(queryString,function(err, result) {
					if (err) {
						return console.error('error running query', err);
					} else {

						var response = {
							"total" : result.rows
						};
						console.log("Response: " + JSON.stringify(response));
						res.json(result);

					}
				});
			
	});
		
	
	/*====================================================================================================================================
	REST Opertaion : HTTP POST
	====================================================================================================================================*/

	//Add a new order
	app.post('/BigBoxServer/orders', function(req, res) {
		console.log("POST ORDER");
		console.log("ORDER =" + req.body);
		
		var queryString = "INSERT INTO orders( o_totalprice, o_shippingprice, o_date, u_id, s_address_id, b_address_id) " +
						  "VALUES(" + req.body.totalPrice + "," + req.body.shippingTotal + ", NOW()," + user_id + "," + req.body.shippingAddress + "," + req.body.billingAddress + ")";
						   
		client.query(queryString,function(err, result) {
					if (err) {
						return console.error('error running query', err);
					}else{
					console.log("Query 1 done")
					res.json(true);
					}
		});
		var value = "";
		console.log("Length: " + req.body.items.length);
		console.log("Item 0: " + req.body.items[0].i_name);
		for (i=0; i<req.body.items.length; i++){
			value+="(" + req.body.items[i].i_id + ", lastvalue(), "+ req.body.items[i].qtyToPurchase+ ")";
			if(i<req.body.items.length-1)
				value+=",";		
		}
		console.log("Value: " + value);
			
		var itemsOrderQuery = "INSERT INTO items_orders (i_id, o_number, quantity) " +
						" VALUES " + value ;
		console.log("Query 2: " + itemsOrderQuery);						   
	   	client.query(itemsOrderQuery,function(err, result) {
					if (err) {
						return console.error('error running query 2', err);
					} else {
						console.log("Query 2 Done!")
						res.json(true);
					}
		});
 
	});




	//Add a new address to the saved addresses
	app.post('/BigBoxServer/addresses', function(req, res) {
		console.log("POST ADDRESS");

		if (!req.body.hasOwnProperty('name') || !req.body.hasOwnProperty('street') || !req.body.hasOwnProperty('city') || !req.body.hasOwnProperty('state') || !req.body.hasOwnProperty('zip') || !req.body.hasOwnProperty('country') || !req.body.hasOwnProperty('phone')) {
			res.statusCode = 400;
			return res.send('Error: Missing fields for the item.');
		}

		var newAddress = new Address(req.body.name, req.body.street, req.body.city, req.body.state, req.body.zip, req.body.country, req.body.phone);		console.log("New Address: " + JSON.stringify(newAddress));
		newAddress.id = addressNextId++;
		addressList.push(newAddress);
		res.json(true);
	});

	//Add a credit card to the saved list
	app.post('/BigBoxServer/creditcards', function(req, res) {
		console.log("POST CREDIT CARD");

		if (!req.body.hasOwnProperty('cardnumber') || !req.body.hasOwnProperty('exp_month') || !req.body.hasOwnProperty('exp_year') || !req.body.hasOwnProperty('holder_name')) {
			res.statusCode = 400;
			return res.send('Error: Missing fields for the item.');
		}

		var newCreditCard = new CreditCard(req.body.cardnumber, req.body.exp_month, req.body.exp_year, req.body.holder_name);
		console.log("New Address: " + JSON.stringify(newCreditCard));
		newCreditCard.id = creditcardNextId++;
		creditcardList.push(newCreditCard);
		res.json(true);
	});

	//Login

	app.post('/BigBoxServer/user', function(req, res) {
		// if the username is not submitted, give it a default of "Anonymous"
		//user = findByUsername(req.body.username);
		// store the username as a session variable

		var queryString = "select * from users where u_username = $1 and u_password = $2";

		client.query(queryString, [req.body.username, req.body.password], function(err, result) {
			if (err) {
				return console.error('error running query', err);
			}
			console.log("QWERTY " + JSON.stringify(result.rows));
			if (JSON.stringify(result.rows) == "[]") {
				res.send(404, "Please Login.");
			} else {
				var response = {
					"user" : result.rows
				};
				user_id = result.rows[0].u_id;
				req.session.username = req.body.username;
				cookie.pop();
				cookie.push(req.session);
				res.json(response);
			}

		});
	});

	//Login
//	app.post('/BigBoxServer/user', function(req, res) {
		// if the username is not submitted, give it a default of "Anonymous"

//		user = findByUsername(req.body.username);
		// store the username as a session variable

//		if (req.body.username == user.username && req.body.password == user.password) {
//			req.session.username = req.body.username;
//			cookie.push(req.session);
//			res.send(200);
//		} else {
//
//			res.send(401, "Incorect username or password.");
//		}
//	});

	app.post('/BigBoxServer/register', function(req, res) {
		var temp = new Array(req.body.fname, req.body.lname, req.body.address, req.body.city, req.body.state, req.body.country, req.body.zipcode, req.body.phone, req.body.new_username, req.body.email, req.body.new_password, req.body.question, req.body.answer);
		console.log(temp.length);
		var val = isValid(temp, req.body.renter);
		if (val != "valid") {
			res.send(400, val);
		} else {

			adduser(temp);
			res.send(200);
		}

	});
	
	app.post('/BigBoxServer/searchUser', function(req, res) {
		console.log("req.body:");
		console.log(req.body);

		var queryString = "select u_fname, u_lname,u_username, u_admin from users where u_username like $1";
		if (req.body.value == '%%')
			req.body.value = "";

		client.query(queryString, [req.body.value], function(err, result) {
			if (err) {
				return console.error('error running query', err);
			} else {
				var response = {
					"user" : result.rows
				};
				console.log("Response: " + JSON.stringify(response));
				res.json(result);

			}
		});

	});
	app.post('/BigBoxServer/recoverPassword', function(req, res) {

		var queryString = "select u_username, u_password from users where u_username = $1";

		client.query(queryString, [req.body.username], function(err, result) {
			if (err) {
				return console.error('error running query', err);
			} else {

				var response = {
					"user" : result.rows

				};
				console.log("Response: " + JSON.stringify(response));
				res.json(result);

			}

		});
	});

	/*====================================================================================================================================
	REST Opertaion : HTTP PUT
	====================================================================================================================================*/
	//Add an item to the cart
	app.put('/BigBoxServer/cart/:id', function(req, res) {
		var id = req.params.id;
		console.log("PUT");
		console.log(req.body);
		var itemToAdd = new CartItem(req.body.name, req.body.buyItNow, req.body.price, req.body.img, req.body.condition, req.body.hasBid, 1, req.body.shippingPrice);
		console.log("PUT after creating object");
		itemToAdd.id = id;
		console.log("PUT:" + itemToAdd);
		var target = -1;
		for (var i = 0; i < cartList.length; ++i) {
			if (cartList[i].id == id) {
				target = i;
				break;
			}
		}
		console.log("Item to add: " + JSON.stringify(itemToAdd));
		if (target == -1) {
			cartList.push(itemToAdd);
			res.json(true);
		} else {
			var theitem = cartList[target];
			theitem.qtyToPurchase++;
			var response = {
				"Item" : theitem
			};
			res.json(response);
		}
	});

	app.put('/BigBoxServer/items/:id', function(req, res) {
		var id = req.params.id;

		console.log("PUT item: " + id);
		console.log(req.body);
		if ((id < 0) || (id >= itemNextId)) {
			// not found
			res.statusCode = 404;
			res.send("Item not found.");
		} else if (!req.body.hasOwnProperty('img') || !req.body.hasOwnProperty('info') || !req.body.hasOwnProperty('price')) {
			res.statusCode = 400;
			return res.send('Error: Missing fields for the item.');
		} else {
			var target = -1;
			for (var i = 0; i < itemList.length; ++i) {
				if (itemList[i].id == id) {
					target = i;
					break;
				}
			}
			if (target == -1) {
				res.statusCode = 404;
				res.send("Item not found.");
			} else {
				var theitem = itemList[target];
				theitem.bid = req.body.bid;
				theitem.name = req.body.name;
				theitem.model = req.body.model;
				theitem.year = req.body.year;
				theitem.info = req.body.info;
				theitem.buyItNow = req.body.buyItNow;
				theitem.price = req.body.price;
				theitem.img = req.body.img;
				theitem.dimension = " " + req.body.width + "x" + req.body.length + "x" + req.body.heigth;
				theitem.weigth = req.body.weigth;
				theitem.shipTo = req.body.shipTo;
				theitem.shipFrom = req.body.shipFrom;
				theitem.condition = req.body.condition;
				theitem.hasBid = req.body.hasBid;
				theitem.bid = req.body.bid;
				theitem.seller = req.body.seller;
				theitem.shippingPrice = req.body.shippingPrice;
				var response = {
					"item" : theitem
				};
				res.json(response);
			}
		}
	});


	app.put('/BigBoxServer/updateAdmin', function(req, res) {
		console.log("req.body:");
		console.log(req.body);

		var updateQuery = "update users set u_admin=$1 where u_username=$2";
		var verifyQuery = "select u_username, u_admin from users where u_username=$1";
		var username = req.body.username + "";
		username = username.replace(/\s/g, "");
		if (username == cookie[0].username)
			res.send(401);
		else {
			client.query(updateQuery, [!req.body.isAdmin, req.body.username], function(err, result) {
				if (err) {
					return console.error('error running query', err);
				} else {
					client.query(verifyQuery, [req.body.username], function(err, result) {
						var response = {
							"user" : result.rows
						};
						res.json(result);

					});

				}
			});
		}

	});
	/*====================================================================================================================================
	REST Opertaion : HTTP DELETE
	====================================================================================================================================*/
	//Remove item from cart
	app.del('/BigBoxServer/cart/:id', function(req, res) {
		var id = req.params.id;
		console.log("DELETE item: " + id);

		if ((id < 0) || (id >= itemNextId)) {
			// not found
			res.statusCode = 404;
			res.send("Item not found.");
		} else {
			var target = -1;
			for (var i = 0; i < cartList.length; ++i) {
				if (cartList[i].id == id) {
					target = i;
					break;
				}
			}
			if (target == -1) {
				res.statusCode = 404;
				res.send("Car not found.");
			} else {
				cartList.splice(target, 1);
				res.json(true);
			}
		}
	});

	/*====================================================================================================================================
	 Support Functions
	 ====================================================================================================================================*/

	function findByUsername(username) {
		for (var i = 0, len = users.length; i < len; i++) {
			var user = users[i];
			if (user.username === username) {
				return user;
			}
		}
		return users[0];
	};

	function isLoggedIn(user) {
		if (user == undefined)
			return false;
		else
			return true;

	};

	function adduser(arr) {

		users = users.concat({
			id : users.length,
			fname : arr[0],
			lname : arr[1],
			address : arr[2],
			city : arr[3],
			state : arr[4],
			country : arr[5],
			zipcode : arr[6],
			phone : arr[7],
			username : arr[8],
			email : arr[9],
			password : arr[10],
			question : arr[11],
			answer : arr[12]
		});

		return users[users.length - 1];
	}

	function isValid(arr, renter) {

		for (var i = 0; i < arr.length; i++) {
			console.log(i);
			console.log(arr);
			if (arr[i].length == 0)
				return "Form is not complete.";
		};
		console.log("validating");

		if (arr[10] != renter)
			return "Passwords don't match.";
		console.log("users");

		console.log(users);

		for (var i = 0; i < users.length; i++) {
			if (arr[8] == users[i])
				return "Username " + arr[8] + " is already taken.";
			else if (arr[9] == users[i])
				return "Email " + arr[9] + " is already registerd.";
		};

		return "valid";
	};

	// Server starts running when listen is called.
	app.listen(process.env.PORT || 3412);
	console.log("server listening port:");

});

