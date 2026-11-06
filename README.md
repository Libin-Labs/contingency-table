# @lp-labs/contingency-table

Observed and expected cell counts for two categorical variables under independence.

Original, standalone MIT TypeScript implementation with **zero runtime or peer dependencies**. ESM/CommonJS exports and separate declarations; Node18+ and compatible ES2022 browsers. No service, filesystem, network, clock or browser globals accessed on import. Compiler/formatter dependencies are development-only.

## Install

```sh
npm install @lp-labs/contingency-table
```

## Working example

```js
import { contingencyTable } from '@lp-labs/contingency-table';
const table = contingencyTable(['yes', 'yes', 'no'], ['A', 'B', 'A']);
if (table.grandTotal !== 3 || table.expected[0]?.[0] !== 2 / 3) throw new Error('Table mismatch');
```

CommonJS: `const api = require('@lp-labs/contingency-table')`.

## Behavior, customization and limits

Builds sorted row/column categories, observed counts, marginal totals and independence-expected counts. It does not compute significance tests, merge sparse categories, or make causal claims.

Use the explicit function arguments and public types below to customize the documented behavior. There are no hidden environment settings or sibling-library requirements. Array inputs must be dense; sparse entries are invalid. Inputs are validated before a successful result is returned. Outputs do not mutate caller-owned inputs. Hostile proxies/getters and concurrent mutation are outside the contract.

## Errors and integration

Invalid data never produces an empty success-shaped substitute. TypeError reports incompatible runtime types/nonfinite numbers; RangeError reports unsupported ranges, invalid syntax, inconsistent states and exceeded budgets. Functions that explicitly return null, false or empty arrays describe those legitimate outcomes above. Errors propagate to callers; UI applications should catch at their boundary and visibly notify users. Numerical calculations use JavaScript IEEE754 unless the API explicitly uses bigint; compare approximate numerical results with application-appropriate tolerances.

## Complete public API

```ts
export interface TableResult {
  readonly rows: readonly string[];
  readonly columns: readonly string[];
  readonly observed: readonly (readonly number[])[];
  readonly expected: readonly (readonly number[])[];
  readonly rowTotals: readonly number[];
  readonly columnTotals: readonly number[];
  readonly grandTotal: number;
}
export declare function contingencyTable(
  rowValues: readonly string[],
  columnValues: readonly string[],
): TableResult;
```

## Performance and portability

Complexity and resource ceilings are specified above. Buffered synchronous algorithms do not create workers or timers; callers can move expensive work to their own worker. Limits are enforced, not silently truncated. No runtime imports from any other library. No compatibility or completeness claims beyond the stated scope.

## Support

If this library is useful to you, consider supporting its maintenance with a [donation via PayPal](https://www.paypal.me/LibinPrasanth).

## Author

Created by [Libin Prasanth](https://www.linkedin.com/in/libinprasanth/). Connect on LinkedIn for updates and discussion.
