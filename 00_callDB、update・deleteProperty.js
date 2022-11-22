/*
# ワークショップ管理
dic workshopDB = {uuid: WORKSHOP, ... }
dic WORKSHOP = {name: , date: , start_time: , end_time: , subscription: , capacity: , question: [MODULE, ... ]}
dic MODULE = {type: , title: , subscription: (type:見出しのみ), required: (type:見出し以外), option: (ラジオボタン or チェックボックス のみ)}
*/

function callDB(){
  // スクリプトプロパティからDB取得
  const workshopDB = JSON.parse(PropertiesService.getScriptProperties().getProperty("講座情報"));
  return workshopDB
}

function updateProperty(WORKSHOP, unique_id){
  // DBを参照
  var workshopDB = callDB();
  // uuidで指定して更新
  workshopDB[unique_id] = WORKSHOP;
  // json形式でスクリプトプロパティを更新
  const jsonData = JSON.stringify(workshopDB);
  PropertiesService.getScriptProperties().setProperty("講座情報", jsonData);

  // 既存のものか確認
  if (!Object.keys(IdList).includes(unique_id)){
    // ID対応表に追加
    
    // 予約者シートをテンプレートからコピー
    TemplateSheet.copyTo(DBSpreadSheet).setName(WORKSHOP.name);
  }
  return 0;
}

function deleteProperty(unique_id){
  // DBを参照
  var workshopDB = callDB();
  // uuidで指定して削除
  delete workshopDB[unique_id]
  // json形式でスクリプトプロパティを更新
  const jsonData = JSON.stringify(workshopDB);
  PropertiesService.getScriptProperties().setProperty("講座情報", jsonData);
  return 0;
}

function saveRequest(unique_id, ANSWER){
  // 予約申請を保存させたい
  return 0
}

