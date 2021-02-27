<template>
  <view class="article-container">
    <!-- 获取数据前加载状态 -->
    <uni-load-more status="loading" iconType="circle" v-if="isLoading"></uni-load-more>

    <view class="article-widget" v-if="isLoading==false">
      <view class="article-title">
        {{article.title ? article.title.rendered : ""}}
      </view>
      <view class="article-meta">
        <view class="article-meta-left">
          <!--view class="meta-widget">
            <image v-if="article.user.avatar" :src="article.user.avatar" mode="aspectFill"></image>
            <image v-else src="../../static/images/avatar.jpg" mode="aspectFill"></image>
            {{article.user.nickname}}
          </view-->
          <!-- <view class="meta-widget">
            <i class="iconfont">&#xe64a;</i>
            {{article.created_at}}
          </view> -->
        </view>
        <view class="article-meta-right">
        </view>
      </view>
      <view class="article-content">
         <!-- v-html="article.content" -->
        <rich-text :nodes="article.content"></rich-text>
      </view>
    </view>
  </view>
</template>



<script>
  import config from '@/common/config.js';
  import tools from '@/common/tools.js';
  import uniLoadMore from "@/components/uni-load-more/uni-load-more.vue"
  import htmlParser from '@/common/html-parser'
  
  export default {
    components: {
      uniLoadMore
    },
    onLoad: function(option) {
      this.getArticle(option.id);
    },
    data() {
      return {
        isLoading: true,
        article:{}
      }
    },
    methods: {
      getArticle(id) {
        var that = this;
        id = 5;
        this.$http.get(config.api.url + '/wp/v2/pages/' + id)
          .then(res => {
            if (res.statusCode == 200) {
              res.data.content.rendered = tools.formatRichText(res.data.content.rendered);
              res.data.content.rendered = res.data.content.rendered.replace("↵",'');
              res.data.content.rendered = res.data.content.rendered.replace(/figure/g,'div');
              console.log("res.data.content.rendered ", res.data.content.rendered);
              res.data.content = htmlParser(res.data.content.rendered);
              res.data.created_at = tools.friendlyTime( Math.floor( Date.parse(res.data.date)/1000) );
              that.article = res.data;
              // that.article.created_at = that.article.created_at;//tools.friendlyTime(that.article.created_at);

              // const regex = new RegExp('<img', 'gi');
              // that.article.content = that.article.content.replace(regex, `<img style="max-width: 100%;"`);
              // that.article.content = htmlParser(that.article.content.rendered);
            }
            that.isLoading = false;
          });
      }
    }


  }
</script>


<style lang="scss" scoped>
.article-container{
  width: 700rpx; margin-left:25rpx;
  font-size: 26rpx;
  .article-widget{
    margin-top: 20rpx;
    .article-title{
      font-size: 35rpx;
      text-align: center;
    }
    .article-meta{
      display: none;
      color: #4b4b4b;
      margin-top: 40rpx;
      .article-meta-left{
        display: flex;
        flex-direction: column;
        .meta-widget{
          display: flex;
          align-items: center;
          i{
            margin-right: 18rpx;
          }
          // image{
          //   width: 37rpx;
          //   height: 37rpx;
          //   border-radius: 50%;
          //   margin-right: 10rpx;
          // }
        }
        // .meta-widget:nth-child(2){
        //   margin-top: 26rpx;
        //   i{margin-right: 10rpx;}
        // }
      }
    }
    .article-content{
      margin-top: 60rpx;
      overflow: hidden;
      padding-bottom: 50rpx;
      font-size: 30rpx;
      color: #525153;
      
    }
  }
}


</style>


