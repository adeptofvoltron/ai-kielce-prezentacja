// Imports
import { describe, it, beforeEach, vi } from 'vitest'
import chai from 'chai'
import chaiAsPromised from 'chai-as-promised'
const expect = chai.expect;
chai.use(chaiAsPromised);

describe('invoiceId', function() {
	let parseInvoiceId: any;
	let Cart: any;
	beforeEach(async () => {
		vi.resetModules();
		({ parseInvoiceId } = await import("../src/invoiceId"));
		({ Cart } = await import("../src/cart"));
	});

	it("Test 1 for 'invoiceId'", async () => {
		// Meta information
		// Selected for objective: /repo/dist/invoiceId.js:8:0:::26:1:::224:852
		// Selected for objective: /repo/dist/invoiceId.js:10:8:::10:59:::298:349
		// Selected for:
		// 	TypeError: invoice id must be a string
		// 	    at parseInvoiceId (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/instrumented/dist/invoiceId.js:602:11)
		// 	    at call (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/tests/tempTest.spec.js:16:16)
		// 	    at Generator._invoke (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/tests/tempTest.spec.js:2:1)
		// 	    at Generator.next (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/tests/tempTest.spec.js:2:1)
		// 	    at asyncGeneratorStep (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/tests/tempTest.spec.js:2:1)
		// 	    at _next (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/tests/tempTest.spec.js:2:1)
		// 	    at /repo/.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/tests/tempTest.spec.js:2:1
		// 	    at new Promise (<anonymous>)
		// 	    at Context.<anonymous> (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/tests/tempTest.spec.js:2:1)
		// 	    at processImmediate (node:internal/timers:504:21)
		// 
		// Covers objective: /repo/dist/invoiceId.js:10:8:::10:59:::298:349
		// Covers objective: /repo/dist/invoiceId.js:8:0:::26:1:::224:852
		
		// Test
		const raw = -145.12487224243444;
		
		// Assertions
		await expect((async () => {
			await parseInvoiceId(raw)
		})()).to.be.rejectedWith(`invoice id must be a string`)
	})

	it("Test 2 for 'invoiceId'", async () => {
		// Meta information
		// Selected for:
		// 	TypeError: invoice id must be a string
		// 	    at removeReturnValue (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/instrumented/dist/invoiceId.js:602:11)
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
		// Covers objective: /repo/dist/invoiceId.js:10:8:::10:59:::298:349
		// Covers objective: /repo/dist/invoiceId.js:8:0:::26:1:::224:852
		
		// Test
		const trim = () => {};
		const raw = {
			"trim": trim
		}
		const anon = "weight must be a finite number";
		
		// Assertions
		await expect((async () => {
			await parseInvoiceId(raw, anon)
		})()).to.be.rejectedWith(`invoice id must be a string`)
	})

	it("Test 3 for 'invoiceId'", async () => {
		// Meta information
		// Selected for:
		// 	TypeError: invoice id must be a string
		// 	    at _context (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/instrumented/dist/invoiceId.js:602:11)
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
		// Covers objective: /repo/dist/invoiceId.js:10:8:::10:59:::298:349
		// Covers objective: /repo/dist/invoiceId.js:8:0:::26:1:::224:852
		
		// Test
		const raw = 5000;
		const anon = "malformed invoice id";
		
		// Assertions
		await expect((async () => {
			await parseInvoiceId(raw, anon)
		})()).to.be.rejectedWith(`invoice id must be a string`)
	})

	it("Test 4 for 'invoiceId'", async () => {
		// Meta information
		// Selected for objective: placeholder:::/repo/dist/invoiceId.js:9:4:::11:5:::259:355
		// Selected for objective: /repo/dist/invoiceId.js:14:8:::14:48:::468:508
		// Selected for:
		// 	Error: malformed invoice id
		// 	    at _context (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/instrumented/dist/invoiceId.js:618:11)
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
		// Covers objective: /repo/dist/invoiceId.js:14:8:::14:48:::468:508
		// Covers objective: /repo/dist/invoiceId.js:10:8:::10:59:::298:349
		// Covers objective: placeholder:::/repo/dist/invoiceId.js:9:4:::11:5:::259:355
		// Covers objective: /repo/dist/invoiceId.js:8:0:::26:1:::224:852
		
		// Test
		const raw = "weight must be positive";
		const anon = null;
		
		// Assertions
		await expect((async () => {
			await parseInvoiceId(raw, anon)
		})()).to.be.rejectedWith(`malformed invoice id`)
	})

	it("Test 5 for 'invoiceId'", async () => {
		// Meta information
		// Selected for:
		// 	Error: malformed invoice id
		// 	    at parseInvoiceId (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/instrumented/dist/invoiceId.js:618:11)
		// 	    at call (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/tests/tempTest.spec.js:16:16)
		// 	    at Generator._invoke (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/tests/tempTest.spec.js:2:1)
		// 	    at Generator.next (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/tests/tempTest.spec.js:2:1)
		// 	    at asyncGeneratorStep (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/tests/tempTest.spec.js:2:1)
		// 	    at _next (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/tests/tempTest.spec.js:2:1)
		// 	    at /repo/.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/tests/tempTest.spec.js:2:1
		// 	    at new Promise (<anonymous>)
		// 	    at Context.<anonymous> (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/tests/tempTest.spec.js:2:1)
		// 	    at processImmediate (node:internal/timers:504:21)
		// 
		// Covers objective: /repo/dist/invoiceId.js:14:8:::14:48:::468:508
		// Covers objective: /repo/dist/invoiceId.js:10:8:::10:59:::298:349
		// Covers objective: placeholder:::/repo/dist/invoiceId.js:9:4:::11:5:::259:355
		// Covers objective: /repo/dist/invoiceId.js:8:0:::26:1:::224:852
		
		// Test
		const raw = "__esModule";
		
		// Assertions
		await expect((async () => {
			await parseInvoiceId(raw)
		})()).to.be.rejectedWith(`malformed invoice id`)
	})

	it("Test 6 for 'invoiceId'", async () => {
		// Meta information
		// Selected for:
		// 	Error: malformed invoice id
		// 	    at removeReturnValue (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/instrumented/dist/invoiceId.js:618:11)
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
		// Covers objective: /repo/dist/invoiceId.js:14:8:::14:48:::468:508
		// Covers objective: /repo/dist/invoiceId.js:10:8:::10:59:::298:349
		// Covers objective: placeholder:::/repo/dist/invoiceId.js:9:4:::11:5:::259:355
		// Covers objective: /repo/dist/invoiceId.js:8:0:::26:1:::224:852
		
		// Test
		const raw = "V!E1 :V±i6-'_JqB;6BbA!v{n]K]C+Em)474P(g,)eZ7|:8^ CEk7OLw!mRkbU_#H";
		const arrayElement = undefined;
		const arrayElement1 = "]e \n\\3!*o5";
		const arrayElement2 = null;
		const anon = [arrayElement, arrayElement1, arrayElement2]
		
		// Assertions
		await expect((async () => {
			await parseInvoiceId(raw, anon)
		})()).to.be.rejectedWith(`malformed invoice id`)
	})

	it("Test 7 for 'invoiceId'", async () => {
		// Meta information
		// Selected for:
		// 	Error: malformed invoice id
		// 	    at cart (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/instrumented/dist/invoiceId.js:618:11)
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
		// Covers objective: /repo/dist/invoiceId.js:14:8:::14:48:::468:508
		// Covers objective: /repo/dist/invoiceId.js:10:8:::10:59:::298:349
		// Covers objective: placeholder:::/repo/dist/invoiceId.js:9:4:::11:5:::259:355
		// Covers objective: /repo/dist/invoiceId.js:8:0:::26:1:::224:852
		
		// Test
		const raw = "w#Ap8] )u)xUz\nB[X:\"$V7U*WIo<H&R]'& xSaR_Q'#eJf~14sY7\"Rar' ";
		const anon = "quantity must be a positive integer";
		const anon1 = undefined;
		
		// Assertions
		await expect((async () => {
			await parseInvoiceId(raw, anon, anon1)
		})()).to.be.rejectedWith(`malformed invoice id`)
	})

	it("Test 8 for 'invoiceId'", async () => {
		// Meta information
		// Selected for:
		// 	TypeError: invoice id must be a string
		// 	    at cart (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/instrumented/dist/invoiceId.js:602:11)
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
		// Covers objective: /repo/dist/invoiceId.js:14:8:::14:48:::468:508
		// Covers objective: /repo/dist/invoiceId.js:10:8:::10:59:::298:349
		// Covers objective: placeholder:::/repo/dist/invoiceId.js:9:4:::11:5:::259:355
		// Covers objective: /repo/dist/invoiceId.js:8:0:::26:1:::224:852
		
		// Test
		const raw = null;
		const anon = () => {};
		const anon1 = true;
		
		// Assertions
		await expect((async () => {
			await parseInvoiceId(raw, anon, anon1)
		})()).to.be.rejectedWith(`invoice id must be a string`)
	})

	it("Test 9 for 'invoiceId'", async () => {
		// Meta information
		// Selected for:
		// 	TypeError: invoice id must be a string
		// 	    at priceGrosz (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/instrumented/dist/invoiceId.js:602:11)
		// 	    at call (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/tests/tempTest.spec.js:20:9)
		// 	    at Generator._invoke (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/tests/tempTest.spec.js:2:1)
		// 	    at Generator.next (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/tests/tempTest.spec.js:2:1)
		// 	    at asyncGeneratorStep (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/tests/tempTest.spec.js:2:1)
		// 	    at _next (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/tests/tempTest.spec.js:2:1)
		// 	    at /repo/.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/tests/tempTest.spec.js:2:1
		// 	    at new Promise (<anonymous>)
		// 	    at Context.<anonymous> (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/tests/tempTest.spec.js:2:1)
		// 	    at processImmediate (node:internal/timers:504:21)
		// 
		// Covers objective: /repo/dist/invoiceId.js:14:8:::14:48:::468:508
		// Covers objective: /repo/dist/invoiceId.js:10:8:::10:59:::298:349
		// Covers objective: placeholder:::/repo/dist/invoiceId.js:9:4:::11:5:::259:355
		// Covers objective: /repo/dist/invoiceId.js:8:0:::26:1:::224:852
		
		// Test
		const trim = () => {};
		const raw = {
			"trim": trim
		}
		const arrayElement = undefined;
		const arrayElement1 = "]e \n\\3!*o5";
		const arrayElement2 = null;
		const anon = [arrayElement, arrayElement1, arrayElement2]
		
		// Assertions
		await expect((async () => {
			await parseInvoiceId(raw, anon)
		})()).to.be.rejectedWith(`invoice id must be a string`)
	})

	it("Test 10 for 'invoiceId'", async () => {
		// Meta information
		// Selected for:
		// 	TypeError: invoice id must be a string
		// 	    at addReturnValue (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/instrumented/dist/invoiceId.js:602:11)
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
		// Covers objective: /repo/dist/invoiceId.js:14:8:::14:48:::468:508
		// Covers objective: /repo/dist/invoiceId.js:10:8:::10:59:::298:349
		// Covers objective: placeholder:::/repo/dist/invoiceId.js:9:4:::11:5:::259:355
		// Covers objective: /repo/dist/invoiceId.js:8:0:::26:1:::224:852
		
		// Test
		const trim = () => {};
		const raw = {
			"trim": trim
		}
		const anon = new Cart()
		const arrayElement = undefined;
		const arrayElement1 = "malformed invoice id";
		const arrayElement2 = {}
		const anon1 = [arrayElement, arrayElement1, arrayElement2]
		
		// Assertions
		await expect((async () => {
			await parseInvoiceId(raw, anon, anon1)
		})()).to.be.rejectedWith(`invoice id must be a string`)
	})

	it("Test 11 for 'invoiceId'", async () => {
		// Meta information
		// Selected for:
		// 	Error: malformed invoice id
		// 	    at priceGrosz (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/instrumented/dist/invoiceId.js:618:11)
		// 	    at call (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/tests/tempTest.spec.js:20:9)
		// 	    at Generator._invoke (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/tests/tempTest.spec.js:2:1)
		// 	    at Generator.next (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/tests/tempTest.spec.js:2:1)
		// 	    at asyncGeneratorStep (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/tests/tempTest.spec.js:2:1)
		// 	    at _next (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/tests/tempTest.spec.js:2:1)
		// 	    at /repo/.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/tests/tempTest.spec.js:2:1
		// 	    at new Promise (<anonymous>)
		// 	    at Context.<anonymous> (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/tests/tempTest.spec.js:2:1)
		// 	    at processImmediate (node:internal/timers:504:21)
		// 
		// Covers objective: /repo/dist/invoiceId.js:14:8:::14:48:::468:508
		// Covers objective: /repo/dist/invoiceId.js:10:8:::10:59:::298:349
		// Covers objective: placeholder:::/repo/dist/invoiceId.js:9:4:::11:5:::259:355
		// Covers objective: /repo/dist/invoiceId.js:8:0:::26:1:::224:852
		
		// Test
		const raw = "V!E1 :V±i6-'_JqB;6BbA!v{n]K]C+Em)474P(g,)eZ7|:8^ CEk7OLw!mRkbU_#H";
		const arrayElement = undefined;
		const arrayElement1 = "]e \n\\3!*o5";
		const arrayElement2 = undefined;
		const arrayElement3 = "]e \n\\3!*o5";
		const arrayElement4 = null;
		const anon = [arrayElement2, arrayElement3, arrayElement4]
		const anon1 = [arrayElement, arrayElement1, anon]
		
		// Assertions
		await expect((async () => {
			await parseInvoiceId(raw, anon1)
		})()).to.be.rejectedWith(`malformed invoice id`)
	})

	it("Test 12 for 'invoiceId'", async () => {
		// Meta information
		// Selected for:
		// 	TypeError: invoice id must be a string
		// 	    at cart1 (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/instrumented/dist/invoiceId.js:602:11)
		// 	    at call (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/tests/tempTest.spec.js:22:32)
		// 	    at Generator._invoke (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/tests/tempTest.spec.js:2:1)
		// 	    at Generator.next (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/tests/tempTest.spec.js:2:1)
		// 	    at asyncGeneratorStep (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/tests/tempTest.spec.js:2:1)
		// 	    at _next (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/tests/tempTest.spec.js:2:1)
		// 	    at /repo/.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/tests/tempTest.spec.js:2:1
		// 	    at new Promise (<anonymous>)
		// 	    at Context.<anonymous> (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/tests/tempTest.spec.js:2:1)
		// 	    at processImmediate (node:internal/timers:504:21)
		// 
		// Covers objective: /repo/dist/invoiceId.js:14:8:::14:48:::468:508
		// Covers objective: /repo/dist/invoiceId.js:10:8:::10:59:::298:349
		// Covers objective: placeholder:::/repo/dist/invoiceId.js:9:4:::11:5:::259:355
		// Covers objective: /repo/dist/invoiceId.js:8:0:::26:1:::224:852
		
		// Test
		const trim = () => {};
		const raw = {
			"trim": trim
		}
		const arrayElement = () => {};
		const anon = [arrayElement]
		const anon1 = new Cart(anon)
		
		// Assertions
		await expect((async () => {
			await parseInvoiceId(raw, anon1)
		})()).to.be.rejectedWith(`invoice id must be a string`)
	})

	it("Test 13 for 'invoiceId'", async () => {
		// Meta information
		// Selected for:
		// 	Error: malformed invoice id
		// 	    at addReturnValue (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/instrumented/dist/invoiceId.js:618:11)
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
		// Covers objective: /repo/dist/invoiceId.js:14:8:::14:48:::468:508
		// Covers objective: /repo/dist/invoiceId.js:10:8:::10:59:::298:349
		// Covers objective: placeholder:::/repo/dist/invoiceId.js:9:4:::11:5:::259:355
		// Covers objective: /repo/dist/invoiceId.js:8:0:::26:1:::224:852
		
		// Test
		const raw = "0:k.Lmxs>LuV()J\" (;g5=\tlA8CKVI+FMR7ab}~&t.&_gfqGO!'OefP w0=\nMc]2;S&8W";
		const anon = null;
		const arrayElement = 357;
		const arrayElement1 = "]BxF#Xm6(3`*]5Uwgv#gSnN9_[2sr;S435B=/-±M2a2if-l%:DtbL±b@[";
		const anon1 = () => {};
		const arrayElement2 = new Cart(anon1)
		const anon2 = [arrayElement, arrayElement1, arrayElement2]
		const anon3 = {}
		const anon4 = new Cart(anon2, anon3)
		
		// Assertions
		await expect((async () => {
			await parseInvoiceId(raw, anon, anon4)
		})()).to.be.rejectedWith(`malformed invoice id`)
	})
})