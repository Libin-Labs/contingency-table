export interface TableResult {
  readonly rows: readonly string[];
  readonly columns: readonly string[];
  readonly observed: readonly (readonly number[])[];
  readonly expected: readonly (readonly number[])[];
  readonly rowTotals: readonly number[];
  readonly columnTotals: readonly number[];
  readonly grandTotal: number;
}
export function contingencyTable(
  rowValues: readonly string[],
  columnValues: readonly string[],
): TableResult {
  if (
    !Array.isArray(rowValues) ||
    !Array.isArray(columnValues) ||
    rowValues.length < 1 ||
    rowValues.length !== columnValues.length ||
    rowValues.length > 1000000
  )
    throw new RangeError('Paired nonempty category arrays are required');
  if ([...rowValues, ...columnValues].some((v) => typeof v !== 'string' || v.length > 256))
    throw new TypeError('Categories must be bounded strings');
  const rows = [...new Set(rowValues)].sort(),
    columns = [...new Set(columnValues)].sort();
  if (rows.length * columns.length > 1000000) throw new RangeError('Table size exceeds budget');
  const ri = new Map(rows.map((v, i) => [v, i])),
    ci = new Map(columns.map((v, i) => [v, i])),
    observed = rows.map(() => columns.map(() => 0)),
    rowTotals = rows.map(() => 0),
    columnTotals = columns.map(() => 0);
  for (let i = 0; i < rowValues.length; i++) {
    const r = ri.get(rowValues[i]!)!,
      c = ci.get(columnValues[i]!)!;
    observed[r]![c] = observed[r]![c]! + 1;
    rowTotals[r] = rowTotals[r]! + 1;
    columnTotals[c] = columnTotals[c]! + 1;
  }
  const grandTotal = rowValues.length,
    expected = rows.map((_, r) =>
      columns.map((__, c) => (rowTotals[r]! * columnTotals[c]!) / grandTotal),
    );
  return { rows, columns, observed, expected, rowTotals, columnTotals, grandTotal };
}
