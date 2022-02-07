import { useRoute, Router } from 'vue-router';

export const components = {};

export const setup = function (props? :any, context? :any) {
  const route: Router = useRoute();
  console.log('in');
  return {
  };
};
