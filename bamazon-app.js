var mysql = require('mysql');
var inquirer = require('inquirer');
require('console.table');

var connection = mysql.createConnection({
	host:'localhost';
	post:3306;

	user:'root';
	password:'';
	database:'bamazon';
});

connection.connect(function(err){
	if (err) {
		console.error('error connecting: ' + err.stack);
	}
	loadProducts();
})

function loadProducts(){
	connection.query("SELECT * FROM products", function(err, res){
		if (err) throw err;

		console.table(res);

		promptItem(res);
	});
}

function promptItem(inventory){
	inquirer
		.prompt([
			{
				type:'input',
				name:'choice',
				message:'What is the ID of the item you would like to purchase? [Quit with Q]',
				validate: function(val){
					return !isNaN(val) || val.toLowerCase() === 'q';
				}
			}
		])
		.then(function(val){
			checkExit(val.choice);
			var choiceId = parseInt(val.choice);
			var product = checkInventory(choiceId, inventory);

			if (product){
				promptCustomerForQuantity(product);
			}
			else{
				console.log('\nThat item is not in the inventory. Try a different item ID.');
				loadProducts();
			}
		});
}

function promptQuantity(product){
	inquirer
		.prompt([
			{
				type:'input',
				name:'quantity',
				message:'How many would you like? [Quit with Q]',
				validate: function(val){
					return val > 0 || val.toLowerCase() === 'q';
				}
			}
		])
		.then(function(val){
			checkExit(val.quantity);
			var quantity = parseInt(val.quantity);

			if (quantity > product.stock_num){
				console.log("\nWe only have " + product.stock_num + " of those!! Ask for less pls.\n");
				loadProducts();
			} else {
				purchase(product, quantity);
			}
		});
}

function purchase(product, quantity){
	connection.query(
		"UPDATE products SET stock_num = stock_num - ? WHERE item_id = ?",
		[quantity, product.item_id], function(err, res){
			console.log("\nYou've just purchased " + quantity + product.prod_name + "s! Sry, no refunds or returns. Hope you like it?");
			loadProducts();
		}
	);
}

function checkInventory(choiceId, inventory){
	for (var i = 0; i < inventory.length; i++){
		if (inventory[i].item_id === choiceId){
			return inventory[i];
		}
	}
	return null;
}

function checkExit(choice){
	if (choice.toLowerCase() === 'q'){
		console.log('See you later!');
		connection.end();
	}
}