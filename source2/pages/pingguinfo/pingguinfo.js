// pages/pingguinfo/pingguinfo.js
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
    this.Base.setMyData({
      wentilist: [{
        type: 'A',
        name: '很少'
      }, {
        type: 'B',
        name: '有时'
      }, {
        type: 'C',
        name: '经常'
      }, {
        type: 'D',
        name: '很频繁'
      }, {
        type: 'E',
        name: '总是'
      }],
      question1: "",
      question2: "",
      question3: "",
      question4: "",
      question5: "",
      question6: "",
      question7: "",
      score:""
    })
  }
  onMyShow() {
    var that = this; 
    var memberapi = new MemberApi();

    memberapi.yuyueinfo({
      id: this.Base.options.id
    }, (info) => {
      this.Base.setMyData({
        info, 
      });
    });

    memberapi.pingguinfo({yuyue_id:this.Base.options.id}, (list) => {
      this.Base.setMyData({ list:list[0],
        question1: list[0].question1,
        question2: list[0].question2,
        question3: list[0].question3,
        question4: list[0].question4,
        question5: list[0].question5,
        question6: list[0].question6,
        question7: list[0].question7,
      });
    });
  }

  
}

var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad; 
body.onMyShow = content.onMyShow; 
Page(body)