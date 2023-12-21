//Напишите функцию, которая проверяет, является ли число целым используя побитовые операторы
function isInteger(n) {
  return n === n >> 0;
}

//Напишите функцию, которая возвращает массив четных чисел от 2 до 20 включительно
function even() {
  let evenNumbers = [];
  for (let i = 2; i <= 20; i++) {
    if (i % 2 === 0) {
      evenNumbers.push(i);
    }
  }
  return evenNumbers;
}

//Напишите функцию, считающую сумму чисел до заданного используя цикл
function sumTo(n) {
  let sum = 0;
  for (let i = 1; i <= n; i++) {
    sum += i;
  }
  return sum;
}

//Напишите функцию, считающую сумму чисел до заданного используя рекурсию
function recSumTo(n) {
  if (n == 1) {
    return 1;
  } else {
    return n + sumTo(n - 1);
  }
}

//Напишите функцию, считающую факториал заданного числа
function factorial(n) {
  if (n === 0) {
    return 1;
  } else {
    return n * factorial(n - 1);
  }
}

//Напишите функцию, которая определяет, является ли число двойкой, возведенной в степень
function isBinary(n) {
  if (n <= 0 || n % 1 !== 0) {
    return false;
  }
  let binary = n.toString(2);
  return /^10*$/.test(binary);
}

//Напишите функцию, которая находит N-е число Фибоначчи
function fibonacci(n) {
  if (n <= 1) {
    return n;
  }

  let prev = 0;
  let curr = 1;

  for (let i = 2; i <= n; i++) {
    let temp = curr;
    curr = prev + curr;
    prev = temp;
  }

  return curr;
}

/** Напишите функцию, которая принимает начальное значение и функцию операции
 * и возвращает функцию - выполняющую эту операцию.
 * Если функция операции (operatorFn) не задана - по умолчанию всегда
 * возвращается начальное значение (initialValue)
 * @param initialValue
 * @param operatorFn - (storedValue, newValue) => {operation}
 * @example
 * const sumFn =  getOperationFn(10, (a,b) => a + b);
 * console.log(sumFn(5)) - 15
 * console.log(sumFn(3)) - 18
 */
function getOperationFn(initialValue, operatorFn) {
    
  return function (value) {
    if (operatorFn) {
        let curInitialValue = initialValue
        initialValue = operatorFn(initialValue, value)
      return operatorFn(curInitialValue, value);
    } else {
      return initialValue;
    }
  };
}

/**
 * Напишите функцию создания генератора арифметической последовательности.
 * При ее вызове, она возвращает новую функцию генератор - generator().
 * Каждый вызов функции генератора возвращает следующий элемент последовательности.
 * Если начальное значение не передано, то оно равно 0.
 * Если шаг не указан, то по дефолту он равен 1.
 * Генераторов можно создать сколько угодно - они все независимые.
 *
 * @param {number} start - число с которого начинается последовательность
 * @param {number} step  - число шаг последовательности
 * @example
 * const generator = sequence(5, 2);
 * console.log(generator()); // 5
 * console.log(generator()); // 7
 * console.log(generator()); // 9
 */
function sequence(start = 0, step = 1) {
  let current = start;
  return function () {
    let result = current;
    current += step;
    return result;
  };
}

/**
 * Напишите функцию deepEqual, которая принимает два значения
 * и возвращает true только в том случае, если они имеют одинаковое значение
 * или являются объектами с одинаковыми свойствами,
 * значения которых также равны при сравнении с рекурсивным вызовом deepEqual.
 * Учитывать специфичные объекты(такие как Date, RegExp итп) не обязательно
 *
 * @param {object} firstObject - первый объект
 * @param {object} secondObject - второй объект
 * @returns {boolean} - true если объекты равны(по содержанию) иначе false
 * @example
 * deepEqual({arr: [22, 33], text: 'text'}, {arr: [22, 33], text: 'text'}) // true
 * deepEqual({arr: [22, 33], text: 'text'}, {arr: [22, 3], text: 'text2'}) // false
 */
function deepEqual(firstObject, secondObject) {
  // Если оба объекта являются одинаковыми, то они равны
  if (firstObject === secondObject) {
    return true;
  }
  
  // Если оба объекта NaN
  if(firstObject != firstObject && secondObject != secondObject) {
    return true
  }

  // Если один из объектов является null или один из объектов не является объектом, то они не равны
  if (
    firstObject == null ||
    typeof firstObject != "object" ||
    secondObject == null ||
    typeof secondObject != "object"
  ) {
    return false;
  }

  // Если оба объекта являются массивами, то сравниваем их элементы
  if (Array.isArray(firstObject) && Array.isArray(secondObject)) {
    if (firstObject.length != secondObject.length) {
      return false;
    }
    for (let i = 0; i < firstObject.length; i++) {
      if (!deepEqual(firstObject[i], secondObject[i])) {
        return false;
      }
    }
    return true;
  }

  // Если оба объекта являются обычными объектами, то сравниваем их свойства
  let firstObjectProps = Object.getOwnPropertyNames(firstObject);
  let secondObjectProps = Object.getOwnPropertyNames(secondObject);

  if (firstObjectProps.length != secondObjectProps.length) {
    return false;
  }

  for (let i = 0; i < firstObjectProps.length; i++) {
    let propName = firstObjectProps[i];

    if (
      !secondObjectProps.includes(propName) ||
      !deepEqual(firstObject[propName], secondObject[propName])
    ) {
      return false;
    }
  }

  return true;
}

module.exports = {
  isInteger,
  even,
  sumTo,
  recSumTo,
  factorial,
  isBinary,
  fibonacci,
  getOperationFn,
  sequence,
  deepEqual,
};
