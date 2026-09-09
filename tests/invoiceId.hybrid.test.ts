// Imports
import { describe, it, beforeEach, vi } from 'vitest'
import chai from 'chai'
import chaiAsPromised from 'chai-as-promised'
const expect = chai.expect;
chai.use(chaiAsPromised);

describe('invoiceId', function() {
	let parseInvoiceId: any;
	beforeEach(async () => {
		vi.resetModules();
		({ parseInvoiceId } = await import("../src/invoiceId"));
	});

	it("month value outside 01-12 (13) is rejected as malformed, even though the digit count is correct", async () => {
		// Sekcja 2 / Format: MM musi byc dokladnie dwiema cyframi z zakresu 01-12.
		const raw = "FV/1999/13/0000";

		await expect((async () => {
			await parseInvoiceId(raw)
		})()).to.be.rejectedWith(`malformed invoice id`)
	})

	it("arbitrary string that does not match the FV/RRRR/MM/NNNN pattern is rejected as malformed", async () => {
		// Sekcja 2 / Format
		const raw = "Y;U=1RGePKms,YuVfGiPP\n/,`iq`Z2±lG\"D@6R\t]r+R±S}@jec$N'qz3N}c8;DbA";

		await expect((async () => {
			await parseInvoiceId(raw)
		})()).to.be.rejectedWith(`malformed invoice id`)
	})

	it("plain string unrelated to the invoice id format is rejected as malformed", async () => {
		// Sekcja 2 / Format
		const raw = "valueOf";

		await expect((async () => {
			await parseInvoiceId(raw)
		})()).to.be.rejectedWith(`malformed invoice id`)
	})

	it("leading whitespace is trimmed before parsing; an object with a trim() method is still not a string", async () => {
		// Sekcja 2 / Format: biale znaki na poczatku i koncu sa ignorowane.
		const raw = " FV/2026/09/0042";
		const parseInvoiceIdReturnValue = await parseInvoiceId(raw)
		const trim = () => {};
		const raw1 = {
			"trim": trim
		}

		expect(JSON.parse(JSON.stringify(parseInvoiceIdReturnValue))).to.deep.equal({"year":2026,"month":9,"seq":42})
		// Sekcja 2 / Walidacja: typeof raw !== "string" -> TypeError, nawet gdy obiekt ma metode trim().
		await expect((async () => {
			await parseInvoiceId(raw1)
		})()).to.be.rejectedWith(`invoice id must be a string`)
	})

	it("year just below the lower inclusive bound (2000) is rejected as out of range", async () => {
		// Sekcja 2 / Walidacja: rok poza zakresem 2000-2100.
		const raw = "FV/1999/12/0001";

		await expect((async () => {
			await parseInvoiceId(raw)
		})()).to.be.rejectedWith(`year out of supported range`)
	})

	it("an object exposing a trim() method is not a string and is rejected with TypeError", async () => {
		// Sekcja 2 / Walidacja: typeof raw !== "string" fires before any format check.
		const trim = () => {};
		const raw = {
			"trim": trim
		}

		await expect((async () => {
			await parseInvoiceId(raw)
		})()).to.be.rejectedWith(`invoice id must be a string`)
	})

	it("year below the lower bound (1999) is rejected as out of range (duplicate boundary case)", async () => {
		// Sekcja 2 / Walidacja: rok poza zakresem 2000-2100.
		const raw = "FV/1999/12/0001";

		await expect((async () => {
			await parseInvoiceId(raw)
		})()).to.be.rejectedWith(`year out of supported range`)
	})

	it("an object exposing a trim() method is not a string and is rejected with TypeError (duplicate)", async () => {
		// Sekcja 2 / Walidacja: typeof raw !== "string" fires before any format check.
		const trim = () => {};
		const raw = {
			"trim": trim
		}

		await expect((async () => {
			await parseInvoiceId(raw)
		})()).to.be.rejectedWith(`invoice id must be a string`)
	})

	it("an array is not a string and is rejected with TypeError", async () => {
		// Sekcja 2 / Walidacja: typeof [] === "object", nie "string".
		const arrayElement = {}
		const arrayElement1 = "weight must be positive";
		const raw = [arrayElement, arrayElement1]

		await expect((async () => {
			await parseInvoiceId(raw)
		})()).to.be.rejectedWith(`invoice id must be a string`)
	})

	it("an array is not a string and is rejected with TypeError (duplicate)", async () => {
		// Sekcja 2 / Walidacja: typeof [] === "object", nie "string".
		const arrayElement = {}
		const arrayElement1 = "weight must be positive";
		const raw = [arrayElement, arrayElement1]

		await expect((async () => {
			await parseInvoiceId(raw)
		})()).to.be.rejectedWith(`invoice id must be a string`)
	})

	it("whitespace immediately after the FV/ prefix (inside the identifier) is rejected as malformed", async () => {
		// Sekcja 2 / Format: biale znaki wewnatrz identyfikatora nie sa dozwolone
		// (tylko wiodace/koncowe biale znaki calego stringa sa ignorowane).
		const raw = "FV/ 2026/09/0042";

		await expect((async () => {
			await parseInvoiceId(raw)
		})()).to.be.rejectedWith(`malformed invoice id`)
	})

	it("sequence number exactly 0000 is rejected as zero even though it matches the format", async () => {
		// Sekcja 2 / Walidacja: numer kolejny rowny 0000 -> RangeError.
		const raw = "FV/2026/09/0000";

		await expect((async () => {
			await parseInvoiceId(raw)
		})()).to.be.rejectedWith(`sequence number must not be zero`)
	})
})
