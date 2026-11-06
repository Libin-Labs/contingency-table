import * as api from '@lp-labs/contingency-table';
import { contingencyTable } from '@lp-labs/contingency-table';
const table = contingencyTable(['yes', 'yes', 'no'], ['A', 'B', 'A']);
if (table.grandTotal !== 3 || table.expected[0]?.[0] !== 4 / 3) throw new Error('Table mismatch');
// @ts-expect-error invalid argument must be rejected by declarations
api.contingencyTable(['a'], [1]);
