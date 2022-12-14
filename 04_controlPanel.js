function showDialog(){
  const html = HtmlService.createTemplateFromFile('04_managerPanel')
               .evaluate().setSandboxMode(HtmlService.SandboxMode.IFRAME)
               .setWidth(1000)
               .setHeight(1000)
               .setTitle('管理者設定パネル');
  return DBSpreadSheet.show(html);
}

function setDialog(){
  // 集計SSへ追加する機能メニュー
  const menu = [
    {name: "管理パネル", functionName: "showDialog"}
  ];

  DBSpreadSheet.addMenu('管理者設定', menu);
}

function setMenu(){
  ScriptApp.newTrigger('setDialog').forSpreadsheet(DBSpreadSheet).onOpen().create();
}

function saveStatus(id, data){
  // ステータスデータを更新
  managerData[id] = data
  // JSON形式にしてスクリプトプロパティを更新
  const jsonData = JSON.stringify(managerData);
  PropertiesService.getScriptProperties().setProperty("管理ステータス", jsonData);
  return 1
}

function getStatus(){
  return managerData
}