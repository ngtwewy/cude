// 组装模块并导出store的地方
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

const store = new Vuex.Store({
	state:{
		userInfo: null,   // 当前登录的用户信息
		userToken: null,  // 当前登录用户的token
		
		ouathObj: {
			platform: -1,  // 当前第三方平台
			openId: '',   // 当前第三方的id
		},
		
		uuid:'', // 用户注册以后获取的ID
	},
	
	
	getters:{
		// 是否登录
		isLogin: state => {
		  return (state.userToken && state.userInfo ) ? true : false;
		},
		
		// 是否完善信息
		isSetProfile: state => {
			return ( state.userToken && state.userInfo && state.userInfo.roleId ) ? true : false;
		}
	},
	
	
	mutations:{
		// 设置用户信息
		setUserInfo( state, userInfo ){
			state.userInfo = userInfo;
		},
		
		// 设置token
		setUserToken( state, userToken ){
			state.userToken = userToken;
		},
		
		// 设置当前登录的第三方信息
		setOuathObj(state, obj ){
			state.ouathObj = obj;
		},
		
		// 设置用户ID
		setUuid(state, uuid){
			state.uuid = uuid;
		}
	},
	
	
	actions:{
		// 通过token查询用户信息
		// async queryUserByToken({state, commit}){
		// 	const {code, data} = await flyApi.queryUserByToken( state.userToken );
		// 	if( code == 1 ){
		// 		if( data.avatar == "undefined"){
		// 			data.avatar = '';
		// 		}
		// 		commit("setUserInfo", data);
		// 		return ;
		// 	}
		// 	commit("setUserInfo", null);
		// },
		
		// 设置用户token和用户信息
		initUser({ commit }, res){
			return new Promise( (resolve, reject) => {
				if( res ){
					commit("setUserToken", res.token);
          commit("setUserInfo", res.user);
					commit("setUuid", res.user.uuid);
					resolve({code:1});
				}else{
					commit("setUserToken", null);
					commit("setUserInfo", null);
				}
			});
		}
	}
});

export default store;
