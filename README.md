# function-to-worker

**`function-to-worker`** is a package designed for run any synchronous functions in web workers scope. It lets to make calculations
without blocking main js thread.

## Usage

Package provide only one simple function which makes worker from passed function:

```javascript
import createWorker from "function-to-worker";

const wantToCalculateItInWorker = number => number + 1;
const calculateInWorker = createWorker(wantToCalculateItInWorker);
```

function _calculateInWorker_ from example above returns _Promise_ which will resolved or rejected with
value was returned by _wantToCalculateItInWorker_ function. So, we can use it like this:

```javascript
const addOneInWorker = async number => await calculateInWorker(number);
```
