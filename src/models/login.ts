import { stringify } from 'querystring';
import type { Reducer, Effect } from 'umi';
import { history } from 'umi';

import { fakeAccountLogin, login } from '@/services/login';
import { setAuthority } from '@/utils/authority';
import { getPageQuery } from '@/utils/utils';
import { message } from 'antd';
import { addStaff } from '@/services/staff';

export type StateType = {
  status?: 'ok' | 'error';
  type?: string;
  currentAuthority?: 'user' | 'guest' | 'admin';
};

// export type LoginModelType = {
//   namespace: string;
//   state: StateType;
//   effects: {
//     login: Effect;
//     logout: Effect;
//   };
//   reducers: {
//     changeLoginStatus: Reducer<StateType>;
//   };
// };

const Model = {
  namespace: 'login',

  state: {
    status: undefined,
  },

  effects: {
    *login({ payload }, { call, put }) {
      const response = yield call(login, payload);
      yield put({
        type: 'changeLoginStatus',
        payload: response,
      });
      if (response.status === 'ok') {
        // const urlParams = new URL(window.location.href);
        // const params = getPageQuery();
        message.success('🎉 🎉 🎉  登录成功！');
        localStorage.setItem("currentUser", payload._id)
        // let { redirect } = params as { redirect: string };
        // if (redirect) {
        //   const redirectUrlParams = new URL(redirect);
        //   if (redirectUrlParams.origin === urlParams.origin) {
        //     redirect = redirect.substr(urlParams.origin.length);
        //     if (redirect.match(/^\/.*#/)) {
        //       redirect = redirect.substr(redirect.indexOf('#') + 1);
        //     }
        //   } else {
        //     window.location.href = '/';
        //     return;
        //   }
        // }
        // history.replace(redirect || '/');
        history.replace('/');
      }
    },
    *register({ payload }, { call, put }) {
      payload.userId = '1' + Math.floor(Math.random() * 10000)
      payload.type = "user";
      payload.name = 1;
      payload.phone = 1;
      payload.address = 1;
      const res = yield call(addStaff, payload);
      return res
    },

    logout() {
      const { redirect } = getPageQuery();
      // Note: There may be security issues, please note
      if (window.location.pathname !== '/user/login' && !redirect) {
        history.replace({
          pathname: '/user/login',
          search: stringify({
            redirect: window.location.href,
          }),
        });
      }
    },
  },

  reducers: {
    changeLoginStatus(state, { payload }) {
      setAuthority(payload.currentAuthority);
      return {
        ...state,
        status: payload.status,
        type: payload.type,
      };
    },
  },
};

export default Model;
