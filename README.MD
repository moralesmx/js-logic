# JsLogic

Javascript logic serializable natively to json

## Install

```
npm install github:moralesmx/js-logic
```

## Example
```js
import { JsLogic } from 'js-logic';

// Data
const data = {
  items: [
    { price: 12, discount: 2, amount: 3 },
    { price: 20, discount: 0, amount: 2 },
    { price: 34, discount: 4, amount: 1 },
  ],
};

// Javascript
data.items.reduce((total, item) => total + (item.price - item.discount) * item.amount, 0);

// JsLogic
const logic = JSON.stringify(
  ['$()', ['$', 'items'], 'reduce',
    ['$=>',
      ['$+',
        ['$$', 0, 0],
        ['$*',
          ['$-',
            ['$$', 0, 1, 'price'],
            ['$$', 0, 1, 'discount'],
          ],
          ['$$', 0, 1, 'amount'],
        ],
      ],
    ],
    0,
  ]
);
JsLogic(logic, data);

// Result
100
```
