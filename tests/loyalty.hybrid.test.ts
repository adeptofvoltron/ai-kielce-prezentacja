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

	it("negative orderValuePLN triggers RangeError even with a valid lifetimeSpendPLN", async () => {
		const orderValuePLN = -576;
		const lifetimeSpendPLN = 333.4674790543404;

		await expect((async () => {
			await awardPoints(orderValuePLN, lifetimeSpendPLN)
		})()).to.be.rejectedWith(`amounts must not be negative`)
	})

	it("banker's rounding: 29.99/10 rounds to 3, not the code's floor(2) (Sekcja 3: Punkty lojalnosciowe / Przelicznik)", async () => {
		const orderValuePLN = 29.99;
		const lifetimeSpendPLN = 2000;
		const awardPointsReturnValue = await awardPoints(orderValuePLN, lifetimeSpendPLN)
		const orderValuePLN1 = 584;
		const orderValuePLN2 = 29.99;
		const awardPointsReturnValue1 = await awardPoints(orderValuePLN1, orderValuePLN2)
		const orderValuePLN3 = 10.0001;
		const orderValuePLN4 = 29.99;
		const awardPointsReturnValue2 = await awardPoints(orderValuePLN3, orderValuePLN4)

		// DIV-LOY-1: 29.99/10 = 2.999 -> banker's rounding gives 3; code's Math.floor gives 2. Left failing.
		expect(awardPointsReturnValue).to.equal(3)
		expect(awardPointsReturnValue1).to.equal(58)
		expect(awardPointsReturnValue2).to.equal(1)
	})

	it("negative lifetimeSpendPLN triggers RangeError with a large orderValuePLN", async () => {
		const orderValuePLN = 30000;
		const lifetimeSpendPLN = -9;

		await expect((async () => {
			await awardPoints(orderValuePLN, lifetimeSpendPLN)
		})()).to.be.rejectedWith(`amounts must not be negative`)
	})

	it("exact multiple of 10 (1800) needs no rounding correction; non-finite string orderValuePLN triggers TypeError", async () => {
		const orderValuePLN = 1800;
		const lifetimeSpendPLN = 65;
		const awardPointsReturnValue = await awardPoints(orderValuePLN, lifetimeSpendPLN)
		const orderValuePLN1 = 1800;
		const lifetimeSpendPLN1 = 65;
		const awardPointsReturnValue1 = await awardPoints(orderValuePLN1, lifetimeSpendPLN1)
		const orderValuePLN2 = "FV/2026 /09/0042";
		const lifetimeSpendPLN2 = 65;

		expect(awardPointsReturnValue).to.equal(180)
		expect(awardPointsReturnValue1).to.equal(180)
		await expect((async () => {
			await awardPoints(orderValuePLN2, lifetimeSpendPLN2)
		})()).to.be.rejectedWith(`amounts must be finite numbers`)
	})

	it("exact multiple of 10 (100) needs no rounding correction; null/undefined args trigger TypeError", async () => {
		const orderValuePLN = 100;
		const lifetimeSpendPLN = 52;
		const awardPointsReturnValue = await awardPoints(orderValuePLN, lifetimeSpendPLN)
		const orderValuePLN1 = null;
		const lifetimeSpendPLN1 = undefined;

		expect(awardPointsReturnValue).to.equal(10)
		await expect((async () => {
			await awardPoints(orderValuePLN1, lifetimeSpendPLN1)
		})()).to.be.rejectedWith(`amounts must be finite numbers`)
	})

	it("banker's rounding under VIP multiplier: 217/10 rounds to 22, doubled to 44, not the code's floor-then-double 42 (Sekcja 3: Punkty lojalnosciowe / Przelicznik); negative lifetimeSpendPLN triggers RangeError", async () => {
		const orderValuePLN = 217;
		const lifetimeSpendPLN = 5000.01;
		const awardPointsReturnValue = await awardPoints(orderValuePLN, lifetimeSpendPLN)
		const lifetimeSpendPLN1 = 5000.01;
		const lifetimeSpendPLN2 = -947.3214338669724;

		// DIV-LOY-1: 217/10 = 21.7 -> banker's rounding gives 22 -> VIP doubles to 44;
		// code's Math.floor gives 21 -> doubled to 42. Left failing.
		expect(awardPointsReturnValue).to.equal(44)
		await expect((async () => {
			await awardPoints(lifetimeSpendPLN1, lifetimeSpendPLN2)
		})()).to.be.rejectedWith(`amounts must not be negative`)
	})

	it("malformed string lifetimeSpendPLN triggers TypeError", async () => {
		const orderValuePLN = 27;
		const lifetimeSpendPLN = "HD%[1Rl\n'3z[^R]dz<>5j]X`A>0F2'Vke%ui/eSH4t&=ar%xP±Jl1sVc<gjihfQc2,Eu[Ezj4bg ~l<cH:\t &&uZ4.%§I^n±4N*";

		await expect((async () => {
			await awardPoints(orderValuePLN, lifetimeSpendPLN)
		})()).to.be.rejectedWith(`amounts must be finite numbers`)
	})

	it("banker's rounding: 447/10 rounds to 45, not the code's floor(44) (Sekcja 3: Punkty lojalnosciowe / Przelicznik); negative orderValuePLN triggers RangeError", async () => {
		const orderValuePLN = 447;
		const lifetimeSpendPLN = 274;
		const awardPointsReturnValue = await awardPoints(orderValuePLN, lifetimeSpendPLN)
		const orderValuePLN1 = 2700;
		const lifetimeSpendPLN1 = -646.799514010976;

		// DIV-LOY-1: 447/10 = 44.7 -> banker's rounding gives 45; code's Math.floor gives 44. Left failing.
		expect(awardPointsReturnValue).to.equal(45)
		await expect((async () => {
			await awardPoints(orderValuePLN1, lifetimeSpendPLN1)
		})()).to.be.rejectedWith(`amounts must not be negative`)
	})

	it("non-finite lifetimeSpendPLN (plain object) triggers TypeError even though orderValuePLN is also invalid (finite check runs first)", async () => {
		const orderValuePLN = -930.8228607049024;
		const lifetimeSpendPLN = {}

		await expect((async () => {
			await awardPoints(orderValuePLN, lifetimeSpendPLN)
		})()).to.be.rejectedWith(`amounts must be finite numbers`)
	})

	it("near-multiples of 10 (554.69, 41.6) need no rounding correction; Cart.add rejects a non-integer priceGrosz", async () => {
		const orderValuePLN = 554.6915953798318;
		const lifetimeSpendPLN = 41.6;
		const awardPointsReturnValue = await awardPoints(orderValuePLN, lifetimeSpendPLN)
		const lifetimeSpendPLN1 = 41.6;
		const lifetimeSpendPLN2 = 41.6;
		const awardPointsReturnValue1 = await awardPoints(lifetimeSpendPLN1, lifetimeSpendPLN2)
		const anon2 = "FV2026090042";
		const anon3 = new Cart(anon2)
		const sku = () => {};
		const orderValuePLN1 = 554.6915953798318;
		const qty = 3;
		const anon4 = null;
		const anon5 = null;

		expect(awardPointsReturnValue).to.equal(55)
		expect(awardPointsReturnValue1).to.equal(4)
		await expect((async () => {
			await anon3.add(sku, orderValuePLN1, qty, anon4, anon5)
		})()).to.be.rejectedWith(`price must be a non-negative integer of grosz`)
	})

	it("negative orderValuePLN triggers RangeError regardless of a positive lifetimeSpendPLN", async () => {
		const orderValuePLN = -779.5644760656457;
		const lifetimeSpendPLN = 626.4817315750338;

		await expect((async () => {
			await awardPoints(orderValuePLN, lifetimeSpendPLN)
		})()).to.be.rejectedWith(`amounts must not be negative`)
	})

	it("non-numeric (array) orderValuePLN triggers TypeError", async () => {
		const arrayElement = 50;
		const arrayElement1 = undefined;
		const arrayElement2 = 23.2;
		const arrayElement3 = [arrayElement1, arrayElement2]
		const arrayElement4 = undefined;
		const arrayElement5 = -385.46346303594146;
		const arrayElement6 = [arrayElement4, arrayElement5]
		const arrayElement7 = "FV/2026/9/0042";
		const arrayElement8 = null;
		const orderValuePLN = [arrayElement, arrayElement3, arrayElement6, arrayElement7, arrayElement8]
		const lifetimeSpendPLN = 220;

		await expect((async () => {
			await awardPoints(orderValuePLN, lifetimeSpendPLN)
		})()).to.be.rejectedWith(`amounts must be finite numbers`)
	})

	it("lifetimeSpendPLN as a Cart instance (non-finite) triggers TypeError; finite check runs before the negativity check on orderValuePLN", async () => {
		const orderValuePLN = -41.11372416529059;
		const anon = false;
		const lifetimeSpendPLN = new Cart(anon)

		await expect((async () => {
			await awardPoints(orderValuePLN, lifetimeSpendPLN)
		})()).to.be.rejectedWith(`amounts must be finite numbers`)
	})

	it("negative orderValuePLN triggers RangeError with a large positive lifetimeSpendPLN", async () => {
		const orderValuePLN = -35;
		const lifetimeSpendPLN = 100;

		await expect((async () => {
			await awardPoints(orderValuePLN, lifetimeSpendPLN)
		})()).to.be.rejectedWith(`amounts must not be negative`)
	})

	it("cap applies after VIP doubling: 49980.09/10 rounds to 4998, doubled to 9996, capped at 5000 (Sekcja 3: Punkty lojalnosciowe / Limit); boolean lifetimeSpendPLN triggers TypeError", async () => {
		const orderValuePLN = 49980.09527164245;
		const lifetimeSpendPLN = 40000;
		const awardPointsReturnValue = await awardPoints(orderValuePLN, lifetimeSpendPLN)
		const orderValuePLN1 = 485.8335840188465;
		const lifetimeSpendPLN1 = false;

		expect(awardPointsReturnValue).to.equal(5000)
		await expect((async () => {
			await awardPoints(orderValuePLN1, lifetimeSpendPLN1)
		})()).to.be.rejectedWith(`amounts must be finite numbers`)
	})
})
