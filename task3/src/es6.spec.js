const assert = require('assert');
const core = require('./es6');

describe('es6', () => {
    describe('#fioToName', () => {
        it('ФИО в Имя Фамилия корректно', () => {
            assert.strictEqual(core.fioToName('Иванов Иван Иванович'), 'Иван Иванов');
        });

        it('ФИ в Имя Фамилия', () => {
            assert.strictEqual(core.fioToName('Петров Петр'), 'Петр Петров');
        });
    });

    describe('#filterUnique', () => {
        it('массив с уникальными равен сам себе', () => {
            assert.deepStrictEqual(core.filterUnique([1, 2, 3]), [1, 2, 3]);
        });

        it('массив с неуникальными отфильтрован', () => {
            assert.deepStrictEqual(core.filterUnique([1, 1, 1, 1]), [1]);
        });

        it('пустой массив', () => {
            assert.deepStrictEqual(core.filterUnique([]), []);
        });
    });

    describe('#calculateSalaryDifference', () => {
        it('считает разницу корректно', () => {
            assert.strictEqual(core.calculateSalaryDifference([1, 2, 3]), 3);
        });

        it('на пустой массив возвращается falsy значение', () => {
            assert.strictEqual(!!core.calculateSalaryDifference([]), false);
        });
    });

    describe('#Dictionary', () => {
        let dic = new core.Dictionary();

        it('экземпляр класса создается', () => {            
            assert.strictEqual(!!dic, true);
        }); 

        it('должен добавить пару ключ-значение в словарь', () => {
            dic.add('ключ', 'значение');
            assert.strictEqual(dic.get('ключ'), 'значение');
        });

        it('должен выбросить ошибку, если ключ или значение не являются строками', () => {
            assert.throws(() => dic.add(123, 'значение'), Error, 'Некорректный ввод');
            assert.throws(() => dic.add('ключ', 123), Error, 'Некорректный ввод');
            assert.throws(() => dic.add(null, 'значение'), Error, 'Некорректный ввод');
            assert.throws(() => dic.add('ключ', null), Error, 'Некорректный ввод');
            assert.throws(() => dic.add(undefined, 'значение'), Error, 'Некорректный ввод');
            assert.throws(() => dic.add('ключ', undefined), Error, 'Некорректный ввод');
        });
        it('должен вернуть значение, связанное с ключом', () => {
            dic.add('ключ', 'значение');
            assert.strictEqual(dic.get('ключ'), 'значение');
        });

        it('должен вернуть undefined, если ключ не найден в словаре', () => {
            assert.strictEqual(dic.get('ключ-undefined'), undefined);
        });

        it('должен выбросить ошибку, если ключ не является строкой', () => {
            assert.throws(() => dic.get(123), Error, 'Некорректный ввод');
            assert.throws(() => dic.get(null), Error, 'Некорректный ввод');
            assert.throws(() => dic.get(undefined), Error, 'Некорректный ввод');
        });

       
    });
});