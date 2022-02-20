// pages/changepassword/changepassword.js 
import { AppBase } from "../../appbase";
import { ApiConfig } from "../../apis/apiconfig";
import { InstApi } from "../../apis/inst.api.js";
import { MemberApi } from "../../apis/member.api.js";

class Content extends AppBase {
  constructor() {
    super();
  }
  onLoad(options) {
    this.Base.Page = this;
    //options.id=5;
    super.onLoad(options);
    this.Base.setMyData({password:'',newpassword:'',againnewpassword:''})
  }
  onMyShow() {
    var that = this;
    var instapi = new InstApi();
    wx.setNavigationBarTitle({
      title: "修改密码",
    })

    // instapi.indexbanner({}, (indexbanner) => {
    //   this.Base.setMyData({ indexbanner });
    // }); 
  }
  bindpassword(e){
    console.log("点击")
    this.Base.setMyData({
      password:e.detail.value
    })
  }
  bindnewpassword(e){
    console.log("点击2222")
    this.Base.setMyData({
      newpassword:e.detail.value
    })
  }

  bindagainnewpassword(e){
    console.log("点击")
    this.Base.setMyData({
      againnewpassword:e.detail.value
    })
  }
  submit(e){
    var password=this.Base.getMyData().password;
    var newpassword=this.Base.getMyData().newpassword;
    var againnewpassword=this.Base.getMyData().againnewpassword;

    console.log(password,'aaa');
    console.log(newpassword,'ppp');
    console.log(againnewpassword,'zzz');
    if(password==''){
      this.Base.toast("请输入原密码!");
      return;
    }
    if(newpassword==''){
      this.Base.toast("请输入新密码!");
      return;
    }
    if(againnewpassword==''){
      this.Base.toast("请再次输入新密码!");
      return;
    }
    if(newpassword!=againnewpassword){
      this.Base.toast("两次密码输入不一致请重新输入!");
      return;
    }

    // return;
    
    var memberApi =new MemberApi();
    memberApi.forgetpassword({
      memberid:this.Base.getMyData().memberid,
      password:password,
      newpassword:newpassword
    },(ret)=>{

      if(ret.code==0){
        this.Base.toast(ret.result);
        wx.reLaunch({
          url: '/pages/login/login',
        })
        // this.console.log("清除登录信息重新登录~~")
      }else{
           this.Base.toast(ret.result);
      }

    })

  }

  
}

var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad; 
body.onMyShow = content.onMyShow; 
body.bindpassword = content.bindpassword; 
body.bindnewpassword = content.bindnewpassword; 
body.bindagainnewpassword = content.bindagainnewpassword; 
body.submit = content.submit; 


Page(body)

