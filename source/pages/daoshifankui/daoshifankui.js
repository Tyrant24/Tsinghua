// pages/daoshifankui/daoshifankui.js
import { AppBase } from "../../appbase";
import { ApiConfig } from "../../apis/apiconfig";
import { InstApi } from "../../apis/inst.api.js";
import { MemberApi } from "../../apis/member.api";

class Content extends AppBase {
  constructor() {
    super();
  }
  onLoad(options) {
    this.Base.Page = this;
    //options.id=5;
    super.onLoad(options);
    this.Base.setMyData({fankui:''})
  }
  onMyShow() {
    var that = this;
    var memberapi = new MemberApi();

    memberapi.yuyueinfo({id:this.Base.options.id}, (info) => {
      this.Base.setMyData({ info });
    }); 
  }
 
 

  
}

var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad; 
body.onMyShow = content.onMyShow; 

body.bindfankui = content.bindfankui; 
body.bindsubmit = content.bindsubmit; 


Page(body)