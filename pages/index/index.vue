<template>
  <view class="home-container">
    <!-- #ifdef APP-PLUS -->
    <view class="status_bar">
        <view class="top_view"></view>
    </view>
    <!-- #endif -->
    
    <!-- 顶部幻灯 -->
    <view class="home-top">
      <view class="home-top-bg">
        <image src="../../static/images/logo.png" mode="aspectFit" class="home-top-logo"></image>
      </view>
      <!-- slider -->
      <view class="uni-padding-wrap">
        <view class="page-section swiper">
          <view class="page-section-spacing">
            <swiper class="swiper" :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval" :duration="duration">
              <swiper-item v-for="(s,index) in sliders" :key="index">
                 <image :src="s.url" mode="aspectFill"></image>
              </swiper-item>
            </swiper>
          </view>
        </view>
      </view>
    </view>
    
    <!-- 产品 -->
    <view class="list-panel">
      <view class="list-header">
        <view class="list-title">
          产品
        </view>
        <view class="list-more">
          <text @tap="toProducts()">更多</text>
          <text class="iconfont">&#xe660;</text>
        </view>
      </view>
      
      <view class="list-container">
        <audio-item v-for="(item, index) in itemList1" :item="item" :key="index"
          @click.native="goDetail(item.id)"
        ></audio-item>
      </view>
    </view>
    
    <!-- 案例 -->
    <view class="list-panel">
      <view class="list-header">
        <view class="list-title">
          案例
        </view>
        <view class="list-more">
          <text @tap="toProducts()">更多</text>
          <text class="iconfont">&#xe660;</text>
        </view>
      </view>
      
      <view class="list-container">
        <audio-item v-for="(item, index) in itemList2" :item="item" :key="index"
          @click.native="goDetail(item.id)"
        ></audio-item>
      </view>
    </view>
    
    
    <!-- 新闻资讯 -->
    <view class="list-panel">
      <view class="list-header">
        <view class="list-title">
          新闻资讯
        </view>
      </view>
      
      <view class="list-container">
        <media-item v-for="(item, index) in newsList" :item="item" :key="index"
          @click.native="goDetail(item.id)"
        ></media-item>
      </view>
      <view class="get-more" @click="toNews()">
        <text>查看更多</text>
        <text class="iconfont">&#xe64c;</text>
      </view>
    </view>
    
  </view>
</template>

<script>
  import config from '@/common/config.js';
  import audioItem from '@/pages/index/homeItem.vue';
  import mediaItem from '@/pages/index/mediaItem.vue';
  
	export default {
    components: { audioItem, mediaItem},
		data() {
			return {
				title: 'Hello',
        indicatorDots: true, 
        autoplay: true,
        interval: 5000,
        duration: 500,
        sliders:[{url:'/static/images/sliders/slider1.jpg'},{url:'/static/images/sliders/slider2.jpg'}],
        newsList:[],
        itemList1:[],
        itemList2:[]
			}
		},
		onLoad() {
      this.getSlider();
      this.getNews();
      this.getList1();
      this.getList2();
		}, 
		methods: {
      getSlider(){
        this.$http.get(config.api.url+"/wp/v2/posts?per_page=6&categories=13&_embed")
        .then(res => {
          console.log(res);
          res.data.forEach((item,index)=>{
            res.data[index]['url']=item["_embedded"]["wp:featuredmedia"][0]["source_url"];
          })
          this.sliders = res.data;
        }).catch(err => {
          console.log("xxxxx: ",err);
        });
      },
      getNews(){
        this.$http.get(config.api.url+"/wp/v2/posts?per_page=6&categories=2,3&_embed")
        .then(res => {
          console.log(res);
          res.data.forEach((item,index)=>{
            res.data[index]['thumbnail'] = "";
            if(item["_embedded"] && item["_embedded"]["wp:featuredmedia"]){
              if(item["_embedded"]["wp:featuredmedia"][0]){
                res.data[index]['thumbnail']=item["_embedded"]["wp:featuredmedia"][0]["source_url"];
              }
            }
          })
          this.newsList = res.data;
        }).catch(err => {
          console.log("xxxxx: ",err);
        });
      },
      getList1(){
        this.$http.get(config.api.url+"/wp/v2/posts?per_page=6&categories=6&_embed")
        .then(res => {
          console.log(res);
          res.data.forEach((item,index)=>{
            res.data[index]['thumbnail'] = "";
            if(item["_embedded"] && item["_embedded"]["wp:featuredmedia"]){
              if(item["_embedded"]["wp:featuredmedia"][0]){
                res.data[index]['thumbnail']=item["_embedded"]["wp:featuredmedia"][0]["source_url"];
              }
            }
          })
          this.itemList1 = res.data;
        }).catch(err => {
          console.log("xxxxx: ",err);
        });
      },
      getList2(){
        this.$http.get(config.api.url+"/wp/v2/posts?per_page=6&categories=14&_embed")
        .then(res => {
          console.log(res);
          res.data.forEach((item,index)=>{
            res.data[index]['thumbnail'] = "";
            if(item["_embedded"] && item["_embedded"]["wp:featuredmedia"]){
              if(item["_embedded"]["wp:featuredmedia"][0]){
                res.data[index]['thumbnail']=item["_embedded"]["wp:featuredmedia"][0]["source_url"];
              }
            }
          })
          this.itemList2 = res.data;
        }).catch(err => {
          console.log("xxxxx: ",err);
        });
      },
      toProducts(){
        uni.switchTab({ url:"/pages/index/imageList"});
      },
      toCases(){
        uni.switchTab({ url:"/pages/cases/index"});
      },
      toNews(){
        uni.navigateTo({ url:"/pages/news/index"});
      },
      goDetail(id){
        console.log("audioId",id);
        uni.setStorageSync("audioId",id);
        uni.navigateTo({ url:'/pages/index/article?id='+id });
        // uni.redirectTo({ url:'/pages/player/index' });
      }
      

		}
	}
</script>

<style lang="scss">
  // page{padding-bottom: 300rpx;}
  .home-container{
    .swiper image{
      width: 100%;
      height: 100%;
    }
  }
  
  .status_bar {
      height: var(--status-bar-height);  
      width: 100%;  
      background-color: #4CD964;  
  }  
  .top_view {
      height: var(--status-bar-height);  
      width: 100%;  
      position: fixed;  
      background-color: #333;  
      top: 0;  
      z-index: 999;  
  }
  
  /* 顶部幻灯 */
  .home-top{
    width: 750rpx;
    height: 300rpx;
    overflow: hidden;
    // background-color: green;
    .home-top-bg{
      width: 700rpx;
      height: 200rpx;
      // background-color: #333333;
      // background-image: url(../../static/images/top-background.jpg);
      background-position: center;
      background-size: cover;
      .home-top-logo{
        width: 500rpx;
        height: 80rpx;
        margin-top: 27rpx;
        margin-left: 10rpx;
        display: none;
      }
    }
    .uni-padding-wrap{
      width: 700rpx;
      height: 300rpx;
      // background-color: #007AFF;
      margin: -200rpx auto 0rpx auto;
      .page-section,.page-section-spacing,.swiper{
        width: 100%;
        height: 100%;
      }
      image{
        border-radius: 15rpx;
      }
    }
  }

  
  .list-panel{
    width: 700rpx;
    margin: 40rpx auto 0 auto;
    .list-header{
      display: flex;
      justify-content: space-between;
      .list-title{ font-size: 28rpx; }
      .list-more{
        font-size: 25rpx;
        color: #909090;
        .iconfont{
          font-size: 25rpx;
        }
      }
    }
    .list-container{
      width: 100%;
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      margin-top: 30rpx;
      
    }
    .get-more{
      width: 255rpx;
      height: 50rpx;
      line-height: 50rpx;
      margin: 10rpx auto 30rpx auto;
      border-radius: 50rpx;
      border:1rpx solid #ececec;
      font-size: 22rpx;
      color: #222222;
      text-align: center;
      position: relative;
      .iconfont{
        font-size: 27rpx;
        top: 1rpx;
        left: 10rpx;
        color: #222222;
      }
    }
  }
</style>

