import ua from 'universal-analytics';
import { v4 as uuid } from 'uuid';
import store from '../utils/store';

const userId: string = store.get('userId') || uuid();

store.set('userId', userId);

function activateUser() {
  const user = ua('UA-142775737-2', userId);
  user.pageview('/').send();
}

export default activateUser;
