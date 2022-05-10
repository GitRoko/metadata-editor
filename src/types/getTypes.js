export function getTypes(data) {
  
  const objectIs = {
    null: {
      check(obj) {
        if (obj === null && Object.is(obj, null)) {
          return this.result;
        }
      },
      result: 'null',
    },
    array: {
      check(obj) {
        if (Array.isArray(obj)) {
          return this.result;
        }
      },
      result: 'array',
    },
    object: {
      check(obj) {
        if (obj != null && obj.constructor.name === "Object") {
          return this.result;
        }
      },
      result: 'object',
    },
  };
  
  const runChecker = (object, value) => {
    for (const key in object) {
      if (object[key].check(value)) {
        return object[key].result;
      }
    }
  }

  const parseType = (value) => {
  
    switch (typeof value) {
      case 'boolean':
        return 'boolean';
  
      case 'number':
        return 'number';
  
      case 'string':
        let newValue;
  
        try {
          newValue = JSON.parse(value);
        } catch {
          newValue = value;
        }
  
        if (typeof newValue !== 'string') {
          return parseType(newValue);
        }

        return 'string';
  
      case 'object':
        return runChecker(objectIs, value);
  
      default:
        return 'undefined';
    }
  };

  return  parseType(data);
};