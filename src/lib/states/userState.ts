import { observable } from "@legendapp/state";

const user$ = observable({
  user: {},
  isLoggedIn: false
});

export { user$ };
