<template>
  <view class="item-container" @click.native="goDetail(item.id)">
    <view class="item-header">
      
      <image v-if="item.thumbnail" :src="item.thumbnail" mode=""></image>
      <image v-else src="../../static/images/default.jpg" mode=""></image>
      
      <view class="item-top">
        <view class="item-meta">
          <text class="iconfont">&#xe658;</text>
          <text>{{item.hit_counter ? item.hit_counter : "0" }}</text>
        </view>
        <view class="item-meta">
          <text class="iconfont">&#xe651;</text>
          <text>{{item.hit_counter ? item.hit_counter : "0" }}</text>
        </view>
      </view>
    </view>
    <view class="item-title">
      {{item.title ? item.title.rendered : "" }}
    </view>
  </view>
</template>

<script>
  export default {
    props:['item'],
    data(){
      return {
        
      }
    },
    methods:{
      goDetail(id){
        console.log("audioId",id);
        uni.setStorageSync("audioId",id);
        uni.navigateTo({ url:'/pages/player/index' });
        // uni.redirectTo({ url:'/pages/player/index' });
      },
    }
  }
</script>

<style lang="scss">
  .item-container{
    width: 210rpx;
    margin-bottom: 20rpx;
    .item-header{
      width: 210rpx;
      height: 210rpx;
      border-radius: 13rpx;
      overflow: hidden;
      position: relative;
      image{
        width: 210rpx;
        height: 210rpx;
      }
      .item-top{
        background-image: linear-gradient(transparent, #222);
        width: 190rpx;
        height: 60rpx;
        padding: 0 10rpx 3rpx 10rpx;
        position: absolute;
        bottom: 0rpx;
        left: 0rpx;
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
        .item-meta{
          font-size: 23rpx;
          color: #fff;
          // z-index: 999;
          .iconfont{
            font-size: 25rpx;
            right: 5rpx;
            top: 1rpx;
          }
        }
      }
    }
    .item-title{
      font-size: 25rpx;
      color: #393939;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      overflow: hidden;
    }
  }
</style>
