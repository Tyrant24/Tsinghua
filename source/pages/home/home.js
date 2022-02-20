// pages/content/content.js
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
    // this.Base.setMyData({
    //   extraData:{
    //     accesstoken:'6Qvp8x5cIBP8ovF1j7roaXa69oYDMeZ3fLA0UtbZ1Wf5Ib3sOJYtNN8fHES4XcOX',
    //     userIdentity:'2019010101'
    //   }
    // })
  }
  onMyShow() {
    var that = this;
    var instapi = new InstApi(); 
    instapi.indexbanner({}, (indexbanner) => {
      this.Base.setMyData({ indexbanner });
    });  
    instapi.activitylist({}, (activitylist) => {
      this.Base.setMyData({ activitylist });
    }); 
    var memberapi = new MemberApi();

    memberapi.tutorlist({}, (tutorlist) => {
      this.Base.setMyData({ tutorlist });
    }); 

  }
  handleChange(e) {
    this.setData({
    currentIndex: e.detail.current
    })
    }

    bindtoother(e){
      
    var memberapi = new MemberApi();
   var userIdentity = this.Base.getMyData().memberinfo.studentid;
    memberapi.getlogintoken({}, (ret) => {
     if (ret.code==200) {
       console.log("获取成功,使用",ret);

       wx.navigateToMiniProgram({
        appId: 'wx78e037c6347dd56e',
        path: 'pages/index',
        extraData: {
          accessToken:ret.token,
          userIdentity:userIdentity
        },
       envVersion: 'release',
        success(res) {
          // 打开成功
          console.log(res,'返回的数据')
        }
        }) 

     }else{
      console.log("获取失败")
     }
    }); 

    return;

      wx.navigateToMiniProgram({
        appId: 'wx78e037c6347dd56e',
        path: 'pages/index',
        extraData: {
          accessToken:'aLEYwz1FNEM1MTZizcnOr76Ht9jWb26qzcRvX3cM09u8a0xQuP7BjetpgidnaU1y',
          userIdentity:'2020213693'
        },
       envVersion: 'release',
        success(res) {
          // 打开成功
          console.log(res,'返回的数据')
        }
        }) 
    }
}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;
body.handleChange = content.handleChange;
body.bindtoother = content.bindtoother;


Page(body)