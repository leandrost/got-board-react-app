import _ from 'lodash';
import _inflection from 'lodash-inflection';
_.mixin(_inflection);

_.irregular('footman', 'footmen');

export const abstractTypes = {
  order: [
    'raid-order',
    'march-order',
    'support-order',
    'consolidation-order',
    'defense-order',
  ],
  unit: [
    'footman',
    'knight',
    'ship',
    'siege-engine',
  ],
  influenceToken: [
    'iron-throne-token',
    'fiefdom-token',
    'kings-court-token',
  ]
};

export function collectionName(typeName) {
  return _.pluralize(typeName);
};

export function abstractType(type) {
  const modelType = _.kebabCase(type);
  const key = _.findKey(abstractTypes, types => {
    return _.includes(types, modelType)
  });
  return key || type;
}

export function actionModelName(type) {
  const abstractName = abstractType(type);
  return _.snakeCase(abstractName).toUpperCase();
}

export function resourceName(type) {
  const resourceType = abstractType(type) || type;
  const collection = collectionName(resourceType);
  return _.snakeCase(collection);
};

export function reducerNames(abstractType) {
  const types = abstractTypes[abstractType];
  if (!types) { return null; }

  return types.map(type => {
   const collection = collectionName(type);
   return _.camelCase(collection);
  });
};

export function modelName(type) {
  return _.snakeCase(type);
};

export function typeName(collectionName) {
  return _.singularize(collectionName);
};
