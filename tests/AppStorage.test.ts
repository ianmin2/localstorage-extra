import './mockStorage';
import AppStorage from '../src/index';
import _ from 'lodash';
import SampleData, {
  TCafeteriaItem,
  TBarItem,
  TTodoItem,
} from './__mocks__/sample.data';

const { apps } = SampleData;

describe('AppStorage', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  // 1
  it('should set and get a primitive value in local storage', () => {
    AppStorage.set('testKey', 'testValue');
    expect(AppStorage.get('testKey')).toBe('testValue');
  });

  // 2
  it('should set & get an array value in local storage', () => {
    AppStorage.set('todo', apps.todo);
    expect(AppStorage.get('todo')).toEqual(apps.todo);
  });

  // 3
  it('should set & get a map value in local storage', () => {
    AppStorage.set('apps', apps);
    expect(AppStorage.get('apps')).toEqual(apps);
  });

  // 4
  it('should update & get a subkey in local storage', () => {
    const newCategoryType = 'custom-purchases';
    AppStorage.set('todo', apps.todo);
    AppStorage.update('todo', '0.categorisation.type', newCategoryType);
    const updatedValue = AppStorage.get('todo', '0.categorisation.type');
    expect(updatedValue).toBe(newCategoryType);
  });

  // 5
  it('should delete a main key in local storage', () => {
    const newCategoryType = 'custom-purchases';
    AppStorage.set('todo', apps.todo);
    AppStorage.del('todo');
    const updatedValue = AppStorage.get('todo');
    expect(updatedValue).toBe(null);
  });

  // 6
  it('should  delete a subkey in local storage', () => {
    const newCategoryType = 'custom-purchases';
    AppStorage.set('todo', apps.todo);
    AppStorage.del('todo', '0.categorisation.type');
    const updatedValue = AppStorage.get('todo', '0.categorisation.type');
    expect(updatedValue).toBe(undefined);
  });

  // 7
  it('should reset data in local storage', () => {
    const newCategoryType = 'custom-purchases';
    AppStorage.set('todo', apps.todo);
    AppStorage.reset();
    const updatedValue = AppStorage.get('todo', '0.categorisation.type');
    const allValues = AppStorage.get('todo');
    expect(updatedValue).toBe(undefined);
    expect(allValues).toBe(null);
  });

  // 8
  it('should push a value to an array/list in local storage', () => {
    AppStorage.set('todo', apps.todo);
    const newTime = Date.now();
    const randomValue = {
      id: newTime,
      content: 'Random Task',
      notes: 'RandomTask Added via localStorage-extra',
      categorisation: {
        type: 'random',
        subkeys: ['random', 'tests'],
      },
    };
    AppStorage.push('todo', randomValue);
    const retreivedValue = AppStorage.getWhere('todo', { id: newTime });
    expect(retreivedValue[0]).toStrictEqual(randomValue);
  });

  // 9
  it('should correctly count the number of items in a localStorage list', () => {
    AppStorage.set('cafeteria', apps.cafeteria);
    const cafeCount = AppStorage.count('cafeteria');
    expect(cafeCount).toEqual(apps.cafeteria.length);
  });

  // 10
  it('should correctly count the number of items in a localStorage sub list', () => {
    AppStorage.set('apps', apps);
    const todoCount = AppStorage.count('apps', 'todo');
    expect(todoCount).toEqual(apps.todo.length);
  });

  // 11
  it('should correctly count the number of items matching a given condition using a custom filter method -- countWhere - method', () => {
    AppStorage.set('apps', apps);

    const customFilter = (barItems: TBarItem[]) =>
      barItems.filter((barItem: TBarItem) => barItem.price < 5);

    const lessThanFiveCount = AppStorage.countWhere<TBarItem[]>(
      'apps',
      customFilter,
      'bar'
    );

    const barItems = AppStorage.get('apps', 'bar');

    const lodashLessThanFive = _.countBy(
      barItems,
      (barItem: TBarItem) => barItem.price < 5
    ).true;

    const manualCount = barItems.filter(
      (barItem: TBarItem) => barItem.price < 5
    ).length;
    expect(lessThanFiveCount).toEqual(manualCount);
    expect(lodashLessThanFive).toEqual(manualCount);
  });

  // 12
  it('should correctly count the number of items matching a given condition using a filter object/Map  -- countWhere - map', () => {
    AppStorage.set('apps', apps);
    const categoryFilter = 'drink';
    const mapFilter = { type: categoryFilter };
    const simpleMapFilterMatchCount = AppStorage.countWhere<TTodoItem[]>(
      'apps',
      mapFilter,
      'cafeteria'
    );

    const cafeteriaItems = AppStorage.get('apps', 'cafeteria');

    const lodashCategoryMatchCount = _.countBy(
      cafeteriaItems,
      (cafeteriaItem: TCafeteriaItem) => cafeteriaItem.type === categoryFilter
    ).true;

    const manualCategoryMatchCount = cafeteriaItems.filter(
      (cafeteriaItem: TCafeteriaItem) => cafeteriaItem.type === categoryFilter
    ).length;

    expect(simpleMapFilterMatchCount).toEqual(manualCategoryMatchCount);
    expect(lodashCategoryMatchCount).toEqual(manualCategoryMatchCount);
  });

  // 13
  it('should correctly get the items matching a given condition using a custom filter method -- countWhere - method', () => {
    AppStorage.set('apps', apps);

    const customFilter = (barItems: TBarItem[]) =>
      barItems.filter((barItem: TBarItem) => barItem.price < 5);

    const lessThanFiveItems = AppStorage.getWhere<TBarItem[]>(
      'apps',
      customFilter,
      'bar'
    );

    const barItems = AppStorage.get('apps', 'bar');

    const lodashLessThanFive = _.filter(
      barItems,
      (barItem: TBarItem) => barItem.price < 5
    );

    const manualItems = barItems.filter(
      (barItem: TBarItem) => barItem.price < 5
    );
    expect(lessThanFiveItems).toEqual(manualItems);
    expect(lodashLessThanFive).toEqual(manualItems);
  });

  // 14
  it('should correctly get the items matching a given condition using an object/Map property filter -- countWhere - map', () => {
    AppStorage.set('apps', apps);
    const categoryFilter = 'drink';
    const mapFilter = { type: categoryFilter };
    const simpleMapFilterMatchItems = AppStorage.getWhere<TTodoItem[]>(
      'apps',
      mapFilter,
      'cafeteria'
    );

    const cafeteriaItems = AppStorage.get('apps', 'cafeteria');

    const lodashCategoryMatchItems = _.filter(
      cafeteriaItems,
      (cafeteriaItem: TCafeteriaItem) => cafeteriaItem.type === categoryFilter
    );

    const manualCategoryMatchItems = cafeteriaItems.filter(
      (cafeteriaItem: TCafeteriaItem) => cafeteriaItem.type === categoryFilter
    );

    expect(simpleMapFilterMatchItems).toEqual(manualCategoryMatchItems);
    expect(lodashCategoryMatchItems).toEqual(manualCategoryMatchItems);
  });

  // 15
  it('should correctly delete the items matching a given condition using a custom filter method -- countWhere - method', () => {
    AppStorage.set('apps', apps);

    const customFilter = (barItems: TBarItem[]) =>
      barItems.filter((barItem: TBarItem) => barItem.price < 5);

    const lessThanFiveItems = AppStorage.delWhere<TBarItem[]>(
      'apps',
      customFilter,
      'bar'
    );

    const barItems = AppStorage.get('apps', 'bar');

    const lodashLessThanFive = _.filter(
      barItems,
      (barItem: TBarItem) => barItem.price < 5
    );

    const manualItems = barItems.filter(
      (barItem: TBarItem) => barItem.price < 5
    );
    expect(lessThanFiveItems).toEqual(true);
    expect(lodashLessThanFive).toEqual(manualItems);
    expect(manualItems).toStrictEqual([]);
  });

  // 16
  it('should correctly delete the items matching a given condition using an object/Map property filter -- countWhere - map', () => {
    AppStorage.set('apps', apps);
    const categoryFilter = 'drink';
    const mapFilter = { type: categoryFilter };
    const simpleMapFilterMatchItems = AppStorage.delWhere<TTodoItem[]>(
      'apps',
      mapFilter,
      'cafeteria'
    );

    const cafeteriaItems = AppStorage.get('apps', 'cafeteria');

    const lodashCategoryMatchItems = _.filter(
      cafeteriaItems,
      (cafeteriaItem: TCafeteriaItem) => cafeteriaItem.type === categoryFilter
    );

    const manualCategoryMatchItems = cafeteriaItems.filter(
      (cafeteriaItem: TCafeteriaItem) => cafeteriaItem.type === categoryFilter
    );

    expect(simpleMapFilterMatchItems).toEqual(true);
    expect(lodashCategoryMatchItems).toEqual(manualCategoryMatchItems);
    expect(manualCategoryMatchItems).toStrictEqual([]);
  });
});
