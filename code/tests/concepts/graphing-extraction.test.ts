import { describe, expect, test } from "bun:test";
import { InvalidExtraction, validateExtraction } from "../../src/concepts/Graphing/graphing-extraction.ts";

const content = "At the seminar I met Mira. Her research focuses on ocean sensors.";
function extraction() {
  return {
    entities: [{ key: "p1", kind: "PERSON", label: "Mira" }, { key: "t1", kind: "TOPIC", label: "ocean sensors" }],
    claims: [{ from: "p1", relation: "RESEARCHES", to: "t1", quote: "Her research focuses on ocean sensors." }],
  };
}

describe("untrusted graph extraction", () => {
  test("accepts supported relationships and derives stable identities from labels rather than model keys", () => {
    const result = validateExtraction(extraction(), content);
    expect(result.claims).toHaveLength(1);
    const renamed = extraction();
    renamed.entities[0]!.key = "different-key";
    renamed.claims[0]!.from = "different-key";
    expect(validateExtraction(renamed, content)).toEqual(result);
  });

  test("rejects malformed graphs, unknown enums, bad references, duplicate keys, and fabricated labels or evidence", () => {
    const bad: unknown[] = [null, [], { entities: [], claims: [], owner: "forged" }];
    for (const change of [
      (graph: ReturnType<typeof extraction>) => { graph.entities[0]!.kind = "USER"; },
      (graph: ReturnType<typeof extraction>) => { graph.claims[0]!.relation = "EMPLOYS"; },
      (graph: ReturnType<typeof extraction>) => { graph.claims[0]!.from = "unknown"; },
      (graph: ReturnType<typeof extraction>) => { graph.entities[1]!.key = "p1"; },
      (graph: ReturnType<typeof extraction>) => { graph.entities[1]!.label = "robotics"; },
      (graph: ReturnType<typeof extraction>) => { graph.claims[0]!.quote = "Mira is hiring."; },
      (graph: ReturnType<typeof extraction>) => { graph.claims[0]!.to = "p1"; },
      (graph: ReturnType<typeof extraction>) => { graph.claims[0]!.relation = "MEMBER_OF"; },
    ]) { const graph = extraction(); change(graph); bad.push(graph); }
    for (const graph of bad) expect(() => validateExtraction(graph, content)).toThrow(InvalidExtraction);
  });

  test("refuses negated evidence and a quote cropped to hide the negation", () => {
    for (const quote of ["Mira does not research ocean sensors.", "research ocean sensors."]) {
      const graph = extraction();
      graph.claims[0]!.quote = quote;
      expect(() => validateExtraction(graph, "Mira does not research ocean sensors.")).toThrow(InvalidExtraction);
    }
  });

  test("allows explicit people while discarding unconnected labels", () => {
    const graph = extraction();
    graph.entities.push({ key: "p2", kind: "PERSON", label: "Leo" });
    expect(validateExtraction(graph, `${content} Leo was there.`).entities.map(e=>e.label)).toEqual(["Mira", "ocean sensors"]);
  });

});
