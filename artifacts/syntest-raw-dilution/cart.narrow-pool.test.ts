// Imports
import { describe, it, beforeEach, vi } from 'vitest'
import chai from 'chai'
import chaiAsPromised from 'chai-as-promised'
const expect = chai.expect;
chai.use(chaiAsPromised);

describe('cart', function() {
	let Cart: any;
	beforeEach(async () => {
		vi.resetModules();
		({ Cart } = await import("../src/cart"));
	});

	it("Test 1 for 'cart'", async () => {
		// Meta information
		// Selected for objective: dist/cart.js:13:4:::16:5:::241:317
		// Selected for objective: dist/cart.js:33:4:::42:5:::947:1313
		// Selected for objective: dist/cart.js:35:12:::35:72:::1028:1088
		// Selected for:
		// 	RangeError: quantity must be a positive integer
		// 	    at Cart.remove (.syntest/FID-1788957472087-uipD5AAJPr2FQ346TLzPWN/instrumented/dist/cart.js:1412:13)
		// 	    at call (.syntest/FID-1788957472087-uipD5AAJPr2FQ346TLzPWN/tests/tempTest.spec.js:17:40)
		// 	    at Generator._invoke (.syntest/FID-1788957472087-uipD5AAJPr2FQ346TLzPWN/tests/tempTest.spec.js:2:1)
		// 	    at Generator.next (.syntest/FID-1788957472087-uipD5AAJPr2FQ346TLzPWN/tests/tempTest.spec.js:2:1)
		// 	    at asyncGeneratorStep (.syntest/FID-1788957472087-uipD5AAJPr2FQ346TLzPWN/tests/tempTest.spec.js:2:1)
		// 	    at _next (.syntest/FID-1788957472087-uipD5AAJPr2FQ346TLzPWN/tests/tempTest.spec.js:2:1)
		// 	    at .syntest/FID-1788957472087-uipD5AAJPr2FQ346TLzPWN/tests/tempTest.spec.js:2:1
		// 	    at new Promise (<anonymous>)
		// 	    at Context.<anonymous> (.syntest/FID-1788957472087-uipD5AAJPr2FQ346TLzPWN/tests/tempTest.spec.js:2:1)
		// 	    at processImmediate (node:internal/timers:504:21)
		// 
		// Covers objective: dist/cart.js:13:4:::16:5:::241:317
		// Covers objective: dist/cart.js:35:12:::35:72:::1028:1088
		// Covers objective: dist/cart.js:33:4:::42:5:::947:1313
		
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
		// Selected for objective: placeholder:::dist/cart.js:34:8:::36:9:::974:1098
		// Selected for objective: dist/cart.js:39:12:::39:47:::1219:1254
		// Selected for:
		// 	Error: sku not in cart
		// 	    at Cart.remove (.syntest/FID-1788957472087-uipD5AAJPr2FQ346TLzPWN/instrumented/dist/cart.js:1432:13)
		// 	    at call (.syntest/FID-1788957472087-uipD5AAJPr2FQ346TLzPWN/tests/tempTest.spec.js:17:56)
		// 	    at Generator._invoke (.syntest/FID-1788957472087-uipD5AAJPr2FQ346TLzPWN/tests/tempTest.spec.js:2:1)
		// 	    at Generator.next (.syntest/FID-1788957472087-uipD5AAJPr2FQ346TLzPWN/tests/tempTest.spec.js:2:1)
		// 	    at asyncGeneratorStep (.syntest/FID-1788957472087-uipD5AAJPr2FQ346TLzPWN/tests/tempTest.spec.js:2:1)
		// 	    at _next (.syntest/FID-1788957472087-uipD5AAJPr2FQ346TLzPWN/tests/tempTest.spec.js:2:1)
		// 	    at .syntest/FID-1788957472087-uipD5AAJPr2FQ346TLzPWN/tests/tempTest.spec.js:2:1
		// 	    at new Promise (<anonymous>)
		// 	    at Context.<anonymous> (.syntest/FID-1788957472087-uipD5AAJPr2FQ346TLzPWN/tests/tempTest.spec.js:2:1)
		// 	    at processImmediate (node:internal/timers:504:21)
		// 
		// Covers objective: dist/cart.js:13:4:::16:5:::241:317
		// Covers objective: dist/cart.js:39:12:::39:47:::1219:1254
		// Covers objective: dist/cart.js:35:12:::35:72:::1028:1088
		// Covers objective: placeholder:::dist/cart.js:34:8:::36:9:::974:1098
		// Covers objective: dist/cart.js:33:4:::42:5:::947:1313
		
		// Test
		const cart = new Cart()
		const sku = () => {};
		const qty = 90;
		const anon = new Cart()
		
		// Assertions
		await expect((async () => {
			await cart.remove(sku, qty, anon)
		})()).to.be.rejectedWith(`sku not in cart`)
	})

	it("Test 3 for 'cart'", async () => {
		// Meta information
		// Selected for objective: dist/cart.js:54:4:::64:5:::1662:2038
		// Covers objective: dist/cart.js:13:4:::16:5:::241:317
		// Covers objective: dist/cart.js:39:12:::39:47:::1219:1254
		// Covers objective: dist/cart.js:35:12:::35:72:::1028:1088
		// Covers objective: placeholder:::dist/cart.js:34:8:::36:9:::974:1098
		// Covers objective: dist/cart.js:33:4:::42:5:::947:1313
		// Covers objective: dist/cart.js:54:4:::64:5:::1662:2038
		
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
		// Selected for objective: dist/cart.js:43:4:::52:5:::1318:1618
		// Selected for objective: dist/cart.js:46:12:::46:46:::1418:1452
		// Selected for:
		// 	Error: unknown coupon
		// 	    at Cart.applyCoupon (.syntest/FID-1788957472087-uipD5AAJPr2FQ346TLzPWN/instrumented/dist/cart.js:1453:13)
		// 	    at call (.syntest/FID-1788957472087-uipD5AAJPr2FQ346TLzPWN/tests/tempTest.spec.js:17:56)
		// 	    at Generator._invoke (.syntest/FID-1788957472087-uipD5AAJPr2FQ346TLzPWN/tests/tempTest.spec.js:2:1)
		// 	    at Generator.next (.syntest/FID-1788957472087-uipD5AAJPr2FQ346TLzPWN/tests/tempTest.spec.js:2:1)
		// 	    at asyncGeneratorStep (.syntest/FID-1788957472087-uipD5AAJPr2FQ346TLzPWN/tests/tempTest.spec.js:2:1)
		// 	    at _next (.syntest/FID-1788957472087-uipD5AAJPr2FQ346TLzPWN/tests/tempTest.spec.js:2:1)
		// 	    at .syntest/FID-1788957472087-uipD5AAJPr2FQ346TLzPWN/tests/tempTest.spec.js:2:1
		// 	    at new Promise (<anonymous>)
		// 	    at Context.<anonymous> (.syntest/FID-1788957472087-uipD5AAJPr2FQ346TLzPWN/tests/tempTest.spec.js:2:1)
		// 	    at processImmediate (node:internal/timers:504:21)
		// 
		// Covers objective: dist/cart.js:13:4:::16:5:::241:317
		// Covers objective: dist/cart.js:39:12:::39:47:::1219:1254
		// Covers objective: dist/cart.js:35:12:::35:72:::1028:1088
		// Covers objective: placeholder:::dist/cart.js:34:8:::36:9:::974:1098
		// Covers objective: dist/cart.js:33:4:::42:5:::947:1313
		// Covers objective: dist/cart.js:46:12:::46:46:::1418:1452
		// Covers objective: dist/cart.js:43:4:::52:5:::1318:1618
		// Covers objective: dist/cart.js:54:4:::64:5:::1662:2038
		
		// Test
		const cart = new Cart()
		const anon = 2700;
		const code = new Cart(anon)
		const anon1 = 12;
		
		// Assertions
		await expect((async () => {
			await cart.applyCoupon(code, anon1)
		})()).to.be.rejectedWith(`unknown coupon`)
	})

	it("Test 5 for 'cart'", async () => {
		// Meta information
		// Selected for:
		// 	Error: sku not in cart
		// 	    at Cart [as remove] (.syntest/FID-1788957472087-uipD5AAJPr2FQ346TLzPWN/instrumented/dist/cart.js:1432:13)
		// 	    at call (.syntest/FID-1788957472087-uipD5AAJPr2FQ346TLzPWN/tests/tempTest.spec.js:18:21)
		// 	    at Generator._invoke (.syntest/FID-1788957472087-uipD5AAJPr2FQ346TLzPWN/tests/tempTest.spec.js:2:1)
		// 	    at Generator.next (.syntest/FID-1788957472087-uipD5AAJPr2FQ346TLzPWN/tests/tempTest.spec.js:2:1)
		// 	    at asyncGeneratorStep (.syntest/FID-1788957472087-uipD5AAJPr2FQ346TLzPWN/tests/tempTest.spec.js:2:1)
		// 	    at _next (.syntest/FID-1788957472087-uipD5AAJPr2FQ346TLzPWN/tests/tempTest.spec.js:2:1)
		// 	    at .syntest/FID-1788957472087-uipD5AAJPr2FQ346TLzPWN/tests/tempTest.spec.js:2:1
		// 	    at new Promise (<anonymous>)
		// 	    at Context.<anonymous> (.syntest/FID-1788957472087-uipD5AAJPr2FQ346TLzPWN/tests/tempTest.spec.js:2:1)
		// 	    at processImmediate (node:internal/timers:504:21)
		// 
		// Covers objective: dist/cart.js:13:4:::16:5:::241:317
		// Covers objective: dist/cart.js:39:12:::39:47:::1219:1254
		// Covers objective: dist/cart.js:35:12:::35:72:::1028:1088
		// Covers objective: placeholder:::dist/cart.js:34:8:::36:9:::974:1098
		// Covers objective: dist/cart.js:33:4:::42:5:::947:1313
		// Covers objective: dist/cart.js:46:12:::46:46:::1418:1452
		// Covers objective: dist/cart.js:43:4:::52:5:::1318:1618
		// Covers objective: dist/cart.js:54:4:::64:5:::1662:2038
		
		// Test
		const cart = new Cart()
		const anon = 1800;
		const anon1 = null;
		const sku = new Cart(anon, anon1)
		const qty = 3000;
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
		// 	    at Cart.remove [as applyCoupon] (.syntest/FID-1788957472087-uipD5AAJPr2FQ346TLzPWN/instrumented/dist/cart.js:1453:13)
		// 	    at call (.syntest/FID-1788957472087-uipD5AAJPr2FQ346TLzPWN/tests/tempTest.spec.js:17:40)
		// 	    at Generator._invoke (.syntest/FID-1788957472087-uipD5AAJPr2FQ346TLzPWN/tests/tempTest.spec.js:2:1)
		// 	    at Generator.next (.syntest/FID-1788957472087-uipD5AAJPr2FQ346TLzPWN/tests/tempTest.spec.js:2:1)
		// 	    at asyncGeneratorStep (.syntest/FID-1788957472087-uipD5AAJPr2FQ346TLzPWN/tests/tempTest.spec.js:2:1)
		// 	    at _next (.syntest/FID-1788957472087-uipD5AAJPr2FQ346TLzPWN/tests/tempTest.spec.js:2:1)
		// 	    at .syntest/FID-1788957472087-uipD5AAJPr2FQ346TLzPWN/tests/tempTest.spec.js:2:1
		// 	    at new Promise (<anonymous>)
		// 	    at Context.<anonymous> (.syntest/FID-1788957472087-uipD5AAJPr2FQ346TLzPWN/tests/tempTest.spec.js:2:1)
		// 	    at processImmediate (node:internal/timers:504:21)
		// 
		// Covers objective: dist/cart.js:13:4:::16:5:::241:317
		// Covers objective: dist/cart.js:39:12:::39:47:::1219:1254
		// Covers objective: dist/cart.js:35:12:::35:72:::1028:1088
		// Covers objective: placeholder:::dist/cart.js:34:8:::36:9:::974:1098
		// Covers objective: dist/cart.js:33:4:::42:5:::947:1313
		// Covers objective: dist/cart.js:46:12:::46:46:::1418:1452
		// Covers objective: dist/cart.js:43:4:::52:5:::1318:1618
		// Covers objective: dist/cart.js:54:4:::64:5:::1662:2038
		
		// Test
		const cart = new Cart()
		const code = () => {};
		const anon = 2000;
		
		// Assertions
		await expect((async () => {
			await cart.applyCoupon(code, anon)
		})()).to.be.rejectedWith(`unknown coupon`)
	})

	it("Test 7 for 'cart'", async () => {
		// Meta information
		// Selected for:
		// 	Error: unknown coupon
		// 	    at Cart.addReturnValue [as applyCoupon] (.syntest/FID-1788957472087-uipD5AAJPr2FQ346TLzPWN/instrumented/dist/cart.js:1453:13)
		// 	    at call (.syntest/FID-1788957472087-uipD5AAJPr2FQ346TLzPWN/tests/tempTest.spec.js:22:9)
		// 	    at Generator._invoke (.syntest/FID-1788957472087-uipD5AAJPr2FQ346TLzPWN/tests/tempTest.spec.js:2:1)
		// 	    at Generator.next (.syntest/FID-1788957472087-uipD5AAJPr2FQ346TLzPWN/tests/tempTest.spec.js:2:1)
		// 	    at asyncGeneratorStep (.syntest/FID-1788957472087-uipD5AAJPr2FQ346TLzPWN/tests/tempTest.spec.js:2:1)
		// 	    at _next (.syntest/FID-1788957472087-uipD5AAJPr2FQ346TLzPWN/tests/tempTest.spec.js:2:1)
		// 
		// Covers objective: dist/cart.js:13:4:::16:5:::241:317
		// Covers objective: dist/cart.js:39:12:::39:47:::1219:1254
		// Covers objective: dist/cart.js:35:12:::35:72:::1028:1088
		// Covers objective: placeholder:::dist/cart.js:34:8:::36:9:::974:1098
		// Covers objective: dist/cart.js:33:4:::42:5:::947:1313
		// Covers objective: dist/cart.js:46:12:::46:46:::1418:1452
		// Covers objective: dist/cart.js:43:4:::52:5:::1318:1618
		// Covers objective: dist/cart.js:54:4:::64:5:::1662:2038
		
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
		// Selected for objective: dist/cart.js:17:4:::31:5:::322:889
		// Selected for objective: placeholder:::dist/cart.js:18:8:::20:9:::358:505
		// Selected for objective: dist/cart.js:22:12:::22:72:::568:628
		// Selected for:
		// 	RangeError: quantity must be a positive integer
		// 	    at Cart.removeReturnValue [as add] (.syntest/FID-1788957472087-uipD5AAJPr2FQ346TLzPWN/instrumented/dist/cart.js:1367:13)
		// 	    at call (.syntest/FID-1788957472087-uipD5AAJPr2FQ346TLzPWN/tests/tempTest.spec.js:17:9)
		// 	    at Generator._invoke (.syntest/FID-1788957472087-uipD5AAJPr2FQ346TLzPWN/tests/tempTest.spec.js:2:1)
		// 	    at Generator.next (.syntest/FID-1788957472087-uipD5AAJPr2FQ346TLzPWN/tests/tempTest.spec.js:2:1)
		// 	    at asyncGeneratorStep (.syntest/FID-1788957472087-uipD5AAJPr2FQ346TLzPWN/tests/tempTest.spec.js:2:1)
		// 	    at _next (.syntest/FID-1788957472087-uipD5AAJPr2FQ346TLzPWN/tests/tempTest.spec.js:2:1)
		// 	    at .syntest/FID-1788957472087-uipD5AAJPr2FQ346TLzPWN/tests/tempTest.spec.js:2:1
		// 	    at new Promise (<anonymous>)
		// 	    at Context.<anonymous> (.syntest/FID-1788957472087-uipD5AAJPr2FQ346TLzPWN/tests/tempTest.spec.js:2:1)
		// 	    at processImmediate (node:internal/timers:504:21)
		// 
		// Covers objective: dist/cart.js:13:4:::16:5:::241:317
		// Covers objective: dist/cart.js:22:12:::22:72:::568:628
		// Covers objective: placeholder:::dist/cart.js:18:8:::20:9:::358:505
		// Covers objective: dist/cart.js:17:4:::31:5:::322:889
		// Covers objective: dist/cart.js:39:12:::39:47:::1219:1254
		// Covers objective: dist/cart.js:35:12:::35:72:::1028:1088
		// Covers objective: placeholder:::dist/cart.js:34:8:::36:9:::974:1098
		// Covers objective: dist/cart.js:33:4:::42:5:::947:1313
		// Covers objective: dist/cart.js:46:12:::46:46:::1418:1452
		// Covers objective: dist/cart.js:43:4:::52:5:::1318:1618
		// Covers objective: dist/cart.js:54:4:::64:5:::1662:2038
		
		// Test
		const cart = new Cart()
		const sku = 39;
		const priceGrosz = 1995;
		const qty = []
		const anon = -331.6419626744557;
		
		// Assertions
		await expect((async () => {
			await cart.add(sku, priceGrosz, qty, anon)
		})()).to.be.rejectedWith(`quantity must be a positive integer`)
	})

	it("Test 9 for 'cart'", async () => {
		// Meta information
		// Selected for objective: dist/cart.js:19:12:::19:82:::425:495
		// Selected for:
		// 	RangeError: price must be a non-negative integer of grosz
		// 	    at Cart [as add] (.syntest/FID-1788957472087-uipD5AAJPr2FQ346TLzPWN/instrumented/dist/cart.js:1352:13)
		// 	    at call (.syntest/FID-1788957472087-uipD5AAJPr2FQ346TLzPWN/tests/tempTest.spec.js:18:21)
		// 	    at Generator._invoke (.syntest/FID-1788957472087-uipD5AAJPr2FQ346TLzPWN/tests/tempTest.spec.js:2:1)
		// 	    at Generator.next (.syntest/FID-1788957472087-uipD5AAJPr2FQ346TLzPWN/tests/tempTest.spec.js:2:1)
		// 	    at asyncGeneratorStep (.syntest/FID-1788957472087-uipD5AAJPr2FQ346TLzPWN/tests/tempTest.spec.js:2:1)
		// 	    at _next (.syntest/FID-1788957472087-uipD5AAJPr2FQ346TLzPWN/tests/tempTest.spec.js:2:1)
		// 	    at .syntest/FID-1788957472087-uipD5AAJPr2FQ346TLzPWN/tests/tempTest.spec.js:2:1
		// 	    at new Promise (<anonymous>)
		// 	    at Context.<anonymous> (.syntest/FID-1788957472087-uipD5AAJPr2FQ346TLzPWN/tests/tempTest.spec.js:2:1)
		// 	    at processImmediate (node:internal/timers:504:21)
		// 
		// Covers objective: dist/cart.js:13:4:::16:5:::241:317
		// Covers objective: dist/cart.js:22:12:::22:72:::568:628
		// Covers objective: dist/cart.js:19:12:::19:82:::425:495
		// Covers objective: placeholder:::dist/cart.js:18:8:::20:9:::358:505
		// Covers objective: dist/cart.js:17:4:::31:5:::322:889
		// Covers objective: dist/cart.js:39:12:::39:47:::1219:1254
		// Covers objective: dist/cart.js:35:12:::35:72:::1028:1088
		// Covers objective: placeholder:::dist/cart.js:34:8:::36:9:::974:1098
		// Covers objective: dist/cart.js:33:4:::42:5:::947:1313
		// Covers objective: dist/cart.js:46:12:::46:46:::1418:1452
		// Covers objective: dist/cart.js:43:4:::52:5:::1318:1618
		// Covers objective: dist/cart.js:54:4:::64:5:::1662:2038
		
		// Test
		const cart = new Cart()
		const sku = 2;
		const priceGrosz = () => {};
		const qty = 2000;
		const anon = () => {};
		const anon1 = "§M|]2o.!#o8wHfu^^AYBA} r±% §k";
		
		// Assertions
		await expect((async () => {
			await cart.add(sku, priceGrosz, qty, anon, anon1)
		})()).to.be.rejectedWith(`price must be a non-negative integer of grosz`)
	})

	it("Test 10 for 'cart'", async () => {
		// Meta information
		// Selected for objective: placeholder:::dist/cart.js:21:8:::23:9:::514:638
		// Selected for objective: dist/cart.js:26:12:::26:54:::759:801
		// Selected for:
		// 	Error: sku not in cart
		// 	    at Cart.add [as remove] (.syntest/FID-1788957472087-uipD5AAJPr2FQ346TLzPWN/instrumented/dist/cart.js:1432:13)
		// 	    at call (.syntest/FID-1788957472087-uipD5AAJPr2FQ346TLzPWN/tests/tempTest.spec.js:22:38)
		// 	    at Generator._invoke (.syntest/FID-1788957472087-uipD5AAJPr2FQ346TLzPWN/tests/tempTest.spec.js:2:1)
		// 	    at Generator.next (.syntest/FID-1788957472087-uipD5AAJPr2FQ346TLzPWN/tests/tempTest.spec.js:2:1)
		// 	    at asyncGeneratorStep (.syntest/FID-1788957472087-uipD5AAJPr2FQ346TLzPWN/tests/tempTest.spec.js:2:1)
		// 	    at _next (.syntest/FID-1788957472087-uipD5AAJPr2FQ346TLzPWN/tests/tempTest.spec.js:2:1)
		// 
		// Covers objective: dist/cart.js:13:4:::16:5:::241:317
		// Covers objective: dist/cart.js:26:12:::26:54:::759:801
		// Covers objective: dist/cart.js:22:12:::22:72:::568:628
		// Covers objective: placeholder:::dist/cart.js:21:8:::23:9:::514:638
		// Covers objective: dist/cart.js:19:12:::19:82:::425:495
		// Covers objective: placeholder:::dist/cart.js:18:8:::20:9:::358:505
		// Covers objective: dist/cart.js:17:4:::31:5:::322:889
		// Covers objective: dist/cart.js:39:12:::39:47:::1219:1254
		// Covers objective: dist/cart.js:35:12:::35:72:::1028:1088
		// Covers objective: placeholder:::dist/cart.js:34:8:::36:9:::974:1098
		// Covers objective: dist/cart.js:33:4:::42:5:::947:1313
		// Covers objective: dist/cart.js:46:12:::46:46:::1418:1452
		// Covers objective: dist/cart.js:43:4:::52:5:::1318:1618
		// Covers objective: dist/cart.js:54:4:::64:5:::1662:2038
		
		// Test
		const cart = new Cart()
		const sku = "amounts must not be negative";
		const priceGrosz = 1799;
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
		// 	    at Cart [as remove] (.syntest/FID-1788957472087-uipD5AAJPr2FQ346TLzPWN/instrumented/dist/cart.js:1412:13)
		// 	    at call (.syntest/FID-1788957472087-uipD5AAJPr2FQ346TLzPWN/tests/tempTest.spec.js:18:21)
		// 	    at Generator._invoke (.syntest/FID-1788957472087-uipD5AAJPr2FQ346TLzPWN/tests/tempTest.spec.js:2:1)
		// 	    at Generator.next (.syntest/FID-1788957472087-uipD5AAJPr2FQ346TLzPWN/tests/tempTest.spec.js:2:1)
		// 	    at asyncGeneratorStep (.syntest/FID-1788957472087-uipD5AAJPr2FQ346TLzPWN/tests/tempTest.spec.js:2:1)
		// 	    at _next (.syntest/FID-1788957472087-uipD5AAJPr2FQ346TLzPWN/tests/tempTest.spec.js:2:1)
		// 	    at .syntest/FID-1788957472087-uipD5AAJPr2FQ346TLzPWN/tests/tempTest.spec.js:2:1
		// 	    at new Promise (<anonymous>)
		// 	    at Context.<anonymous> (.syntest/FID-1788957472087-uipD5AAJPr2FQ346TLzPWN/tests/tempTest.spec.js:2:1)
		// 	    at processImmediate (node:internal/timers:504:21)
		// 
		// Covers objective: dist/cart.js:13:4:::16:5:::241:317
		// Covers objective: dist/cart.js:26:12:::26:54:::759:801
		// Covers objective: dist/cart.js:22:12:::22:72:::568:628
		// Covers objective: placeholder:::dist/cart.js:21:8:::23:9:::514:638
		// Covers objective: dist/cart.js:19:12:::19:82:::425:495
		// Covers objective: placeholder:::dist/cart.js:18:8:::20:9:::358:505
		// Covers objective: dist/cart.js:17:4:::31:5:::322:889
		// Covers objective: dist/cart.js:39:12:::39:47:::1219:1254
		// Covers objective: dist/cart.js:35:12:::35:72:::1028:1088
		// Covers objective: placeholder:::dist/cart.js:34:8:::36:9:::974:1098
		// Covers objective: dist/cart.js:33:4:::42:5:::947:1313
		// Covers objective: dist/cart.js:46:12:::46:46:::1418:1452
		// Covers objective: dist/cart.js:43:4:::52:5:::1318:1618
		// Covers objective: dist/cart.js:54:4:::64:5:::1662:2038
		
		// Test
		const anon = "valueOf";
		const cart = new Cart(anon)
		const arrayElement = "sequence number must not be zero";
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
		// 	    at Cart [as applyCoupon] (.syntest/FID-1788957472087-uipD5AAJPr2FQ346TLzPWN/instrumented/dist/cart.js:1453:13)
		// 	    at call (.syntest/FID-1788957472087-uipD5AAJPr2FQ346TLzPWN/tests/tempTest.spec.js:18:21)
		// 	    at Generator._invoke (.syntest/FID-1788957472087-uipD5AAJPr2FQ346TLzPWN/tests/tempTest.spec.js:2:1)
		// 	    at Generator.next (.syntest/FID-1788957472087-uipD5AAJPr2FQ346TLzPWN/tests/tempTest.spec.js:2:1)
		// 	    at asyncGeneratorStep (.syntest/FID-1788957472087-uipD5AAJPr2FQ346TLzPWN/tests/tempTest.spec.js:2:1)
		// 	    at _next (.syntest/FID-1788957472087-uipD5AAJPr2FQ346TLzPWN/tests/tempTest.spec.js:2:1)
		// 	    at .syntest/FID-1788957472087-uipD5AAJPr2FQ346TLzPWN/tests/tempTest.spec.js:2:1
		// 	    at new Promise (<anonymous>)
		// 	    at Context.<anonymous> (.syntest/FID-1788957472087-uipD5AAJPr2FQ346TLzPWN/tests/tempTest.spec.js:2:1)
		// 	    at processImmediate (node:internal/timers:504:21)
		// 
		// Covers objective: dist/cart.js:13:4:::16:5:::241:317
		// Covers objective: dist/cart.js:26:12:::26:54:::759:801
		// Covers objective: dist/cart.js:22:12:::22:72:::568:628
		// Covers objective: placeholder:::dist/cart.js:21:8:::23:9:::514:638
		// Covers objective: dist/cart.js:19:12:::19:82:::425:495
		// Covers objective: placeholder:::dist/cart.js:18:8:::20:9:::358:505
		// Covers objective: dist/cart.js:17:4:::31:5:::322:889
		// Covers objective: dist/cart.js:39:12:::39:47:::1219:1254
		// Covers objective: dist/cart.js:35:12:::35:72:::1028:1088
		// Covers objective: placeholder:::dist/cart.js:34:8:::36:9:::974:1098
		// Covers objective: dist/cart.js:33:4:::42:5:::947:1313
		// Covers objective: dist/cart.js:46:12:::46:46:::1418:1452
		// Covers objective: dist/cart.js:43:4:::52:5:::1318:1618
		// Covers objective: dist/cart.js:54:4:::64:5:::1662:2038
		
		// Test
		const cart = new Cart()
		const anon = "valueOf";
		const cart1 = new Cart(anon)
		const code = "SKU-2";
		const anon1 = "valueOf";
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
		// 	    at Cart.removeReturnValue [as remove] (.syntest/FID-1788957472087-uipD5AAJPr2FQ346TLzPWN/instrumented/dist/cart.js:1412:13)
		// 	    at call (.syntest/FID-1788957472087-uipD5AAJPr2FQ346TLzPWN/tests/tempTest.spec.js:17:9)
		// 	    at Generator._invoke (.syntest/FID-1788957472087-uipD5AAJPr2FQ346TLzPWN/tests/tempTest.spec.js:2:1)
		// 	    at Generator.next (.syntest/FID-1788957472087-uipD5AAJPr2FQ346TLzPWN/tests/tempTest.spec.js:2:1)
		// 	    at asyncGeneratorStep (.syntest/FID-1788957472087-uipD5AAJPr2FQ346TLzPWN/tests/tempTest.spec.js:2:1)
		// 	    at _next (.syntest/FID-1788957472087-uipD5AAJPr2FQ346TLzPWN/tests/tempTest.spec.js:2:1)
		// 	    at .syntest/FID-1788957472087-uipD5AAJPr2FQ346TLzPWN/tests/tempTest.spec.js:2:1
		// 	    at new Promise (<anonymous>)
		// 	    at Context.<anonymous> (.syntest/FID-1788957472087-uipD5AAJPr2FQ346TLzPWN/tests/tempTest.spec.js:2:1)
		// 	    at processImmediate (node:internal/timers:504:21)
		// 
		// Covers objective: dist/cart.js:13:4:::16:5:::241:317
		// Covers objective: dist/cart.js:26:12:::26:54:::759:801
		// Covers objective: dist/cart.js:22:12:::22:72:::568:628
		// Covers objective: placeholder:::dist/cart.js:21:8:::23:9:::514:638
		// Covers objective: dist/cart.js:19:12:::19:82:::425:495
		// Covers objective: placeholder:::dist/cart.js:18:8:::20:9:::358:505
		// Covers objective: dist/cart.js:17:4:::31:5:::322:889
		// Covers objective: dist/cart.js:39:12:::39:47:::1219:1254
		// Covers objective: dist/cart.js:35:12:::35:72:::1028:1088
		// Covers objective: placeholder:::dist/cart.js:34:8:::36:9:::974:1098
		// Covers objective: dist/cart.js:33:4:::42:5:::947:1313
		// Covers objective: dist/cart.js:46:12:::46:46:::1418:1452
		// Covers objective: dist/cart.js:43:4:::52:5:::1318:1618
		// Covers objective: dist/cart.js:54:4:::64:5:::1662:2038
		
		// Test
		const cart = new Cart()
		const arrayElement = "sequence number must not be zero";
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
		// 	RangeError: quantity must be a positive integer
		// 	    at Cart.add (.syntest/FID-1788957472087-uipD5AAJPr2FQ346TLzPWN/instrumented/dist/cart.js:1367:13)
		// 	    at call (.syntest/FID-1788957472087-uipD5AAJPr2FQ346TLzPWN/tests/tempTest.spec.js:21:20)
		// 	    at Generator._invoke (.syntest/FID-1788957472087-uipD5AAJPr2FQ346TLzPWN/tests/tempTest.spec.js:2:1)
		// 	    at Generator.next (.syntest/FID-1788957472087-uipD5AAJPr2FQ346TLzPWN/tests/tempTest.spec.js:2:1)
		// 	    at asyncGeneratorStep (.syntest/FID-1788957472087-uipD5AAJPr2FQ346TLzPWN/tests/tempTest.spec.js:2:1)
		// 	    at _next (.syntest/FID-1788957472087-uipD5AAJPr2FQ346TLzPWN/tests/tempTest.spec.js:2:1)
		// 	    at .syntest/FID-1788957472087-uipD5AAJPr2FQ346TLzPWN/tests/tempTest.spec.js:2:1
		// 	    at new Promise (<anonymous>)
		// 	    at Context.<anonymous> (.syntest/FID-1788957472087-uipD5AAJPr2FQ346TLzPWN/tests/tempTest.spec.js:2:1)
		// 	    at processImmediate (node:internal/timers:504:21)
		// 
		// Covers objective: dist/cart.js:13:4:::16:5:::241:317
		// Covers objective: dist/cart.js:26:12:::26:54:::759:801
		// Covers objective: dist/cart.js:22:12:::22:72:::568:628
		// Covers objective: placeholder:::dist/cart.js:21:8:::23:9:::514:638
		// Covers objective: dist/cart.js:19:12:::19:82:::425:495
		// Covers objective: placeholder:::dist/cart.js:18:8:::20:9:::358:505
		// Covers objective: dist/cart.js:17:4:::31:5:::322:889
		// Covers objective: dist/cart.js:39:12:::39:47:::1219:1254
		// Covers objective: dist/cart.js:35:12:::35:72:::1028:1088
		// Covers objective: placeholder:::dist/cart.js:34:8:::36:9:::974:1098
		// Covers objective: dist/cart.js:33:4:::42:5:::947:1313
		// Covers objective: dist/cart.js:46:12:::46:46:::1418:1452
		// Covers objective: dist/cart.js:43:4:::52:5:::1318:1618
		// Covers objective: dist/cart.js:54:4:::64:5:::1662:2038
		
		// Test
		const anon = "SKU-1";
		const cart = new Cart(anon)
		const arrayElement = {}
		const arrayElement1 = "sku not in cart";
		const arrayElement2 = "name";
		const sku = [arrayElement, arrayElement1, arrayElement2]
		const priceGrosz = 4500;
		const qty = "SAVE0";
		const anon1 = new Cart()
		
		// Assertions
		await expect((async () => {
			await cart.add(sku, priceGrosz, qty, anon1)
		})()).to.be.rejectedWith(`quantity must be a positive integer`)
	})

	it("Test 15 for 'cart'", async () => {
		// Meta information
		// Selected for:
		// 	RangeError: price must be a non-negative integer of grosz
		// 	    at Cart.add (.syntest/FID-1788957472087-uipD5AAJPr2FQ346TLzPWN/instrumented/dist/cart.js:1352:13)
		// 	    at call (.syntest/FID-1788957472087-uipD5AAJPr2FQ346TLzPWN/tests/tempTest.spec.js:21:20)
		// 	    at Generator._invoke (.syntest/FID-1788957472087-uipD5AAJPr2FQ346TLzPWN/tests/tempTest.spec.js:2:1)
		// 	    at Generator.next (.syntest/FID-1788957472087-uipD5AAJPr2FQ346TLzPWN/tests/tempTest.spec.js:2:1)
		// 	    at asyncGeneratorStep (.syntest/FID-1788957472087-uipD5AAJPr2FQ346TLzPWN/tests/tempTest.spec.js:2:1)
		// 	    at _next (.syntest/FID-1788957472087-uipD5AAJPr2FQ346TLzPWN/tests/tempTest.spec.js:2:1)
		// 	    at .syntest/FID-1788957472087-uipD5AAJPr2FQ346TLzPWN/tests/tempTest.spec.js:2:1
		// 	    at new Promise (<anonymous>)
		// 	    at Context.<anonymous> (.syntest/FID-1788957472087-uipD5AAJPr2FQ346TLzPWN/tests/tempTest.spec.js:2:1)
		// 	    at processImmediate (node:internal/timers:504:21)
		// 
		// Covers objective: dist/cart.js:13:4:::16:5:::241:317
		// Covers objective: dist/cart.js:26:12:::26:54:::759:801
		// Covers objective: dist/cart.js:22:12:::22:72:::568:628
		// Covers objective: placeholder:::dist/cart.js:21:8:::23:9:::514:638
		// Covers objective: dist/cart.js:19:12:::19:82:::425:495
		// Covers objective: placeholder:::dist/cart.js:18:8:::20:9:::358:505
		// Covers objective: dist/cart.js:17:4:::31:5:::322:889
		// Covers objective: dist/cart.js:39:12:::39:47:::1219:1254
		// Covers objective: dist/cart.js:35:12:::35:72:::1028:1088
		// Covers objective: placeholder:::dist/cart.js:34:8:::36:9:::974:1098
		// Covers objective: dist/cart.js:33:4:::42:5:::947:1313
		// Covers objective: dist/cart.js:46:12:::46:46:::1418:1452
		// Covers objective: dist/cart.js:43:4:::52:5:::1318:1618
		// Covers objective: dist/cart.js:54:4:::64:5:::1662:2038
		
		// Test
		const cart = new Cart()
		const sku = undefined;
		const priceGrosz = -891;
		const qty = -821.599315296084;
		const anon = () => {};
		const arrayElement = undefined;
		const arrayElement1 = false;
		const anon1 = [arrayElement, arrayElement1]
		const anon2 = new Cart(anon1)
		
		// Assertions
		await expect((async () => {
			await cart.add(sku, priceGrosz, qty, anon, anon2)
		})()).to.be.rejectedWith(`price must be a non-negative integer of grosz`)
	})

	it("Test 16 for 'cart'", async () => {
		// Meta information
		// Selected for:
		// 	RangeError: quantity must be a positive integer
		// 	    at Cart.add [as remove] (.syntest/FID-1788957472087-uipD5AAJPr2FQ346TLzPWN/instrumented/dist/cart.js:1412:13)
		// 	    at call (.syntest/FID-1788957472087-uipD5AAJPr2FQ346TLzPWN/tests/tempTest.spec.js:22:38)
		// 	    at Generator._invoke (.syntest/FID-1788957472087-uipD5AAJPr2FQ346TLzPWN/tests/tempTest.spec.js:2:1)
		// 	    at Generator.next (.syntest/FID-1788957472087-uipD5AAJPr2FQ346TLzPWN/tests/tempTest.spec.js:2:1)
		// 	    at asyncGeneratorStep (.syntest/FID-1788957472087-uipD5AAJPr2FQ346TLzPWN/tests/tempTest.spec.js:2:1)
		// 	    at _next (.syntest/FID-1788957472087-uipD5AAJPr2FQ346TLzPWN/tests/tempTest.spec.js:2:1)
		// 
		// Covers objective: dist/cart.js:13:4:::16:5:::241:317
		// Covers objective: dist/cart.js:26:12:::26:54:::759:801
		// Covers objective: dist/cart.js:22:12:::22:72:::568:628
		// Covers objective: placeholder:::dist/cart.js:21:8:::23:9:::514:638
		// Covers objective: dist/cart.js:19:12:::19:82:::425:495
		// Covers objective: placeholder:::dist/cart.js:18:8:::20:9:::358:505
		// Covers objective: dist/cart.js:17:4:::31:5:::322:889
		// Covers objective: dist/cart.js:39:12:::39:47:::1219:1254
		// Covers objective: dist/cart.js:35:12:::35:72:::1028:1088
		// Covers objective: placeholder:::dist/cart.js:34:8:::36:9:::974:1098
		// Covers objective: dist/cart.js:33:4:::42:5:::947:1313
		// Covers objective: dist/cart.js:46:12:::46:46:::1418:1452
		// Covers objective: dist/cart.js:43:4:::52:5:::1318:1618
		// Covers objective: dist/cart.js:54:4:::64:5:::1662:2038
		
		// Test
		const cart = new Cart()
		const sku = "amounts must not be negative";
		const priceGrosz = 1799;
		const qty = 235;
		const addReturnValue = await cart.add(sku, priceGrosz, qty)
		const cart1 = new Cart()
		const sku1 = null;
		const qty1 = 933.5552367207205;
		
		// Assertions
		expect(addReturnValue).to.equal(undefined)
		await expect((async () => {
			await cart1.remove(sku1, qty1)
		})()).to.be.rejectedWith(`quantity must be a positive integer`)
	})

	it("Test 17 for 'cart'", async () => {
		// Meta information
		// Selected for:
		// 	Error: unknown coupon
		// 	    at Cart.removeReturnValue [as applyCoupon] (.syntest/FID-1788957472087-uipD5AAJPr2FQ346TLzPWN/instrumented/dist/cart.js:1453:13)
		// 	    at call (.syntest/FID-1788957472087-uipD5AAJPr2FQ346TLzPWN/tests/tempTest.spec.js:17:9)
		// 	    at Generator._invoke (.syntest/FID-1788957472087-uipD5AAJPr2FQ346TLzPWN/tests/tempTest.spec.js:2:1)
		// 	    at Generator.next (.syntest/FID-1788957472087-uipD5AAJPr2FQ346TLzPWN/tests/tempTest.spec.js:2:1)
		// 	    at asyncGeneratorStep (.syntest/FID-1788957472087-uipD5AAJPr2FQ346TLzPWN/tests/tempTest.spec.js:2:1)
		// 	    at _next (.syntest/FID-1788957472087-uipD5AAJPr2FQ346TLzPWN/tests/tempTest.spec.js:2:1)
		// 	    at .syntest/FID-1788957472087-uipD5AAJPr2FQ346TLzPWN/tests/tempTest.spec.js:2:1
		// 	    at new Promise (<anonymous>)
		// 	    at Context.<anonymous> (.syntest/FID-1788957472087-uipD5AAJPr2FQ346TLzPWN/tests/tempTest.spec.js:2:1)
		// 	    at processImmediate (node:internal/timers:504:21)
		// 
		// Covers objective: dist/cart.js:13:4:::16:5:::241:317
		// Covers objective: dist/cart.js:26:12:::26:54:::759:801
		// Covers objective: dist/cart.js:22:12:::22:72:::568:628
		// Covers objective: placeholder:::dist/cart.js:21:8:::23:9:::514:638
		// Covers objective: dist/cart.js:19:12:::19:82:::425:495
		// Covers objective: placeholder:::dist/cart.js:18:8:::20:9:::358:505
		// Covers objective: dist/cart.js:17:4:::31:5:::322:889
		// Covers objective: dist/cart.js:39:12:::39:47:::1219:1254
		// Covers objective: dist/cart.js:35:12:::35:72:::1028:1088
		// Covers objective: placeholder:::dist/cart.js:34:8:::36:9:::974:1098
		// Covers objective: dist/cart.js:33:4:::42:5:::947:1313
		// Covers objective: dist/cart.js:46:12:::46:46:::1418:1452
		// Covers objective: dist/cart.js:43:4:::52:5:::1318:1618
		// Covers objective: dist/cart.js:54:4:::64:5:::1662:2038
		
		// Test
		const cart = new Cart()
		const anon = "value+f";
		const cart1 = new Cart(anon)
		const code = "SKU-2";
		const cart2 = new Cart()
		
		// Assertions
		await expect((async () => {
			await cart1.applyCoupon(code, cart2)
		})()).to.be.rejectedWith(`unknown coupon`)
	})

	it("Test 18 for 'cart'", async () => {
		// Meta information
		// Selected for:
		// 	RangeError: price must be a non-negative integer of grosz
		// 	    at Cart.removeReturnValue [as add] (.syntest/FID-1788957472087-uipD5AAJPr2FQ346TLzPWN/instrumented/dist/cart.js:1352:13)
		// 	    at call (.syntest/FID-1788957472087-uipD5AAJPr2FQ346TLzPWN/tests/tempTest.spec.js:17:9)
		// 	    at Generator._invoke (.syntest/FID-1788957472087-uipD5AAJPr2FQ346TLzPWN/tests/tempTest.spec.js:2:1)
		// 	    at Generator.next (.syntest/FID-1788957472087-uipD5AAJPr2FQ346TLzPWN/tests/tempTest.spec.js:2:1)
		// 	    at asyncGeneratorStep (.syntest/FID-1788957472087-uipD5AAJPr2FQ346TLzPWN/tests/tempTest.spec.js:2:1)
		// 	    at _next (.syntest/FID-1788957472087-uipD5AAJPr2FQ346TLzPWN/tests/tempTest.spec.js:2:1)
		// 	    at .syntest/FID-1788957472087-uipD5AAJPr2FQ346TLzPWN/tests/tempTest.spec.js:2:1
		// 	    at new Promise (<anonymous>)
		// 	    at Context.<anonymous> (.syntest/FID-1788957472087-uipD5AAJPr2FQ346TLzPWN/tests/tempTest.spec.js:2:1)
		// 	    at processImmediate (node:internal/timers:504:21)
		// 
		// Covers objective: dist/cart.js:13:4:::16:5:::241:317
		// Covers objective: dist/cart.js:26:12:::26:54:::759:801
		// Covers objective: dist/cart.js:22:12:::22:72:::568:628
		// Covers objective: placeholder:::dist/cart.js:21:8:::23:9:::514:638
		// Covers objective: dist/cart.js:19:12:::19:82:::425:495
		// Covers objective: placeholder:::dist/cart.js:18:8:::20:9:::358:505
		// Covers objective: dist/cart.js:17:4:::31:5:::322:889
		// Covers objective: dist/cart.js:39:12:::39:47:::1219:1254
		// Covers objective: dist/cart.js:35:12:::35:72:::1028:1088
		// Covers objective: placeholder:::dist/cart.js:34:8:::36:9:::974:1098
		// Covers objective: dist/cart.js:33:4:::42:5:::947:1313
		// Covers objective: dist/cart.js:46:12:::46:46:::1418:1452
		// Covers objective: dist/cart.js:43:4:::52:5:::1318:1618
		// Covers objective: dist/cart.js:54:4:::64:5:::1662:2038
		
		// Test
		const cart = new Cart()
		const sku = () => {};
		const priceGrosz = -1;
		const qty = -419.16322736184077;
		const anon = null;
		
		// Assertions
		await expect((async () => {
			await cart.add(sku, priceGrosz, qty, anon)
		})()).to.be.rejectedWith(`price must be a non-negative integer of grosz`)
	})

	it("Test 19 for 'cart'", async () => {
		// Meta information
		// Selected for objective: placeholder:::dist/cart.js:45:8:::47:9:::1381:1462
		// Selected for objective: dist/cart.js:49:12:::49:68:::1514:1570
		// Selected for:
		// 	Error: cannot apply coupon to an empty cart
		// 	    at Cart.applyCoupon (.syntest/FID-1788957472087-uipD5AAJPr2FQ346TLzPWN/instrumented/dist/cart.js:1467:13)
		// 	    at call (.syntest/FID-1788957472087-uipD5AAJPr2FQ346TLzPWN/tests/tempTest.spec.js:19:16)
		// 	    at Generator._invoke (.syntest/FID-1788957472087-uipD5AAJPr2FQ346TLzPWN/tests/tempTest.spec.js:2:1)
		// 	    at Generator.next (.syntest/FID-1788957472087-uipD5AAJPr2FQ346TLzPWN/tests/tempTest.spec.js:2:1)
		// 	    at asyncGeneratorStep (.syntest/FID-1788957472087-uipD5AAJPr2FQ346TLzPWN/tests/tempTest.spec.js:2:1)
		// 	    at _next (.syntest/FID-1788957472087-uipD5AAJPr2FQ346TLzPWN/tests/tempTest.spec.js:2:1)
		// 	    at .syntest/FID-1788957472087-uipD5AAJPr2FQ346TLzPWN/tests/tempTest.spec.js:2:1
		// 	    at new Promise (<anonymous>)
		// 	    at Context.<anonymous> (.syntest/FID-1788957472087-uipD5AAJPr2FQ346TLzPWN/tests/tempTest.spec.js:2:1)
		// 	    at processImmediate (node:internal/timers:504:21)
		// 
		// Covers objective: dist/cart.js:13:4:::16:5:::241:317
		// Covers objective: dist/cart.js:26:12:::26:54:::759:801
		// Covers objective: dist/cart.js:22:12:::22:72:::568:628
		// Covers objective: placeholder:::dist/cart.js:21:8:::23:9:::514:638
		// Covers objective: dist/cart.js:19:12:::19:82:::425:495
		// Covers objective: placeholder:::dist/cart.js:18:8:::20:9:::358:505
		// Covers objective: dist/cart.js:17:4:::31:5:::322:889
		// Covers objective: dist/cart.js:39:12:::39:47:::1219:1254
		// Covers objective: dist/cart.js:35:12:::35:72:::1028:1088
		// Covers objective: placeholder:::dist/cart.js:34:8:::36:9:::974:1098
		// Covers objective: dist/cart.js:33:4:::42:5:::947:1313
		// Covers objective: dist/cart.js:49:12:::49:68:::1514:1570
		// Covers objective: dist/cart.js:46:12:::46:46:::1418:1452
		// Covers objective: placeholder:::dist/cart.js:45:8:::47:9:::1381:1462
		// Covers objective: dist/cart.js:43:4:::52:5:::1318:1618
		// Covers objective: dist/cart.js:54:4:::64:5:::1662:2038
		
		// Test
		const arrayElement = 9007199254740991;
		const arrayElement1 = null;
		const anon = [arrayElement, arrayElement1]
		const cart = new Cart(anon)
		const code = "isPrototypeOf";
		const anon1 = "cannot apply coupon to an empty cart";
		const anon2 = ".(_j#]y7Z94FZm`!§9CD|%6ygi8Sjc=H[oQZYinX^*CPgW§I`5J=Z4Nb>tcv*dhz-[4X\"Y;F.IOF,Lij\ngT";
		
		// Assertions
		await expect((async () => {
			await cart.applyCoupon(code, anon1, anon2)
		})()).to.be.rejectedWith(`cannot apply coupon to an empty cart`)
	})

	it("Test 20 for 'cart'", async () => {
		// Meta information
		// Selected for:
		// 	Error: cannot apply coupon to an empty cart
		// 	    at Cart.removeReturnValue [as applyCoupon] (.syntest/FID-1788957472087-uipD5AAJPr2FQ346TLzPWN/instrumented/dist/cart.js:1467:13)
		// 	    at call (.syntest/FID-1788957472087-uipD5AAJPr2FQ346TLzPWN/tests/tempTest.spec.js:17:9)
		// 	    at Generator._invoke (.syntest/FID-1788957472087-uipD5AAJPr2FQ346TLzPWN/tests/tempTest.spec.js:2:1)
		// 	    at Generator.next (.syntest/FID-1788957472087-uipD5AAJPr2FQ346TLzPWN/tests/tempTest.spec.js:2:1)
		// 	    at asyncGeneratorStep (.syntest/FID-1788957472087-uipD5AAJPr2FQ346TLzPWN/tests/tempTest.spec.js:2:1)
		// 	    at _next (.syntest/FID-1788957472087-uipD5AAJPr2FQ346TLzPWN/tests/tempTest.spec.js:2:1)
		// 	    at .syntest/FID-1788957472087-uipD5AAJPr2FQ346TLzPWN/tests/tempTest.spec.js:2:1
		// 	    at new Promise (<anonymous>)
		// 	    at Context.<anonymous> (.syntest/FID-1788957472087-uipD5AAJPr2FQ346TLzPWN/tests/tempTest.spec.js:2:1)
		// 	    at processImmediate (node:internal/timers:504:21)
		// 
		// Covers objective: dist/cart.js:13:4:::16:5:::241:317
		// Covers objective: dist/cart.js:26:12:::26:54:::759:801
		// Covers objective: dist/cart.js:22:12:::22:72:::568:628
		// Covers objective: placeholder:::dist/cart.js:21:8:::23:9:::514:638
		// Covers objective: dist/cart.js:19:12:::19:82:::425:495
		// Covers objective: placeholder:::dist/cart.js:18:8:::20:9:::358:505
		// Covers objective: dist/cart.js:17:4:::31:5:::322:889
		// Covers objective: dist/cart.js:39:12:::39:47:::1219:1254
		// Covers objective: dist/cart.js:35:12:::35:72:::1028:1088
		// Covers objective: placeholder:::dist/cart.js:34:8:::36:9:::974:1098
		// Covers objective: dist/cart.js:33:4:::42:5:::947:1313
		// Covers objective: dist/cart.js:49:12:::49:68:::1514:1570
		// Covers objective: dist/cart.js:46:12:::46:46:::1418:1452
		// Covers objective: placeholder:::dist/cart.js:45:8:::47:9:::1381:1462
		// Covers objective: dist/cart.js:43:4:::52:5:::1318:1618
		// Covers objective: dist/cart.js:54:4:::64:5:::1662:2038
		
		// Test
		const anon = -458.99668966355523;
		const cart = new Cart(anon)
		const code = "isPrototypeOf";
		const anon1 = "cannot apply coupon to an empty cart";
		const anon2 = ".(_j#]y7Z94FZm`!§9CD|%6ygi8Sjc=H[oQZYinX^*CPgW§I`5J=Z4Nb>tcv*dhz-[4X\"Y;F.IOF,Lij\ngT";
		
		// Assertions
		await expect((async () => {
			await cart.applyCoupon(code, anon1, anon2)
		})()).to.be.rejectedWith(`cannot apply coupon to an empty cart`)
	})

	it("Test 21 for 'cart'", async () => {
		// Meta information
		// Selected for:
		// 	Error: sku not in cart
		// 	    at Cart.removeReturnValue [as remove] (.syntest/FID-1788957472087-uipD5AAJPr2FQ346TLzPWN/instrumented/dist/cart.js:1432:13)
		// 	    at call (.syntest/FID-1788957472087-uipD5AAJPr2FQ346TLzPWN/tests/tempTest.spec.js:17:9)
		// 	    at Generator._invoke (.syntest/FID-1788957472087-uipD5AAJPr2FQ346TLzPWN/tests/tempTest.spec.js:2:1)
		// 	    at Generator.next (.syntest/FID-1788957472087-uipD5AAJPr2FQ346TLzPWN/tests/tempTest.spec.js:2:1)
		// 	    at asyncGeneratorStep (.syntest/FID-1788957472087-uipD5AAJPr2FQ346TLzPWN/tests/tempTest.spec.js:2:1)
		// 	    at _next (.syntest/FID-1788957472087-uipD5AAJPr2FQ346TLzPWN/tests/tempTest.spec.js:2:1)
		// 	    at .syntest/FID-1788957472087-uipD5AAJPr2FQ346TLzPWN/tests/tempTest.spec.js:2:1
		// 	    at new Promise (<anonymous>)
		// 	    at Context.<anonymous> (.syntest/FID-1788957472087-uipD5AAJPr2FQ346TLzPWN/tests/tempTest.spec.js:2:1)
		// 	    at processImmediate (node:internal/timers:504:21)
		// 
		// Covers objective: dist/cart.js:13:4:::16:5:::241:317
		// Covers objective: dist/cart.js:26:12:::26:54:::759:801
		// Covers objective: dist/cart.js:22:12:::22:72:::568:628
		// Covers objective: placeholder:::dist/cart.js:21:8:::23:9:::514:638
		// Covers objective: dist/cart.js:19:12:::19:82:::425:495
		// Covers objective: placeholder:::dist/cart.js:18:8:::20:9:::358:505
		// Covers objective: dist/cart.js:17:4:::31:5:::322:889
		// Covers objective: dist/cart.js:39:12:::39:47:::1219:1254
		// Covers objective: dist/cart.js:35:12:::35:72:::1028:1088
		// Covers objective: placeholder:::dist/cart.js:34:8:::36:9:::974:1098
		// Covers objective: dist/cart.js:33:4:::42:5:::947:1313
		// Covers objective: dist/cart.js:49:12:::49:68:::1514:1570
		// Covers objective: dist/cart.js:46:12:::46:46:::1418:1452
		// Covers objective: placeholder:::dist/cart.js:45:8:::47:9:::1381:1462
		// Covers objective: dist/cart.js:43:4:::52:5:::1318:1618
		// Covers objective: dist/cart.js:54:4:::64:5:::1662:2038
		
		// Test
		const cart = new Cart()
		const cart1 = new Cart()
		const sku = "hasOwnProperty";
		const qty = 3000;
		const anon = "PL";
		
		// Assertions
		await expect((async () => {
			await cart1.remove(sku, qty, anon)
		})()).to.be.rejectedWith(`sku not in cart`)
	})

	it("Test 22 for 'cart'", async () => {
		// Meta information
		// Selected for:
		// 	RangeError: quantity must be a positive integer
		// 	    at Cart.addReturnValue [as remove] (.syntest/FID-1788957472087-uipD5AAJPr2FQ346TLzPWN/instrumented/dist/cart.js:1412:13)
		// 	    at call (.syntest/FID-1788957472087-uipD5AAJPr2FQ346TLzPWN/tests/tempTest.spec.js:22:9)
		// 	    at Generator._invoke (.syntest/FID-1788957472087-uipD5AAJPr2FQ346TLzPWN/tests/tempTest.spec.js:2:1)
		// 	    at Generator.next (.syntest/FID-1788957472087-uipD5AAJPr2FQ346TLzPWN/tests/tempTest.spec.js:2:1)
		// 	    at asyncGeneratorStep (.syntest/FID-1788957472087-uipD5AAJPr2FQ346TLzPWN/tests/tempTest.spec.js:2:1)
		// 	    at _next (.syntest/FID-1788957472087-uipD5AAJPr2FQ346TLzPWN/tests/tempTest.spec.js:2:1)
		// 
		// Covers objective: dist/cart.js:13:4:::16:5:::241:317
		// Covers objective: dist/cart.js:26:12:::26:54:::759:801
		// Covers objective: dist/cart.js:22:12:::22:72:::568:628
		// Covers objective: placeholder:::dist/cart.js:21:8:::23:9:::514:638
		// Covers objective: dist/cart.js:19:12:::19:82:::425:495
		// Covers objective: placeholder:::dist/cart.js:18:8:::20:9:::358:505
		// Covers objective: dist/cart.js:17:4:::31:5:::322:889
		// Covers objective: dist/cart.js:39:12:::39:47:::1219:1254
		// Covers objective: dist/cart.js:35:12:::35:72:::1028:1088
		// Covers objective: placeholder:::dist/cart.js:34:8:::36:9:::974:1098
		// Covers objective: dist/cart.js:33:4:::42:5:::947:1313
		// Covers objective: dist/cart.js:49:12:::49:68:::1514:1570
		// Covers objective: dist/cart.js:46:12:::46:46:::1418:1452
		// Covers objective: placeholder:::dist/cart.js:45:8:::47:9:::1381:1462
		// Covers objective: dist/cart.js:43:4:::52:5:::1318:1618
		// Covers objective: dist/cart.js:54:4:::64:5:::1662:2038
		
		// Test
		const cart = new Cart()
		const anon = undefined;
		const anon1 = true;
		const anon2 = () => {};
		const totalReturnValue = await cart.total(anon, anon1, anon2)
		const cart1 = new Cart()
		const anon3 = undefined;
		const anon4 = () => {};
		const sku = [anon3, anon4]
		const qty = 720.7613596238643;
		
		// Assertions
		expect(totalReturnValue).to.equal(0)
		await expect((async () => {
			await cart1.remove(sku, qty)
		})()).to.be.rejectedWith(`quantity must be a positive integer`)
	})

	it("Test 23 for 'cart'", async () => {
		// Meta information
		// Selected for:
		// 	Error: unknown coupon
		// 	    at Cart.add [as applyCoupon] (.syntest/FID-1788957472087-uipD5AAJPr2FQ346TLzPWN/instrumented/dist/cart.js:1453:13)
		// 	    at call (.syntest/FID-1788957472087-uipD5AAJPr2FQ346TLzPWN/tests/tempTest.spec.js:22:38)
		// 	    at Generator._invoke (.syntest/FID-1788957472087-uipD5AAJPr2FQ346TLzPWN/tests/tempTest.spec.js:2:1)
		// 	    at Generator.next (.syntest/FID-1788957472087-uipD5AAJPr2FQ346TLzPWN/tests/tempTest.spec.js:2:1)
		// 	    at asyncGeneratorStep (.syntest/FID-1788957472087-uipD5AAJPr2FQ346TLzPWN/tests/tempTest.spec.js:2:1)
		// 	    at _next (.syntest/FID-1788957472087-uipD5AAJPr2FQ346TLzPWN/tests/tempTest.spec.js:2:1)
		// 
		// Covers objective: dist/cart.js:13:4:::16:5:::241:317
		// Covers objective: dist/cart.js:26:12:::26:54:::759:801
		// Covers objective: dist/cart.js:22:12:::22:72:::568:628
		// Covers objective: placeholder:::dist/cart.js:21:8:::23:9:::514:638
		// Covers objective: dist/cart.js:19:12:::19:82:::425:495
		// Covers objective: placeholder:::dist/cart.js:18:8:::20:9:::358:505
		// Covers objective: dist/cart.js:17:4:::31:5:::322:889
		// Covers objective: dist/cart.js:39:12:::39:47:::1219:1254
		// Covers objective: dist/cart.js:35:12:::35:72:::1028:1088
		// Covers objective: placeholder:::dist/cart.js:34:8:::36:9:::974:1098
		// Covers objective: dist/cart.js:33:4:::42:5:::947:1313
		// Covers objective: dist/cart.js:49:12:::49:68:::1514:1570
		// Covers objective: dist/cart.js:46:12:::46:46:::1418:1452
		// Covers objective: placeholder:::dist/cart.js:45:8:::47:9:::1381:1462
		// Covers objective: dist/cart.js:43:4:::52:5:::1318:1618
		// Covers objective: dist/cart.js:54:4:::64:5:::1662:2038
		
		// Test
		const cart = new Cart()
		const cart1 = new Cart()
		const sku = "SAVE10,HALF";
		const priceGrosz = 2100;
		const qty = 2100;
		const addReturnValue = await cart1.add(sku, priceGrosz, qty)
		const cart2 = new Cart()
		const code = false;
		
		// Assertions
		expect(addReturnValue).to.equal(undefined)
		await expect((async () => {
			await cart2.applyCoupon(code)
		})()).to.be.rejectedWith(`unknown coupon`)
	})

	it("Test 24 for 'cart'", async () => {
		// Meta information
		// Selected for:
		// 	RangeError: quantity must be a positive integer
		// 	    at Cart [as add] (.syntest/FID-1788957472087-uipD5AAJPr2FQ346TLzPWN/instrumented/dist/cart.js:1367:13)
		// 	    at call (.syntest/FID-1788957472087-uipD5AAJPr2FQ346TLzPWN/tests/tempTest.spec.js:18:21)
		// 	    at Generator._invoke (.syntest/FID-1788957472087-uipD5AAJPr2FQ346TLzPWN/tests/tempTest.spec.js:2:1)
		// 	    at Generator.next (.syntest/FID-1788957472087-uipD5AAJPr2FQ346TLzPWN/tests/tempTest.spec.js:2:1)
		// 	    at asyncGeneratorStep (.syntest/FID-1788957472087-uipD5AAJPr2FQ346TLzPWN/tests/tempTest.spec.js:2:1)
		// 	    at _next (.syntest/FID-1788957472087-uipD5AAJPr2FQ346TLzPWN/tests/tempTest.spec.js:2:1)
		// 	    at .syntest/FID-1788957472087-uipD5AAJPr2FQ346TLzPWN/tests/tempTest.spec.js:2:1
		// 	    at new Promise (<anonymous>)
		// 	    at Context.<anonymous> (.syntest/FID-1788957472087-uipD5AAJPr2FQ346TLzPWN/tests/tempTest.spec.js:2:1)
		// 	    at processImmediate (node:internal/timers:504:21)
		// 
		// Covers objective: dist/cart.js:13:4:::16:5:::241:317
		// Covers objective: dist/cart.js:26:12:::26:54:::759:801
		// Covers objective: dist/cart.js:22:12:::22:72:::568:628
		// Covers objective: placeholder:::dist/cart.js:21:8:::23:9:::514:638
		// Covers objective: dist/cart.js:19:12:::19:82:::425:495
		// Covers objective: placeholder:::dist/cart.js:18:8:::20:9:::358:505
		// Covers objective: dist/cart.js:17:4:::31:5:::322:889
		// Covers objective: dist/cart.js:39:12:::39:47:::1219:1254
		// Covers objective: dist/cart.js:35:12:::35:72:::1028:1088
		// Covers objective: placeholder:::dist/cart.js:34:8:::36:9:::974:1098
		// Covers objective: dist/cart.js:33:4:::42:5:::947:1313
		// Covers objective: dist/cart.js:49:12:::49:68:::1514:1570
		// Covers objective: dist/cart.js:46:12:::46:46:::1418:1452
		// Covers objective: placeholder:::dist/cart.js:45:8:::47:9:::1381:1462
		// Covers objective: dist/cart.js:43:4:::52:5:::1318:1618
		// Covers objective: dist/cart.js:54:4:::64:5:::1662:2038
		
		// Test
		const cart = new Cart()
		const cart1 = new Cart()
		const sku = undefined;
		const priceGrosz = 2;
		const qty = -210;
		const anon = 2700;
		
		// Assertions
		await expect((async () => {
			await cart1.add(sku, priceGrosz, qty, anon)
		})()).to.be.rejectedWith(`quantity must be a positive integer`)
	})

	it("Test 25 for 'cart'", async () => {
		// Meta information
		// Selected for:
		// 	Error: cannot apply coupon to an empty cart
		// 	    at Cart.remove [as applyCoupon] (.syntest/FID-1788957472087-uipD5AAJPr2FQ346TLzPWN/instrumented/dist/cart.js:1467:13)
		// 	    at call (.syntest/FID-1788957472087-uipD5AAJPr2FQ346TLzPWN/tests/tempTest.spec.js:17:40)
		// 	    at Generator._invoke (.syntest/FID-1788957472087-uipD5AAJPr2FQ346TLzPWN/tests/tempTest.spec.js:2:1)
		// 	    at Generator.next (.syntest/FID-1788957472087-uipD5AAJPr2FQ346TLzPWN/tests/tempTest.spec.js:2:1)
		// 	    at asyncGeneratorStep (.syntest/FID-1788957472087-uipD5AAJPr2FQ346TLzPWN/tests/tempTest.spec.js:2:1)
		// 	    at _next (.syntest/FID-1788957472087-uipD5AAJPr2FQ346TLzPWN/tests/tempTest.spec.js:2:1)
		// 	    at .syntest/FID-1788957472087-uipD5AAJPr2FQ346TLzPWN/tests/tempTest.spec.js:2:1
		// 	    at new Promise (<anonymous>)
		// 	    at Context.<anonymous> (.syntest/FID-1788957472087-uipD5AAJPr2FQ346TLzPWN/tests/tempTest.spec.js:2:1)
		// 	    at processImmediate (node:internal/timers:504:21)
		// 
		// Covers objective: dist/cart.js:13:4:::16:5:::241:317
		// Covers objective: dist/cart.js:26:12:::26:54:::759:801
		// Covers objective: dist/cart.js:22:12:::22:72:::568:628
		// Covers objective: placeholder:::dist/cart.js:21:8:::23:9:::514:638
		// Covers objective: dist/cart.js:19:12:::19:82:::425:495
		// Covers objective: placeholder:::dist/cart.js:18:8:::20:9:::358:505
		// Covers objective: dist/cart.js:17:4:::31:5:::322:889
		// Covers objective: dist/cart.js:39:12:::39:47:::1219:1254
		// Covers objective: dist/cart.js:35:12:::35:72:::1028:1088
		// Covers objective: placeholder:::dist/cart.js:34:8:::36:9:::974:1098
		// Covers objective: dist/cart.js:33:4:::42:5:::947:1313
		// Covers objective: dist/cart.js:49:12:::49:68:::1514:1570
		// Covers objective: dist/cart.js:46:12:::46:46:::1418:1452
		// Covers objective: placeholder:::dist/cart.js:45:8:::47:9:::1381:1462
		// Covers objective: dist/cart.js:43:4:::52:5:::1318:1618
		// Covers objective: dist/cart.js:54:4:::64:5:::1662:2038
		
		// Test
		const cart = new Cart()
		const anon = "valueOf";
		const code = [anon]
		
		// Assertions
		await expect((async () => {
			await cart.applyCoupon(code)
		})()).to.be.rejectedWith(`cannot apply coupon to an empty cart`)
	})

	it("Test 26 for 'cart'", async () => {
		// Meta information
		// Selected for:
		// 	Error: cannot apply coupon to an empty cart
		// 	    at Cart [as applyCoupon] (.syntest/FID-1788957472087-uipD5AAJPr2FQ346TLzPWN/instrumented/dist/cart.js:1467:13)
		// 	    at call (.syntest/FID-1788957472087-uipD5AAJPr2FQ346TLzPWN/tests/tempTest.spec.js:18:21)
		// 	    at Generator._invoke (.syntest/FID-1788957472087-uipD5AAJPr2FQ346TLzPWN/tests/tempTest.spec.js:2:1)
		// 	    at Generator.next (.syntest/FID-1788957472087-uipD5AAJPr2FQ346TLzPWN/tests/tempTest.spec.js:2:1)
		// 	    at asyncGeneratorStep (.syntest/FID-1788957472087-uipD5AAJPr2FQ346TLzPWN/tests/tempTest.spec.js:2:1)
		// 	    at _next (.syntest/FID-1788957472087-uipD5AAJPr2FQ346TLzPWN/tests/tempTest.spec.js:2:1)
		// 	    at .syntest/FID-1788957472087-uipD5AAJPr2FQ346TLzPWN/tests/tempTest.spec.js:2:1
		// 	    at new Promise (<anonymous>)
		// 	    at Context.<anonymous> (.syntest/FID-1788957472087-uipD5AAJPr2FQ346TLzPWN/tests/tempTest.spec.js:2:1)
		// 	    at processImmediate (node:internal/timers:504:21)
		// 
		// Covers objective: dist/cart.js:13:4:::16:5:::241:317
		// Covers objective: dist/cart.js:26:12:::26:54:::759:801
		// Covers objective: dist/cart.js:22:12:::22:72:::568:628
		// Covers objective: placeholder:::dist/cart.js:21:8:::23:9:::514:638
		// Covers objective: dist/cart.js:19:12:::19:82:::425:495
		// Covers objective: placeholder:::dist/cart.js:18:8:::20:9:::358:505
		// Covers objective: dist/cart.js:17:4:::31:5:::322:889
		// Covers objective: dist/cart.js:39:12:::39:47:::1219:1254
		// Covers objective: dist/cart.js:35:12:::35:72:::1028:1088
		// Covers objective: placeholder:::dist/cart.js:34:8:::36:9:::974:1098
		// Covers objective: dist/cart.js:33:4:::42:5:::947:1313
		// Covers objective: dist/cart.js:49:12:::49:68:::1514:1570
		// Covers objective: dist/cart.js:46:12:::46:46:::1418:1452
		// Covers objective: placeholder:::dist/cart.js:45:8:::47:9:::1381:1462
		// Covers objective: dist/cart.js:43:4:::52:5:::1318:1618
		// Covers objective: dist/cart.js:54:4:::64:5:::1662:2038
		
		// Test
		const anon = () => {};
		const anon1 = () => {};
		const cart = new Cart(anon, anon1)
		const code = "isPrototypeOf";
		const anon2 = "cannot apply coupon to an empty cart";
		const anon3 = ".(_j#]y7Z94FZm`!§9CD|%6ygi8Sjc=H[oQZYinX^*CPgW§I`5J=Z4Nb>tcv*dhz-[4X\"Y;F.IOF,Lij\ngT";
		
		// Assertions
		await expect((async () => {
			await cart.applyCoupon(code, anon2, anon3)
		})()).to.be.rejectedWith(`cannot apply coupon to an empty cart`)
	})

	it("Test 27 for 'cart'", async () => {
		// Meta information
		// Selected for:
		// 	Error: sku not in cart
		// 	    at Cart.addReturnValue [as remove] (.syntest/FID-1788957472087-uipD5AAJPr2FQ346TLzPWN/instrumented/dist/cart.js:1432:13)
		// 	    at call (.syntest/FID-1788957472087-uipD5AAJPr2FQ346TLzPWN/tests/tempTest.spec.js:22:9)
		// 	    at Generator._invoke (.syntest/FID-1788957472087-uipD5AAJPr2FQ346TLzPWN/tests/tempTest.spec.js:2:1)
		// 	    at Generator.next (.syntest/FID-1788957472087-uipD5AAJPr2FQ346TLzPWN/tests/tempTest.spec.js:2:1)
		// 	    at asyncGeneratorStep (.syntest/FID-1788957472087-uipD5AAJPr2FQ346TLzPWN/tests/tempTest.spec.js:2:1)
		// 	    at _next (.syntest/FID-1788957472087-uipD5AAJPr2FQ346TLzPWN/tests/tempTest.spec.js:2:1)
		// 
		// Covers objective: dist/cart.js:13:4:::16:5:::241:317
		// Covers objective: dist/cart.js:26:12:::26:54:::759:801
		// Covers objective: dist/cart.js:22:12:::22:72:::568:628
		// Covers objective: placeholder:::dist/cart.js:21:8:::23:9:::514:638
		// Covers objective: dist/cart.js:19:12:::19:82:::425:495
		// Covers objective: placeholder:::dist/cart.js:18:8:::20:9:::358:505
		// Covers objective: dist/cart.js:17:4:::31:5:::322:889
		// Covers objective: dist/cart.js:39:12:::39:47:::1219:1254
		// Covers objective: dist/cart.js:35:12:::35:72:::1028:1088
		// Covers objective: placeholder:::dist/cart.js:34:8:::36:9:::974:1098
		// Covers objective: dist/cart.js:33:4:::42:5:::947:1313
		// Covers objective: dist/cart.js:49:12:::49:68:::1514:1570
		// Covers objective: dist/cart.js:46:12:::46:46:::1418:1452
		// Covers objective: placeholder:::dist/cart.js:45:8:::47:9:::1381:1462
		// Covers objective: dist/cart.js:43:4:::52:5:::1318:1618
		// Covers objective: dist/cart.js:54:4:::64:5:::1662:2038
		
		// Test
		const anon = "\\q8S$.'ErZ3g :i[^.Jw{\"]\tF6M\n,\\c-:z!@}Q`&{-A_FZjD'10T\\>,DSa;=Uf9l5l-Yp']sO,26c|.n,";
		const cart = new Cart(anon)
		const totalReturnValue = await cart.total()
		const anon1 = "\\q8S$.'ErZ3g :i[^.Jw{\"]\tF6M\n,\\c-:z!@}Q`&{-A_FZjD'10T\\>,DSa;=Uf9l5l-Yp']sO,26c|.n,";
		const cart1 = new Cart(anon1)
		const arrayElement = true;
		const arrayElement1 = 7;
		const sku = [arrayElement, arrayElement1]
		const qty = 466;
		const anon2 = null;
		
		// Assertions
		expect(totalReturnValue).to.equal(0)
		await expect((async () => {
			await cart1.remove(sku, qty, anon2)
		})()).to.be.rejectedWith(`sku not in cart`)
	})

	it("Test 28 for 'cart'", async () => {
		// Meta information
		// Selected for:
		// 	Error: sku not in cart
		// 	    at Cart._context [as remove] (.syntest/FID-1788957472087-uipD5AAJPr2FQ346TLzPWN/instrumented/dist/cart.js:1432:13)
		// 	    at call (.syntest/FID-1788957472087-uipD5AAJPr2FQ346TLzPWN/tests/tempTest.spec.js:26:27)
		// 	    at Generator._invoke (.syntest/FID-1788957472087-uipD5AAJPr2FQ346TLzPWN/tests/tempTest.spec.js:2:1)
		// 	    at Generator.next (.syntest/FID-1788957472087-uipD5AAJPr2FQ346TLzPWN/tests/tempTest.spec.js:2:1)
		// 	    at asyncGeneratorStep (.syntest/FID-1788957472087-uipD5AAJPr2FQ346TLzPWN/tests/tempTest.spec.js:2:1)
		// 	    at _next (.syntest/FID-1788957472087-uipD5AAJPr2FQ346TLzPWN/tests/tempTest.spec.js:2:1)
		// 
		// Covers objective: dist/cart.js:13:4:::16:5:::241:317
		// Covers objective: dist/cart.js:26:12:::26:54:::759:801
		// Covers objective: dist/cart.js:22:12:::22:72:::568:628
		// Covers objective: placeholder:::dist/cart.js:21:8:::23:9:::514:638
		// Covers objective: dist/cart.js:19:12:::19:82:::425:495
		// Covers objective: placeholder:::dist/cart.js:18:8:::20:9:::358:505
		// Covers objective: dist/cart.js:17:4:::31:5:::322:889
		// Covers objective: dist/cart.js:39:12:::39:47:::1219:1254
		// Covers objective: dist/cart.js:35:12:::35:72:::1028:1088
		// Covers objective: placeholder:::dist/cart.js:34:8:::36:9:::974:1098
		// Covers objective: dist/cart.js:33:4:::42:5:::947:1313
		// Covers objective: dist/cart.js:49:12:::49:68:::1514:1570
		// Covers objective: dist/cart.js:46:12:::46:46:::1418:1452
		// Covers objective: placeholder:::dist/cart.js:45:8:::47:9:::1381:1462
		// Covers objective: dist/cart.js:43:4:::52:5:::1318:1618
		// Covers objective: dist/cart.js:54:4:::64:5:::1662:2038
		
		// Test
		const cart = new Cart()
		const anon = 2000;
		const totalReturnValue = await cart.total(anon)
		const anon1 = 2000;
		const cart1 = new Cart(anon1)
		const totalReturnValue1 = await cart1.total()
		const anon2 = 2000;
		const cart2 = new Cart(anon2)
		const totalReturnValue2 = await cart2.total()
		const anon3 = 2000;
		const cart3 = new Cart(anon3)
		const sku = 500;
		const qty = 1000000;
		
		// Assertions
		expect(totalReturnValue).to.equal(0)
		expect(totalReturnValue1).to.equal(0)
		expect(totalReturnValue2).to.equal(0)
		await expect((async () => {
			await cart3.remove(sku, qty)
		})()).to.be.rejectedWith(`sku not in cart`)
	})

	it("Test 29 for 'cart'", async () => {
		// Meta information
		// Selected for:
		// 	RangeError: price must be a non-negative integer of grosz
		// 	    at Cart.addReturnValue [as add] (.syntest/FID-1788957472087-uipD5AAJPr2FQ346TLzPWN/instrumented/dist/cart.js:1352:13)
		// 	    at call (.syntest/FID-1788957472087-uipD5AAJPr2FQ346TLzPWN/tests/tempTest.spec.js:22:9)
		// 	    at Generator._invoke (.syntest/FID-1788957472087-uipD5AAJPr2FQ346TLzPWN/tests/tempTest.spec.js:2:1)
		// 	    at Generator.next (.syntest/FID-1788957472087-uipD5AAJPr2FQ346TLzPWN/tests/tempTest.spec.js:2:1)
		// 	    at asyncGeneratorStep (.syntest/FID-1788957472087-uipD5AAJPr2FQ346TLzPWN/tests/tempTest.spec.js:2:1)
		// 	    at _next (.syntest/FID-1788957472087-uipD5AAJPr2FQ346TLzPWN/tests/tempTest.spec.js:2:1)
		// 	    at .syntest/FID-1788957472087-uipD5AAJPr2FQ346TLzPWN/tests/tempTest.spec.js:2:1
		// 	    at new Promise (<anonymous>)
		// 	    at Context.<anonymous> (.syntest/FID-1788957472087-uipD5AAJPr2FQ346TLzPWN/tests/tempTest.spec.js:2:1)
		// 	    at processImmediate (node:internal/timers:504:21)
		// 
		// Covers objective: dist/cart.js:13:4:::16:5:::241:317
		// Covers objective: dist/cart.js:26:12:::26:54:::759:801
		// Covers objective: dist/cart.js:22:12:::22:72:::568:628
		// Covers objective: placeholder:::dist/cart.js:21:8:::23:9:::514:638
		// Covers objective: dist/cart.js:19:12:::19:82:::425:495
		// Covers objective: placeholder:::dist/cart.js:18:8:::20:9:::358:505
		// Covers objective: dist/cart.js:17:4:::31:5:::322:889
		// Covers objective: dist/cart.js:39:12:::39:47:::1219:1254
		// Covers objective: dist/cart.js:35:12:::35:72:::1028:1088
		// Covers objective: placeholder:::dist/cart.js:34:8:::36:9:::974:1098
		// Covers objective: dist/cart.js:33:4:::42:5:::947:1313
		// Covers objective: dist/cart.js:49:12:::49:68:::1514:1570
		// Covers objective: dist/cart.js:46:12:::46:46:::1418:1452
		// Covers objective: placeholder:::dist/cart.js:45:8:::47:9:::1381:1462
		// Covers objective: dist/cart.js:43:4:::52:5:::1318:1618
		// Covers objective: dist/cart.js:54:4:::64:5:::1662:2038
		
		// Test
		const anon = "propertyIsEnumerable";
		const anon1 = 12;
		const anon2 = new Cart(anon1)
		const cart = new Cart(anon, anon2)
		const arrayElement = null;
		const arrayElement1 = -461;
		const arrayElement2 = () => {};
		const sku = [arrayElement, arrayElement1, arrayElement2]
		const arrayElement3 = "X>l<!p};+6ARa^m$)";
		const arrayElement4 = () => {};
		const priceGrosz = [arrayElement3, arrayElement4]
		const qty = 9000;
		const anon3 = new Cart()
		
		// Assertions
		await expect((async () => {
			await cart.add(sku, priceGrosz, qty, anon3)
		})()).to.be.rejectedWith(`price must be a non-negative integer of grosz`)
	})

	it("Test 30 for 'cart'", async () => {
		// Meta information
		// Selected for:
		// 	Error: sku not in cart
		// 	    at Cart.removeReturnValue1 [as remove] (.syntest/FID-1788957472087-uipD5AAJPr2FQ346TLzPWN/instrumented/dist/cart.js:1432:13)
		// 	    at call (.syntest/FID-1788957472087-uipD5AAJPr2FQ346TLzPWN/tests/tempTest.spec.js:26:9)
		// 	    at Generator._invoke (.syntest/FID-1788957472087-uipD5AAJPr2FQ346TLzPWN/tests/tempTest.spec.js:2:1)
		// 	    at Generator.next (.syntest/FID-1788957472087-uipD5AAJPr2FQ346TLzPWN/tests/tempTest.spec.js:2:1)
		// 	    at asyncGeneratorStep (.syntest/FID-1788957472087-uipD5AAJPr2FQ346TLzPWN/tests/tempTest.spec.js:2:1)
		// 	    at _next (.syntest/FID-1788957472087-uipD5AAJPr2FQ346TLzPWN/tests/tempTest.spec.js:2:1)
		// 
		// Covers objective: dist/cart.js:13:4:::16:5:::241:317
		// Covers objective: dist/cart.js:26:12:::26:54:::759:801
		// Covers objective: dist/cart.js:22:12:::22:72:::568:628
		// Covers objective: placeholder:::dist/cart.js:21:8:::23:9:::514:638
		// Covers objective: dist/cart.js:19:12:::19:82:::425:495
		// Covers objective: placeholder:::dist/cart.js:18:8:::20:9:::358:505
		// Covers objective: dist/cart.js:17:4:::31:5:::322:889
		// Covers objective: dist/cart.js:39:12:::39:47:::1219:1254
		// Covers objective: dist/cart.js:35:12:::35:72:::1028:1088
		// Covers objective: placeholder:::dist/cart.js:34:8:::36:9:::974:1098
		// Covers objective: dist/cart.js:33:4:::42:5:::947:1313
		// Covers objective: dist/cart.js:49:12:::49:68:::1514:1570
		// Covers objective: dist/cart.js:46:12:::46:46:::1418:1452
		// Covers objective: placeholder:::dist/cart.js:45:8:::47:9:::1381:1462
		// Covers objective: dist/cart.js:43:4:::52:5:::1318:1618
		// Covers objective: dist/cart.js:54:4:::64:5:::1662:2038
		
		// Test
		const arrayElement = "*A_bUC{\\i2\\_@nI[Uqy1GJg~[0-55cd6HrmFg9/ <W§*n`<<lB4b";
		const arrayElement1 = () => {};
		const arrayElement2 = true;
		const arrayElement3 = "Ti±&ot=cv%DmUWNB[Gk#9nP%~Dd{:k@b$HlD.(({'|c+nwW";
		const arrayElement4 = [arrayElement1, arrayElement2, arrayElement3]
		const anon = [arrayElement, arrayElement4]
		const cart = new Cart(anon)
		const totalReturnValue = await cart.total()
		const arrayElement5 = "*A_bUC{\\i2\\_@nI[Uqy1GJg~[0-55cd6HrmFg9/ <W§*n`<<lB4b";
		const arrayElement6 = () => {};
		const arrayElement7 = true;
		const arrayElement8 = "Ti±&ot=cv%DmUWNB[Gk#9nP%~Dd{:k@b$HlD.(({'|c+nwW";
		const arrayElement9 = [arrayElement6, arrayElement7, arrayElement8]
		const anon1 = [arrayElement5, arrayElement9]
		const cart1 = new Cart(anon1)
		const arrayElement10 = "Ti±&ot=cv%DmUWNB[Gk#9nP%~Dd{:k@b$HlD.(({'|c+nwW";
		const qty = 10;
		
		// Assertions
		expect(totalReturnValue).to.equal(0)
		await expect((async () => {
			await cart1.remove(arrayElement10, qty)
		})()).to.be.rejectedWith(`sku not in cart`)
	})

	it("Test 31 for 'cart'", async () => {
		// Meta information
		// Selected for:
		// 	RangeError: price must be a non-negative integer of grosz
		// 	    at Cart.removeReturnValue1 [as add] (.syntest/FID-1788957472087-uipD5AAJPr2FQ346TLzPWN/instrumented/dist/cart.js:1352:13)
		// 	    at call (.syntest/FID-1788957472087-uipD5AAJPr2FQ346TLzPWN/tests/tempTest.spec.js:26:9)
		// 	    at Generator._invoke (.syntest/FID-1788957472087-uipD5AAJPr2FQ346TLzPWN/tests/tempTest.spec.js:2:1)
		// 	    at Generator.next (.syntest/FID-1788957472087-uipD5AAJPr2FQ346TLzPWN/tests/tempTest.spec.js:2:1)
		// 	    at asyncGeneratorStep (.syntest/FID-1788957472087-uipD5AAJPr2FQ346TLzPWN/tests/tempTest.spec.js:2:1)
		// 	    at _next (.syntest/FID-1788957472087-uipD5AAJPr2FQ346TLzPWN/tests/tempTest.spec.js:2:1)
		// 
		// Covers objective: dist/cart.js:13:4:::16:5:::241:317
		// Covers objective: dist/cart.js:26:12:::26:54:::759:801
		// Covers objective: dist/cart.js:22:12:::22:72:::568:628
		// Covers objective: placeholder:::dist/cart.js:21:8:::23:9:::514:638
		// Covers objective: dist/cart.js:19:12:::19:82:::425:495
		// Covers objective: placeholder:::dist/cart.js:18:8:::20:9:::358:505
		// Covers objective: dist/cart.js:17:4:::31:5:::322:889
		// Covers objective: dist/cart.js:39:12:::39:47:::1219:1254
		// Covers objective: dist/cart.js:35:12:::35:72:::1028:1088
		// Covers objective: placeholder:::dist/cart.js:34:8:::36:9:::974:1098
		// Covers objective: dist/cart.js:33:4:::42:5:::947:1313
		// Covers objective: dist/cart.js:49:12:::49:68:::1514:1570
		// Covers objective: dist/cart.js:46:12:::46:46:::1418:1452
		// Covers objective: placeholder:::dist/cart.js:45:8:::47:9:::1381:1462
		// Covers objective: dist/cart.js:43:4:::52:5:::1318:1618
		// Covers objective: dist/cart.js:54:4:::64:5:::1662:2038
		
		// Test
		const anon = () => {};
		const cart = new Cart(anon)
		const anon1 = () => {};
		const totalReturnValue = await cart.total(anon1)
		const anon2 = () => {};
		const cart1 = new Cart(anon2)
		const totalReturnValue1 = await cart1.total()
		const anon3 = () => {};
		const cart2 = new Cart(anon3)
		const sku = "HALF ";
		const priceGrosz = undefined;
		const qty = -351;
		const anon4 = undefined;
		const anon5 = null;
		
		// Assertions
		expect(totalReturnValue).to.equal(0)
		expect(totalReturnValue1).to.equal(0)
		await expect((async () => {
			await cart2.add(sku, priceGrosz, qty, anon4, anon5)
		})()).to.be.rejectedWith(`price must be a non-negative integer of grosz`)
	})

	it("Test 32 for 'cart'", async () => {
		// Meta information
		// Selected for:
		// 	RangeError: quantity must be a positive integer
		// 	    at Cart.addReturnValue [as add] (.syntest/FID-1788957472087-uipD5AAJPr2FQ346TLzPWN/instrumented/dist/cart.js:1367:13)
		// 	    at call (.syntest/FID-1788957472087-uipD5AAJPr2FQ346TLzPWN/tests/tempTest.spec.js:22:9)
		// 	    at Generator._invoke (.syntest/FID-1788957472087-uipD5AAJPr2FQ346TLzPWN/tests/tempTest.spec.js:2:1)
		// 	    at Generator.next (.syntest/FID-1788957472087-uipD5AAJPr2FQ346TLzPWN/tests/tempTest.spec.js:2:1)
		// 	    at asyncGeneratorStep (.syntest/FID-1788957472087-uipD5AAJPr2FQ346TLzPWN/tests/tempTest.spec.js:2:1)
		// 	    at _next (.syntest/FID-1788957472087-uipD5AAJPr2FQ346TLzPWN/tests/tempTest.spec.js:2:1)
		// 
		// Covers objective: dist/cart.js:13:4:::16:5:::241:317
		// Covers objective: dist/cart.js:26:12:::26:54:::759:801
		// Covers objective: dist/cart.js:22:12:::22:72:::568:628
		// Covers objective: placeholder:::dist/cart.js:21:8:::23:9:::514:638
		// Covers objective: dist/cart.js:19:12:::19:82:::425:495
		// Covers objective: placeholder:::dist/cart.js:18:8:::20:9:::358:505
		// Covers objective: dist/cart.js:17:4:::31:5:::322:889
		// Covers objective: dist/cart.js:39:12:::39:47:::1219:1254
		// Covers objective: dist/cart.js:35:12:::35:72:::1028:1088
		// Covers objective: placeholder:::dist/cart.js:34:8:::36:9:::974:1098
		// Covers objective: dist/cart.js:33:4:::42:5:::947:1313
		// Covers objective: dist/cart.js:49:12:::49:68:::1514:1570
		// Covers objective: dist/cart.js:46:12:::46:46:::1418:1452
		// Covers objective: placeholder:::dist/cart.js:45:8:::47:9:::1381:1462
		// Covers objective: dist/cart.js:43:4:::52:5:::1318:1618
		// Covers objective: dist/cart.js:54:4:::64:5:::1662:2038
		
		// Test
		const anon = null;
		const cart = new Cart(anon)
		const anon1 = null;
		const cart1 = new Cart(anon1)
		const totalReturnValue = await cart1.total()
		const anon2 = null;
		const cart2 = new Cart(anon2)
		const sku = undefined;
		const priceGrosz = 3;
		const qty = 366.3712637034396;
		
		// Assertions
		expect(totalReturnValue).to.equal(0)
		await expect((async () => {
			await cart2.add(sku, priceGrosz, qty)
		})()).to.be.rejectedWith(`quantity must be a positive integer`)
	})
})