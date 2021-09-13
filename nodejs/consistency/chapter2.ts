import { loadInputs, saveOutputs } from "../utils";

type Vertice = string;
type Edge = string;
type Value = number;

type Cache = Record<
  Vertice, // Start
  Record<Vertice, Value> // End, Value
>;

const main = async () => {
  const readLine = loadInputs("consistency_chapter_2_validation_input");

  const T = Number(readLine());
  const outputs: string[] = [];

  for (let i = 0; i < T; i++) {
    const birthDayString = readLine()!;

    const K = Number(readLine());
    const edges: string[] = new Array(K).fill(undefined).map(() => readLine()!);

    const minSeconds = minNumberOfSeconds(birthDayString, edges);

    outputs.push(`Case #${i + 1}: ${minSeconds}`);
  }

  saveOutputs("consistency_chapter_2_validation_output", outputs);
};

main();

function minNumberOfSeconds(birthDayString: string, edges: Edge[]): number {
  if (new Set(birthDayString).size < 2) return 0; // Is already consistent

  const startVertices = birthDayString.split("");
  const stopVertices = new Set(edges.map((edge) => edge[1]!));
  const edgeValue = getEdgeValueFunction(edges);

  const stopVerticeValues: number[] = []; // Total of time (for each stopVertices) if the stopVertice is the destination of all startVertices

  stopVertices.forEach((stopVertice) => {
    const values: Value[] = [];

    for (const startVertice of startVertices) {
      const value = edgeValue(`${startVertice}${stopVertice}`);
      if (value === -1) return; // If any of the character can't be replaced by the destination character then destination character is not a solution
      values.push(value);
    }

    stopVerticeValues.push(sum(values));
  });

  return stopVerticeValues.length ? Math.min(...stopVerticeValues) : -1;
}

function getEdgeValueFunction(initialEdges: Edge[]): (edge: Edge) => Value {
  const cachedEdgeValues: Cache = {};

  initialEdges.forEach((edge) =>
    addEdgeValueToCache(edge, 1, cachedEdgeValues)
  );

  const edgeValue = (
    edge: Edge,
    alreadyBorrowed: Set<Vertice> = new Set()
  ): Value => {
    const start = edge[0];
    const stop = edge[1];

    // Self loop
    if (start === stop) return 0;

    // Check if there is no way from the start vertice
    if (!cachedEdgeValues[start] || alreadyBorrowed.has(start)) return -1;

    // Check if the edge is already cached
    if (cachedEdgeValues[start][stop] !== undefined)
      return cachedEdgeValues[start][stop];

    const nextVerticesInfo = Object.entries(cachedEdgeValues[start]);
    const subEdgeValues: Value[] = [];

    nextVerticesInfo.forEach(([nextVertice, nextVerticeValue]) => {
      if (nextVerticeValue === -1) return;

      const nextEdge = `${nextVertice}${stop}`;
      alreadyBorrowed.add(start);
      const nextEdgeValue = edgeValue(nextEdge, alreadyBorrowed);

      if (nextEdgeValue !== -1)
        subEdgeValues.push(nextEdgeValue + nextVerticeValue);
    });

    return subEdgeValues.length ? Math.min(...subEdgeValues) : -1;
  };

  // Return the actual edge value function wrapped by a caching function
  return (edge: Edge): Value => {
    const value = edgeValue(edge);
    addEdgeValueToCache(edge, value, cachedEdgeValues);
    return value;
  };
}

function addEdgeValueToCache(edge: Edge, value: Value, cache: Cache) {
  const start = edge[0];
  const stop = edge[1];

  if (!cache[start]) cache[start] = {};
  // if (cache[start][stop] !== value && value !== -1)
  //   console.log(`===> ${start}${stop} => ${value}`);
  cache[start][stop] = value;
}

function sum(array: number[]): number {
  return array.reduce((a, b) => a + b, 0);
}
