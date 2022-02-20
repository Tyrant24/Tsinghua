// pages/wodezulin/wodezulin.js 
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
    
    this.bindread();

    memberapi.zulinlist({member_id:this.Base.getMyData().memberid}, (list) => {
      this.Base.setMyData({ list });
    }); 
  }

  bindread(){
    var memberApi =new MemberApi();
    memberApi.read({memberid:this.Base.getMyData().memberid,type:'C'}, (ret) => {

      memberApi.zulinlist({member_id:this.Base.getMyData().memberid}, (list) => {
        this.Base.setMyData({ list });
      }); 

    }); 
  }

  
}

var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad; 
body.onMyShow = content.onMyShow; 
body.bindread = content.bindread; 
Page(body)

