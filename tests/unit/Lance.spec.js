/* eslint-disable quotes */
/* eslint-disable semi */

import Lance from "@/components/Lance";
import { mount } from "@vue/test-utils";

describe("Um lance sem valor mínimo", () => {
  test("não aceita lance com valor menor do que zero", () => {
    const wrapper = mount(Lance);
    const input = wrapper.find("input");
    input.setValue(-100);
    const lancesEmitidos = wrapper.emitted("novo-lance");
    wrapper.trigger("submit");
    expect(lancesEmitidos).toBeUndefined();
  });

  test("emite um lance quando o valor é maior do que zero", () => {
    const wrapper = mount(Lance);
    const input = wrapper.find("input");
    input.setValue(100);
    wrapper.trigger("submit");
    const lancesEmitidos = wrapper.emitted("novo-lance");
    expect(lancesEmitidos).toHaveLength(1);
  });

  test("emite o valor esperado de um lance válido", () => {
    const wrapper = mount(Lance);
    const input = wrapper.find("input");
    input.setValue(100);
    wrapper.trigger("submit");
    const lancesEmitidos = wrapper.emitted("novo-lance");
    const lance = parseInt(lancesEmitidos[0][0]);
    expect(lance).toBe(100);
  });
});

describe("Um lance com valor mínimo", () => {
  test("todos os lances devem possuir um valor maior do que o mínimo informado", () => {
    const wrapper = mount(Lance, {
      propsData: {
        lanceMinimo: 300
      }
    });
    const input = wrapper.find("input");
    input.setValue(400);
    wrapper.trigger("submit");
    const lancesEmitidos = wrapper.emitted("novo-lance");
    expect(lancesEmitidos).toHaveLength(1);
  });
});
