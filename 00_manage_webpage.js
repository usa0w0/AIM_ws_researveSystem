function doGet(e) {
  console.log("ユーザーログイン：", mailAdress);
  isManager = (mailAdress in managerData && managerData[mailAdress].status == "管理者");

  // 管理者
  if (isManager){

    // URL?p=xxx で表示ページを切り替え可能
    let page;
    let pageTitle;

    switch(e.parameter.p){
      case "1":
      case "user":
      case "u":
        page = "01_User.html";
        pageTitle = "利用者画面";
        break;

      case "2":
      case "manager":
      case "m":
      case "":
      case undefined:
        page = "02_Manager.html";
        pageTitle = "管理画面";
        break; 
    }

    loginManagerName = managerData[mailAdress].name;
    var app = HtmlService.createTemplateFromFile(page);
    return app.evaluate().setSandboxMode(HtmlService.SandboxMode.IFRAME).setTitle(pageTitle).addMetaTag('viewport', 'width=device-width, initial-scale=1');
  }

  // 利用者
  else {
    var app = HtmlService.createTemplateFromFile("01_User.html");
    return app.evaluate().setSandboxMode(HtmlService.SandboxMode.IFRAME).setTitle("予約フォーム").addMetaTag('viewport', 'width=device-width, initial-scale=1');
  } 
}
