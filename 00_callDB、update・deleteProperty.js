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

  // 予約者DBシート
  let DBSheet = DBSpreadSheet.getSheetByName(WORKSHOP.neme + "_" + unique_id);

  // 既存のものか確認 -> 新規シート作成
  if (DBSheet == null){
    // 予約者シートをテンプレートからコピー
    DBSheet = TemplateSheet.copyTo(DBSpreadSheet).setName(WORKSHOP.name + "_" + unique_id);
    // コピーしたシートに設定情報を転記
    const property = [WORKSHOP.name, WORKSHOP.date, WORKSHOP.start_time, WORKSHOP.end_time, WORKSHOP.capacity];
    DBSheet.getRange(3, 1, 1, 5).setValues([property]);
  }
  // 質問タイトルを取得
  let label_DB = ['タイムスタンプ', 'ユーザーアドレス'];
  WORKSHOP.question.forEach(function(MODULE){
    if (MODULE.type != "タイトルと説明"){
      label_DB.push(MODULE.title);
    }
  });
  // 予約者DBのラベルに
  DBSheet.getRange(6, 1, 1, label_DB.length).setValues([label_DB]);

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

  // 予約者シート
  const DBSheet = DBSpreadSheet.getSheetByName(WORKSHOP.neme + "_" + unique_id);

  // 既存のものか確認 -> シート削除
  if (DBSheet != null){
    // シート自体も削除
    DBSpreadSheet.deleteSheet(DBSheet);
  }

  return 0;
}

function saveRequest(unique_id, ANSWER){
  // 予約申請を保存させたい
  return 0
}