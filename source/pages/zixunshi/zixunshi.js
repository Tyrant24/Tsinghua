// pages/zixunshi/zixunshi.js
 // pages/content/content.js
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
    
  }
  onMyShow() {
    var that = this;
    var memberapi = new MemberApi();

    memberapi.tutorlist({tutor_status:this.Base.options.type}, (tutorlist) => {
      this.Base.setMyData({ tutorlist });
    }); 
  }

  
}

var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad; 
body.onMyShow = content.onMyShow; 
Page(body)

