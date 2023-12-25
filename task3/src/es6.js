"use strict";
// в данных задачах нужно использовать возможности es6
// ко всем заданиям можно (а местами и нужно) дописать свои тесты в файле es6.spec.js
// Можно менять параметры функций (например сделать им значения по умолчанию)

// Напишите функцию, которая принимает ФИО пользователя и возвращает
// строку формата Имя Фамилия
function fioToName(fio) {
    if (typeof fio !== 'string') {
        throw new Error('Invalid input');
    }
    const [surname, name] = fio.split(' ');
    return `${name} ${surname}`;
}

// преобразуйте массив чисел так, чтобы в нем остались только
// уникальные элементы
// присмотритесь к коллекции "Set"
function filterUnique(array) {
    if (!Array.isArray(array)) {
        throw new Error('Invalid input');
    }
    return [...new Set(array)];
}

// Задача: разница зарплат
// в функцию приходит массив из n зарплат сотрудников фирмы
// ваша задача определить, во сколько раз зарплата самого высокооплачиваемого
// сотрудника превышает зарплату самого низкооплачиваемого
function calculateSalaryDifference(array) {
    if (!Array.isArray(array)) {
        throw new Error('Invalid input');
    }
    const min = Math.min(...array);
    const max = Math.max(...array);
    return max / min;
}

// Реализуйте класс "словарь слов" (как толковый словарь)
// класс должен быть безопасным и работать только со словами
// присмотритесь к коллекции "Map"
// Словарь - (string, string), и все это не null и не undefined
// * покройте класс тестами
class Dictionary {
    constructor() {
        this.dictionary = new Map();
    }

    add(key, value) {
        if (typeof key !== 'string' || typeof value !== 'string') {
            throw new Error('Invalid input');
        }
        this.dictionary.set(key, value);
    }

    get(key) {
        if (typeof key !== 'string') {
            throw new Error('Invalid input');
        }
        return this.dictionary.get(key);
    }
}

module.exports = {
    fioToName,
    filterUnique,
    Dictionary,
    calculateSalaryDifference
};
