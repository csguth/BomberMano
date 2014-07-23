jest.autoMockOff();
var Mapa = require("../modelo/mapa");

describe("Um mapa quadrado", function () {
	it("com tamanho 1", function () {
		expect(new Mapa(1).contarCelulas()).toBe(1);
	});

	it("com tamanho 2", function () {
		expect(new Mapa(2).contarCelulas()).toBe(4);
	});
});
