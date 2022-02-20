// pages/yuyuexiangqing/yuyuexiangqing.js
import { AppBase } from "../../appbase";
import { ApiConfig } from "../../apis/apiconfig";
import { InstApi } from "../../apis/inst.api.js";
import { MemberApi } from "../../apis/member.api";

import {
  ApiUtil
} from "../../apis/apiutil.js";

class Content extends AppBase {
  constructor() {
    super();
  }
  onLoad(options) {
    this.Base.Page = this;
    //options.id=5;
    super.onLoad(options);
    this.Base.needauth = true;
     
  }
  onMyShow() {
    var that = this; 
    var instapi = new InstApi();
 
    instapi.fangfalist({}, (fangfalist) => {
      for(var i=0;i<fangfalist.length;i++){
        fangfalist[i].check=false;
      }
      this.Base.setMyData({ fangfalist });
      
    this.bindinfo();
    }); 

    
  }

  bindinfo(){
    var memberapi = new MemberApi(); 
    memberapi.yuyueinfo({id:this.Base.options.id}, (info) => {
      var age=ApiUtil.ages(info.member_birthday);
      
      if (info.fangfaid!="") {

        var fff = (info.fangfaid).split(','); 
          var fangfalist=this.Base.getMyData().fangfalist; 
          for(var i=0;i<fangfalist.length;i++){
            var id=fangfalist[i].id; 
            if (fff.indexOf(id)>-1) {
              fangfalist[i].check=true; 
            }else{
              fangfalist[i].check=false; 
            }
          }

          this.Base.setMyData({ 
            fangfalist:fangfalist
          })
         
       }
       this.Base.setMyData({
        name:info.name,
        minzu:info.minzu,
        hunyin:info.hunyin,
        jiankang:info.jiankang,
        shengyuandi:info.shengyuandi,
        zhuanye:info.zhuanye,
        yuanxuexiao:info.yuanxuexiao,
        yuanzhuanye:info.yuanzhuanye,
        email:info.email,
        mobile:info.mobile,
        fuqinzhiye:info.fuqinzhiye,
        muqinzhiye:info.muqinzhiye, 
        zhiye:info.zhiye,
        zixunming:info.zixunming,
        danwei:info.danwei,
        // qita:info.qita,
        // wentimiaoshu:info.wentimiaoshu,
        jingli:info.jingli,
        zixunshu:info.zixunshu,
        jinjiren:info.jinjiren,
        jinjidianhua:info.jinjidianhua,
        fangfa:info.fangfa,
        yuyuedate:info.yuyueshijian,
        tutor_id:info.tutor_id,
        yuyueno:info.yuyueno,
        info:info,
        age:age
       })
    }); 
  }

  open(e){
    var url=ApiConfig.GetUploadPath()+'yuyue/'+this.Base.getMyData().info.file;
   console.log(url,"走没走",this.Base.getMyData().info.file);
    wx.downloadFile({
      // 示例 url，并非真实存在
      url: url,
      showMenu:true,
      success: function (res) {
        const filePath = res.tempFilePath
        wx.openDocument({
          filePath: filePath,
          success: function (res) {
            console.log('打开文档成功',res)
          },
          fail: function (res) {
            console.log('失败',res)
          }
        })
      },
      fail: function (res) {
        console.log('失败',res)
      }
    })
  }
  
}

var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad; 
body.onMyShow = content.onMyShow; 
body.bindinfo = content.bindinfo; 
body.open = content.open; 


Page(body)