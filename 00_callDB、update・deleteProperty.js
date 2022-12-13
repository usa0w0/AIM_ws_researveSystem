/*
# ワークショップ管理
dic workshopDB = {uuid: WORKSHOP, ... }
dic WORKSHOP = {name: , date: , start_time: , end_time: , subscription: , capacity: , question: [MODULE, ... ], request: , isClosed: }
dic MODULE = {type: , title: , subscription: (type:見出しのみ), required: (type:見出し以外), option: (ラジオボタン or チェックボックス のみ), value: }
*/

function callDB(mode){
  // スクリプトプロパティからDB取得
  const workshopDB = JSON.parse(PropertiesService.getScriptProperties().getProperty("講座情報"));

  const keys = Object.keys(workshopDB)

  console.log(keys)

  let key
  let DBSheet
  let deadline

  for (let i=keys.length-1; i>=0; i--){
    key = keys[i]
    DBSheet = DBSpreadSheet.getSheetByName(workshopDB[key].name + "_" + key);

    // 締切系
    deadline = (new Date(workshopDB[key].date +" "+ workshopDB[key].end_time) < ServerTime);
    if (deadline){
      // DBシートの保護を解除
      DBSheet.getProtections(SpreadsheetApp.ProtectionType.SHEET)[0].remove();

      // スクリプトプロパティを削除更新
      delete workshopDB[key];
      PropertiesService.getScriptProperties().setProperty("講座情報", JSON.stringify(workshopDB));

      continue;
    } else {
      // 締切・定員判定
      workshopDB[key].isClosed = (new Date(workshopDB[key].date) < ServerTime || DBSheet.getLastRow()-6 >= workshopDB[key].capacity);
    }

    // ユーザーモードの場合のみ
    if (mode == "user"){
      // 回答値を付与
      workshopDB[key] = addRequest(key, workshopDB[key]);
    }
  }

  return workshopDB
}

function addRequest(key, WORKSHOP){
  // 排他処理を開始する
  const lock = LockService.getScriptLock();

  // 30秒間、ロックを獲得するまで待機する
  // ロックを獲得できなかった場合は、1秒後に再度実行する
  while (true) {
    try {
      lock.waitLock(30000);
      break;
    } catch (error) {
      Utilities.sleep(1);
    }
  }
  
  // 予約者シートを取得
  DBSheet = DBSpreadSheet.getSheetByName(WORKSHOP.name + "_" + key);
  const data = DBSheet.getRange(6, 1, DBSheet.getLastRow()-5, DBSheet.getLastColumn()).getValues();

  let request
  // 回答済みかチェック
  if (data.map(row => row[1]).includes(mailAdress)){
    WORKSHOP.request = true

    // 回答データ
    request = data.filter(row => row[1] == mailAdress).flat().slice(2);
  } else {
    // 空の回答データ
    request = new Array(DBSheet.getLastColumn()).fill('');
  }

  // 排他処理を終了する
  lock.releaseLock();
  
  // 質問モジュールを順に確認して回答値付与
  WORKSHOP.question.forEach(
    function(MODULE){
      switch(MODULE.type){
        case "タイトルと説明":
          break
        case "チェックボックス":
          MODULE.value = request.shift().split(',')
          break
        default:
          MODULE.value = request.shift()
      }
    }
  )

  return WORKSHOP
}

function updateProperty(unique_id, WORKSHOP){
  // DBを参照
  var workshopDB = callDB();
  // uuidで指定して更新
  workshopDB[unique_id] = WORKSHOP;
  // json形式でスクリプトプロパティを更新
  const jsonData = JSON.stringify(workshopDB);
  PropertiesService.getScriptProperties().setProperty("講座情報", jsonData);

  // 予約者DBシート
  let DBSheet = DBSpreadSheet.getSheetByName(WORKSHOP.name + "_" + unique_id);

  // 既存のものか確認 -> 新規シート作成
  if (DBSheet == null){
    // 予約者シートをテンプレートからコピー
    DBSheet = TemplateSheet.copyTo(DBSpreadSheet).setName(WORKSHOP.name + "_" + unique_id);
    // シートの保護
    let protection = DBSheet.protect()
    protection.removeEditors(protection.getEditors());

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
  console.log([label_DB])
  // 予約者DBのラベルに
  DBSheet.getRange(6, 1, 1, label_DB.length).setValues([label_DB]);

  return 0;
}

function deleteProperty(unique_id){
  // DBを参照
  var workshopDB = callDB();
  // uuidで指定して削除
  const WORKSHOP = workshopDB[unique_id];
  delete workshopDB[unique_id]
  // json形式でスクリプトプロパティを更新
  const jsonData = JSON.stringify(workshopDB);
  PropertiesService.getScriptProperties().setProperty("講座情報", jsonData);

  // 予約者シート
  const DBSheet = DBSpreadSheet.getSheetByName(WORKSHOP.name + "_" + unique_id);

  // 既存のものか確認 -> シート削除
  if (DBSheet != null){
    // シート自体も削除
    DBSpreadSheet.deleteSheet(DBSheet);
  }

  return 0;
}

function saveRequest(unique_id, ANSWER){
  const WORKSHOP = callDB()[unique_id]
  const workshop_name = WORKSHOP.name

  // 予約者シートを取得
  const DBSheet = DBSpreadSheet.getSheetByName(workshop_name + "_" + unique_id);
  
  console.log(ANSWER)

  // 回答を保存
  let request = new Array(new Date(), mailAdress).concat(ANSWER.map(answer => answer.value));
  DBSheet.getRange(DBSheet.getLastRow()+1, 1, 1, request.length).setValues([request]);

  return 0
}

function cancelRequest(unique_id){
  const WORKSHOP = callDB()[unique_id]
  const workshop_name = WORKSHOP.name

  // 予約者シートを取得
  const DBSheet = DBSpreadSheet.getSheetByName(workshop_name + "_" + unique_id);
  const data = DBSheet.getDataRange().getValues();

  for (let i=0; i<DBSheet.getLastRow(); i++){
    console.log(data[i])
    if (data[i][1] == mailAdress){
      DBSheet.deleteRow(i+1)
    }
  }

  return 0
}