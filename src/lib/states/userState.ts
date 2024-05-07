import {  ObservableObject,  computed,  observable } from "@legendapp/state";
import { configureObservablePersistence, persistObservable } from '@legendapp/state/persist'
import { ObservablePersistLocalStorage } from '@legendapp/state/persist-plugins/local-storage'
import { decodeToken } from "react-jwt";

configureObservablePersistence({
  pluginLocal: ObservablePersistLocalStorage
})


const user$: ObservableObject<{
  isLoggedIn: boolean,
  token: {
    token: string,
    user_id: number,
  },
  user: {
    id: number,
    username: string,
    iat: number,
    exp: number,
  } | unknown
}> = observable({
  isLoggedIn: false,
  token: {
    token: "",
    user_id: 0,
  },
  user: {}
});

persistObservable(user$, {
  local: 'user' // Unique name
})

export { user$ };
