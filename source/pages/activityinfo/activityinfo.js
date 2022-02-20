// pages/activityinfo/activityinfo.js 
import {
  AppBase
} from "../../appbase";
import {
  ApiConfig
} from "../../apis/apiconfig";
import {
  InstApi
} from "../../apis/inst.api.js";
import {
  MemberApi
} from "../../apis/member.api.js";

import { EmailApi } from "../../apis/email.api";

var WxParse = require('../../wxParse/wxParse');

class Content extends AppBase {
  constructor() {
    super();
  }
  onLoad(options) {
    this.Base.Page = this;
    //options.id=5;
    super.onLoad(options);
    this.Base.setMyData({
      overlay: false,
      overlay2:false,
      pg:'Y',
      yuyue_status: "",
      checking:'B',
      remarks: ""
    })
  }
  onMyShow() {
    var that = this;
    this.huodong();
  }
  bindcontent(e) {
    this.Base.setMyData({
      remarks: e.detail.value
    });
  }

  yuyue(e) {
    var memberApi = new MemberApi();
    var emailApi = new EmailApi();
    var info=this.Base.getMyData().info;
    if (this.Base.getMyData().remarks=="") {
      this.Base.toast("请填写"+this.Base.getMyData().info.problem);
      return;
    }

    memberApi.selectpopulation({
      activity_id: this.Base.options.id
    }, (ret2) => {
      if (ret2.code==0) {
        memberApi.huodongyuyue({
          activity_id: this.Base.options.id,
          member_id: this.Base.getMyData().memberid,
          remarks: this.Base.getMyData().remarks
        }, (ret) => {
          console.log(ret, "返回")
          if (ret.code == 0) {
    
            emailApi.huodong({
             activity_time:info.activity_time,
             activity_name:info.name,
             activity_address:info.address,
             email:this.Base.getMyData().memberinfo.email,
             member_name:this.Base.getMyData().memberinfo.name
            }, (ret) => {
              this.Base.setMyData({
                overlay: true
              })
            })
            
          } else {
            this.Base.toast("预约失败，请重试")
          }
        });
      }else{
        this.Base.toast("已达报名人数上限~");
      }
    })

 

  }
  quxiao(e) {
    var that =this;
    var memberApi = new MemberApi();
    wx.showModal({
      title: '提示',
      // showCancel: false,
      content: '确认取消预约？',
      success(res) {
        if (res.confirm) {
          memberApi.cancelactivity({
            yuyue_id: that.Base.getMyData().yuyue_id,
            yuyue_status: 'B'
          }, (ret) => {
            
            that.Base.toast("预约已取消");
            that.huodong();
           });

        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
 

   
  }

  huodong() {
    var that = this;
    var instapi = new InstApi();
    var memberApi = new MemberApi();
    console.log(this.Base.options.id, '传参');


    instapi.activityinfo({
      id: this.Base.options.id
    }, (info) => {

      info.summary = this.Base.util.HtmlDecode(info.summary);
      WxParse.wxParse('content', 'html', info.summary, that, 10);

      memberApi.selectactivity({
        activity_id: this.Base.options.id,
        member_id: this.Base.getMyData().memberid
      }, (ret) => {
        if (ret.code == 0) {
          console.log('有没有往这走')
          var instApi = new InstApi();
          instApi.chapingjia({
            member_id:this.Base.getMyData().memberid,
            activity_id:this.Base.getMyData().info.id
         }, (back) => { 
           console.log(back,'有没有往这走')
           if(back.code==0){
             this.Base.setMyData({
               pg:'Y'
             })
           }else{
            this.Base.setMyData({
              pg:'N'
            })
           }
         })

          this.Base.setMyData({
            yuyue_status: 'B',
            remarks: ret.return.remarks,
            yuyue_id: ret.return.id
          })
        } else {
          this.Base.setMyData({
            pg:'Y',
            yuyue_status: 'A',
            remarks: '',
            yuyue_id: ''
          })
        }
      });

      this.Base.setMyData({
        info
      });

    });
  }

  confirm(e) {
    this.Base.setMyData({
      overlay: false
    })
    this.huodong();
  }

  bindcheck(e){
    this.Base.setMyData({
      checking:e.currentTarget.id
    })
  }
  bindsummary(e){
    this.Base.setMyData({
      summary:e.detail.value
    })
  }

  pingjia(e){
    if(this.Base.getMyData().summary==""){
      this.Base.toast("请输入评价");
      return;
    }
    var instApi = new InstApi();
    instApi.huodongpinjia({
       member_id:this.Base.getMyData().memberid,
       activity_id:this.Base.getMyData().info.id,
       summary:this.Base.getMyData().summary,
       dengji:this.Base.getMyData().checking,
       status:'A'
    }, (ret) => { 
      this.Base.toast("评价成功");
      this.Base.setMyData({
        overlay2:false
      })
      this.huodong();
    });

  }
  topingjia(e){
    this.Base.setMyData({
      overlay2:true
    })
  }

  close(e){
    this.Base.setMyData({
      overlay2:false
    })
  }


}

var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;
body.yuyue = content.yuyue;
body.bindcontent = content.bindcontent;
body.huodong = content.huodong;
body.quxiao = content.quxiao;

body.confirm = content.confirm;

body.bindcheck = content.bindcheck;
body.bindsummary = content.bindsummary;
body.pingjia = content.pingjia;
body.topingjia = content.topingjia;
body.close = content.close;

Page(body)