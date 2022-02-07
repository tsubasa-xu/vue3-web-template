import { useRoute, RouteLocationNormalizedLoaded, useRouter, Router } from 'vue-router';

export const components = {};

export const setup = function (props? :any, context? :any) {
  const route: RouteLocationNormalizedLoaded = useRoute();
  const router: Router = useRouter();
  console.log('in');
  return {
  };
};
