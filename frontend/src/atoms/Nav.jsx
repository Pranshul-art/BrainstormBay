import { selector } from 'recoil';
import {countState} from './atoms';

const currPage = selector({
  key:'currPage',
  get :({get})=>{
    const count = get(countState);
    return count * 2;
  },
});