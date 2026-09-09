// Imports
import { describe, it, beforeEach, vi } from 'vitest'
import chai from 'chai'
import chaiAsPromised from 'chai-as-promised'
const expect = chai.expect;
chai.use(chaiAsPromised);

describe('loyalty', function() {
	let awardPoints: any;
	let Cart: any;
	beforeEach(async () => {
		vi.resetModules();
		({ awardPoints } = await import("../src/loyalty"));
		({ Cart } = await import("../src/cart"));
	});

	it("Test 1 for 'loyalty'", async () => {
		// Meta information
		// Selected for objective: /repo/dist/loyalty.js:10:0:::25:1:::271:814
		// Selected for objective: placeholder:::/repo/dist/loyalty.js:11:4:::13:5:::331:476
		// Selected for objective: /repo/dist/loyalty.js:15:8:::15:61:::538:591
		// Selected for:
		// 	RangeError: amounts must not be negative
		// 	    at _context (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/instrumented/dist/loyalty.js:594:11)
		// 	    at call (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/tests/tempTest.spec.js:16:19)
		// 	    at Generator._invoke (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/tests/tempTest.spec.js:2:1)
		// 	    at Generator.next (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/tests/tempTest.spec.js:2:1)
		// 	    at asyncGeneratorStep (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/tests/tempTest.spec.js:2:1)
		// 	    at _next (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/tests/tempTest.spec.js:2:1)
		// 	    at /repo/.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/tests/tempTest.spec.js:2:1
		// 	    at new Promise (<anonymous>)
		// 	    at Context.<anonymous> (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/tests/tempTest.spec.js:2:1)
		// 	    at processImmediate (node:internal/timers:504:21)
		// 
		// Covers objective: /repo/dist/loyalty.js:15:8:::15:61:::538:591
		// Covers objective: placeholder:::/repo/dist/loyalty.js:11:4:::13:5:::331:476
		// Covers objective: /repo/dist/loyalty.js:10:0:::25:1:::271:814
		
		// Test
		const orderValuePLN = -77;
		const lifetimeSpendPLN = 0;
		
		// Assertions
		await expect((async () => {
			await awardPoints(orderValuePLN, lifetimeSpendPLN)
		})()).to.be.rejectedWith(`amounts must not be negative`)
	})

	it("Test 2 for 'loyalty'", async () => {
		// Meta information
		// Selected for objective: /repo/dist/loyalty.js:12:8:::12:62:::416:470
		// Selected for objective: placeholder:::/repo/dist/loyalty.js:14:4:::16:5:::481:597
		// Selected for objective: placeholder:::/repo/dist/loyalty.js:18:4:::20:5:::651:729
		// Selected for objective: placeholder:::/repo/dist/loyalty.js:21:4:::23:5:::734:793
		// Selected for:
		// 	TypeError: amounts must be finite numbers
		// 	    at awardPoints (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/instrumented/dist/loyalty.js:579:11)
		// 	    at call (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/tests/tempTest.spec.js:21:16)
		// 	    at Generator._invoke (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/tests/tempTest.spec.js:2:1)
		// 	    at Generator.next (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/tests/tempTest.spec.js:2:1)
		// 	    at asyncGeneratorStep (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/tests/tempTest.spec.js:2:1)
		// 	    at _next (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/tests/tempTest.spec.js:2:1)
		// 
		// Covers objective: placeholder:::/repo/dist/loyalty.js:21:4:::23:5:::734:793
		// Covers objective: placeholder:::/repo/dist/loyalty.js:18:4:::20:5:::651:729
		// Covers objective: /repo/dist/loyalty.js:15:8:::15:61:::538:591
		// Covers objective: placeholder:::/repo/dist/loyalty.js:14:4:::16:5:::481:597
		// Covers objective: /repo/dist/loyalty.js:12:8:::12:62:::416:470
		// Covers objective: placeholder:::/repo/dist/loyalty.js:11:4:::13:5:::331:476
		// Covers objective: /repo/dist/loyalty.js:10:0:::25:1:::271:814
		
		// Test
		const orderValuePLN = 781;
		const lifetimeSpendPLN = 30;
		const awardPointsReturnValue = await awardPoints(orderValuePLN, lifetimeSpendPLN)
		const lifetimeSpendPLN1 = 30;
		const arrayElement = true;
		const lifetimeSpendPLN2 = [arrayElement]
		
		// Assertions
		expect(awardPointsReturnValue).to.equal(78)
		await expect((async () => {
			await awardPoints(lifetimeSpendPLN1, lifetimeSpendPLN2)
		})()).to.be.rejectedWith(`amounts must be finite numbers`)
	})

	it("Test 3 for 'loyalty'", async () => {
		// Meta information
		// Selected for:
		// 	RangeError: amounts must not be negative
		// 	    at awardPoints (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/instrumented/dist/loyalty.js:594:11)
		// 	    at call (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/tests/tempTest.spec.js:18:14)
		// 	    at Generator._invoke (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/tests/tempTest.spec.js:2:1)
		// 	    at Generator.next (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/tests/tempTest.spec.js:2:1)
		// 	    at asyncGeneratorStep (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/tests/tempTest.spec.js:2:1)
		// 	    at _next (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/tests/tempTest.spec.js:2:1)
		// 	    at /repo/.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/tests/tempTest.spec.js:2:1
		// 	    at new Promise (<anonymous>)
		// 	    at Context.<anonymous> (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/tests/tempTest.spec.js:2:1)
		// 	    at processImmediate (node:internal/timers:504:21)
		// 
		// Covers objective: placeholder:::/repo/dist/loyalty.js:21:4:::23:5:::734:793
		// Covers objective: placeholder:::/repo/dist/loyalty.js:18:4:::20:5:::651:729
		// Covers objective: /repo/dist/loyalty.js:15:8:::15:61:::538:591
		// Covers objective: placeholder:::/repo/dist/loyalty.js:14:4:::16:5:::481:597
		// Covers objective: /repo/dist/loyalty.js:12:8:::12:62:::416:470
		// Covers objective: placeholder:::/repo/dist/loyalty.js:11:4:::13:5:::331:476
		// Covers objective: /repo/dist/loyalty.js:10:0:::25:1:::271:814
		
		// Test
		const orderValuePLN = 2100;
		const lifetimeSpendPLN = -853.0971403808486;
		
		// Assertions
		await expect((async () => {
			await awardPoints(orderValuePLN, lifetimeSpendPLN)
		})()).to.be.rejectedWith(`amounts must not be negative`)
	})

	it("Test 4 for 'loyalty'", async () => {
		// Meta information
		// Selected for:
		// 	Error: sku not in cart
		// 	    at Cart.remove (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/instrumented/dist/cart.js:1432:13)
		// 	    at call (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/tests/tempTest.spec.js:25:33)
		// 	    at Generator._invoke (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/tests/tempTest.spec.js:2:1)
		// 	    at Generator.next (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/tests/tempTest.spec.js:2:1)
		// 	    at asyncGeneratorStep (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/tests/tempTest.spec.js:2:1)
		// 	    at _next (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/tests/tempTest.spec.js:2:1)
		// 
		// Covers objective: placeholder:::/repo/dist/loyalty.js:21:4:::23:5:::734:793
		// Covers objective: placeholder:::/repo/dist/loyalty.js:18:4:::20:5:::651:729
		// Covers objective: /repo/dist/loyalty.js:15:8:::15:61:::538:591
		// Covers objective: placeholder:::/repo/dist/loyalty.js:14:4:::16:5:::481:597
		// Covers objective: /repo/dist/loyalty.js:12:8:::12:62:::416:470
		// Covers objective: placeholder:::/repo/dist/loyalty.js:11:4:::13:5:::331:476
		// Covers objective: /repo/dist/loyalty.js:10:0:::25:1:::271:814
		
		// Test
		const orderValuePLN = 0;
		const lifetimeSpendPLN = 309;
		const anon = undefined;
		const anon1 = new Cart(anon)
		const awardPointsReturnValue = await awardPoints(orderValuePLN, lifetimeSpendPLN, anon1)
		const anon2 = undefined;
		const anon3 = new Cart(anon2)
		const lifetimeSpendPLN1 = 309;
		const lifetimeSpendPLN2 = 309;
		const orderValuePLN1 = 0;
		
		// Assertions
		expect(awardPointsReturnValue).to.equal(0)
		await expect((async () => {
			await anon3.remove(lifetimeSpendPLN1, lifetimeSpendPLN2, orderValuePLN1)
		})()).to.be.rejectedWith(`sku not in cart`)
	})

	it("Test 5 for 'loyalty'", async () => {
		// Meta information
		// Selected for:
		// 	RangeError: amounts must not be negative
		// 	    at cart (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/instrumented/dist/loyalty.js:594:11)
		// 	    at call (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/tests/tempTest.spec.js:17:35)
		// 	    at Generator._invoke (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/tests/tempTest.spec.js:2:1)
		// 	    at Generator.next (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/tests/tempTest.spec.js:2:1)
		// 	    at asyncGeneratorStep (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/tests/tempTest.spec.js:2:1)
		// 	    at _next (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/tests/tempTest.spec.js:2:1)
		// 	    at /repo/.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/tests/tempTest.spec.js:2:1
		// 	    at new Promise (<anonymous>)
		// 	    at Context.<anonymous> (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/tests/tempTest.spec.js:2:1)
		// 	    at processImmediate (node:internal/timers:504:21)
		// 
		// Covers objective: placeholder:::/repo/dist/loyalty.js:21:4:::23:5:::734:793
		// Covers objective: placeholder:::/repo/dist/loyalty.js:18:4:::20:5:::651:729
		// Covers objective: /repo/dist/loyalty.js:15:8:::15:61:::538:591
		// Covers objective: placeholder:::/repo/dist/loyalty.js:14:4:::16:5:::481:597
		// Covers objective: /repo/dist/loyalty.js:12:8:::12:62:::416:470
		// Covers objective: placeholder:::/repo/dist/loyalty.js:11:4:::13:5:::331:476
		// Covers objective: /repo/dist/loyalty.js:10:0:::25:1:::271:814
		
		// Test
		const orderValuePLN = 524.3849270227327;
		const lifetimeSpendPLN = -922.9113840946328;
		const anon = "od,wYE^E&'nPb";
		
		// Assertions
		await expect((async () => {
			await awardPoints(orderValuePLN, lifetimeSpendPLN, anon)
		})()).to.be.rejectedWith(`amounts must not be negative`)
	})

	it("Test 6 for 'loyalty'", async () => {
		// Meta information
		// Selected for:
		// 	TypeError: amounts must be finite numbers
		// 	    at _context (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/instrumented/dist/loyalty.js:579:11)
		// 	    at call (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/tests/tempTest.spec.js:16:19)
		// 	    at Generator._invoke (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/tests/tempTest.spec.js:2:1)
		// 	    at Generator.next (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/tests/tempTest.spec.js:2:1)
		// 	    at asyncGeneratorStep (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/tests/tempTest.spec.js:2:1)
		// 	    at _next (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/tests/tempTest.spec.js:2:1)
		// 	    at /repo/.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/tests/tempTest.spec.js:2:1
		// 	    at new Promise (<anonymous>)
		// 	    at Context.<anonymous> (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/tests/tempTest.spec.js:2:1)
		// 	    at processImmediate (node:internal/timers:504:21)
		// 
		// Covers objective: placeholder:::/repo/dist/loyalty.js:21:4:::23:5:::734:793
		// Covers objective: placeholder:::/repo/dist/loyalty.js:18:4:::20:5:::651:729
		// Covers objective: /repo/dist/loyalty.js:15:8:::15:61:::538:591
		// Covers objective: placeholder:::/repo/dist/loyalty.js:14:4:::16:5:::481:597
		// Covers objective: /repo/dist/loyalty.js:12:8:::12:62:::416:470
		// Covers objective: placeholder:::/repo/dist/loyalty.js:11:4:::13:5:::331:476
		// Covers objective: /repo/dist/loyalty.js:10:0:::25:1:::271:814
		
		// Test
		const orderValuePLN = 737.8258010669992;
		const lifetimeSpendPLN = true;
		
		// Assertions
		await expect((async () => {
			await awardPoints(orderValuePLN, lifetimeSpendPLN)
		})()).to.be.rejectedWith(`amounts must be finite numbers`)
	})

	it("Test 7 for 'loyalty'", async () => {
		// Meta information
		// Selected for:
		// 	TypeError: amounts must be finite numbers
		// 	    at cart (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/instrumented/dist/loyalty.js:579:11)
		// 	    at call (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/tests/tempTest.spec.js:17:35)
		// 	    at Generator._invoke (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/tests/tempTest.spec.js:2:1)
		// 	    at Generator.next (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/tests/tempTest.spec.js:2:1)
		// 	    at asyncGeneratorStep (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/tests/tempTest.spec.js:2:1)
		// 	    at _next (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/tests/tempTest.spec.js:2:1)
		// 	    at /repo/.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/tests/tempTest.spec.js:2:1
		// 	    at new Promise (<anonymous>)
		// 	    at Context.<anonymous> (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/tests/tempTest.spec.js:2:1)
		// 	    at processImmediate (node:internal/timers:504:21)
		// 
		// Covers objective: placeholder:::/repo/dist/loyalty.js:21:4:::23:5:::734:793
		// Covers objective: placeholder:::/repo/dist/loyalty.js:18:4:::20:5:::651:729
		// Covers objective: /repo/dist/loyalty.js:15:8:::15:61:::538:591
		// Covers objective: placeholder:::/repo/dist/loyalty.js:14:4:::16:5:::481:597
		// Covers objective: /repo/dist/loyalty.js:12:8:::12:62:::416:470
		// Covers objective: placeholder:::/repo/dist/loyalty.js:11:4:::13:5:::331:476
		// Covers objective: /repo/dist/loyalty.js:10:0:::25:1:::271:814
		
		// Test
		const orderValuePLN = 0;
		const lifetimeSpendPLN = null;
		const anon = () => {};
		
		// Assertions
		await expect((async () => {
			await awardPoints(orderValuePLN, lifetimeSpendPLN, anon)
		})()).to.be.rejectedWith(`amounts must be finite numbers`)
	})

	it("Test 8 for 'loyalty'", async () => {
		// Meta information
		// Selected for:
		// 	TypeError: amounts must be finite numbers
		// 	    at priceGrosz (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/instrumented/dist/loyalty.js:579:11)
		// 	    at call (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/tests/tempTest.spec.js:20:9)
		// 	    at Generator._invoke (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/tests/tempTest.spec.js:2:1)
		// 	    at Generator.next (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/tests/tempTest.spec.js:2:1)
		// 	    at asyncGeneratorStep (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/tests/tempTest.spec.js:2:1)
		// 	    at _next (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/tests/tempTest.spec.js:2:1)
		// 
		// Covers objective: placeholder:::/repo/dist/loyalty.js:21:4:::23:5:::734:793
		// Covers objective: placeholder:::/repo/dist/loyalty.js:18:4:::20:5:::651:729
		// Covers objective: /repo/dist/loyalty.js:15:8:::15:61:::538:591
		// Covers objective: placeholder:::/repo/dist/loyalty.js:14:4:::16:5:::481:597
		// Covers objective: /repo/dist/loyalty.js:12:8:::12:62:::416:470
		// Covers objective: placeholder:::/repo/dist/loyalty.js:11:4:::13:5:::331:476
		// Covers objective: /repo/dist/loyalty.js:10:0:::25:1:::271:814
		
		// Test
		const orderValuePLN = 3;
		const lifetimeSpendPLN = 1;
		const awardPointsReturnValue = await awardPoints(orderValuePLN, lifetimeSpendPLN)
		const orderValuePLN1 = true;
		const lifetimeSpendPLN1 = 40;
		
		// Assertions
		expect(awardPointsReturnValue).to.equal(0)
		await expect((async () => {
			await awardPoints(orderValuePLN1, lifetimeSpendPLN1)
		})()).to.be.rejectedWith(`amounts must be finite numbers`)
	})

	it("Test 9 for 'loyalty'", async () => {
		// Meta information
		// Selected for:
		// 	TypeError: amounts must be finite numbers
		// 	    at cart1 (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/instrumented/dist/loyalty.js:579:11)
		// 	    at call (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/tests/tempTest.spec.js:22:32)
		// 	    at Generator._invoke (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/tests/tempTest.spec.js:2:1)
		// 	    at Generator.next (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/tests/tempTest.spec.js:2:1)
		// 	    at asyncGeneratorStep (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/tests/tempTest.spec.js:2:1)
		// 	    at _next (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/tests/tempTest.spec.js:2:1)
		// 
		// Covers objective: placeholder:::/repo/dist/loyalty.js:21:4:::23:5:::734:793
		// Covers objective: placeholder:::/repo/dist/loyalty.js:18:4:::20:5:::651:729
		// Covers objective: /repo/dist/loyalty.js:15:8:::15:61:::538:591
		// Covers objective: placeholder:::/repo/dist/loyalty.js:14:4:::16:5:::481:597
		// Covers objective: /repo/dist/loyalty.js:12:8:::12:62:::416:470
		// Covers objective: placeholder:::/repo/dist/loyalty.js:11:4:::13:5:::331:476
		// Covers objective: /repo/dist/loyalty.js:10:0:::25:1:::271:814
		
		// Test
		const orderValuePLN = 544;
		const lifetimeSpendPLN = 148;
		const anon = {}
		const anon1 = () => {};
		const anon2 = "weight above carrier limit";
		const awardPointsReturnValue = await awardPoints(orderValuePLN, lifetimeSpendPLN, anon, anon1, anon2)
		const anon3 = {}
		const lifetimeSpendPLN1 = -862.8541431740813;
		
		// Assertions
		expect(awardPointsReturnValue).to.equal(54)
		await expect((async () => {
			await awardPoints(anon3, lifetimeSpendPLN1)
		})()).to.be.rejectedWith(`amounts must be finite numbers`)
	})

	it("Test 10 for 'loyalty'", async () => {
		// Meta information
		// Selected for:
		// 	RangeError: amounts must not be negative
		// 	    at priceGrosz (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/instrumented/dist/loyalty.js:594:11)
		// 	    at call (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/tests/tempTest.spec.js:20:9)
		// 	    at Generator._invoke (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/tests/tempTest.spec.js:2:1)
		// 	    at Generator.next (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/tests/tempTest.spec.js:2:1)
		// 	    at asyncGeneratorStep (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/tests/tempTest.spec.js:2:1)
		// 	    at _next (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/tests/tempTest.spec.js:2:1)
		// 
		// Covers objective: placeholder:::/repo/dist/loyalty.js:21:4:::23:5:::734:793
		// Covers objective: placeholder:::/repo/dist/loyalty.js:18:4:::20:5:::651:729
		// Covers objective: /repo/dist/loyalty.js:15:8:::15:61:::538:591
		// Covers objective: placeholder:::/repo/dist/loyalty.js:14:4:::16:5:::481:597
		// Covers objective: /repo/dist/loyalty.js:12:8:::12:62:::416:470
		// Covers objective: placeholder:::/repo/dist/loyalty.js:11:4:::13:5:::331:476
		// Covers objective: /repo/dist/loyalty.js:10:0:::25:1:::271:814
		
		// Test
		const orderValuePLN = 10;
		const lifetimeSpendPLN = 2100;
		const awardPointsReturnValue = await awardPoints(orderValuePLN, lifetimeSpendPLN)
		const orderValuePLN1 = -269;
		const orderValuePLN2 = 24;
		
		// Assertions
		expect(awardPointsReturnValue).to.equal(1)
		await expect((async () => {
			await awardPoints(orderValuePLN1, orderValuePLN2)
		})()).to.be.rejectedWith(`amounts must not be negative`)
	})

	it("Test 11 for 'loyalty'", async () => {
		// Meta information
		// Selected for objective: /repo/dist/loyalty.js:19:8:::19:28:::703:723
		// Covers objective: placeholder:::/repo/dist/loyalty.js:21:4:::23:5:::734:793
		// Covers objective: /repo/dist/loyalty.js:19:8:::19:28:::703:723
		// Covers objective: placeholder:::/repo/dist/loyalty.js:18:4:::20:5:::651:729
		// Covers objective: /repo/dist/loyalty.js:15:8:::15:61:::538:591
		// Covers objective: placeholder:::/repo/dist/loyalty.js:14:4:::16:5:::481:597
		// Covers objective: /repo/dist/loyalty.js:12:8:::12:62:::416:470
		// Covers objective: placeholder:::/repo/dist/loyalty.js:11:4:::13:5:::331:476
		// Covers objective: /repo/dist/loyalty.js:10:0:::25:1:::271:814
		
		// Test
		const orderValuePLN = 988.3802381397945;
		const lifetimeSpendPLN = 5001.179791185319;
		const anon = "year out of supported range";
		const anon1 = " ]=&_eazptr9aiL95IO._GW{TigPCouP34V?l6gH$9Bp`wtLQA!iG[CdU'ZOwz_'a! 66";
		const awardPointsReturnValue = await awardPoints(orderValuePLN, lifetimeSpendPLN, anon, anon1)
		
		// Assertions
		expect(awardPointsReturnValue).to.equal(196)
	})

	it("Test 12 for 'loyalty'", async () => {
		// Meta information
		// Selected for:
		// 	RangeError: amounts must not be negative
		// 	    at removeReturnValue (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/instrumented/dist/loyalty.js:594:11)
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
		// Covers objective: placeholder:::/repo/dist/loyalty.js:21:4:::23:5:::734:793
		// Covers objective: /repo/dist/loyalty.js:19:8:::19:28:::703:723
		// Covers objective: placeholder:::/repo/dist/loyalty.js:18:4:::20:5:::651:729
		// Covers objective: /repo/dist/loyalty.js:15:8:::15:61:::538:591
		// Covers objective: placeholder:::/repo/dist/loyalty.js:14:4:::16:5:::481:597
		// Covers objective: /repo/dist/loyalty.js:12:8:::12:62:::416:470
		// Covers objective: placeholder:::/repo/dist/loyalty.js:11:4:::13:5:::331:476
		// Covers objective: /repo/dist/loyalty.js:10:0:::25:1:::271:814
		
		// Test
		const orderValuePLN = 2000;
		const lifetimeSpendPLN = -86;
		const arrayElement = "'y}.f-&=p(Dw&S!P,f$A;+.RR,JJ@B*'X}Y?lhx?w4]zrJqFsf";
		const arrayElement1 = "`qr=t1ROTOl±rn+1'bJci-VQU9L\tBG;+iT4k<6XwEQWtce±$(y'~!dS'{z&?/LWA@\tJnBOwhR8KWudrV^}'I\"XS>.sB}LxqJ*";
		const anon = [arrayElement, arrayElement1]
		
		// Assertions
		await expect((async () => {
			await awardPoints(orderValuePLN, lifetimeSpendPLN, anon)
		})()).to.be.rejectedWith(`amounts must not be negative`)
	})

	it("Test 13 for 'loyalty'", async () => {
		// Meta information
		// Selected for:
		// 	TypeError: amounts must be finite numbers
		// 	    at addReturnValue (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/instrumented/dist/loyalty.js:579:11)
		// 	    at call (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/tests/tempTest.spec.js:22:9)
		// 	    at Generator._invoke (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/tests/tempTest.spec.js:2:1)
		// 	    at Generator.next (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/tests/tempTest.spec.js:2:1)
		// 	    at asyncGeneratorStep (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/tests/tempTest.spec.js:2:1)
		// 	    at _next (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/tests/tempTest.spec.js:2:1)
		// 
		// Covers objective: placeholder:::/repo/dist/loyalty.js:21:4:::23:5:::734:793
		// Covers objective: /repo/dist/loyalty.js:19:8:::19:28:::703:723
		// Covers objective: placeholder:::/repo/dist/loyalty.js:18:4:::20:5:::651:729
		// Covers objective: /repo/dist/loyalty.js:15:8:::15:61:::538:591
		// Covers objective: placeholder:::/repo/dist/loyalty.js:14:4:::16:5:::481:597
		// Covers objective: /repo/dist/loyalty.js:12:8:::12:62:::416:470
		// Covers objective: placeholder:::/repo/dist/loyalty.js:11:4:::13:5:::331:476
		// Covers objective: /repo/dist/loyalty.js:10:0:::25:1:::271:814
		
		// Test
		const orderValuePLN = 0;
		const lifetimeSpendPLN = 1;
		const anon = undefined;
		const awardPointsReturnValue = await awardPoints(orderValuePLN, lifetimeSpendPLN, anon)
		const orderValuePLN1 = -237;
		const orderValuePLN2 = 0;
		const arrayElement = null;
		const arrayElement1 = "weight must be a finite number";
		const lifetimeSpendPLN1 = [orderValuePLN2, arrayElement, arrayElement1]
		const anon1 = true;
		
		// Assertions
		expect(awardPointsReturnValue).to.equal(0)
		await expect((async () => {
			await awardPoints(orderValuePLN1, lifetimeSpendPLN1, anon1)
		})()).to.be.rejectedWith(`amounts must be finite numbers`)
	})

	it("Test 14 for 'loyalty'", async () => {
		// Meta information
		// Selected for:
		// 	RangeError: amounts must not be negative
		// 	    at cart1 (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/instrumented/dist/loyalty.js:594:11)
		// 	    at call (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/tests/tempTest.spec.js:22:32)
		// 	    at Generator._invoke (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/tests/tempTest.spec.js:2:1)
		// 	    at Generator.next (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/tests/tempTest.spec.js:2:1)
		// 	    at asyncGeneratorStep (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/tests/tempTest.spec.js:2:1)
		// 	    at _next (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/tests/tempTest.spec.js:2:1)
		// 
		// Covers objective: placeholder:::/repo/dist/loyalty.js:21:4:::23:5:::734:793
		// Covers objective: /repo/dist/loyalty.js:19:8:::19:28:::703:723
		// Covers objective: placeholder:::/repo/dist/loyalty.js:18:4:::20:5:::651:729
		// Covers objective: /repo/dist/loyalty.js:15:8:::15:61:::538:591
		// Covers objective: placeholder:::/repo/dist/loyalty.js:14:4:::16:5:::481:597
		// Covers objective: /repo/dist/loyalty.js:12:8:::12:62:::416:470
		// Covers objective: placeholder:::/repo/dist/loyalty.js:11:4:::13:5:::331:476
		// Covers objective: /repo/dist/loyalty.js:10:0:::25:1:::271:814
		
		// Test
		const orderValuePLN = 862;
		const lifetimeSpendPLN = 46.5634925278257;
		const anon = () => {};
		const awardPointsReturnValue = await awardPoints(orderValuePLN, lifetimeSpendPLN, anon)
		const orderValuePLN1 = -220.56184911069602;
		const lifetimeSpendPLN1 = -101;
		const anon1 = "MXC9sB>9v{\nK$\tzvG[$[bpN\\|%$gmY@=np9±[n/`7B";
		const anon2 = "TjM±[,DIn-B+AyR2w]MsIKEhl4t±tq+~=I@DgabpE9YoU`T{sJ+-Z:P";
		
		// Assertions
		expect(awardPointsReturnValue).to.equal(86)
		await expect((async () => {
			await awardPoints(orderValuePLN1, lifetimeSpendPLN1, anon1, anon2)
		})()).to.be.rejectedWith(`amounts must not be negative`)
	})

	it("Test 15 for 'loyalty'", async () => {
		// Meta information
		// Selected for:
		// 	TypeError: amounts must be finite numbers
		// 	    at cart2 (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/instrumented/dist/loyalty.js:579:11)
		// 	    at call (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/tests/tempTest.spec.js:26:36)
		// 	    at Generator._invoke (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/tests/tempTest.spec.js:2:1)
		// 	    at Generator.next (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/tests/tempTest.spec.js:2:1)
		// 	    at asyncGeneratorStep (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/tests/tempTest.spec.js:2:1)
		// 	    at _next (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/tests/tempTest.spec.js:2:1)
		// 
		// Covers objective: placeholder:::/repo/dist/loyalty.js:21:4:::23:5:::734:793
		// Covers objective: /repo/dist/loyalty.js:19:8:::19:28:::703:723
		// Covers objective: placeholder:::/repo/dist/loyalty.js:18:4:::20:5:::651:729
		// Covers objective: /repo/dist/loyalty.js:15:8:::15:61:::538:591
		// Covers objective: placeholder:::/repo/dist/loyalty.js:14:4:::16:5:::481:597
		// Covers objective: /repo/dist/loyalty.js:12:8:::12:62:::416:470
		// Covers objective: placeholder:::/repo/dist/loyalty.js:11:4:::13:5:::331:476
		// Covers objective: /repo/dist/loyalty.js:10:0:::25:1:::271:814
		
		// Test
		const orderValuePLN = 40;
		const lifetimeSpendPLN = 811;
		const awardPointsReturnValue = await awardPoints(orderValuePLN, lifetimeSpendPLN)
		const orderValuePLN1 = 5000;
		const lifetimeSpendPLN1 = () => {};
		const orderValuePLN2 = 40;
		const orderValuePLN3 = 40;
		const arrayElement = null;
		const arrayElement1 = true;
		const arrayElement2 = [orderValuePLN2, orderValuePLN3, arrayElement, arrayElement1]
		const arrayElement3 = "d\\§%\"6wjgXY-3'<`o27\\V'Ah8#7\\= tQ1u± b2XXgtXk9GGVAmv 'YUB\" @WgepB";
		const arrayElement4 = undefined;
		const arrayElement5 = 29;
		const arrayElement6 = undefined;
		const anon = [arrayElement2, arrayElement3, arrayElement4, arrayElement5, arrayElement6]
		
		// Assertions
		expect(awardPointsReturnValue).to.equal(4)
		await expect((async () => {
			await awardPoints(orderValuePLN1, lifetimeSpendPLN1, anon)
		})()).to.be.rejectedWith(`amounts must be finite numbers`)
	})

	it("Test 16 for 'loyalty'", async () => {
		// Meta information
		// Selected for:
		// 	Error: unknown coupon
		// 	    at Cart [as applyCoupon] (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/instrumented/dist/cart.js:1453:13)
		// 	    at call (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/tests/tempTest.spec.js:23:21)
		// 	    at Generator._invoke (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/tests/tempTest.spec.js:2:1)
		// 	    at Generator.next (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/tests/tempTest.spec.js:2:1)
		// 	    at asyncGeneratorStep (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/tests/tempTest.spec.js:2:1)
		// 	    at _next (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/tests/tempTest.spec.js:2:1)
		// 
		// Covers objective: placeholder:::/repo/dist/loyalty.js:21:4:::23:5:::734:793
		// Covers objective: /repo/dist/loyalty.js:19:8:::19:28:::703:723
		// Covers objective: placeholder:::/repo/dist/loyalty.js:18:4:::20:5:::651:729
		// Covers objective: /repo/dist/loyalty.js:15:8:::15:61:::538:591
		// Covers objective: placeholder:::/repo/dist/loyalty.js:14:4:::16:5:::481:597
		// Covers objective: /repo/dist/loyalty.js:12:8:::12:62:::416:470
		// Covers objective: placeholder:::/repo/dist/loyalty.js:11:4:::13:5:::331:476
		// Covers objective: /repo/dist/loyalty.js:10:0:::25:1:::271:814
		
		// Test
		const orderValuePLN = 870;
		const lifetimeSpendPLN = 3;
		const anon = new Cart()
		const anon1 = new Cart(anon)
		const awardPointsReturnValue = await awardPoints(orderValuePLN, lifetimeSpendPLN, anon1)
		const anon2 = new Cart()
		const code = "invoice id must be a string";
		
		// Assertions
		expect(awardPointsReturnValue).to.equal(87)
		await expect((async () => {
			await anon2.applyCoupon(code)
		})()).to.be.rejectedWith(`unknown coupon`)
	})

	it("Test 17 for 'loyalty'", async () => {
		// Meta information
		// Selected for:
		// 	RangeError: price must be a non-negative integer of grosz
		// 	    at Cart.removeReturnValue1 [as add] (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/instrumented/dist/cart.js:1352:13)
		// 	    at call (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/tests/tempTest.spec.js:26:9)
		// 	    at Generator._invoke (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/tests/tempTest.spec.js:2:1)
		// 	    at Generator.next (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/tests/tempTest.spec.js:2:1)
		// 	    at asyncGeneratorStep (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/tests/tempTest.spec.js:2:1)
		// 	    at _next (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/tests/tempTest.spec.js:2:1)
		// 
		// Covers objective: placeholder:::/repo/dist/loyalty.js:21:4:::23:5:::734:793
		// Covers objective: /repo/dist/loyalty.js:19:8:::19:28:::703:723
		// Covers objective: placeholder:::/repo/dist/loyalty.js:18:4:::20:5:::651:729
		// Covers objective: /repo/dist/loyalty.js:15:8:::15:61:::538:591
		// Covers objective: placeholder:::/repo/dist/loyalty.js:14:4:::16:5:::481:597
		// Covers objective: /repo/dist/loyalty.js:12:8:::12:62:::416:470
		// Covers objective: placeholder:::/repo/dist/loyalty.js:11:4:::13:5:::331:476
		// Covers objective: /repo/dist/loyalty.js:10:0:::25:1:::271:814
		
		// Test
		const orderValuePLN = 499.33183827747007;
		const lifetimeSpendPLN = 577;
		const anon = "'A0q]}#AGHC";
		const anon1 = "string";
		const anon2 = new Cart(anon1)
		const anon3 = 710.4514964000102;
		const awardPointsReturnValue = await awardPoints(orderValuePLN, lifetimeSpendPLN, anon, anon2, anon3)
		const anon4 = "string";
		const anon5 = new Cart(anon4)
		const sku = 991.256750780215;
		const orderValuePLN1 = 499.33183827747007;
		const anon6 = "'A0q]}#AGHC";
		const anon7 = () => {};
		
		// Assertions
		expect(awardPointsReturnValue).to.equal(49)
		await expect((async () => {
			await anon5.add(sku, orderValuePLN1, anon6, anon7)
		})()).to.be.rejectedWith(`price must be a non-negative integer of grosz`)
	})

	it("Test 18 for 'loyalty'", async () => {
		// Meta information
		// Selected for:
		// 	RangeError: price must be a non-negative integer of grosz
		// 	    at Cart.add (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/instrumented/dist/cart.js:1352:13)
		// 	    at call (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/tests/tempTest.spec.js:26:27)
		// 	    at Generator._invoke (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/tests/tempTest.spec.js:2:1)
		// 	    at Generator.next (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/tests/tempTest.spec.js:2:1)
		// 	    at asyncGeneratorStep (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/tests/tempTest.spec.js:2:1)
		// 	    at _next (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/tests/tempTest.spec.js:2:1)
		// 
		// Covers objective: placeholder:::/repo/dist/loyalty.js:21:4:::23:5:::734:793
		// Covers objective: /repo/dist/loyalty.js:19:8:::19:28:::703:723
		// Covers objective: placeholder:::/repo/dist/loyalty.js:18:4:::20:5:::651:729
		// Covers objective: /repo/dist/loyalty.js:15:8:::15:61:::538:591
		// Covers objective: placeholder:::/repo/dist/loyalty.js:14:4:::16:5:::481:597
		// Covers objective: /repo/dist/loyalty.js:12:8:::12:62:::416:470
		// Covers objective: placeholder:::/repo/dist/loyalty.js:11:4:::13:5:::331:476
		// Covers objective: /repo/dist/loyalty.js:10:0:::25:1:::271:814
		
		// Test
		const orderValuePLN = 432.4558727156366;
		const lifetimeSpendPLN = 10;
		const awardPointsReturnValue = await awardPoints(orderValuePLN, lifetimeSpendPLN)
		const orderValuePLN1 = 432.4558727156366;
		const lifetimeSpendPLN1 = 10;
		const anon = new Cart()
		const awardPointsReturnValue1 = await awardPoints(orderValuePLN1, lifetimeSpendPLN1, anon)
		const anon1 = new Cart()
		const sku = false;
		const orderValuePLN2 = 432.4558727156366;
		const qty = 30;
		
		// Assertions
		expect(awardPointsReturnValue).to.equal(43)
		expect(awardPointsReturnValue1).to.equal(43)
		await expect((async () => {
			await anon1.add(sku, orderValuePLN2, qty)
		})()).to.be.rejectedWith(`price must be a non-negative integer of grosz`)
	})

	it("Test 19 for 'loyalty'", async () => {
		// Meta information
		// Selected for:
		// 	RangeError: amounts must not be negative
		// 	    at addReturnValue (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/instrumented/dist/loyalty.js:594:11)
		// 	    at call (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/tests/tempTest.spec.js:22:9)
		// 	    at Generator._invoke (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/tests/tempTest.spec.js:2:1)
		// 	    at Generator.next (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/tests/tempTest.spec.js:2:1)
		// 	    at asyncGeneratorStep (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/tests/tempTest.spec.js:2:1)
		// 	    at _next (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/tests/tempTest.spec.js:2:1)
		// 
		// Covers objective: placeholder:::/repo/dist/loyalty.js:21:4:::23:5:::734:793
		// Covers objective: /repo/dist/loyalty.js:19:8:::19:28:::703:723
		// Covers objective: placeholder:::/repo/dist/loyalty.js:18:4:::20:5:::651:729
		// Covers objective: /repo/dist/loyalty.js:15:8:::15:61:::538:591
		// Covers objective: placeholder:::/repo/dist/loyalty.js:14:4:::16:5:::481:597
		// Covers objective: /repo/dist/loyalty.js:12:8:::12:62:::416:470
		// Covers objective: placeholder:::/repo/dist/loyalty.js:11:4:::13:5:::331:476
		// Covers objective: /repo/dist/loyalty.js:10:0:::25:1:::271:814
		
		// Test
		const orderValuePLN = 100;
		const lifetimeSpendPLN = 624.3311917883805;
		const arrayElement = 0;
		const arrayElement1 = "{";
		const arrayElement2 = 950.2111850727308;
		const arrayElement3 = [arrayElement, arrayElement1, arrayElement2]
		const anon = [arrayElement3]
		const awardPointsReturnValue = await awardPoints(orderValuePLN, lifetimeSpendPLN, anon)
		const orderValuePLN1 = -486.74766268677536;
		const lifetimeSpendPLN1 = 3.141592653589793;
		
		// Assertions
		expect(awardPointsReturnValue).to.equal(10)
		await expect((async () => {
			await awardPoints(orderValuePLN1, lifetimeSpendPLN1)
		})()).to.be.rejectedWith(`amounts must not be negative`)
	})

	it("Test 20 for 'loyalty'", async () => {
		// Meta information
		// Selected for:
		// 	Error: unknown coupon
		// 	    at Cart.applyCoupon (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/instrumented/dist/cart.js:1453:13)
		// 	    at call (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/tests/tempTest.spec.js:26:27)
		// 	    at Generator._invoke (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/tests/tempTest.spec.js:2:1)
		// 	    at Generator.next (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/tests/tempTest.spec.js:2:1)
		// 	    at asyncGeneratorStep (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/tests/tempTest.spec.js:2:1)
		// 	    at _next (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/tests/tempTest.spec.js:2:1)
		// 
		// Covers objective: placeholder:::/repo/dist/loyalty.js:21:4:::23:5:::734:793
		// Covers objective: /repo/dist/loyalty.js:19:8:::19:28:::703:723
		// Covers objective: placeholder:::/repo/dist/loyalty.js:18:4:::20:5:::651:729
		// Covers objective: /repo/dist/loyalty.js:15:8:::15:61:::538:591
		// Covers objective: placeholder:::/repo/dist/loyalty.js:14:4:::16:5:::481:597
		// Covers objective: /repo/dist/loyalty.js:12:8:::12:62:::416:470
		// Covers objective: placeholder:::/repo/dist/loyalty.js:11:4:::13:5:::331:476
		// Covers objective: /repo/dist/loyalty.js:10:0:::25:1:::271:814
		
		// Test
		const orderValuePLN = 5000;
		const lifetimeSpendPLN = 226;
		const anon = 40;
		const awardPointsReturnValue = await awardPoints(orderValuePLN, lifetimeSpendPLN, anon)
		const orderValuePLN1 = 0;
		const orderValuePLN2 = 5000;
		const anon1 = () => {};
		const arrayElement = -441.62957566852606;
		const arrayElement1 = 699.7595212715169;
		const anon2 = [arrayElement, arrayElement1]
		const anon3 = new Cart()
		const awardPointsReturnValue1 = await awardPoints(orderValuePLN1, orderValuePLN2, anon1, anon2, anon3)
		const anon4 = new Cart()
		const orderValuePLN3 = 5000;
		
		// Assertions
		expect(awardPointsReturnValue).to.equal(500)
		expect(awardPointsReturnValue1).to.equal(0)
		await expect((async () => {
			await anon4.applyCoupon(orderValuePLN3)
		})()).to.be.rejectedWith(`unknown coupon`)
	})

	it("Test 21 for 'loyalty'", async () => {
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
		// Covers objective: placeholder:::/repo/dist/loyalty.js:21:4:::23:5:::734:793
		// Covers objective: /repo/dist/loyalty.js:19:8:::19:28:::703:723
		// Covers objective: placeholder:::/repo/dist/loyalty.js:18:4:::20:5:::651:729
		// Covers objective: /repo/dist/loyalty.js:15:8:::15:61:::538:591
		// Covers objective: placeholder:::/repo/dist/loyalty.js:14:4:::16:5:::481:597
		// Covers objective: /repo/dist/loyalty.js:12:8:::12:62:::416:470
		// Covers objective: placeholder:::/repo/dist/loyalty.js:11:4:::13:5:::331:476
		// Covers objective: /repo/dist/loyalty.js:10:0:::25:1:::271:814
		
		// Test
		const orderValuePLN = 50;
		const lifetimeSpendPLN = 946.1151551465241;
		const anon = new Cart()
		const awardPointsReturnValue = await awardPoints(orderValuePLN, lifetimeSpendPLN, anon)
		const anon1 = new Cart()
		const code = {}
		
		// Assertions
		expect(awardPointsReturnValue).to.equal(5)
		await expect((async () => {
			await anon1.applyCoupon(code)
		})()).to.be.rejectedWith(`unknown coupon`)
	})

	it("Test 22 for 'loyalty'", async () => {
		// Meta information
		// Selected for:
		// 	Error: unknown coupon
		// 	    at Cart.remove [as applyCoupon] (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/instrumented/dist/cart.js:1453:13)
		// 	    at call (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/tests/tempTest.spec.js:26:42)
		// 	    at Generator._invoke (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/tests/tempTest.spec.js:2:1)
		// 	    at Generator.next (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/tests/tempTest.spec.js:2:1)
		// 	    at asyncGeneratorStep (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/tests/tempTest.spec.js:2:1)
		// 	    at _next (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/tests/tempTest.spec.js:2:1)
		// 
		// Covers objective: placeholder:::/repo/dist/loyalty.js:21:4:::23:5:::734:793
		// Covers objective: /repo/dist/loyalty.js:19:8:::19:28:::703:723
		// Covers objective: placeholder:::/repo/dist/loyalty.js:18:4:::20:5:::651:729
		// Covers objective: /repo/dist/loyalty.js:15:8:::15:61:::538:591
		// Covers objective: placeholder:::/repo/dist/loyalty.js:14:4:::16:5:::481:597
		// Covers objective: /repo/dist/loyalty.js:12:8:::12:62:::416:470
		// Covers objective: placeholder:::/repo/dist/loyalty.js:11:4:::13:5:::331:476
		// Covers objective: /repo/dist/loyalty.js:10:0:::25:1:::271:814
		
		// Test
		const orderValuePLN = 3;
		const lifetimeSpendPLN = 2000;
		const anon = {}
		const anon1 = "(1l4CewQ![g;_B@lFFIy~FY#ZjlN";
		const anon2 = new Cart(anon1)
		const awardPointsReturnValue = await awardPoints(orderValuePLN, lifetimeSpendPLN, anon, anon2)
		const anon3 = "(1l4CewQ![g;_B@lFFIy~FY#ZjlN";
		const anon4 = new Cart(anon3)
		const arrayElement = null;
		const code = [arrayElement]
		const anon5 = false;
		
		// Assertions
		expect(awardPointsReturnValue).to.equal(0)
		await expect((async () => {
			await anon4.applyCoupon(code, anon5)
		})()).to.be.rejectedWith(`unknown coupon`)
	})

	it("Test 23 for 'loyalty'", async () => {
		// Meta information
		// Selected for:
		// 	RangeError: quantity must be a positive integer
		// 	    at Cart.add (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/instrumented/dist/cart.js:1367:13)
		// 	    at call (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/tests/tempTest.spec.js:24:16)
		// 	    at Generator._invoke (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/tests/tempTest.spec.js:2:1)
		// 	    at Generator.next (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/tests/tempTest.spec.js:2:1)
		// 	    at asyncGeneratorStep (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/tests/tempTest.spec.js:2:1)
		// 	    at _next (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/tests/tempTest.spec.js:2:1)
		// 
		// Covers objective: placeholder:::/repo/dist/loyalty.js:21:4:::23:5:::734:793
		// Covers objective: /repo/dist/loyalty.js:19:8:::19:28:::703:723
		// Covers objective: placeholder:::/repo/dist/loyalty.js:18:4:::20:5:::651:729
		// Covers objective: /repo/dist/loyalty.js:15:8:::15:61:::538:591
		// Covers objective: placeholder:::/repo/dist/loyalty.js:14:4:::16:5:::481:597
		// Covers objective: /repo/dist/loyalty.js:12:8:::12:62:::416:470
		// Covers objective: placeholder:::/repo/dist/loyalty.js:11:4:::13:5:::331:476
		// Covers objective: /repo/dist/loyalty.js:10:0:::25:1:::271:814
		
		// Test
		const orderValuePLN = 79;
		const lifetimeSpendPLN = 50;
		const anon = new Cart()
		const awardPointsReturnValue = await awardPoints(orderValuePLN, lifetimeSpendPLN, anon)
		const anon1 = new Cart()
		const sku = -298.0552744189314;
		const lifetimeSpendPLN1 = 50;
		const qty = false;
		
		// Assertions
		expect(awardPointsReturnValue).to.equal(7)
		await expect((async () => {
			await anon1.add(sku, lifetimeSpendPLN1, qty)
		})()).to.be.rejectedWith(`quantity must be a positive integer`)
	})

	it("Test 24 for 'loyalty'", async () => {
		// Meta information
		// Selected for:
		// 	RangeError: quantity must be a positive integer
		// 	    at Cart.remove (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/instrumented/dist/cart.js:1412:13)
		// 	    at call (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/tests/tempTest.spec.js:26:27)
		// 	    at Generator._invoke (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/tests/tempTest.spec.js:2:1)
		// 	    at Generator.next (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/tests/tempTest.spec.js:2:1)
		// 	    at asyncGeneratorStep (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/tests/tempTest.spec.js:2:1)
		// 	    at _next (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/tests/tempTest.spec.js:2:1)
		// 
		// Covers objective: placeholder:::/repo/dist/loyalty.js:21:4:::23:5:::734:793
		// Covers objective: /repo/dist/loyalty.js:19:8:::19:28:::703:723
		// Covers objective: placeholder:::/repo/dist/loyalty.js:18:4:::20:5:::651:729
		// Covers objective: /repo/dist/loyalty.js:15:8:::15:61:::538:591
		// Covers objective: placeholder:::/repo/dist/loyalty.js:14:4:::16:5:::481:597
		// Covers objective: /repo/dist/loyalty.js:12:8:::12:62:::416:470
		// Covers objective: placeholder:::/repo/dist/loyalty.js:11:4:::13:5:::331:476
		// Covers objective: /repo/dist/loyalty.js:10:0:::25:1:::271:814
		
		// Test
		const orderValuePLN = 100;
		const lifetimeSpendPLN = 30;
		const awardPointsReturnValue = await awardPoints(orderValuePLN, lifetimeSpendPLN)
		const orderValuePLN1 = 5000;
		const lifetimeSpendPLN1 = 2000;
		const anon = 158.9086579252039;
		const anon1 = new Cart(anon)
		const awardPointsReturnValue1 = await awardPoints(orderValuePLN1, lifetimeSpendPLN1, anon1)
		const anon2 = 158.9086579252039;
		const anon3 = new Cart(anon2)
		const sku = undefined;
		const qty = -394;
		const anon4 = true;
		
		// Assertions
		expect(awardPointsReturnValue).to.equal(10)
		expect(awardPointsReturnValue1).to.equal(500)
		await expect((async () => {
			await anon3.remove(sku, qty, anon4)
		})()).to.be.rejectedWith(`quantity must be a positive integer`)
	})

	it("Test 25 for 'loyalty'", async () => {
		// Meta information
		// Selected for:
		// 	RangeError: price must be a non-negative integer of grosz
		// 	    at Cart._context [as add] (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/instrumented/dist/cart.js:1352:13)
		// 	    at call (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/tests/tempTest.spec.js:26:27)
		// 	    at Generator._invoke (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/tests/tempTest.spec.js:2:1)
		// 	    at Generator.next (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/tests/tempTest.spec.js:2:1)
		// 	    at asyncGeneratorStep (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/tests/tempTest.spec.js:2:1)
		// 	    at _next (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/tests/tempTest.spec.js:2:1)
		// 
		// Covers objective: placeholder:::/repo/dist/loyalty.js:21:4:::23:5:::734:793
		// Covers objective: /repo/dist/loyalty.js:19:8:::19:28:::703:723
		// Covers objective: placeholder:::/repo/dist/loyalty.js:18:4:::20:5:::651:729
		// Covers objective: /repo/dist/loyalty.js:15:8:::15:61:::538:591
		// Covers objective: placeholder:::/repo/dist/loyalty.js:14:4:::16:5:::481:597
		// Covers objective: /repo/dist/loyalty.js:12:8:::12:62:::416:470
		// Covers objective: placeholder:::/repo/dist/loyalty.js:11:4:::13:5:::331:476
		// Covers objective: /repo/dist/loyalty.js:10:0:::25:1:::271:814
		
		// Test
		const orderValuePLN = 50;
		const lifetimeSpendPLN = 2.718281828459045;
		const arrayElement = "quantity must be a positive integer";
		const arrayElement1 = 10;
		const anon = {}
		const arrayElement2 = new Cart(anon)
		const anon1 = [arrayElement, arrayElement1, arrayElement2]
		const awardPointsReturnValue = await awardPoints(orderValuePLN, lifetimeSpendPLN, anon1)
		const anon2 = {}
		const arrayElement3 = new Cart(anon2)
		const sku = 10;
		const lifetimeSpendPLN1 = 2.718281828459045;
		const lifetimeSpendPLN2 = 2.718281828459045;
		
		// Assertions
		expect(awardPointsReturnValue).to.equal(5)
		await expect((async () => {
			await arrayElement3.add(sku, lifetimeSpendPLN1, lifetimeSpendPLN2)
		})()).to.be.rejectedWith(`price must be a non-negative integer of grosz`)
	})

	it("Test 26 for 'loyalty'", async () => {
		// Meta information
		// Selected for:
		// 	TypeError: amounts must be finite numbers
		// 	    at removeReturnValue (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/instrumented/dist/loyalty.js:579:11)
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
		// Covers objective: placeholder:::/repo/dist/loyalty.js:21:4:::23:5:::734:793
		// Covers objective: /repo/dist/loyalty.js:19:8:::19:28:::703:723
		// Covers objective: placeholder:::/repo/dist/loyalty.js:18:4:::20:5:::651:729
		// Covers objective: /repo/dist/loyalty.js:15:8:::15:61:::538:591
		// Covers objective: placeholder:::/repo/dist/loyalty.js:14:4:::16:5:::481:597
		// Covers objective: /repo/dist/loyalty.js:12:8:::12:62:::416:470
		// Covers objective: placeholder:::/repo/dist/loyalty.js:11:4:::13:5:::331:476
		// Covers objective: /repo/dist/loyalty.js:10:0:::25:1:::271:814
		
		// Test
		const arrayElement = -740;
		const arrayElement1 = "JKz1Uack,+Fzpq'_A@at(:#g8zV)6mQ->#._\nE|Ll1HqR/5:le§9Cz[@LQhB:|9-7?iA±$:'dFA}en[)oSV";
		const arrayElement2 = "z&/kW5+hMckq+'";
		const orderValuePLN = [arrayElement, arrayElement1, arrayElement2]
		const lifetimeSpendPLN = 0;
		
		// Assertions
		await expect((async () => {
			await awardPoints(orderValuePLN, lifetimeSpendPLN)
		})()).to.be.rejectedWith(`amounts must be finite numbers`)
	})

	it("Test 27 for 'loyalty'", async () => {
		// Meta information
		// Selected for:
		// 	RangeError: amounts must not be negative
		// 	    at removeReturnValue1 (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/instrumented/dist/loyalty.js:594:11)
		// 	    at call (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/tests/tempTest.spec.js:26:9)
		// 	    at Generator._invoke (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/tests/tempTest.spec.js:2:1)
		// 	    at Generator.next (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/tests/tempTest.spec.js:2:1)
		// 	    at asyncGeneratorStep (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/tests/tempTest.spec.js:2:1)
		// 	    at _next (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/tests/tempTest.spec.js:2:1)
		// 
		// Covers objective: placeholder:::/repo/dist/loyalty.js:21:4:::23:5:::734:793
		// Covers objective: /repo/dist/loyalty.js:19:8:::19:28:::703:723
		// Covers objective: placeholder:::/repo/dist/loyalty.js:18:4:::20:5:::651:729
		// Covers objective: /repo/dist/loyalty.js:15:8:::15:61:::538:591
		// Covers objective: placeholder:::/repo/dist/loyalty.js:14:4:::16:5:::481:597
		// Covers objective: /repo/dist/loyalty.js:12:8:::12:62:::416:470
		// Covers objective: placeholder:::/repo/dist/loyalty.js:11:4:::13:5:::331:476
		// Covers objective: /repo/dist/loyalty.js:10:0:::25:1:::271:814
		
		// Test
		const orderValuePLN = 28;
		const lifetimeSpendPLN = 12;
		const anon = "TIdK<2\"#K]4u$.uq&O.5Y§Qx*%-%@ncHI[R}W\tm)+2F*}6Fp2IZHRm6\n9ZH\"Ka=Ms*6KFYuZkRyHNQ C";
		const awardPointsReturnValue = await awardPoints(orderValuePLN, lifetimeSpendPLN, anon)
		const orderValuePLN1 = 3;
		const lifetimeSpendPLN1 = 370.55652395115567;
		const awardPointsReturnValue1 = await awardPoints(orderValuePLN1, lifetimeSpendPLN1)
		const orderValuePLN2 = -11.814188877738843;
		const orderValuePLN3 = 28;
		const anon1 = new Cart()
		
		// Assertions
		expect(awardPointsReturnValue).to.equal(2)
		expect(awardPointsReturnValue1).to.equal(0)
		await expect((async () => {
			await awardPoints(orderValuePLN2, orderValuePLN3, anon1)
		})()).to.be.rejectedWith(`amounts must not be negative`)
	})
})