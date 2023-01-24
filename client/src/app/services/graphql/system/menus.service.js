import jwtDecode from 'jwt-decode';
import FuseUtils from '@fuse/FuseUtils';
import gql from 'graphql-tag'
import grapQlService from '../../libs/graphQlService'
import QCONST from './menus.graphql';

export async function login(email, password) {
	return new Promise((resolve, reject) => { 
		grapQlService
      .mutate({
        variables: { email, password },
        mutation: QCONST.loginMutation,
      })
      .then(({ data }) => {
        const { token, user } = data.login;
        if (token && user) {
          this.setSession(token);
          resolve(user);
        } else {
          reject(data.error);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  });
};