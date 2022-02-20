// pages/login/login.js 
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
    this.Base.needauth = true;
    this.Base.setMyData({
      account:'',password:''
    })
    
    wx.clearStorage();
  }
  onMyShow() {
    var that = this;
    var instapi = new InstApi();

    // instapi.indexbanner({}, (indexbanner) => {
    //   this.Base.setMyData({ indexbanner });
    // }); 
  }
  bindaccount(e){
  this.Base.setMyData({
    account:e.detail.value
  })
  }
  bindpassword(e){
    this.Base.setMyData({
      password:e.detail.value
    })
  }

  submit(e){
    var account=this.Base.getMyData().account;
    var password=this.Base.getMyData().password;

    if(account==""){ 
      this.Base.toast("请输入电话号码");
      return
    }
    if(password==""){ 
      this.Base.toast("请输入密码");
      return
    }

    var memberApi =new MemberApi();
    memberApi.tutorlogin({
      account:account,
      password:password
    },(ret)=>{
       if(ret.code==0){
           this.Base.toast("登录成功"); 
           wx.setStorage({
            key:"tutorid",
            data:ret.return
           }) 
           wx.reLaunch({
             url: '/pages/home/home',
           })
       }else{
        this.Base.toast("登录失败，请检查学号与密码是否正确")
       }
    })
    
  }
 
}

var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad; 
body.onMyShow = content.onMyShow; 
body.bindaccount = content.bindaccount; 
body.bindpassword = content.bindpassword; 
body.submit = content.submit; 


Page(body)

