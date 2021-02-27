<template>
  <view class="media-item">
    <view class="media-left">
      <image v-if="item.thumbnail" :src="item.thumbnail" mode="aspectFill"></image>
      <image v-else src="../../static/images/default.jpg" mode="aspectFit"></image>
    </view>
    <view class="media-right">
      <view class="media-title">
        {{item.title ? item.title.rendered : "" }}
      </view>
      <view class="media-author">
        <!-- <text>FM11213344</text> -->
        <text>{{item.nickname}}</text>
      </view>
      <view class="media-meta">
        <view class="media-meta-item">
          <text class="iconfont">&#xe64a;</text>
          <text>{{date}}</text>
        </view>
        <!-- 点击 -->
        <view class="media-meta-item" v-if="item.hit_counter">
          <text class="iconfont">&#xe66d;</text>
          <text>{{item.hit_counter}}</text>
        </view>
        <!-- 评论 -->
        <view class="media-meta-item" v-if="item.comment_counter">
          <text class="iconfont">&#xe642;</text>
          <text>{{item.comment_counter}}</text>
        </view>
      </view>
    </view>
  </view>
</template>


<script>
import tools from "../../common/tools.js";

export default {
  props:['item'],
  computed:{
    date(){
      var date = this.item.date;
      // date = new Date(date);
      date = Date.parse(date);
      date = tools.friendlyTime( Math.floor(date/1000));
      console.log("date ", date);
      return date;
    },
    itemImage(){
      return this.item.thumbnail ? this.item.thumbnail : '';
    }
  }, 
  methods:{
    
  }
}
</script>


<style lang="scss">
.media-item{
  width: 100%;
  padding: 20rpx 0;
  font-size: 26rpx;
  border-bottom: 1px solid #eeeeee;
  display: flex;
  .media-left{
    width: 115rpx;
    height: 115rpx;
    border-radius: 10rpx;
    overflow: hidden;
    image{
      width: 100%;
      height: 100%;
    }
  }
  
  .media-right{
    font-size: 18rpx;
    padding-left: 30rpx;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .media-title{
      font-size: 28rpx;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 1;
      overflow: hidden;
      width: 520rpx;
    }
    .media-author{
      color: #676767;
      text{
        margin-right: 30rpx;
      }
    }
    .media-meta{
      display: flex;
      .media-meta-item{
        color: #b1b0ac;
        font-size: 20rpx;
        height: 30rpx;
        line-height: 30rpx;
        margin-right: 30rpx;
        .iconfont{
          font-size: 25rpx;
          top: 1rpx;
          position: relative;
          margin-right: 8rpx;
        }
        
      }
    }
  }
  
  

}

</style>



