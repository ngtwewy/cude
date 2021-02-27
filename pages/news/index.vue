<template>
  <view class="news-container">
    <!-- #ifdef APP-PLUS -->  
    <view class="status_bar">  
        <view class="top_view"></view>  
    </view>  
    <!-- #endif -->
    
    <!-- list -->
    <view class="list-container">
      <view v-for="(article,index) in articleList" :key="article.id">
        <mediaItem :item="article"  @click.native="goDetail(article.id)"></mediaItem>
      </view>
      
      <view class="loading-status">
        <uni-load-more status="loading" iconType="circle" v-if="isLoading"></uni-load-more>
        <view class="no-more" v-if="isLoading==false && noMore==true">
          已经到底了
        </view>
      </view>
    </view>
    
  </view>
</template>

<script>
  import config from '@/common/config.js';
  import tools from '@/common/tools.js';
  
  import uniLoadMore from "@/components/uni-load-more/uni-load-more.vue"
  import mediaItem from '@/pages/index/mediaItem.vue';
  
  export default {
    components: {
      mediaItem,
      uniLoadMore
    },
    data() {
      return {
        tabIndex: 0,
        scrollInto: "", // 跳转到
        tabBars:[],/* {name: '本地',id: 'bendi'} */
        articleList:[],
        articlePerPage:20,
        articlePageNo:1,
        isLoading:false,
        tagId:0,
        noMore:false,
        isPlayerRunning:false
      }
    },
    created(){
      this.getArticleList();
    },
    onShow() {
      var audioInfo = getApp().globalData.audioInfo;
      this.isPlayerRunning = getApp().globalData.audio ? !getApp().globalData.audio.paused : false;
      console.log("this.isPlayerRunning ", this.isPlayerRunning);
    },
    methods: {
      getArticleList(){
        this.isLoading = true;
        this.noMore = false;
        var that = this;
        // /wp/v2/posts?per_page=6&categories=16,17&_embed
        var url = config.api.url + '/wp/v2/posts?page=' + this.articlePageNo +'&per_page=10';
        url += "&categories=2,3&_embed";
        this.$http.get(url)
          .then(res=>{
            console.log("this.articleList: ", res);
            if(res.statusCode == 200 && res.data){
              res.data.forEach(function(item, index, array){
                res.data[index]['description'] = tools.delHtml( item['content']['rendered'] ).substr(0,80);
                res.data[index]['thumbnail'] = "";
                if(item["_embedded"] && item["_embedded"]["wp:featuredmedia"]){
                  if(item["_embedded"]["wp:featuredmedia"][0]){
                    res.data[index]['thumbnail']=item["_embedded"]["wp:featuredmedia"][0]["source_url"];
                  }
                }
              });
              this.articleList.push(...res.data);
              this.articlePageNo++;
            }else if(res.statusCode == 404){
              this.noMore = true;
            }
            this.isLoading = false;
          }).catch(err=>{
            console.log("err ", err);
            if(err.statusCode == 404 || err.statusCode == 400){
              this.noMore = true;
            }
            this.isLoading = false;
          });
      },
      goDetail(id){
        console.log("audioId",id);
        uni.setStorageSync("audioId",id);
        uni.navigateTo({ url:'/pages/index/article?id='+id });
        // uni.redirectTo({ url:'/pages/player/index' });
      },
      onReachBottom(){
        console.log("bottom ... ");
        this.getArticleList();
      },
      // goDetail(id){
      //   uni.navigateTo({
      //     url:'/pages/article/article?id=' + id
      //   })
      // }
      
    }
  }
</script>

<style lang="scss">
  .news-container{
    overflow: hidden;
  }
  .tab-bar {
    width: 750rpx;
    height: 80rpx;
    display: flex;
    flex-direction: row;
    white-space: nowrap;
    /* flex-wrap: nowrap; */
    /* border-color: #cccccc;
    border-bottom-style: solid;
    border-bottom-width: 1px; */
    
    position: fixed;
    background-color: #fff;
    width: 100%;
    height: 80rpx;
    z-index: 9;
   }
   
  .line-h {height: 1upx; background-color: #cccccc;}
  .tab-item {
    display: inline-block;
    flex-wrap: nowrap;
    padding-left: 34upx;
    padding-right: 34upx;
  }
  .tab-item-title {
    color: #555;
    font-size: 30rpx;
    height: 80rpx;
    line-height: 80rpx;
    flex-wrap: nowrap;
    white-space: nowrap;
  }
  .tab-item-title-active {color: #007AFF;}
  
  .list-container{
    width: 690rpx;
    margin-left:30rpx;
    margin-top: 0rpx;
  }
  .loading-status{min-height: 80rpx;display: flex;justify-content: center;align-items: center;font-size: 24rpx;color: #777;}
</style>
