import { observable } from "@legendapp/state";
import { configureObservablePersistence, persistObservable } from '@legendapp/state/persist'
import { ObservablePersistLocalStorage } from '@legendapp/state/persist-plugins/local-storage'

configureObservablePersistence({
  pluginLocal: ObservablePersistLocalStorage
})


const user$ = observable({
  user: {},
  isLoggedIn: false
});

persistObservable(user$, {
  local: 'user' // Unique name
})

export { user$ };
