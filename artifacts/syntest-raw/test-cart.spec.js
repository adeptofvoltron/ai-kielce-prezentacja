// Imports
import chai from 'chai'
import chaiAsPromised from 'chai-as-promised'
const expect = chai.expect;
chai.use(chaiAsPromised);

describe('cart', function() {
	let Cart;
	beforeEach(() => {
		// This is a hack to force the require cache to be emptied
		// Without this we would be using the same required object for each test
		delete require.cache[require.resolve("../../dist/cart.js")];
		({Cart} = require("../../dist/cart.js"));
	});

	it("Test 1 for 'cart'", async () => {
		// Meta information
		// Selected for objective: /repo/dist/cart.js:13:4:::16:5:::241:317
		// Selected for objective: /repo/dist/cart.js:33:4:::42:5:::947:1313
		// Selected for objective: /repo/dist/cart.js:35:12:::35:72:::1028:1088
		// Selected for:
		// 	RangeError: quantity must be a positive integer
		// 	    at Cart.remove (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/instrumented/dist/cart.js:1412:13)
		// 	    at call (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/tests/tempTest.spec.js:17:40)
		// 	    at Generator._invoke (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/tests/tempTest.spec.js:2:1)
		// 	    at Generator.next (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/tests/tempTest.spec.js:2:1)
		// 	    at asyncGeneratorStep (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/tests/tempTest.spec.js:2:1)
		// 	    at _next (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/tests/tempTest.spec.js:2:1)
		// 	    at /repo/.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/tests/tempTest.spec.js:2:1
		// 	    at new Promise (<anonymous>)
		// 	    at Context.<anonymous> (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/tests/tempTest.spec.js:2:1)
		// 	    at processImmediate (node:internal/timers:504:21)
		// 
		// Covers objective: /repo/dist/cart.js:13:4:::16:5:::241:317
		// Covers objective: /repo/dist/cart.js:35:12:::35:72:::1028:1088
		// Covers objective: /repo/dist/cart.js:33:4:::42:5:::947:1313
		
		// Test
		const cart = new Cart()
		const sku = null;
		const qty = -692;
		
		// Assertions
		await expect((async () => {
			await cart.remove(sku, qty)
		})()).to.be.rejectedWith(`quantity must be a positive integer`)
	})

	it("Test 2 for 'cart'", async () => {
		// Meta information
		// Selected for objective: placeholder:::/repo/dist/cart.js:34:8:::36:9:::974:1098
		// Selected for objective: /repo/dist/cart.js:39:12:::39:47:::1219:1254
		// Selected for:
		// 	Error: sku not in cart
		// 	    at Cart.remove (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/instrumented/dist/cart.js:1432:13)
		// 	    at call (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/tests/tempTest.spec.js:17:56)
		// 	    at Generator._invoke (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/tests/tempTest.spec.js:2:1)
		// 	    at Generator.next (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/tests/tempTest.spec.js:2:1)
		// 	    at asyncGeneratorStep (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/tests/tempTest.spec.js:2:1)
		// 	    at _next (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/tests/tempTest.spec.js:2:1)
		// 	    at /repo/.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/tests/tempTest.spec.js:2:1
		// 	    at new Promise (<anonymous>)
		// 	    at Context.<anonymous> (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/tests/tempTest.spec.js:2:1)
		// 	    at processImmediate (node:internal/timers:504:21)
		// 
		// Covers objective: /repo/dist/cart.js:13:4:::16:5:::241:317
		// Covers objective: /repo/dist/cart.js:39:12:::39:47:::1219:1254
		// Covers objective: /repo/dist/cart.js:35:12:::35:72:::1028:1088
		// Covers objective: placeholder:::/repo/dist/cart.js:34:8:::36:9:::974:1098
		// Covers objective: /repo/dist/cart.js:33:4:::42:5:::947:1313
		
		// Test
		const cart = new Cart()
		const sku = () => {};
		const qty = 5000;
		const anon = new Cart()
		
		// Assertions
		await expect((async () => {
			await cart.remove(sku, qty, anon)
		})()).to.be.rejectedWith(`sku not in cart`)
	})

	it("Test 3 for 'cart'", async () => {
		// Meta information
		// Selected for objective: /repo/dist/cart.js:54:4:::64:5:::1662:2038
		// Covers objective: /repo/dist/cart.js:13:4:::16:5:::241:317
		// Covers objective: /repo/dist/cart.js:39:12:::39:47:::1219:1254
		// Covers objective: /repo/dist/cart.js:35:12:::35:72:::1028:1088
		// Covers objective: placeholder:::/repo/dist/cart.js:34:8:::36:9:::974:1098
		// Covers objective: /repo/dist/cart.js:33:4:::42:5:::947:1313
		// Covers objective: /repo/dist/cart.js:54:4:::64:5:::1662:2038
		
		// Test
		const cart = new Cart()
		const totalReturnValue = await cart.total()
		const cart1 = new Cart()
		const sku = -368;
		const qty = 470.9453086612907;
		
		// Assertions
		expect(totalReturnValue).to.equal(0)
		await expect((async () => {
			await cart1.remove(sku, qty)
		})()).to.be.rejectedWith(`quantity must be a positive integer`)
	})

	it("Test 4 for 'cart'", async () => {
		// Meta information
		// Selected for objective: /repo/dist/cart.js:43:4:::52:5:::1318:1618
		// Selected for objective: /repo/dist/cart.js:46:12:::46:46:::1418:1452
		// Selected for:
		// 	Error: unknown coupon
		// 	    at Cart.applyCoupon (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/instrumented/dist/cart.js:1453:13)
		// 	    at call (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/tests/tempTest.spec.js:17:56)
		// 	    at Generator._invoke (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/tests/tempTest.spec.js:2:1)
		// 	    at Generator.next (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/tests/tempTest.spec.js:2:1)
		// 	    at asyncGeneratorStep (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/tests/tempTest.spec.js:2:1)
		// 	    at _next (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/tests/tempTest.spec.js:2:1)
		// 	    at /repo/.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/tests/tempTest.spec.js:2:1
		// 	    at new Promise (<anonymous>)
		// 	    at Context.<anonymous> (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/tests/tempTest.spec.js:2:1)
		// 	    at processImmediate (node:internal/timers:504:21)
		// 
		// Covers objective: /repo/dist/cart.js:13:4:::16:5:::241:317
		// Covers objective: /repo/dist/cart.js:39:12:::39:47:::1219:1254
		// Covers objective: /repo/dist/cart.js:35:12:::35:72:::1028:1088
		// Covers objective: placeholder:::/repo/dist/cart.js:34:8:::36:9:::974:1098
		// Covers objective: /repo/dist/cart.js:33:4:::42:5:::947:1313
		// Covers objective: /repo/dist/cart.js:46:12:::46:46:::1418:1452
		// Covers objective: /repo/dist/cart.js:43:4:::52:5:::1318:1618
		// Covers objective: /repo/dist/cart.js:54:4:::64:5:::1662:2038
		
		// Test
		const cart = new Cart()
		const anon = 29;
		const code = new Cart(anon)
		const anon1 = 40;
		
		// Assertions
		await expect((async () => {
			await cart.applyCoupon(code, anon1)
		})()).to.be.rejectedWith(`unknown coupon`)
	})

	it("Test 5 for 'cart'", async () => {
		// Meta information
		// Selected for:
		// 	Error: sku not in cart
		// 	    at Cart [as remove] (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/instrumented/dist/cart.js:1432:13)
		// 	    at call (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/tests/tempTest.spec.js:18:21)
		// 	    at Generator._invoke (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/tests/tempTest.spec.js:2:1)
		// 	    at Generator.next (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/tests/tempTest.spec.js:2:1)
		// 	    at asyncGeneratorStep (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/tests/tempTest.spec.js:2:1)
		// 	    at _next (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/tests/tempTest.spec.js:2:1)
		// 	    at /repo/.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/tests/tempTest.spec.js:2:1
		// 	    at new Promise (<anonymous>)
		// 	    at Context.<anonymous> (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/tests/tempTest.spec.js:2:1)
		// 	    at processImmediate (node:internal/timers:504:21)
		// 
		// Covers objective: /repo/dist/cart.js:13:4:::16:5:::241:317
		// Covers objective: /repo/dist/cart.js:39:12:::39:47:::1219:1254
		// Covers objective: /repo/dist/cart.js:35:12:::35:72:::1028:1088
		// Covers objective: placeholder:::/repo/dist/cart.js:34:8:::36:9:::974:1098
		// Covers objective: /repo/dist/cart.js:33:4:::42:5:::947:1313
		// Covers objective: /repo/dist/cart.js:46:12:::46:46:::1418:1452
		// Covers objective: /repo/dist/cart.js:43:4:::52:5:::1318:1618
		// Covers objective: /repo/dist/cart.js:54:4:::64:5:::1662:2038
		
		// Test
		const cart = new Cart()
		const anon = 29;
		const anon1 = null;
		const sku = new Cart(anon, anon1)
		const qty = 29;
		const anon2 = true;
		
		// Assertions
		await expect((async () => {
			await cart.remove(sku, qty, anon2)
		})()).to.be.rejectedWith(`sku not in cart`)
	})

	it("Test 6 for 'cart'", async () => {
		// Meta information
		// Selected for:
		// 	Error: unknown coupon
		// 	    at Cart.remove [as applyCoupon] (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/instrumented/dist/cart.js:1453:13)
		// 	    at call (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/tests/tempTest.spec.js:17:40)
		// 	    at Generator._invoke (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/tests/tempTest.spec.js:2:1)
		// 	    at Generator.next (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/tests/tempTest.spec.js:2:1)
		// 	    at asyncGeneratorStep (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/tests/tempTest.spec.js:2:1)
		// 	    at _next (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/tests/tempTest.spec.js:2:1)
		// 	    at /repo/.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/tests/tempTest.spec.js:2:1
		// 	    at new Promise (<anonymous>)
		// 	    at Context.<anonymous> (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/tests/tempTest.spec.js:2:1)
		// 	    at processImmediate (node:internal/timers:504:21)
		// 
		// Covers objective: /repo/dist/cart.js:13:4:::16:5:::241:317
		// Covers objective: /repo/dist/cart.js:39:12:::39:47:::1219:1254
		// Covers objective: /repo/dist/cart.js:35:12:::35:72:::1028:1088
		// Covers objective: placeholder:::/repo/dist/cart.js:34:8:::36:9:::974:1098
		// Covers objective: /repo/dist/cart.js:33:4:::42:5:::947:1313
		// Covers objective: /repo/dist/cart.js:46:12:::46:46:::1418:1452
		// Covers objective: /repo/dist/cart.js:43:4:::52:5:::1318:1618
		// Covers objective: /repo/dist/cart.js:54:4:::64:5:::1662:2038
		
		// Test
		const cart = new Cart()
		const code = () => {};
		const anon = 29;
		
		// Assertions
		await expect((async () => {
			await cart.applyCoupon(code, anon)
		})()).to.be.rejectedWith(`unknown coupon`)
	})

	it("Test 7 for 'cart'", async () => {
		// Meta information
		// Selected for:
		// 	Error: unknown coupon
		// 	    at Cart.addReturnValue [as applyCoupon] (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/instrumented/dist/cart.js:1453:13)
		// 	    at call (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/tests/tempTest.spec.js:22:9)
		// 	    at Generator._invoke (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/tests/tempTest.spec.js:2:1)
		// 	    at Generator.next (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/tests/tempTest.spec.js:2:1)
		// 	    at asyncGeneratorStep (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/tests/tempTest.spec.js:2:1)
		// 	    at _next (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/tests/tempTest.spec.js:2:1)
		// 
		// Covers objective: /repo/dist/cart.js:13:4:::16:5:::241:317
		// Covers objective: /repo/dist/cart.js:39:12:::39:47:::1219:1254
		// Covers objective: /repo/dist/cart.js:35:12:::35:72:::1028:1088
		// Covers objective: placeholder:::/repo/dist/cart.js:34:8:::36:9:::974:1098
		// Covers objective: /repo/dist/cart.js:33:4:::42:5:::947:1313
		// Covers objective: /repo/dist/cart.js:46:12:::46:46:::1418:1452
		// Covers objective: /repo/dist/cart.js:43:4:::52:5:::1318:1618
		// Covers objective: /repo/dist/cart.js:54:4:::64:5:::1662:2038
		
		// Test
		const cart = new Cart()
		const totalReturnValue = await cart.total()
		const cart1 = new Cart()
		const totalReturnValue1 = await cart1.total()
		const cart2 = new Cart()
		const code = {}
		const anon = "R!Kg=(\\V>_; 8^lI.ZWe%";
		
		// Assertions
		expect(totalReturnValue).to.equal(0)
		expect(totalReturnValue1).to.equal(0)
		await expect((async () => {
			await cart2.applyCoupon(code, anon)
		})()).to.be.rejectedWith(`unknown coupon`)
	})

	it("Test 8 for 'cart'", async () => {
		// Meta information
		// Selected for objective: /repo/dist/cart.js:17:4:::31:5:::322:889
		// Selected for objective: placeholder:::/repo/dist/cart.js:18:8:::20:9:::358:505
		// Selected for objective: /repo/dist/cart.js:22:12:::22:72:::568:628
		// Selected for:
		// 	RangeError: quantity must be a positive integer
		// 	    at Cart.removeReturnValue [as add] (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/instrumented/dist/cart.js:1367:13)
		// 	    at call (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/tests/tempTest.spec.js:17:9)
		// 	    at Generator._invoke (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/tests/tempTest.spec.js:2:1)
		// 	    at Generator.next (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/tests/tempTest.spec.js:2:1)
		// 	    at asyncGeneratorStep (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/tests/tempTest.spec.js:2:1)
		// 	    at _next (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/tests/tempTest.spec.js:2:1)
		// 	    at /repo/.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/tests/tempTest.spec.js:2:1
		// 	    at new Promise (<anonymous>)
		// 	    at Context.<anonymous> (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/tests/tempTest.spec.js:2:1)
		// 	    at processImmediate (node:internal/timers:504:21)
		// 
		// Covers objective: /repo/dist/cart.js:13:4:::16:5:::241:317
		// Covers objective: /repo/dist/cart.js:22:12:::22:72:::568:628
		// Covers objective: placeholder:::/repo/dist/cart.js:18:8:::20:9:::358:505
		// Covers objective: /repo/dist/cart.js:17:4:::31:5:::322:889
		// Covers objective: /repo/dist/cart.js:39:12:::39:47:::1219:1254
		// Covers objective: /repo/dist/cart.js:35:12:::35:72:::1028:1088
		// Covers objective: placeholder:::/repo/dist/cart.js:34:8:::36:9:::974:1098
		// Covers objective: /repo/dist/cart.js:33:4:::42:5:::947:1313
		// Covers objective: /repo/dist/cart.js:46:12:::46:46:::1418:1452
		// Covers objective: /repo/dist/cart.js:43:4:::52:5:::1318:1618
		// Covers objective: /repo/dist/cart.js:54:4:::64:5:::1662:2038
		
		// Test
		const cart = new Cart()
		const sku = 39;
		const priceGrosz = 2;
		const qty = []
		const anon = -331.6419626744557;
		
		// Assertions
		await expect((async () => {
			await cart.add(sku, priceGrosz, qty, anon)
		})()).to.be.rejectedWith(`quantity must be a positive integer`)
	})

	it("Test 9 for 'cart'", async () => {
		// Meta information
		// Selected for objective: /repo/dist/cart.js:19:12:::19:82:::425:495
		// Selected for:
		// 	RangeError: price must be a non-negative integer of grosz
		// 	    at Cart [as add] (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/instrumented/dist/cart.js:1352:13)
		// 	    at call (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/tests/tempTest.spec.js:18:21)
		// 	    at Generator._invoke (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/tests/tempTest.spec.js:2:1)
		// 	    at Generator.next (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/tests/tempTest.spec.js:2:1)
		// 	    at asyncGeneratorStep (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/tests/tempTest.spec.js:2:1)
		// 	    at _next (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/tests/tempTest.spec.js:2:1)
		// 	    at /repo/.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/tests/tempTest.spec.js:2:1
		// 	    at new Promise (<anonymous>)
		// 	    at Context.<anonymous> (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/tests/tempTest.spec.js:2:1)
		// 	    at processImmediate (node:internal/timers:504:21)
		// 
		// Covers objective: /repo/dist/cart.js:13:4:::16:5:::241:317
		// Covers objective: /repo/dist/cart.js:22:12:::22:72:::568:628
		// Covers objective: /repo/dist/cart.js:19:12:::19:82:::425:495
		// Covers objective: placeholder:::/repo/dist/cart.js:18:8:::20:9:::358:505
		// Covers objective: /repo/dist/cart.js:17:4:::31:5:::322:889
		// Covers objective: /repo/dist/cart.js:39:12:::39:47:::1219:1254
		// Covers objective: /repo/dist/cart.js:35:12:::35:72:::1028:1088
		// Covers objective: placeholder:::/repo/dist/cart.js:34:8:::36:9:::974:1098
		// Covers objective: /repo/dist/cart.js:33:4:::42:5:::947:1313
		// Covers objective: /repo/dist/cart.js:46:12:::46:46:::1418:1452
		// Covers objective: /repo/dist/cart.js:43:4:::52:5:::1318:1618
		// Covers objective: /repo/dist/cart.js:54:4:::64:5:::1662:2038
		
		// Test
		const cart = new Cart()
		const sku = 1;
		const priceGrosz = () => {};
		const qty = 79;
		const anon = () => {};
		const anon1 = "§M|]2o.!#o8wHfu^^AYBA} r±% §k";
		
		// Assertions
		await expect((async () => {
			await cart.add(sku, priceGrosz, qty, anon, anon1)
		})()).to.be.rejectedWith(`price must be a non-negative integer of grosz`)
	})

	it("Test 10 for 'cart'", async () => {
		// Meta information
		// Selected for objective: placeholder:::/repo/dist/cart.js:21:8:::23:9:::514:638
		// Selected for objective: /repo/dist/cart.js:26:12:::26:54:::759:801
		// Selected for:
		// 	Error: sku not in cart
		// 	    at Cart.add [as remove] (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/instrumented/dist/cart.js:1432:13)
		// 	    at call (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/tests/tempTest.spec.js:22:38)
		// 	    at Generator._invoke (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/tests/tempTest.spec.js:2:1)
		// 	    at Generator.next (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/tests/tempTest.spec.js:2:1)
		// 	    at asyncGeneratorStep (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/tests/tempTest.spec.js:2:1)
		// 	    at _next (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/tests/tempTest.spec.js:2:1)
		// 
		// Covers objective: /repo/dist/cart.js:13:4:::16:5:::241:317
		// Covers objective: /repo/dist/cart.js:26:12:::26:54:::759:801
		// Covers objective: /repo/dist/cart.js:22:12:::22:72:::568:628
		// Covers objective: placeholder:::/repo/dist/cart.js:21:8:::23:9:::514:638
		// Covers objective: /repo/dist/cart.js:19:12:::19:82:::425:495
		// Covers objective: placeholder:::/repo/dist/cart.js:18:8:::20:9:::358:505
		// Covers objective: /repo/dist/cart.js:17:4:::31:5:::322:889
		// Covers objective: /repo/dist/cart.js:39:12:::39:47:::1219:1254
		// Covers objective: /repo/dist/cart.js:35:12:::35:72:::1028:1088
		// Covers objective: placeholder:::/repo/dist/cart.js:34:8:::36:9:::974:1098
		// Covers objective: /repo/dist/cart.js:33:4:::42:5:::947:1313
		// Covers objective: /repo/dist/cart.js:46:12:::46:46:::1418:1452
		// Covers objective: /repo/dist/cart.js:43:4:::52:5:::1318:1618
		// Covers objective: /repo/dist/cart.js:54:4:::64:5:::1662:2038
		
		// Test
		const cart = new Cart()
		const sku = "weight above carrier limit";
		const priceGrosz = 29;
		const qty = 235;
		const addReturnValue = await cart.add(sku, priceGrosz, qty)
		const cart1 = new Cart()
		const sku1 = null;
		const qty1 = 924;
		
		// Assertions
		expect(addReturnValue).to.equal(undefined)
		await expect((async () => {
			await cart1.remove(sku1, qty1)
		})()).to.be.rejectedWith(`sku not in cart`)
	})

	it("Test 11 for 'cart'", async () => {
		// Meta information
		// Selected for:
		// 	RangeError: quantity must be a positive integer
		// 	    at Cart [as remove] (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/instrumented/dist/cart.js:1412:13)
		// 	    at call (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/tests/tempTest.spec.js:18:21)
		// 	    at Generator._invoke (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/tests/tempTest.spec.js:2:1)
		// 	    at Generator.next (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/tests/tempTest.spec.js:2:1)
		// 	    at asyncGeneratorStep (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/tests/tempTest.spec.js:2:1)
		// 	    at _next (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/tests/tempTest.spec.js:2:1)
		// 	    at /repo/.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/tests/tempTest.spec.js:2:1
		// 	    at new Promise (<anonymous>)
		// 	    at Context.<anonymous> (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/tests/tempTest.spec.js:2:1)
		// 	    at processImmediate (node:internal/timers:504:21)
		// 
		// Covers objective: /repo/dist/cart.js:13:4:::16:5:::241:317
		// Covers objective: /repo/dist/cart.js:26:12:::26:54:::759:801
		// Covers objective: /repo/dist/cart.js:22:12:::22:72:::568:628
		// Covers objective: placeholder:::/repo/dist/cart.js:21:8:::23:9:::514:638
		// Covers objective: /repo/dist/cart.js:19:12:::19:82:::425:495
		// Covers objective: placeholder:::/repo/dist/cart.js:18:8:::20:9:::358:505
		// Covers objective: /repo/dist/cart.js:17:4:::31:5:::322:889
		// Covers objective: /repo/dist/cart.js:39:12:::39:47:::1219:1254
		// Covers objective: /repo/dist/cart.js:35:12:::35:72:::1028:1088
		// Covers objective: placeholder:::/repo/dist/cart.js:34:8:::36:9:::974:1098
		// Covers objective: /repo/dist/cart.js:33:4:::42:5:::947:1313
		// Covers objective: /repo/dist/cart.js:46:12:::46:46:::1418:1452
		// Covers objective: /repo/dist/cart.js:43:4:::52:5:::1318:1618
		// Covers objective: /repo/dist/cart.js:54:4:::64:5:::1662:2038
		
		// Test
		const anon = "sequence number must not be zero";
		const cart = new Cart(anon)
		const arrayElement = "weight above carrier limit";
		const sku = [arrayElement]
		const qty = () => {};
		const anon1 = null;
		
		// Assertions
		await expect((async () => {
			await cart.remove(sku, qty, anon1)
		})()).to.be.rejectedWith(`quantity must be a positive integer`)
	})

	it("Test 12 for 'cart'", async () => {
		// Meta information
		// Selected for:
		// 	Error: unknown coupon
		// 	    at Cart [as applyCoupon] (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/instrumented/dist/cart.js:1453:13)
		// 	    at call (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/tests/tempTest.spec.js:18:21)
		// 	    at Generator._invoke (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/tests/tempTest.spec.js:2:1)
		// 	    at Generator.next (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/tests/tempTest.spec.js:2:1)
		// 	    at asyncGeneratorStep (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/tests/tempTest.spec.js:2:1)
		// 	    at _next (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/tests/tempTest.spec.js:2:1)
		// 	    at /repo/.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/tests/tempTest.spec.js:2:1
		// 	    at new Promise (<anonymous>)
		// 	    at Context.<anonymous> (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/tests/tempTest.spec.js:2:1)
		// 	    at processImmediate (node:internal/timers:504:21)
		// 
		// Covers objective: /repo/dist/cart.js:13:4:::16:5:::241:317
		// Covers objective: /repo/dist/cart.js:26:12:::26:54:::759:801
		// Covers objective: /repo/dist/cart.js:22:12:::22:72:::568:628
		// Covers objective: placeholder:::/repo/dist/cart.js:21:8:::23:9:::514:638
		// Covers objective: /repo/dist/cart.js:19:12:::19:82:::425:495
		// Covers objective: placeholder:::/repo/dist/cart.js:18:8:::20:9:::358:505
		// Covers objective: /repo/dist/cart.js:17:4:::31:5:::322:889
		// Covers objective: /repo/dist/cart.js:39:12:::39:47:::1219:1254
		// Covers objective: /repo/dist/cart.js:35:12:::35:72:::1028:1088
		// Covers objective: placeholder:::/repo/dist/cart.js:34:8:::36:9:::974:1098
		// Covers objective: /repo/dist/cart.js:33:4:::42:5:::947:1313
		// Covers objective: /repo/dist/cart.js:46:12:::46:46:::1418:1452
		// Covers objective: /repo/dist/cart.js:43:4:::52:5:::1318:1618
		// Covers objective: /repo/dist/cart.js:54:4:::64:5:::1662:2038
		
		// Test
		const cart = new Cart()
		const anon = "sequence number must not be zero";
		const cart1 = new Cart(anon)
		const code = "quantity must be a positive integer";
		const anon1 = "sequence number must not be zero";
		const cart2 = new Cart(anon1)
		
		// Assertions
		await expect((async () => {
			await cart1.applyCoupon(code, cart2)
		})()).to.be.rejectedWith(`unknown coupon`)
	})

	it("Test 13 for 'cart'", async () => {
		// Meta information
		// Selected for:
		// 	RangeError: quantity must be a positive integer
		// 	    at Cart.removeReturnValue [as remove] (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/instrumented/dist/cart.js:1412:13)
		// 	    at call (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/tests/tempTest.spec.js:17:9)
		// 	    at Generator._invoke (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/tests/tempTest.spec.js:2:1)
		// 	    at Generator.next (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/tests/tempTest.spec.js:2:1)
		// 	    at asyncGeneratorStep (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/tests/tempTest.spec.js:2:1)
		// 	    at _next (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/tests/tempTest.spec.js:2:1)
		// 	    at /repo/.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/tests/tempTest.spec.js:2:1
		// 	    at new Promise (<anonymous>)
		// 	    at Context.<anonymous> (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/tests/tempTest.spec.js:2:1)
		// 	    at processImmediate (node:internal/timers:504:21)
		// 
		// Covers objective: /repo/dist/cart.js:13:4:::16:5:::241:317
		// Covers objective: /repo/dist/cart.js:26:12:::26:54:::759:801
		// Covers objective: /repo/dist/cart.js:22:12:::22:72:::568:628
		// Covers objective: placeholder:::/repo/dist/cart.js:21:8:::23:9:::514:638
		// Covers objective: /repo/dist/cart.js:19:12:::19:82:::425:495
		// Covers objective: placeholder:::/repo/dist/cart.js:18:8:::20:9:::358:505
		// Covers objective: /repo/dist/cart.js:17:4:::31:5:::322:889
		// Covers objective: /repo/dist/cart.js:39:12:::39:47:::1219:1254
		// Covers objective: /repo/dist/cart.js:35:12:::35:72:::1028:1088
		// Covers objective: placeholder:::/repo/dist/cart.js:34:8:::36:9:::974:1098
		// Covers objective: /repo/dist/cart.js:33:4:::42:5:::947:1313
		// Covers objective: /repo/dist/cart.js:46:12:::46:46:::1418:1452
		// Covers objective: /repo/dist/cart.js:43:4:::52:5:::1318:1618
		// Covers objective: /repo/dist/cart.js:54:4:::64:5:::1662:2038
		
		// Test
		const cart = new Cart()
		const arrayElement = "weight above carrier limit";
		const sku = [arrayElement]
		const qty = () => {};
		const anon = null;
		
		// Assertions
		await expect((async () => {
			await cart.remove(sku, qty, anon)
		})()).to.be.rejectedWith(`quantity must be a positive integer`)
	})

	it("Test 14 for 'cart'", async () => {
		// Meta information
		// Selected for:
		// 	RangeError: price must be a non-negative integer of grosz
		// 	    at Cart.add (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/instrumented/dist/cart.js:1352:13)
		// 	    at call (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/tests/tempTest.spec.js:17:56)
		// 	    at Generator._invoke (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/tests/tempTest.spec.js:2:1)
		// 	    at Generator.next (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/tests/tempTest.spec.js:2:1)
		// 	    at asyncGeneratorStep (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/tests/tempTest.spec.js:2:1)
		// 	    at _next (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/tests/tempTest.spec.js:2:1)
		// 	    at /repo/.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/tests/tempTest.spec.js:2:1
		// 	    at new Promise (<anonymous>)
		// 	    at Context.<anonymous> (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/tests/tempTest.spec.js:2:1)
		// 	    at processImmediate (node:internal/timers:504:21)
		// 
		// Covers objective: /repo/dist/cart.js:13:4:::16:5:::241:317
		// Covers objective: /repo/dist/cart.js:26:12:::26:54:::759:801
		// Covers objective: /repo/dist/cart.js:22:12:::22:72:::568:628
		// Covers objective: placeholder:::/repo/dist/cart.js:21:8:::23:9:::514:638
		// Covers objective: /repo/dist/cart.js:19:12:::19:82:::425:495
		// Covers objective: placeholder:::/repo/dist/cart.js:18:8:::20:9:::358:505
		// Covers objective: /repo/dist/cart.js:17:4:::31:5:::322:889
		// Covers objective: /repo/dist/cart.js:39:12:::39:47:::1219:1254
		// Covers objective: /repo/dist/cart.js:35:12:::35:72:::1028:1088
		// Covers objective: placeholder:::/repo/dist/cart.js:34:8:::36:9:::974:1098
		// Covers objective: /repo/dist/cart.js:33:4:::42:5:::947:1313
		// Covers objective: /repo/dist/cart.js:46:12:::46:46:::1418:1452
		// Covers objective: /repo/dist/cart.js:43:4:::52:5:::1318:1618
		// Covers objective: /repo/dist/cart.js:54:4:::64:5:::1662:2038
		
		// Test
		const cart = new Cart()
		const sku = false;
		const priceGrosz = 1.6750510723460366;
		const qty = "weight must be positive";
		
		// Assertions
		await expect((async () => {
			await cart.add(sku, priceGrosz, qty)
		})()).to.be.rejectedWith(`price must be a non-negative integer of grosz`)
	})

	it("Test 15 for 'cart'", async () => {
		// Meta information
		// Selected for:
		// 	Error: unknown coupon
		// 	    at Cart.removeReturnValue [as applyCoupon] (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/instrumented/dist/cart.js:1453:13)
		// 	    at call (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/tests/tempTest.spec.js:17:9)
		// 	    at Generator._invoke (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/tests/tempTest.spec.js:2:1)
		// 	    at Generator.next (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/tests/tempTest.spec.js:2:1)
		// 	    at asyncGeneratorStep (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/tests/tempTest.spec.js:2:1)
		// 	    at _next (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/tests/tempTest.spec.js:2:1)
		// 	    at /repo/.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/tests/tempTest.spec.js:2:1
		// 	    at new Promise (<anonymous>)
		// 	    at Context.<anonymous> (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/tests/tempTest.spec.js:2:1)
		// 	    at processImmediate (node:internal/timers:504:21)
		// 
		// Covers objective: /repo/dist/cart.js:13:4:::16:5:::241:317
		// Covers objective: /repo/dist/cart.js:26:12:::26:54:::759:801
		// Covers objective: /repo/dist/cart.js:22:12:::22:72:::568:628
		// Covers objective: placeholder:::/repo/dist/cart.js:21:8:::23:9:::514:638
		// Covers objective: /repo/dist/cart.js:19:12:::19:82:::425:495
		// Covers objective: placeholder:::/repo/dist/cart.js:18:8:::20:9:::358:505
		// Covers objective: /repo/dist/cart.js:17:4:::31:5:::322:889
		// Covers objective: /repo/dist/cart.js:39:12:::39:47:::1219:1254
		// Covers objective: /repo/dist/cart.js:35:12:::35:72:::1028:1088
		// Covers objective: placeholder:::/repo/dist/cart.js:34:8:::36:9:::974:1098
		// Covers objective: /repo/dist/cart.js:33:4:::42:5:::947:1313
		// Covers objective: /repo/dist/cart.js:46:12:::46:46:::1418:1452
		// Covers objective: /repo/dist/cart.js:43:4:::52:5:::1318:1618
		// Covers objective: /repo/dist/cart.js:54:4:::64:5:::1662:2038
		
		// Test
		const anon = -671;
		const cart = new Cart(anon)
		const cart1 = new Cart()
		const code = 3;
		const anon1 = "cart quantit underflow";
		
		// Assertions
		await expect((async () => {
			await cart1.applyCoupon(code, anon1)
		})()).to.be.rejectedWith(`unknown coupon`)
	})

	it("Test 16 for 'cart'", async () => {
		// Meta information
		// Selected for:
		// 	Error: sku not in cart
		// 	    at Cart.removeReturnValue [as remove] (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/instrumented/dist/cart.js:1432:13)
		// 	    at call (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/tests/tempTest.spec.js:17:9)
		// 	    at Generator._invoke (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/tests/tempTest.spec.js:2:1)
		// 	    at Generator.next (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/tests/tempTest.spec.js:2:1)
		// 	    at asyncGeneratorStep (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/tests/tempTest.spec.js:2:1)
		// 	    at _next (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/tests/tempTest.spec.js:2:1)
		// 	    at /repo/.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/tests/tempTest.spec.js:2:1
		// 	    at new Promise (<anonymous>)
		// 	    at Context.<anonymous> (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/tests/tempTest.spec.js:2:1)
		// 	    at processImmediate (node:internal/timers:504:21)
		// 
		// Covers objective: /repo/dist/cart.js:13:4:::16:5:::241:317
		// Covers objective: /repo/dist/cart.js:26:12:::26:54:::759:801
		// Covers objective: /repo/dist/cart.js:22:12:::22:72:::568:628
		// Covers objective: placeholder:::/repo/dist/cart.js:21:8:::23:9:::514:638
		// Covers objective: /repo/dist/cart.js:19:12:::19:82:::425:495
		// Covers objective: placeholder:::/repo/dist/cart.js:18:8:::20:9:::358:505
		// Covers objective: /repo/dist/cart.js:17:4:::31:5:::322:889
		// Covers objective: /repo/dist/cart.js:39:12:::39:47:::1219:1254
		// Covers objective: /repo/dist/cart.js:35:12:::35:72:::1028:1088
		// Covers objective: placeholder:::/repo/dist/cart.js:34:8:::36:9:::974:1098
		// Covers objective: /repo/dist/cart.js:33:4:::42:5:::947:1313
		// Covers objective: /repo/dist/cart.js:46:12:::46:46:::1418:1452
		// Covers objective: /repo/dist/cart.js:43:4:::52:5:::1318:1618
		// Covers objective: /repo/dist/cart.js:54:4:::64:5:::1662:2038
		
		// Test
		const cart = new Cart()
		const sku = 269.12874600734904;
		const qty = 10;
		const anon = "??Dx:dz}mEi%>,;mv3tV";
		const anon1 = "invoice id must be a string";
		
		// Assertions
		await expect((async () => {
			await cart.remove(sku, qty, anon, anon1)
		})()).to.be.rejectedWith(`sku not in cart`)
	})

	it("Test 17 for 'cart'", async () => {
		// Meta information
		// Selected for:
		// 	RangeError: price must be a non-negative integer of grosz
		// 	    at Cart.removeReturnValue [as add] (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/instrumented/dist/cart.js:1352:13)
		// 	    at call (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/tests/tempTest.spec.js:17:9)
		// 	    at Generator._invoke (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/tests/tempTest.spec.js:2:1)
		// 	    at Generator.next (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/tests/tempTest.spec.js:2:1)
		// 	    at asyncGeneratorStep (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/tests/tempTest.spec.js:2:1)
		// 	    at _next (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/tests/tempTest.spec.js:2:1)
		// 	    at /repo/.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/tests/tempTest.spec.js:2:1
		// 	    at new Promise (<anonymous>)
		// 	    at Context.<anonymous> (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/tests/tempTest.spec.js:2:1)
		// 	    at processImmediate (node:internal/timers:504:21)
		// 
		// Covers objective: /repo/dist/cart.js:13:4:::16:5:::241:317
		// Covers objective: /repo/dist/cart.js:26:12:::26:54:::759:801
		// Covers objective: /repo/dist/cart.js:22:12:::22:72:::568:628
		// Covers objective: placeholder:::/repo/dist/cart.js:21:8:::23:9:::514:638
		// Covers objective: /repo/dist/cart.js:19:12:::19:82:::425:495
		// Covers objective: placeholder:::/repo/dist/cart.js:18:8:::20:9:::358:505
		// Covers objective: /repo/dist/cart.js:17:4:::31:5:::322:889
		// Covers objective: /repo/dist/cart.js:39:12:::39:47:::1219:1254
		// Covers objective: /repo/dist/cart.js:35:12:::35:72:::1028:1088
		// Covers objective: placeholder:::/repo/dist/cart.js:34:8:::36:9:::974:1098
		// Covers objective: /repo/dist/cart.js:33:4:::42:5:::947:1313
		// Covers objective: /repo/dist/cart.js:46:12:::46:46:::1418:1452
		// Covers objective: /repo/dist/cart.js:43:4:::52:5:::1318:1618
		// Covers objective: /repo/dist/cart.js:54:4:::64:5:::1662:2038
		
		// Test
		const cart = new Cart()
		const sku = "amounts must not be negative";
		const priceGrosz = -291.16345517500065;
		const qty = 40;
		const anon = null;
		
		// Assertions
		await expect((async () => {
			await cart.add(sku, priceGrosz, qty, anon)
		})()).to.be.rejectedWith(`price must be a non-negative integer of grosz`)
	})

	it("Test 18 for 'cart'", async () => {
		// Meta information
		// Selected for:
		// 	Error: unknown coupon
		// 	    at Cart.add [as applyCoupon] (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/instrumented/dist/cart.js:1453:13)
		// 	    at call (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/tests/tempTest.spec.js:22:38)
		// 	    at Generator._invoke (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/tests/tempTest.spec.js:2:1)
		// 	    at Generator.next (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/tests/tempTest.spec.js:2:1)
		// 	    at asyncGeneratorStep (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/tests/tempTest.spec.js:2:1)
		// 	    at _next (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/tests/tempTest.spec.js:2:1)
		// 
		// Covers objective: /repo/dist/cart.js:13:4:::16:5:::241:317
		// Covers objective: /repo/dist/cart.js:26:12:::26:54:::759:801
		// Covers objective: /repo/dist/cart.js:22:12:::22:72:::568:628
		// Covers objective: placeholder:::/repo/dist/cart.js:21:8:::23:9:::514:638
		// Covers objective: /repo/dist/cart.js:19:12:::19:82:::425:495
		// Covers objective: placeholder:::/repo/dist/cart.js:18:8:::20:9:::358:505
		// Covers objective: /repo/dist/cart.js:17:4:::31:5:::322:889
		// Covers objective: /repo/dist/cart.js:39:12:::39:47:::1219:1254
		// Covers objective: /repo/dist/cart.js:35:12:::35:72:::1028:1088
		// Covers objective: placeholder:::/repo/dist/cart.js:34:8:::36:9:::974:1098
		// Covers objective: /repo/dist/cart.js:33:4:::42:5:::947:1313
		// Covers objective: /repo/dist/cart.js:46:12:::46:46:::1418:1452
		// Covers objective: /repo/dist/cart.js:43:4:::52:5:::1318:1618
		// Covers objective: /repo/dist/cart.js:54:4:::64:5:::1662:2038
		
		// Test
		const cart = new Cart()
		const anon = () => {};
		const totalReturnValue = await cart.total(anon)
		const cart1 = new Cart()
		const arrayElement = "PL";
		const anon1 = () => {};
		const code = [arrayElement, anon1]
		const anon2 = true;
		
		// Assertions
		expect(totalReturnValue).to.equal(0)
		await expect((async () => {
			await cart1.applyCoupon(code, anon2)
		})()).to.be.rejectedWith(`unknown coupon`)
	})

	it("Test 19 for 'cart'", async () => {
		// Meta information
		// Selected for:
		// 	RangeError: quantity must be a positive integer
		// 	    at Cart.add (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/instrumented/dist/cart.js:1367:13)
		// 	    at call (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/tests/tempTest.spec.js:21:20)
		// 	    at Generator._invoke (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/tests/tempTest.spec.js:2:1)
		// 	    at Generator.next (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/tests/tempTest.spec.js:2:1)
		// 	    at asyncGeneratorStep (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/tests/tempTest.spec.js:2:1)
		// 	    at _next (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/tests/tempTest.spec.js:2:1)
		// 
		// Covers objective: /repo/dist/cart.js:13:4:::16:5:::241:317
		// Covers objective: /repo/dist/cart.js:26:12:::26:54:::759:801
		// Covers objective: /repo/dist/cart.js:22:12:::22:72:::568:628
		// Covers objective: placeholder:::/repo/dist/cart.js:21:8:::23:9:::514:638
		// Covers objective: /repo/dist/cart.js:19:12:::19:82:::425:495
		// Covers objective: placeholder:::/repo/dist/cart.js:18:8:::20:9:::358:505
		// Covers objective: /repo/dist/cart.js:17:4:::31:5:::322:889
		// Covers objective: /repo/dist/cart.js:39:12:::39:47:::1219:1254
		// Covers objective: /repo/dist/cart.js:35:12:::35:72:::1028:1088
		// Covers objective: placeholder:::/repo/dist/cart.js:34:8:::36:9:::974:1098
		// Covers objective: /repo/dist/cart.js:33:4:::42:5:::947:1313
		// Covers objective: /repo/dist/cart.js:46:12:::46:46:::1418:1452
		// Covers objective: /repo/dist/cart.js:43:4:::52:5:::1318:1618
		// Covers objective: /repo/dist/cart.js:54:4:::64:5:::1662:2038
		
		// Test
		const cart = new Cart()
		const totalReturnValue = await cart.total()
		const cart1 = new Cart()
		const sku = -274.6297549018534;
		const priceGrosz = 882;
		const qty = "cannot apply coupon to an empty cart";
		
		// Assertions
		expect(totalReturnValue).to.equal(0)
		await expect((async () => {
			await cart1.add(sku, priceGrosz, qty)
		})()).to.be.rejectedWith(`quantity must be a positive integer`)
	})

	it("Test 20 for 'cart'", async () => {
		// Meta information
		// Selected for:
		// 	RangeError: quantity must be a positive integer
		// 	    at Cart.add [as remove] (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/instrumented/dist/cart.js:1412:13)
		// 	    at call (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/tests/tempTest.spec.js:22:38)
		// 	    at Generator._invoke (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/tests/tempTest.spec.js:2:1)
		// 	    at Generator.next (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/tests/tempTest.spec.js:2:1)
		// 	    at asyncGeneratorStep (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/tests/tempTest.spec.js:2:1)
		// 	    at _next (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/tests/tempTest.spec.js:2:1)
		// 
		// Covers objective: /repo/dist/cart.js:13:4:::16:5:::241:317
		// Covers objective: /repo/dist/cart.js:26:12:::26:54:::759:801
		// Covers objective: /repo/dist/cart.js:22:12:::22:72:::568:628
		// Covers objective: placeholder:::/repo/dist/cart.js:21:8:::23:9:::514:638
		// Covers objective: /repo/dist/cart.js:19:12:::19:82:::425:495
		// Covers objective: placeholder:::/repo/dist/cart.js:18:8:::20:9:::358:505
		// Covers objective: /repo/dist/cart.js:17:4:::31:5:::322:889
		// Covers objective: /repo/dist/cart.js:39:12:::39:47:::1219:1254
		// Covers objective: /repo/dist/cart.js:35:12:::35:72:::1028:1088
		// Covers objective: placeholder:::/repo/dist/cart.js:34:8:::36:9:::974:1098
		// Covers objective: /repo/dist/cart.js:33:4:::42:5:::947:1313
		// Covers objective: /repo/dist/cart.js:46:12:::46:46:::1418:1452
		// Covers objective: /repo/dist/cart.js:43:4:::52:5:::1318:1618
		// Covers objective: /repo/dist/cart.js:54:4:::64:5:::1662:2038
		
		// Test
		const anon = () => {};
		const cart = new Cart(anon)
		const totalReturnValue = await cart.total()
		const anon1 = () => {};
		const cart1 = new Cart(anon1)
		const sku = () => {};
		const qty = -63.13618773239932;
		const anon2 = "=$y{42TK\"vNC?\n \"Ojh}t'UKeB{64[±'*\n?{{kn3XZ§<L:\"E!C~ a&o9\"@d!'$qr:SI9c^u,%\\|oBf[a\nQmS";
		
		// Assertions
		expect(totalReturnValue).to.equal(0)
		await expect((async () => {
			await cart1.remove(sku, qty, anon2)
		})()).to.be.rejectedWith(`quantity must be a positive integer`)
	})

	it("Test 21 for 'cart'", async () => {
		// Meta information
		// Selected for:
		// 	RangeError: quantity must be a positive integer
		// 	    at Cart [as add] (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/instrumented/dist/cart.js:1367:13)
		// 	    at call (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/tests/tempTest.spec.js:18:21)
		// 	    at Generator._invoke (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/tests/tempTest.spec.js:2:1)
		// 	    at Generator.next (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/tests/tempTest.spec.js:2:1)
		// 	    at asyncGeneratorStep (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/tests/tempTest.spec.js:2:1)
		// 	    at _next (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/tests/tempTest.spec.js:2:1)
		// 	    at /repo/.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/tests/tempTest.spec.js:2:1
		// 	    at new Promise (<anonymous>)
		// 	    at Context.<anonymous> (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/tests/tempTest.spec.js:2:1)
		// 	    at processImmediate (node:internal/timers:504:21)
		// 
		// Covers objective: /repo/dist/cart.js:13:4:::16:5:::241:317
		// Covers objective: /repo/dist/cart.js:26:12:::26:54:::759:801
		// Covers objective: /repo/dist/cart.js:22:12:::22:72:::568:628
		// Covers objective: placeholder:::/repo/dist/cart.js:21:8:::23:9:::514:638
		// Covers objective: /repo/dist/cart.js:19:12:::19:82:::425:495
		// Covers objective: placeholder:::/repo/dist/cart.js:18:8:::20:9:::358:505
		// Covers objective: /repo/dist/cart.js:17:4:::31:5:::322:889
		// Covers objective: /repo/dist/cart.js:39:12:::39:47:::1219:1254
		// Covers objective: /repo/dist/cart.js:35:12:::35:72:::1028:1088
		// Covers objective: placeholder:::/repo/dist/cart.js:34:8:::36:9:::974:1098
		// Covers objective: /repo/dist/cart.js:33:4:::42:5:::947:1313
		// Covers objective: /repo/dist/cart.js:46:12:::46:46:::1418:1452
		// Covers objective: /repo/dist/cart.js:43:4:::52:5:::1318:1618
		// Covers objective: /repo/dist/cart.js:54:4:::64:5:::1662:2038
		
		// Test
		const cart = new Cart()
		const arrayElement = 1;
		const arrayElement1 = [arrayElement]
		const sku = [arrayElement1]
		const priceGrosz = 624;
		const qty = "__esModule";
		
		// Assertions
		await expect((async () => {
			await cart.add(sku, priceGrosz, qty)
		})()).to.be.rejectedWith(`quantity must be a positive integer`)
	})

	it("Test 22 for 'cart'", async () => {
		// Meta information
		// Selected for:
		// 	Error: sku not in cart
		// 	    at Cart.addReturnValue [as remove] (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/instrumented/dist/cart.js:1432:13)
		// 	    at call (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/tests/tempTest.spec.js:22:9)
		// 	    at Generator._invoke (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/tests/tempTest.spec.js:2:1)
		// 	    at Generator.next (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/tests/tempTest.spec.js:2:1)
		// 	    at asyncGeneratorStep (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/tests/tempTest.spec.js:2:1)
		// 	    at _next (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/tests/tempTest.spec.js:2:1)
		// 
		// Covers objective: /repo/dist/cart.js:13:4:::16:5:::241:317
		// Covers objective: /repo/dist/cart.js:26:12:::26:54:::759:801
		// Covers objective: /repo/dist/cart.js:22:12:::22:72:::568:628
		// Covers objective: placeholder:::/repo/dist/cart.js:21:8:::23:9:::514:638
		// Covers objective: /repo/dist/cart.js:19:12:::19:82:::425:495
		// Covers objective: placeholder:::/repo/dist/cart.js:18:8:::20:9:::358:505
		// Covers objective: /repo/dist/cart.js:17:4:::31:5:::322:889
		// Covers objective: /repo/dist/cart.js:39:12:::39:47:::1219:1254
		// Covers objective: /repo/dist/cart.js:35:12:::35:72:::1028:1088
		// Covers objective: placeholder:::/repo/dist/cart.js:34:8:::36:9:::974:1098
		// Covers objective: /repo/dist/cart.js:33:4:::42:5:::947:1313
		// Covers objective: /repo/dist/cart.js:46:12:::46:46:::1418:1452
		// Covers objective: /repo/dist/cart.js:43:4:::52:5:::1318:1618
		// Covers objective: /repo/dist/cart.js:54:4:::64:5:::1662:2038
		
		// Test
		const anon = "_H$]ro:HV5Jb?sZXDm@o0yC4_[i>iV±9Pi4PhJ±T|?'EP";
		const cart = new Cart(anon)
		const totalReturnValue = await cart.total()
		const anon1 = "_H$]ro:HV5Jb?sZXDm@o0yC4_[i>iV±9Pi4PhJ±T|?'EP";
		const cart1 = new Cart(anon1)
		const arrayElement = 2000;
		const arrayElement1 = "Pd:$t6)QK±N\n`e;Z38PJ9$5lwG1.pFH}j§_±t]}$$arMrq).lL&EtY\"";
		const sku = [arrayElement, arrayElement1]
		const qty = 30;
		const anon2 = {}
		
		// Assertions
		expect(totalReturnValue).to.equal(0)
		await expect((async () => {
			await cart1.remove(sku, qty, anon2)
		})()).to.be.rejectedWith(`sku not in cart`)
	})

	it("Test 23 for 'cart'", async () => {
		// Meta information
		// Selected for:
		// 	Error: sku not in cart
		// 	    at Cart.removeReturnValue1 [as remove] (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/instrumented/dist/cart.js:1432:13)
		// 	    at call (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/tests/tempTest.spec.js:26:9)
		// 	    at Generator._invoke (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/tests/tempTest.spec.js:2:1)
		// 	    at Generator.next (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/tests/tempTest.spec.js:2:1)
		// 	    at asyncGeneratorStep (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/tests/tempTest.spec.js:2:1)
		// 	    at _next (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/tests/tempTest.spec.js:2:1)
		// 
		// Covers objective: /repo/dist/cart.js:13:4:::16:5:::241:317
		// Covers objective: /repo/dist/cart.js:26:12:::26:54:::759:801
		// Covers objective: /repo/dist/cart.js:22:12:::22:72:::568:628
		// Covers objective: placeholder:::/repo/dist/cart.js:21:8:::23:9:::514:638
		// Covers objective: /repo/dist/cart.js:19:12:::19:82:::425:495
		// Covers objective: placeholder:::/repo/dist/cart.js:18:8:::20:9:::358:505
		// Covers objective: /repo/dist/cart.js:17:4:::31:5:::322:889
		// Covers objective: /repo/dist/cart.js:39:12:::39:47:::1219:1254
		// Covers objective: /repo/dist/cart.js:35:12:::35:72:::1028:1088
		// Covers objective: placeholder:::/repo/dist/cart.js:34:8:::36:9:::974:1098
		// Covers objective: /repo/dist/cart.js:33:4:::42:5:::947:1313
		// Covers objective: /repo/dist/cart.js:46:12:::46:46:::1418:1452
		// Covers objective: /repo/dist/cart.js:43:4:::52:5:::1318:1618
		// Covers objective: /repo/dist/cart.js:54:4:::64:5:::1662:2038
		
		// Test
		const anon = -494;
		const arrayElement = () => {};
		const arrayElement1 = "UD7  yy{.,VHn Q{T[K;@-@,r;uifasCl{t/hc%5%|1e5#'pHD;p!//tLZC}[XHSlb\tnqBE=CZEvML";
		const arrayElement2 = 100;
		const arrayElement3 = {}
		const anon1 = [arrayElement, arrayElement1, arrayElement2, arrayElement3]
		const cart = new Cart(anon, anon1)
		const totalReturnValue = await cart.total()
		const anon2 = -494;
		const arrayElement4 = () => {};
		const arrayElement5 = "UD7  yy{.,VHn Q{T[K;@-@,r;uifasCl{t/hc%5%|1e5#'pHD;p!//tLZC}[XHSlb\tnqBE=CZEvML";
		const arrayElement6 = 100;
		const arrayElement7 = {}
		const anon3 = [arrayElement4, arrayElement5, arrayElement6, arrayElement7]
		const cart1 = new Cart(anon2, anon3)
		const arrayElement8 = {}
		const arrayElement9 = 100;
		
		// Assertions
		expect(totalReturnValue).to.equal(0)
		await expect((async () => {
			await cart1.remove(arrayElement8, arrayElement9)
		})()).to.be.rejectedWith(`sku not in cart`)
	})

	it("Test 24 for 'cart'", async () => {
		// Meta information
		// Selected for:
		// 	Error: sku not in cart
		// 	    at Cart._context [as remove] (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/instrumented/dist/cart.js:1432:13)
		// 	    at call (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/tests/tempTest.spec.js:26:27)
		// 	    at Generator._invoke (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/tests/tempTest.spec.js:2:1)
		// 	    at Generator.next (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/tests/tempTest.spec.js:2:1)
		// 	    at asyncGeneratorStep (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/tests/tempTest.spec.js:2:1)
		// 	    at _next (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/tests/tempTest.spec.js:2:1)
		// 
		// Covers objective: /repo/dist/cart.js:13:4:::16:5:::241:317
		// Covers objective: /repo/dist/cart.js:26:12:::26:54:::759:801
		// Covers objective: /repo/dist/cart.js:22:12:::22:72:::568:628
		// Covers objective: placeholder:::/repo/dist/cart.js:21:8:::23:9:::514:638
		// Covers objective: /repo/dist/cart.js:19:12:::19:82:::425:495
		// Covers objective: placeholder:::/repo/dist/cart.js:18:8:::20:9:::358:505
		// Covers objective: /repo/dist/cart.js:17:4:::31:5:::322:889
		// Covers objective: /repo/dist/cart.js:39:12:::39:47:::1219:1254
		// Covers objective: /repo/dist/cart.js:35:12:::35:72:::1028:1088
		// Covers objective: placeholder:::/repo/dist/cart.js:34:8:::36:9:::974:1098
		// Covers objective: /repo/dist/cart.js:33:4:::42:5:::947:1313
		// Covers objective: /repo/dist/cart.js:46:12:::46:46:::1418:1452
		// Covers objective: /repo/dist/cart.js:43:4:::52:5:::1318:1618
		// Covers objective: /repo/dist/cart.js:54:4:::64:5:::1662:2038
		
		// Test
		const anon = "price must be a non-negative integer of grosz";
		const cart = new Cart(anon)
		const anon1 = "price must be a non-negative integer of grosz";
		const cart1 = new Cart(anon1)
		const sku = 2100;
		const priceGrosz = 30;
		const qty = 100;
		const addReturnValue = await cart1.add(sku, priceGrosz, qty)
		const anon2 = "price must be a non-negative integer of grosz";
		const cart2 = new Cart(anon2)
		const sku1 = 2100;
		const arrayElement = 2000;
		const arrayElement1 = "(VomjDB~SgE\"yS;]|_m_T$e~q@I QB4Y@§A[9\\K-,rt[5s[%me1/h";
		const arrayElement2 = null;
		const arrayElement3 = null;
		const arrayElement4 = [arrayElement1, arrayElement2, arrayElement3]
		const sku2 = [sku1, arrayElement, arrayElement4]
		const qty1 = 3;
		const anon3 = null;
		
		// Assertions
		expect(addReturnValue).to.equal(undefined)
		await expect((async () => {
			await cart2.remove(sku2, qty1, anon3)
		})()).to.be.rejectedWith(`sku not in cart`)
	})

	it("Test 25 for 'cart'", async () => {
		// Meta information
		// Selected for:
		// 	RangeError: quantity must be a positive integer
		// 	    at Cart.addReturnValue [as remove] (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/instrumented/dist/cart.js:1412:13)
		// 	    at call (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/tests/tempTest.spec.js:22:9)
		// 	    at Generator._invoke (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/tests/tempTest.spec.js:2:1)
		// 	    at Generator.next (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/tests/tempTest.spec.js:2:1)
		// 	    at asyncGeneratorStep (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/tests/tempTest.spec.js:2:1)
		// 	    at _next (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/tests/tempTest.spec.js:2:1)
		// 	    at /repo/.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/tests/tempTest.spec.js:2:1
		// 	    at new Promise (<anonymous>)
		// 	    at Context.<anonymous> (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/tests/tempTest.spec.js:2:1)
		// 	    at processImmediate (node:internal/timers:504:21)
		// 
		// Covers objective: /repo/dist/cart.js:13:4:::16:5:::241:317
		// Covers objective: /repo/dist/cart.js:26:12:::26:54:::759:801
		// Covers objective: /repo/dist/cart.js:22:12:::22:72:::568:628
		// Covers objective: placeholder:::/repo/dist/cart.js:21:8:::23:9:::514:638
		// Covers objective: /repo/dist/cart.js:19:12:::19:82:::425:495
		// Covers objective: placeholder:::/repo/dist/cart.js:18:8:::20:9:::358:505
		// Covers objective: /repo/dist/cart.js:17:4:::31:5:::322:889
		// Covers objective: /repo/dist/cart.js:39:12:::39:47:::1219:1254
		// Covers objective: /repo/dist/cart.js:35:12:::35:72:::1028:1088
		// Covers objective: placeholder:::/repo/dist/cart.js:34:8:::36:9:::974:1098
		// Covers objective: /repo/dist/cart.js:33:4:::42:5:::947:1313
		// Covers objective: /repo/dist/cart.js:46:12:::46:46:::1418:1452
		// Covers objective: /repo/dist/cart.js:43:4:::52:5:::1318:1618
		// Covers objective: /repo/dist/cart.js:54:4:::64:5:::1662:2038
		
		// Test
		const anon = -728.5808248594021;
		const anon1 = "quantity must be a positive integer";
		const cart = new Cart(anon, anon1)
		const sku = "string";
		const qty = 0;
		const arrayElement = new Cart()
		const anon2 = () => {};
		const arrayElement1 = new Cart(anon2)
		const arrayElement2 = "Cq6quuLRAp§VFNA)WsO>3z1,";
		const anon3 = [arrayElement, arrayElement1, arrayElement2]
		const arrayElement3 = undefined;
		const arrayElement4 = false;
		const anon4 = [arrayElement3, arrayElement4]
		
		// Assertions
		await expect((async () => {
			await cart.remove(sku, qty, anon3, anon4)
		})()).to.be.rejectedWith(`quantity must be a positive integer`)
	})

	it("Test 26 for 'cart'", async () => {
		// Meta information
		// Selected for:
		// 	RangeError: quantity must be a positive integer
		// 	    at Cart.addReturnValue [as add] (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/instrumented/dist/cart.js:1367:13)
		// 	    at call (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/tests/tempTest.spec.js:22:9)
		// 	    at Generator._invoke (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/tests/tempTest.spec.js:2:1)
		// 	    at Generator.next (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/tests/tempTest.spec.js:2:1)
		// 	    at asyncGeneratorStep (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/tests/tempTest.spec.js:2:1)
		// 	    at _next (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/tests/tempTest.spec.js:2:1)
		// 
		// Covers objective: /repo/dist/cart.js:13:4:::16:5:::241:317
		// Covers objective: /repo/dist/cart.js:26:12:::26:54:::759:801
		// Covers objective: /repo/dist/cart.js:22:12:::22:72:::568:628
		// Covers objective: placeholder:::/repo/dist/cart.js:21:8:::23:9:::514:638
		// Covers objective: /repo/dist/cart.js:19:12:::19:82:::425:495
		// Covers objective: placeholder:::/repo/dist/cart.js:18:8:::20:9:::358:505
		// Covers objective: /repo/dist/cart.js:17:4:::31:5:::322:889
		// Covers objective: /repo/dist/cart.js:39:12:::39:47:::1219:1254
		// Covers objective: /repo/dist/cart.js:35:12:::35:72:::1028:1088
		// Covers objective: placeholder:::/repo/dist/cart.js:34:8:::36:9:::974:1098
		// Covers objective: /repo/dist/cart.js:33:4:::42:5:::947:1313
		// Covers objective: /repo/dist/cart.js:46:12:::46:46:::1418:1452
		// Covers objective: /repo/dist/cart.js:43:4:::52:5:::1318:1618
		// Covers objective: /repo/dist/cart.js:54:4:::64:5:::1662:2038
		
		// Test
		const cart = new Cart()
		const sku = 2;
		const priceGrosz = 2000;
		const qty = 30;
		const addReturnValue = await cart.add(sku, priceGrosz, qty)
		const cart1 = new Cart()
		const sku1 = () => {};
		const sku2 = 2;
		const qty1 = "PL";
		const anon = null;
		
		// Assertions
		expect(addReturnValue).to.equal(undefined)
		await expect((async () => {
			await cart1.add(sku1, sku2, qty1, anon)
		})()).to.be.rejectedWith(`quantity must be a positive integer`)
	})
})