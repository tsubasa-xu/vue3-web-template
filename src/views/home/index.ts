import { useRoute } from 'vue-router';

export const components = {};

export const setup = function (props? :any, context? :any) {
  const route = useRoute();
  console.log('in');
  return {
  };
};
