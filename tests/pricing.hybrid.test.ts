// Imports
import { describe, it, beforeEach, vi } from 'vitest'
import chai from 'chai'
import chaiAsPromised from 'chai-as-promised'
const expect = chai.expect;
chai.use(chaiAsPromised);

describe('pricing', function() {
	let calculateShipping: any;
	let Cart: any;
	beforeEach(async () => {
		vi.resetModules();
		({ calculateShipping } = await import("../src/pricing"));
		({ Cart } = await import("../src/cart"));
	});

	it("non-finite weight (string) throws TypeError before zone/premium are inspected", async () => {
		// SPEC.md sekcja 1: walidacja wejscia, warunek 1 (weightKg nie jest liczba skonczona)
		const weightKg = "PLN";
		const zone = "_u,%3pJ|'w@2<lOt?C^5}}XC:p+RFtp+~w&~ltp/[;8H~jfMLlur)32du6nNwg";
		const isPremium = true;

		await expect((async () => {
			await calculateShipping(weightKg, zone, isPremium)
		})()).to.be.rejectedWith(`weight must be a finite number`)
	})

	it("weight above the 100kg carrier limit throws RangeError", async () => {
		// SPEC.md sekcja 1: walidacja wejscia, warunek 3 (weightKg > 100)
		const weightKg = 6997;
		const zone = "X<2\\S~zi\\%ujRoH]906ae_L*/dl~ABt\"t-=842B5|`!=_)m\"=<7jil_s#f[T&N4G-'v-g)tAao4sQSv§+";
		const isPremium = false;

		await expect((async () => {
			await calculateShipping(weightKg, zone, isPremium)
		})()).to.be.rejectedWith(`weight above carrier limit`)
	})

	it("unrecognized zone falls back to default 79 PLN rate, +15 surcharge (>10kg), then premium discount; weight above limit still rejected", async () => {
		// SPEC.md sekcja 1: stawka bazowa (inna wartosc -> 79), doplata wagowa (>10kg -> +15), rabat premium (*0.8)
		// (79 + 15) * 0.8 = 75.2
		const weightKg = 11;
		const zone = "1C[EgrcJl±Ok>L]-3,t&sw;";
		const isPremium = true;
		const calculateShippingReturnValue = await calculateShipping(weightKg, zone, isPremium)
		const weightKg1 = 6997;
		const zone1 = "2J3U±)Mmi|3{HBD/in)ix=|B<J§";
		const isPremium1 = true;

		expect(calculateShippingReturnValue).to.equal(75.2)
		await expect((async () => {
			await calculateShipping(weightKg1, zone1, isPremium1)
		})()).to.be.rejectedWith(`weight above carrier limit`)
	})

	it("default zone with >10kg surcharge and premium discount; passing the boolean isPremium flag itself as weight is non-finite", async () => {
		// SPEC.md sekcja 1: (79 + 15) * 0.8 = 75.2
		const weightKg = 12;
		const zone = " HALF";
		const isPremium = true;
		const calculateShippingReturnValue = await calculateShipping(weightKg, zone, isPremium)
		const isPremium1 = true;
		const zone1 = "Q§UnC.§!:XtX7Tnh:8h,}vWZ+\\g7V:C[L9ql:ui\n:.{{%v\nC((±±g";
		const isPremium2 = true;

		expect(calculateShippingReturnValue).to.equal(75.2)
		// weightKg argument here is `isPremium1` (a boolean) - Number.isFinite(true) === false
		await expect((async () => {
			await calculateShipping(isPremium1, zone1, isPremium2)
		})()).to.be.rejectedWith(`weight must be a finite number`)
	})

	it("negative weight is rejected as non-positive regardless of zone/premium (superfluous 4th arg trimmed)", async () => {
		// SPEC.md sekcja 1: walidacja wejscia, warunek 2 (weightKg <= 0)
		const weightKg = -539;
		const zone = "L\"8cL1zIHr;oH'W}BJF$ks,MJ`\\UOp75f-VU^\\InRTejBEtPQ\\\n6Q1UO^s]hi| Y2| k±Dg\"\"TlY";
		const isPremium = "sku not in cart";

		await expect((async () => {
			await calculateShipping(weightKg, zone, isPremium)
		})()).to.be.rejectedWith(`weight must be positive`)
	})

	it("weight <=10kg has no surcharge in default zone; non-boolean truthy isPremium value still triggers the premium discount", async () => {
		// SPEC.md sekcja 1: doplata wagowa (do 10 kg wlacznie -> brak), stawka bazowa (inna wartosc -> 79)
		// Second call passes isPremium1 = 26 (not strictly `true`, but truthy): code applies the
		// discount via `if (isPremium)`. isPremium is documented as never validated, so this
		// out-of-type-domain truthy value is not a spec violation, just an untyped-JS edge case.
		const weightKg = 9;
		const zone = "half";
		const isPremium = false;
		const calculateShippingReturnValue = await calculateShipping(weightKg, zone, isPremium)
		const weightKg1 = 9;
		const zone1 = "FV/2026/009/0042";
		const isPremium1 = 26;
		const calculateShippingReturnValue1 = await calculateShipping(weightKg1, zone1, isPremium1)

		expect(calculateShippingReturnValue).to.equal(79)
		expect(calculateShippingReturnValue1).to.equal(63.2)
	})

	it("default zone with >10kg surcharge and premium discount; default zone with >30kg surcharge and premium discount (superfluous args trimmed)", async () => {
		// SPEC.md sekcja 1: (79 + 15) * 0.8 = 75.2 ; (79 + 40) * 0.8 = 95.2
		const weightKg = 12;
		const zone = "$V!g}J+S~vP{W>OI:A";
		const isPremium = true;
		const calculateShippingReturnValue = await calculateShipping(weightKg, zone, isPremium)
		const weightKg1 = 75;
		const zone1 = "RXY/cair'§g[cV:x~}rZ-Cp?rVh6X6!NksY'R±bi!\ti§%§$\\7xRedx";
		const isPremium1 = true;
		const calculateShippingReturnValue1 = await calculateShipping(weightKg1, zone1, isPremium1)

		expect(calculateShippingReturnValue).to.equal(75.2)
		expect(calculateShippingReturnValue1).to.equal(95.2)
	})

	it("weight exactly zero is rejected as non-positive", async () => {
		// SPEC.md sekcja 1: walidacja wejscia, warunek 2 (weightKg <= 0)
		const weightKg = 0;
		const zone = "Fv/2026/09/0042";
		const isPremium = true;

		await expect((async () => {
			await calculateShipping(weightKg, zone, isPremium)
		})()).to.be.rejectedWith(`weight must be positive`)
	})

	it("weight far above carrier limit throws RangeError (superfluous cart arg trimmed)", async () => {
		// SPEC.md sekcja 1: walidacja wejscia, warunek 3 (weightKg > 100)
		const weightKg = 49990;
		const zone = "@M&])%`|sbdEUgq9.y<~}fL& J##q53b-q#wL:GPW[#[W\n;#tnDleCn9K:8RiKn[Rc&bnW";
		const isPremium = false;

		await expect((async () => {
			await calculateShipping(weightKg, zone, isPremium)
		})()).to.be.rejectedWith(`weight above carrier limit`)
	})

	it("negative weight rejected before other args are considered (superfluous args trimmed)", async () => {
		// SPEC.md sekcja 1: walidacja wejscia, warunek 2 (weightKg <= 0)
		const weightKg = -797;
		const zone = null;
		const isPremium = false;

		await expect((async () => {
			await calculateShipping(weightKg, zone, isPremium)
		})()).to.be.rejectedWith(`weight must be positive`)
	})

	it("non-string zone value falls through to the default rate; negative weight is rejected", async () => {
		// SPEC.md sekcja 1: stawka bazowa (inna wartosc niz "PL"/"EU" -> 79), doplata brak (<=10kg)
		// (79) * 0.8 = 63.2
		const weightKg = 3.141592653589793;
		const zone = 984.1984289538609;
		const isPremium = true;
		const calculateShippingReturnValue = await calculateShipping(weightKg, zone, isPremium)
		const weightKg1 = -709;
		const zone1 = "SoR$e){6z_8:E1'x~wh lZav§K!|";
		const isPremium1 = true;

		expect(calculateShippingReturnValue).to.equal(63.2)
		await expect((async () => {
			await calculateShipping(weightKg1, zone1, isPremium1)
		})()).to.be.rejectedWith(`weight must be positive`)
	})

	it("PL zone with >30kg surcharge and premium discount; default zone with >30kg surcharge and premium discount (superfluous arg trimmed)", async () => {
		// SPEC.md sekcja 1: (12 + 40) * 0.8 = 41.6 ; (79 + 40) * 0.8 = 95.2
		const weightKg = 99;
		const zone = "PL";
		const isPremium = true;
		const calculateShippingReturnValue = await calculateShipping(weightKg, zone, isPremium)
		const weightKg1 = 43.92232965517701;
		const zone1 = "b(|u%f=HR]P.R<rsj5FsTd@Uho' \"#eg0_#1Yg*R!RL2PPFya\">@";
		const isPremium1 = true;
		const calculateShippingReturnValue1 = await calculateShipping(weightKg1, zone1, isPremium1)

		expect(calculateShippingReturnValue).to.equal(41.6)
		expect(calculateShippingReturnValue1).to.equal(95.2)
	})

	it("weight exactly 30kg still lands in the +15 surcharge bracket, not +40 (threshold is strictly '>30'); negative weight rejected", async () => {
		// SPEC.md sekcja 1: doplata wagowa (powyzej 30kg -> +40; powyzej 10 do 30 wlacznie -> +15)
		// (79 + 15) * 0.8 = 95.2 (superfluous arg trimmed on the second call)
		const weightKg = 31;
		const zone = "half";
		const isPremium = true;
		const calculateShippingReturnValue = await calculateShipping(weightKg, zone, isPremium)
		const weightKg1 = 31;
		const zone1 = "#<KZ2hbUuAic%}z1|Q;O-";
		const isPremium1 = true;
		const calculateShippingReturnValue1 = await calculateShipping(weightKg1, zone1, isPremium1)
		const weightKg2 = -590;
		const zone2 = "SAVE10";
		const isPremium2 = true;

		expect(calculateShippingReturnValue).to.equal(95.2)
		expect(calculateShippingReturnValue1).to.equal(95.2)
		await expect((async () => {
			await calculateShipping(weightKg2, zone2, isPremium2)
		})()).to.be.rejectedWith(`weight must be positive`)
	})

	it("array value for weight is non-finite and throws TypeError", async () => {
		// SPEC.md sekcja 1: walidacja wejscia, warunek 1 (weightKg nie jest liczba skonczona)
		const arrayElement = new Cart(undefined, "%U]3O,]N@]\")o]§>';3'7]ULTO\nlAuP#r2-\"5r4L§uU387Zoj[]yQ}fg66CSOpr!QJ{jwop\nD")
		const arrayElement1 = "FV/2026/00/0001";
		const arrayElement2 = 1800;
		const weightKg = [arrayElement, arrayElement1, arrayElement2]
		const zone = "R[[PCS\"$.M[ee_K=e^E±lILyOsczz&;Lv|K'{2U8QKP22*AqT}y2l}";
		const isPremium = false;

		await expect((async () => {
			await calculateShipping(weightKg, zone, isPremium)
		})()).to.be.rejectedWith(`weight must be a finite number`)
	})

	it("leading-space zone code falls through to the default rate (no trim exists); negative weight rejected", async () => {
		// SPEC.md sekcja 1: stawka bazowa (dopasowanie dokladne, " HGALF" != "PL"/"EU" -> 79)
		// (79 + 15) * 0.8 = 75.2
		const weightKg = 12;
		const zone = " HGALF";
		const isPremium = true;
		const calculateShippingReturnValue = await calculateShipping(weightKg, zone, isPremium)
		const weightKg1 = -539;
		const zone1 = "L\"8cL1zIHr;oH'W}BJF$ks,MJ`\\UOp75f-VU^\\InRTejBEtPQ\\\n6Q1UO^s]hi| Y2| k±Dg\"\"TlY";
		const isPremium1 = "sku not in cart";

		expect(calculateShippingReturnValue).to.equal(75.2)
		await expect((async () => {
			await calculateShipping(weightKg1, zone1, isPremium1)
		})()).to.be.rejectedWith(`weight must be positive`)
	})

	it("weight above carrier limit rejected even with a null zone (superfluous args trimmed)", async () => {
		// SPEC.md sekcja 1: walidacja wejscia, warunek 3 (weightKg > 100)
		const weightKg = 545;
		const zone = null;
		const isPremium = false;

		await expect((async () => {
			await calculateShipping(weightKg, zone, isPremium)
		})()).to.be.rejectedWith(`weight above carrier limit`)
	})

	it("weight exactly 10kg has no surcharge (boundary inclusive on the low side); function value for weight throws TypeError", async () => {
		// SPEC.md sekcja 1: doplata wagowa (do 10 kg wlacznie -> brak); (79) * 0.8 = 63.2
		const weightKg = 10;
		const zone = ")sBe([t5A>UN'{;oTuv(f]/B'f|rU%Kfu}5nq' tK'ah}&mD2O}B=/O/W`wqor6:},RdcJ7LM\t*ufN*[&3)wVw";
		const isPremium = true;
		const calculateShippingReturnValue = await calculateShipping(weightKg, zone, isPremium)
		const weightKg1 = () => {};
		const zone1 = "FV/2026/09/0x42";
		const isPremium1 = false;

		expect(calculateShippingReturnValue).to.equal(63.2)
		await expect((async () => {
			await calculateShipping(weightKg1, zone1, isPremium1)
		})()).to.be.rejectedWith(`weight must be a finite number`)
	})

	it("zone with both leading and trailing spaces falls through to the default rate (no trim); weight above carrier limit still rejected", async () => {
		// SPEC.md sekcja 1: stawka bazowa (dopasowanie dokladne, " PL " != "PL" -> 79)
		// (79) * 0.8 = 63.2 for weights <= 10kg
		const weightKg = 7;
		const zone = " PL ";
		const isPremium = true;
		const calculateShippingReturnValue = await calculateShipping(weightKg, zone, isPremium)
		const weightKg1 = 4;
		const zone1 = "Xf3@:\"!68Aq?=:~P";
		const isPremium1 = true;
		const calculateShippingReturnValue1 = await calculateShipping(weightKg1, zone1, isPremium1)
		const weightKg2 = 49986;
		const zone2 = "FV/2026/09 /0042";
		const isPremium2 = false;

		expect(calculateShippingReturnValue).to.equal(63.2)
		expect(calculateShippingReturnValue1).to.equal(63.2)
		await expect((async () => {
			await calculateShipping(weightKg2, zone2, isPremium2)
		})()).to.be.rejectedWith(`weight above carrier limit`)
	})

	it("default zone, no premium, no surcharge yields a flat 79 rate; negative weight rejected (superfluous args trimmed)", async () => {
		// SPEC.md sekcja 1: stawka bazowa (inna wartosc -> 79), brak rabatu premium
		const weightKg = 4;
		const zone = "SAVE100";
		const isPremium = false;
		const calculateShippingReturnValue = await calculateShipping(weightKg, zone, isPremium)
		const weightKg1 = -797;
		const zone1 = null;
		const isPremium1 = false;

		expect(calculateShippingReturnValue).to.equal(79)
		await expect((async () => {
			await calculateShipping(weightKg1, zone1, isPremium1)
		})()).to.be.rejectedWith(`weight must be positive`)
	})

	it("premium discount applied to default zone with no surcharge; weight above carrier limit rejected (superfluous args trimmed)", async () => {
		// SPEC.md sekcja 1: (79) * 0.8 = 63.2
		const weightKg = 4;
		const zone = "SAVE100";
		const isPremium = true;
		const calculateShippingReturnValue = await calculateShipping(weightKg, zone, isPremium)
		const weightKg1 = 591;
		const zone1 = "fv/1999/13/0000";
		const isPremium1 = true;

		expect(calculateShippingReturnValue).to.equal(63.2)
		await expect((async () => {
			await calculateShipping(weightKg1, zone1, isPremium1)
		})()).to.be.rejectedWith(`weight above carrier limit`)
	})

	it("default zone with >30kg surcharge and premium discount; function value for weight throws TypeError (superfluous arg trimmed)", async () => {
		// SPEC.md sekcja 1: (79 + 40) * 0.8 = 95.2
		const weightKg = 4;
		const zone = "FV/2026/01/0001";
		const isPremium = true;
		const calculateShippingReturnValue = await calculateShipping(weightKg, zone, isPremium)
		const weightKg1 = 46;
		const zone1 = "FV/2000/01/0000";
		const isPremium1 = true;
		const calculateShippingReturnValue1 = await calculateShipping(weightKg1, zone1, isPremium1)
		const weightKg2 = () => {};
		const zone2 = "pPTQj<1>i;)@";
		const isPremium2 = true;

		expect(calculateShippingReturnValue).to.equal(63.2)
		expect(calculateShippingReturnValue1).to.equal(95.2)
		await expect((async () => {
			await calculateShipping(weightKg2, zone2, isPremium2)
		})()).to.be.rejectedWith(`weight must be a finite number`)
	})

	it("default zone, low weight, premium discount, no surcharge (unrelated Cart quantity validation left untouched)", async () => {
		// SPEC.md sekcja 1: (79) * 0.8 = 63.2
		const weightKg = 4;
		const zone = "\t";
		const isPremium = true;
		const calculateShippingReturnValue = await calculateShipping(weightKg, zone, isPremium)
		const anon1 = new Cart()
		const isPremium1 = true;
		const sku = [isPremium1]
		const priceGrosz = 9;
		const qty = 1803.060280404008;
		const anon2 = " ";

		expect(calculateShippingReturnValue).to.equal(63.2)
		await expect((async () => {
			await anon1.add(sku, priceGrosz, qty, anon2)
		})()).to.be.rejectedWith(`quantity must be a positive integer`)
	})

	it("weight exactly 30.0001kg crosses into the +40 surcharge bracket, not stacked with +15 (unrelated Cart quantity validation left untouched)", async () => {
		// SPEC.md sekcja 1: doplata wagowa (powyzej 30kg -> +40, nie sumuje sie z +15)
		// (79 + 40) * 0.8 = 95.2
		const weightKg = 30.0001;
		const zone = "x7fNM-2d}%4eTs}j|)b48DvsS#Ps";
		const isPremium = true;
		const calculateShippingReturnValue = await calculateShipping(weightKg, zone, isPremium)
		const anon2 = new Cart()
		const sku = {}
		const qty = -775;
		const anon3 = 30;
		const weightKg1 = 30.0001;

		expect(calculateShippingReturnValue).to.equal(95.2)
		await expect((async () => {
			await anon2.remove(sku, qty, anon3, weightKg1)
		})()).to.be.rejectedWith(`quantity must be a positive integer`)
	})

	it("default zone, low weight, premium discount, no surcharge (unrelated Cart price validation left untouched)", async () => {
		// SPEC.md sekcja 1: (79) * 0.8 = 63.2
		const weightKg = 4;
		const zone = "a";
		const isPremium = true;
		const calculateShippingReturnValue = await calculateShipping(weightKg, zone, isPremium)
		const anon1 = new Cart()
		const isPremium1 = true;
		const sku = [isPremium1]
		const priceGrosz = 10.654166514303524;
		const qty = 1800;
		const anon2 = " ";

		expect(calculateShippingReturnValue).to.equal(63.2)
		await expect((async () => {
			await anon1.add(sku, priceGrosz, qty, anon2)
		})()).to.be.rejectedWith(`price must be a non-negative integer of grosz`)
	})

	it("weight above carrier limit rejected (superfluous arg trimmed)", async () => {
		// SPEC.md sekcja 1: walidacja wejscia, warunek 3 (weightKg > 100)
		const weightKg = 846;
		const zone = "@%C@Z_G,!XF&~)>G/ggolR4[RK\"VA8 MgpYFjmN";
		const isPremium = true;

		await expect((async () => {
			await calculateShipping(weightKg, zone, isPremium)
		})()).to.be.rejectedWith(`weight above carrier limit`)
	})

	it("default zone, no premium, no surcharge; non-boolean truthy isPremium (Cart instance) still triggers the premium discount (unrelated Cart 'sku not in cart' check left untouched)", async () => {
		// SPEC.md sekcja 1: (79) rate unchanged; second call's isPremium is a truthy Cart instance,
		// not a strict `true`, but isPremium is documented as never validated - `if (isPremium)`
		// coerces any truthy value, so (79) * 0.8 = 63.2 is still the correct expectation.
		const weightKg = 6;
		const zone = "s`5%tQ:;L5Rr$4\nPuOFVJGCx\\K)>@}t}Q2P±§Hj/oJ[r&oY+Er`G?^HvwwG3\nC3KWA'a*.eO|$s'Ag*lM9eLy";
		const isPremium = false;
		const arrayElement = 45;
		const arrayElement1 = 2700;
		const anon = [arrayElement, arrayElement1]
		const calculateShippingReturnValue = await calculateShipping(weightKg, zone, isPremium, anon)
		const weightKg1 = 6;
		const zone1 = "K\t7yu\"§@dY§]<[(5b\nVqCe=lP-.:^8N%[(M§+h_RcO _NA±hK4y:iV>CJ T6@4Xd}(yy,VP` '^t$|\\H§tX=";
		const anon1 = 476.7431371433238;
		const isPremium1 = new Cart(anon1)
		const calculateShippingReturnValue1 = await calculateShipping(weightKg1, zone1, isPremium1)
		const anon2 = 476.7431371433238;
		const isPremium2 = new Cart(anon2)
		const sku = () => {};
		const qty = 9007199254740991;

		expect(calculateShippingReturnValue).to.equal(79)
		expect(calculateShippingReturnValue1).to.equal(63.2)
		await expect((async () => {
			await isPremium2.remove(sku, qty)
		})()).to.be.rejectedWith(`sku not in cart`)
	})

	it("non-boolean truthy isPremium (Cart instance) triggers premium discount; premium discount on default zone with no surcharge (unrelated Cart coupon validation left untouched)", async () => {
		// SPEC.md sekcja 1: isPremium never validated, `if (isPremium)` coerces truthy values;
		// (79) * 0.8 = 63.2 in both calls
		const weightKg = 7;
		const zone = "FX/2026/09/0042";
		const anon = false;
		const anon1 = true;
		const isPremium = new Cart(anon, anon1)
		const calculateShippingReturnValue = await calculateShipping(weightKg, zone, isPremium)
		const weightKg1 = 7;
		const zone1 = "SKU-2";
		const isPremium1 = true;
		const calculateShippingReturnValue1 = await calculateShipping(weightKg1, zone1, isPremium1)
		const anon3 = false;
		const anon4 = true;
		const isPremium2 = new Cart(anon3, anon4)
		const anon5 = 1796;

		expect(calculateShippingReturnValue).to.equal(63.2)
		expect(calculateShippingReturnValue1).to.equal(63.2)
		await expect((async () => {
			await isPremium2.applyCoupon(anon5)
		})()).to.be.rejectedWith(`unknown coupon`)
	})

	it("boolean false for weight is non-finite and throws TypeError (superfluous args trimmed)", async () => {
		// SPEC.md sekcja 1: walidacja wejscia, warunek 1 (weightKg nie jest liczba skonczona)
		const weightKg = false;
		const zone = "__proto__";
		const isPremium = false;

		await expect((async () => {
			await calculateShipping(weightKg, zone, isPremium)
		})()).to.be.rejectedWith(`weight must be a finite number`)
	})

	it("weight far above carrier limit rejected (deeply nested superfluous cart args trimmed)", async () => {
		// SPEC.md sekcja 1: walidacja wejscia, warunek 3 (weightKg > 100)
		const weightKg = 49980;
		const zone = "HALF ";
		const isPremium = false;

		await expect((async () => {
			await calculateShipping(weightKg, zone, isPremium)
		})()).to.be.rejectedWith(`weight above carrier limit`)
	})

	it("negative fractional weight rejected as non-positive (superfluous arg trimmed)", async () => {
		// SPEC.md sekcja 1: walidacja wejscia, warunek 2 (weightKg <= 0)
		const weightKg = -900.1094736020037;
		const zone = "SKU-2";
		const isPremium = false;

		await expect((async () => {
			await calculateShipping(weightKg, zone, isPremium)
		})()).to.be.rejectedWith(`weight must be positive`)
	})

	it("default zone (near-EU typo) with no surcharge and no premium; EU zone with premium discount and no surcharge (superfluous arg trimmed)", async () => {
		// SPEC.md sekcja 1: "DU" != "EU" -> stawka 79, brak rabatu; EU zone: (29) * 0.8 = 23.2
		const weightKg = 8.917602143108196;
		const zone = "DU";
		const isPremium = false;
		const calculateShippingReturnValue = await calculateShipping(weightKg, zone, isPremium)
		const weightKg1 = 4;
		const zone1 = "EU";
		const isPremium1 = true;
		const calculateShippingReturnValue1 = await calculateShipping(weightKg1, zone1, isPremium1)

		expect(calculateShippingReturnValue).to.equal(79)
		expect(calculateShippingReturnValue1).to.equal(23.2)
	})
})
