// Imports
import chai from 'chai'
import chaiAsPromised from 'chai-as-promised'
const expect = chai.expect;
chai.use(chaiAsPromised);

describe('pricing', function() {
	let calculateShipping;
	let Cart;
	beforeEach(() => {
		// This is a hack to force the require cache to be emptied
		// Without this we would be using the same required object for each test
		delete require.cache[require.resolve("../../dist/pricing.js")];
		delete require.cache[require.resolve("../../dist/cart.js")];
		({calculateShipping} = require("../../dist/pricing.js"));
		({Cart} = require("../../dist/cart.js"));
	});

	it("Test 1 for 'pricing'", async () => {
		// Meta information
		// Selected for objective: /repo/dist/pricing.js:8:0:::38:1:::216:929
		// Selected for objective: placeholder:::/repo/dist/pricing.js:9:4:::11:5:::276:378
		// Selected for objective: /repo/dist/pricing.js:13:8:::13:56:::412:460
		// Selected for:
		// 	RangeError: weight must be positive
		// 	    at calculateShipping (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/instrumented/dist/pricing.js:872:11)
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
		// Covers objective: /repo/dist/pricing.js:13:8:::13:56:::412:460
		// Covers objective: placeholder:::/repo/dist/pricing.js:9:4:::11:5:::276:378
		// Covers objective: /repo/dist/pricing.js:8:0:::38:1:::216:929
		
		// Test
		const weightKg = -890.2572214844164;
		const zone = "R#qP\"gEe2E5ou.~^1+S\n2,k|8y*§\"sjcu7/dM|{HZs0Y.Mdqs{0%3c'~e=w§ .C\"eFx{os(~;)u'*±d$K/U";
		const isPremium = false;
		const anon = true;
		
		// Assertions
		await expect((async () => {
			await calculateShipping(weightKg, zone, isPremium, anon)
		})()).to.be.rejectedWith(`weight must be positive`)
	})

	it("Test 2 for 'pricing'", async () => {
		// Meta information
		// Selected for objective: /repo/dist/pricing.js:10:8:::10:62:::318:372
		// Selected for objective: placeholder:::/repo/dist/pricing.js:12:4:::14:5:::383:466
		// Selected for objective: placeholder:::/repo/dist/pricing.js:15:4:::17:5:::471:558
		// Selected for objective: /repo/dist/pricing.js:22:9:::27:5:::632:713
		// Selected for objective: /repo/dist/pricing.js:26:8:::26:18:::697:707
		// Selected for objective: /repo/dist/pricing.js:29:8:::29:25:::747:764
		// Selected for objective: /repo/dist/pricing.js:35:8:::35:26:::862:880
		// Selected for:
		// 	TypeError: weight must be a finite number
		// 	    at cart1 (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/instrumented/dist/pricing.js:858:11)
		// 	    at call (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/tests/tempTest.spec.js:22:32)
		// 	    at Generator._invoke (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/tests/tempTest.spec.js:2:1)
		// 	    at Generator.next (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/tests/tempTest.spec.js:2:1)
		// 	    at asyncGeneratorStep (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/tests/tempTest.spec.js:2:1)
		// 	    at _next (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/tests/tempTest.spec.js:2:1)
		// 
		// Covers objective: /repo/dist/pricing.js:35:8:::35:26:::862:880
		// Covers objective: /repo/dist/pricing.js:29:8:::29:25:::747:764
		// Covers objective: /repo/dist/pricing.js:26:8:::26:18:::697:707
		// Covers objective: /repo/dist/pricing.js:22:9:::27:5:::632:713
		// Covers objective: placeholder:::/repo/dist/pricing.js:15:4:::17:5:::471:558
		// Covers objective: /repo/dist/pricing.js:13:8:::13:56:::412:460
		// Covers objective: placeholder:::/repo/dist/pricing.js:12:4:::14:5:::383:466
		// Covers objective: /repo/dist/pricing.js:10:8:::10:62:::318:372
		// Covers objective: placeholder:::/repo/dist/pricing.js:9:4:::11:5:::276:378
		// Covers objective: /repo/dist/pricing.js:8:0:::38:1:::216:929
		
		// Test
		const weightKg = 50;
		const zone = "d'l-WS);%Gd";
		const isPremium = true;
		const calculateShippingReturnValue = await calculateShipping(weightKg, zone, isPremium)
		const weightKg1 = "IveU3v±!LUJqqRI(TR\nSI\nV='DG95wZCshZ6H2krrzs)&+P|<72l7V2+V";
		const zone1 = "invoice id must be a string";
		const isPremium1 = true;
		const anon = {}
		
		// Assertions
		expect(calculateShippingReturnValue).to.equal(95.2)
		await expect((async () => {
			await calculateShipping(weightKg1, zone1, isPremium1, anon)
		})()).to.be.rejectedWith(`weight must be a finite number`)
	})

	it("Test 3 for 'pricing'", async () => {
		// Meta information
		// Selected for objective: /repo/dist/pricing.js:16:8:::16:59:::501:552
		// Selected for:
		// 	RangeError: weight above carrier limit
		// 	    at cart (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/instrumented/dist/pricing.js:886:11)
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
		// Covers objective: /repo/dist/pricing.js:35:8:::35:26:::862:880
		// Covers objective: /repo/dist/pricing.js:29:8:::29:25:::747:764
		// Covers objective: /repo/dist/pricing.js:26:8:::26:18:::697:707
		// Covers objective: /repo/dist/pricing.js:22:9:::27:5:::632:713
		// Covers objective: /repo/dist/pricing.js:16:8:::16:59:::501:552
		// Covers objective: placeholder:::/repo/dist/pricing.js:15:4:::17:5:::471:558
		// Covers objective: /repo/dist/pricing.js:13:8:::13:56:::412:460
		// Covers objective: placeholder:::/repo/dist/pricing.js:12:4:::14:5:::383:466
		// Covers objective: /repo/dist/pricing.js:10:8:::10:62:::318:372
		// Covers objective: placeholder:::/repo/dist/pricing.js:9:4:::11:5:::276:378
		// Covers objective: /repo/dist/pricing.js:8:0:::38:1:::216:929
		
		// Test
		const weightKg = 951;
		const zone = "\nrw WcINV±ax}8}KS1:g";
		const isPremium = true;
		
		// Assertions
		await expect((async () => {
			await calculateShipping(weightKg, zone, isPremium)
		})()).to.be.rejectedWith(`weight above carrier limit`)
	})

	it("Test 4 for 'pricing'", async () => {
		// Meta information
		// Selected for objective: /repo/dist/pricing.js:31:9:::33:5:::780:832
		// Selected for objective: /repo/dist/pricing.js:32:8:::32:25:::809:826
		// Selected for:
		// 	Error: unknown coupon
		// 	    at Cart.sku2 [as applyCoupon] (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/instrumented/dist/cart.js:1453:13)
		// 	    at call (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/tests/tempTest.spec.js:24:9)
		// 	    at Generator._invoke (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/tests/tempTest.spec.js:2:1)
		// 	    at Generator.next (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/tests/tempTest.spec.js:2:1)
		// 	    at asyncGeneratorStep (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/tests/tempTest.spec.js:2:1)
		// 	    at _next (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/tests/tempTest.spec.js:2:1)
		// 
		// Covers objective: /repo/dist/pricing.js:35:8:::35:26:::862:880
		// Covers objective: /repo/dist/pricing.js:32:8:::32:25:::809:826
		// Covers objective: /repo/dist/pricing.js:29:8:::29:25:::747:764
		// Covers objective: /repo/dist/pricing.js:31:9:::33:5:::780:832
		// Covers objective: /repo/dist/pricing.js:26:8:::26:18:::697:707
		// Covers objective: /repo/dist/pricing.js:22:9:::27:5:::632:713
		// Covers objective: /repo/dist/pricing.js:16:8:::16:59:::501:552
		// Covers objective: placeholder:::/repo/dist/pricing.js:15:4:::17:5:::471:558
		// Covers objective: /repo/dist/pricing.js:13:8:::13:56:::412:460
		// Covers objective: placeholder:::/repo/dist/pricing.js:12:4:::14:5:::383:466
		// Covers objective: /repo/dist/pricing.js:10:8:::10:62:::318:372
		// Covers objective: placeholder:::/repo/dist/pricing.js:9:4:::11:5:::276:378
		// Covers objective: /repo/dist/pricing.js:8:0:::38:1:::216:929
		
		// Test
		const weightKg = 12;
		const zone = "G§8s5V\\',{N`SGi ~=Br&Aa#ydMOc*[v&*[/.@~Xt9$!:>l,u3O\ngO^#hq&Rp^AW.[$.U2[_Tn^Js+T#X39vno7R";
		const anon = null;
		const isPremium = new Cart(anon)
		const calculateShippingReturnValue = await calculateShipping(weightKg, zone, isPremium)
		const anon1 = null;
		const isPremium1 = new Cart(anon1)
		const code = true;
		
		// Assertions
		expect(calculateShippingReturnValue).to.equal(75.2)
		await expect((async () => {
			await isPremium1.applyCoupon(code)
		})()).to.be.rejectedWith(`unknown coupon`)
	})

	it("Test 5 for 'pricing'", async () => {
		// Meta information
		// Selected for:
		// 	RangeError: quantity must be a positive integer
		// 	    at Cart.add (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/instrumented/dist/cart.js:1367:13)
		// 	    at call (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/tests/tempTest.spec.js:25:33)
		// 	    at Generator._invoke (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/tests/tempTest.spec.js:2:1)
		// 	    at Generator.next (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/tests/tempTest.spec.js:2:1)
		// 	    at asyncGeneratorStep (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/tests/tempTest.spec.js:2:1)
		// 	    at _next (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/tests/tempTest.spec.js:2:1)
		// 
		// Covers objective: /repo/dist/pricing.js:35:8:::35:26:::862:880
		// Covers objective: /repo/dist/pricing.js:32:8:::32:25:::809:826
		// Covers objective: /repo/dist/pricing.js:29:8:::29:25:::747:764
		// Covers objective: /repo/dist/pricing.js:31:9:::33:5:::780:832
		// Covers objective: /repo/dist/pricing.js:26:8:::26:18:::697:707
		// Covers objective: /repo/dist/pricing.js:22:9:::27:5:::632:713
		// Covers objective: /repo/dist/pricing.js:16:8:::16:59:::501:552
		// Covers objective: placeholder:::/repo/dist/pricing.js:15:4:::17:5:::471:558
		// Covers objective: /repo/dist/pricing.js:13:8:::13:56:::412:460
		// Covers objective: placeholder:::/repo/dist/pricing.js:12:4:::14:5:::383:466
		// Covers objective: /repo/dist/pricing.js:10:8:::10:62:::318:372
		// Covers objective: placeholder:::/repo/dist/pricing.js:9:4:::11:5:::276:378
		// Covers objective: /repo/dist/pricing.js:8:0:::38:1:::216:929
		
		// Test
		const weightKg = 15;
		const zone = "#*rqEV?'V.m@p%:aw }'\"o§abIT_knl^YO--Z\n'n±\nvl jriXW@BM\tU2?AK$+X_81l'EM<B2^";
		const isPremium = true;
		const anon = new Cart()
		const anon1 = 282.18624134417814;
		const calculateShippingReturnValue = await calculateShipping(weightKg, zone, isPremium, anon, anon1)
		const anon2 = new Cart()
		const sku = () => {};
		const weightKg1 = 15;
		const anon3 = 282.18624134417814;
		
		// Assertions
		expect(calculateShippingReturnValue).to.equal(75.2)
		await expect((async () => {
			await anon2.add(sku, weightKg1, anon3)
		})()).to.be.rejectedWith(`quantity must be a positive integer`)
	})

	it("Test 6 for 'pricing'", async () => {
		// Meta information
		// Selected for objective: /repo/dist/pricing.js:20:8:::20:18:::606:616
		// Selected for:
		// 	Error: unknown coupon
		// 	    at Cart.applyCoupon (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/instrumented/dist/cart.js:1453:13)
		// 	    at call (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/tests/tempTest.spec.js:24:16)
		// 	    at Generator._invoke (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/tests/tempTest.spec.js:2:1)
		// 	    at Generator.next (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/tests/tempTest.spec.js:2:1)
		// 	    at asyncGeneratorStep (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/tests/tempTest.spec.js:2:1)
		// 	    at _next (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/tests/tempTest.spec.js:2:1)
		// 
		// Covers objective: /repo/dist/pricing.js:35:8:::35:26:::862:880
		// Covers objective: /repo/dist/pricing.js:32:8:::32:25:::809:826
		// Covers objective: /repo/dist/pricing.js:29:8:::29:25:::747:764
		// Covers objective: /repo/dist/pricing.js:31:9:::33:5:::780:832
		// Covers objective: /repo/dist/pricing.js:26:8:::26:18:::697:707
		// Covers objective: /repo/dist/pricing.js:20:8:::20:18:::606:616
		// Covers objective: /repo/dist/pricing.js:22:9:::27:5:::632:713
		// Covers objective: /repo/dist/pricing.js:16:8:::16:59:::501:552
		// Covers objective: placeholder:::/repo/dist/pricing.js:15:4:::17:5:::471:558
		// Covers objective: /repo/dist/pricing.js:13:8:::13:56:::412:460
		// Covers objective: placeholder:::/repo/dist/pricing.js:12:4:::14:5:::383:466
		// Covers objective: /repo/dist/pricing.js:10:8:::10:62:::318:372
		// Covers objective: placeholder:::/repo/dist/pricing.js:9:4:::11:5:::276:378
		// Covers objective: /repo/dist/pricing.js:8:0:::38:1:::216:929
		
		// Test
		const weightKg = 30;
		const zone = "PL";
		const isPremium = true;
		const anon = new Cart()
		const calculateShippingReturnValue = await calculateShipping(weightKg, zone, isPremium, anon)
		const anon1 = new Cart()
		const code = {}
		const anon2 = null;
		
		// Assertions
		expect(calculateShippingReturnValue).to.equal(21.6)
		await expect((async () => {
			await anon1.applyCoupon(code, anon2)
		})()).to.be.rejectedWith(`unknown coupon`)
	})

	it("Test 7 for 'pricing'", async () => {
		// Meta information
		// Selected for objective: placeholder:::/repo/dist/pricing.js:34:4:::36:5:::837:886
		// Covers objective: /repo/dist/pricing.js:35:8:::35:26:::862:880
		// Covers objective: placeholder:::/repo/dist/pricing.js:34:4:::36:5:::837:886
		// Covers objective: /repo/dist/pricing.js:32:8:::32:25:::809:826
		// Covers objective: /repo/dist/pricing.js:29:8:::29:25:::747:764
		// Covers objective: /repo/dist/pricing.js:31:9:::33:5:::780:832
		// Covers objective: /repo/dist/pricing.js:26:8:::26:18:::697:707
		// Covers objective: /repo/dist/pricing.js:20:8:::20:18:::606:616
		// Covers objective: /repo/dist/pricing.js:22:9:::27:5:::632:713
		// Covers objective: /repo/dist/pricing.js:16:8:::16:59:::501:552
		// Covers objective: placeholder:::/repo/dist/pricing.js:15:4:::17:5:::471:558
		// Covers objective: /repo/dist/pricing.js:13:8:::13:56:::412:460
		// Covers objective: placeholder:::/repo/dist/pricing.js:12:4:::14:5:::383:466
		// Covers objective: /repo/dist/pricing.js:10:8:::10:62:::318:372
		// Covers objective: placeholder:::/repo/dist/pricing.js:9:4:::11:5:::276:378
		// Covers objective: /repo/dist/pricing.js:8:0:::38:1:::216:929
		
		// Test
		const weightKg = 12;
		const zone = "__esModule";
		const isPremium = "{q1{FQ|[Vi!j+";
		const calculateShippingReturnValue = await calculateShipping(weightKg, zone, isPremium)
		const weightKg1 = 12;
		const zone1 = () => {};
		const isPremium1 = false;
		const anon = 12;
		const calculateShippingReturnValue1 = await calculateShipping(weightKg1, zone1, isPremium1, anon)
		const anon1 = 12;
		const zone2 = "±/'k3Ox[usp*8cAt(1HgBlli3lz±*§±jf`V>^9=RL:+j";
		const isPremium2 = false;
		const calculateShippingReturnValue2 = await calculateShipping(anon1, zone2, isPremium2)
		
		// Assertions
		expect(calculateShippingReturnValue).to.equal(75.2)
		expect(calculateShippingReturnValue1).to.equal(94)
		expect(calculateShippingReturnValue2).to.equal(94)
	})

	it("Test 8 for 'pricing'", async () => {
		// Meta information
		// Selected for objective: placeholder:::/repo/dist/pricing.js:31:9:::33:5:::780:832
		// Covers objective: /repo/dist/pricing.js:35:8:::35:26:::862:880
		// Covers objective: placeholder:::/repo/dist/pricing.js:34:4:::36:5:::837:886
		// Covers objective: /repo/dist/pricing.js:32:8:::32:25:::809:826
		// Covers objective: placeholder:::/repo/dist/pricing.js:31:9:::33:5:::780:832
		// Covers objective: /repo/dist/pricing.js:29:8:::29:25:::747:764
		// Covers objective: /repo/dist/pricing.js:31:9:::33:5:::780:832
		// Covers objective: /repo/dist/pricing.js:26:8:::26:18:::697:707
		// Covers objective: /repo/dist/pricing.js:20:8:::20:18:::606:616
		// Covers objective: /repo/dist/pricing.js:22:9:::27:5:::632:713
		// Covers objective: /repo/dist/pricing.js:16:8:::16:59:::501:552
		// Covers objective: placeholder:::/repo/dist/pricing.js:15:4:::17:5:::471:558
		// Covers objective: /repo/dist/pricing.js:13:8:::13:56:::412:460
		// Covers objective: placeholder:::/repo/dist/pricing.js:12:4:::14:5:::383:466
		// Covers objective: /repo/dist/pricing.js:10:8:::10:62:::318:372
		// Covers objective: placeholder:::/repo/dist/pricing.js:9:4:::11:5:::276:378
		// Covers objective: /repo/dist/pricing.js:8:0:::38:1:::216:929
		
		// Test
		const weightKg = 1;
		const zone = "weight must be positive";
		const isPremium = true;
		const anon = -332;
		const calculateShippingReturnValue = await calculateShipping(weightKg, zone, isPremium, anon)
		const weightKg1 = 1;
		const zone1 = "malformed invoice id";
		const isPremium1 = true;
		const anon1 = 40;
		const calculateShippingReturnValue1 = await calculateShipping(weightKg1, zone1, isPremium1, anon1)
		
		// Assertions
		expect(calculateShippingReturnValue).to.equal(63.2)
		expect(calculateShippingReturnValue1).to.equal(63.2)
	})

	it("Test 9 for 'pricing'", async () => {
		// Meta information
		// Selected for:
		// 	RangeError: weight above carrier limit
		// 	    at calculateShipping (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/instrumented/dist/pricing.js:886:11)
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
		// Covers objective: /repo/dist/pricing.js:35:8:::35:26:::862:880
		// Covers objective: placeholder:::/repo/dist/pricing.js:34:4:::36:5:::837:886
		// Covers objective: /repo/dist/pricing.js:32:8:::32:25:::809:826
		// Covers objective: placeholder:::/repo/dist/pricing.js:31:9:::33:5:::780:832
		// Covers objective: /repo/dist/pricing.js:29:8:::29:25:::747:764
		// Covers objective: /repo/dist/pricing.js:31:9:::33:5:::780:832
		// Covers objective: /repo/dist/pricing.js:26:8:::26:18:::697:707
		// Covers objective: /repo/dist/pricing.js:20:8:::20:18:::606:616
		// Covers objective: /repo/dist/pricing.js:22:9:::27:5:::632:713
		// Covers objective: /repo/dist/pricing.js:16:8:::16:59:::501:552
		// Covers objective: placeholder:::/repo/dist/pricing.js:15:4:::17:5:::471:558
		// Covers objective: /repo/dist/pricing.js:13:8:::13:56:::412:460
		// Covers objective: placeholder:::/repo/dist/pricing.js:12:4:::14:5:::383:466
		// Covers objective: /repo/dist/pricing.js:10:8:::10:62:::318:372
		// Covers objective: placeholder:::/repo/dist/pricing.js:9:4:::11:5:::276:378
		// Covers objective: /repo/dist/pricing.js:8:0:::38:1:::216:929
		
		// Test
		const weightKg = 968.1576969224541;
		const zone = "PC8E8X64IoAXa%'kL1 jq?oU\t%Pa/Ou>/#^E9=P77h:(aqP-\"\t>WVwQ&w6DF5ug<&1*d&";
		const isPremium = false;
		const anon = 100;
		
		// Assertions
		await expect((async () => {
			await calculateShipping(weightKg, zone, isPremium, anon)
		})()).to.be.rejectedWith(`weight above carrier limit`)
	})

	it("Test 10 for 'pricing'", async () => {
		// Meta information
		// Selected for:
		// 	TypeError: weight must be a finite number
		// 	    at cart (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/instrumented/dist/pricing.js:858:11)
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
		// Covers objective: /repo/dist/pricing.js:35:8:::35:26:::862:880
		// Covers objective: placeholder:::/repo/dist/pricing.js:34:4:::36:5:::837:886
		// Covers objective: /repo/dist/pricing.js:32:8:::32:25:::809:826
		// Covers objective: placeholder:::/repo/dist/pricing.js:31:9:::33:5:::780:832
		// Covers objective: /repo/dist/pricing.js:29:8:::29:25:::747:764
		// Covers objective: /repo/dist/pricing.js:31:9:::33:5:::780:832
		// Covers objective: /repo/dist/pricing.js:26:8:::26:18:::697:707
		// Covers objective: /repo/dist/pricing.js:20:8:::20:18:::606:616
		// Covers objective: /repo/dist/pricing.js:22:9:::27:5:::632:713
		// Covers objective: /repo/dist/pricing.js:16:8:::16:59:::501:552
		// Covers objective: placeholder:::/repo/dist/pricing.js:15:4:::17:5:::471:558
		// Covers objective: /repo/dist/pricing.js:13:8:::13:56:::412:460
		// Covers objective: placeholder:::/repo/dist/pricing.js:12:4:::14:5:::383:466
		// Covers objective: /repo/dist/pricing.js:10:8:::10:62:::318:372
		// Covers objective: placeholder:::/repo/dist/pricing.js:9:4:::11:5:::276:378
		// Covers objective: /repo/dist/pricing.js:8:0:::38:1:::216:929
		
		// Test
		const weightKg = true;
		const zone = "J9M6sY^+;*hbP$u<w";
		const isPremium = true;
		
		// Assertions
		await expect((async () => {
			await calculateShipping(weightKg, zone, isPremium)
		})()).to.be.rejectedWith(`weight must be a finite number`)
	})

	it("Test 11 for 'pricing'", async () => {
		// Meta information
		// Selected for:
		// 	RangeError: weight must be positive
		// 	    at cart (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/instrumented/dist/pricing.js:872:11)
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
		// Covers objective: /repo/dist/pricing.js:35:8:::35:26:::862:880
		// Covers objective: placeholder:::/repo/dist/pricing.js:34:4:::36:5:::837:886
		// Covers objective: /repo/dist/pricing.js:32:8:::32:25:::809:826
		// Covers objective: placeholder:::/repo/dist/pricing.js:31:9:::33:5:::780:832
		// Covers objective: /repo/dist/pricing.js:29:8:::29:25:::747:764
		// Covers objective: /repo/dist/pricing.js:31:9:::33:5:::780:832
		// Covers objective: /repo/dist/pricing.js:26:8:::26:18:::697:707
		// Covers objective: /repo/dist/pricing.js:20:8:::20:18:::606:616
		// Covers objective: /repo/dist/pricing.js:22:9:::27:5:::632:713
		// Covers objective: /repo/dist/pricing.js:16:8:::16:59:::501:552
		// Covers objective: placeholder:::/repo/dist/pricing.js:15:4:::17:5:::471:558
		// Covers objective: /repo/dist/pricing.js:13:8:::13:56:::412:460
		// Covers objective: placeholder:::/repo/dist/pricing.js:12:4:::14:5:::383:466
		// Covers objective: /repo/dist/pricing.js:10:8:::10:62:::318:372
		// Covers objective: placeholder:::/repo/dist/pricing.js:9:4:::11:5:::276:378
		// Covers objective: /repo/dist/pricing.js:8:0:::38:1:::216:929
		
		// Test
		const weightKg = -554.8336343687442;
		const zone = "z&L9(8(l;h)LDU?~$Q@f$`a(0$C=mB3o>I";
		const isPremium = true;
		
		// Assertions
		await expect((async () => {
			await calculateShipping(weightKg, zone, isPremium)
		})()).to.be.rejectedWith(`weight must be positive`)
	})

	it("Test 12 for 'pricing'", async () => {
		// Meta information
		// Selected for:
		// 	RangeError: weight must be positive
		// 	    at priceGrosz (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/instrumented/dist/pricing.js:872:11)
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
		// Covers objective: /repo/dist/pricing.js:35:8:::35:26:::862:880
		// Covers objective: placeholder:::/repo/dist/pricing.js:34:4:::36:5:::837:886
		// Covers objective: /repo/dist/pricing.js:32:8:::32:25:::809:826
		// Covers objective: placeholder:::/repo/dist/pricing.js:31:9:::33:5:::780:832
		// Covers objective: /repo/dist/pricing.js:29:8:::29:25:::747:764
		// Covers objective: /repo/dist/pricing.js:31:9:::33:5:::780:832
		// Covers objective: /repo/dist/pricing.js:26:8:::26:18:::697:707
		// Covers objective: /repo/dist/pricing.js:20:8:::20:18:::606:616
		// Covers objective: /repo/dist/pricing.js:22:9:::27:5:::632:713
		// Covers objective: /repo/dist/pricing.js:16:8:::16:59:::501:552
		// Covers objective: placeholder:::/repo/dist/pricing.js:15:4:::17:5:::471:558
		// Covers objective: /repo/dist/pricing.js:13:8:::13:56:::412:460
		// Covers objective: placeholder:::/repo/dist/pricing.js:12:4:::14:5:::383:466
		// Covers objective: /repo/dist/pricing.js:10:8:::10:62:::318:372
		// Covers objective: placeholder:::/repo/dist/pricing.js:9:4:::11:5:::276:378
		// Covers objective: /repo/dist/pricing.js:8:0:::38:1:::216:929
		
		// Test
		const weightKg = -891;
		const zone = "sequence number must not be zero";
		const isPremium = true;
		const anon = new Cart()
		
		// Assertions
		await expect((async () => {
			await calculateShipping(weightKg, zone, isPremium, anon)
		})()).to.be.rejectedWith(`weight must be positive`)
	})

	it("Test 13 for 'pricing'", async () => {
		// Meta information
		// Selected for:
		// 	RangeError: weight must be positive
		// 	    at _context (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/instrumented/dist/pricing.js:872:11)
		// 	    at call (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/tests/tempTest.spec.js:25:33)
		// 	    at Generator._invoke (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/tests/tempTest.spec.js:2:1)
		// 	    at Generator.next (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/tests/tempTest.spec.js:2:1)
		// 	    at asyncGeneratorStep (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/tests/tempTest.spec.js:2:1)
		// 	    at _next (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/tests/tempTest.spec.js:2:1)
		// 
		// Covers objective: /repo/dist/pricing.js:35:8:::35:26:::862:880
		// Covers objective: placeholder:::/repo/dist/pricing.js:34:4:::36:5:::837:886
		// Covers objective: /repo/dist/pricing.js:32:8:::32:25:::809:826
		// Covers objective: placeholder:::/repo/dist/pricing.js:31:9:::33:5:::780:832
		// Covers objective: /repo/dist/pricing.js:29:8:::29:25:::747:764
		// Covers objective: /repo/dist/pricing.js:31:9:::33:5:::780:832
		// Covers objective: /repo/dist/pricing.js:26:8:::26:18:::697:707
		// Covers objective: /repo/dist/pricing.js:20:8:::20:18:::606:616
		// Covers objective: /repo/dist/pricing.js:22:9:::27:5:::632:713
		// Covers objective: /repo/dist/pricing.js:16:8:::16:59:::501:552
		// Covers objective: placeholder:::/repo/dist/pricing.js:15:4:::17:5:::471:558
		// Covers objective: /repo/dist/pricing.js:13:8:::13:56:::412:460
		// Covers objective: placeholder:::/repo/dist/pricing.js:12:4:::14:5:::383:466
		// Covers objective: /repo/dist/pricing.js:10:8:::10:62:::318:372
		// Covers objective: placeholder:::/repo/dist/pricing.js:9:4:::11:5:::276:378
		// Covers objective: /repo/dist/pricing.js:8:0:::38:1:::216:929
		
		// Test
		const weightKg = 100;
		const zone = "weight above carrier limit";
		const isPremium = "1%q[4Hfi~1}'cg*tX";
		const calculateShippingReturnValue = await calculateShipping(weightKg, zone, isPremium)
		const weightKg1 = 100;
		const zone1 = "price must be a non-negative integer of grosz";
		const isPremium1 = false;
		const calculateShippingReturnValue1 = await calculateShipping(weightKg1, zone1, isPremium1)
		const weightKg2 = -201.9183314872273;
		const zone2 = "cart quantity underflow";
		const isPremium2 = false;
		
		// Assertions
		expect(calculateShippingReturnValue).to.equal(95.2)
		expect(calculateShippingReturnValue1).to.equal(119)
		await expect((async () => {
			await calculateShipping(weightKg2, zone2, isPremium2)
		})()).to.be.rejectedWith(`weight must be positive`)
	})

	it("Test 14 for 'pricing'", async () => {
		// Meta information
		// Selected for:
		// 	RangeError: weight above carrier limit
		// 	    at cart1 (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/instrumented/dist/pricing.js:886:11)
		// 	    at call (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/tests/tempTest.spec.js:22:32)
		// 	    at Generator._invoke (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/tests/tempTest.spec.js:2:1)
		// 	    at Generator.next (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/tests/tempTest.spec.js:2:1)
		// 	    at asyncGeneratorStep (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/tests/tempTest.spec.js:2:1)
		// 	    at _next (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/tests/tempTest.spec.js:2:1)
		// 
		// Covers objective: /repo/dist/pricing.js:35:8:::35:26:::862:880
		// Covers objective: placeholder:::/repo/dist/pricing.js:34:4:::36:5:::837:886
		// Covers objective: /repo/dist/pricing.js:32:8:::32:25:::809:826
		// Covers objective: placeholder:::/repo/dist/pricing.js:31:9:::33:5:::780:832
		// Covers objective: /repo/dist/pricing.js:29:8:::29:25:::747:764
		// Covers objective: /repo/dist/pricing.js:31:9:::33:5:::780:832
		// Covers objective: /repo/dist/pricing.js:26:8:::26:18:::697:707
		// Covers objective: /repo/dist/pricing.js:20:8:::20:18:::606:616
		// Covers objective: /repo/dist/pricing.js:22:9:::27:5:::632:713
		// Covers objective: /repo/dist/pricing.js:16:8:::16:59:::501:552
		// Covers objective: placeholder:::/repo/dist/pricing.js:15:4:::17:5:::471:558
		// Covers objective: /repo/dist/pricing.js:13:8:::13:56:::412:460
		// Covers objective: placeholder:::/repo/dist/pricing.js:12:4:::14:5:::383:466
		// Covers objective: /repo/dist/pricing.js:10:8:::10:62:::318:372
		// Covers objective: placeholder:::/repo/dist/pricing.js:9:4:::11:5:::276:378
		// Covers objective: /repo/dist/pricing.js:8:0:::38:1:::216:929
		
		// Test
		const weightKg = 3.141592653589793;
		const zone = "73af'`6.}HbF0=lU:&|&8Q}&YsI]e\\'>InzV7qs1Ch=X/u(hhnl6";
		const isPremium = false;
		const calculateShippingReturnValue = await calculateShipping(weightKg, zone, isPremium)
		const weightKg1 = 414;
		const zone1 = "azG*2\ne*]}o]-E Pf4@}m)Di\\L1]lHG(:X,8S+\"(Rb'Xw)x!nnWT<~r.GC.oFrHm§(%h/L[b3;*KL'4d;x\\N:}3aVeAH(";
		const isPremium1 = false;
		const anon = {}
		
		// Assertions
		expect(calculateShippingReturnValue).to.equal(79)
		await expect((async () => {
			await calculateShipping(weightKg1, zone1, isPremium1, anon)
		})()).to.be.rejectedWith(`weight above carrier limit`)
	})

	it("Test 15 for 'pricing'", async () => {
		// Meta information
		// Selected for:
		// 	TypeError: weight must be a finite number
		// 	    at calculateShipping (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/instrumented/dist/pricing.js:858:11)
		// 	    at call (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/tests/tempTest.spec.js:19:16)
		// 	    at Generator._invoke (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/tests/tempTest.spec.js:2:1)
		// 	    at Generator.next (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/tests/tempTest.spec.js:2:1)
		// 	    at asyncGeneratorStep (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/tests/tempTest.spec.js:2:1)
		// 	    at _next (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/tests/tempTest.spec.js:2:1)
		// 	    at /repo/.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/tests/tempTest.spec.js:2:1
		// 	    at new Promise (<anonymous>)
		// 	    at Context.<anonymous> (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/tests/tempTest.spec.js:2:1)
		// 	    at processImmediate (node:internal/timers:504:21)
		// 
		// Covers objective: /repo/dist/pricing.js:35:8:::35:26:::862:880
		// Covers objective: placeholder:::/repo/dist/pricing.js:34:4:::36:5:::837:886
		// Covers objective: /repo/dist/pricing.js:32:8:::32:25:::809:826
		// Covers objective: placeholder:::/repo/dist/pricing.js:31:9:::33:5:::780:832
		// Covers objective: /repo/dist/pricing.js:29:8:::29:25:::747:764
		// Covers objective: /repo/dist/pricing.js:31:9:::33:5:::780:832
		// Covers objective: /repo/dist/pricing.js:26:8:::26:18:::697:707
		// Covers objective: /repo/dist/pricing.js:20:8:::20:18:::606:616
		// Covers objective: /repo/dist/pricing.js:22:9:::27:5:::632:713
		// Covers objective: /repo/dist/pricing.js:16:8:::16:59:::501:552
		// Covers objective: placeholder:::/repo/dist/pricing.js:15:4:::17:5:::471:558
		// Covers objective: /repo/dist/pricing.js:13:8:::13:56:::412:460
		// Covers objective: placeholder:::/repo/dist/pricing.js:12:4:::14:5:::383:466
		// Covers objective: /repo/dist/pricing.js:10:8:::10:62:::318:372
		// Covers objective: placeholder:::/repo/dist/pricing.js:9:4:::11:5:::276:378
		// Covers objective: /repo/dist/pricing.js:8:0:::38:1:::216:929
		
		// Test
		const arrayElement = false;
		const arrayElement1 = undefined;
		const weightKg = [arrayElement, arrayElement1]
		const zone = "'P.cbty[K-fA\\89,1Du\nLj5;:M;Wjzs[,7uL&lVN7Mzp|";
		const isPremium = true;
		const anon = () => {};
		const anon1 = () => {};
		
		// Assertions
		await expect((async () => {
			await calculateShipping(weightKg, zone, isPremium, anon, anon1)
		})()).to.be.rejectedWith(`weight must be a finite number`)
	})

	it("Test 16 for 'pricing'", async () => {
		// Meta information
		// Selected for:
		// 	RangeError: weight above carrier limit
		// 	    at priceGrosz (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/instrumented/dist/pricing.js:886:11)
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
		// Covers objective: /repo/dist/pricing.js:35:8:::35:26:::862:880
		// Covers objective: placeholder:::/repo/dist/pricing.js:34:4:::36:5:::837:886
		// Covers objective: /repo/dist/pricing.js:32:8:::32:25:::809:826
		// Covers objective: placeholder:::/repo/dist/pricing.js:31:9:::33:5:::780:832
		// Covers objective: /repo/dist/pricing.js:29:8:::29:25:::747:764
		// Covers objective: /repo/dist/pricing.js:31:9:::33:5:::780:832
		// Covers objective: /repo/dist/pricing.js:26:8:::26:18:::697:707
		// Covers objective: /repo/dist/pricing.js:20:8:::20:18:::606:616
		// Covers objective: /repo/dist/pricing.js:22:9:::27:5:::632:713
		// Covers objective: /repo/dist/pricing.js:16:8:::16:59:::501:552
		// Covers objective: placeholder:::/repo/dist/pricing.js:15:4:::17:5:::471:558
		// Covers objective: /repo/dist/pricing.js:13:8:::13:56:::412:460
		// Covers objective: placeholder:::/repo/dist/pricing.js:12:4:::14:5:::383:466
		// Covers objective: /repo/dist/pricing.js:10:8:::10:62:::318:372
		// Covers objective: placeholder:::/repo/dist/pricing.js:9:4:::11:5:::276:378
		// Covers objective: /repo/dist/pricing.js:8:0:::38:1:::216:929
		
		// Test
		const weightKg = 761.7599189807045;
		const zone = ";H1hDHh\\T-Rp!+Fm>§ugU";
		const isPremium = false;
		const anon = new Cart()
		
		// Assertions
		await expect((async () => {
			await calculateShipping(weightKg, zone, isPremium, anon)
		})()).to.be.rejectedWith(`weight above carrier limit`)
	})

	it("Test 17 for 'pricing'", async () => {
		// Meta information
		// Selected for:
		// 	Error: sku not in cart
		// 	    at Cart.remove (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/instrumented/dist/cart.js:1432:13)
		// 	    at call (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/tests/tempTest.spec.js:23:27)
		// 	    at Generator._invoke (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/tests/tempTest.spec.js:2:1)
		// 	    at Generator.next (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/tests/tempTest.spec.js:2:1)
		// 	    at asyncGeneratorStep (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/tests/tempTest.spec.js:2:1)
		// 	    at _next (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/tests/tempTest.spec.js:2:1)
		// 
		// Covers objective: /repo/dist/pricing.js:35:8:::35:26:::862:880
		// Covers objective: placeholder:::/repo/dist/pricing.js:34:4:::36:5:::837:886
		// Covers objective: /repo/dist/pricing.js:32:8:::32:25:::809:826
		// Covers objective: placeholder:::/repo/dist/pricing.js:31:9:::33:5:::780:832
		// Covers objective: /repo/dist/pricing.js:29:8:::29:25:::747:764
		// Covers objective: /repo/dist/pricing.js:31:9:::33:5:::780:832
		// Covers objective: /repo/dist/pricing.js:26:8:::26:18:::697:707
		// Covers objective: /repo/dist/pricing.js:20:8:::20:18:::606:616
		// Covers objective: /repo/dist/pricing.js:22:9:::27:5:::632:713
		// Covers objective: /repo/dist/pricing.js:16:8:::16:59:::501:552
		// Covers objective: placeholder:::/repo/dist/pricing.js:15:4:::17:5:::471:558
		// Covers objective: /repo/dist/pricing.js:13:8:::13:56:::412:460
		// Covers objective: placeholder:::/repo/dist/pricing.js:12:4:::14:5:::383:466
		// Covers objective: /repo/dist/pricing.js:10:8:::10:62:::318:372
		// Covers objective: placeholder:::/repo/dist/pricing.js:9:4:::11:5:::276:378
		// Covers objective: /repo/dist/pricing.js:8:0:::38:1:::216:929
		
		// Test
		const weightKg = 80.39986059920057;
		const zone = "weight must be positive";
		const isPremium = new Cart()
		const calculateShippingReturnValue = await calculateShipping(weightKg, zone, isPremium)
		const isPremium1 = new Cart()
		const sku = false;
		const qty = 2100;
		
		// Assertions
		expect(calculateShippingReturnValue).to.equal(95.2)
		await expect((async () => {
			await isPremium1.remove(sku, qty)
		})()).to.be.rejectedWith(`sku not in cart`)
	})

	it("Test 18 for 'pricing'", async () => {
		// Meta information
		// Selected for:
		// 	RangeError: weight above carrier limit
		// 	    at addReturnValue (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/instrumented/dist/pricing.js:886:11)
		// 	    at call (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/tests/tempTest.spec.js:22:9)
		// 	    at Generator._invoke (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/tests/tempTest.spec.js:2:1)
		// 	    at Generator.next (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/tests/tempTest.spec.js:2:1)
		// 	    at asyncGeneratorStep (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/tests/tempTest.spec.js:2:1)
		// 	    at _next (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/tests/tempTest.spec.js:2:1)
		// 
		// Covers objective: /repo/dist/pricing.js:35:8:::35:26:::862:880
		// Covers objective: placeholder:::/repo/dist/pricing.js:34:4:::36:5:::837:886
		// Covers objective: /repo/dist/pricing.js:32:8:::32:25:::809:826
		// Covers objective: placeholder:::/repo/dist/pricing.js:31:9:::33:5:::780:832
		// Covers objective: /repo/dist/pricing.js:29:8:::29:25:::747:764
		// Covers objective: /repo/dist/pricing.js:31:9:::33:5:::780:832
		// Covers objective: /repo/dist/pricing.js:26:8:::26:18:::697:707
		// Covers objective: /repo/dist/pricing.js:20:8:::20:18:::606:616
		// Covers objective: /repo/dist/pricing.js:22:9:::27:5:::632:713
		// Covers objective: /repo/dist/pricing.js:16:8:::16:59:::501:552
		// Covers objective: placeholder:::/repo/dist/pricing.js:15:4:::17:5:::471:558
		// Covers objective: /repo/dist/pricing.js:13:8:::13:56:::412:460
		// Covers objective: placeholder:::/repo/dist/pricing.js:12:4:::14:5:::383:466
		// Covers objective: /repo/dist/pricing.js:10:8:::10:62:::318:372
		// Covers objective: placeholder:::/repo/dist/pricing.js:9:4:::11:5:::276:378
		// Covers objective: /repo/dist/pricing.js:8:0:::38:1:::216:929
		
		// Test
		const weightKg = 30;
		const zone = "QJ[EqpJG@K\t zM^.2";
		const isPremium = false;
		const anon = () => {};
		const calculateShippingReturnValue = await calculateShipping(weightKg, zone, isPremium, anon)
		const weightKg1 = 951;
		const zone1 = "n]N)c?8|gF\tb0:28eV(-|!I;Yq\\,3Jp[N8qZ#n[!IWyxA&rr<%i~ybM]> _w3GYUFP±sRR%?'D<BU";
		const isPremium1 = true;
		const anon1 = null;
		const isPremium2 = true;
		
		// Assertions
		expect(calculateShippingReturnValue).to.equal(94)
		await expect((async () => {
			await calculateShipping(weightKg1, zone1, isPremium1, anon1, isPremium2)
		})()).to.be.rejectedWith(`weight above carrier limit`)
	})

	it("Test 19 for 'pricing'", async () => {
		// Meta information
		// Selected for:
		// 	RangeError: weight must be positive
		// 	    at addReturnValue (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/instrumented/dist/pricing.js:872:11)
		// 	    at call (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/tests/tempTest.spec.js:22:9)
		// 	    at Generator._invoke (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/tests/tempTest.spec.js:2:1)
		// 	    at Generator.next (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/tests/tempTest.spec.js:2:1)
		// 	    at asyncGeneratorStep (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/tests/tempTest.spec.js:2:1)
		// 	    at _next (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/tests/tempTest.spec.js:2:1)
		// 
		// Covers objective: /repo/dist/pricing.js:35:8:::35:26:::862:880
		// Covers objective: placeholder:::/repo/dist/pricing.js:34:4:::36:5:::837:886
		// Covers objective: /repo/dist/pricing.js:32:8:::32:25:::809:826
		// Covers objective: placeholder:::/repo/dist/pricing.js:31:9:::33:5:::780:832
		// Covers objective: /repo/dist/pricing.js:29:8:::29:25:::747:764
		// Covers objective: /repo/dist/pricing.js:31:9:::33:5:::780:832
		// Covers objective: /repo/dist/pricing.js:26:8:::26:18:::697:707
		// Covers objective: /repo/dist/pricing.js:20:8:::20:18:::606:616
		// Covers objective: /repo/dist/pricing.js:22:9:::27:5:::632:713
		// Covers objective: /repo/dist/pricing.js:16:8:::16:59:::501:552
		// Covers objective: placeholder:::/repo/dist/pricing.js:15:4:::17:5:::471:558
		// Covers objective: /repo/dist/pricing.js:13:8:::13:56:::412:460
		// Covers objective: placeholder:::/repo/dist/pricing.js:12:4:::14:5:::383:466
		// Covers objective: /repo/dist/pricing.js:10:8:::10:62:::318:372
		// Covers objective: placeholder:::/repo/dist/pricing.js:9:4:::11:5:::276:378
		// Covers objective: /repo/dist/pricing.js:8:0:::38:1:::216:929
		
		// Test
		const weightKg = 50;
		const zone = "unknown coupon";
		const isPremium = false;
		const anon = null;
		const calculateShippingReturnValue = await calculateShipping(weightKg, zone, isPremium, anon)
		const weightKg1 = -729.1228853606132;
		const zone1 = "n]N)c?8|gF\tb0:28eV(-|!I;Yq\\,3Jp[N8qZ#n[!IWyxA&rr<%i~ybM]> _w3GYUFP±sRR%?'D<BU";
		const isPremium1 = true;
		const anon1 = null;
		const isPremium2 = true;
		
		// Assertions
		expect(calculateShippingReturnValue).to.equal(119)
		await expect((async () => {
			await calculateShipping(weightKg1, zone1, isPremium1, anon1, isPremium2)
		})()).to.be.rejectedWith(`weight must be positive`)
	})

	it("Test 20 for 'pricing'", async () => {
		// Meta information
		// Selected for:
		// 	RangeError: price must be a non-negative integer of grosz
		// 	    at Cart.add (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/instrumented/dist/cart.js:1352:13)
		// 	    at call (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/tests/tempTest.spec.js:57:32)
		// 	    at Generator._invoke (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/tests/tempTest.spec.js:2:1)
		// 	    at Generator.next (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/tests/tempTest.spec.js:2:1)
		// 	    at asyncGeneratorStep (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/tests/tempTest.spec.js:2:1)
		// 	    at _next (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/tests/tempTest.spec.js:2:1)
		// 
		// Covers objective: /repo/dist/pricing.js:35:8:::35:26:::862:880
		// Covers objective: placeholder:::/repo/dist/pricing.js:34:4:::36:5:::837:886
		// Covers objective: /repo/dist/pricing.js:32:8:::32:25:::809:826
		// Covers objective: placeholder:::/repo/dist/pricing.js:31:9:::33:5:::780:832
		// Covers objective: /repo/dist/pricing.js:29:8:::29:25:::747:764
		// Covers objective: /repo/dist/pricing.js:31:9:::33:5:::780:832
		// Covers objective: /repo/dist/pricing.js:26:8:::26:18:::697:707
		// Covers objective: /repo/dist/pricing.js:20:8:::20:18:::606:616
		// Covers objective: /repo/dist/pricing.js:22:9:::27:5:::632:713
		// Covers objective: /repo/dist/pricing.js:16:8:::16:59:::501:552
		// Covers objective: placeholder:::/repo/dist/pricing.js:15:4:::17:5:::471:558
		// Covers objective: /repo/dist/pricing.js:13:8:::13:56:::412:460
		// Covers objective: placeholder:::/repo/dist/pricing.js:12:4:::14:5:::383:466
		// Covers objective: /repo/dist/pricing.js:10:8:::10:62:::318:372
		// Covers objective: placeholder:::/repo/dist/pricing.js:9:4:::11:5:::276:378
		// Covers objective: /repo/dist/pricing.js:8:0:::38:1:::216:929
		
		// Test
		const weightKg = 29;
		const zone = "O-Y_9(dE2'{\" dL6]<<]wsHdT3cC.\t`1|/Oxq2o#])ip=k|S^c9r/_%qL'>oZn;qtH@jaow!tZTb_-l|dYoI§3.n{'?.§";
		const anon = "amounts must not be negative";
		const anon1 = {}
		const arrayElement = new Cart(anon, anon1)
		const isPremium = [arrayElement]
		const calculateShippingReturnValue = await calculateShipping(weightKg, zone, isPremium)
		const anon2 = "amounts must not be negative";
		const anon3 = {}
		const arrayElement1 = new Cart(anon2, anon3)
		const anon4 = "invoice id must be a string";
		const totalReturnValue = await arrayElement1.total(anon4)
		const anon5 = "amounts must not be negative";
		const anon6 = {}
		const arrayElement2 = new Cart(anon5, anon6)
		const anon7 = {}
		const arrayElement3 = true;
		const arrayElement4 = 50;
		const priceGrosz = [arrayElement3, arrayElement4]
		const qty = 50;
		const anon8 = true;
		const anon9 = () => {};
		
		// Assertions
		expect(calculateShippingReturnValue).to.equal(75.2)
		expect(totalReturnValue).to.equal(0)
		await expect((async () => {
			await arrayElement2.add(anon7, priceGrosz, qty, anon8, anon9)
		})()).to.be.rejectedWith(`price must be a non-negative integer of grosz`)
	})

	it("Test 21 for 'pricing'", async () => {
		// Meta information
		// Selected for:
		// 	RangeError: weight above carrier limit
		// 	    at removeReturnValue (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/instrumented/dist/pricing.js:886:11)
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
		// Covers objective: /repo/dist/pricing.js:35:8:::35:26:::862:880
		// Covers objective: placeholder:::/repo/dist/pricing.js:34:4:::36:5:::837:886
		// Covers objective: /repo/dist/pricing.js:32:8:::32:25:::809:826
		// Covers objective: placeholder:::/repo/dist/pricing.js:31:9:::33:5:::780:832
		// Covers objective: /repo/dist/pricing.js:29:8:::29:25:::747:764
		// Covers objective: /repo/dist/pricing.js:31:9:::33:5:::780:832
		// Covers objective: /repo/dist/pricing.js:26:8:::26:18:::697:707
		// Covers objective: /repo/dist/pricing.js:20:8:::20:18:::606:616
		// Covers objective: /repo/dist/pricing.js:22:9:::27:5:::632:713
		// Covers objective: /repo/dist/pricing.js:16:8:::16:59:::501:552
		// Covers objective: placeholder:::/repo/dist/pricing.js:15:4:::17:5:::471:558
		// Covers objective: /repo/dist/pricing.js:13:8:::13:56:::412:460
		// Covers objective: placeholder:::/repo/dist/pricing.js:12:4:::14:5:::383:466
		// Covers objective: /repo/dist/pricing.js:10:8:::10:62:::318:372
		// Covers objective: placeholder:::/repo/dist/pricing.js:9:4:::11:5:::276:378
		// Covers objective: /repo/dist/pricing.js:8:0:::38:1:::216:929
		
		// Test
		const weightKg = 946;
		const zone = "iQr\\;|He%7OAYN§IWz8\\ +IBOR±%`aKh@h,'\"{M2B)Xexr3UX1§*WGK=eEi/L";
		const isPremium = true;
		const anon = null;
		const anon1 = undefined;
		
		// Assertions
		await expect((async () => {
			await calculateShipping(weightKg, zone, isPremium, anon, anon1)
		})()).to.be.rejectedWith(`weight above carrier limit`)
	})

	it("Test 22 for 'pricing'", async () => {
		// Meta information
		// Selected for:
		// 	TypeError: weight must be a finite number
		// 	    at _context (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/instrumented/dist/pricing.js:858:11)
		// 	    at call (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/tests/tempTest.spec.js:21:20)
		// 	    at Generator._invoke (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/tests/tempTest.spec.js:2:1)
		// 	    at Generator.next (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/tests/tempTest.spec.js:2:1)
		// 	    at asyncGeneratorStep (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/tests/tempTest.spec.js:2:1)
		// 	    at _next (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/tests/tempTest.spec.js:2:1)
		// 
		// Covers objective: /repo/dist/pricing.js:35:8:::35:26:::862:880
		// Covers objective: placeholder:::/repo/dist/pricing.js:34:4:::36:5:::837:886
		// Covers objective: /repo/dist/pricing.js:32:8:::32:25:::809:826
		// Covers objective: placeholder:::/repo/dist/pricing.js:31:9:::33:5:::780:832
		// Covers objective: /repo/dist/pricing.js:29:8:::29:25:::747:764
		// Covers objective: /repo/dist/pricing.js:31:9:::33:5:::780:832
		// Covers objective: /repo/dist/pricing.js:26:8:::26:18:::697:707
		// Covers objective: /repo/dist/pricing.js:20:8:::20:18:::606:616
		// Covers objective: /repo/dist/pricing.js:22:9:::27:5:::632:713
		// Covers objective: /repo/dist/pricing.js:16:8:::16:59:::501:552
		// Covers objective: placeholder:::/repo/dist/pricing.js:15:4:::17:5:::471:558
		// Covers objective: /repo/dist/pricing.js:13:8:::13:56:::412:460
		// Covers objective: placeholder:::/repo/dist/pricing.js:12:4:::14:5:::383:466
		// Covers objective: /repo/dist/pricing.js:10:8:::10:62:::318:372
		// Covers objective: placeholder:::/repo/dist/pricing.js:9:4:::11:5:::276:378
		// Covers objective: /repo/dist/pricing.js:8:0:::38:1:::216:929
		
		// Test
		const weightKg = 12;
		const zone = "b6ASB#UXbX}\t###g<\nd# ZC!N*o\nz^\"yLS0n!B_`9z'z\"_1JGbyhJZ^~+ ]QYeZB ZPr]ez!<A5r/hgKJDir/jO3 \"Mcb6R#\"\n ";
		const isPremium = false;
		const calculateShippingReturnValue = await calculateShipping(weightKg, zone, isPremium)
		const weightKg1 = "year out of supported range";
		const zone1 = "iB*%y?*v";
		const isPremium1 = false;
		
		// Assertions
		expect(calculateShippingReturnValue).to.equal(94)
		await expect((async () => {
			await calculateShipping(weightKg1, zone1, isPremium1)
		})()).to.be.rejectedWith(`weight must be a finite number`)
	})

	it("Test 23 for 'pricing'", async () => {
		// Meta information
		// Selected for:
		// 	RangeError: weight above carrier limit
		// 	    at _context (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/instrumented/dist/pricing.js:886:11)
		// 	    at call (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/tests/tempTest.spec.js:25:33)
		// 	    at Generator._invoke (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/tests/tempTest.spec.js:2:1)
		// 	    at Generator.next (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/tests/tempTest.spec.js:2:1)
		// 	    at asyncGeneratorStep (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/tests/tempTest.spec.js:2:1)
		// 	    at _next (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/tests/tempTest.spec.js:2:1)
		// 
		// Covers objective: /repo/dist/pricing.js:35:8:::35:26:::862:880
		// Covers objective: placeholder:::/repo/dist/pricing.js:34:4:::36:5:::837:886
		// Covers objective: /repo/dist/pricing.js:32:8:::32:25:::809:826
		// Covers objective: placeholder:::/repo/dist/pricing.js:31:9:::33:5:::780:832
		// Covers objective: /repo/dist/pricing.js:29:8:::29:25:::747:764
		// Covers objective: /repo/dist/pricing.js:31:9:::33:5:::780:832
		// Covers objective: /repo/dist/pricing.js:26:8:::26:18:::697:707
		// Covers objective: /repo/dist/pricing.js:20:8:::20:18:::606:616
		// Covers objective: /repo/dist/pricing.js:22:9:::27:5:::632:713
		// Covers objective: /repo/dist/pricing.js:16:8:::16:59:::501:552
		// Covers objective: placeholder:::/repo/dist/pricing.js:15:4:::17:5:::471:558
		// Covers objective: /repo/dist/pricing.js:13:8:::13:56:::412:460
		// Covers objective: placeholder:::/repo/dist/pricing.js:12:4:::14:5:::383:466
		// Covers objective: /repo/dist/pricing.js:10:8:::10:62:::318:372
		// Covers objective: placeholder:::/repo/dist/pricing.js:9:4:::11:5:::276:378
		// Covers objective: /repo/dist/pricing.js:8:0:::38:1:::216:929
		
		// Test
		const weightKg = 2;
		const zone = "invoice id must be a string";
		const isPremium = false;
		const calculateShippingReturnValue = await calculateShipping(weightKg, zone, isPremium)
		const weightKg1 = 2;
		const zone1 = "";
		const isPremium1 = false;
		const calculateShippingReturnValue1 = await calculateShipping(weightKg1, zone1, isPremium1)
		const weightKg2 = 169.89330641475954;
		const zone2 = "sequence number must not be zero";
		const isPremium2 = false;
		
		// Assertions
		expect(calculateShippingReturnValue).to.equal(79)
		expect(calculateShippingReturnValue1).to.equal(79)
		await expect((async () => {
			await calculateShipping(weightKg2, zone2, isPremium2)
		})()).to.be.rejectedWith(`weight above carrier limit`)
	})

	it("Test 24 for 'pricing'", async () => {
		// Meta information
		// Selected for:
		// 	RangeError: weight must be positive
		// 	    at cart1 (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/instrumented/dist/pricing.js:872:11)
		// 	    at call (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/tests/tempTest.spec.js:22:32)
		// 	    at Generator._invoke (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/tests/tempTest.spec.js:2:1)
		// 	    at Generator.next (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/tests/tempTest.spec.js:2:1)
		// 	    at asyncGeneratorStep (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/tests/tempTest.spec.js:2:1)
		// 	    at _next (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/tests/tempTest.spec.js:2:1)
		// 
		// Covers objective: /repo/dist/pricing.js:35:8:::35:26:::862:880
		// Covers objective: placeholder:::/repo/dist/pricing.js:34:4:::36:5:::837:886
		// Covers objective: /repo/dist/pricing.js:32:8:::32:25:::809:826
		// Covers objective: placeholder:::/repo/dist/pricing.js:31:9:::33:5:::780:832
		// Covers objective: /repo/dist/pricing.js:29:8:::29:25:::747:764
		// Covers objective: /repo/dist/pricing.js:31:9:::33:5:::780:832
		// Covers objective: /repo/dist/pricing.js:26:8:::26:18:::697:707
		// Covers objective: /repo/dist/pricing.js:20:8:::20:18:::606:616
		// Covers objective: /repo/dist/pricing.js:22:9:::27:5:::632:713
		// Covers objective: /repo/dist/pricing.js:16:8:::16:59:::501:552
		// Covers objective: placeholder:::/repo/dist/pricing.js:15:4:::17:5:::471:558
		// Covers objective: /repo/dist/pricing.js:13:8:::13:56:::412:460
		// Covers objective: placeholder:::/repo/dist/pricing.js:12:4:::14:5:::383:466
		// Covers objective: /repo/dist/pricing.js:10:8:::10:62:::318:372
		// Covers objective: placeholder:::/repo/dist/pricing.js:9:4:::11:5:::276:378
		// Covers objective: /repo/dist/pricing.js:8:0:::38:1:::216:929
		
		// Test
		const weightKg = 3;
		const zone = "L\\p8@B,s~{9\\vm36M";
		const isPremium = false;
		const calculateShippingReturnValue = await calculateShipping(weightKg, zone, isPremium)
		const weightKg1 = -39;
		const zone1 = "invoice id must be a string";
		const isPremium1 = false;
		const anon = undefined;
		
		// Assertions
		expect(calculateShippingReturnValue).to.equal(79)
		await expect((async () => {
			await calculateShipping(weightKg1, zone1, isPremium1, anon)
		})()).to.be.rejectedWith(`weight must be positive`)
	})

	it("Test 25 for 'pricing'", async () => {
		// Meta information
		// Selected for:
		// 	RangeError: weight must be positive
		// 	    at removeReturnValue (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/instrumented/dist/pricing.js:872:11)
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
		// Covers objective: /repo/dist/pricing.js:35:8:::35:26:::862:880
		// Covers objective: placeholder:::/repo/dist/pricing.js:34:4:::36:5:::837:886
		// Covers objective: /repo/dist/pricing.js:32:8:::32:25:::809:826
		// Covers objective: placeholder:::/repo/dist/pricing.js:31:9:::33:5:::780:832
		// Covers objective: /repo/dist/pricing.js:29:8:::29:25:::747:764
		// Covers objective: /repo/dist/pricing.js:31:9:::33:5:::780:832
		// Covers objective: /repo/dist/pricing.js:26:8:::26:18:::697:707
		// Covers objective: /repo/dist/pricing.js:20:8:::20:18:::606:616
		// Covers objective: /repo/dist/pricing.js:22:9:::27:5:::632:713
		// Covers objective: /repo/dist/pricing.js:16:8:::16:59:::501:552
		// Covers objective: placeholder:::/repo/dist/pricing.js:15:4:::17:5:::471:558
		// Covers objective: /repo/dist/pricing.js:13:8:::13:56:::412:460
		// Covers objective: placeholder:::/repo/dist/pricing.js:12:4:::14:5:::383:466
		// Covers objective: /repo/dist/pricing.js:10:8:::10:62:::318:372
		// Covers objective: placeholder:::/repo/dist/pricing.js:9:4:::11:5:::276:378
		// Covers objective: /repo/dist/pricing.js:8:0:::38:1:::216:929
		
		// Test
		const weightKg = -715.0564237381564;
		const zone = "amounts must be finite numbers";
		const isPremium = true;
		const anon = undefined;
		const anon1 = "year out of supported range";
		
		// Assertions
		await expect((async () => {
			await calculateShipping(weightKg, zone, isPremium, anon, anon1)
		})()).to.be.rejectedWith(`weight must be positive`)
	})

	it("Test 26 for 'pricing'", async () => {
		// Meta information
		// Selected for:
		// 	TypeError: weight must be a finite number
		// 	    at priceGrosz (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/instrumented/dist/pricing.js:858:11)
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
		// Covers objective: /repo/dist/pricing.js:35:8:::35:26:::862:880
		// Covers objective: placeholder:::/repo/dist/pricing.js:34:4:::36:5:::837:886
		// Covers objective: /repo/dist/pricing.js:32:8:::32:25:::809:826
		// Covers objective: placeholder:::/repo/dist/pricing.js:31:9:::33:5:::780:832
		// Covers objective: /repo/dist/pricing.js:29:8:::29:25:::747:764
		// Covers objective: /repo/dist/pricing.js:31:9:::33:5:::780:832
		// Covers objective: /repo/dist/pricing.js:26:8:::26:18:::697:707
		// Covers objective: /repo/dist/pricing.js:20:8:::20:18:::606:616
		// Covers objective: /repo/dist/pricing.js:22:9:::27:5:::632:713
		// Covers objective: /repo/dist/pricing.js:16:8:::16:59:::501:552
		// Covers objective: placeholder:::/repo/dist/pricing.js:15:4:::17:5:::471:558
		// Covers objective: /repo/dist/pricing.js:13:8:::13:56:::412:460
		// Covers objective: placeholder:::/repo/dist/pricing.js:12:4:::14:5:::383:466
		// Covers objective: /repo/dist/pricing.js:10:8:::10:62:::318:372
		// Covers objective: placeholder:::/repo/dist/pricing.js:9:4:::11:5:::276:378
		// Covers objective: /repo/dist/pricing.js:8:0:::38:1:::216:929
		
		// Test
		const weightKg = "weight above carrier limit";
		const zone = "invoice id must be a string";
		const isPremium = true;
		const anon = -464.92262453258684;
		
		// Assertions
		await expect((async () => {
			await calculateShipping(weightKg, zone, isPremium, anon)
		})()).to.be.rejectedWith(`weight must be a finite number`)
	})

	it("Test 27 for 'pricing'", async () => {
		// Meta information
		// Selected for:
		// 	TypeError: weight must be a finite number
		// 	    at removeReturnValue (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/instrumented/dist/pricing.js:858:11)
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
		// Covers objective: /repo/dist/pricing.js:35:8:::35:26:::862:880
		// Covers objective: placeholder:::/repo/dist/pricing.js:34:4:::36:5:::837:886
		// Covers objective: /repo/dist/pricing.js:32:8:::32:25:::809:826
		// Covers objective: placeholder:::/repo/dist/pricing.js:31:9:::33:5:::780:832
		// Covers objective: /repo/dist/pricing.js:29:8:::29:25:::747:764
		// Covers objective: /repo/dist/pricing.js:31:9:::33:5:::780:832
		// Covers objective: /repo/dist/pricing.js:26:8:::26:18:::697:707
		// Covers objective: /repo/dist/pricing.js:20:8:::20:18:::606:616
		// Covers objective: /repo/dist/pricing.js:22:9:::27:5:::632:713
		// Covers objective: /repo/dist/pricing.js:16:8:::16:59:::501:552
		// Covers objective: placeholder:::/repo/dist/pricing.js:15:4:::17:5:::471:558
		// Covers objective: /repo/dist/pricing.js:13:8:::13:56:::412:460
		// Covers objective: placeholder:::/repo/dist/pricing.js:12:4:::14:5:::383:466
		// Covers objective: /repo/dist/pricing.js:10:8:::10:62:::318:372
		// Covers objective: placeholder:::/repo/dist/pricing.js:9:4:::11:5:::276:378
		// Covers objective: /repo/dist/pricing.js:8:0:::38:1:::216:929
		
		// Test
		const arrayElement = 460;
		const arrayElement1 = () => {};
		const weightKg = [arrayElement, arrayElement1]
		const zone = "sku not in cart";
		const isPremium = false;
		
		// Assertions
		await expect((async () => {
			await calculateShipping(weightKg, zone, isPremium)
		})()).to.be.rejectedWith(`weight must be a finite number`)
	})

	it("Test 28 for 'pricing'", async () => {
		// Meta information
		// Selected for:
		// 	RangeError: weight above carrier limit
		// 	    at cart2 (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/instrumented/dist/pricing.js:886:11)
		// 	    at call (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/tests/tempTest.spec.js:26:36)
		// 	    at Generator._invoke (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/tests/tempTest.spec.js:2:1)
		// 	    at Generator.next (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/tests/tempTest.spec.js:2:1)
		// 	    at asyncGeneratorStep (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/tests/tempTest.spec.js:2:1)
		// 	    at _next (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/tests/tempTest.spec.js:2:1)
		// 
		// Covers objective: /repo/dist/pricing.js:35:8:::35:26:::862:880
		// Covers objective: placeholder:::/repo/dist/pricing.js:34:4:::36:5:::837:886
		// Covers objective: /repo/dist/pricing.js:32:8:::32:25:::809:826
		// Covers objective: placeholder:::/repo/dist/pricing.js:31:9:::33:5:::780:832
		// Covers objective: /repo/dist/pricing.js:29:8:::29:25:::747:764
		// Covers objective: /repo/dist/pricing.js:31:9:::33:5:::780:832
		// Covers objective: /repo/dist/pricing.js:26:8:::26:18:::697:707
		// Covers objective: /repo/dist/pricing.js:20:8:::20:18:::606:616
		// Covers objective: /repo/dist/pricing.js:22:9:::27:5:::632:713
		// Covers objective: /repo/dist/pricing.js:16:8:::16:59:::501:552
		// Covers objective: placeholder:::/repo/dist/pricing.js:15:4:::17:5:::471:558
		// Covers objective: /repo/dist/pricing.js:13:8:::13:56:::412:460
		// Covers objective: placeholder:::/repo/dist/pricing.js:12:4:::14:5:::383:466
		// Covers objective: /repo/dist/pricing.js:10:8:::10:62:::318:372
		// Covers objective: placeholder:::/repo/dist/pricing.js:9:4:::11:5:::276:378
		// Covers objective: /repo/dist/pricing.js:8:0:::38:1:::216:929
		
		// Test
		const weightKg = 2;
		const zone = "#6$?m}v5Hvmz&`Ti.:t/}txF?V\"d{\n9+wj[yH)&^5h;]Yg";
		const isPremium = false;
		const calculateShippingReturnValue = await calculateShipping(weightKg, zone, isPremium)
		const weightKg1 = 2;
		const zone1 = "price must be a non-negative integer of grosz";
		const isPremium1 = false;
		const calculateShippingReturnValue1 = await calculateShipping(weightKg1, zone1, isPremium1)
		const weightKg2 = 936;
		const zone2 = "cannotapply coupon to an empty cart";
		const isPremium2 = true;
		const anon = null;
		
		// Assertions
		expect(calculateShippingReturnValue).to.equal(79)
		expect(calculateShippingReturnValue1).to.equal(79)
		await expect((async () => {
			await calculateShipping(weightKg2, zone2, isPremium2, anon)
		})()).to.be.rejectedWith(`weight above carrier limit`)
	})

	it("Test 29 for 'pricing'", async () => {
		// Meta information
		// Selected for:
		// 	TypeError: weight must be a finite number
		// 	    at removeReturnValue1 (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/instrumented/dist/pricing.js:858:11)
		// 	    at call (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/tests/tempTest.spec.js:26:9)
		// 	    at Generator._invoke (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/tests/tempTest.spec.js:2:1)
		// 	    at Generator.next (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/tests/tempTest.spec.js:2:1)
		// 	    at asyncGeneratorStep (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/tests/tempTest.spec.js:2:1)
		// 	    at _next (.syntest/FID-1788937477797-cqwZHY1oKct4qgke4UvH2x/tests/tempTest.spec.js:2:1)
		// 
		// Covers objective: /repo/dist/pricing.js:35:8:::35:26:::862:880
		// Covers objective: placeholder:::/repo/dist/pricing.js:34:4:::36:5:::837:886
		// Covers objective: /repo/dist/pricing.js:32:8:::32:25:::809:826
		// Covers objective: placeholder:::/repo/dist/pricing.js:31:9:::33:5:::780:832
		// Covers objective: /repo/dist/pricing.js:29:8:::29:25:::747:764
		// Covers objective: /repo/dist/pricing.js:31:9:::33:5:::780:832
		// Covers objective: /repo/dist/pricing.js:26:8:::26:18:::697:707
		// Covers objective: /repo/dist/pricing.js:20:8:::20:18:::606:616
		// Covers objective: /repo/dist/pricing.js:22:9:::27:5:::632:713
		// Covers objective: /repo/dist/pricing.js:16:8:::16:59:::501:552
		// Covers objective: placeholder:::/repo/dist/pricing.js:15:4:::17:5:::471:558
		// Covers objective: /repo/dist/pricing.js:13:8:::13:56:::412:460
		// Covers objective: placeholder:::/repo/dist/pricing.js:12:4:::14:5:::383:466
		// Covers objective: /repo/dist/pricing.js:10:8:::10:62:::318:372
		// Covers objective: placeholder:::/repo/dist/pricing.js:9:4:::11:5:::276:378
		// Covers objective: /repo/dist/pricing.js:8:0:::38:1:::216:929
		
		// Test
		const weightKg = 2;
		const zone = "#6$?m}v5Hvmz&`Ti.:t/}txF?V\"d{\n9+wj[yH)&^5h;]Yg";
		const isPremium = true;
		const calculateShippingReturnValue = await calculateShipping(weightKg, zone, isPremium)
		const weightKg1 = 2;
		const zone1 = "#6$?m}v5Hvmz&`Ti.:t/}txF?V\"d{\n9+wj[yH)&^5h;]Yg";
		const isPremium1 = true;
		const anon = null;
		const isPremium2 = false;
		const calculateShippingReturnValue1 = await calculateShipping(weightKg1, zone1, isPremium1, anon, isPremium2)
		const zone2 = "\nrw WcINV±ax}8}KS1:g";
		const zone3 = "[±>%~cu*BVD@|&q{TRw:±*{xAL'l7 8?y";
		const isPremium3 = false;
		const anon1 = null;
		
		// Assertions
		expect(calculateShippingReturnValue).to.equal(63.2)
		expect(calculateShippingReturnValue1).to.equal(63.2)
		await expect((async () => {
			await calculateShipping(zone2, zone3, isPremium3, anon1)
		})()).to.be.rejectedWith(`weight must be a finite number`)
	})

	it("Test 30 for 'pricing'", async () => {
		// Meta information
		// Selected for objective: /repo/dist/pricing.js:23:8:::23:18:::661:671
		// Covers objective: /repo/dist/pricing.js:35:8:::35:26:::862:880
		// Covers objective: placeholder:::/repo/dist/pricing.js:34:4:::36:5:::837:886
		// Covers objective: /repo/dist/pricing.js:32:8:::32:25:::809:826
		// Covers objective: placeholder:::/repo/dist/pricing.js:31:9:::33:5:::780:832
		// Covers objective: /repo/dist/pricing.js:29:8:::29:25:::747:764
		// Covers objective: /repo/dist/pricing.js:31:9:::33:5:::780:832
		// Covers objective: /repo/dist/pricing.js:23:8:::23:18:::661:671
		// Covers objective: /repo/dist/pricing.js:26:8:::26:18:::697:707
		// Covers objective: /repo/dist/pricing.js:20:8:::20:18:::606:616
		// Covers objective: /repo/dist/pricing.js:22:9:::27:5:::632:713
		// Covers objective: /repo/dist/pricing.js:16:8:::16:59:::501:552
		// Covers objective: placeholder:::/repo/dist/pricing.js:15:4:::17:5:::471:558
		// Covers objective: /repo/dist/pricing.js:13:8:::13:56:::412:460
		// Covers objective: placeholder:::/repo/dist/pricing.js:12:4:::14:5:::383:466
		// Covers objective: /repo/dist/pricing.js:10:8:::10:62:::318:372
		// Covers objective: placeholder:::/repo/dist/pricing.js:9:4:::11:5:::276:378
		// Covers objective: /repo/dist/pricing.js:8:0:::38:1:::216:929
		
		// Test
		const weightKg = 79;
		const zone = "EU";
		const isPremium = false;
		const anon = 15;
		const calculateShippingReturnValue = await calculateShipping(weightKg, zone, isPremium, anon)
		const weightKg1 = 79;
		const zone1 = "Ct0pnZ";
		const isPremium1 = false;
		const calculateShippingReturnValue1 = await calculateShipping(weightKg1, zone1, isPremium1)
		const weightKg2 = 79;
		const zone2 = "@;8<~.C<POQ+V}.U f<bBU#LB@{@%~olmB$C)PxoJZrQ\\zmeE5'*GT'Q±~s%d_Mr6Yai>";
		const isPremium2 = false;
		const calculateShippingReturnValue2 = await calculateShipping(weightKg2, zone2, isPremium2)
		const anon1 = 15;
		const zone3 = ")%!}]@4A6LI`dec<s)[KBI}Wo/'Dhlv±-r'\"K-\"W<f>\nKl_V&SFaA<(Xv_c=Q-'4w%i1wLk-7{I'xtM";
		const isPremium3 = false;
		const calculateShippingReturnValue3 = await calculateShipping(anon1, zone3, isPremium3)
		
		// Assertions
		expect(calculateShippingReturnValue).to.equal(69)
		expect(calculateShippingReturnValue1).to.equal(119)
		expect(calculateShippingReturnValue2).to.equal(119)
		expect(calculateShippingReturnValue3).to.equal(94)
	})
})